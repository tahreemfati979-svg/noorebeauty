import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star } from 'lucide-react';
import { IMAGES, products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CategorySlug } from '../types';

type CuratedTab = 'best' | 'new' | 'trending';

const categoryCards: Array<{ slug: Exclude<CategorySlug, 'all'>; image: string }> = [
  // Row 1: Makeup & Color Atelier
  { slug: 'makeup', image: IMAGES.heroVanity },
  { slug: 'lipsticks', image: IMAGES.lipstick },
  { slug: 'foundations', image: IMAGES.foundation },
  { slug: 'blush-highlighters', image: IMAGES.blush },
  { slug: 'eyeshadow-palettes', image: IMAGES.eyeshadow },
  { slug: 'mascaras', image: IMAGES.mascara },
  // Row 2: Skincare Ritual & Beauty Tools
  { slug: 'skincare', image: IMAGES.editorialRitual },
  { slug: 'face-serums', image: IMAGES.serum },
  { slug: 'sheet-masks', image: IMAGES.sheetMask },
  { slug: 'moisturizers', image: IMAGES.moisturizer },
  { slug: 'sunscreens', image: IMAGES.sunscreen },
  { slug: 'beauty-accessories', image: IMAGES.accessories },
];

const NEWEST_FEATURED_IDS = [
  'ln-msk-01',
  'ln-msk-02',
  'ln-skn-03',
  'ln-skn-04',
  'ln-lip-04',
  'ln-mkp-03',
  'ln-lip-02',
  'ln-eye-01',
];

