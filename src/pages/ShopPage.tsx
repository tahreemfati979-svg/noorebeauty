import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { CategorySlug } from '../types';

type SortMode = 'curated' | 'popular' | 'newest' | 'price-asc' | 'price-desc';

const categoryGroups: Array<{
  title: { en: string; ur: string } | null;
  items: CategorySlug[];
}> = [
  { title: null, items: ['all'] },
  {
    title: { en: 'Makeup Atelier', ur: 'میک اپ اٹیلیئر' },
    items: ['makeup', 'lipsticks', 'foundations', 'blush-highlighters', 'eyeshadow-palettes', 'mascaras'],
  },
  {
    title: { en: 'Skincare Ritual', ur: 'اسکن کیئر روٹین' },
    items: ['skincare', 'face-serums', 'sheet-masks', 'moisturizers', 'sunscreens'],
  },
  {
    title: { en: 'Tools', ur: 'بیوٹی ٹولز' },
    items: ['beauty-accessories'],
  },
];

const allCategories: CategorySlug[] = categoryGroups.flatMap((g) => g.items);

const NEWEST_PRIORITY: Record<string, number> = {
  'ln-msk-01': 6,
  'ln-msk-02': 5,
  'ln-skn-03': 4,
  'ln-skn-04': 3,
  'ln-lip-04': 2,
  'ln-mkp-03': 1,
};

