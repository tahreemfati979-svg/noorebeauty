import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Crown,
  ExternalLink,
  Pencil,
  ShieldCheck,
} from 'lucide-react';
import { buildWhatsAppClickToChatUrl } from '../config/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { LOYALTY_REWARDS, useStore } from '../context/StoreContext';
import { OrderRecord } from '../types';
import {
  formatWhatsAppOrderMessage,
  generateWhatsAppOrderId,
  validateWhatsAppCheckout,
} from '../utils/whatsappOrder';

const PENDING_DRAFT_KEY = 'ln_whatsapp_checkout_draft_v1';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M16.004 3.2c-7.062 0-12.8 5.738-12.8 12.8 0 2.256.592 4.462 1.714 6.404L3.1 29.05l6.814-1.786A12.74 12.74 0 0 0 16.004 28.8c7.062 0 12.8-5.738 12.8-12.8s-5.738-12.8-12.8-12.8Zm0 23.36a10.52 10.52 0 0 1-5.366-1.468l-.384-.228-4.044 1.06 1.08-3.942-.25-.398a10.528 10.528 0 0 1-1.616-5.584c0-5.826 4.74-10.566 10.58-10.566 5.826 0 10.566 4.74 10.566 10.566 0 5.84-4.74 10.56-10.566 10.56Zm5.796-7.912c-.318-.16-1.882-.928-2.174-1.034-.292-.106-.504-.16-.716.16-.212.318-.822 1.034-1.008 1.246-.186.212-.372.238-.69.08-.318-.16-1.342-.494-2.556-1.576-.944-.842-1.582-1.882-1.768-2.2-.186-.318-.02-.49.14-.648.144-.144.318-.372.478-.558.16-.186.212-.318.318-.53.106-.212.054-.398-.026-.558-.08-.16-.716-1.726-.982-2.362-.258-.62-.52-.536-.716-.546l-.61-.01c-.212 0-.558.08-.85.398-.292.318-1.114 1.088-1.114 2.652 0 1.564 1.14 3.076 1.298 3.288.16.212 2.244 3.428 5.436 4.806.76.328 1.352.524 1.814.67.762.242 1.454.208 2.002.126.61-.092 1.882-.768 2.148-1.512.266-.742.266-1.378.186-1.512-.08-.132-.292-.212-.61-.372Z" />
  </svg>
);

interface SavedCheckoutDraft {
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export const CheckoutPage: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const {
    detailedCart,
    subtotal,
    discountAmount,
    loyaltyDiscountAmount,
    activeLoyaltyReward,
    removeActiveLoyaltyReward,
    redeemLoyaltyReward,
    loyalty,
    calculateOrderPoints,
    awardOrderPoints,
    shippingCost,
    total,
    couponCode,
    clearCart,
    showToast,
  } = useStore();

  const [savedDraft] = useState<SavedCheckoutDraft | null>(() => {
    try {
      const raw = sessionStorage.getItem(PENDING_DRAFT_KEY);
      return raw ? (JSON.parse(raw) as SavedCheckoutDraft) : null;
    } catch {
      return null;
    }
  });

