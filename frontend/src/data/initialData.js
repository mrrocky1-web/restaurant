// High quality fashion imagery dataset for Fashionvillaroyal (10 to 20 images per product)

export const initialProducts = [
  {
    id: 'fvr-101',
    sku: 'FVR-RYL-001',
    name: 'Maharani Embroidered Velvet Bridal Lehenga',
    category: 'Women',
    subcategory: 'Bridal Lehengas',
    regularPrice: 45000,
    salePrice: 34999,
    published: true,
    featured: true,
    rating: 4.9,
    reviewCount: 42,
    stock: 15,
    description: 'Immerse in royal heritage with our Maharani Bridal Lehenga. Handcrafted in rich royal velvet adorned with intricate Zardozi embroidery, dabka work, and sparkling sequins. Paired with a heavy embroidered dupatta and sheer organza second drape.',
    specifications: [
      { key: 'Fabric', value: 'Micro Velvet & Net' },
      { key: 'Work', value: 'Hand Zardozi, Dabka & Resham Threads' },
      { key: 'Care', value: 'Dry Clean Only' },
      { key: 'In The Box', value: '1 Lehenga Skirt, 1 Blouse Piece, 2 Dupattas' }
    ],
    mainImageIndex: 0,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Crimson Red', 'Emerald Green', 'Royal Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Crimson Red', size: 'S', price: 34999, stock: 4 },
      { color: 'Crimson Red', size: 'M', price: 34999, stock: 5 },
      { color: 'Crimson Red', size: 'L', price: 35999, stock: 3 },
      { color: 'Emerald Green', size: 'M', price: 36999, stock: 2 },
      { color: 'Royal Blue', size: 'L', price: 36999, stock: 1 }
    ],
    reviews: [
      { id: 'r1', user: 'Ananya Sharma', rating: 5, date: '2026-08-14', text: 'Absolutely breathtaking! The Zardozi work is so premium. Received endless compliments at my sangeet!', helpful: 14 },
      { id: 'r2', user: 'Priya Verma', rating: 5, date: '2026-07-29', text: 'Heavy royal fabric and exact color match. Worth every rupee.', helpful: 8 }
    ]
  },
  {
    id: 'fvr-102',
    sku: 'FVR-SHR-002',
    name: 'Imperial Gold Silk Embroidered Sherwani Set',
    category: 'Men',
    subcategory: 'Sherwanis',
    regularPrice: 38000,
    salePrice: 28999,
    published: true,
    featured: true,
    rating: 4.8,
    reviewCount: 31,
    stock: 10,
    description: 'Designed for the modern Maharaja. Crafted from raw Banarasi silk with intricate antique bullion thread embroidery. Includes tailored churidar, embellished brooch, and matching crushed silk stole.',
    specifications: [
      { key: 'Fabric', value: 'Raw Banarasi Silk' },
      { key: 'Embellishment', value: 'Antique Gold Thread & Stones' },
      { key: 'Care', value: 'Dry Clean Only' }
    ],
    mainImageIndex: 0,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Royal Gold', 'Ivory White', 'Midnight Black'],
    sizes: ['38', '40', '42', '44'],
    variants: [
      { color: 'Royal Gold', size: '40', price: 28999, stock: 4 },
      { color: 'Royal Gold', size: '42', price: 28999, stock: 3 },
      { color: 'Ivory White', size: '40', price: 29999, stock: 3 }
    ],
    reviews: [
      { id: 'r3', user: 'Rohan Kapoor', rating: 5, date: '2026-08-01', text: 'Fit like a glove! Royal fabric and extremely royal look for groom attire.', helpful: 19 }
    ]
  },
  {
    id: 'fvr-103',
    sku: 'FVR-SARE-003',
    name: 'Kanjeevaram Pure Zari Tissue Silk Saree',
    category: 'Women',
    subcategory: 'Sarees',
    regularPrice: 28000,
    salePrice: 21500,
    published: true,
    featured: true,
    rating: 4.95,
    reviewCount: 56,
    stock: 20,
    description: 'Woven by master weavers from Kanchipuram. Features pure gold tested Zari pallu and intricate peacock motifs across the border. Includes an unstitched blouse piece.',
    specifications: [
      { key: 'Weave', value: 'Handwoven Kanjeevaram Tissue Silk' },
      { key: 'Zari Type', value: 'Pure Gold Tested Zari' },
      { key: 'Length', value: '6.3 Meters with Blouse' }
    ],
    mainImageIndex: 0,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Ruby Pink', 'Royal Purple', 'Mustard Gold'],
    sizes: ['Free Size'],
    variants: [
      { color: 'Ruby Pink', size: 'Free Size', price: 21500, stock: 10 },
      { color: 'Royal Purple', size: 'Free Size', price: 21500, stock: 6 },
      { color: 'Mustard Gold', size: 'Free Size', price: 22500, stock: 4 }
    ],
    reviews: [
      { id: 'r4', user: 'Sunita Reddy', rating: 5, date: '2026-08-20', text: 'The sheen of pure zari tissue silk is beyond words. Truly heirloom quality.', helpful: 22 }
    ]
  },
  {
    id: 'fvr-104',
    sku: 'FVR-SUIT-004',
    name: 'Bespoke Double-Breasted Royal Velvet Tuxedo',
    category: 'Men',
    subcategory: 'Suits & Tuxedos',
    regularPrice: 32000,
    salePrice: 24999,
    published: true,
    featured: true,
    rating: 4.7,
    reviewCount: 19,
    stock: 8,
    description: 'Tailored for evening galas and receptions. Cut from plush Italian velvet with satin peak lapels and hand-finished pick stitching.',
    specifications: [
      { key: 'Fabric', value: 'Italian Micro Velvet & Satin' },
      { key: 'Fit', value: 'Modern Slim Fit' },
      { key: 'Includes', value: 'Jacket, Satin Trousers, Bowtie' }
    ],
    mainImageIndex: 0,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Midnight Navy', 'Emerald Green', 'Classic Black'],
    sizes: ['38', '40', '42', '44'],
    variants: [
      { color: 'Midnight Navy', size: '40', price: 24999, stock: 3 },
      { color: 'Midnight Navy', size: '42', price: 24999, stock: 3 },
      { color: 'Emerald Green', size: '40', price: 25999, stock: 2 }
    ],
    reviews: [
      { id: 'r5', user: 'Vikramaditya Roy', rating: 5, date: '2026-08-10', text: 'Exquisite stitching and heavy luxury velvet feeling.', helpful: 11 }
    ]
  },
  {
    id: 'fvr-105',
    sku: 'FVR-JW-005',
    name: 'Kundan Polki Choker & Earring Royal Set',
    category: 'Accessories',
    subcategory: 'Royal Jewelry',
    regularPrice: 18000,
    salePrice: 13999,
    published: true,
    featured: false,
    rating: 4.85,
    reviewCount: 28,
    stock: 12,
    description: 'Handcrafted Kundan Polki statement choker encrusted with uncut glass polki stones, pearl drops, and emerald green bead strings. 22K gold electroplated finish.',
    specifications: [
      { key: 'Material', value: 'Brass Base with 22K Gold Plating' },
      { key: 'Stone Type', value: 'Kundan Polki & Cultural Pearls' },
      { key: 'Closure', value: 'Adjustable Thread Dori' }
    ],
    mainImageIndex: 0,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475143-be8840742f9e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Gold Emerald', 'Gold Ruby', 'Pure Gold'],
    sizes: ['One Size'],
    variants: [
      { color: 'Gold Emerald', size: 'One Size', price: 13999, stock: 7 },
      { color: 'Gold Ruby', size: 'One Size', price: 13999, stock: 5 }
    ],
    reviews: [
      { id: 'r6', user: 'Meera Deshmukh', rating: 5, date: '2026-08-18', text: 'Sublime sparkle! Looks like authentic museum piece.', helpful: 15 }
    ]
  },
  {
    id: 'fvr-106',
    sku: 'FVR-ANK-006',
    name: 'Floor-Length Embroidered Georgette Anarkali',
    category: 'Women',
    subcategory: 'Anarkali Suits',
    regularPrice: 22000,
    salePrice: 16999,
    published: true,
    featured: false,
    rating: 4.6,
    reviewCount: 23,
    stock: 14,
    description: 'Graceful flowy Silhouette Anarkali crafted from lightweight pure viscose georgette, embellished with mirror work and sequin borders.',
    specifications: [
      { key: 'Fabric', value: 'Viscose Georgette' },
      { key: 'Inner Lining', value: 'Soft Shantoon' },
      { key: 'Flare', value: '4.5 Meters Full Gher' }
    ],
    mainImageIndex: 0,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Dusty Rose', 'Mint Green', 'Ivory Gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Dusty Rose', size: 'M', price: 16999, stock: 5 },
      { color: 'Mint Green', size: 'L', price: 17499, stock: 4 }
    ],
    reviews: [
      { id: 'r7', user: 'Deepika Nair', rating: 4, date: '2026-08-05', text: 'Comfortable to wear all day during festivities!', helpful: 7 }
    ]
  }
];


