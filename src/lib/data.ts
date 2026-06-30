/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface HeroSlide {
  id: number;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  align?: "left" | "center";
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  span?: "tall" | "wide" | "normal";
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  /** Human readable category label, e.g. "T-Shirt" */
  category: string;
  /** Category id used for filtering / linking, e.g. "t-shirt" */
  categoryId: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  colors: ColorOption[];
  sizes: string[];
  badge?: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  avatar: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  ratio: "portrait" | "square" | "landscape";
}

/* ------------------------------------------------------------------ */
/* Image helper                                                        */
/* ------------------------------------------------------------------ */
const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const SIZES = ["S", "M", "L", "XL"];

const PALETTE = {
  black: { name: "Black", hex: "#1a1a1a" },
  charcoal: { name: "Charcoal", hex: "#3a3a3a" },
  stone: { name: "Stone", hex: "#d8cfc4" },
  sand: { name: "Sand", hex: "#c9b79c" },
  ecru: { name: "Ecru", hex: "#ede6d6" },
  navy: { name: "Navy", hex: "#2a3142" },
  olive: { name: "Olive", hex: "#5a5e4e" },
  camel: { name: "Camel", hex: "#b08d57" },
  slate: { name: "Slate", hex: "#6b7280" },
  offwhite: { name: "Off White", hex: "#f2efe9" },
  sage: { name: "Sage", hex: "#9caf88" },
  rust: { name: "Rust", hex: "#9e5e3a" },
} satisfies Record<string, ColorOption>;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "Autumn / Winter 2026",
    title: "Quiet luxury,",
    highlight: "loud presence.",
    description:
      "A curated wardrobe of essential silhouettes — engineered fabrics, considered proportions, nothing superfluous.",
    image: img("1490481651871-ab68de25d43d", 1600),
  },
  {
    id: 2,
    eyebrow: "The Tailoring Edit",
    title: "Cut to move,",
    highlight: "made to last.",
    description:
      "Precision tailoring meets soft construction. Pieces designed for the city, the studio, and everywhere between.",
    image: img("1487412720507-e7ab37603c6f", 1600),
  },
  {
    id: 3,
    eyebrow: "New Arrivals",
    title: "Form follows",
    highlight: "feeling.",
    description:
      "Tactile knits, fluid layers, and a palette pulled from northern light. The new season has arrived.",
    image: img("1539109136881-3be0616acf4b", 1600),
  },
];

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */
export const categories: Category[] = [
  { id: "t-shirt", name: "T-Shirt", count: 4, image: img("1521572163474-6864f9cf17ab"), span: "tall" },
  { id: "shirt", name: "Shirt", count: 3, image: img("1602810318383-e386cc2a3ccf") },
  { id: "sweater", name: "Sweater", count: 3, image: img("1576871337622-98d48d1cf531") },
  { id: "hoodie", name: "Hoodie", count: 3, image: img("1556821840-3a63f95609a7"), span: "wide" },
  { id: "pants", name: "Pants", count: 3, image: img("1473966968600-fa801b869a1a") },
  { id: "jacket", name: "Jacket", count: 4, image: img("1591047139829-d91aecb6caea"), span: "tall" },
  { id: "accessories", name: "Accessories", count: 4, image: img("1523275335684-37898b6baf30") },
  { id: "shoes", name: "Shoes", count: 4, image: img("1542291026-7eec264c27ff") },
];

export const categoryNav = categories.map((c) => ({ id: c.id, name: c.name }));

/* ------------------------------------------------------------------ */
/* Catalog (single source of truth)                                    */
/* ------------------------------------------------------------------ */
type RawProduct = Omit<Product, "image" | "images" | "category" | "sizes"> & {
  imageIds: string[];
  sizes?: string[];
};

const categoryLabel: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.name])
);

