import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const {
    detailedCart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    loyaltyDiscountAmount,
    activeLoyaltyReward,
    removeActiveLoyaltyReward,
    shippingCost,
    total,
    couponCode,
    applyCoupon,
    clearCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<'ok' | 'err' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCartDrawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCartDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeCartDrawer, isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const valid = applyCoupon(couponInput);
    setCouponFeedback(valid ? 'ok' : 'err');
    if (valid) setCouponInput('');
  };

  const goTo = (path: string) => {
    closeCartDrawer();
    navigate(path);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.drawerTitle}
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        className="fixed inset-0 bg-[#161214]/45 backdrop-blur-xs transition-opacity"
        onClick={closeCartDrawer}
      />
      <aside className="relative w-full max-w-md bg-[#F4F3F0] h-full shadow-2xl flex flex-col z-10 border-s border-[#D4CFC7]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-white border-b border-[#D4CFC7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#161214]" />
            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#161214]">
              {t.cart.drawerTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            aria-label="Close bag"
            className="p-2 rounded-full hover:bg-[#F6ECF0] text-[#161214] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {detailedCart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white border border-[#D4CFC7] flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7 text-[#7A233E]" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#161214] mb-2">
              {t.cart.emptyTitle}
            </h3>
            <p className="text-sm text-[#2F2A2C] mb-6 max-w-xs">{t.cart.emptyBody}</p>
            <button
              type="button"
              onClick={() => goTo('/shop')}
              className="rounded-full bg-[#161214] text-white px-6 py-3 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
            >
              {t.cart.continueShopping}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-3.5 sm:space-y-4">
              {detailedCart.map(({ product, shade, quantity }) => (
                <div
                  key={`${product.id}-${shade.id}`}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-white border border-[#D4CFC7]"
                >
                  <img
                    src={shade.image || product.images[0]}
                    alt={`${product.name[language]} — ${shade.name[language]}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-[#F0EEE9]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => goTo(`/product/${product.slug}`)}
                          className="text-start font-display text-sm font-semibold text-[#161214] hover:text-[#7A233E] truncate cursor-pointer"
                        >
                          {product.name[language]}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id, shade.id)}
                          aria-label={t.cart.remove}
                          className="text-[#524B4E] hover:text-[#B91C1C] p-1 cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="w-3 h-3 rounded-full border border-[#161214]/35 shrink-0"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <span className="text-xs font-bold text-[#161214] truncate">
                          {shade.name[language]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center rounded-full border border-[#C7C0B6] bg-[#F4F3F0]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, shade.id, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#161214] hover:text-[#7A233E] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-[#161214]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, shade.id, quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#161214] hover:text-[#7A233E] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#161214] tabular-nums">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Totals & Coupon */}
            <div className="border-t border-[#D4CFC7] bg-white px-4 sm:px-6 py-4 sm:py-5 space-y-4">
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponFeedback(null);
                    }}
                    placeholder={t.cart.couponPlaceholder}
                    className="flex-1 min-w-0 rounded-full border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2 text-base sm:text-xs text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E]"
                  />
                  <button
                    type="submit"
                    className="rounded-full border border-[#161214] px-4 py-2 text-xs font-semibold text-[#161214] hover:bg-[#F6ECF0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {t.cart.applyCoupon}
                  </button>
                </div>
                {couponCode && (
                  <div className="flex items-center justify-between text-xs text-[#2F2A2C]">
                    <span>
                      {t.cart.couponApplied}: <strong className="text-[#161214]">{couponCode}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={clearCoupon}
                      className="text-[#B91C1C] font-semibold underline cursor-pointer"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                )}
                {couponFeedback === 'err' && (
                  <p className="text-xs font-medium text-[#B91C1C]">{t.cart.couponInvalid}</p>
                )}
              </form>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#2F2A2C]">
                  <span>{t.cart.subtotal}</span>
                  <span className="tabular-nums font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#7A233E] font-medium">
                    <span>{t.cart.discount}</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                {loyaltyDiscountAmount > 0 && activeLoyaltyReward && (
                  <div className="flex items-center justify-between text-[#7A233E] font-medium">
                    <span className="flex items-center gap-2">
                      <span>{t.loyalty.activeRewardLabel}</span>
                      <button
                        type="button"
                        onClick={removeActiveLoyaltyReward}
                        className="text-[11px] text-[#B91C1C] underline cursor-pointer"
                      >
                        {t.cart.remove}
                      </button>
                    </span>
                    <span className="tabular-nums">-{formatPrice(loyaltyDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#2F2A2C]">
                  <span>{t.cart.shipping}</span>
                  <span className="tabular-nums font-medium">
                    {shippingCost === 0 ? t.cart.freeShipping : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#161214] pt-2 border-t border-[#D4CFC7]">
                  <span>{t.cart.total}</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => goTo('/cart')}
                  className="rounded-full border border-[#161214] py-3 px-3 text-xs font-semibold text-[#161214] hover:bg-[#F6ECF0] transition-colors cursor-pointer"
                >
                  {t.cart.viewFullCart}
                </button>
                <button
                  type="button"
                  onClick={() => goTo('/checkout')}
                  className="rounded-full bg-[#161214] text-white py-3 px-3 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
                >
                  {t.cart.checkoutCta}
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
