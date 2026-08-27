export const MOCK_CATEGORIES = [
  {
    _id: 'cat_1',
    name: 'Spices & Masalas',
    slug: 'spices-masalas',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
    shortDescription: 'Pure stone-ground organic spices packed with natural oils and authentic aroma.',
    description: 'Our traditional stone-ground masalas are made without added colors, artificial preservatives, or synthetic aromas.',
    isActive: true,
    sortOrder: 1
  },
  {
    _id: 'cat_2',
    name: 'Cold Pressed Oils',
    slug: 'cold-pressed-oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600',
    shortDescription: 'Wooden kacchi ghani cold-pressed oils retaining full natural nutrients and flavor.',
    description: 'Extracted slowly at room temperature using wooden expellers (Kacchi Ghani) to lock in natural antioxidants.',
    isActive: true,
    sortOrder: 2
  },
  {
    _id: 'cat_3',
    name: 'Herbal Teas & Infusions',
    slug: 'herbal-teas',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    shortDescription: 'Handpicked organic herbs, leaves & flowers crafted for natural rejuvenation.',
    description: 'Refreshing and therapeutic herbal tea blends featuring Tulsi, Ginger, Chamomile, and Lemongrass.',
    isActive: true,
    sortOrder: 3
  },
  {
    _id: 'cat_4',
    name: 'Supplements & Wellness',
    slug: 'supplements',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    shortDescription: 'Authentic Ayurvedic herbs, powders and natural health boosters.',
    description: 'Pure herbal formulations like Ashwagandha, Amla, Shilajit, and Triphala sourced directly from certified farms.',
    isActive: true,
    sortOrder: 4
  },
  {
    _id: 'cat_5',
    name: 'Food & Groceries',
    slug: 'food-wellness',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    shortDescription: 'Organic unpolished pulses, super grains, raw honey & A2 desi ghee.',
    description: 'Wholesome staple foods cultivated with sustainable farming practices without chemicals or pesticides.',
    isActive: true,
    sortOrder: 5
  },
  {
    _id: 'cat_6',
    name: 'Personal Care & Skin',
    slug: 'personal-care',
    image: 'https://images.unsplash.com/photo-1608248597263-00079e9658a5?auto=format&fit=crop&q=80&w=600',
    shortDescription: 'Toxin-free, handmade herbal soaps, hair oils and natural ubtans.',
    description: 'Natural skincare and hair care products free from parabens, sulfates, silicones, and synthetic fragrance.',
    isActive: true,
    sortOrder: 6
  }
];

