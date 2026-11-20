import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#161214] text-white border-t border-[#D4CFC7]/20">
      <div className="max-w-[1440px] mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="font-display text-2xl font-semibold text-white block">
              {t.brandName}
            </Link>
            <p className="text-sm text-[#E5E2DC] leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Boutique */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E8C57B] uppercase tracking-wider">
              {t.footer.shopColumn}
            </h4>
            <ul className="space-y-2 text-sm text-[#E5E2DC]">
              <li>
                <Link to="/shop?category=makeup" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.categories.makeup}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=lipsticks" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.categories.lipsticks}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=skincare" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.categories.skincare}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=face-serums" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.categories['face-serums']}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=sheet-masks" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.categories['sheet-masks']}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=beauty-accessories" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.categories['beauty-accessories']}
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E8C57B] uppercase tracking-wider">
              {t.footer.maisonColumn}
            </h4>
            <ul className="space-y-2 text-sm text-[#E5E2DC]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=velvet-rose" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.collections.velvetRoseTitle}
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=golden-nectar" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.collections.goldenNectarTitle}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E8C57B] uppercase tracking-wider">
              {t.footer.careColumn}
            </h4>
            <ul className="space-y-2 text-sm text-[#E5E2DC]">
              <li>
                <Link to="/cart" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.nav.bag}
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.nav.wishlist}
                </Link>
              </li>
              <li>
                <Link to="/loyalty" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.nav.loyalty}
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors inline-block py-0.5">
                  {t.cart.checkoutCta}
                </Link>
              </li>
              <li className="text-[#E8C57B] pt-1 font-medium break-words">concierge@noorebeauty.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D6D2CB] text-center sm:text-start">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
