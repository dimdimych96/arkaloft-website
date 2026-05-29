// Form types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ==========================================
// Типы для контента сайта (из старого проекта)
// ==========================================

export interface Hall {
  id: string;
  name: string;
  ageGroup: string;
  area: string;
  description: string;
  features: string[];
  images: string[];
  icon: string;
  color: string;
  price: string;
  link: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  priceWeekend?: number | null;
  duration: number;
  includedItems: string[];
  hallType: '0+' | '7+' | 'both';
  isActive: boolean;
  imageUrl?: string;
  icon?: string;
  popular?: boolean;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: number | null;
  icon: string;
  color: string;
  category: 'main' | 'additional' | 'show' | 'animator' | 'decor' | 'catering';
  order: number;
  isActive: boolean;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  content: string;
  hallType: '0+' | '7+' | 'both';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  hallType: '0+' | '7+' | 'both';
  date: Date;
  time: string;
  duration: number;
  guestCount: number;
  packageType: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  childAge?: number;
  favoriteHero?: string;
  whatsappSent?: boolean;
  whatsappMessageId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'gallery' | 'features' | 'pricing';
  title: string;
  content: string;
  imageUrl?: string;
  images?: string[];
  order: number;
  pageId: string;
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  uploadedAt: Date;
}

export interface SiteSetting {
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  description: string;
  updatedAt: Date;
}
