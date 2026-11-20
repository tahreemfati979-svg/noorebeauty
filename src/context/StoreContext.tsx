import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { products } from '../data/products';
import {
  CartItem,
  LoyaltyReward,
  LoyaltyState,
  LoyaltyTierId,
  Product,
  ReviewItem,
  ShadeOption,
} from '../types';

interface DetailedCartItem {
  product: Product;
  shade: ShadeOption;
  quantity: number;
}

export interface LoyaltyTierInfo {
  id: LoyaltyTierId;
  minPoints: number;
  nextThreshold: number | null;
  multiplier: number;
  freeShippingAt: number;
}

export const LOYALTY_TIERS: LoyaltyTierInfo[] = [
  {
    id: 'pearl',
    minPoints: 0,
    nextThreshold: 1000,
    multiplier: 1,
    freeShippingAt: 3500,
  },
  {
    id: 'rose-gold',
    minPoints: 1000,
    nextThreshold: 3000,
    multiplier: 1.5,
    freeShippingAt: 2000,
  },
  {
    id: 'royal-noor',
    minPoints: 3000,
    nextThreshold: null,
    multiplier: 2,
    freeShippingAt: 0,
  },
];

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'reward-200',
    pointsCost: 200,
    discountAmount: 200,
    title: {
      en: 'PKR 200 Boutique Credit',
      ur: '۲۰۰ روپے بوتیک کریڈٹ',
    },
    subtitle: {
      en: 'Instant savings on any lipstick, serum, or gift',
      ur: 'کسی بھی لپ اسٹک، سیرم یا پروڈکٹ پر فوری رعایت',
    },
  },
  {
    id: 'reward-450',
    pointsCost: 450,
    discountAmount: 500,
    title: {
      en: 'PKR 500 Radiance Voucher',
      ur: '۵۰۰ روپے ریڈیئنس واؤچر',
    },
    subtitle: {
      en: 'Best-value mid-tier voucher for daily rituals',
      ur: 'روزمرہ کی خریداری پر بہترین رعایتی واؤچر',
    },
  },
  {
    id: 'reward-900',
    pointsCost: 900,
    discountAmount: 1100,
    title: {
      en: 'PKR 1,100 Royal Ritual Credit',
      ur: '۱,۱۰۰ روپے شاہی کریڈٹ',
    },
    subtitle: {
      en: 'Signature elite savings on palettes, serums & sets',
      ur: 'آئی شیڈو پیلیٹس، سیرمز اور سیٹس پر خصوصی رعایت',
    },
  },
];

export const getLoyaltyTier = (lifetimePoints: number): LoyaltyTierInfo => {
  if (lifetimePoints >= 3000) return LOYALTY_TIERS[2];
  if (lifetimePoints >= 1000) return LOYALTY_TIERS[1];
  return LOYALTY_TIERS[0];
};

