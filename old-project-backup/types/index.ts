export interface ContentBlock {
  id: string
  type: 'hero' | 'text' | 'image' | 'gallery' | 'features' | 'pricing'
  title: string
  content: string
  imageUrl?: string
  images?: string[]
  order: number
  pageId: string
  seoTitle?: string
  seoDescription?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt?: string
  uploadedAt: Date
}

export interface Review {
  id: string
  authorName: string
  authorAvatar?: string
  rating: number
  content: string
  hallType: '0+' | '7+' | 'both'
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  customerName: string
  customerPhone?: string
  customerEmail?: string
  hallType: '0+' | '7+' | 'both'
  date: Date
  time: string
  duration: number
  guestCount: number
  packageType: string
  totalAmount: number
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
  // Новые поля для подбора аниматора
  childAge?: number
  favoriteHero?: string
  // WhatsApp интеграция
  whatsappSent?: boolean
  whatsappMessageId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Package {
  id: string
  name: string
  description: string
  price: number
  priceWeekend?: number | null
  duration: number
  includedItems: string[]
  HallType: '0+' | '7+' | 'both'
  isActive: boolean
  imageUrl?: string
  icon?: string
  popular?: boolean
  note?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Admin {
  id: string
  username: string
  email: string
  role: 'admin' | 'moderator'
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
}

// Новые типы для админ-панели

export interface Hall {
  id: string
  name: string
  ageGroup: string
  area: string
  description: string
  features: string[]
  images: string[]
  icon: string
  color: string
  price: string
  link: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Service {
  id: string
  name: string
  description: string
  price?: number | null
  icon: string
  color: string
  category: 'main' | 'additional'
  order: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface SiteSetting {
  key: string
  value: any
  type: 'string' | 'number' | 'boolean' | 'json'
  description: string
  updatedAt: Date
}