const raw: RawProduct[] = [
  /* T-SHIRT */
  {
    id: "heavyweight-cotton-tee",
    name: "Heavyweight Cotton Tee",
    categoryId: "t-shirt",
    price: 65,
    oldPrice: 85,
    rating: 4.9,
    reviews: 210,
    badge: "Bestseller",
    featured: true,
    bestSeller: true,
    colors: [PALETTE.offwhite, PALETTE.black, PALETTE.sand],
    description:
      "A 240gsm garment-dyed tee with a structured drape and a perfectly weighted hem. Pre-shrunk organic cotton that only gets better with wear.",
    imageIds: ["1521572163474-6864f9cf17ab", "1583743814966-8936f5b7be1a", "1576566588028-4147f3842f27"],
  },
  {
    id: "pima-cotton-tee",
    name: "Pima Cotton Tee",
    categoryId: "t-shirt",
    price: 70,
    rating: 4.9,
    reviews: 421,
    bestSeller: true,
    colors: [PALETTE.offwhite, PALETTE.stone, PALETTE.navy],
    description:
      "Spun from long-staple Peruvian Pima cotton for a silken hand-feel and subtle sheen. The everyday tee, elevated.",
    imageIds: ["1583743814966-8936f5b7be1a", "1521572163474-6864f9cf17ab", "1503342217505-b0a15ec3261c"],
  },
  {
    id: "boxy-jersey-tee",
    name: "Boxy Jersey Tee",
    categoryId: "t-shirt",
    price: 58,
    rating: 4.7,
    reviews: 88,
    colors: [PALETTE.ecru, PALETTE.olive, PALETTE.black],
    description:
      "A relaxed, boxy silhouette with dropped shoulders and a clean ribbed collar. Cut from breathable open-weave jersey.",
    imageIds: ["1576566588028-4147f3842f27", "1521572163474-6864f9cf17ab"],
  },
  {
    id: "long-sleeve-tee",
    name: "Long Sleeve Layering Tee",
    categoryId: "t-shirt",
    price: 78,
    rating: 4.6,
    reviews: 64,
    badge: "New",
    colors: [PALETTE.charcoal, PALETTE.offwhite],
    description:
      "A slim long-sleeve base layer in brushed supima. Designed to sit cleanly under knitwear and tailoring.",
    imageIds: ["1503342217505-b0a15ec3261c", "1583743814966-8936f5b7be1a"],
  },

  /* SHIRT */
  {
    id: "structured-linen-shirt",
    name: "Structured Linen Shirt",
    categoryId: "shirt",
    price: 140,
    rating: 4.6,
    reviews: 58,
    featured: true,
    colors: [PALETTE.ecru, PALETTE.sage, PALETTE.navy],
    description:
      "Woven from European flax with a crisp, breathable handle. A mother-of-pearl placket and clean camp collar finish the piece.",
    imageIds: ["1602810318383-e386cc2a3ccf", "1620799139507-2a76f79a2f4d", "1620916566398-39f1143ab7be"],
  },
  {
    id: "poplin-overshirt",
    name: "Cotton Poplin Overshirt",
    categoryId: "shirt",
    price: 165,
    rating: 4.7,
    reviews: 92,
    colors: [PALETTE.stone, PALETTE.black],
    description:
      "Sits between a shirt and a light jacket. Crisp poplin, patch pockets, and a relaxed shoulder for easy layering.",
    imageIds: ["1620799139507-2a76f79a2f4d", "1485125639709-a60c3a500bf1"],
  },
  {
    id: "brushed-flannel-shirt",
    name: "Brushed Flannel Shirt",
    categoryId: "shirt",
    price: 150,
    rating: 4.8,
    reviews: 77,
    badge: "New",
    colors: [PALETTE.olive, PALETTE.rust, PALETTE.charcoal],
    description:
      "Double-napped for a soft, cosy surface with a refined drape. The cold-weather shirt that works season after season.",
    imageIds: ["1485125639709-a60c3a500bf1", "1620916566398-39f1143ab7be"],
  },

  /* SWEATER */
  {
    id: "merino-crew-sweater",
    name: "Merino Crew Sweater",
    categoryId: "sweater",
    price: 180,
    rating: 4.8,
    reviews: 96,
    featured: true,
    colors: [PALETTE.navy, PALETTE.camel, PALETTE.stone],
    description:
      "Knitted from extra-fine Italian merino with full-fashioned seams. Lightweight warmth with zero bulk.",
    imageIds: ["1576871337622-98d48d1cf531", "1620012253295-c15cc3e65df4", "1596755094514-f87e34085b2c"],
  },
  {
    id: "cashmere-roll-neck",
    name: "Cashmere Roll Neck",
    categoryId: "sweater",
    price: 260,
    rating: 5.0,
    reviews: 312,
    bestSeller: true,
    badge: "Bestseller",
    colors: [PALETTE.camel, PALETTE.charcoal, PALETTE.ecru],
    description:
      "Grade-A Mongolian cashmere, brushed to a cloud-soft finish. A quietly luxurious roll neck built to last decades.",
    imageIds: ["1620012253295-c15cc3e65df4", "1576871337622-98d48d1cf531", "1596755094514-f87e34085b2c"],
  },
  {
    id: "ribbed-wool-knit",
    name: "Ribbed Wool Knit",
    categoryId: "sweater",
    price: 195,
    rating: 4.7,
    reviews: 71,
    colors: [PALETTE.olive, PALETTE.stone],
    description:
      "A chunky 7-gauge rib in lambswool with a generous, comforting weight and a high funnel neck.",
    imageIds: ["1596755094514-f87e34085b2c", "1620012253295-c15cc3e65df4"],
  },

  /* HOODIE */
  {
    id: "brushed-fleece-hoodie",
    name: "Brushed Fleece Hoodie",
    categoryId: "hoodie",
    price: 120,
    rating: 4.8,
    reviews: 142,
    badge: "New",
    featured: true,
    colors: [PALETTE.slate, PALETTE.black, PALETTE.ecru],
    description:
      "A 480gsm loopback fleece, brushed inside for softness. Heavy zips, a double-layer hood, and a clean, structured fit.",
    imageIds: ["1556821840-3a63f95609a7", "1551488831-00ddcb6c6bd3", "1593030761757-71fae45fa0e7"],
  },
  {
    id: "oversized-zip-hoodie",
    name: "Oversized Zip Hoodie",
    categoryId: "hoodie",
    price: 135,
    rating: 4.6,
    reviews: 89,
    colors: [PALETTE.charcoal, PALETTE.sand],
    description:
      "A relaxed, dropped-shoulder zip-through with a boxy body. Cut from organic cotton terry for everyday softness.",
    imageIds: ["1551488831-00ddcb6c6bd3", "1556821840-3a63f95609a7"],
  },
  {
    id: "pullover-hoodie",
    name: "Heavy Pullover Hoodie",
    categoryId: "hoodie",
    price: 110,
    rating: 4.7,
    reviews: 124,
    colors: [PALETTE.olive, PALETTE.black, PALETTE.offwhite],
    description:
      "The definitive pullover — substantial, soft, and built around a roomy kangaroo pocket and ribbed cuffs.",
    imageIds: ["1593030761757-71fae45fa0e7", "1551488831-00ddcb6c6bd3"],
  },

  /* PANTS */
  {
    id: "relaxed-pleated-trouser",
    name: "Relaxed Pleated Trouser",
    categoryId: "pants",
    price: 160,
    rating: 4.7,
    reviews: 74,
    featured: true,
    colors: [PALETTE.charcoal, PALETTE.sand, PALETTE.navy],
    description:
      "A single-pleat trouser with a tailored waist and a fluid, tapered leg. Wool-blend suiting fabric with natural stretch.",
    imageIds: ["1473966968600-fa801b869a1a", "1542219550-37153d387c27"],
  },
  {
    id: "wide-leg-denim",
    name: "Wide-Leg Denim",
    categoryId: "pants",
    price: 150,
    rating: 4.8,
    reviews: 256,
    bestSeller: true,
    colors: [PALETTE.navy, PALETTE.slate],
    description:
      "Rigid Japanese selvedge denim with a high rise and a clean, wide leg. Built to fade beautifully over years.",
    imageIds: ["1542272604-787c3835535d", "1473966968600-fa801b869a1a"],
  },
  {
    id: "tapered-chino",
    name: "Tapered Cotton Chino",
    categoryId: "pants",
    price: 130,
    rating: 4.6,
    reviews: 63,
    colors: [PALETTE.sand, PALETTE.olive, PALETTE.black],
    description:
      "A modern chino in brushed twill — slim through the leg with a comfortable mid rise and a clean finish.",
    imageIds: ["1542219550-37153d387c27", "1542272604-787c3835535d"],
  },

  /* JACKET */
  {
    id: "oversized-wool-coat",
    name: "Oversized Wool Coat",
    categoryId: "jacket",
    price: 420,
    oldPrice: 520,
    rating: 4.9,
    reviews: 128,
    badge: "New",
    featured: true,
    colors: [PALETTE.camel, PALETTE.charcoal, PALETTE.navy],
    description:
      "A double-faced Italian wool coat with a relaxed, enveloping silhouette and a clean, collarless neckline.",
    imageIds: ["1591047139829-d91aecb6caea", "1547949003-9792a18a2601", "1620799140408-edc6dcb6d633"],
  },
  {
    id: "tailored-blazer",
    name: "Tailored Blazer",
    categoryId: "jacket",
    price: 380,
    rating: 4.9,
    reviews: 184,
    bestSeller: true,
    colors: [PALETTE.navy, PALETTE.charcoal],
    description:
      "A soft-shouldered, half-lined blazer with a natural drape. Tailored in a stretch wool hopsack for all-day ease.",
    imageIds: ["1594938298603-c8148c4dae35", "1591047139829-d91aecb6caea"],
  },
  {
    id: "quilted-overshirt",
    name: "Quilted Overshirt",
    categoryId: "jacket",
    price: 220,
    rating: 4.7,
    reviews: 134,
    bestSeller: true,
    colors: [PALETTE.olive, PALETTE.sand],
    description:
      "Diamond-quilted and lightly padded for transitional warmth. Worn open as a shacket or buttoned as a light jacket.",
    imageIds: ["1620799140408-edc6dcb6d633", "1547949003-9792a18a2601"],
  },
  {
    id: "field-jacket",
    name: "Cotton Field Jacket",
    categoryId: "jacket",
    price: 290,
    rating: 4.8,
    reviews: 97,
    colors: [PALETTE.olive, PALETTE.stone, PALETTE.black],
    description:
      "A utilitarian four-pocket field jacket in waxed cotton, with a refined fit and antique-finish hardware.",
    imageIds: ["1547949003-9792a18a2601", "1620799140408-edc6dcb6d633"],
  },

  /* ACCESSORIES */
  {
    id: "minimal-leather-tote",
    name: "Minimal Leather Tote",
    categoryId: "accessories",
    price: 240,
    oldPrice: 300,
    rating: 4.7,
    reviews: 89,
    featured: true,
    colors: [PALETTE.camel, PALETTE.black],
    description:
      "A clean, unstructured tote in full-grain vegetable-tanned leather. Ages into a rich, personal patina.",
    imageIds: ["1523275335684-37898b6baf30", "1544022613-e87ca75a784a", "1578587018452-892bacefd3f2"],
  },
  {
    id: "everyday-watch",
    name: "Everyday Automatic Watch",
    categoryId: "accessories",
    price: 320,
    rating: 4.8,
    reviews: 64,
    colors: [PALETTE.black, PALETTE.slate],
    description:
      "A 38mm automatic with a brushed-steel case, sapphire crystal, and an understated dial. Quietly precise.",
    imageIds: ["1523275335684-37898b6baf30", "1544022613-e87ca75a784a"],
  },
  {
    id: "leather-card-holder",
    name: "Leather Card Holder",
    categoryId: "accessories",
    price: 95,
    rating: 4.6,
    reviews: 51,
    badge: "New",
    colors: [PALETTE.camel, PALETTE.charcoal],
    description:
      "A slim three-pocket card holder, edge-painted by hand and cut from the same vegetable-tanned hide as our totes.",
    imageIds: ["1544022613-e87ca75a784a", "1578587018452-892bacefd3f2"],
  },
  {
    id: "wool-scarf",
    name: "Brushed Wool Scarf",
    categoryId: "accessories",
    price: 110,
    rating: 4.7,
    reviews: 72,
    colors: [PALETTE.camel, PALETTE.navy, PALETTE.stone],
    description:
      "An oversized, double-faced scarf in brushed lambswool. Generous enough to wrap, light enough to layer.",
    imageIds: ["1578587018452-892bacefd3f2", "1578681994506-b8f463449011"],
  },

  /* SHOES */
  {
    id: "leather-derby-shoe",
    name: "Leather Derby Shoe",
    categoryId: "shoes",
    price: 290,
    rating: 4.9,
    reviews: 67,
    featured: true,
    colors: [PALETTE.black, PALETTE.camel],
    description:
      "A Goodyear-welted derby in box calf leather, built on a sleek last with a comfortable cushioned footbed.",
    imageIds: ["1542291026-7eec264c27ff", "1460353581641-37baddab0fa2"],
  },
  {
    id: "runner-sneaker",
    name: "Runner Sneaker",
    categoryId: "shoes",
    price: 210,
    rating: 4.8,
    reviews: 198,
    bestSeller: true,
    colors: [PALETTE.offwhite, PALETTE.black, PALETTE.stone],
    description:
      "A minimal low-profile runner in premium leather and suede, on a lightweight cushioned sole.",
    imageIds: ["1606107557195-0e29a4b5b4aa", "1560769629-975ec94e6a86", "1549298916-b41d501d3772"],
  },
  {
    id: "court-sneaker",
    name: "Leather Court Sneaker",
    categoryId: "shoes",
    price: 185,
    rating: 4.7,
    reviews: 143,
    badge: "New",
    colors: [PALETTE.offwhite, PALETTE.sage],
    description:
      "A clean court silhouette in soft full-grain leather with a tonal cupsole. The everyday white sneaker, refined.",
    imageIds: ["1560769629-975ec94e6a86", "1549298916-b41d501d3772", "1525966222134-fcfa99b8ae77"],
  },
  {
    id: "trail-sneaker",
    name: "Suede Trail Sneaker",
    categoryId: "shoes",
    price: 230,
    rating: 4.6,
    reviews: 84,
    colors: [PALETTE.sand, PALETTE.olive, PALETTE.charcoal],
    description:
      "A rugged-luxe trail profile in water-repellent suede with a grippy lugged outsole and a padded collar.",
    imageIds: ["1525966222134-fcfa99b8ae77", "1549298916-b41d501d3772"],
  },
];