export const restaurantPhotos = [
  {
    id: 'rest-01',
    title: 'Royal Fine Dining Lounge',
    caption: 'Opulent chandelier seating with plush velvet booths and authentic royal ambiance.',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rest-02',
    title: 'Live Open Kitchen & Gourmet Grill',
    caption: 'Master chefs preparing artisan burgers, tandoori delights, and signature flame-grilled specialties live.',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rest-03',
    title: 'The King’s Outdoor Terrace Garden',
    caption: 'Al fresco outdoor dining under warm fairy lights with garden view.',
    url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rest-04',
    title: 'Chef’s Table & Special Reserve Bar',
    caption: 'Exclusive private dining experience with personalized multi-course gourmet menu.',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rest-05',
    title: 'Artisan Burger & Tandoor Station',
    caption: 'Hand-crafted brioche buns, fresh organic patties, and clay oven breads baked to perfection.',
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rest-06',
    title: 'Royal Dessert Counter & Bakery',
    caption: 'Handcrafted desserts, artisan ice creams, and gold-leaf infused royal sweets.',
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'
  }
];

export const initialOrders = [
  {
    id: 'ORD-98421',
    customerName: 'Aarav Singhania',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    date: '2026-09-02',
    total: 34999,
    status: 'Processing',
    orderType: 'Delivery',
    customerLocation: {
      lat: 19.1075,
      lng: 72.8263,
      accuracy: 12,
      formattedAddress: 'Flat 402, Royal Residency, Juhu, Mumbai, Maharashtra - 400049'
    },
    items: [
      {
        productId: 'fvr-101',
        name: 'Maharani Embroidered Velvet Bridal Lehenga',
        price: 34999,
        quantity: 1,
        color: 'Crimson Red',
        size: 'M',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80'
      }
    ],
    address: 'Flat 402, Royal Residency, Juhu, Mumbai, Maharashtra - 400049',
    paymentMethod: 'UPI (GPay)'
  },
  {
    id: 'ORD-98418',
    customerName: 'Sneha Kulkarni',
    email: 'sneha@example.com',
    phone: '+91 98111 22334',
    date: '2026-08-30',
    total: 21500,
    status: 'Shipped',
    orderType: 'Dine-In',
    tableNumber: 'Table #7',
    outletName: 'King’s Royal Dining - Koramangala Flagship',
    customerLocation: {
      lat: 12.9352,
      lng: 77.6245,
      accuracy: 8,
      formattedAddress: '12-A Blossom Towers, Koramangala, Bengaluru, Karnataka - 560034'
    },
    items: [
      {
        productId: 'fvr-103',
        name: 'Kanjeevaram Pure Zari Tissue Silk Saree',
        price: 21500,
        quantity: 1,
        color: 'Ruby Pink',
        size: 'Free Size',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'
      }
    ],
    address: 'Table #7 (Dine-In), Koramangala Outlet, Bengaluru',
    paymentMethod: 'Credit Card'
  }
];

export const initialCustomers = [
  {
    id: 'CUST-01',
    name: 'Aarav Singhania',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    ordersCount: 3,
    totalSpent: 89997,
    status: 'Active',
    joinDate: '2026-03-12'
  },
  {
    id: 'CUST-02',
    name: 'Sneha Kulkarni',
    email: 'sneha@example.com',
    phone: '+91 98111 22334',
    city: 'Bengaluru',
    ordersCount: 2,
    totalSpent: 43000,
    status: 'Active',
    joinDate: '2026-05-19'
  },
  {
    id: 'CUST-03',
    name: 'Vikramaditya Roy',
    email: 'vikram@example.com',
    phone: '+91 97777 88899',
    city: 'New Delhi',
    ordersCount: 1,
    totalSpent: 24999,
    status: 'Active',
    joinDate: '2026-07-04'
  }
];