export const MOCK_PRODUCTS = [
  {
    _id: 'prod_1',
    name: 'Organic Chhole Masala (Stone Ground)',
    slug: 'organic-chhole-masala',
    sku: 'NM-SP-001',
    category: MOCK_CATEGORIES[0],
    price: 180,
    mrp: 220,
    discountPercentage: 18,
    stock: 45,
    rating: 4.9,
    numReviews: 42,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Authentic Punjabi style stone-ground spice blend made with handpicked whole spices.',
    description: 'Experience rich, aromatic and deeply flavorful Chhole with our authentic stone-ground Chhole Masala. Made with slow-roasted spices including Pomegranate seeds (Anardana), Black Cardamom, Cumin, and Nutmeg without added preservatives or salt fillers.',
    benefits: [
      '100% Pure & Unadulterated',
      'Stone-ground to retain natural essential oils',
      'Zero added artificial color or flavor enhancers',
      'Packed in eco-friendly resealable aroma lock pouch'
    ],
    ingredients: 'Cumin, Coriander, Black Pepper, Anardana, Black Cardamom, Dry Ginger, Cloves, Cinnamon, Mace, Bay Leaf.',
    howToUse: 'Add 2 tablespoons to boiled chickpeas during temper prep. Simmer on low heat for 10 minutes to infuse rich traditional flavor.',
    variants: [
      { name: '100g', price: 180, mrp: 220, stock: 25 },
      { name: '250g', price: 420, mrp: 500, stock: 20 }
    ],
    seoTitle: 'Buy Pure Organic Chhole Masala Online | Natural Mantra',
    seoDescription: 'Authentic Punjabi Chhole Masala made with stone ground organic spices. 100% natural, no preservatives. Fast shipping across India.',
    seoKeywords: 'chhole masala, organic spice, stone ground masala, natural mantra spices'
  },
  {
    _id: 'prod_2',
    name: 'Kacchi Ghani Cold Pressed Mustard Oil (A2)',
    slug: 'cold-pressed-mustard-oil',
    sku: 'NM-OIL-002',
    category: MOCK_CATEGORIES[1],
    price: 340,
    mrp: 390,
    discountPercentage: 13,
    stock: 60,
    rating: 4.8,
    numReviews: 86,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Traditionally extracted in wooden chekku at low temperature. Pungent aroma & high smoke point.',
    description: 'Natural Mantra Cold Pressed Mustard Oil is pressed slowly using traditional wooden expellers (Wood Kacchi Ghani) from finest black mustard seeds. Zero heat processing preserves natural Omega-3, Omega-6, and Vitamin E.',
    benefits: [
      'Rich in Monounsaturated Fatty Acids (MUFA)',
      'Natural pungency & rich dark golden hue',
      'Heart healthy cooking & traditional oil massage',
      'Unrefined & unbleached'
    ],
    ingredients: '100% Pure Raw Black Mustard Seeds.',
    howToUse: 'Ideal for deep frying, traditional Indian curries, pickle making, and body massage.',
    variants: [
      { name: '500ml', price: 185, mrp: 210, stock: 30 },
      { name: '1 Litre', price: 340, mrp: 390, stock: 30 }
    ],
    seoTitle: 'Wood Pressed Mustard Oil (Kacchi Ghani) 1L | Natural Mantra',
    seoDescription: 'Buy 100% pure wood cold-pressed mustard oil online. Unrefined, nutrient-rich kacchi ghani oil for healthy cooking.',
    seoKeywords: 'cold pressed mustard oil, kacchi ghani, wooden chekku oil, organic cooking oil'
  },
  {
    _id: 'prod_3',
    name: 'Organic Turmeric Powder (High Curcumin 5%+)',
    slug: 'organic-turmeric-powder',
    sku: 'NM-SP-003',
    category: MOCK_CATEGORIES[0],
    price: 165,
    mrp: 195,
    discountPercentage: 15,
    stock: 80,
    rating: 4.9,
    numReviews: 64,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'High curcumin potency organic turmeric ground from whole sun-dried roots.',
    description: 'Sourced directly from organic farms in Meghalaya & Odisha, our Turmeric Powder boasts guaranteed high curcumin content (above 5%), offering powerful anti-inflammatory and antioxidant benefits.',
    benefits: [
      'Guaranteed >5% Curcumin level',
      'Deep natural golden-orange color',
      'Zero lead chromate or synthetic dyes',
      'Promotes immunity & joint health'
    ],
    ingredients: '100% Organic Raw Turmeric Rhizome Powder.',
    howToUse: 'Mix 1/2 tsp in warm milk with black pepper for Golden Milk (Haldi Doodh) or use in everyday cooking.',
    variants: [
      { name: '250g', price: 165, mrp: 195, stock: 45 },
      { name: '500g', price: 299, mrp: 360, stock: 35 }
    ],
    seoTitle: 'High Curcumin Organic Turmeric Powder | Natural Mantra',
    seoDescription: 'Buy pure organic haldi powder with >5% curcumin content. Sun dried and stone ground for maximum wellness benefits.',
    seoKeywords: 'turmeric powder, organic haldi, high curcumin turmeric, natural mantra'
  },
  {
    _id: 'prod_4',
    name: 'Wild Tulsi & Ginger Herbal Detox Tea',
    slug: 'wild-tulsi-ginger-herbal-tea',
    sku: 'NM-TEA-004',
    category: MOCK_CATEGORIES[2],
    price: 240,
    mrp: 290,
    discountPercentage: 17,
    stock: 50,
    rating: 4.7,
    numReviews: 38,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Revitalizing blend of Rama, Krishna & Vana Tulsi with spicy ginger roots.',
    description: 'A soothing caffeine-free herbal infusion combining three sacred varieties of Holy Basil (Rama, Krishna & Vana Tulsi) with sun-dried Zingiber officinale (Ginger).',
    benefits: [
      'Relieves stress & supports respiratory wellness',
      'Boosts natural daily immunity',
      '100% Whole leaf loose tea without dust or sweepings',
      'Caffeine free soothing bedtime tea'
    ],
    ingredients: 'Rama Tulsi, Krishna Tulsi, Vana Tulsi, Sun-dried Ginger, Black Pepper, Cardamom.',
    howToUse: 'Steep 1 tsp in boiling water for 3-5 minutes. Strain and enjoy warm with raw honey.',
    variants: [
      { name: '100g Loose Tea', price: 240, mrp: 290, stock: 30 },
      { name: '25 Tea Bags', price: 280, mrp: 330, stock: 20 }
    ],
    seoTitle: 'Organic Tulsi Ginger Herbal Tea | Natural Mantra',
    seoDescription: 'Buy loose leaf organic Tulsi Ginger herbal tea. Rejuvenating Ayurvedic infusion for immunity and stress relief.',
    seoKeywords: 'tulsi tea, herbal tea, immunity booster, organic tea, natural mantra'
  },
  {
    _id: 'prod_5',
    name: 'Organic Amla Powder (Vitamin C Booster)',
    slug: 'organic-amla-powder',
    sku: 'NM-SUPP-005',
    category: MOCK_CATEGORIES[3],
    price: 190,
    mrp: 230,
    discountPercentage: 17,
    stock: 75,
    rating: 4.8,
    numReviews: 53,
    isFeatured: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Pure shade-dried Indian Gooseberry powder for hair, skin & digestion.',
    description: 'Made from wild forest-harvested organic Amla fruits deseeded and shade-dried to retain high natural Vitamin C and polyphenols.',
    benefits: [
      'Natural source of absorbable Bio-Vitamin C',
      'Strengthens hair roots & prevents premature graying',
      'Supports healthy gut digestion',
      '100% Pure powder with zero fillers'
    ],
    ingredients: '100% Organic Deseeded Amla Fruit (Phyllanthus emblica) Powder.',
    howToUse: 'Take 1 tsp with warm water morning on empty stomach, or apply as a natural hair mask mixed with coconut oil.',
    variants: [
      { name: '200g', price: 190, mrp: 230, stock: 45 },
      { name: '500g', price: 380, mrp: 450, stock: 30 }
    ],
    seoTitle: 'Organic Amla Powder for Hair & Immunity | Natural Mantra',
    seoDescription: 'Pure shade-dried organic Amla powder packed with natural Vitamin C. Great for hair health and immunity.',
    seoKeywords: 'amla powder, vitamin c supplement, organic amla, Ayurvedic powder'
  },
  {
    _id: 'prod_6',
    name: 'Raw Himalayan Wild Forest Honey',
    slug: 'raw-himalayan-wild-forest-honey',
    sku: 'NM-FOOD-006',
    category: MOCK_CATEGORIES[4],
    price: 450,
    mrp: 520,
    discountPercentage: 13,
    stock: 40,
    rating: 5.0,
    numReviews: 95,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Unfiltered, unpasteurized raw honey ethically collected from Himalayan flora.',
    description: 'Directly sourced from indigenous bee-keepers in the unpolluted Himalayan valleys. Single-origin raw honey containing live enzymes, pollen, and propolis without adulteration or C3/C4 sugar syrups.',
    benefits: [
      'NMR Tested & 100% Sugar-Syrup Free Certified',
      'Raw, unheated & coarse filtered',
      'Rich in naturally occurring bee pollen & antioxidants',
      'Natural energy booster & cough remedy'
    ],
    ingredients: '100% Pure Raw Wild Multi-Floral Honey.',
    howToUse: 'Add 1 tbsp to lukewarm water or tea. Do not boil or heat directly.',
    variants: [
      { name: '500g Glass Jar', price: 450, mrp: 520, stock: 25 },
      { name: '1kg Glass Jar', price: 820, mrp: 980, stock: 15 }
    ],
    seoTitle: 'Raw Himalayan Wild Forest Honey 100% Pure | Natural Mantra',
    seoDescription: 'Buy NMR tested raw Himalayan forest honey online. Unheated, unprocessed and sugar syrup free.',
    seoKeywords: 'raw honey, himalayan honey, wild forest honey, organic honey'
  }
];