export const ShopPage: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = (searchParams.get('category') as CategorySlug) || 'all';
  const initialCollection = searchParams.get('collection') || '';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>(
    allCategories.includes(initialCategory) ? initialCategory : 'all'
  );
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [sortBy, setSortBy] = useState<SortMode>('curated');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = (searchParams.get('category') as CategorySlug) || 'all';
    const col = searchParams.get('collection') || '';
    const q = searchParams.get('q') || '';
    setSelectedCategory(allCategories.includes(cat) ? cat : 'all');
    setSelectedCollection(col);
    setSearchQuery(q);
  }, [searchParams]);

  const handleSelectCategory = (cat: CategorySlug) => {
    setSelectedCategory(cat);
    setSelectedCollection('');
    const next = new URLSearchParams(searchParams);
    if (cat === 'all') {
      next.delete('category');
    } else {
      next.set('category', cat);
    }
    next.delete('collection');
    setSearchParams(next, { replace: true });
  };

  const resetAll = () => {
    setSelectedCategory('all');
    setSelectedCollection('');
    setSearchQuery('');
    setMaxPrice(3500);
    setSortBy('curated');
    setSearchParams({}, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matched = products.filter((p) => {
      const matchesCat =
        selectedCategory === 'all' ||
        p.category === selectedCategory ||
        (selectedCategory === 'makeup' && p.parentGroup === 'makeup') ||
        (selectedCategory === 'skincare' && p.parentGroup === 'skincare');

      const matchesCol = !selectedCollection || p.collection === selectedCollection;
      const matchesPrice = p.price <= maxPrice;
      const matchesQuery =
        !q ||
        p.name.en.toLowerCase().includes(q) ||
        p.name.ur.includes(q) ||
        p.subtitle.en.toLowerCase().includes(q) ||
        p.subtitle.ur.includes(q) ||
        p.ingredients.en.toLowerCase().includes(q) ||
        t.categories[p.category].toLowerCase().includes(q);

      return matchesCat && matchesCol && matchesPrice && matchesQuery;
    });

    if (sortBy === 'curated') return matched;

    return [...matched].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') {
        const priDiff = (NEWEST_PRIORITY[b.id] || 0) - (NEWEST_PRIORITY[a.id] || 0);
        if (priDiff !== 0) return priDiff;
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      }
      return b.reviewCount - a.reviewCount;
    });
  }, [selectedCategory, selectedCollection, searchQuery, maxPrice, sortBy, t.categories]);

  const filterPanel = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#524B4E] absolute top-1/2 -translate-y-1/2 inset-inline-start-3.5 pointer-events-none" />
          <input
            type="text"
            aria-label={t.shop.searchLabel}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.shop.searchPlaceholder}
            className="w-full rounded-full border border-[#C7C0B6] bg-[#F4F3F0] ps-10 pe-9 py-2.5 text-base sm:text-xs text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute top-1/2 -translate-y-1/2 inset-inline-end-2.5 p-1 text-[#524B4E] hover:text-[#161214] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Price Range */}
        <div className="md:col-span-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-2 text-xs whitespace-nowrap shrink-0">
            <span className="font-bold text-[#161214]">{t.shop.priceLabel}:</span>
            <span className="text-[#7A233E] font-bold tabular-nums">
              {t.shop.priceUpTo} {formatPrice(maxPrice)}
            </span>
          </div>
          <input
            type="range"
            aria-label={t.shop.priceLabel}
            min={500}
            max={3500}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#7A233E] cursor-pointer"
          />
        </div>

        {/* Reset */}
        <div className="md:col-span-2 flex md:justify-end">
          <button
            type="button"
            onClick={resetAll}
            className="w-full md:w-auto rounded-full border border-[#161214] px-4 py-2 text-xs font-semibold text-[#161214] hover:bg-[#F6ECF0] transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.shop.resetFilters}
          </button>
        </div>
      </div>

      {/* Grouped Category Filter Bar */}
      <div className="pt-3 border-t border-[#E0DCD3] flex flex-wrap items-center gap-x-4 gap-y-2.5">
        {categoryGroups.map((group, gIdx) => (
          <div
            key={gIdx}
            className="flex flex-wrap items-center gap-1.5"
          >
            {group.title && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A233E] me-1">
                {group.title[language]}:
              </span>
            )}
            {group.items.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#7A233E] text-white font-bold'
                      : 'bg-[#F4F3F0] text-[#161214] font-semibold hover:bg-[#F6ECF0]'
                  }`}
                >
                  {t.categories[cat]}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D4CFC7]">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#161214]">
            {t.shop.title}
          </h1>
          <p className="text-sm sm:text-base text-[#2F2A2C]">{t.shop.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            aria-expanded={mobileFiltersOpen}
            className="lg:hidden inline-flex items-center gap-2 rounded-full border border-[#161214] bg-white px-4 py-2.5 text-xs font-semibold text-[#161214] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t.shop.filterToggle}</span>
          </button>

          <div className="flex items-center gap-2 ms-auto md:ms-0">
            <label htmlFor="shop-sort" className="text-xs font-medium text-[#2F2A2C] whitespace-nowrap">
              {t.shop.sortLabel}:
            </label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortMode)}
              className="rounded-full border border-[#C7C0B6] bg-white px-3.5 sm:px-4 py-2 text-base sm:text-xs font-semibold text-[#161214] focus:outline-none focus:border-[#7A233E] cursor-pointer"
            >
              <option value="curated">{t.shop.sortCurated}</option>
              <option value="popular">{t.shop.sortPopular}</option>
              <option value="newest">{t.shop.sortNewest}</option>
              <option value="price-asc">{t.shop.sortPriceAsc}</option>
              <option value="price-desc">{t.shop.sortPriceDesc}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Filters */}
      {mobileFiltersOpen && (
        <div className="lg:hidden rounded-2xl bg-white border border-[#D4CFC7] p-4 sm:p-5 relative">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
            className="mb-3 ms-auto flex items-center gap-1 text-xs font-semibold text-[#2F2A2C] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          {filterPanel}
        </div>
      )}

      {/* Desktop Full-Width Horizontal Filter Strip */}
      <div className="hidden lg:block rounded-2xl bg-white border border-[#D4CFC7] p-5">
        {filterPanel}
      </div>

      {/* Full-Width Dual-Side Product Grid */}
      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs text-[#2F2A2C]">
          <span>
            <strong className="text-[#161214] tabular-nums">{filteredProducts.length}</strong>{' '}
            {t.shop.resultsCount}
            {selectedCollection ? ` · ${selectedCollection.replace('-', ' ')}` : ''}
          </span>
          {(selectedCategory !== 'all' || selectedCollection || searchQuery || maxPrice < 3500) && (
            <button
              type="button"
              onClick={resetAll}
              className="text-[#7A233E] font-semibold hover:text-[#161214] underline cursor-pointer"
            >
              {t.shop.resetFilters}
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white border border-[#D4CFC7] p-12 text-center space-y-3">
            <h2 className="font-display text-2xl font-semibold text-[#161214]">{t.shop.emptyTitle}</h2>
            <p className="text-sm text-[#2F2A2C] max-w-md mx-auto">{t.shop.emptyBody}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full bg-[#161214] text-white px-6 py-2.5 text-xs font-semibold cursor-pointer"
              >
                {t.shop.resetFilters}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Hidden language marker to force clean re-render if needed */}
      <span className="sr-only">{language}</span>
    </div>
  );
};
