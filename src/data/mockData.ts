// Моковые данные для fallback когда Firestore недоступен
import type { Hall, Package, Service } from '../types';

export const mockHalls: Hall[] = [
  {
    id: '0-plus',
    name: 'Big Loft',
    ageGroup: '0+',
    area: '135 м²',
    description: 'Идеальное пространство для малышей и шумных компаний. Огромная игровая зона, где можно бегать, прыгать и веселиться без ограничений!',
    features: [
      'Большая горка',
      'Сухой бассейн',
      'Зона на 30 мест',
      'Музыка и свет',
      'Проектор',
      'Бесплатный Wi-Fi'
    ],
    images: [
      '/images/halls/0/1.jpg',
      '/images/halls/0/2.jpg',
      '/images/halls/0/3.jpeg',
    ],
    icon: 'child_friendly',
    color: 'emerald',
    price: '3500 ₽/час',
    link: '/about',
    isActive: true,
  },
  {
    id: '7-plus',
    name: 'Teen Loft',
    ageGroup: '7+',
    area: '75 м²',
    description: 'Стильное пространство для подростков. Игровые консоли, караоке, кинотеатр и атмосфера настоящего взрослого лофта!',
    features: [
      'PlayStation 5',
      '75" экран',
      'Караоке',
      'Кухня',
      'Мягкая мебель',
      'Неоновая подсветка'
    ],
    images: [
      '/images/halls/7/1.jpg',
      '/images/halls/7/2.jpg',
      '/images/halls/7/3.jpg',
    ],
    icon: 'videogame_asset',
    color: 'rose',
    price: '2500 ₽/час',
    link: '/about',
    isActive: true,
  },
];

export const mockPackages: Package[] = [
  {
    id: 'light',
    name: 'Лайт',
    description: 'Базовый старт',
    price: 9900,
    priceWeekend: 11900,
    duration: 3,
    includedItems: [
      'Аренда 3 часа',
      'Аниматор (1 час)',
      'Шары для настроения'
    ],
    hallType: 'both',
    isActive: true,
    imageUrl: '/images/packages/min.webp',
    icon: 'celebration',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Стандарт',
    description: 'Золотая середина',
    price: 18500,
    priceWeekend: 21000,
    duration: 4,
    includedItems: [
      'Аренда 4 часа',
      'Аниматор + Шоу',
      'Фотозона',
      'Красивая сервировка'
    ],
    hallType: 'both',
    isActive: true,
    imageUrl: '/images/packages/optimal.webp',
    icon: 'auto_awesome',
    popular: true,
  },
  {
    id: 'maxi',
    name: 'Макси',
    description: 'Полный отрыв',
    price: 29900,
    priceWeekend: 33000,
    duration: 5,
    includedItems: [
      'Аренда 5 часов',
      'Фотограф (2 часа)',
      'Кейтеринг + Декор'
    ],
    hallType: 'both',
    isActive: true,
    imageUrl: '/images/packages/premium.webp',
    icon: 'diamond',
    popular: false,
  },
];

export const mockServices: Service[] = [
  // Аниматоры
  {
    id: 'animator-fixiki',
    name: 'Фиксики',
    description: 'Любимые герои мультфильма',
    price: 3500,
    icon: 'face',
    color: 'orange',
    category: 'animator',
    order: 1,
    isActive: true,
    imageUrl: '/images/halls/0/4.jpg',
  },
  {
    id: 'animator-puppy',
    name: 'Щенячий патруль',
    description: 'Герои мультсериала',
    price: 3500,
    icon: 'face',
    color: 'orange',
    category: 'animator',
    order: 2,
    isActive: true,
    imageUrl: '/images/halls/0/5.jpg',
  },
  // Шоу-программы
  {
    id: 'show-silver',
    name: 'Серебряное шоу',
    description: 'Килограммы блестящей фольги',
    price: 5000,
    icon: 'celebration',
    color: 'purple',
    category: 'show',
    order: 1,
    isActive: true,
    imageUrl: '/images/halls/7/4.jpg',
  },
  {
    id: 'show-bubble',
    name: 'Мыльное шоу',
    description: 'Гигантские мыльные пузыри',
    price: 4500,
    icon: 'celebration',
    color: 'purple',
    category: 'show',
    order: 2,
    isActive: true,
  },
];
