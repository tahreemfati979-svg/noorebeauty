import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { t } = useLanguage();
  const { wishlist } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8 sm:space-y-10">
      <div className="pb-5 sm:pb-6 border-b border-[#D4CFC7] space-y-1.5">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#161214]">
          {t.wishlist.title}
        </h1>
        <p className="text-sm text-[#2F2A2C]">{t.wishlist.subtitle}</p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-7 sm:p-12 md:p-16 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F6ECF0] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 text-[#7A233E]" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#161214]">{t.wishlist.emptyTitle}</h2>
          <p className="text-sm text-[#2F2A2C]">{t.wishlist.emptyBody}</p>
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
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
