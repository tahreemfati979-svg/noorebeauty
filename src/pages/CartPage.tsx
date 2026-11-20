import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Crown, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LOYALTY_REWARDS, useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const {
    detailedCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    loyaltyDiscountAmount,
    activeLoyaltyReward,
    removeActiveLoyaltyReward,
    redeemLoyaltyReward,
    loyalty,
    calculateOrderPoints,
    shippingCost,
    total,
    couponCode,
    applyCoupon,
    clearCoupon,
    showToast,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<'ok' | 'err' | null>(null);
  const navigate = useNavigate();

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const valid = applyCoupon(couponInput);
    setCouponStatus(valid ? 'ok' : 'err');
    if (valid) setCouponInput('');
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-14 space-y-8 sm:space-y-10">
      <div className="pb-5 sm:pb-6 border-b border-[#D4CFC7]">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#161214]">
          {t.cart.title}
        </h1>
      </div>

      {detailedCart.length === 0 ? (
        <div className="rounded-3xl bg-white border border-[#D4CFC7] p-7 sm:p-12 md:p-16 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F6ECF0] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7 text-[#7A233E]" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#161214]">{t.cart.emptyTitle}</h2>
          <p className="text-sm text-[#2F2A2C]">{t.cart.emptyBody}</p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#161214] text-white px-7 py-3 text-xs font-semibold hover:bg-[#2E2528] transition-colors"
            >
              <span>{t.cart.continueShopping}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {detailedCart.map(({ product, shade, quantity }) => (
              <div
                key={`${product.id}-${shade.id}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white border border-[#D4CFC7]"
              >
                <Link
                  to={`/product/${product.slug}`}
                  className="w-full sm:w-28 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-[#F0EEE9] shrink-0"
                >
                  <img
                    src={shade.image || product.images[0]}
                    alt={`${product.name[language]} — ${shade.name[language]}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="text-xs font-bold text-[#7A233E]">{t.categories[product.category]}</p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="font-display text-lg font-bold text-[#161214] hover:text-[#7A233E] block"
                  >
                    {product.name[language]}
                  </Link>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#161214]">
                    <span
                      className="w-3 h-3 rounded-full border border-[#161214]/35"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span>{shade.name[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums font-bold">{formatPrice(product.price)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#D4CFC7]">
                  <div className="inline-flex items-center rounded-full border border-[#C7C0B6] bg-[#F4F3F0]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, shade.id, quantity - 1)}
                      aria-label="Decrease quantity"
                      className="p-2 text-[#161214] hover:text-[#7A233E] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold tabular-nums">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, shade.id, quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-2 text-[#161214] hover:text-[#7A233E] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-base font-bold text-[#161214] tabular-nums sm:min-w-[72px] text-end">
                    {formatPrice(product.price * quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id, shade.id)}
                    aria-label={t.cart.remove}
                    className="p-2 text-[#524B4E] hover:text-[#B91C1C] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-7 space-y-5 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold text-[#161214]">
              {t.checkout.summarySection}
            </h2>

            <form onSubmit={handleCoupon} className="space-y-2">
              <div className="flex flex-col min-[380px]:flex-row gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponStatus(null);
                  }}
                  placeholder={t.cart.couponPlaceholder}
                  className="flex-1 min-w-0 rounded-full border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-xs text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E]"
                />
                <button
                  type="submit"
                  className="rounded-full border border-[#161214] px-4 py-2.5 text-xs font-semibold text-[#161214] hover:bg-[#F6ECF0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {t.cart.applyCoupon}
                </button>
              </div>
              <p className="text-[11px] font-medium text-[#524B4E]">{t.cart.couponHint}</p>
              {couponCode && (
                <div className="flex items-center justify-between text-xs text-[#7A233E] font-medium">
                  <span>
                    {t.cart.couponApplied}: <strong>{couponCode}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={clearCoupon}
                    className="text-[#B91C1C] underline cursor-pointer"
                  >
                    {t.cart.remove}
                  </button>
                </div>
              )}
              {couponStatus === 'err' && (
                <p className="text-xs font-medium text-[#B91C1C]">{t.cart.couponInvalid}</p>
              )}
            </form>

            <div className="space-y-2.5 text-sm pt-3 border-t border-[#D4CFC7]">
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
              <div className="flex justify-between text-base font-bold text-[#161214] pt-3 border-t border-[#D4CFC7]">
                <span>{t.cart.total}</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Noore Glow Club Compact Panel */}
            <div className="rounded-2xl bg-[#F4F3F0] border border-[#D4CFC7] p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-bold text-[#161214]">
                  <Crown className="w-3.5 h-3.5 text-[#7A233E]" />
                  <span>{t.loyalty.cartPanelTitle}</span>
                </span>
                {loyalty.isEnrolled && (
                  <span className="text-[#7A233E] font-bold tabular-nums">
                    {loyalty.points} {t.loyalty.pointsUnit}
                  </span>
                )}
              </div>

              {loyalty.isEnrolled ? (
                <div className="space-y-2">
                  <p className="text-[#2F2A2C]">
                    {t.loyalty.pointsWillEarn}:{' '}
                    <strong className="text-[#161214] tabular-nums">
                      +{calculateOrderPoints(Math.max(0, total - shippingCost))} {t.loyalty.pointsUnit}
                    </strong>
                  </p>
                  {!activeLoyaltyReward &&
                    LOYALTY_REWARDS.some((r) => loyalty.points >= r.pointsCost) && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {LOYALTY_REWARDS.filter((r) => loyalty.points >= r.pointsCost).map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              if (redeemLoyaltyReward(r.id)) showToast(t.loyalty.redeemedToast);
                            }}
                            className="rounded-full border border-[#7A233E] bg-white px-3 py-1 text-[11px] font-semibold text-[#7A233E] hover:bg-[#F6ECF0] cursor-pointer"
                          >
                            {r.title[language]} ({r.pointsCost})
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ) : (
                <Link
                  to="/loyalty"
                  className="text-[#7A233E] hover:text-[#161214] underline font-semibold inline-block"
                >
                  {t.loyalty.joinForWelcome}
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full rounded-full bg-[#161214] text-white py-3.5 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
            >
              {t.cart.checkoutCta}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};
