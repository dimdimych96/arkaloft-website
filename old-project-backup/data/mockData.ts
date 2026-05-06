import { ContentBlock, Review, Package, Booking } from '../types'

export const mockContentBlocks: ContentBlock[] = [
  {
    id: '1',
    type: 'hero',
    title: 'Эко-лофт "Арка" - пространство для семейного счастья',
    content: 'Современное экологичное пространство в Дзержинском районе Новосибирска для детских праздников и семейных мероприятий. Два зала для разных возрастов: 0+ (135 кв.м.) и 7+ (75 кв.м.) с раздельными зонами.',
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1600',
    order: 1,
    pageId: 'home',
    seoTitle: 'Эко-лофт Арка Новосибирск | Аренда залов для детских праздников',
    seoDescription: 'Эко-лофт Арка в Дзержинском районе Новосибирска - идеальное место для детских дней рождения и семейных праздников. Два зала: 0+ (135 кв.м.) и 7+ (75 кв.м.) с игровой, кухонной и банкетной зонами.',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    type: 'features',
    title: 'Наши преимущества',
    content: 'Безопасность, экологичность, профессиональная анимация',
    order: 2,
    pageId: 'home',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
]

export const mockReviews: Review[] = [
  {
    id: '1',
    authorName: 'Анна Петрова',
    authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    content: 'Отличное место для детского праздника! Сын и его друзья были в восторге. Очень чисто, безопасно и красиво. Аниматоры профессиональные, дети не скучали ни минуты.',
    hallType: '7+',
    isApproved: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    authorName: 'Мария Сидорова',
    authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    content: 'Праздновали первый день рождения дочки в зале 0+. Всё продумано до мелочей - мягкие игрушки, безопасные материалы, удобные зоны для родителей. Рекомендую!',
    hallType: '0+',
    isApproved: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
]

export const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Базовый',
    description: 'Аренда зала на 2 часа с базовым декором',
    price: 5000,
    duration: 2,
    includedItems: ['Аренда зала', 'Базовый декор', 'Посуда', 'Уборка'],
    hallType: 'both',
    isActive: true,
    imageUrl: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Премиум',
    description: 'Полный пакет с анимацией и фотосессией',
    price: 8000,
    duration: 3,
    includedItems: ['Аренда зала', 'Праздничный декор', 'Аниматор 2 часа', 'Фотосессия', 'Посуда', 'Уборка'],
    hallType: 'both',
    isActive: true,
    imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
]

export const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'Елена Иванова',
    customerPhone: '+7 (913) 123-45-67',
    customerEmail: 'elena@example.com',
    hallType: '7+',
    date: new Date('2024-02-15'),
    time: '14:00',
    duration: 3,
    guestCount: 12,
    packageType: 'Премиум',
    totalAmount: 8000,
    status: 'confirmed',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-21')
  }
]