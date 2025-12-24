export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  subcategory?: string;
  sizes: Size[];
  colors: Color[];
  tags: string[];
  badge?: 'new' | 'limited' | 'sold-out';
  inStock: boolean;
  featured?: boolean;
  material?: string;
  care?: string[];
  details?: string[];
}

export interface Size {
  name: string;
  inStock: boolean;
}

export interface Color {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  image: string;
  heroImage: string;
  products: string[];
  season?: string;
  year?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface LookbookImage {
  id: string;
  src: string;
  alt: string;
  products: string[];
  caption?: string;
}

export interface Lookbook {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  images: LookbookImage[];
  season: string;
  year: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