  const [draftOrderId] = useState<string>(
    () => savedDraft?.orderId || generateWhatsAppOrderId()
  );
  const [fullName, setFullName] = useState(
    () => savedDraft?.fullName || loyalty.memberName || ''
  );
  const [phone, setPhone] = useState(() => savedDraft?.phone || '');
  const [email, setEmail] = useState(
    () => savedDraft?.email || loyalty.memberEmail || ''
  );
  const [address, setAddress] = useState(() => savedDraft?.address || '');
  const [city, setCity] = useState(() => savedDraft?.city || '');
  const [notes, setNotes] = useState(() => savedDraft?.notes || '');

  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<OrderRecord | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);
  const [hasReturnedFromWhatsApp, setHasReturnedFromWhatsApp] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const lastClickAtRef = useRef<number>(0);

  const formValues = useMemo(
    () => ({
      fullName,
      phone,
      email,
      address,
      city,
      notes,
    }),
    [fullName, phone, email, address, city, notes]
  );

  useEffect(() => {
    if (submittedOrder) return;
    try {
      sessionStorage.setItem(
        PENDING_DRAFT_KEY,
        JSON.stringify({
          orderId: draftOrderId,
          fullName,
          phone,
          email,
          address,
          city,
          notes,
        } satisfies SavedCheckoutDraft)
      );
    } catch {
      // ignore storage errors
    }
  }, [draftOrderId, fullName, phone, email, address, city, notes, submittedOrder]);

  const fieldErrors = useMemo(() => validateWhatsAppCheckout(formValues), [formValues]);
  const isFormValid = Object.keys(fieldErrors).length === 0;

  const whatsappMessage = useMemo(
    () =>
      formatWhatsAppOrderMessage({
        language,
        orderId: pendingOrder?.orderNumber || draftOrderId,
        customer: formValues,
        items: detailedCart,
        subtotal,
        discountAmount,
        loyaltyDiscountAmount,
        shippingCost,
        total,
        couponCode: couponCode || undefined,
        formatPrice,
      }),
    [
      language,
      pendingOrder?.orderNumber,
      draftOrderId,
      formValues,
      detailedCart,
      subtotal,
      discountAmount,
      loyaltyDiscountAmount,
      shippingCost,
      total,
      couponCode,
      formatPrice,
    ]
  );

  const whatsappUrl = useMemo(
    () => buildWhatsAppClickToChatUrl(whatsappMessage),
    [whatsappMessage]
  );

  useEffect(() => {
    if (!pendingOrder) return;

    const markReturned = () => {
      if (document.visibilityState === 'visible') {
        setHasReturnedFromWhatsApp(true);
      }
    };

    window.addEventListener('focus', markReturned);
    document.addEventListener('visibilitychange', markReturned);
    return () => {
      window.removeEventListener('focus', markReturned);
      document.removeEventListener('visibilitychange', markReturned);
    };
  }, [pendingOrder]);

  const handleWhatsAppOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isFormValid) {
      e.preventDefault();
      setShowValidationErrors(true);

      const firstErrorFieldId = fieldErrors.fullName
        ? 'checkout-fullName'
        : fieldErrors.phone
        ? 'checkout-phone'
        : fieldErrors.email
        ? 'checkout-email'
        : fieldErrors.address
        ? 'checkout-address'
        : 'checkout-city';

      const targetEl = document.getElementById(firstErrorFieldId);
      if (targetEl) {
        targetEl.focus();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const now = Date.now();
    if (now - lastClickAtRef.current < 1500) {
      e.preventDefault();
      return;
    }
    lastClickAtRef.current = now;

    const orderSnapshot: OrderRecord = {
      orderNumber: draftOrderId,
      createdAt: new Date().toLocaleDateString(),
      status: 'pending_whatsapp_verification',
      customer: {
        fullName: fullName.trim(),
        email: email.trim() || undefined,
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        notes: notes.trim() || undefined,
      },
      items: detailedCart,
      subtotal,
      discount: discountAmount,
      loyaltyDiscount: loyaltyDiscountAmount,
      shipping: shippingCost,
      total,
      couponCode: couponCode || undefined,
      whatsappMessage,
    };

    setPendingOrder(orderSnapshot);
    setHasReturnedFromWhatsApp(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmWhatsAppSent = () => {
    if (!pendingOrder) return;
    const earned = awardOrderPoints(
      Math.max(0, pendingOrder.total - pendingOrder.shipping),
      pendingOrder.orderNumber
    );
    setSubmittedOrder(pendingOrder);
    setPendingOrder(null);
    clearCart();
    try {
      sessionStorage.removeItem(PENDING_DRAFT_KEY);
    } catch {
      // ignore
    }
    if (earned > 0) {
      showToast(`${t.loyalty.kicker} · +${earned} ${t.loyalty.pointsUnit}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyMessage = async (msg: string) => {
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedMessage(true);
      showToast(t.checkout.copiedToast);
      window.setTimeout(() => setCopiedMessage(false), 2400);
    } catch {
      showToast(t.checkout.copiedToast);
    }
  };

  if (submittedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 md:p-11 space-y-6 sm:space-y-7 shadow-[0_24px_60px_-20px_rgba(22,18,20,0.12)]">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#15803D]/12 border border-[#15803D]/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-[#15803D]" />
            </div>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-[#F6ECF0] border border-[#7A233E]/30 px-4 py-1.5 text-xs font-bold text-[#7A233E]">
              <Clock3 className="w-3.5 h-3.5 shrink-0" />
              <span>{t.checkout.awaitingStoreVerificationBadge}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-[#161214]">
              {t.checkout.sentPendingVerificationTitle}
            </h1>
            <p className="text-sm text-[#2F2A2C] max-w-xl mx-auto leading-relaxed">
              {t.checkout.sentPendingVerificationSubtitle}
            </p>
          </div>

          <div className="rounded-2xl bg-[#F4F3F0] border border-[#D4CFC7] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs font-medium text-[#524B4E]">{t.checkout.orderNumberLabel}</p>
              <p className="font-bold text-[#161214] tabular-nums mt-0.5">
                #{submittedOrder.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#524B4E]">
                {t.checkout.awaitingStoreVerificationBadge.split(':')[0]}
              </p>
              <p className="font-bold text-[#7A233E] mt-0.5">
                {t.checkout.pendingVerificationStatus}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#524B4E]">{t.checkout.deliverToLabel}</p>
              <p className="font-bold text-[#161214] mt-0.5 truncate">
                {submittedOrder.customer.fullName} · {submittedOrder.customer.city}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {submittedOrder.items.map(({ product, shade, quantity }) => (
              <div
                key={`${product.id}-${shade.id}`}
                className="flex items-center justify-between gap-3 text-sm py-2 border-b border-[#E0DCD3]"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-[#161214] break-words">{product.name[language]}</p>
                  <p className="text-xs text-[#2F2A2C]">
                    {shade.name[language]} × {quantity}
                  </p>
                </div>
                <span className="font-bold tabular-nums text-[#161214] shrink-0">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold text-[#161214] pt-2 border-t border-[#D4CFC7]">
            <span>{t.cart.total}</span>
            <span className="tabular-nums">{formatPrice(submittedOrder.total)}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-[#161214] text-white px-8 py-3.5 text-xs font-semibold hover:bg-[#2E2528] transition-colors"
            >
              {t.checkout.returnHome}
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full border border-[#161214] bg-white text-[#161214] px-8 py-3.5 text-xs font-semibold hover:bg-[#F6ECF0] transition-colors"
            >
              {t.checkout.continueShopping}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (pendingOrder) {
    const activeMessage = pendingOrder.whatsappMessage || whatsappMessage;
    const reopenUrl = buildWhatsAppClickToChatUrl(activeMessage);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 md:p-11 space-y-6 sm:space-y-7 shadow-[0_24px_60px_-20px_rgba(22,18,20,0.12)]">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#15803D]/12 border border-[#15803D]/30 flex items-center justify-center mx-auto text-[#15803D]">
              <WhatsAppIcon className="w-7 h-7" />
            </div>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-[#F6ECF0] border border-[#7A233E]/30 px-4 py-1.5 text-xs font-bold text-[#7A233E]">
              <Clock3 className="w-3.5 h-3.5 shrink-0" />
              <span>{t.checkout.whatsappPendingBadge}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
              {t.checkout.whatsappPendingTitle}
            </h1>
            <p className="text-sm text-[#2F2A2C] max-w-xl mx-auto leading-relaxed">
              {t.checkout.whatsappPendingSubtitle}
            </p>
          </div>

          {hasReturnedFromWhatsApp && (
            <div className="rounded-2xl bg-[#ECFDF5] border border-[#15803D]/35 p-4 text-sm text-[#14532D] font-semibold text-center">
              {t.checkout.whatsappReturnedBanner}
            </div>
          )}

          <div className="rounded-2xl bg-[#F4F3F0] border border-[#D4CFC7] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs font-medium text-[#524B4E]">{t.checkout.orderNumberLabel}</p>
              <p className="font-bold text-[#161214] tabular-nums mt-0.5">
                #{pendingOrder.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#524B4E]">
                {t.checkout.whatsappPendingBadge.split(':')[0]}
              </p>
              <p className="font-bold text-[#7A233E] mt-0.5">
                {t.checkout.pendingVerificationStatus}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#524B4E]">{t.checkout.deliverToLabel}</p>
              <p className="font-bold text-[#161214] mt-0.5 truncate">
                {pendingOrder.customer.fullName} · {pendingOrder.customer.city}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F4F3F0] border border-[#D4CFC7] p-4 sm:p-5 space-y-2 text-xs text-[#2F2A2C] break-words">
            <p>
              <strong className="text-[#161214]">{t.checkout.phone}:</strong>{' '}
              <span dir="ltr" className="tabular-nums font-medium">
                {pendingOrder.customer.phone}
              </span>
            </p>
            {pendingOrder.customer.email && (
              <p>
                <strong className="text-[#161214]">{t.checkout.email}:</strong>{' '}
                {pendingOrder.customer.email}
              </p>
            )}
            <p>
              <strong className="text-[#161214]">{t.checkout.address}:</strong>{' '}
              {pendingOrder.customer.address}, {pendingOrder.customer.city}
            </p>
            {pendingOrder.customer.notes && (
              <p>
                <strong className="text-[#161214]">{t.checkout.notesSummaryLabel}:</strong>{' '}
                {pendingOrder.customer.notes}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {pendingOrder.items.map(({ product, shade, quantity }) => (
              <div
                key={`${product.id}-${shade.id}`}
                className="flex items-center justify-between gap-3 text-sm py-2 border-b border-[#E0DCD3]"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-[#161214] break-words">{product.name[language]}</p>
                  <p className="text-xs text-[#2F2A2C]">
                    {shade.name[language]} × {quantity}
                  </p>
                </div>
                <span className="font-bold tabular-nums text-[#161214] shrink-0">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-sm pt-1">
            <div className="flex justify-between text-[#2F2A2C]">
              <span>{t.cart.subtotal}</span>
              <span className="tabular-nums font-medium">{formatPrice(pendingOrder.subtotal)}</span>
            </div>
            {pendingOrder.discount > 0 && (
              <div className="flex justify-between text-[#7A233E] font-medium">
                <span>{t.cart.discount}</span>
                <span className="tabular-nums">-{formatPrice(pendingOrder.discount)}</span>
              </div>
            )}
            {(pendingOrder.loyaltyDiscount || 0) > 0 && (
              <div className="flex justify-between text-[#7A233E] font-medium">
                <span>{t.loyalty.activeRewardLabel}</span>
                <span className="tabular-nums">
                  -{formatPrice(pendingOrder.loyaltyDiscount || 0)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-[#2F2A2C]">
              <span>{t.cart.shipping}</span>
              <span className="tabular-nums font-medium">
                {pendingOrder.shipping === 0
                  ? t.cart.freeShipping
                  : formatPrice(pendingOrder.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#161214] pt-3 border-t border-[#D4CFC7]">
              <span>{t.cart.total}</span>
              <span className="tabular-nums">{formatPrice(pendingOrder.total)}</span>
            </div>
          </div>

          <p className="text-xs font-medium text-[#7A233E] bg-[#F6ECF0] border border-[#7A233E]/25 rounded-xl px-4 py-3 text-center">
            {t.checkout.whatsappCartPreservedNote}
          </p>

          <div className="rounded-2xl bg-[#F4F3F0] border border-[#15803D]/35 p-5 space-y-3 text-center">
            <button
              type="button"
              onClick={handleConfirmWhatsAppSent}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#161214] text-white px-8 py-3.5 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
              <span>{t.checkout.confirmSentCta}</span>
            </button>
            <p className="text-[11px] font-medium text-[#2F2A2C]">{t.checkout.confirmSentHint}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <a
              href={reopenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#15803D] text-white px-7 py-3.5 text-xs font-semibold hover:bg-[#166534] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.checkout.reopenWhatsapp}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-85" />
            </a>

            <button
              type="button"
              onClick={() => handleCopyMessage(activeMessage)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#161214] bg-white text-[#161214] px-6 py-3.5 text-xs font-semibold hover:bg-[#F6ECF0] transition-colors cursor-pointer"
            >
              {copiedMessage ? (
                <Check className="w-4 h-4 text-[#15803D]" />
              ) : (
                <Copy className="w-4 h-4 text-[#161214]" />
              )}
              <span>{t.checkout.copyWhatsappMessage}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPendingOrder(null);
                setHasReturnedFromWhatsApp(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C7C0B6] bg-white text-[#161214] px-6 py-3.5 text-xs font-semibold hover:bg-[#F4F3F0] transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>{t.checkout.editOrderDetails}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (detailedCart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display text-3xl font-semibold text-[#161214]">{t.cart.emptyTitle}</h1>
        <p className="text-sm text-[#2F2A2C]">{t.cart.emptyBody}</p>
        <Link
          to="/shop"
          className="inline-flex rounded-full bg-[#161214] text-white px-7 py-3 text-xs font-semibold"
        >
          {t.cart.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-14 space-y-6 sm:space-y-8">
      <div className="pb-5 sm:pb-6 border-b border-[#D4CFC7]">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#161214]">
          {t.checkout.title}
        </h1>
        <p className="text-sm text-[#2F2A2C] mt-1">{t.checkout.subtitle}</p>
      </div>

      <div
        id="checkout-form"
        className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start"
      >
        {/* Left Form Sections */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Customer Info */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 space-y-4">
            <h2 className="font-display text-xl font-semibold text-[#161214]">
              {t.checkout.customerSection}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label
                  htmlFor="checkout-fullName"
                  className="text-xs font-bold text-[#161214] block"
                >
                  {t.checkout.fullName} *
                </label>
                <input
                  id="checkout-fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full rounded-xl border bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E] ${
                    showValidationErrors && fieldErrors.fullName
                      ? 'border-[#B91C1C]'
                      : 'border-[#C7C0B6]'
                  }`}
                />
                {showValidationErrors && fieldErrors.fullName && (
                  <p className="text-xs font-medium text-[#B91C1C]">{t.checkout.validationFullName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="checkout-phone"
                  className="text-xs font-bold text-[#161214] block"
                >
                  {t.checkout.phone} *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  placeholder="03XX XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full rounded-xl border bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E] ${
                    showValidationErrors && fieldErrors.phone
                      ? 'border-[#B91C1C]'
                      : 'border-[#C7C0B6]'
                  }`}
                />
                {showValidationErrors && fieldErrors.phone && (
                  <p className="text-xs font-medium text-[#B91C1C]">{t.checkout.validationPhone}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="checkout-email"
                  className="text-xs font-bold text-[#161214] block"
                >
                  {t.checkout.email}{' '}
                  <span className="font-normal text-[#524B4E]">
                    ({t.checkout.optionalLabel})
                  </span>
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl border bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E] ${
                    showValidationErrors && fieldErrors.email
                      ? 'border-[#B91C1C]'
                      : 'border-[#C7C0B6]'
                  }`}
                />
                {showValidationErrors && fieldErrors.email && (
                  <p className="text-xs font-medium text-[#B91C1C]">{t.checkout.validationEmail}</p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 space-y-4">
            <h2 className="font-display text-xl font-semibold text-[#161214]">
              {t.checkout.shippingSection}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label
                  htmlFor="checkout-address"
                  className="text-xs font-bold text-[#161214] block"
                >
                  {t.checkout.address} *
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full rounded-xl border bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E] ${
                    showValidationErrors && fieldErrors.address
                      ? 'border-[#B91C1C]'
                      : 'border-[#C7C0B6]'
                  }`}
                />
                {showValidationErrors && fieldErrors.address && (
                  <p className="text-xs font-medium text-[#B91C1C]">{t.checkout.validationAddress}</p>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label
                  htmlFor="checkout-city"
                  className="text-xs font-bold text-[#161214] block"
                >
                  {t.checkout.city} *
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full rounded-xl border bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E] ${
                    showValidationErrors && fieldErrors.city
                      ? 'border-[#B91C1C]'
                      : 'border-[#C7C0B6]'
                  }`}
                />
                {showValidationErrors && fieldErrors.city && (
                  <p className="text-xs font-medium text-[#B91C1C]">{t.checkout.validationCity}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Order Notes */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-semibold text-[#161214]">
                {t.checkout.notesSection}
              </h2>
              <span className="text-xs font-medium text-[#524B4E]">{t.checkout.optionalLabel}</span>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="checkout-notes"
                className="text-xs font-bold text-[#161214] block"
              >
                {t.checkout.notes}
              </label>
              <textarea
                id="checkout-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.checkout.notesPlaceholder}
                className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-3 text-base sm:text-sm text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E]"
              />
            </div>
          </div>

          {showValidationErrors && !isFormValid && (
            <p
              role="alert"
              className="text-sm font-semibold text-[#B91C1C] bg-[#FEF2F2] border border-[#B91C1C]/35 rounded-2xl px-4 py-3"
            >
              {t.checkout.validationRequired}
            </p>
          )}
        </div>

        {/* Order Summary Right */}
        <aside className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 space-y-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-xl font-semibold text-[#161214]">
              {t.checkout.summarySection}
            </h2>
            <span className="text-xs font-bold text-[#7A233E] tabular-nums">
              #{draftOrderId}
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pe-1">
            {detailedCart.map(({ product, shade, quantity }) => (
              <div key={`${product.id}-${shade.id}`} className="flex items-center gap-3.5">
                <img
                  src={shade.image || product.images[0]}
                  alt={`${product.name[language]} — ${shade.name[language]}`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover bg-[#F0EEE9] shrink-0 border border-[#D4CFC7]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#161214] truncate">
                    {product.name[language]}
                  </p>
                  <p className="text-xs text-[#2F2A2C] truncate">
                    {shade.name[language]} × {quantity}
                  </p>
                </div>
                <span className="text-sm font-bold tabular-nums text-[#161214] shrink-0">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm pt-4 border-t border-[#D4CFC7]">
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

          <div className="rounded-2xl bg-[#F4F3F0] border border-[#D4CFC7] p-4 space-y-2 text-xs">
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

          {/* Collapsible WhatsApp Message Preview */}
          <div className="rounded-2xl border border-[#C7C0B6] bg-[#F4F3F0] overflow-hidden">
            <button
              type="button"
              onClick={() => setShowMessagePreview((prev) => !prev)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-[#161214] hover:text-[#7A233E] cursor-pointer"
            >
              <span>{t.checkout.whatsappPreviewToggle}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showMessagePreview ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showMessagePreview && (
              <pre
                dir="auto"
                className="px-4 pb-3 pt-2 border-t border-[#D4CFC7] text-xs leading-relaxed text-[#161214] whitespace-pre-wrap break-words font-sans max-h-56 overflow-y-auto bg-white"
              >
                {whatsappMessage}
              </pre>
            )}
          </div>

          {/* Prominent Place Order on WhatsApp CTA */}
          <div className="space-y-2.5 pt-1">
            <a
              href={isFormValid ? whatsappUrl : '#checkout-form'}
              target={isFormValid ? '_blank' : undefined}
              rel={isFormValid ? 'noopener noreferrer' : undefined}
              onClick={handleWhatsAppOrderClick}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#15803D] text-white py-4 px-6 text-sm font-semibold hover:bg-[#166534] transition-colors shadow-[0_12px_28px_-10px_rgba(21,128,61,0.5)] cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>{t.checkout.orderOnWhatsapp}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90 shrink-0" />
            </a>

            <p className="text-xs text-[#2F2A2C] text-center leading-relaxed">
              {t.checkout.whatsappHelperNote}
            </p>
            <p className="inline-flex items-center justify-center gap-1.5 w-full text-xs font-medium text-[#524B4E] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7A233E] shrink-0" />
              <span>{t.checkout.whatsappSecurityNote}</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