interface StoreContextValue {
  cart: CartItem[];
  detailedCart: DetailedCartItem[];
  cartCount: number;
  wishlist: string[];
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  loyaltyDiscountAmount: number;
  activeLoyaltyReward: LoyaltyReward | null;
  shippingCost: number;
  freeShippingThreshold: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  addToCart: (productId: string, shadeId?: string, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, shadeId: string) => void;
  updateQuantity: (productId: string, shadeId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  getProductReviews: (productId: string) => ReviewItem[];
  addProductReview: (productId: string, review: Omit<ReviewItem, 'id' | 'date' | 'verified'>) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  loyalty: LoyaltyState;
  currentTier: LoyaltyTierInfo;
  enrollLoyalty: (name: string, email: string) => void;
  redeemLoyaltyReward: (rewardId: string) => boolean;
  removeActiveLoyaltyReward: () => void;
  awardOrderPoints: (spentAmount: number, orderNumber: string) => number;
  claimLoyaltyBonus: (type: 'wishlist' | 'newsletter') => boolean;
  calculateOrderPoints: (amount: number) => number;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const CART_KEY = 'ln_cart_v1';
const WISHLIST_KEY = 'ln_wishlist_v1';
const REVIEWS_KEY = 'ln_reviews_v1';
const COUPON_KEY = 'ln_coupon_v1';
const LOYALTY_KEY = 'ln_loyalty_v1';

const VALID_COUPONS: Record<string, number> = {
  NOORE15: 0.15,
  LUMIERE15: 0.15,
  GLOW20: 0.2,
};

const DEFAULT_LOYALTY: LoyaltyState = {
  isEnrolled: false,
  memberName: '',
  memberEmail: '',
  points: 0,
  lifetimePoints: 0,
  activeRewardId: null,
  claimedWishlistBonus: false,
  claimedNewsletterBonus: false,
  history: [],
};

const VALID_PRODUCT_IDS = new Set(products.map((p) => p.id));

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item): item is CartItem =>
          Boolean(item) &&
          typeof item.productId === 'string' &&
          VALID_PRODUCT_IDS.has(item.productId) &&
          typeof item.quantity === 'number' &&
          item.quantity > 0
      );
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((id): id is string => typeof id === 'string' && VALID_PRODUCT_IDS.has(id));
    } catch {
      return [];
    }
  });

  const [customReviews, setCustomReviews] = useState<Record<string, ReviewItem[]>>(() => {
    try {
      const raw = localStorage.getItem(REVIEWS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem(COUPON_KEY) || '';
    } catch {
      return '';
    }
  });

  const [loyalty, setLoyalty] = useState<LoyaltyState>(() => {
    try {
      const raw = localStorage.getItem(LOYALTY_KEY);
      return raw ? { ...DEFAULT_LOYALTY, ...JSON.parse(raw) } : DEFAULT_LOYALTY;
    } catch {
      return DEFAULT_LOYALTY;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(customReviews));
    } catch {
      // ignore
    }
  }, [customReviews]);

  useEffect(() => {
    try {
      if (couponCode) {
        localStorage.setItem(COUPON_KEY, couponCode);
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch {
      // ignore
    }
  }, [couponCode]);

  useEffect(() => {
    try {
      localStorage.setItem(LOYALTY_KEY, JSON.stringify(loyalty));
    } catch {
      // ignore
    }
  }, [loyalty]);

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast(msg);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2600);
  }, []);

  const currentTier = useMemo(
    () => getLoyaltyTier(loyalty.lifetimePoints),
    [loyalty.lifetimePoints]
  );

  const enrollLoyalty = useCallback((name: string, email: string) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) return;

    setLoyalty((prev) => {
      if (prev.isEnrolled) {
        return {
          ...prev,
          memberName: cleanName,
          memberEmail: cleanEmail,
        };
      }
      const welcomeBonus = 200;
      return {
        ...prev,
        isEnrolled: true,
        memberName: cleanName,
        memberEmail: cleanEmail,
        points: prev.points + welcomeBonus,
        lifetimePoints: prev.lifetimePoints + welcomeBonus,
        history: [
          {
            id: `loy-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            description: {
              en: 'Noore Glow Club Welcome Gift',
              ur: 'نور گلو کلب خوش آمدید بونس',
            },
            points: welcomeBonus,
            type: 'earn',
          },
          ...prev.history,
        ],
      };
    });
  }, []);

  const redeemLoyaltyReward = useCallback(
    (rewardId: string): boolean => {
      const reward = LOYALTY_REWARDS.find((r) => r.id === rewardId);
      if (!reward || !loyalty.isEnrolled) return false;

      const existingActive = loyalty.activeRewardId
        ? LOYALTY_REWARDS.find((r) => r.id === loyalty.activeRewardId)
        : null;
      const availableAfterRefund =
        loyalty.points + (existingActive ? existingActive.pointsCost : 0);

      if (availableAfterRefund < reward.pointsCost) {
        return false;
      }

      setLoyalty((prev) => {
        if (!prev.isEnrolled) return prev;
        const prevActive = prev.activeRewardId
          ? LOYALTY_REWARDS.find((r) => r.id === prev.activeRewardId)
          : null;
        const prevAvailable = prev.points + (prevActive ? prevActive.pointsCost : 0);
        if (prevAvailable < reward.pointsCost) return prev;
        return {
          ...prev,
          points: prevAvailable - reward.pointsCost,
          activeRewardId: reward.id,
          history: [
            {
              id: `loy-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              description: reward.title,
              points: -reward.pointsCost,
              type: 'redeem',
            },
            ...prev.history,
          ],
        };
      });
      return true;
    },
    [loyalty.activeRewardId, loyalty.isEnrolled, loyalty.points]
  );

  const removeActiveLoyaltyReward = useCallback(() => {
    setLoyalty((prev) => {
      if (!prev.activeRewardId) return prev;
      const active = LOYALTY_REWARDS.find((r) => r.id === prev.activeRewardId);
      if (!active) return { ...prev, activeRewardId: null };
      return {
        ...prev,
        points: prev.points + active.pointsCost,
        activeRewardId: null,
        history: [
          {
            id: `loy-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            description: {
              en: `Returned voucher: ${active.title.en}`,
              ur: `واپس کردہ واؤچر: ${active.title.ur}`,
            },
            points: active.pointsCost,
            type: 'earn',
          },
          ...prev.history,
        ],
      };
    });
  }, []);

  const calculateOrderPoints = useCallback(
    (amount: number) => {
      if (amount <= 0) return 0;
      return Math.max(10, Math.round((amount / 20) * currentTier.multiplier));
    },
    [currentTier.multiplier]
  );

  const awardOrderPoints = useCallback(
    (spentAmount: number, orderNumber: string): number => {
      if (!loyalty.isEnrolled || spentAmount <= 0) {
        setLoyalty((prev) => ({ ...prev, activeRewardId: null }));
        return 0;
      }
      const earned = Math.max(10, Math.round((spentAmount / 20) * currentTier.multiplier));
      setLoyalty((prev) => ({
        ...prev,
        points: prev.points + earned,
        lifetimePoints: prev.lifetimePoints + earned,
        activeRewardId: null,
        history: [
          {
            id: `loy-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            description: {
              en: `Order #${orderNumber} Beauty Ritual`,
              ur: `آرڈر #${orderNumber} پر حاصل کردہ پوائنٹس`,
            },
            points: earned,
            type: 'earn',
          },
          ...prev.history,
        ],
      }));
      return earned;
    },
    [currentTier.multiplier, loyalty.isEnrolled]
  );

  const claimLoyaltyBonus = useCallback(
    (type: 'wishlist' | 'newsletter'): boolean => {
      if (!loyalty.isEnrolled) return false;
      if (type === 'wishlist' && loyalty.claimedWishlistBonus) return false;
      if (type === 'newsletter' && loyalty.claimedNewsletterBonus) return false;

      setLoyalty((prev) => {
        if (!prev.isEnrolled) return prev;
        if (type === 'wishlist' && prev.claimedWishlistBonus) return prev;
        if (type === 'newsletter' && prev.claimedNewsletterBonus) return prev;
        const bonus = 75;
        return {
          ...prev,
          points: prev.points + bonus,
          lifetimePoints: prev.lifetimePoints + bonus,
          claimedWishlistBonus: type === 'wishlist' ? true : prev.claimedWishlistBonus,
          claimedNewsletterBonus: type === 'newsletter' ? true : prev.claimedNewsletterBonus,
          history: [
            {
              id: `loy-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              description:
                type === 'wishlist'
                  ? { en: 'Curated Wishlist Bonus', ur: 'پسندیدہ فہرست بنانے کا بونس' }
                  : { en: 'Atelier Dispatch Bonus', ur: 'نیوزلیٹر شمولیت بونس' },
              points: bonus,
              type: 'earn',
            },
            ...prev.history,
          ],
        };
      });
      return true;
    },
    [loyalty.claimedNewsletterBonus, loyalty.claimedWishlistBonus, loyalty.isEnrolled]
  );

  const addToCart = useCallback(
    (productId: string, shadeId?: string, quantity = 1, openDrawer = true) => {
      const product = products.find((p) => p.id === productId);
      if (!product || quantity <= 0) return;
      const targetShade = shadeId || product.shades[0]?.id || '';
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.productId === productId && item.shadeId === targetShade
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [...prev, { productId, shadeId: targetShade, quantity }];
      });
      if (openDrawer) {
        setIsCartDrawerOpen(true);
      }
    },
    []
  );

  const removeFromCart = useCallback((productId: string, shadeId: string) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.shadeId === shadeId)));
  }, []);

  const updateQuantity = useCallback((productId: string, shadeId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => !(item.productId === productId && item.shadeId === shadeId)));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.shadeId === shadeId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCouponCode('');
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const applyCoupon = useCallback((rawCode: string): boolean => {
    const normalized = rawCode.trim().toUpperCase();
    if (VALID_COUPONS[normalized]) {
      setCouponCode(normalized);
      return true;
    }
    return false;
  }, []);

  const clearCoupon = useCallback(() => {
    setCouponCode('');
  }, []);

  const detailedCart = useMemo<DetailedCartItem[]>(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const shade = product.shades.find((s) => s.id === item.shadeId) || product.shades[0];
        return { product, shade, quantity: item.quantity };
      })
      .filter((entry): entry is DetailedCartItem => entry !== null);
  }, [cart]);

  const cartCount = useMemo(
    () => detailedCart.reduce((acc, item) => acc + item.quantity, 0),
    [detailedCart]
  );

  const subtotal = useMemo(
    () => detailedCart.reduce((acc, entry) => acc + entry.product.price * entry.quantity, 0),
    [detailedCart]
  );

  const discountRate = couponCode ? VALID_COUPONS[couponCode] || 0 : 0;
  const discountAmount = subtotal * discountRate;
  const activeLoyaltyReward = useMemo(
    () =>
      loyalty.activeRewardId
        ? LOYALTY_REWARDS.find((r) => r.id === loyalty.activeRewardId) || null
        : null,
    [loyalty.activeRewardId]
  );
  const afterPromo = Math.max(0, subtotal - discountAmount);
  const loyaltyDiscountAmount = activeLoyaltyReward
    ? Math.min(afterPromo, activeLoyaltyReward.discountAmount)
    : 0;
  const discountedSubtotal = Math.max(0, afterPromo - loyaltyDiscountAmount);
  const freeShippingThreshold = loyalty.isEnrolled ? currentTier.freeShippingAt : 3500;
  const shippingCost =
    subtotal === 0
      ? 0
      : freeShippingThreshold === 0 || discountedSubtotal >= freeShippingThreshold
      ? 0
      : 200;
  const total = discountedSubtotal + shippingCost;

  const getProductReviews = useCallback(
    (productId: string): ReviewItem[] => {
      const base = products.find((p) => p.id === productId)?.reviews || [];
      const extra = customReviews[productId] || [];
      return [...extra, ...base];
    },
    [customReviews]
  );

  const addProductReview = useCallback(
    (productId: string, review: Omit<ReviewItem, 'id' | 'date' | 'verified'>) => {
      const newReview: ReviewItem = {
        ...review,
        id: `rev-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        verified: true,
      };
      setCustomReviews((prev) => ({
        ...prev,
        [productId]: [newReview, ...(prev[productId] || [])],
      }));
      setLoyalty((prev) => {
        if (!prev.isEnrolled) return prev;
        const reviewPoints = 50;
        return {
          ...prev,
          points: prev.points + reviewPoints,
          lifetimePoints: prev.lifetimePoints + reviewPoints,
          history: [
            {
              id: `loy-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              description: {
                en: 'Verified Product Review Reward',
                ur: 'تبصرہ لکھنے پر حاصل کردہ پوائنٹس',
              },
              points: reviewPoints,
              type: 'earn',
            },
            ...prev.history,
          ],
        };
      });
    },
    []
  );

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      detailedCart,
      cartCount,
      wishlist,
      subtotal,
      discountRate,
      discountAmount,
      loyaltyDiscountAmount,
      activeLoyaltyReward,
      shippingCost,
      freeShippingThreshold,
      total,
      couponCode,
      applyCoupon,
      clearCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      isCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
      isSearchOpen,
      openSearch,
      closeSearch,
      getProductReviews,
      addProductReview,
      toast,
      showToast,
      loyalty,
      currentTier,
      enrollLoyalty,
      redeemLoyaltyReward,
      removeActiveLoyaltyReward,
      awardOrderPoints,
      claimLoyaltyBonus,
      calculateOrderPoints,
    }),
    [
      activeLoyaltyReward,
      addProductReview,
      addToCart,
      applyCoupon,
      awardOrderPoints,
      calculateOrderPoints,
      cart,
      cartCount,
      claimLoyaltyBonus,
      clearCart,
      clearCoupon,
      closeCartDrawer,
      closeSearch,
      couponCode,
      currentTier,
      detailedCart,
      discountAmount,
      discountRate,
      enrollLoyalty,
      freeShippingThreshold,
      getProductReviews,
      isCartDrawerOpen,
      isInWishlist,
      isSearchOpen,
      loyalty,
      loyaltyDiscountAmount,
      openCartDrawer,
      openSearch,
      redeemLoyaltyReward,
      removeActiveLoyaltyReward,
      removeFromCart,
      shippingCost,
      showToast,
      subtotal,
      toast,
      toggleWishlist,
      total,
      updateQuantity,
      wishlist,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
};
