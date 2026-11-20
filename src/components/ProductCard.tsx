import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t, formatPrice } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const [selectedShadeId, setSelectedShadeId] = useState(product.shades[0]?.id || '');
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimerRef.current !== null) {
        window.clearTimeout(addedTimerRef.current);
      }
    };
  }, []);

  const wishlisted = isInWishlist(product.id);
  const activeShade = product.shades.find((s) => s.id === selectedShadeId) || product.shades[0];
  const displayImage = activeShade?.image || product.images[0];
  const hasShadeImages = product.shades.some((s) => Boolean(s.image));
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, activeShade?.id, 1, true);
    setJustAdded(true);
    showToast(`${product.name[language]} — ${t.product.addedToBag}`);
    if (addedTimerRef.current !== null) {
      window.clearTimeout(addedTimerRef.current);
    }
    addedTimerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      addedTimerRef.current = null;
    }, 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-[#D4CFC7] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B8B1A7] hover:shadow-[0_18px_36px_-14px_rgba(22,18,20,0.14)]">
      {/* Product Image Area (4:3 uniform aspect) */}
      <Link
        to={`/product/${product.slug}`}
        className="relative aspect-[4/3] w-full bg-[#F0EEE9] overflow-hidden block"
      >
        {!imgError ? (
          <img
            src={displayImage}
            alt={`${product.name[language]}${activeShade ? ` — ${activeShade.name[language]}` : ''}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F6ECF0] to-[#EAE7E0]">
            <Sparkles className="w-7 h-7 text-[#7A233E] mb-2" />
            <span className="font-display text-sm text-[#161214]">{product.name[language]}</span>
          </div>
        )}

        {/* Single subtle high-contrast text indicator if discounted or new */}
        {(discountPct > 0 || product.isNewArrival) && (
          <span className="absolute top-2 sm:top-3 inset-inline-start-2 sm:inset-inline-start-3 text-[10px] sm:text-[11px] font-bold text-[#7A233E] bg-white/95 border border-[#D4CFC7] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs">
            {discountPct > 0
              ? `-${discountPct}%`
              : language === 'ur'
              ? 'نئی آمد'
              : 'New'}
          </span>
        )}

        {/* Wishlist Toggle */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? t.product.savedInWishlist : t.product.addToWishlist}
          className="absolute top-2 sm:top-3 inset-inline-end-2 sm:inset-inline-end-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-[#D4CFC7] flex items-center justify-center text-[#161214] hover:bg-[#F6ECF0] transition-colors cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              wishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : 'text-[#161214]'
            }`}
          />
        </button>
      </Link>

      {/* Card Body */}
      <div className="p-2.5 min-[375px]:p-3.5 sm:p-5 flex-1 flex flex-col justify-between gap-2.5 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2.5">
          {/* Crisp high-contrast category & rating metadata */}
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-[10px] min-[375px]:text-[11px] sm:text-xs font-bold">
            <span className="truncate text-[#7A233E] max-w-full">{t.categories[product.category]}</span>
            <span className="inline-flex items-center gap-0.5 sm:gap-1 shrink-0 tabular-nums text-[#161214]">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#B58428] text-[#B58428]" />
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <span className="font-semibold text-[#2F2A2C]">({product.reviewCount})</span>
            </span>
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-display text-[13px] min-[375px]:text-[15px] sm:text-lg font-bold text-[#161214] leading-snug group-hover:text-[#7A233E] transition-colors line-clamp-2">
              {product.name[language]}
            </h3>
          </Link>

          <p className="text-[11px] min-[375px]:text-xs sm:text-[13px] font-bold text-[#161214] line-clamp-2 leading-snug">
            {product.subtitle[language]}
          </p>

          {/* Shade Swatches (with picture thumbnails when available) */}
          {product.shades.length > 0 && (
            <div className="pt-1 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {product.shades.map((shade) => {
                  const active = shade.id === activeShade?.id;
                  if (hasShadeImages && shade.image) {
                    return (
                      <button
                        key={shade.id}
                        type="button"
                        onClick={() => {
                          setSelectedShadeId(shade.id);
                          setImgError(false);
                        }}
                        title={shade.name[language]}
                        aria-label={shade.name[language]}
                        aria-pressed={active}
                        className={`relative w-6 h-6 min-[375px]:w-7 min-[375px]:h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 ${
                          active
                            ? 'border-[#7A233E] ring-2 ring-[#7A233E]/60 ring-offset-1 ring-offset-white scale-105'
                            : 'border-[#D4CFC7] opacity-85 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <img
                          src={shade.image}
                          alt={shade.name[language]}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span
                          className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5"
                          style={{ backgroundColor: shade.hex }}
                        />
                      </button>
                    );
                  }
                  return (
                    <button
                      key={shade.id}
                      type="button"
                      onClick={() => setSelectedShadeId(shade.id)}
                      title={shade.name[language]}
                      aria-label={shade.name[language]}
                      aria-pressed={active}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full p-0.5 transition-all cursor-pointer ${
                        active
                          ? 'ring-2 ring-[#7A233E] ring-offset-2 ring-offset-white'
                          : 'hover:scale-110'
                      }`}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-[#161214]/35"
                        style={{ backgroundColor: shade.hex }}
                      />
                    </button>
                  );
                })}
              </div>
              {activeShade && (
                <p className="text-[11px] sm:text-xs font-bold text-[#161214] truncate flex items-center gap-1.5 sm:gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-[#161214]/40 shrink-0"
                    style={{ backgroundColor: activeShade.hex }}
                  />
                  <span className="truncate">
                    {activeShade.name[language]} · {activeShade.finishLabel[language]}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bottom Price + Add to Bag Row */}
        <div className="pt-2.5 sm:pt-3 border-t border-[#D4CFC7] flex flex-col min-[440px]:flex-row min-[440px]:items-center justify-between gap-2 sm:gap-3">
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 tabular-nums">
            <span className="text-sm sm:text-lg font-extrabold text-[#161214]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs font-bold text-[#524B4E] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full min-[440px]:w-auto inline-flex items-center justify-center gap-1.5 rounded-full px-3 sm:px-4 py-2 min-h-[36px] sm:min-h-[38px] text-[11px] sm:text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              justAdded
                ? 'bg-[#7A233E] text-white'
                : 'bg-[#161214] text-white hover:bg-[#2E2528]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.product.addedToBag}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t.product.addToBag}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