const testimonials = [
  {
    name: { en: 'Zainab Mansoor', ur: 'زینب منصور' },
    role: { en: 'Editorial Stylist · Lahore', ur: 'ایڈیٹوریل اسٹائلسٹ · لاہور' },
    quote: {
      en: 'Switching to Noore Silk Veil Serum Foundation ended my midday dry patches—my skin still looks dewy and fresh after ten hours on set.',
      ur: 'نور سلک ویل سیرم فاؤنڈیشن کے استعمال کے بعد دن کے درمیان جلد کی خشکی ختم ہو گئی، اور دس گھنٹے بعد بھی چہرہ تروتازہ رہتا ہے۔',
    },
  },
  {
    name: { en: 'Amna Rehman', ur: 'آمنہ رحمان' },
    role: { en: 'Architect · Islamabad', ur: 'آرکیٹیکٹ · اسلام آباد' },
    quote: {
      en: 'Noore Golden Radiance Serum calmed my sensitive skin within two weeks while giving a natural glass-like glow underneath SPF.',
      ur: 'نور گولڈن ریڈیئنس سیرم نے صرف دو ہفتوں میں میری حساس جلد کو پرسکون کر کے قدرتی چمک عطا کی۔',
    },
  },
  {
    name: { en: 'Claire Beaumont', ur: 'کلیئر بیومونٹ' },
    role: { en: 'Beauty Editor · Paris', ur: 'بیوٹی ایڈیٹر · پیرس' },
    quote: {
      en: 'Noore Velvet Rose Matte Lipstick wears like a cushiony cashmere balm yet photographs with crisp runway pigment.',
      ur: 'نور ویلوٹ روز میٹ لپ اسٹک لگاتے وقت نرم بام جیسی محسوس ہوتی ہے لیکن رنگ انتہائی واضح اور دیرپا ہے۔',
    },
  },
];

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { loyalty, claimLoyaltyBonus, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<CuratedTab>('best');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  const curatedProducts = useMemo(() => {
    if (activeTab === 'best') return products.filter((p) => p.isBestSeller).slice(0, 8);
    if (activeTab === 'new') {
      return NEWEST_FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(
        (p): p is (typeof products)[number] => Boolean(p)
      );
    }
    return products.filter((p) => p.isTrending).slice(0, 8);
  }, [activeTab]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setNewsletterStatus('err');
      return;
    }
    setNewsletterStatus('ok');
    setNewsletterEmail('');
    if (loyalty.isEnrolled && claimLoyaltyBonus('newsletter')) {
      showToast(`${t.loyalty.kicker} · +75 ${t.loyalty.pointsUnit}`);
    }
  };

  return (
    <div className="space-y-14 sm:space-y-20 lg:space-y-24 pb-14 sm:pb-20">
      {/* 1. Storefront Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-[#D4CFC7] pt-6 sm:pt-12 pb-10 sm:pb-12">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-stretch">
            {/* Hero Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6 py-1 sm:py-2">
              <p className="text-xs font-bold text-[#7A233E] tracking-wider uppercase">
                {t.hero.kicker}
              </p>
              <h1 className="font-display text-[30px] min-[375px]:text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#161214] leading-[1.18] text-balance">
                {t.hero.titleLine1}{' '}
                <span className="italic text-[#7A233E]">{t.hero.titleAccent}</span>
              </h1>
              <p className="text-sm sm:text-lg text-[#2F2A2C] leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1 sm:pt-2">
                <Link
                  to="/shop"
                  className="w-full min-[400px]:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#161214] text-white px-7 py-3.5 text-xs font-semibold hover:bg-[#2E2528] transition-all whitespace-nowrap"
                >
                  <span>{t.hero.shopNow}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
                <Link
                  to="/shop?collection=velvet-rose"
                  className="w-full min-[400px]:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#161214] bg-white text-[#161214] px-7 py-3.5 text-xs font-semibold hover:bg-[#F6ECF0] transition-colors whitespace-nowrap"
                >
                  <span>{t.hero.exploreCollection}</span>
                </Link>
              </div>

              {/* Clean unboxed trust metadata */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#524B4E]">
                <span>{t.hero.badgeCruelty}</span>
                <span aria-hidden="true">·</span>
                <span>{t.hero.badgeBotanical}</span>
                <span aria-hidden="true">·</span>
                <span>{t.hero.badgeDelivery}</span>
              </div>
            </div>

            {/* Hero 16:9 / 4:3 Campaign Image */}
            <div className="lg:col-span-7">
              <div className="h-full min-h-[240px] min-[420px]:min-h-[300px] sm:min-h-[420px] aspect-[4/3] lg:aspect-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4CFC7] shadow-[0_24px_60px_-18px_rgba(22,18,20,0.14)] bg-[#F0EEE9]">
                <img
                  src={IMAGES.heroVanity}
                  alt={t.brandName}
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Products (Best Sellers / New Arrivals / Trending) + Category Strip */}
      <section className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#161214] text-balance">
                {t.home.curatedHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#2F2A2C]">{t.home.curatedSub}</p>
            </div>

            {/* Functional Segmented Filter Tabs */}
            <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 rounded-2xl sm:rounded-full bg-white border border-[#D4CFC7] self-start md:self-auto max-w-full">
              {(
                [
                  { id: 'best', label: t.home.curatedTabBest },
                  { id: 'new', label: t.home.curatedTabNew },
                  { id: 'trending', label: t.home.curatedTabTrending },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#161214] text-white'
                      : 'text-[#2F2A2C] hover:text-[#161214]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
            {curatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-[#161214] bg-white px-7 py-3 text-xs font-semibold text-[#161214] hover:bg-[#F6ECF0] transition-colors"
            >
              <span>{t.home.viewAllShop}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Category Navigation Grid */}
        <div className="pt-8 sm:pt-10 border-t border-[#D4CFC7] space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
              {t.home.categoriesHeading}
            </h2>
            <p className="text-sm text-[#2F2A2C]">{t.home.categoriesSub}</p>
          </div>

          <div className="grid grid-cols-2 min-[460px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {categoryCards.map((cat) => (
              <Link
                key={cat.slug}
                to={`/shop?category=${cat.slug}`}
                className="group rounded-2xl bg-white border border-[#D4CFC7] overflow-hidden hover:-translate-y-0.5 hover:border-[#7A233E] transition-all"
              >
                <div className="aspect-[4/3] bg-[#F0EEE9] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={t.categories[cat.slug]}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5 sm:p-3 text-center">
                  <span className="text-xs font-semibold text-[#161214] group-hover:text-[#7A233E] transition-colors block truncate">
                    {t.categories[cat.slug]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Botanical Alchemy Editorial Split + Featured Collections + Special Offer */}
      <section className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Editorial Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-stretch rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] overflow-hidden">
          <div className="lg:col-span-6 min-h-[220px] sm:min-h-[360px] bg-[#F0EEE9]">
            <img
              src={IMAGES.editorialRitual}
              alt={t.home.editorialHeading}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4 sm:space-y-5">
            <p className="text-xs font-bold text-[#7A233E] uppercase tracking-wider">
              {t.home.editorialKicker}
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#161214] text-balance">
              {t.home.editorialHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#2F2A2C] leading-relaxed">
              {t.home.editorialBody}
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-[#161214] text-white px-6 py-3 text-xs font-semibold hover:bg-[#2E2528] transition-colors"
              >
                <span>{t.home.editorialCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Signature Collections */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
              {t.home.collectionsHeading}
            </h2>
            <p className="text-sm text-[#2F2A2C]">{t.home.collectionsSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                key: 'velvet-rose',
                title: t.collections.velvetRoseTitle,
                desc: t.collections.velvetRoseDesc,
                image: IMAGES.lipstick,
              },
              {
                key: 'golden-nectar',
                title: t.collections.goldenNectarTitle,
                desc: t.collections.goldenNectarDesc,
                image: IMAGES.serum,
              },
              {
                key: 'silk-atelier',
                title: t.collections.silkAtelierTitle,
                desc: t.collections.silkAtelierDesc,
                image: IMAGES.foundation,
              },
            ].map((col) => (
              <Link
                key={col.key}
                to={`/shop?collection=${col.key}`}
                className="group rounded-2xl bg-white border border-[#D4CFC7] overflow-hidden flex flex-col hover:-translate-y-0.5 hover:border-[#7A233E] transition-all"
              >
                <div className="aspect-[4/3] bg-[#F0EEE9] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-semibold text-[#161214]">{col.title}</h3>
                    <p className="text-xs sm:text-sm text-[#2F2A2C] leading-relaxed">{col.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A233E] group-hover:text-[#161214] pt-1">
                    <span>{t.collections.discover}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Special Privilege Banner */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-bold text-[#7A233E] uppercase tracking-wider">
              {t.home.offerKicker}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
              {t.home.offerHeading}
            </h2>
            <p className="text-sm text-[#2F2A2C] leading-relaxed">{t.home.offerBody}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
            <span className="text-xs font-bold text-[#7A233E] px-4 py-2.5 rounded-full border border-[#7A233E]/40 bg-[#F6ECF0] tabular-nums">
              {t.home.offerCodeLabel}
            </span>
            <Link
              to="/loyalty"
              className="rounded-full border border-[#161214] text-[#161214] px-5 sm:px-6 py-3 text-xs font-semibold hover:bg-[#F6ECF0] transition-colors whitespace-nowrap"
            >
              {t.nav.loyalty}
            </Link>
            <Link
              to="/shop"
              className="rounded-full bg-[#161214] text-white px-5 sm:px-6 py-3 text-xs font-semibold hover:bg-[#2E2528] transition-colors whitespace-nowrap"
            >
              {t.home.offerCta}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Testimonials & Newsletter */}
      <section className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
              {t.home.testimonialsHeading}
            </h2>
            <p className="text-sm text-[#2F2A2C]">{t.home.testimonialsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((item, idx) => (
              <blockquote
                key={idx}
                className="rounded-2xl bg-white border border-[#D4CFC7] p-5 sm:p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-3.5 h-3.5 fill-[#B58428] text-[#B58428]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#161214] leading-relaxed">
                    “{item.quote[language]}”
                  </p>
                </div>
                <footer className="pt-3 border-t border-[#E0DCD3]">
                  <p className="text-sm font-semibold text-[#161214]">{item.name[language]}</p>
                  <p className="text-xs text-[#524B4E]">{item.role[language]}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Newsletter Box */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-6 sm:p-10 lg:p-12 text-center max-w-3xl mx-auto space-y-5">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
            {t.home.newsletterHeading}
          </h2>
          <p className="text-sm text-[#2F2A2C] max-w-lg mx-auto">{t.home.newsletterSub}</p>

          <form
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto pt-1"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
              }}
              placeholder={t.home.newsletterPlaceholder}
              className="flex-1 min-w-0 rounded-full border border-[#C7C0B6] bg-[#F4F3F0] px-5 py-3 text-base sm:text-sm text-[#161214] placeholder:text-[#524B4E] focus:outline-none focus:border-[#7A233E]"
            />
            <button
              type="submit"
              className="rounded-full bg-[#161214] text-white px-6 py-3 text-xs font-semibold hover:bg-[#2E2528] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.home.newsletterCta}
            </button>
          </form>

          {newsletterStatus === 'ok' && (
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A233E]">
              <Check className="w-4 h-4" />
              <span>{t.home.newsletterSuccess}</span>
            </p>
          )}
          {newsletterStatus === 'err' && (
            <p className="text-xs font-medium text-[#B91C1C]">{t.home.newsletterError}</p>
          )}
        </div>
      </section>
    </div>
  );
};
