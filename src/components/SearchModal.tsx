import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSearchOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeSearch, isSearchOpen]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 4);
    return products.filter(
      (p) =>
        p.name.en.toLowerCase().includes(q) ||
        p.name.ur.includes(q) ||
        p.subtitle.en.toLowerCase().includes(q) ||
        p.subtitle.ur.includes(q) ||
        p.ingredients.en.toLowerCase().includes(q) ||
        t.categories[p.category].toLowerCase().includes(q)
    );
  }, [query, t.categories]);

  if (!isSearchOpen) return null;

  const handleSelect = (path: string) => {
    closeSearch();
    setQuery('');
    navigate(path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSelect(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.searchButton}
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-24 px-3 sm:px-4"
    >
      <div
        className="fixed inset-0 bg-[#161214]/50 backdrop-blur-xs"
        onClick={closeSearch}
      />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#D4CFC7]">
          <Search className="w-5 h-5 text-[#7A233E] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            className="flex-1 min-w-0 bg-transparent text-base text-[#161214] placeholder:text-[#524B4E] focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="p-2 rounded-full hover:bg-[#F6ECF0] text-[#161214] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3.5 sm:p-5 max-h-[65vh] overflow-y-auto space-y-2.5 sm:space-y-3">
          {matches.length === 0 ? (
            <p className="text-sm text-[#2F2A2C] text-center py-8">{t.shop.emptyTitle}</p>
          ) : (
            matches.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => handleSelect(`/product/${product.slug}`)}
                className="w-full flex items-center gap-3 sm:gap-4 p-2.5 rounded-2xl hover:bg-[#F6ECF0] transition-colors text-start cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name[language]}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover bg-[#F0EEE9] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-bold text-[#161214] truncate">
                    {product.name[language]}
                  </p>
                  <p className="text-xs font-bold text-[#161214] truncate">
                    {t.categories[product.category]} · {formatPrice(product.price)}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A233E] rtl:rotate-180 shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
