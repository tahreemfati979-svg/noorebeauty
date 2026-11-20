import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Check, Crown, Gift, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LOYALTY_REWARDS, LOYALTY_TIERS, useStore } from '../context/StoreContext';

export const LoyaltyPage: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const {
    loyalty,
    currentTier,
    enrollLoyalty,
    redeemLoyaltyReward,
    removeActiveLoyaltyReward,
    activeLoyaltyReward,
    claimLoyaltyBonus,
    wishlist,
    showToast,
  } = useStore();

  const [nameInput, setNameInput] = useState(loyalty.memberName || '');
  const [emailInput, setEmailInput] = useState(loyalty.memberEmail || '');
  const [formError, setFormError] = useState('');

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.trim());
    if (!nameInput.trim() || !validEmail) {
      setFormError(t.loyalty.validationError);
      return;
    }
    enrollLoyalty(nameInput, emailInput);
    showToast(`${t.loyalty.kicker} · +200 ${t.loyalty.pointsUnit}`);
  };

  const handleRedeem = (rewardId: string) => {
    const ok = redeemLoyaltyReward(rewardId);
    if (ok) {
      showToast(t.loyalty.redeemedToast);
    }
  };

  const handleClaimWishlist = () => {
    if (wishlist.length === 0) return;
    const ok = claimLoyaltyBonus('wishlist');
    if (ok) {
      showToast(`+75 ${t.loyalty.pointsUnit}`);
    }
  };

  const nextThreshold = currentTier.nextThreshold;
  const tierStart = currentTier.minPoints;
  const progressPct = nextThreshold
    ? Math.min(100, Math.round(((loyalty.lifetimePoints - tierStart) / (nextThreshold - tierStart)) * 100))
    : 100;
  const pointsToNext = nextThreshold ? Math.max(0, nextThreshold - loyalty.lifetimePoints) : 0;

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16 space-y-12 sm:space-y-20">
      {/* Header & Member Pass / Enrollment */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <p className="text-xs font-bold text-[#7A233E] uppercase tracking-wider">
            {t.loyalty.kicker}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#161214] leading-[1.15] text-balance">
            {t.loyalty.title}
          </h1>
          <p className="text-sm sm:text-base text-[#2F2A2C] leading-relaxed max-w-xl">
            {t.loyalty.subtitle}
          </p>

          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-[#524B4E]">
            <span>{t.loyalty.welcomeGiftNote}</span>
          </div>
        </div>

        <div className="lg:col-span-6">
          {!loyalty.isEnrolled ? (
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 lg:p-9 shadow-[0_24px_60px_-20px_rgba(22,18,20,0.12)] space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#7A233E]">
                  <Crown className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A233E]">
                    {t.loyalty.memberCardLabel}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-[#161214]">
                  {t.loyalty.joinTitle}
                </h2>
                <p className="text-sm text-[#2F2A2C]">{t.loyalty.joinSubtitle}</p>
              </div>

              <form onSubmit={handleJoinSubmit} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161214] block">
                    {t.loyalty.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Ayesha Khan"
                    className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-3 text-base sm:text-sm text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161214] block">
                    {t.loyalty.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="ayesha@example.com"
                    className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-3 text-base sm:text-sm text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E]"
                  />
                </div>

                {formError && <p className="text-xs font-medium text-[#B91C1C]">{formError}</p>}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#161214] text-white py-3.5 px-6 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
                >
                  {t.loyalty.joinCta}
                </button>
              </form>
            </div>
          ) : (
            <div className="rounded-2xl sm:rounded-3xl bg-[#161214] text-white p-5 sm:p-8 lg:p-9 shadow-[0_24px_60px_-16px_rgba(22,18,20,0.35)] border border-[#E8C57B]/40 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-[#E8C57B] font-bold">
                    {t.loyalty.memberCardLabel} · {t.loyalty.tierNames[currentTier.id]}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium text-white break-words">
                    {loyalty.memberName}
                  </h2>
                  <p className="text-xs text-[#D6D2CB] break-all">{loyalty.memberEmail}</p>
                </div>
                <Crown className="w-7 h-7 text-[#E8C57B] shrink-0" />
              </div>

              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 pt-4 border-t border-white/15">
                <div>
                  <p className="text-xs text-[#D6D2CB]">{t.loyalty.availablePoints}</p>
                  <p className="font-display text-3xl sm:text-4xl font-medium text-white tabular-nums mt-1">
                    {loyalty.points}{' '}
                    <span className="text-sm font-sans text-[#E8C57B]">{t.loyalty.pointsUnit}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#D6D2CB]">{t.loyalty.lifetimePoints}</p>
                  <p className="font-display text-2xl sm:text-3xl font-medium text-white tabular-nums mt-1">
                    {loyalty.lifetimePoints}{' '}
                    <span className="text-xs font-sans text-[#D6D2CB]">
                      ({currentTier.multiplier}×)
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#E5E2DC]">
                  <span>
                    {nextThreshold
                      ? `${pointsToNext} ${t.loyalty.nextTierProgress}`
                      : t.loyalty.topTierReached}
                  </span>
                  <span className="tabular-nums font-semibold">{progressPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#E8C57B] transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#161214] px-5 py-2.5 text-xs font-semibold hover:bg-[#F6ECF0] transition-colors whitespace-nowrap"
                >
                  <span>{t.hero.shopNow}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
                {activeLoyaltyReward && (
                  <Link
                    to="/cart"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8C57B] hover:text-white transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>
                      {activeLoyaltyReward.title[language]} · {t.loyalty.appliedLabel}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="space-y-8">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-[#161214]">
            {t.loyalty.tiersHeading}
          </h2>
          <p className="text-sm text-[#2F2A2C]">{t.loyalty.tiersSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {LOYALTY_TIERS.map((tier) => {
            const isCurrent = loyalty.isEnrolled && currentTier.id === tier.id;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border space-y-5 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-white border-[#7A233E] ring-1 ring-[#7A233E]/30 shadow-[0_18px_40px_-16px_rgba(122,35,62,0.18)]'
                    : 'bg-white border-[#D4CFC7]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#7A233E]">
                    <span className="font-bold uppercase tracking-wider">
                      {tier.minPoints === 0
                        ? `0 – 999 ${t.loyalty.pointsUnit}`
                        : tier.nextThreshold
                        ? `${tier.minPoints.toLocaleString()} – ${(tier.nextThreshold - 1).toLocaleString()} ${t.loyalty.pointsUnit}`
                        : `${tier.minPoints.toLocaleString()}+ ${t.loyalty.pointsUnit}`}
                    </span>
                    <span className="font-bold text-[#161214] tabular-nums">
                      {tier.multiplier}× {t.loyalty.multiplierLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-[#161214]">
                    {t.loyalty.tierNames[tier.id]}
                  </h3>

                  <ul className="space-y-2.5 pt-2">
                    {t.loyalty.tierPerks[tier.id].map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2F2A2C]">
                        <Check className="w-4 h-4 text-[#7A233E] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isCurrent && (
                  <div className="pt-4 border-t border-[#D4CFC7] text-xs font-bold text-[#7A233E] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.loyalty.tierNames[tier.id]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Redeem Rewards */}
      <section className="space-y-8">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-[#161214]">
            {t.loyalty.rewardsHeading}
          </h2>
          <p className="text-sm text-[#2F2A2C]">{t.loyalty.rewardsSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {LOYALTY_REWARDS.map((reward) => {
            const isApplied = loyalty.activeRewardId === reward.id;
            const effectiveAvailable =
              loyalty.points + (activeLoyaltyReward ? activeLoyaltyReward.pointsCost : 0);
            const canAfford = loyalty.isEnrolled && effectiveAvailable >= reward.pointsCost;
            const deficit = Math.max(0, reward.pointsCost - effectiveAvailable);

            return (
              <div
                key={reward.id}
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border flex flex-col justify-between space-y-6 ${
                  isApplied
                    ? 'bg-[#F6ECF0] border-[#7A233E]'
                    : 'bg-white border-[#D4CFC7]'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#7A233E] tabular-nums">
                      {reward.pointsCost} {t.loyalty.pointsUnit}
                    </span>
                    <Gift className="w-4 h-4 text-[#7A233E]" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#161214]">
                    {reward.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2F2A2C] leading-relaxed">
                    {reward.subtitle[language]}
                  </p>
                  <p className="text-sm font-bold text-[#161214] tabular-nums pt-1">
                    -{formatPrice(reward.discountAmount)}
                  </p>
                </div>

                <div>
                  {isApplied ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A233E]">
                        <Check className="w-4 h-4" />
                        <span>{t.loyalty.appliedLabel}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeActiveLoyaltyReward}
                        className="w-full rounded-full border border-[#161214] bg-white py-2.5 px-4 text-xs font-semibold text-[#161214] hover:bg-[#F4F3F0] transition-colors cursor-pointer"
                      >
                        {t.loyalty.removeRewardCta}
                      </button>
                    </div>
                  ) : !loyalty.isEnrolled ? (
                    <p className="text-xs font-medium text-[#524B4E]">{t.loyalty.joinFirstNote}</p>
                  ) : canAfford ? (
                    <button
                      type="button"
                      onClick={() => handleRedeem(reward.id)}
                      className="w-full rounded-full bg-[#161214] text-white py-3 px-5 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
                    >
                      {t.loyalty.redeemCta}
                    </button>
                  ) : (
                    <p className="text-xs font-medium text-[#524B4E] tabular-nums">
                      {deficit} {t.loyalty.needMorePoints}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ways to Earn & Points Activity Ledger */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-3xl font-semibold text-[#161214]">
              {t.loyalty.earnHeading}
            </h2>
            <p className="text-sm text-[#2F2A2C]">{t.loyalty.earnSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.loyalty.earnWays.map((way, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#D4CFC7] p-5 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-[#161214]">{way.title}</h3>
                  <span className="text-xs font-bold text-[#7A233E] tabular-nums shrink-0">
                    {way.points}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#2F2A2C] leading-relaxed">{way.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick Interactive Bonus Action */}
          {loyalty.isEnrolled && (
            <div className="rounded-2xl bg-white border border-[#D4CFC7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#7A233E] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#161214]">
                    {t.loyalty.claimWishlistBonus}
                  </p>
                  <p className="text-xs text-[#2F2A2C]">
                    {wishlist.length === 0 ? t.loyalty.wishlistNeedItem : `${wishlist.length} saved`}
                  </p>
                </div>
              </div>
              {loyalty.claimedWishlistBonus ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7A233E]">
                  <Check className="w-4 h-4" />
                  <span>{t.loyalty.bonusClaimed}</span>
                </span>
              ) : wishlist.length > 0 ? (
                <button
                  type="button"
                  onClick={handleClaimWishlist}
                  className="rounded-full bg-[#161214] text-white px-5 py-2.5 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t.loyalty.claimWishlistBonus}
                </button>
              ) : (
                <Link
                  to="/shop"
                  className="rounded-full border border-[#161214] px-5 py-2.5 text-xs font-semibold text-[#161214] hover:bg-[#F6ECF0] transition-colors whitespace-nowrap"
                >
                  {t.hero.shopNow}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Points Activity Ledger */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#D4CFC7]">
            <Award className="w-5 h-5 text-[#7A233E] shrink-0" />
            <h2 className="font-display text-2xl font-semibold text-[#161214]">
              {t.loyalty.historyHeading}
            </h2>
          </div>

          {loyalty.history.length === 0 ? (
            <p className="text-sm text-[#2F2A2C] py-4">{t.loyalty.historyEmpty}</p>
          ) : (
            <ul className="space-y-3 max-h-[340px] overflow-y-auto pe-1">
              {loyalty.history.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-[#E0DCD3] last:border-b-0 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#161214] break-words">
                      {entry.description[language]}
                    </p>
                    <p className="text-xs text-[#524B4E] tabular-nums">{entry.date}</p>
                  </div>
                  <span
                    className={`font-bold tabular-nums shrink-0 ${
                      entry.type === 'earn' ? 'text-[#15803D]' : 'text-[#B91C1C]'
                    }`}
                  >
                    {entry.points > 0 ? `+${entry.points}` : entry.points} {t.loyalty.pointsUnit}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};