export const catalog: Product[] = raw.map((p) => ({
  ...p,
  category: categoryLabel[p.categoryId] ?? p.categoryId,
  image: img(p.imageIds[0]),
  images: p.imageIds.map((id) => img(id, 1100)),
  sizes: p.sizes ?? SIZES,
}));

export const featuredProducts: Product[] = catalog.filter((p) => p.featured);
export const bestSellers: Product[] = catalog.filter((p) => p.bestSeller);

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */
export function getProductById(id: string): Product | undefined {
  return catalog.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === "all") return catalog;
  return catalog.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCat = catalog.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  );
  const others = catalog.filter((p) => p.categoryId !== product.categoryId);
  return [...sameCat, ...others].slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Reviews (deterministic per product)                                 */
/* ------------------------------------------------------------------ */
const reviewAvatars = [
  "1438761681033-6461ffad8d80",
  "1500648767791-00dcc994a43e",
  "1534528741775-53994a69daeb",
  "1494790108377-be9c29b29330",
  "1517445312882-bc9910d016b7",
];

const reviewPool: Omit<Review, "id" | "avatar">[] = [
  {
    name: "Amara Lindqvist",
    role: "Verified Buyer",
    rating: 5,
    date: "2 weeks ago",
    title: "Exceptional quality",
    body: "The construction is impeccable and it has held its shape perfectly. Worth every penny — I've already ordered a second.",
  },
  {
    name: "Theo Marchetti",
    role: "Verified Buyer",
    rating: 5,
    date: "1 month ago",
    title: "My new favourite",
    body: "Fits true to size with a beautiful drape. The fabric feels premium and only gets softer with each wash.",
  },
  {
    name: "Yuki Tanaka",
    role: "Verified Buyer",
    rating: 4,
    date: "3 weeks ago",
    title: "Beautiful, runs slightly large",
    body: "Gorgeous piece and the colour is exactly as pictured. I'd size down if you're between sizes, but overall delighted.",
  },
  {
    name: "Sofia Andersson",
    role: "Verified Buyer",
    rating: 5,
    date: "5 days ago",
    title: "Looks even better in person",
    body: "Packaging to product, the attention to detail is extraordinary. This is what premium should feel like.",
  },
  {
    name: "Daniel Okonkwo",
    role: "Verified Buyer",
    rating: 5,
    date: "2 months ago",
    title: "Wardrobe staple",
    body: "Pairs with everything and the quality is far beyond the price point. Fast shipping and lovely packaging too.",
  },
];