export const MOCK_BLOGS = [
  {
    _id: 'blog_1',
    title: '5 Life-Changing Benefits of Switching to Cold-Pressed Kacchi Ghani Oils',
    slug: 'benefits-of-cold-pressed-oils',
    category: 'Wellness & Nutrition',
    author: 'Dr. Ananya Sharma (Ayurvedic Practitioner)',
    coverImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Learn why traditional wooden-pressed oils retain antioxidants and essential fatty acids that refined cooking oils destroy during high-heat processing.',
    content: `Cooking oils form the core foundation of Indian cuisine. However, modern commercial refining processes subject seeds to extreme temperatures (above 200°C) and chemical solvents like hexane. 

### Why Choose Cold Pressed (Kacchi Ghani) Oils?

1. **Intact Natural Antioxidants**: Cold pressing uses wooden expellers that operate at room temperature, keeping Vitamin E and polyphenols intact.
2. **Zero Chemical Solvents**: No bleaching agents or deodorizers are added, ensuring 100% natural purity.
3. **Heart Healthy Fatty Acids**: Preserves MUFA and PUFA balance naturally.
4. **Rich Authentic Aroma**: Enhances flavor of traditional Indian curries and tadkas.
5. **No Trans Fats**: Free from dangerous hydrogenated trans-fatty acids.

Switching to *Natural Mantra Kacchi Ghani Mustard Oil* or *Cold Pressed Sesame Oil* is one of the simplest dietary upgrades for long-term heart and digestive health.`,
    tags: ['Cold Pressed Oil', 'Organic Living', 'Ayurveda', 'Healthy Cooking'],
    isPublished: true,
    publishedAt: '2026-08-15T10:00:00.000Z',
    seoTitle: '5 Benefits of Cold Pressed Oils for Health | Natural Mantra',
    seoDescription: 'Discover why switching to wooden cold pressed Kacchi Ghani oils protects heart health and preserves vital nutrients.',
    seoKeywords: 'cold pressed oil benefits, kacchi ghani vs refined oil, organic oils india'
  },
  {
    _id: 'blog_2',
    title: 'The Golden Spice: How High Curcumin Turmeric Supercharges Immunity',
    slug: 'high-curcumin-turmeric-immunity-guide',
    category: 'Ayurvedic Remedies',
    author: 'Chef Rajesh Verma',
    coverImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Not all turmeric powder is created equal. Discover why curcumin percentage matters for cellular immunity and joint health.',
    content: `Turmeric has been hailed as the golden remedy of Ayurveda for over 4,000 years. However, market-grade commercial haldi often contains less than 1.5% curcumin or is diluted with starch and toxic yellow dyes like lead chromate.

### The Power of High Curcumin (>5%)

Curcumin is the active bioactive compound responsible for turmeric's potent anti-inflammatory, antimicrobial, and antioxidant properties.

#### How to Prepare Authentic Golden Milk (Haldi Doodh):
- 1 cup warm A2 milk or almond milk
- 1/2 tsp Natural Mantra High Curcumin Organic Turmeric
- 1 pinch freshly cracked black pepper (piperine enhances curcumin absorption by 2000%)
- 1 tsp raw wild honey (added when lukewarm)

Drink nightly to bolster defense against seasonal allergies and joint stiffness.`,
    tags: ['Turmeric', 'Curcumin', 'Golden Milk', 'Immunity Boost'],
    isPublished: true,
    publishedAt: '2026-08-20T10:00:00.000Z',
    seoTitle: 'High Curcumin Turmeric Benefits & Golden Milk Recipe | Natural Mantra',
    seoDescription: 'Learn why high curcumin organic turmeric powder boosts immunity and how to prepare traditional Golden Milk.',
    seoKeywords: 'turmeric curcumin, haldi doodh, organic haldi, immune booster'
  }
];

