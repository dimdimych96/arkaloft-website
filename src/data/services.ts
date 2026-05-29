// Данные услуг для конструктора пакета
import { PRICES } from './prices';

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
    price: PRICES.halls.kidsWeekday,
    unit: 'руб/час',
    priceDetails: `Первые 3 часа: ${PRICES.halls.kidsWeekday} руб/час. С 4-го часа: ${PRICES.halls.kidsWeekdayExtra} руб/час`,
    minQuantity: 3,
    maxQuantity: 8
  },
  {
    id: 'hall-0-weekend',
    category: 'venue',
    name: 'Зал 0+ (выходные)',
    price: PRICES.halls.kidsWeekend,
    unit: 'руб/час',
    priceDetails: `Первые 3 часа: ${PRICES.halls.kidsWeekend} руб/час. С 4-го часа: ${PRICES.halls.kidsWeekendExtra} руб/час`,
    minQuantity: 3,
    maxQuantity: 8
  },
  {
    id: 'hall-7-any',
    category: 'venue',
    name: 'Зал 7+ (любой день)',
    price: PRICES.halls.teens,
    unit: 'руб/час',
    priceDetails: `Первые 3 часа: ${PRICES.halls.teens} руб/час. С 4-го часа: ${PRICES.halls.teensExtra} руб/час`,
    minQuantity: 3,
    maxQuantity: 8
  },

  // Анимация
  {
    id: 'animator-standard',
    category: 'animation',
    name: 'Аниматор (стандарт)',
    price: PRICES.animators.standard,
    unit: 'руб/50 мин',
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'animator-premium',
    category: 'animation',
    name: 'Аниматор (премиум костюм)',
    price: PRICES.animators.premium,
    unit: 'руб/50 мин',
    priceDetails: `Стандарт ${PRICES.animators.standard} руб + премиум костюм ${PRICES.animators.premium - PRICES.animators.standard} руб`,
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'mascot',
    category: 'animation',
    name: 'Ростовая кукла',
    price: PRICES.animators.mascot,
    unit: 'руб/30 мин',
    priceDetails: `От ${PRICES.animators.mascot} руб за 30 минут`,
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'aquagrim',
    category: 'animation',
    name: 'Аквагрим, блеск-тату',
    price: PRICES.animators.facePaint,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 3
  },

  // Развлечения
  {
    id: 'bubble-immersion',
    category: 'entertainment',
    name: 'Погружение в мыльный пузырь',
    price: PRICES.shows.bubbleImmersion,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'silver-disco',
    category: 'entertainment',
    name: 'Серебряная дискотека',
    price: PRICES.shows.silver,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'cryo-show',
    category: 'entertainment',
    name: 'Крио-шоу с азотом',
    price: PRICES.shows.cryo,
    unit: 'руб/45 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'disco-effects',
    category: 'entertainment',
    name: 'Дискотека со спецэффектами',
    price: PRICES.shows.discoEffects,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'themed-party',
    category: 'entertainment',
    name: 'Тематическая вечеринка',
    price: PRICES.shows.themedParty,
    unit: 'руб/час',
    priceDetails: 'Пижамная, YouTube, Brawl Stars и т.п.',
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'quest',
    category: 'entertainment',
    name: 'Квест',
    price: PRICES.shows.quest,
    unit: 'руб/час',
    priceDetails: 'Детективный, Форт Боярд, Джуманджи и т.п.',
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    id: 'bubble-show',
    category: 'entertainment',
    name: 'Шоу мыльных пузырей',
    price: PRICES.shows.bubble,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'magic-show',
    category: 'entertainment',
    name: 'Фокусная программа',
    price: PRICES.shows.magician,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'circus-show',
    category: 'entertainment',
    name: 'Цирковое шоу',
    price: PRICES.shows.circus,
    unit: 'руб/30 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'touch-show',
    category: 'entertainment',
    name: 'Шоу нащупай',
    price: PRICES.shows.touch,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'foam-show',
    category: 'entertainment',
    name: 'Поролоновое шоу',
    price: PRICES.shows.foam,
    unit: 'руб/45 мин',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'masterclass',
    category: 'entertainment',
    name: 'Мастер-класс',
    price: PRICES.shows.masterclass,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 2
  },

  // Фото/Видео
  {
    id: 'photographer',
    category: 'photo-video',
    name: 'Фотограф',
    price: PRICES.photoVideo.photographer,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 3
  },
  {
    id: 'videographer',
    category: 'photo-video',
    name: 'Видеограф',
    price: PRICES.photoVideo.videographer,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 2
  },

  // Оформление
  {
    id: 'photozone',
    category: 'decoration',
    name: 'Оформление фотозоны',
    price: PRICES.decor.photozone,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'candy-bar',
    category: 'decoration',
    name: 'Декор кенди-бара (аренда)',
    price: PRICES.decor.candyBar,
    unit: 'руб',
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'balloons',
    category: 'decoration',
    name: 'Шары гелиевые',
    price: PRICES.decor.balloonClassic,
    unit: 'руб/шт',
    minQuantity: 1,
    maxQuantity: 100
  },

  // Кейтеринг
  {
    id: 'catering',
    category: 'catering',
    name: 'Фуршет (кейтеринг)',
    price: PRICES.catering.buffet,
    unit: 'руб',
    priceDetails: `От ${PRICES.catering.buffet} руб`,
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    id: 'cake',
    category: 'catering',
    name: 'Торт',
    price: PRICES.catering.cake,
    unit: 'руб/кг',
    minQuantity: 1,
    maxQuantity: 5
  },
  {
    id: 'cotton-candy',
    category: 'catering',
    name: 'Сахарная вата безлимит',
    price: PRICES.catering.cottonCandy,
    unit: 'руб/час',
    minQuantity: 1,
    maxQuantity: 3
  },
];
