import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-14 sm:pb-20 space-y-12 sm:space-y-20">
      {/* Header Banner */}
      <section className="bg-white border-b border-[#D4CFC7] pt-10 sm:pt-16 pb-8 sm:pb-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl space-y-3.5 sm:space-y-4">
            <p className="text-xs font-bold text-[#7A233E] uppercase tracking-wider">
              {t.about.kicker}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-medium text-[#161214] leading-tight text-balance">
              {t.about.title}
            </h1>
            <p className="text-sm sm:text-lg text-[#2F2A2C] leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story Split */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-stretch">
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F0EEE9] border border-[#D4CFC7] aspect-[4/3] lg:aspect-auto min-h-[240px] sm:min-h-[320px]">
            <img
              src={IMAGES.editorialRitual}
              alt={t.about.storyTitle}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5 py-1 sm:py-2">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
              {t.about.storyTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#2F2A2C] leading-relaxed">{t.about.storyP1}</p>
            <p className="text-sm sm:text-base text-[#2F2A2C] leading-relaxed">{t.about.storyP2}</p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Philosophy, Quality */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {[
            { title: t.about.missionTitle, body: t.about.missionBody },
            { title: t.about.visionTitle, body: t.about.visionBody },
            { title: t.about.philosophyTitle, body: t.about.philosophyBody },
            { title: t.about.qualityTitle, body: t.about.qualityBody },
          ].map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-6 sm:p-8 space-y-3"
            >
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#161214]">{card.title}</h3>
              <p className="text-sm text-[#2F2A2C] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6 sm:space-y-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">{t.about.valuesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {t.about.values.map((val, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#D4CFC7] p-6 sm:p-7 space-y-2.5"
            >
              <span className="text-xs font-bold text-[#7A233E] tabular-nums">
                0{idx + 1}.
              </span>
              <h3 className="font-display text-xl font-semibold text-[#161214]">{val.title}</h3>
              <p className="text-sm text-[#2F2A2C] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 sm:pt-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#161214] text-white px-7 py-3.5 text-xs font-semibold hover:bg-[#2E2528] transition-colors"
          >
            <span>{t.hero.shopNow}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};