export const MOCK_FAQS = [
  {
    _id: 'faq_1',
    category: 'Products & Quality',
    question: 'Are all Natural Mantra products 100% organic and lab-certified?',
    answer: 'Yes! All our spices, oils, herbs, and staples are sourced directly from certified organic farms across India. Every batch undergoes rigorous NABL-accredited laboratory testing for pesticide residues, heavy metals, and adulteration.',
    sortOrder: 1
  },
  {
    _id: 'faq_2',
    category: 'Shipping & Delivery',
    question: 'What are your delivery times and shipping charges?',
    answer: 'We offer FREE Shipping across India on all orders above ₹500. Orders below ₹500 incur a nominal flat shipping fee of ₹60. Deliveries typically arrive within 2 to 5 business days depending on your location.',
    sortOrder: 2
  },
  {
    _id: 'faq_3',
    category: 'Cold Pressed Oils',
    question: 'What is Kacchi Ghani and how is it different from refined oil?',
    answer: 'Kacchi Ghani refers to traditional oil extraction using wooden expellers (Chekku) at ambient temperatures without heat or chemical solvents. Refined oil uses intense heat (200°C+) and toxic chemicals like hexane which destroy natural nutrients.',
    sortOrder: 3
  },
  {
    _id: 'faq_4',
    category: 'Orders & Payments',
    question: 'What payment options do you support?',
    answer: 'We accept all major Indian payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Debit/Credit Cards, and Cash on Delivery (COD).',
    sortOrder: 4
  }
];

