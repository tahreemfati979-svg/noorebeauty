import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() =>
  import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage }))
);
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const WishlistPage = lazy(() =>
  import('./pages/WishlistPage').then((m) => ({ default: m.WishlistPage }))
);
const LoyaltyPage = lazy(() =>
  import('./pages/LoyaltyPage').then((m) => ({ default: m.LoyaltyPage }))
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const PageFallback: React.FC = () => (
  <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-14 min-h-[60vh]">
    <div className="h-8 w-48 rounded-xl bg-[#EAE7E0] animate-pulse mb-6" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[0, 1, 2].map((idx) => (
        <div key={idx} className="h-80 rounded-2xl bg-white border border-[#D4CFC7] animate-pulse" />
      ))}
    </div>
  </div>
);

const ToastBanner: React.FC = () => {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:bottom-5 sm:inset-inline-end-5 sm:max-w-sm z-50 rounded-2xl sm:rounded-full bg-[#161214] text-white px-5 py-3 text-xs font-semibold shadow-xl border border-[#E8C57B]/45 text-center sm:text-start break-words"
    >
      {toast}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F4F3F0] text-[#161214]">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/loyalty" element={<LoyaltyPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <CartDrawer />
            <SearchModal />
            <ToastBanner />
          </div>
        </BrowserRouter>
      </StoreProvider>
    </LanguageProvider>
  );
}
