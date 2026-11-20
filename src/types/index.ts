export type Language = 'en' | 'ur';

export type CategorySlug =
  | 'all'
  | 'makeup'
  | 'skincare'
  | 'lipsticks'
  | 'foundations'
  | 'mascaras'
  | 'blush-highlighters'
  | 'eyeshadow-palettes'
  | 'face-serums'
  | 'sheet-masks'
  | 'moisturizers'
  | 'sunscreens'
  | 'beauty-accessories';

export type FinishType = 'Matte' | 'Dewy' | 'Satin' | 'Shimmer' | 'Luminous';

export interface LocalizedText {
  en: string;
  ur: string;
}

export interface ShadeOption {
  id: string;
  name: LocalizedText;
  hex: string;
  finish: FinishType;
  finishLabel: LocalizedText;
  image?: string;
}

export interface ReviewItem {
  id: string;
  author: LocalizedText;
  location: LocalizedText;
  rating: number;
  date: string;
  comment: LocalizedText;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  category: Exclude<CategorySlug, 'all'>;
  parentGroup: 'makeup' | 'skincare' | 'beauty-accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: LocalizedText;
  ingredients: LocalizedText;
  howToUse: LocalizedText;
  size: string;
  shades: ShadeOption[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  collection: 'velvet-rose' | 'golden-nectar' | 'silk-atelier';
  reviews: ReviewItem[];
}

export interface CartItem {
  productId: string;
  shadeId: string;
  quantity: number;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  status: 'pending_whatsapp_verification' | 'confirmed';
  customer: {
    fullName: string;
    email?: string;
    phone: string;
    address: string;
    city: string;
    postalCode?: string;
    country?: string;
    notes?: string;
  };
  paymentMethod?: 'cod' | 'card' | 'bank';
  items: Array<{
    product: Product;
    shade: ShadeOption;
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  loyaltyDiscount?: number;
  shipping: number;
  total: number;
  couponCode?: string;
  pointsEarned?: number;
  whatsappMessage?: string;
}

export type LoyaltyTierId = 'pearl' | 'rose-gold' | 'royal-noor';

export interface LoyaltyReward {
  id: string;
  pointsCost: number;
  discountAmount: number;
  title: LocalizedText;
  subtitle: LocalizedText;
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: LocalizedText;
  points: number;
  type: 'earn' | 'redeem';
}

export interface LoyaltyState {
  isEnrolled: boolean;
  memberName: string;
  memberEmail: string;
  points: number;
  lifetimePoints: number;
  activeRewardId: string | null;
  claimedWishlistBonus: boolean;
  claimedNewsletterBonus: boolean;
  history: LoyaltyTransaction[];
}