export const MOCK_SITE_SETTINGS = {
  businessName: 'Natural Mantra',
  taglineHi: 'जिएं प्रकृति के मंत्र के साथ',
  taglineEn: 'Pure, authentic and natural products for a healthy you and a healthy planet.',
  phone: '+91 98765 43210',
  email: 'Mayank2june@gmail.com',
  address: '28 Mapple Residency, Peer Muchhala, Zirakpur, Punjab - 140603',
  gstin: '03BEVPM2912R1ZV',
  freeShippingThreshold: 500,
  flatShippingFee: 60,
  socialLinks: {
    instagram: 'https://instagram.com/naturalmantra.official',
    facebook: 'https://facebook.com/naturalmantra',
    youtube: 'https://youtube.com/naturalmantra',
    whatsapp: 'https://wa.me/919876543210'
  },
  announcementText: '✨ Free Shipping on all orders above ₹500 across India! | 100% Pure & Lab Certified Organic'
};

export const MOCK_HERO_SLIDES = [
  {
    id: 'hero_1',
    headline: 'Har Khane Ka Swaad,\nPrakriti Ke Saath',
    subheading: 'Pure, authentic and stone-ground organic products for a healthy you and a healthy planet.',
    taglineHi: 'जिएं प्रकृति के मंत्र के साथ',
    ctaText: 'SHOP BESTSELLERS',
    ctaLink: '/shop',
    bgImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'hero_2',
    headline: 'Traditional Wooden\nKacchi Ghani Oils',
    subheading: 'Extracted slowly at room temperature to preserve 100% natural aroma, antioxidants and purity.',
    taglineHi: 'शुद्धता ही हमारा मंत्र है',
    ctaText: 'EXPLORE OILS',
    ctaLink: '/shop?category=cold-pressed-oils',
    bgImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1600'
  }
];