export function getReviews(product: Product): Review[] {
  const seed = product.id.length + product.reviews;
  const count = 3 + (seed % 3);
  return Array.from({ length: count }).map((_, i) => {
    const base = reviewPool[(seed + i) % reviewPool.length];
    return {
      ...base,
      id: `${product.id}-r${i}`,
      avatar: img(reviewAvatars[(seed + i) % reviewAvatars.length], 200),
    };
  });
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amara Lindqvist",
    role: "Creative Director",
    quote:
      "The construction is impeccable. These are the only pieces that have survived three seasons in my rotation without losing their shape.",
    avatar: img("1438761681033-6461ffad8d80", 200),
  },
  {
    id: 2,
    name: "Theo Marchetti",
    role: "Architect",
    quote:
      "Minimal without being cold. Everything fits into a considered system — I get dressed in seconds and always feel sharp.",
    avatar: img("1500648767791-00dcc994a43e", 200),
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    role: "Photographer",
    quote:
      "The fabrics photograph beautifully and feel even better on. This is what quiet luxury should actually mean.",
    avatar: img("1534528741775-53994a69daeb", 200),
  },
  {
    id: 4,
    name: "Sofia Andersson",
    role: "Editor",
    quote:
      "From the packaging to the stitching, the attention to detail is extraordinary. It feels genuinely premium.",
    avatar: img("1494790108377-be9c29b29330", 200),
  },
];

/* ------------------------------------------------------------------ */
/* Instagram                                                           */
/* ------------------------------------------------------------------ */
export const instagramPosts: InstagramPost[] = [
  { id: 1, image: img("1490481651871-ab68de25d43d", 700), likes: 2841, ratio: "portrait" },
  { id: 2, image: img("1483985988355-763728e1935b", 700), likes: 1923, ratio: "square" },
  { id: 3, image: img("1485462537746-965f33f7f6a7", 700), likes: 3120, ratio: "landscape" },
  { id: 4, image: img("1434389677669-e08b4cac3105", 700), likes: 2210, ratio: "portrait" },
  { id: 5, image: img("1539109136881-3be0616acf4b", 700), likes: 4012, ratio: "square" },
  { id: 6, image: img("1487412720507-e7ab37603c6f", 700), likes: 1567, ratio: "portrait" },
  { id: 7, image: img("1525507119028-ed4c629a60a3", 700), likes: 2980, ratio: "landscape" },
  { id: 8, image: img("1503342217505-b0a15ec3261c", 700), likes: 3450, ratio: "square" },
];
