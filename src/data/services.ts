// Данные услуг для конструктора пакета

export interface Service {
  id: string;
  category: string;
  name: string;
  price: string | number;
  priceDetails?: string;
  unit?: string;
  minQuantity?: number;
  maxQuantity?: number;
}

export const serviceCategories = [
  {
    id: 'venue',
    name: 'Аренда зала',
    icon: '🏢'
  },
  {
    id: 'animation',
    name: 'Анимация',
    icon: '🎭'
  },
  {
    id: 'entertainment',
    name: 'Развлечения',
    icon: '🎪'
  },
  {
    id: 'photo-video',
    name: 'Фото/Видео',
    icon: '📸'
  },
  {
    id: 'decoration',
    name: 'Оформление',
    icon: '🎨'
  },
  {
    id: 'catering',
    name: 'Кейтеринг',
    icon: '🍰'
  }
];

export const services: Service[] = [
  // Аренда зала
  {
    id: 'hall-0-weekday',
    category: 'venue',
    name: 'Зал 0+ (будни)',
    price: 2500,
    unit: 'руб/час',
    priceDetails: 'Первые 3 часа: 2500 руб/час. С 4-го часа: 2500 руб/час',
    minQuantity: 3,
    maxQuantity: 8
  },
  {
    id: 'hall-0-weekend',
    category: 'venue',
    name: 'Зал 0+ (выходные)',
    price: 3500,
    unit: 'руб/час',
    priceDetails: 'Первые 3 часа: 3500 руб/час. С 4-го часа: 3000 руб/час',
    minQuantity: 3,
    maxQuantity: 8
  },
  {
    id: 'hall-7-any',
    category: 'venue',
    name: 'Зал 7+ (любой день)',
    price: 2500,
    unit: 'руб/час',
    priceDetails: 'Первые 3 часа: 2500 руб/час. С 4-го часа: 2000 руб/час',
    minQuantity: 3,
    maxQuantity: 8
  },

  // Анимация
  {
    id: 'animator-standard',
    category: 'animation',
    name: 'Аниматор (стандарт)',
    price: 4500,
    unit: 'руб/50 мин',
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'animator-premium',
    category: 'animation',
    name: 'Аниматор (премиум костюм)',
    price: 5500,
    unit: 'руб/50 мин',
    priceDetails: 'Стандарт 4500 руб + премиум костюм 1000 руб',
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'mascot',
    category: 'animation',
    name: 'Ростовая кукла',
    price: 5500,
    unit: 'руб/30 мин',
    priceDetails: 'От 5500 руб за 30 минут',
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'aquagrim',
    category: 'animation',
    name: 'Аквагрим, блеск-тату',
    price: 2500,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 3
  },

  // Развлечения
  {
    id: 'bubble-immersion',
    category: 'entertainment',
    name: 'Погружение в мыльный пузырь',
    price: 2000,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'silver-disco',
    category: 'entertainment',
    name: 'Серебряная дискотека',
    price: 5500,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'cryo-show',
    category: 'entertainment',
    name: 'Крио-шоу с азотом',
    price: 9000,
    unit: 'руб/45 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'disco-effects',
    category: 'entertainment',
    name: 'Дискотека со спецэффектами',
    price: 500,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'themed-party',
    category: 'entertainment',
    name: 'Тематическая вечеринка',
    price: 6500,
    unit: 'руб/час',
    priceDetails: 'Пижамная, YouTube, Brawl Stars и т.п.',
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'quest',
    category: 'entertainment',
    name: 'Квест',
    price: 9500,
    unit: 'руб/час',
    priceDetails: 'Детективный, Форт Боярд, Джуманджи и т.п.',
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'bubble-show',
    category: 'entertainment',
    name: 'Шоу мыльных пузырей',
    price: 7500,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'magic-show',
    category: 'entertainment',
    name: 'Фокусная программа',
    price: 8500,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'circus-show',
    category: 'entertainment',
    name: 'Цирковое шоу',
    price: 11000,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'touch-show',
    category: 'entertainment',
    name: 'Шоу нащупай',
    price: 5500,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'foam-show',
    category: 'entertainment',
    name: 'Поролоновое шоу',
    price: 5500,
    unit: 'руб/45 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'masterclass',
    category: 'entertainment',
    name: 'Мастер-класс',
    price: 6000,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 2
  },

  // Фото/Видео
  {
    id: 'photographer',
    category: 'photo-video',
    name: 'Фотограф',
    price: 3500,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'videographer',
    category: 'photo-video',
    name: 'Видеограф',
    price: 6000,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 2
  },

  // Оформление
  {
    id: 'photozone',
    category: 'decoration',
    name: 'Оформление фотозоны',
    price: 4500,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'candy-bar',
    category: 'decoration',
    name: 'Декор кенди-бара (аренда)',
    price: 2500,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'balloons',
    category: 'decoration',
    name: 'Шары гелиевые',
    price: 160,
    unit: 'руб/шт',
    minQuantity: 1,
    maxQuantity: 100
  },

  // Кейтеринг
  {
    id: 'catering',
    category: 'catering',
    name: 'Фуршет (кейтеринг)',
    price: 5000,
    unit: 'руб',
    priceDetails: 'От 5000 руб',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'cake',
    category: 'catering',
    name: 'Торт',
    price: 3000,
    unit: 'руб/кг',
    minQuantity: 1,
    maxQuantity: 5
  },
  {
    id: 'cotton-candy',
    category: 'catering',
    name: 'Сахарная вата безлимит',
    price: 6000,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 3
  },
];
