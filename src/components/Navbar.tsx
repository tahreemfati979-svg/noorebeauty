import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { cartCount, wishlist, openCartDrawer, openSearch } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/shop', label: t.nav.shop },
    { to: '/loyalty', label: t.nav.loyalty },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  const handleMobileNavigate = (to: string) => {
    setMobileOpen(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-40">
      {!promoDismissed && (
        <div className="bg-[#161214] text-white px-3 sm:px-8 py-2 text-center relative">
          <p className="text-[11px] sm:text-xs font-medium tracking-wide leading-snug pe-7">
            {t.promoBanner}
          </p>
          <button
            type="button"
            onClick={() => setPromoDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute inset-inline-end-2 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="glass-compact">
        <div className="max-w-[1440px] mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark + Mobile Menu Toggle */}
          <div className="flex items-center gap-1 min-[375px]:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 -ms-1 rounded-full text-[#161214] hover:bg-[#F6ECF0] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/"
              className="font-display text-base min-[375px]:text-xl sm:text-2xl font-semibold text-[#161214] whitespace-nowrap shrink-0 tracking-tight"
            >
              {t.brandName}
            </Link>
          </div>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#2F2A2C]"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `editorial-link py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive && !item.to.includes('?')
                      ? 'text-[#7A233E] active'
                      : 'hover:text-[#7A233E]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Language Switcher & Primary Storefront Actions */}
          <div className="flex items-center gap-1 min-[375px]:gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={openSearch}
              aria-label={t.nav.searchButton}
              className="p-1.5 min-[375px]:p-2 rounded-full text-[#161214] hover:bg-[#F6ECF0] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            <Link
              to="/wishlist"
              aria-label={t.nav.wishlist}
              className="relative p-1.5 min-[375px]:p-2 rounded-full text-[#161214] hover:bg-[#F6ECF0] transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 inset-inline-end-0 min-w-[16px] h-4 px-1 rounded-full bg-[#7A233E] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCartDrawer}
              aria-label={`${t.nav.bag} (${cartCount})`}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#161214] text-white px-2.5 min-[375px]:px-3.5 sm:px-4 py-1.5 min-[375px]:py-2 text-xs font-semibold hover:bg-[#2E2528] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav.bag}</span>
              <span className="tabular-nums">({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          <div
            className="fixed inset-0 bg-[#161214]/45 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between p-5 sm:p-6 z-10 border-e border-[#D4CFC7] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#D4CFC7]">
                <span className="font-display text-xl font-semibold text-[#161214]">
                  {t.brandName}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-[#F6ECF0] text-[#161214] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive =
                    item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
                  return (
                    <button
                      key={item.to}
                      type="button"
                      onClick={() => handleMobileNavigate(item.to)}
                      className={`text-start py-3 px-3.5 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#F6ECF0] text-[#7A233E]'
                          : 'text-[#161214] hover:bg-[#F6ECF0]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => handleMobileNavigate('/wishlist')}
                  className={`text-start py-3 px-3.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    pathname === '/wishlist'
                      ? 'bg-[#F6ECF0] text-[#7A233E]'
                      : 'text-[#161214] hover:bg-[#F6ECF0]'
                  }`}
                >
                  <span>{t.nav.wishlist}</span>
                  <span className="text-xs text-[#524B4E] tabular-nums">({wishlist.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNavigate('/cart')}
                  className={`text-start py-3 px-3.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    pathname === '/cart'
                      ? 'bg-[#F6ECF0] text-[#7A233E]'
                      : 'text-[#161214] hover:bg-[#F6ECF0]'
                  }`}
                >
                  <span>{t.nav.bag}</span>
                  <span className="text-xs text-[#524B4E] tabular-nums">({cartCount})</span>
                </button>
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-[#D4CFC7] flex items-center justify-between gap-3">
              <LanguageSwitcher compact />
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openSearch();
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#161214] px-3.5 py-2 rounded-full border border-[#B8B1A7] hover:bg-[#F6ECF0] cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.nav.searchButton}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
