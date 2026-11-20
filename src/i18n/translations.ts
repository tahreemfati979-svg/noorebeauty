import { CategorySlug, Language } from '../types';

export interface TranslationDictionary {
  brandName: string;
  promoBanner: string;
  nav: {
    home: string;
    shop: string;
    collections: string;
    loyalty: string;
    about: string;
    contact: string;
    wishlist: string;
    bag: string;
    searchPlaceholder: string;
    searchButton: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleAccent: string;
    subtitle: string;
    shopNow: string;
    exploreCollection: string;
    badgeCruelty: string;
    badgeBotanical: string;
    badgeDelivery: string;
  };
  home: {
    curatedTabBest: string;
    curatedTabNew: string;
    curatedTabTrending: string;
    curatedHeading: string;
    curatedSub: string;
    viewAllShop: string;
    categoriesHeading: string;
    categoriesSub: string;
    editorialKicker: string;
    editorialHeading: string;
    editorialBody: string;
    editorialCta: string;
    offerKicker: string;
    offerHeading: string;
    offerBody: string;
    offerCodeLabel: string;
    offerCta: string;
    collectionsHeading: string;
    collectionsSub: string;
    testimonialsHeading: string;
    testimonialsSub: string;
    newsletterHeading: string;
    newsletterSub: string;
    newsletterPlaceholder: string;
    newsletterCta: string;
    newsletterSuccess: string;
    newsletterError: string;
  };
  collections: {
    velvetRoseTitle: string;
    velvetRoseDesc: string;
    goldenNectarTitle: string;
    goldenNectarDesc: string;
    silkAtelierTitle: string;
    silkAtelierDesc: string;
    discover: string;
  };
  categories: Record<CategorySlug, string>;
  shop: {
    title: string;
    subtitle: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    priceLabel: string;
    priceUpTo: string;
    sortLabel: string;
    sortCurated: string;
    sortPopular: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    resetFilters: string;
    resultsCount: string;
    emptyTitle: string;
    emptyBody: string;
    filterToggle: string;
  };
  product: {
    addToBag: string;
    addedToBag: string;
    addToWishlist: string;
    savedInWishlist: string;
    selectShade: string;
    finish: string;
    quantity: string;
    inStock: string;
    freeShippingNote: string;
    descriptionTab: string;
    ingredientsTab: string;
    ritualTab: string;
    reviewsHeading: string;
    writeReview: string;
    yourName: string;
    yourLocation: string;
    yourRating: string;
    yourReview: string;
    submitReview: string;
    reviewSuccess: string;
    relatedHeading: string;
    verifiedBuyer: string;
    reviewsCountLabel: string;
    savePercent: string;
    backToShop: string;
  };
  cart: {
    title: string;
    drawerTitle: string;
    emptyTitle: string;
    emptyBody: string;
    continueShopping: string;
    subtotal: string;
    discount: string;
    shipping: string;
    freeShipping: string;
    freeShippingThreshold: string;
    total: string;
    couponPlaceholder: string;
    applyCoupon: string;
    couponApplied: string;
    couponInvalid: string;
    couponHint: string;
    remove: string;
    checkoutCta: string;
    viewFullCart: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    customerSection: string;
    shippingSection: string;
    notesSection: string;
    summarySection: string;
    fullName: string;
    email: string;
    optionalLabel: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    notes: string;
    notesPlaceholder: string;
    orderOnWhatsapp: string;
    whatsappHelperNote: string;
    whatsappSecurityNote: string;
    whatsappPreviewToggle: string;
    whatsappPendingBadge: string;
    whatsappPendingTitle: string;
    whatsappPendingSubtitle: string;
    whatsappReturnedBanner: string;
    whatsappCartPreservedNote: string;
    reopenWhatsapp: string;
    copyWhatsappMessage: string;
    copiedToast: string;
    editOrderDetails: string;
    confirmSentCta: string;
    confirmSentHint: string;
    sentPendingVerificationTitle: string;
    sentPendingVerificationSubtitle: string;
    awaitingStoreVerificationBadge: string;
    pendingVerificationStatus: string;
    validationRequired: string;
    validationFullName: string;
    validationEmail: string;
    validationPhone: string;
    validationAddress: string;
    validationCity: string;
    orderNumberLabel: string;
    deliverToLabel: string;
    notesSummaryLabel: string;
    returnHome: string;
    continueShopping: string;
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    missionTitle: string;
    missionBody: string;
    visionTitle: string;
    visionBody: string;
    philosophyTitle: string;
    philosophyBody: string;
    qualityTitle: string;
    qualityBody: string;
    valuesTitle: string;
    values: Array<{ title: string; desc: string }>;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    sendCta: string;
    sentSuccess: string;
    infoTitle: string;
    emailTitle: string;
    phoneTitle: string;
    addressTitle: string;
    addressValue: string;
    hoursTitle: string;
    hoursValue: string;
    faqTitle: string;
    faqs: Array<{ q: string; a: string }>;
  };
  wishlist: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
    moveToBag: string;
  };
  footer: {
    tagline: string;
    shopColumn: string;
    maisonColumn: string;
    careColumn: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  loyalty: {
    kicker: string;
    title: string;
    subtitle: string;
    joinTitle: string;
    joinSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    joinCta: string;
    welcomeGiftNote: string;
    validationError: string;
    memberCardLabel: string;
    availablePoints: string;
    lifetimePoints: string;
    pointsUnit: string;
    nextTierProgress: string;
    topTierReached: string;
    tiersHeading: string;
    tiersSub: string;
    tierNames: {
      pearl: string;
      'rose-gold': string;
      'royal-noor': string;
    };
    tierPerks: {
      pearl: string[];
      'rose-gold': string[];
      'royal-noor': string[];
    };
    multiplierLabel: string;
    rewardsHeading: string;
    rewardsSub: string;
    redeemCta: string;
    appliedLabel: string;
    removeRewardCta: string;
    needMorePoints: string;
    joinFirstNote: string;
    redeemedToast: string;
    earnHeading: string;
    earnSub: string;
    earnWays: Array<{ title: string; points: string; desc: string }>;
    claimWishlistBonus: string;
    wishlistNeedItem: string;
    bonusClaimed: string;
    historyHeading: string;
    historyEmpty: string;
    cartPanelTitle: string;
    pointsWillEarn: string;
    activeRewardLabel: string;
    joinForWelcome: string;
    pointsEarnedOrderLabel: string;
    productEarnNote: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "noore'beauty",
    promoBanner: 'Complimentary silk pouch & shipping on orders over PKR 3,500 · Use code NOORE15 for 15% off',
    nav: {
      home: 'Home',
      shop: 'Shop',
      collections: 'Collections',
      loyalty: 'Noore Club',
      about: 'About',
      contact: 'Contact',
      wishlist: 'Wishlist',
      bag: 'Bag',
      searchPlaceholder: 'Search lipsticks, serums, palettes...',
      searchButton: 'Search',
    },
    hero: {
      kicker: 'Autumn Atelier Collection',
      titleLine1: 'Luminous skin,',
      titleAccent: 'velvet radiance.',
      subtitle:
        'Botanical actives meet couture pigments. Formulated in soft cashmere textures, rose-hip nectar, and breathable satin finishes designed for effortless elegance.',
      shopNow: 'Shop Now',
      exploreCollection: 'Explore Collection',
      badgeCruelty: 'Cruelty-Free & Vegan',
      badgeBotanical: 'Cold-Pressed Botanicals',
      badgeDelivery: 'Cash on Delivery Available',
    },
    home: {
      curatedTabBest: 'Best Sellers',
      curatedTabNew: 'New Arrivals',
      curatedTabTrending: 'Trending',
      curatedHeading: 'Curated Vanity Icons',
      curatedSub: 'Signature formulas crafted for luminous daily rituals and lasting comfort.',
      viewAllShop: 'View Full Catalog',
      categoriesHeading: 'Shop by Ritual',
      categoriesSub: 'Explore eleven specialized beauty categories tailored to skin and color.',
      editorialKicker: 'The Botanical Alchemy',
      editorialHeading: 'Skincare-infused pigments that breathe with your skin',
      editorialBody:
        "Every noore'beauty formula replaces heavy silicones with cold-pressed damask rose oil, squalane, and micronized mineral pearls for a second-skin finish.",
      editorialCta: 'Read Our Story',
      offerKicker: 'Seasonal Atelier Privilege',
      offerHeading: 'Receive 15% off your first luminous ritual',
      offerBody:
        'Curate your personal vanity wardrobe across makeup and botanical skincare, delivered with complimentary Cash on Delivery support.',
      offerCodeLabel: 'Code: NOORE15',
      offerCta: 'Shop With Offer',
      collectionsHeading: 'Signature Collections',
      collectionsSub: 'Three distinct expressions of modern, refined beauty.',
      testimonialsHeading: 'Voices From the Vanity',
      testimonialsSub: "Verified impressions from clients who made noore'beauty part of their daily ritual.",
      newsletterHeading: 'Join the Private Atelier List',
      newsletterSub: 'Receive early access to limited-edition shade drops, formulation notes, and private invitations.',
      newsletterPlaceholder: 'Enter your email address',
      newsletterCta: 'Subscribe',
      newsletterSuccess: 'Welcome to the Atelier. Your invitation is confirmed.',
      newsletterError: 'Please enter a valid email address.',
    },
    collections: {
      velvetRoseTitle: 'Noore Velvet Rose',
      velvetRoseDesc: 'Cushion-soft matte lipsticks, petal cream blushes, and rose-amber eye palettes.',
      goldenNectarTitle: 'Noore Golden Radiance',
      goldenNectarDesc: 'Restorative facial elixirs, barrier-repair creams, and invisible glow sunscreens.',
      silkAtelierTitle: 'Noore Silk Complexion',
      silkAtelierDesc: 'Breathable serum foundations, sculpted mascaras, and artisanal vegan brushes.',
      discover: 'Discover',
    },
    categories: {
      all: 'All Products',
      makeup: 'Makeup',
      skincare: 'Skincare',
      lipsticks: 'Lipsticks & Lip Care',
      foundations: 'Foundations & Concealers',
      mascaras: 'Mascaras & Eyeliners',
      'blush-highlighters': 'Blush & Highlighters',
      'eyeshadow-palettes': 'Eyeshadow Palettes',
      'face-serums': 'Face Serums',
      'sheet-masks': 'Masks & Eye Patches',
      moisturizers: 'Moisturizers',
      sunscreens: 'Sunscreens',
      'beauty-accessories': 'Beauty Accessories',
    },
    shop: {
      title: 'The Beauty Atelier',
      subtitle: 'Explore skincare-infused cosmetics, luminous serums, and bespoke complexion essentials.',
      searchLabel: 'Search Catalog',
      searchPlaceholder: 'Search by product, shade, or ingredient...',
      categoryLabel: 'Category',
      priceLabel: 'Max Price',
      priceUpTo: 'Up to',
      sortLabel: 'Sort by',
      sortCurated: 'By Category & Routine',
      sortPopular: 'Most Popular',
      sortNewest: 'Newest Arrivals',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      resetFilters: 'Reset Filters',
      resultsCount: 'products curated',
      emptyTitle: 'No products match your selection',
      emptyBody: 'Try widening your price range or clearing your search query.',
      filterToggle: 'Filters',
    },
    product: {
      addToBag: 'Add to Bag',
      addedToBag: 'Added to Bag',
      addToWishlist: 'Save to Wishlist',
      savedInWishlist: 'Saved in Wishlist',
      selectShade: 'Select Shade',
      finish: 'Finish',
      quantity: 'Quantity',
      inStock: 'In Stock · Ready to Ship',
      freeShippingNote: 'Free express shipping over PKR 3,500 · Cash on Delivery eligible',
      descriptionTab: 'Description',
      ingredientsTab: 'Ingredients',
      ritualTab: 'Application Ritual',
      reviewsHeading: 'Customer Impressions',
      writeReview: 'Write a Review',
      yourName: 'Your Name',
      yourLocation: 'City / Country',
      yourRating: 'Rating',
      yourReview: 'Your Impressions',
      submitReview: 'Publish Review',
      reviewSuccess: 'Thank you. Your review has been published.',
      relatedHeading: 'Pair With Your Ritual',
      verifiedBuyer: 'Verified Client',
      reviewsCountLabel: 'reviews',
      savePercent: 'Save',
      backToShop: 'Back to Shop',
    },
    cart: {
      title: 'Your Shopping Bag',
      drawerTitle: 'Shopping Bag',
      emptyTitle: 'Your beauty bag is currently empty',
      emptyBody: 'Discover velvet lipsticks, golden botanical serums, and luminous complexion essentials.',
      continueShopping: 'Explore Catalog',
      subtotal: 'Subtotal',
      discount: 'Privilege Discount',
      shipping: 'Shipping',
      freeShipping: 'Complimentary',
      freeShippingThreshold: 'Complimentary shipping unlocked',
      total: 'Total',
      couponPlaceholder: 'Enter code (e.g. NOORE15)',
      applyCoupon: 'Apply',
      couponApplied: 'Privilege code applied',
      couponInvalid: 'Invalid code. Try NOORE15 or GLOW20.',
      couponHint: 'Available codes: NOORE15 (15% off) or GLOW20 (20% off)',
      remove: 'Remove',
      checkoutCta: 'Proceed to Checkout',
      viewFullCart: 'View Full Bag',
    },
    checkout: {
      title: 'Atelier Checkout via WhatsApp',
      subtitle: 'Complete your shipping details below and send your pre-filled order directly to our concierge on WhatsApp.',
      customerSection: '1. Client Information',
      shippingSection: '2. Delivery Address',
      notesSection: '3. Additional Order Notes',
      summarySection: 'Order Summary',
      fullName: 'Full Name',
      email: 'Email Address',
      optionalLabel: 'Optional',
      phone: 'Phone Number',
      address: 'Complete Delivery Address',
      city: 'City',
      postalCode: 'Postal Code',
      country: 'Country',
      notes: 'Additional Order Notes',
      notesPlaceholder: 'Delivery landmark, preferred time, or complimentary gift note...',
      orderOnWhatsapp: 'Place Order on WhatsApp',
      whatsappHelperNote: 'Clicking opens WhatsApp with your complete order message ready — simply tap Send.',
      whatsappSecurityNote: 'No sensitive payment details are ever included in your WhatsApp order message.',
      whatsappPreviewToggle: 'Preview WhatsApp Message',
      whatsappPendingBadge: 'Status: Pending WhatsApp Send',
      whatsappPendingTitle: 'Your order details are ready! Please send the WhatsApp message to complete your order.',
      whatsappPendingSubtitle:
        'Your order will NOT be marked as confirmed until your WhatsApp message is received and manually verified by our team.',
      whatsappReturnedBanner:
        'Welcome back! Once you have pressed Send in WhatsApp, confirm below to clear your shopping bag. Need to resend? Open WhatsApp again below.',
      whatsappCartPreservedNote:
        'Your shopping bag is preserved while you send the message and will only clear after you confirm below.',
      reopenWhatsapp: 'Open WhatsApp Again',
      copyWhatsappMessage: 'Copy Order Message',
      copiedToast: 'Order message copied to clipboard',
      editOrderDetails: 'Edit Order Details',
      confirmSentCta: 'I Have Sent the WhatsApp Message',
      confirmSentHint: 'Click only after sending the message in WhatsApp to clear your bag and avoid duplicate submissions.',
      sentPendingVerificationTitle: 'WhatsApp Message Submitted — Awaiting Store Verification',
      sentPendingVerificationSubtitle:
        'Thank you! Your shopping bag has been cleared and your order reference has been logged as pending verification until our team reviews your WhatsApp message.',
      awaitingStoreVerificationBadge: 'Status: Awaiting Manual Verification',
      pendingVerificationStatus: 'Pending Verification',
      validationRequired: 'Please complete all required checkout fields before continuing to WhatsApp.',
      validationFullName: 'Please enter your full name.',
      validationEmail: 'Please enter a valid email address or leave it blank.',
      validationPhone: 'Please enter a valid phone number (minimum 7 digits).',
      validationAddress: 'Please enter your complete shipping address.',
      validationCity: 'Please enter your city.',
      orderNumberLabel: 'Order ID',
      deliverToLabel: 'Deliver To',
      notesSummaryLabel: 'Order Notes',
      returnHome: 'Return to Boutique',
      continueShopping: 'Continue Shopping',
    },
    about: {
      kicker: 'Our Heritage & Craft',
      title: 'Beauty formulated with quiet reverence for skin',
      subtitle:
        "Founded at the intersection of Parisian color artistry and botanical skincare alchemy, noore'beauty crafts modern heirlooms for everyday radiance.",
      storyTitle: 'The Brand Story',
      storyP1:
        "noore'beauty began with a simple conviction: luminous color should never compromise skin health. Disappointed by heavy pigments that masked natural texture, our founders spent three years collaborating with botanical chemists to suspend mineral color inside cold-pressed rosehip, sea buckthorn, and hyaluronic nectar.",
      storyP2:
        'Each compact, glass dropper, and sculpted gold lipstick bullet is designed as an intimate object of calm—inviting you to slow down and savor five mindful minutes at your vanity.',
      missionTitle: 'Our Mission',
      missionBody:
        'To elevate daily beauty routines through clean, dermatologically tested formulations that nourish the skin barrier while delivering effortless editorial color.',
      visionTitle: 'Our Vision',
      visionBody:
        'A global beauty house celebrated across cultures—honoring diverse undertones, bilingual accessibility, and transparent botanical sourcing.',
      philosophyTitle: 'Beauty Philosophy',
      philosophyBody:
        'We believe radiance is never painted on; it is awakened. Our textures melt at skin temperature, letting freckles, glow, and natural vitality shine through.',
      qualityTitle: 'Ingredients & Purity Standards',
      qualityBody:
        '100% cruelty-free, paraben-free, and sulfate-free. Every batch undergoes stability testing and sources fair-trade damask rose, niacinamide, and biomimetic peptides.',
      valuesTitle: 'Pillars of the Maison',
      values: [
        {
          title: 'Botanical Integrity',
          desc: 'Cold-pressed plant actives preserve antioxidant potency without synthetic fillers.',
        },
        {
          title: 'Universal Undertones',
          desc: 'Shades calibrated across warm olive, golden beige, deep espresso, and fair neutral tones.',
        },
        {
          title: 'Refined Sustainability',
          desc: 'Recyclable frosted glass flacons and FSC-certified cream paper packaging.',
        },
      ],
    },
    contact: {
      kicker: 'Client Concierge',
      title: 'We are here to assist your ritual',
      subtitle: 'Questions about shade matching, sensitive skin ingredients, or your parcel? Reach our concierge team.',
      formTitle: 'Send a Private Note',
      nameLabel: 'Your Name',
      emailLabel: 'Email Address',
      subjectLabel: 'Subject',
      messageLabel: 'How may we help?',
      sendCta: 'Send Message',
      sentSuccess: 'Thank you. Our concierge will respond within 24 hours.',
      infoTitle: 'Atelier Directory',
      emailTitle: 'Concierge Email',
      phoneTitle: 'Telephone & WhatsApp',
      addressTitle: 'Flagship Salon',
      addressValue: '42 Clifton Pavilion, Gulberg III, Lahore & Rue Saint-Honoré Studio',
      hoursTitle: 'Atelier Hours',
      hoursValue: 'Monday – Saturday · 10:00 AM – 8:00 PM',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'Do you offer Cash on Delivery (COD)?',
          a: 'Yes. Cash on Delivery is available nationwide with complimentary gift wrapping and sealed freshness guarantees.',
        },
        {
          q: "Are noore'beauty products suitable for sensitive skin?",
          a: 'All skincare and complexion formulas are dermatologist-tested, fragrance-mindful, and free from parabens, drying alcohols, and mineral oils.',
        },
        {
          q: 'How can I find my exact foundation shade?',
          a: 'Each foundation page includes warm, neutral, and cool undertone descriptions. You may also contact our concierge for complimentary shade matching.',
        },
        {
          q: 'What is your return and exchange policy?',
          a: 'Unopened items may be exchanged or returned within 14 days of delivery. Damaged parcels are replaced immediately at zero cost.',
        },
      ],
    },
    wishlist: {
      title: 'Your Saved Wishlist',
      subtitle: 'Curated favorites saved for your next vanity ritual.',
      emptyTitle: 'Your wishlist has no saved items yet',
      emptyBody: 'Tap the heart icon on any lipstick, serum, or palette to save it here.',
      moveToBag: 'Move to Bag',
    },
    footer: {
      tagline: 'Botanical skincare and couture color crafted for quiet daily luxury.',
      shopColumn: 'Boutique',
      maisonColumn: 'The Maison',
      careColumn: 'Client Care',
      copyright: "© 2026 noore'beauty. All rights reserved.",
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    loyalty: {
      kicker: 'The Noore Glow Club',
      title: 'Every ritual earns quiet rewards',
      subtitle:
        'Collect Noor Points on every purchase, verified review, and saved favorite—redeemable immediately for boutique credits and complimentary shipping.',
      joinTitle: 'Activate Your Noore Club Pass',
      joinSubtitle: 'Join in seconds and receive +200 Welcome Noor Points immediately toward your first reward.',
      nameLabel: 'Your Full Name',
      emailLabel: 'Email Address',
      joinCta: 'Join & Claim +200 Points',
      welcomeGiftNote: 'Instant +200 pts welcome gift · No fees, ever',
      validationError: 'Please enter your name and a valid email address.',
      memberCardLabel: 'Digital Member Pass',
      availablePoints: 'Available Noor Points',
      lifetimePoints: 'Lifetime Points',
      pointsUnit: 'pts',
      nextTierProgress: 'points to next tier',
      topTierReached: 'Highest Atelier Tier Unlocked',
      tiersHeading: 'Membership Tiers',
      tiersSub: 'Your lifetime Noor Points unlock elevated earning multipliers and lower free-shipping thresholds.',
      tierNames: {
        pearl: 'Pearl Member',
        'rose-gold': 'Rose Gold Member',
        'royal-noor': 'Royal Noor Member',
      },
      tierPerks: {
        pearl: ['1× Noor Points on all orders', 'PKR 200 instant reward at 200 pts', 'Free shipping over PKR 3,500'],
        'rose-gold': ['1.5× Noor Points multiplier', 'Free shipping over PKR 2,000', 'Early access to new shade drops'],
        'royal-noor': ['2× Noor Points multiplier', 'Always-free nationwide delivery', 'Priority atelier gift wrapping'],
      },
      multiplierLabel: 'Earn Rate',
      rewardsHeading: 'Redeem Your Noor Points',
      rewardsSub: 'Apply a boutique credit directly to your shopping bag or checkout total.',
      redeemCta: 'Redeem Reward',
      appliedLabel: 'Applied to Bag',
      removeRewardCta: 'Remove & Refund Points',
      needMorePoints: 'more pts needed',
      joinFirstNote: 'Enroll above to unlock rewards',
      redeemedToast: 'Loyalty reward applied to your bag',
      earnHeading: 'Ways to Earn Noor Points',
      earnSub: 'Build your balance effortlessly with everyday beauty rituals.',
      earnWays: [
        {
          title: 'Boutique Orders',
          points: '1 pt / PKR 20',
          desc: 'Automatic points on every completed order, multiplied up to 2× by your tier.',
        },
        {
          title: 'Welcome Privilege',
          points: '+200 pts',
          desc: 'Credited immediately upon activating your complimentary Noore Glow Club pass.',
        },
        {
          title: 'Verified Reviews',
          points: '+50 pts',
          desc: 'Share your honest impressions on any product page after trying a shade or serum.',
        },
        {
          title: 'Curated Wishlist',
          points: '+75 pts',
          desc: 'Save your favorite essentials to your wishlist and claim a one-time styling bonus.',
        },
      ],
      claimWishlistBonus: 'Claim +75 Wishlist Bonus',
      wishlistNeedItem: 'Save an item in Shop first',
      bonusClaimed: 'Claimed',
      historyHeading: 'Points Activity Ledger',
      historyEmpty: 'Your earned and redeemed points will appear here.',
      cartPanelTitle: 'Noore Glow Club Reward',
      pointsWillEarn: 'This order earns',
      activeRewardLabel: 'Loyalty Credit',
      joinForWelcome: 'Join Noore Club (+200 pts welcome gift)',
      pointsEarnedOrderLabel: 'Noor Points Earned',
      productEarnNote: 'Noore Club members earn',
    },
  },
  ur: {
    brandName: 'نورِ بیوٹی',
    promoBanner: '۳,۵۰۰ روپے سے زائد کے آرڈر پر مفت ریشمی پاؤچ اور ڈیلیوری · ۱۵٪ رعایت کے لیے کوڈ NOORE15 استعمال کریں',
    nav: {
      home: 'ہوم',
      shop: 'شاپ',
      collections: 'کلیکشنز',
      loyalty: 'نور کلب',
      about: 'ہمارے بارے میں',
      contact: 'رابطہ',
      wishlist: 'پسندیدہ',
      bag: 'بیگ',
      searchPlaceholder: 'لپ اسٹک، سیرم، آئی شیڈو تلاش کریں...',
      searchButton: 'تلاش کریں',
    },
    hero: {
      kicker: 'خزاں اٹیلیئر کلیکشن',
      titleLine1: 'دمکتی جلد،',
      titleAccent: 'مخملی نکھار۔',
      subtitle:
        'قدرتی نباتاتی اجزاء اور نفیس رنگوں کا حسین امتزاج۔ کشمیری نرم ساخت، عرقِ گلاب اور سانس لینے والی قدرتی چمک کے ساتھ خاص طور پر تیار کردہ۔',
      shopNow: 'ابھی خریدیں',
      exploreCollection: 'کلیکشن دیکھیں',
      badgeCruelty: 'کرولٹی فری اور ویگن',
      badgeBotanical: 'خالص نباتاتی عرق',
      badgeDelivery: 'کیش آن ڈیلیوری دستیاب',
    },
    home: {
      curatedTabBest: 'سب سے مقبول',
      curatedTabNew: 'نئی آمد',
      curatedTabTrending: 'ٹرینڈنگ',
      curatedHeading: 'منتخب شاہکار مصنوعات',
      curatedSub: 'روزمرہ کی خوبصورتی اور دیرپا آرام کے لیے تیار کردہ خاص فارمولے۔',
      viewAllShop: 'مکمل کیٹلاگ دیکھیں',
      categoriesHeading: 'کیٹیگری کے مطابق خریداری',
      categoriesSub: 'جلد کی نگہداشت اور میک اپ کی گیارہ خصوصی اقسام دریافت کریں۔',
      editorialKicker: 'نباتاتی کیمیاگری',
      editorialHeading: 'اسکن کیئر سے بھرپور رنگ جو جلد کو سانس لینے دیں',
      editorialBody:
        'نورِ بیوٹی کی ہر پروڈکٹ بھاری کیمیکلز کے بجائے خالص دمشقی گلاب کے تیل، اسکوالین اور باریک معدنی موتیوں سے تیار کی جاتی ہے۔',
      editorialCta: 'ہماری کہانی پڑھیں',
      offerKicker: 'خصوصی موسمی رعایت',
      offerHeading: 'اپنی پہلی خریداری پر ۱۵٪ رعایت حاصل کریں',
      offerBody:
        'میک اپ اور اسکن کیئر کی بہترین مصنوعات کا انتخاب کریں اور گھر کی دہلیز پر کیش آن ڈیلیوری کی سہولت پائیں۔',
      offerCodeLabel: 'کوڈ: NOORE15',
      offerCta: 'آفر سے فائدہ اٹھائیں',
      collectionsHeading: 'نمایاں کلیکشنز',
      collectionsSub: 'جدید اور نفیس حسن کے تین منفرد انداز۔',
      testimonialsHeading: 'صارفین کے تاثرات',
      testimonialsSub: 'ان خواتین کے حقیقی تجربات جنہوں نے نورِ بیوٹی کو اپنے روزمرہ معمول کا حصہ بنایا۔',
      newsletterHeading: 'نجی بیوٹی کلب میں شامل ہوں',
      newsletterSub: 'نئے شیڈز، خصوصی رعایتوں اور نباتاتی فارمولوں کی بروقت اطلاع پائیں۔',
      newsletterPlaceholder: 'اپنا ای میل پتہ درج کریں',
      newsletterCta: 'سبسکرائب کریں',
      newsletterSuccess: 'خوش آمدید! آپ کی شمولیت کی تصدیق ہو گئی ہے۔',
      newsletterError: 'براہ کرم درست ای میل پتہ درج کریں۔',
    },
    collections: {
      velvetRoseTitle: 'نور ویلوٹ روز',
      velvetRoseDesc: 'مخملی میٹ لپ اسٹکس، گلابی کریم بلش اور روز امبر آئی شیڈو پیلیٹس۔',
      goldenNectarTitle: 'نور گولڈن ریڈیئنس',
      goldenNectarDesc: 'جلد کو تروتازہ کرنے والے سیرم، نمی بخش کریمیں اور ہلکی سن اسکرین۔',
      silkAtelierTitle: 'نور سلک کمپلیکشن',
      silkAtelierDesc: 'ریشمی سیرم فاؤنڈیشن، والیم مسکارا اور نرم میک اپ برشز۔',
      discover: 'دریافت کریں',
    },
    categories: {
      all: 'تمام مصنوعات',
      makeup: 'میک اپ',
      skincare: 'اسکن کیئر',
      lipsticks: 'لپ اسٹکس اور لپ کیئر',
      foundations: 'فاؤنڈیشنز اور کنسیلرز',
      mascaras: 'مسکارا اور آئی لائنر',
      'blush-highlighters': 'بلش اور ہائی لائٹرز',
      'eyeshadow-palettes': 'آئی شیڈو پیلیٹس',
      'face-serums': 'فیس سیرمز',
      'sheet-masks': 'ماسک اور آئی پیچز',
      moisturizers: 'موئسچرائزرز',
      sunscreens: 'سن اسکرینز',
      'beauty-accessories': 'بیوٹی لوازمات',
    },
    shop: {
      title: 'بیوٹی اٹیلیئر',
      subtitle: 'اسکن کیئر سے بھرپور کاسمیٹکس، قدرتی سیرمز اور نفیس رنگوں کا مکمل انتخاب۔',
      searchLabel: 'تلاش کریں',
      searchPlaceholder: 'پروڈکٹ، شیڈ یا جزو تلاش کریں...',
      categoryLabel: 'کیٹیگری',
      priceLabel: 'زیادہ سے زیادہ قیمت',
      priceUpTo: 'تک',
      sortLabel: 'ترتیب دیں',
      sortCurated: 'مناسب ترتیب (کیٹیگری کے مطابق)',
      sortPopular: 'سب سے مقبول',
      sortNewest: 'نئی آمد',
      sortPriceAsc: 'قیمت: کم سے زیادہ',
      sortPriceDesc: 'قیمت: زیادہ سے کم',
      resetFilters: 'فلٹرز صاف کریں',
      resultsCount: 'مصنوعات دستیاب ہیں',
      emptyTitle: 'آپ کی تلاش کے مطابق کوئی پروڈکٹ نہیں ملی',
      emptyBody: 'براہ کرم قیمت کی حد بڑھائیں یا تلاش کا لفظ تبدیل کریں۔',
      filterToggle: 'فلٹرز',
    },
    product: {
      addToBag: 'بیگ میں شامل کریں',
      addedToBag: 'بیگ میں شامل ہو گیا',
      addToWishlist: 'پسندیدہ میں محفوظ کریں',
      savedInWishlist: 'پسندیدہ میں محفوظ ہے',
      selectShade: 'شیڈ منتخب کریں',
      finish: 'فنش',
      quantity: 'تعداد',
      inStock: 'دستیاب ہے · فوری ترسیل کے لیے تیار',
      freeShippingNote: '۳,۵۰۰ روپے سے زائد پر مفت ڈیلیوری · کیش آن ڈیلیوری دستیاب',
      descriptionTab: 'تفصیل',
      ingredientsTab: 'اجزاء',
      ritualTab: 'استعمال کا طریقہ',
      reviewsHeading: 'صارفین کی آراء',
      writeReview: 'اپنا تبصرہ لکھیں',
      yourName: 'آپ کا نام',
      yourLocation: 'شہر / ملک',
      yourRating: 'درجہ بندی',
      yourReview: 'آپ کا تجربہ',
      submitReview: 'تبصرہ شائع کریں',
      reviewSuccess: 'شکریہ! آپ کا تبصرہ شائع کر دیا گیا ہے۔',
      relatedHeading: 'اس کے ساتھ مزید منتخب مصنوعات',
      verifiedBuyer: 'تصدیق شدہ صارف',
      reviewsCountLabel: 'تبصرے',
      savePercent: 'بچت',
      backToShop: 'شاپ پر واپس جائیں',
    },
    cart: {
      title: 'آپ کا شاپنگ بیگ',
      drawerTitle: 'شاپنگ بیگ',
      emptyTitle: 'آپ کا بیوٹی بیگ فی الحال خالی ہے',
      emptyBody: 'مخملی لپ اسٹکس، سنہری نباتاتی سیرمز اور دمکتے رنگوں کو دریافت کریں۔',
      continueShopping: 'مصنوعات دیکھیں',
      subtotal: 'ذیلی کل',
      discount: 'خصوصی رعایت',
      shipping: 'ڈیلیوری چارجز',
      freeShipping: 'مفت',
      freeShippingThreshold: 'مفت ڈیلیوری کی سہولت حاصل ہو گئی',
      total: 'کل رقم',
      couponPlaceholder: 'کوڈ درج کریں (مثلاً NOORE15)',
      applyCoupon: 'لاگو کریں',
      couponApplied: 'رعایتی کوڈ کامیابی سے لاگو ہو گیا',
      couponInvalid: 'غلط کوڈ۔ براہ کرم NOORE15 یا GLOW20 آزمائیں۔',
      couponHint: 'دستیاب کوڈز: NOORE15 (۱۵٪ رعایت) یا GLOW20 (۲۰٪ رعایت)',
      remove: 'ہٹائیں',
      checkoutCta: 'چیک آؤٹ پر جائیں',
      viewFullCart: 'مکمل بیگ دیکھیں',
    },
    checkout: {
      title: 'واٹس ایپ کے ذریعے چیک آؤٹ',
      subtitle: 'نیچے اپنی تفصیلات پُر کریں اور واٹس ایپ پر پہلے سے تیار شدہ آرڈر پیغام صرف ایک کلک میں بھیجیں۔',
      customerSection: '۱۔ صارف کی معلومات',
      shippingSection: '۲۔ ترسیل کا پتہ',
      notesSection: '۳۔ اضافی آرڈر ہدایات',
      summarySection: 'آرڈر کا خلاصہ',
      fullName: 'مکمل نام',
      email: 'ای میل پتہ',
      optionalLabel: 'اختیاری',
      phone: 'فون نمبر',
      address: 'مکمل ترسیلی پتہ',
      city: 'شہر',
      postalCode: 'پوسٹل کوڈ',
      country: 'ملک',
      notes: 'اضافی آرڈر ہدایات',
      notesPlaceholder: 'قریبی مشہور جگہ، ڈیلیوری کا وقت یا گفٹ نوٹ لکھیں...',
      orderOnWhatsapp: 'واٹس ایپ پر آرڈر کریں',
      whatsappHelperNote: 'کلک کرنے پر آپ کے مکمل آرڈر کے ساتھ واٹس ایپ کھل جائے گا — بس Send بٹن دبائیں۔',
      whatsappSecurityNote: 'واٹس ایپ پیغام میں ادائیگی کی کوئی حساس معلومات کبھی شامل نہیں کی جاتیں۔',
      whatsappPreviewToggle: 'واٹس ایپ پیغام دیکھیں',
      whatsappPendingBadge: 'حالت: واٹس ایپ پیغام بھیجنے کا انتظار',
      whatsappPendingTitle: 'آپ کے آرڈر کی تفصیلات تیار ہیں! آرڈر مکمل کرنے کے لیے براہ کرم واٹس ایپ پیغام بھیجیں۔',
      whatsappPendingSubtitle:
        'جب تک آپ کا واٹس ایپ پیغام موصول ہو کر ہماری ٹیم کی جانب سے دستی تصدیق نہ ہو جائے، آرڈر کنفرم شمار نہیں ہوگا۔',
      whatsappReturnedBanner:
        'واپسی پر خوش آمدید! اگر آپ نے واٹس ایپ پر پیغام بھیج دیا ہے تو اپنا بیگ صاف کرنے کے لیے نیچے تصدیق کریں۔ بصورت دیگر واٹس ایپ دوبارہ کھولیں۔',
      whatsappCartPreservedNote:
        'پیغام بھیجنے تک آپ کا شاپنگ بیگ محفوظ رہے گا اور صرف آپ کی تصدیق کے بعد خالی کیا جائے گا۔',
      reopenWhatsapp: 'واٹس ایپ دوبارہ کھولیں',
      copyWhatsappMessage: 'آرڈر پیغام کاپی کریں',
      copiedToast: 'آرڈر پیغام کلپ بورڈ پر کاپی ہو گیا',
      editOrderDetails: 'آرڈر کی تفصیلات تبدیل کریں',
      confirmSentCta: 'میں نے واٹس ایپ پیغام بھیج دیا ہے',
      confirmSentHint: 'ڈبل آرڈر سے بچنے اور شاپنگ بیگ خالی کرنے کے لیے واٹس ایپ پر پیغام بھیجنے کے بعد ہی کلک کریں۔',
      sentPendingVerificationTitle: 'واٹس ایپ پیغام موصولی کے لیے بھیج دیا گیا — دستی تصدیق زیرِ التواء',
      sentPendingVerificationSubtitle:
        'شکریہ! آپ کا شاپنگ بیگ خالی کر دیا گیا ہے اور آپ کا آرڈر نمبر اسٹور کی دستی تصدیق تک زیرِ التواء ہے۔',
      awaitingStoreVerificationBadge: 'حالت: اسٹور کی تصدیق زیرِ التواء',
      pendingVerificationStatus: 'تصدیق زیرِ التواء',
      validationRequired: 'واٹس ایپ پر جانے سے پہلے براہ کرم تمام ضروری خانے پُر کریں۔',
      validationFullName: 'براہ کرم اپنا مکمل نام درج کریں۔',
      validationEmail: 'براہ کرم درست ای میل درج کریں یا اسے خالی چھوڑ دیں۔',
      validationPhone: 'براہ کرم درست فون نمبر درج کریں (کم از کم ۷ ہندسے)۔',
      validationAddress: 'براہ کرم مکمل ترسیلی پتہ درج کریں۔',
      validationCity: 'براہ کرم اپنے شہر کا نام درج کریں۔',
      orderNumberLabel: 'آرڈر آئی ڈی',
      deliverToLabel: 'ترسیل کا پتہ',
      notesSummaryLabel: 'اضافی ہدایات',
      returnHome: 'بوتیک پر واپس جائیں',
      continueShopping: 'خریداری جاری رکھیں',
    },
    about: {
      kicker: 'ہماری میراث اور فن',
      title: 'جلد کے احترام کے ساتھ تخلیق کردہ خوبصورتی',
      subtitle:
        'پیرس کی رنگ سازی اور خالص نباتاتی اسکن کیئر کے سنگم پر قائم، نورِ بیوٹی روزمرہ نکھار کے لیے جدید شاہکار پیش کرتا ہے۔',
      storyTitle: 'برانڈ کی کہانی',
      storyP1:
        'نورِ بیوٹی کا آغاز ایک سادہ یقین سے ہوا: خوبصورت رنگ کبھی جلد کی صحت کی قیمت پر نہیں آنے چاہئیں۔ ہمارے ماہرین نے تین سال کی تحقیق کے بعد معدنی رنگوں کو خالص گلاب، سی بکتھورن اور ہائیلورونک عرق میں سمو دیا۔',
      storyP2:
        'ہر کمپیکٹ، شیشے کا ڈراپر اور سنہری لپ اسٹک کیس اس طرح ڈیزائن کیا گیا ہے کہ آپ کا روزمرہ میک اپ ایک پرسکون اور پُرمسرت لمحہ بن جائے۔',
      missionTitle: 'ہمارا مشن',
      missionBody:
        'ایسے صاف، جلد دوست اور ماہرینِ امراضِ جلد سے تصدیق شدہ فارمولوں کے ذریعے روزمرہ سنگھار کو بلند کرنا جو جلد کو اندر سے نکھاریں۔',
      visionTitle: 'ہمارا وژن',
      visionBody:
        'ایک ایسا عالمی بیوٹی برانڈ جو ہر رنگت، دو لسانی رسائی اور شفاف نباتاتی اجزاء کی قدر کرتا ہو۔',
      philosophyTitle: 'حسن کا فلسفہ',
      philosophyBody:
        'ہمارا ماننا ہے کہ اصل چمک جلد پر تھوپی نہیں جاتی بلکہ جگائی جاتی ہے۔ ہماری مصنوعات جلد میں گھل مل کر قدرتی تازگی بخشتی ہیں۔',
      qualityTitle: 'معیار اور خالص اجزاء',
      qualityBody:
        '۱۰۰٪ کرولٹی فری، پیرابین اور سلفیٹ سے پاک۔ ہر بیچ سخت معیار کی جانچ سے گزرتا ہے۔',
      valuesTitle: 'ہماری بنیادی اقدار',
      values: [
        {
          title: 'نباتاتی خلوص',
          desc: 'قدرتی عرق بغیر کسی مصنوعی فلر کے جلد کو بھرپور غذائیت فراہم کرتے ہیں۔',
        },
        {
          title: 'ہر رنگت کے لیے موزوں',
          desc: 'گندمی، سنہری، گہرے اور ہلکے رنگوں کے لیے خاص طور پر متوازن شیڈز۔',
        },
        {
          title: 'پائیدار خوبصورتی',
          desc: 'دوبارہ قابلِ استعمال شیشے کی بوتلیں اور ماحول دوست پیکجنگ۔',
        },
      ],
    },
    contact: {
      kicker: 'کسٹمر کنسیرج',
      title: 'ہم آپ کی رہنمائی کے لیے موجود ہیں',
      subtitle: 'شیڈ کے انتخاب، حساس جلد کے اجزاء یا آرڈر کے بارے میں کسی بھی سوال کے لیے ہم سے رابطہ کریں۔',
      formTitle: 'پیغام بھیجیں',
      nameLabel: 'آپ کا نام',
      emailLabel: 'ای میل پتہ',
      subjectLabel: 'موضوع',
      messageLabel: 'آپ کا پیغام',
      sendCta: 'پیغام ارسال کریں',
      sentSuccess: 'شکریہ! ہماری ٹیم ۲۴ گھنٹوں میں آپ سے رابطہ کرے گی۔',
      infoTitle: 'اٹیلیئر رابطہ تفصیلات',
      emailTitle: 'کنسیرج ای میل',
      phoneTitle: 'فون اور واٹس ایپ',
      addressTitle: 'مرکزی سیلون',
      addressValue: '۴۲ کلفٹن پویلین، گلبرگ سوم، لاہور',
      hoursTitle: 'اوقاتِ کار',
      hoursValue: 'پیر تا ہفتہ · صبح ۱۰ بجے تا رات ۸ بجے',
      faqTitle: 'اکثر پوچھے جانے والے سوالات',
      faqs: [
        {
          q: 'کیا کیش آن ڈیلیوری (COD) کی سہولت دستیاب ہے؟',
          a: 'جی ہاں، ملک بھر میں مفت گفٹ ریپنگ کے ساتھ کیش آن ڈیلیوری کی سہولت موجود ہے۔',
        },
        {
          q: 'کیا یہ مصنوعات حساس جلد کے لیے محفوظ ہیں؟',
          a: 'ہماری تمام اسکن کیئر اور میک اپ مصنوعات پیرابین اور نقصان دہ کیمیکلز سے پاک اور حساس جلد کے لیے موزوں ہیں۔',
        },
        {
          q: 'میں اپنے رنگ کے مطابق صحیح فاؤنڈیشن کیسے منتخب کروں؟',
          a: 'ہر فاؤنڈیشن کے صفحے پر وارم، نیوٹرل اور کول انڈرٹون کی تفصیل درج ہے۔ آپ ہماری ٹیم سے مفت مشورہ بھی لے سکتی ہیں۔',
        },
        {
          q: 'واپسی اور تبدیلی کی پالیسی کیا ہے؟',
          a: 'نہ کھلی ہوئی مصنوعات ترسیل کے ۱۴ دن کے اندر تبدیل یا واپس کی جا سکتی ہیں۔ خراب پارسل فوری طور پر مفت تبدیل کیا جاتا ہے۔',
        },
      ],
    },
    wishlist: {
      title: 'آپ کی پسندیدہ فہرست',
      subtitle: 'آپ کی محفوظ کردہ بہترین بیوٹی مصنوعات۔',
      emptyTitle: 'آپ کی پسندیدہ فہرست ابھی خالی ہے',
      emptyBody: 'کسی بھی لپ اسٹک، سیرم یا پیلیٹ پر دل کے نشان کو دبائیں تاکہ وہ یہاں محفوظ ہو جائے۔',
      moveToBag: 'بیگ میں منتقل کریں',
    },
    footer: {
      tagline: 'روزمرہ نفاست کے لیے نباتاتی اسکن کیئر اور نفیس میک اپ۔',
      shopColumn: 'بوتیک',
      maisonColumn: 'ہمارا برانڈ',
      careColumn: 'کسٹمر کیئر',
      copyright: '© ۲۰۲۶ نورِ بیوٹی۔ تمام حقوق محفوظ ہیں۔',
      privacy: 'پرائیویسی پالیسی',
      terms: 'شرائط و ضوابط',
    },
    loyalty: {
      kicker: 'نور گلو کلب',
      title: 'ہر خریداری پر خصوصی انعامات پائیں',
      subtitle:
        'ہر آرڈر، تبصرے اور پسندیدہ فہرست پر نور پوائنٹس جمع کریں اور انہیں فوری رعایت اور مفت ڈیلیوری کے لیے استعمال کریں۔',
      joinTitle: 'اپنا نور کلب پاس حاصل کریں',
      joinSubtitle: 'ابھی شامل ہوں اور فوری طور پر ۲۰۰ خوش آمدید نور پوائنٹس پائیں۔',
      nameLabel: 'آپ کا مکمل نام',
      emailLabel: 'ای میل پتہ',
      joinCta: 'شامل ہوں اور ۲۰۰ پوائنٹس پائیں',
      welcomeGiftNote: 'فوری ۲۰۰ پوائنٹس تحفہ · بالکل مفت رکنیت',
      validationError: 'براہ کرم اپنا نام اور درست ای میل پتہ درج کریں۔',
      memberCardLabel: 'ڈیجیٹل ممبرشپ کارڈ',
      availablePoints: 'دستیاب نور پوائنٹس',
      lifetimePoints: 'مجموعی پوائنٹس',
      pointsUnit: 'پوائنٹس',
      nextTierProgress: 'پوائنٹس اگلے درجے تک',
      topTierReached: 'اعلیٰ ترین شاہی درجہ حاصل ہے',
      tiersHeading: 'ممبرشپ کے درجات',
      tiersSub: 'آپ کے مجموعی پوائنٹس مزید تیز پوائنٹس اور مفت ڈیلیوری کی سہولیات کھولتے ہیں۔',
      tierNames: {
        pearl: 'پرل ممبر',
        'rose-gold': 'روز گولڈ ممبر',
        'royal-noor': 'رائل نور ممبر',
      },
      tierPerks: {
        pearl: ['ہر آرڈر پر ۱× نور پوائنٹس', '۲۰۰ پوائنٹس پر ۲۰۰ روپے رعایت', '۳,۵۰۰ روپے سے زائد پر مفت ڈیلیوری'],
        'rose-gold': ['۱.۵× اضافی پوائنٹس کی رفتار', '۲,۰۰۰ روپے سے زائد پر مفت ڈیلیوری', 'نئے شیڈز تک قبل از وقت رسائی'],
        'royal-noor': ['۲× دگنے نور پوائنٹس', 'ہر آرڈر پر ہمیشہ مفت ڈیلیوری', 'خصوصی ترجیحی گفٹ پیکنگ'],
      },
      multiplierLabel: 'پوائنٹس کی رفتار',
      rewardsHeading: 'نور پوائنٹس سے انعامات حاصل کریں',
      rewardsSub: 'اپنے بیگ یا چیک آؤٹ بل میں فوری رعایت شامل کریں۔',
      redeemCta: 'انعام حاصل کریں',
      appliedLabel: 'بیگ میں لاگو ہے',
      removeRewardCta: 'ہٹائیں اور پوائنٹس واپس لیں',
      needMorePoints: 'مزید پوائنٹس درکار ہیں',
      joinFirstNote: 'انعامات کے لیے اوپر شمولیت اختیار کریں',
      redeemedToast: 'لائلٹی رعایت آپ کے بیگ میں شامل ہو گئی',
      earnHeading: 'نور پوائنٹس کمانے کے طریقے',
      earnSub: 'روزمرہ کی خریداری اور سرگرمیوں سے آسانی سے پوائنٹس جمع کریں۔',
      earnWays: [
        {
          title: 'بوتیک آرڈرز',
          points: '۱ پوائنٹ / ۲۰ روپے',
          desc: 'ہر مکمل آرڈر پر خودکار پوائنٹس، ممبرشپ درجے کے مطابق ۲ گنا تک۔',
        },
        {
          title: 'خوش آمدید تحفہ',
          points: '+۲۰۰ پوائنٹس',
          desc: 'نور گلو کلب میں شامل ہوتے ہی فوری طور پر اکاؤنٹ میں شامل۔',
        },
        {
          title: 'پروڈکٹ تبصرے',
          points: '+۵۰ پوائنٹس',
          desc: 'اپنی پسندیدہ مصنوعات پر ایمانداری سے رائے لکھنے پر انعام۔',
        },
        {
          title: 'پسندیدہ فہرست',
          points: '+۷۵ پوائنٹس',
          desc: 'اپنی پسند کی مصنوعات محفوظ کریں اور خصوصی بونس پوائنٹس حاصل کریں۔',
        },
      ],
      claimWishlistBonus: '+۷۵ پسندیدہ بونس حاصل کریں',
      wishlistNeedItem: 'پہلے شاپ سے کوئی پروڈکٹ محفوظ کریں',
      bonusClaimed: 'حاصل شدہ',
      historyHeading: 'پوائنٹس کی تفصیل',
      historyEmpty: 'آپ کے کمائے اور استعمال کیے گئے پوائنٹس یہاں نظر آئیں گے۔',
      cartPanelTitle: 'نور گلو کلب انعام',
      pointsWillEarn: 'اس آرڈر پر ملیں گے',
      activeRewardLabel: 'لائلٹی کریڈٹ',
      joinForWelcome: 'نور کلب میں شامل ہوں (+۲۰۰ پوائنٹس تحفہ)',
      pointsEarnedOrderLabel: 'حاصل کردہ نور پوائنٹس',
      productEarnNote: 'نور کلب ممبرز کمائیں',
    },
  },
};

export const getTranslations = (lang: Language): TranslationDictionary => translations[lang];
