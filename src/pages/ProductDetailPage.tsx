import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

type DetailTab = 'description' | 'ingredients' | 'ritual';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t, formatPrice } = useLanguage();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    getProductReviews,
    addProductReview,
    calculateOrderPoints,
    loyalty,
    showToast,
  } = useStore();

  const product = useMemo(
    () => products.find((p) => p.slug === slug) || products[0],
    [slug]
  );

  const [selectedShadeId, setSelectedShadeId] = useState(product.shades[0]?.id || '');
  const [activeImageUrl, setActiveImageUrl] = useState(
    product.shades[0]?.image || product.images[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<DetailTab>('description');
  const [justAdded, setJustAdded] = useState(false);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const addedTimerRef = useRef<number | null>(null);
  const reviewTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimerRef.current !== null) window.clearTimeout(addedTimerRef.current);
      if (reviewTimerRef.current !== null) window.clearTimeout(reviewTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const initialShade = product.shades[0];
    setSelectedShadeId(initialShade?.id || '');
    setActiveImageUrl(initialShade?.image || product.images[0]);
    setQuantity(1);
    setActiveTab('description');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const activeShade =
    product.shades.find((s) => s.id === selectedShadeId) || product.shades[0];
  const hasShadeImages = product.shades.some((s) => Boolean(s.image));
  const wishlisted = isInWishlist(product.id);
  const reviews = getProductReviews(product.id);

  const relatedProducts = useMemo(
    () =>
      products
        .filter((p) => p.id !== product.id && (p.parentGroup === product.parentGroup || p.collection === product.collection))
        .slice(0, 4),
    [product]
  );

  const handleAddToBag = () => {
    addToCart(product.id, activeShade?.id, quantity, true);
    setJustAdded(true);
    showToast(`${product.name[language]} — ${t.product.addedToBag}`);
    if (addedTimerRef.current !== null) window.clearTimeout(addedTimerRef.current);
    addedTimerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      addedTimerRef.current = null;
    }, 1600);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    addProductReview(product.id, {
      author: { en: reviewName.trim(), ur: reviewName.trim() },
      location: { en: reviewLocation.trim() || 'Client', ur: reviewLocation.trim() || 'صارف' },
      rating: reviewRating,
      comment: { en: reviewComment.trim(), ur: reviewComment.trim() },
    });
    setReviewName('');
    setReviewLocation('');
    setReviewRating(5);
    setReviewComment('');
    setReviewSubmitted(true);
    if (loyalty.isEnrolled) {
      showToast(`${t.loyalty.kicker} · +50 ${t.loyalty.pointsUnit}`);
    }
    if (reviewTimerRef.current !== null) window.clearTimeout(reviewTimerRef.current);
    reviewTimerRef.current = window.setTimeout(() => {
      setReviewSubmitted(false);
      reviewTimerRef.current = null;
    }, 4000);
  };

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12 sm:space-y-16">
      {/* Breadcrumb */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F2A2C] hover:text-[#7A233E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t.product.backToShop}</span>
        </Link>
      </div>

      {/* Contiguous Purchase Module */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-14 items-start">
        {/* Sticky Image Gallery Left */}
        <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 lg:sticky lg:top-24">
          <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#D4CFC7]">
            <img
              src={activeImageUrl || product.images[0]}
              alt={`${product.name[language]}${activeShade ? ` — ${activeShade.name[language]}` : ''}`}
              decoding="async"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageUrl(img)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border transition-all cursor-pointer bg-white ${
                    activeImageUrl === img
                      ? 'border-[#7A233E] ring-2 ring-[#7A233E]/30'
                      : 'border-[#D4CFC7] opacity-85 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name[language]} ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Details Right */}
        <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#161214]">
              <span className="text-[#7A233E]">{t.categories[product.category]}</span>
              <span aria-hidden="true">·</span>
              <span>{product.size}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 tabular-nums text-[#161214]">
                <Star className="w-3.5 h-3.5 fill-[#B58428] text-[#B58428]" />
                <span className="font-bold">{product.rating.toFixed(1)}</span>
                <span className="font-semibold text-[#2F2A2C]">
                  ({product.reviewCount + (reviews.length - product.reviews.length)}{' '}
                  {t.product.reviewsCountLabel})
                </span>
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#161214]">
              {product.name[language]}
            </h1>

            <p className="text-sm sm:text-base font-bold text-[#161214]">{product.subtitle[language]}</p>

            <div className="flex items-baseline gap-3 pt-1 tabular-nums">
              <span className="text-2xl font-bold text-[#161214]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-[#524B4E] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-[#7A233E]">
                    {t.product.savePercent} {discountPct}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Shade Selector */}
          {product.shades.length > 0 && (
            <div className="pt-4 border-t border-[#D4CFC7] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[#161214]">
                  {t.product.selectShade}:{' '}
                  <span className="font-bold text-[#161214]">{activeShade?.name[language]}</span>
                </span>
                <span className="font-bold text-[#7A233E]">
                  {t.product.finish}: {activeShade?.finishLabel[language]}
                </span>
              </div>

              {hasShadeImages ? (
                <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.shades.map((shade) => {
                    const active = shade.id === activeShade?.id;
                    return (
                      <button
                        key={shade.id}
                        type="button"
                        onClick={() => {
                          setSelectedShadeId(shade.id);
                          if (shade.image) setActiveImageUrl(shade.image);
                        }}
                        aria-pressed={active}
                        className={`flex items-center gap-2.5 p-2 rounded-2xl border text-start transition-all cursor-pointer ${
                          active
                            ? 'border-[#7A233E] bg-[#F6ECF0] ring-1 ring-[#7A233E]'
                            : 'border-[#D4CFC7] bg-[#F4F3F0] hover:border-[#7A233E]/60'
                        }`}
                      >
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 bg-[#F0EEE9] border border-[#161214]/20">
                          <img
                            src={shade.image || product.images[0]}
                            alt={shade.name[language]}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span
                            className="absolute inset-x-0 bottom-0 h-1.5"
                            style={{ backgroundColor: shade.hex }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#161214] truncate">
                            {shade.name[language]}
                          </p>
                          <p className="text-[11px] font-semibold text-[#2F2A2C] truncate">
                            {shade.finishLabel[language]}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  {product.shades.map((shade) => {
                    const active = shade.id === activeShade?.id;
                    return (
                      <button
                        key={shade.id}
                        type="button"
                        onClick={() => setSelectedShadeId(shade.id)}
                        aria-label={shade.name[language]}
                        className={`w-8 h-8 rounded-full p-0.5 transition-all cursor-pointer ${
                          active
                            ? 'ring-2 ring-[#7A233E] ring-offset-2 ring-offset-white'
                            : 'hover:scale-110'
                        }`}
                      >
                        <span
                          className="block w-full h-full rounded-full border border-[#161214]/25"
                          style={{ backgroundColor: shade.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Quantity + Add to Bag + Wishlist */}
          <div className="pt-4 border-t border-[#D4CFC7] space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="order-1 inline-flex items-center rounded-full border border-[#C7C0B6] bg-[#F4F3F0] px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2 text-[#161214] hover:text-[#7A233E] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3.5 sm:px-4 text-sm font-bold tabular-nums text-[#161214]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-2 text-[#161214] hover:text-[#7A233E] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToBag}
                className={`order-3 sm:order-2 w-full sm:w-auto sm:flex-1 min-w-0 inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3.5 text-xs font-semibold transition-all cursor-pointer ${
                  justAdded
                    ? 'bg-[#7A233E] text-white'
                    : 'bg-[#161214] text-white hover:bg-[#2E2528]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.product.addedToBag}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.product.addToBag}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? t.product.savedInWishlist : t.product.addToWishlist}
                className={`order-2 sm:order-3 ms-auto sm:ms-0 p-3.5 rounded-full border transition-colors cursor-pointer ${
                  wishlisted
                    ? 'border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C]'
                    : 'border-[#C7C0B6] bg-[#F4F3F0] text-[#161214] hover:bg-[#F6ECF0]'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#B91C1C]' : ''}`} />
              </button>
            </div>

            <div className="text-xs font-semibold text-[#161214] space-y-1">
              <p className="font-bold text-[#161214]">{t.product.inStock}</p>
              <p className="font-semibold text-[#2F2A2C]">{t.product.freeShippingNote}</p>
              <p>
                <Link to="/loyalty" className="text-[#7A233E] font-bold hover:text-[#161214] underline">
                  {t.loyalty.productEarnNote} +{calculateOrderPoints(product.price * quantity)}{' '}
                  {t.loyalty.pointsUnit}
                </Link>
              </p>
            </div>
          </div>

          {/* Description / Ingredients / Ritual Tabs */}
          <div className="pt-4 border-t border-[#D4CFC7] space-y-4">
            <div className="flex items-center gap-4 sm:gap-6 border-b border-[#D4CFC7] overflow-x-auto">
              {(
                [
                  { id: 'description', label: t.product.descriptionTab },
                  { id: 'ingredients', label: t.product.ingredientsTab },
                  { id: 'ritual', label: t.product.ritualTab },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs font-bold transition-colors border-b-2 -mb-px cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#7A233E] text-[#7A233E]'
                      : 'border-transparent text-[#524B4E] hover:text-[#161214]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-sm text-[#2F2A2C] leading-relaxed min-h-[84px]">
              {activeTab === 'description' && <p>{product.description[language]}</p>}
              {activeTab === 'ingredients' && <p>{product.ingredients[language]}</p>}
              {activeTab === 'ritual' && <p>{product.howToUse[language]}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="pt-10 border-t border-[#D4CFC7] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
            {t.product.reviewsHeading}
          </h2>

          {reviews.length === 0 ? (
            <p className="text-sm text-[#2F2A2C] rounded-2xl bg-white border border-[#D4CFC7] p-6">
              {language === 'ur'
                ? 'اس پروڈکٹ پر ابھی کوئی تبصرہ نہیں ہے۔ پہلا تبصرہ لکھیں!'
                : 'Be the first to share your ritual experience with this formula.'}
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl bg-white border border-[#D4CFC7] p-6 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-[#B58428] text-[#B58428]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[#524B4E] tabular-nums">{rev.date}</span>
                  </div>
                  <p className="text-sm text-[#161214] leading-relaxed">{rev.comment[language]}</p>
                  <p className="text-xs text-[#2F2A2C]">
                    <strong className="text-[#161214]">{rev.author[language]}</strong> ·{' '}
                    {rev.location[language]} · {t.product.verifiedBuyer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Write a Review Form */}
        <form
          onSubmit={handleReviewSubmit}
          className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 space-y-4"
        >
          <h3 className="font-display text-xl font-semibold text-[#161214]">
            {t.product.writeReview}
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#161214] block">
              {t.product.yourName}
            </label>
            <input
              type="text"
              required
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#161214] block">
                {t.product.yourLocation}
              </label>
              <input
                type="text"
                value={reviewLocation}
                onChange={(e) => setReviewLocation(e.target.value)}
                className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#161214] block">
                {t.product.yourRating}
              </label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
              >
                <option value={5}>5 ★</option>
                <option value={4}>4 ★</option>
                <option value={3}>3 ★</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#161214] block">
              {t.product.yourReview}
            </label>
            <textarea
              rows={3}
              required
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#161214] text-white py-3 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
          >
            {t.product.submitReview}
          </button>

          {reviewSubmitted && (
            <p className="text-xs font-semibold text-[#7A233E] text-center">{t.product.reviewSuccess}</p>
          )}
        </form>
      </section>

      {/* Related Products */}
      <section className="pt-8 sm:pt-10 border-t border-[#D4CFC7] space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
          {t.product.relatedHeading}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>
    </div>
  );
};
