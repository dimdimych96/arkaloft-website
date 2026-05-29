import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, RotateCw, Sparkles, Phone, Calendar, Grid, Gift, ChevronLeft, ChevronRight, Maximize2, Check, Plus, Minus, Users, Hourglass, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import leadService from '../lib/services/leadService';
import { getHallImages } from '../utils/hallImages';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  '🎈 Подобрать праздник под возраст',
  '🏢 Цены на аренду залов',
  '📦 Пакеты «всё включено»',
  '📞 Как забронировать?'
];

const SOCIAL_LINKS = [
  {
    id: 'wa',
    name: 'WhatsApp',
    url: 'https://wa.me/79830012520',
    color: 'bg-[#25D366]',
    hoverColor: 'hover:bg-[#20bd5a]',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12.01 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.41 1.26 4.86L2 22l5.3-1.39c1.4.76 3 1.19 4.7 1.19 5.52 0 10-4.48 10-10s-4.48-10-10-10zm.01 1.75c4.55 0 8.25 3.7 8.25 8.25s-3.7 8.25-8.25 8.25c-1.55 0-3-.43-4.25-1.18l-.3-.18-3.15.83.84-3.08-.2-.32c-.82-1.31-1.26-2.83-1.26-4.42.01-4.55 3.71-8.25 8.27-8.25zm-2.89 3.12c-.15 0-.39.06-.59.27-.2.21-.77.75-.77 1.83s.79 2.12.9 2.27c.11.15 1.52 2.32 3.7 3.26.52.22.92.36 1.24.46.52.16 1 .14 1.37.09.42-.06 1.28-.52 1.46-1.03.18-.51.18-.95.13-1.03-.06-.09-.2-.15-.42-.26-.22-.11-1.28-.63-1.48-.7-.2-.07-.34-.11-.49.11-.15.22-.59.75-.73.9-.13.15-.27.17-.49.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.29-1.22-1.51-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.03-.28-.02-.39-.06-.11-.49-1.18-.67-1.62-.18-.42-.36-.36-.49-.37l-.42-.01z"/>
      </svg>
    )
  },
  {
    id: 'tg',
    name: 'Telegram',
    url: 'https://t.me/+79830012520',
    color: 'bg-[#0088cc]',
    hoverColor: 'hover:bg-[#007ab8]',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.53-1.41.52-.46-.01-1.36-.26-2.02-.48-.82-.27-1.47-.41-1.42-.87.03-.24.36-.49.99-.75 3.89-1.69 6.48-2.8 7.78-3.33 3.69-1.5 4.46-1.76 4.96-1.77.11 0 .36.03.52.16.13.1.17.24.19.34.02.09.03.27.01.46z"/>
      </svg>
    )
  },
  {
    id: 'vk',
    name: 'VK',
    url: 'https://vk.com/im/convo/-139149900?t2fs=204ac90745b10d3e39_2',
    color: 'bg-[#0077FF]',
    hoverColor: 'hover:bg-[#006be6]',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
        <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.58.261-.58.522 0 .548.775.672 1.018 2.115.063.376.063 1.258.063 1.258v3.427c0 .548-.164.672-.435.672-.256 0-.58-.124-.954-.496-1.579-1.763-2.695-4.482-2.695-4.482-.14-.324-.395-.619-.953-.619H2.822c-.662 0-.802.341-.662.806 0 0 2.821 6.811 5.928 10.324 2.833 3.197 6.033 2.923 6.033 2.923h1.451c.465 0 .669-.139.669-.348v-2.317c0-.743.155-.883.675-.883.383 0 1.108.194 2.748 1.748.186.186.434.302.674.302h2.193c.662 0 .93-.341.751-.899 0 0-.635-1.565-1.302-2.285-.348-.387-.837-.806-.984-.999-.217-.279-.155-.403.155-.837 0 0 2.216-3.153 2.456-4.226z" />
      </svg>
    )
  },
  {
    id: 'max',
    name: 'MAX',
    url: 'https://max.ru/u/f9LHodD0cOIYcK23a0o_Efgdj1uOCimE6v8OEr8dA2se3LYlescl0tOCNJQ',
    color: 'bg-gradient-to-r from-purple-600 to-pink-600',
    hoverColor: 'hover:from-purple-700 hover:to-pink-700',
    icon: <span className="font-black text-xs">MAX</span>
  }
];

interface ChatGalleryProps {
  hallId: number;
}

const ChatGallery = ({ hallId }: ChatGalleryProps) => {
  const images = getHallImages(hallId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="w-full my-3 flex flex-col items-center">
      <div 
        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 group cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Фото зала ${hallId === 0 ? '0+' : '7+'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Навигационные стрелки */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          aria-label="Предыдущее фото"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          aria-label="Следующее фото"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Счетчик страниц */}
        <div className="absolute bottom-2 left-3 bg-black/60 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm select-none">
          <span>{currentIndex + 1} / {images.length}</span>
        </div>
        
        {/* Кнопка Zoom */}
        <div className="absolute bottom-2 right-3 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
          <Maximize2 className="w-3 h-3" />
        </div>
      </div>

      {/* Лайтбокс для просмотра в полный экран */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 bg-black/95 z-[99999] flex flex-col items-center justify-center select-none">
            {/* Кнопка закрытия */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
              aria-label="Закрыть"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Изображение в полный экран */}
            <div 
              className="relative max-w-full max-h-[85vh] px-4 flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Фото зала ${hallId === 0 ? '0+' : '7+'}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/5"
                />
              </AnimatePresence>

              {/* Навигация в лайтбоксе */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-6 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                aria-label="Предыдущее"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-6 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                aria-label="Следующее"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Описание под фото в лайтбоксе */}
            <div className="mt-4 text-white/90 text-xs sm:text-sm font-bold bg-white/10 px-5 py-2 rounded-full backdrop-blur-md">
              Зал {hallId === 0 ? '0+ (Big Loft)' : '7+ (Teen Loft)'} — Фото {currentIndex + 1} из {images.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ChatButtonProps {
  type: string;
  onClickClose: () => void;
}

const ChatButton = ({ type, onClickClose }: ChatButtonProps) => {
  const navigate = useNavigate();

  switch (type) {
    case 'call':
      return (
        <motion.a
          href="tel:+79830012520"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-secondary-yellow hover:bg-yellow-400 text-gray-900 text-xs font-black shadow-sm transition-colors m-0.5 border border-yellow-300/40"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          Позвонить
        </motion.a>
      );
    case 'book':
      return (
        <motion.button
          onClick={() => {
            onClickClose();
            navigate('/contact');
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black shadow-sm transition-colors m-0.5 border border-green-600/40 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          Забронировать
        </motion.button>
      );
    case 'whatsapp':
      return (
        <motion.a
          href="https://wa.me/79830012520"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black shadow-sm transition-colors m-0.5 border border-green-500/40"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.968 14.117.943 11.5.942 6.066.942 1.64 5.31 1.636 10.74c-.002 1.748.46 3.454 1.336 4.965l-.973 3.555 3.644-.956zm10.773-5.267c-.29-.145-1.713-.846-1.979-.942-.266-.096-.46-.145-.654.145-.194.29-.753.942-.922 1.135-.169.194-.339.217-.629.072-.29-.145-1.226-.452-2.336-1.444-.864-.771-1.447-1.724-1.616-2.014-.169-.29-.018-.447.127-.59.13-.13.29-.339.435-.508.145-.169.194-.29.29-.483.096-.194.048-.362-.024-.508-.072-.145-.654-1.572-.897-2.152-.236-.57-.478-.492-.654-.502-.169-.009-.363-.01-.557-.01-.194 0-.508.072-.774.362-.266.29-1.018.995-1.018 2.427 0 1.432 1.042 2.817 1.188 3.01.145.194 2.05 3.13 4.965 4.387.694.3 1.235.48 1.657.614.697.22 1.33.19 1.83.115.557-.083 1.713-.699 1.954-1.376.241-.676.241-1.256.169-1.376-.072-.12-.266-.194-.557-.339z" />
          </svg>
          WhatsApp
        </motion.a>
      );
    case 'telegram':
      return (
        <motion.a
          href="https://t.me/+79830012520"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#007ab8] text-white text-xs font-black shadow-sm transition-colors m-0.5 border border-blue-500/40"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.53-1.41.52-.46-.01-1.36-.26-2.02-.48-.82-.27-1.47-.41-1.42-.87.03-.24.36-.49.99-.75 3.89-1.69 6.48-2.8 7.78-3.33 3.69-1.5 4.46-1.76 4.96-1.77.11 0 .36.03.52.16.13.1.17.24.19.34.02.09.03.27.01.46z" />
          </svg>
          Telegram
        </motion.a>
      );
    case 'halls':
      return (
        <motion.button
          onClick={() => {
            onClickClose();
            navigate('/about');
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-secondary-mint/20 hover:bg-secondary-mint/40 text-teal-800 text-xs font-black shadow-sm transition-colors m-0.5 border border-teal-200/40 cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5" />
          Посмотреть залы
        </motion.button>
      );
    case 'packages':
      return (
        <motion.button
          onClick={() => {
            onClickClose();
            navigate('/projects');
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100/80 text-purple-700 text-xs font-black shadow-sm transition-colors m-0.5 border border-purple-200/40 cursor-pointer"
        >
          <Gift className="w-3.5 h-3.5" />
          Пакеты праздников
        </motion.button>
      );
    default:
      return null;
  }
};

const ConfettiEffect = () => {
  const particles = Array.from({ length: 45 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance - 80;
        const colors = ['#4CAF50', '#FFEB3B', '#2196F3', '#FF5722', '#E91E63', '#9C27B0', '#00E676'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 6 + 4;
        
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 180, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ 
              x: x, 
              y: y, 
              opacity: 0, 
              scale: 0.2,
              rotate: Math.random() * 720 
            }}
            transition={{ 
              duration: Math.random() * 1.2 + 0.8, 
              ease: [0.1, 0.8, 0.3, 1] 
            }}
            className="absolute bottom-1/4 left-1/2 rounded-xs"
            style={{
              width: size,
              height: size,
              backgroundColor: randomColor,
            }}
          />
        );
      })}
    </div>
  );
};

const SERVICE_CARDS_DATA: Record<string, {
  title: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
  type: 'package' | 'show' | 'quest';
  link: string;
}> = {
  'start': {
    title: 'Пакет «Старт»',
    price: 'от 10 000 ₽',
    duration: '2 часа',
    features: ['2 часа аренды лофта', 'Аниматор (50 мин)', 'Дискотека со спецэффектами (30 мин)'],
    image: '/images/halls/0/halls (1).jpg',
    type: 'package',
    link: '/projects'
  },
  'min': {
    title: 'Пакет «Минимальный»',
    price: 'от 15 000 ₽',
    duration: '3 часа',
    features: ['3 часа аренды лофта', 'Аниматор (1 час)', 'Дискотека со спецэффектами (30 мин)', 'Фотозона'],
    image: '/images/halls/0/halls (2).jpg',
    type: 'package',
    link: '/projects'
  },
  'std': {
    title: 'Пакет «Стандартный»',
    price: 'от 22 500 ₽',
    duration: '3 часа',
    features: ['3 часа аренды', 'Аниматор (1 час)', 'Аквагрим / блеск-тату (1 час)', 'Фотограф (1 час)', 'Дискотека + фотозона'],
    image: '/images/halls/0/halls (3).jpg',
    type: 'package',
    link: '/projects'
  },
  'hit': {
    title: 'Пакет «ХИТ»',
    price: 'от 21 500 ₽',
    duration: '3 часа',
    features: ['3 часа аренды', 'Аниматор (1 час)', 'Шоу мыльных пузырей + погружение', 'Серебряная/неоновая дискотека', 'Фотозона'],
    image: '/images/halls/0/halls (5).jpg',
    type: 'package',
    link: '/projects'
  },
  'vip': {
    title: 'Пакет «VIP»',
    price: '48 500 ₽',
    duration: '3 часа',
    features: ['3 часа аренды', 'Премиум-аниматор', 'Шоу на выбор', 'Фотограф и видеограф', 'Фотозона + пиньята'],
    image: '/images/halls/0/halls (10).jpg',
    type: 'package',
    link: '/projects'
  },
  'quest-fort': {
    title: 'Квест «Форт Боярд»',
    price: 'от 9 500 ₽',
    duration: '1 час',
    features: ['Реалистичный реквизит', 'Испытания на смелость', 'Сбор золотых монет', 'Рекомендуется для детей 7+ лет'],
    image: '/images/halls/7/halls7 (1).JPG',
    type: 'quest',
    link: '/services'
  },
  'show-cryo': {
    title: 'Крио-шоу с азотом',
    price: '9 000 ₽',
    duration: '45 мин',
    features: ['Эксперименты с жидким азотом', 'Супер-заморозка предметов', 'Приготовление мороженого', 'Топпинги для всех участников'],
    image: '/images/halls/7/halls7 (5).JPG',
    type: 'show',
    link: '/services'
  },
  'show-bubble': {
    title: 'Шоу мыльных пузырей',
    price: 'от 8 000 ₽',
    duration: '30 мин',
    features: ['Огненные и дымные пузыри', 'Шоу на световом столе', 'Погружение в пузырь-гигант', 'Фотосессия в пузыре'],
    image: '/images/halls/0/halls (15).jpg',
    type: 'show',
    link: '/services'
  },
  'show-touch': {
    title: 'Шоу «Нащупай»',
    price: 'от 5 500 ₽',
    duration: '1 час',
    features: ['Чудо-коробка с отверстиями', '1 ведущий + 1 ассистент', 'Разгадывание на ощупь предметов', 'Настоящие ящерицы и змейки'],
    image: '/images/halls/7/halls7 (10).JPG',
    type: 'show',
    link: '/services'
  }
};

interface ServiceCardProps {
  id: string;
  onSelect: (text: string) => void;
}

const ServiceCard = ({ id, onSelect }: ServiceCardProps) => {
  const card = SERVICE_CARDS_DATA[id];
  const [showFull, setShowFull] = useState(false);

  if (!card) return null;

  return (
    <div className="w-full my-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="relative h-32 w-full">
        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest opacity-80">
              {card.type === 'package' ? 'Готовый пакет' : card.type === 'quest' ? 'Тематический квест' : 'Шоу-программа'}
            </span>
            <h4 className="font-heading font-black text-sm leading-tight">{card.title}</h4>
          </div>
          <span className="bg-primary text-white text-xs px-2.5 py-0.5 rounded-full font-black shadow-sm">
            {card.price}
          </span>
        </div>
      </div>
      
      <div className="p-3.5 flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
          <Hourglass className="w-3.5 h-3.5" />
          <span>Длительность: {card.duration}</span>
        </div>

        <div className="space-y-1 my-1">
          {card.features.slice(0, showFull ? undefined : 3).map((f, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-600 font-medium">
              <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
          {card.features.length > 3 && (
            <button 
              onClick={() => setShowFull(!showFull)}
              className="text-[10px] font-black text-primary hover:underline cursor-pointer block mt-1"
            >
              {showFull ? 'Свернуть состав' : `Показать еще (+${card.features.length - 3})`}
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(`Расскажи подробнее про ${card.title}`)}
            className="flex-1 py-2 text-xs font-bold border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Подробнее
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(`Я хочу заказать ${card.title}!`)}
            className="flex-1 py-2 text-xs font-black bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors cursor-pointer shadow-sm"
          >
            Заказать
          </motion.button>
        </div>
      </div>
    </div>
  );
};

interface ChatQuizProps {
  onSelect: (text: string) => void;
}

const ChatQuiz = ({ onSelect }: ChatQuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    age?: string;
    guests?: string;
    focus?: string;
  }>({});

  const handleAnswer = (field: 'age' | 'guests' | 'focus', value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setStep(prev => prev + 1);
  };

  const getRecommendation = () => {
    const age = answers.age || '4-6';
    const focus = answers.focus || 'show';

    if (age === '1-3') {
      return {
        package: 'Минимальный',
        show: 'Шоу мыльных пузырей',
        text: 'Для малышей до 3 лет идеально подойдет уютная аренда Зала 0+, мягкий сухой бассейн и сказочное Шоу мыльных пузырей, чтобы не напугать деток.'
      };
    }
    if (age === '4-6') {
      return {
        package: 'Стандартный или ХИТ',
        show: 'Серебряная дискотека',
        text: 'Ребятам 4-6 лет нравится активное движение: аниматор с игровой программой, яркий аквагрим и море веселья в блестящей Серебряной дискотеке!'
      };
    }
    if (age === '7-10') {
      if (focus === 'games') {
        return {
          package: 'Квест + аренда',
          show: 'Квест «Форт Боярд»',
          text: 'Для возраста 7-10 лет идеальна программа квеста «Форт Боярд» с испытаниями на смелость, за которой отлично зайдет Крио-шоу с мороженым!'
        };
      }
      return {
        package: 'Пакет «ХИТ»',
        show: 'Шоу «Нащупай»',
        text: 'Отличный выбор — сбалансированный пакет «ХИТ» с квестом на выбор и необычным интерактивным шоу «Нащупай» с экзотическими животными.'
      };
    }
    // 11+
    return {
      package: 'Аренда Teen Loft (Зал 7+)',
      show: 'TikTok/YouTube вечеринка',
      text: 'Для подростков рекомендуем стильный Зал 7+ с консолью PS5, караоке и неоновым светом в паре с драйвовой TikTok-вечеринкой.'
    };
  };

  const rec = getRecommendation();

  return (
    <div className="w-full my-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col font-sans">
      <div className="flex items-center gap-2 pb-2.5 border-b border-gray-50 mb-3 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="font-heading font-black text-xs sm:text-sm">Подбор праздника за 3 вопроса</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center text-center gap-3 py-2"
          >
            <p className="text-xs text-gray-600 font-medium">Давайте ответим на 3 коротких вопроса, и я подберу лучшую программу для вашего ребенка!</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-black rounded-xl cursor-pointer shadow-sm"
            >
              Начать тест
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-2.5"
          >
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Шаг 1 из 3</span>
            <h5 className="text-xs font-black text-gray-800">Сколько лет имениннику?</h5>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '1-3 года 🧸', value: '1-3' },
                { label: '4-6 лет 🦖', value: '4-6' },
                { label: '7-10 лет 🎮', value: '7-10' },
                { label: '11+ лет ⚡', value: '11+' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer('age', opt.value)}
                  className="py-2.5 px-3 bg-gray-50 hover:bg-primary/5 hover:text-primary border border-gray-100 hover:border-primary/20 rounded-xl text-xs font-bold transition-all text-gray-700 text-left cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-2.5"
          >
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Шаг 2 из 3</span>
            <h5 className="text-xs font-black text-gray-800">Сколько планируется гостей?</h5>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'До 10 детей 👥', value: 'small' },
                { label: '10-20 детей 🎉', value: 'medium' },
                { label: '20-30 детей 🏰', value: 'large' },
                { label: 'Свыше 30 🚀', value: 'huge' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer('guests', opt.value)}
                  className="py-2.5 px-3 bg-gray-50 hover:bg-primary/5 hover:text-primary border border-gray-100 hover:border-primary/20 rounded-xl text-xs font-bold transition-all text-gray-700 text-left cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-2.5"
          >
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Шаг 3 из 3</span>
            <h5 className="text-xs font-black text-gray-800">Что больше нравится ребенку?</h5>
            <div className="flex flex-col gap-2">
              {[
                { label: '🏃‍♂️ Активные игры, квесты и испытания', value: 'games' },
                { label: '🎭 Красочные шоу и зажигательные танцы', value: 'show' },
                { label: '🍭 Спокойное творчество и мастер-классы', value: 'creative' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer('focus', opt.value)}
                  className="py-2.5 px-3 bg-gray-50 hover:bg-primary/5 hover:text-primary border border-gray-100 hover:border-primary/20 rounded-xl text-xs font-bold transition-all text-gray-700 text-left cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-3 py-1"
          >
            <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
              <span className="text-[9px] uppercase font-black tracking-widest text-primary">Рекомендация Аркаши</span>
              <h5 className="font-heading font-black text-sm text-gray-800 mt-1">{rec.package} + {rec.show}</h5>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed font-medium">{rec.text}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(0)}
                className="py-2.5 px-3 text-xs font-bold border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Заново
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(`Отправь подбор: возраст ${answers.age}, гостей ${answers.guests}, формат ${answers.focus}. Рекомендованный пакет: ${rec.package}.`)}
                className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-black rounded-xl cursor-pointer shadow-sm"
              >
                Отправить подбор менеджеру
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ChatTourProps {
  onSelect: (text: string) => void;
}

const ChatTour = ({ onSelect }: ChatTourProps) => {
  const [viewState, setViewState] = useState<'intro' | 'alert'>('intro');

  return (
    <div className="w-full my-3 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col font-sans">
      <div className="relative h-28 w-full">
        <img src="/images/halls/0/halls (6).jpg" alt="Виртуальный тур" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
          <Eye className="w-6 h-6 mb-1 text-secondary-yellow animate-pulse" />
          <h4 className="font-heading font-black text-sm tracking-wide">Виртуальный 3D-тур 360°</h4>
          <span className="text-[9px] uppercase font-bold text-white/80 tracking-widest mt-0.5">Осмотрите лофт не выходя из дома</span>
        </div>
      </div>

      <div className="p-3.5 flex flex-col gap-2.5">
        <AnimatePresence mode="wait">
          {viewState === 'intro' ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 py-1 text-center items-center"
            >
              <p className="text-xs text-gray-600 font-medium">Выберите зал для просмотра панорамного тура:</p>
              <div className="grid grid-cols-2 gap-2 w-full">
                <button
                  onClick={() => setViewState('alert')}
                  className="py-2 px-3 bg-gray-50 border border-gray-150 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer text-center"
                >
                  Панорама 0+
                </button>
                <button
                  onClick={() => setViewState('alert')}
                  className="py-2 px-3 bg-gray-50 border border-gray-150 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer text-center"
                >
                  Панорама 7+
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="alert"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-3 py-1 text-center items-center"
            >
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  3D-панорамы лофта временно подготавливаются к публикации. Вы можете прямо сейчас записаться на **живой просмотр лофта (экскурсию)** — наш менеджер покажет вам оба зала в удобное для вас время!
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setViewState('intro')}
                  className="py-2 px-3 border border-gray-250 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Назад
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelect("Я хочу записаться на живой просмотр лофта и приехать в гости!")}
                  className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-black rounded-xl shadow-sm cursor-pointer"
                >
                  Записаться на просмотр
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCreated, setLeadCreated] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [contextSuggestions, setContextSuggestions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const parseMessageContent = (text: string) => {
    const shortcodeRegex = /(\[gallery:[07]\]|\[button:[a-z]+\]|\[card:[a-z-]+\]|\[quiz:start\]|\[tour:show\])/g;
    const parts = text.split(shortcodeRegex);
    
    const elements: React.ReactNode[] = [];
    let currentButtons: string[] = [];

    const flushButtons = (key: string | number) => {
      if (currentButtons.length > 0) {
        elements.push(
          <div key={`btn-group-${key}`} className="flex flex-wrap gap-1.5 my-1 justify-start">
            {currentButtons.map((btnType, btnIdx) => (
              <ChatButton
                key={btnIdx}
                type={btnType}
                onClickClose={() => setIsOpen(false)}
              />
            ))}
          </div>
        );
        currentButtons = [];
      }
    };

    parts.forEach((part, index) => {
      if (part === '[gallery:0]') {
        flushButtons(index);
        elements.push(<ChatGallery key={index} hallId={0} />);
      } else if (part === '[gallery:7]') {
        flushButtons(index);
        elements.push(<ChatGallery key={index} hallId={1} />);
      } else if (part.startsWith('[button:')) {
        const btnType = part.slice(8, -1);
        currentButtons.push(btnType);
      } else if (part.startsWith('[card:')) {
        flushButtons(index);
        const cardId = part.slice(6, -1);
        elements.push(<ServiceCard key={index} id={cardId} onSelect={handleSend} />);
      } else if (part === '[quiz:start]') {
        flushButtons(index);
        elements.push(<ChatQuiz key={index} onSelect={handleSend} />);

      } else if (part === '[tour:show]') {
        flushButtons(index);
        elements.push(<ChatTour key={index} onSelect={handleSend} />);
      } else {
        if (part.trim()) {
          flushButtons(index);
          elements.push(
            <div
              key={index}
              className="p-3 rounded-2xl text-sm leading-relaxed shadow-sm bg-white text-gray-800 rounded-bl-none border border-gray-100/50 font-medium my-1 break-words prose prose-sm prose-green max-w-none"
            >
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      href={props.href || '#'}
                      onClick={(e) => {
                        if (props.href?.startsWith('/')) {
                          setIsOpen(false);
                        }
                      }}
                      className="text-primary hover:text-primary-hover underline underline-offset-2 font-bold decoration-primary/30 hover:decoration-primary transition-colors"
                    >
                      {props.children}
                    </a>
                  ),
                }}
              >
                {part.trim()}
              </ReactMarkdown>
            </div>
          );
        }
      }
    });

    flushButtons('final');

    return elements;
  };

  // Инициализация чата
  useEffect(() => {
    const savedMessages = localStorage.getItem('arkasha_chat_history');
    const savedLeadFlag = localStorage.getItem('arkasha_lead_created');
    const savedSuggestions = localStorage.getItem('arkasha_context_suggestions');
    
    if (savedLeadFlag === 'true') {
      setLeadCreated(true);
    }
    if (savedSuggestions) {
      setContextSuggestions(JSON.parse(savedSuggestions));
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Приветственное сообщение по умолчанию
      const welcomeMessage: Message = {
        role: 'assistant',
        text: 'Привет! 🎉 Я **Аркаша**, ваш виртуальный помощник в лофте Arkaloft. \n\nПомогу узнать цены, выбрать квест, шоу-программу или готовый праздничный пакет. \n\nЗадайте любой вопрос или выберите подсказку ниже! 👇',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Сохранение сообщений в localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('arkasha_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Сохранение умных подсказок в localStorage
  useEffect(() => {
    localStorage.setItem('arkasha_context_suggestions', JSON.stringify(contextSuggestions));
  }, [contextSuggestions]);

  // Автоматическая прокрутка к последнему сообщению при открытии чата
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Прокрутка при новых сообщениях
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Отправка сообщений
  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Проверка на наличие номера телефона для автоматического создания лида
    checkForLead(textToSend, [...messages, userMessage]);

    try {
      let chatUrl = '/api/chat';
      if (typeof window !== 'undefined' && window.location.port === '5173') {
        chatUrl = 'http://localhost:3000/api/chat';
      }

      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            text: msg.text
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка связи с сервером');
      }

      let rawReply = data.reply || 'Извините, не удалось сформировать ответ.';
      let suggestions: string[] = [];
      const suggestRegex = /\[suggest:([^\]]+)\]/;
      const match = rawReply.match(suggestRegex);
      if (match) {
        suggestions = match[1].split('|').map((s: string) => s.trim());
        rawReply = rawReply.replace(suggestRegex, '').trim();
      }
      setContextSuggestions(suggestions);

      const assistantMessage: Message = {
        role: 'assistant',
        text: rawReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Ошибка чата:', error);
      const errorMessage: Message = {
        role: 'assistant',
        text: 'Ой, что-то пошло не так при связи с сервером. 😢 Пожалуйста, попробуйте отправить сообщение еще раз или свяжитесь с нами напрямую по телефону **+7 (983) 001-25-20**!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Проверка сообщений на телефон и создание лида
  const checkForLead = async (text: string, currentMessages: Message[]) => {
    if (leadCreated) return;

    // Регулярное выражение для поиска российских мобильных номеров
    const phoneRegex = /(?:\+?7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/g;
    const match = text.match(phoneRegex);

    if (match && match.length > 0) {
      const phone = match[0];
      setLeadCreated(true);
      localStorage.setItem('arkasha_lead_created', 'true');

      // Собираем историю диалога для примечания к лиду
      const historyText = currentMessages
        .map(msg => `${msg.role === 'user' ? 'Клиент' : 'Аркаша'}: ${msg.text}`)
        .join('\n');

      // Ищем данные только в сообщениях клиента
      const userText = currentMessages
        .filter(msg => msg.role === 'user')
        .map(msg => msg.text)
        .join(' \n ');

      // Умный поиск имени
      let name = 'Клиент из чата';
      const nameMatch = userText.match(/(?:меня зовут|имя)\s+([А-Яа-яA-Za-z]{2,15})/i);
      if (nameMatch) {
        name = nameMatch[1];
      } else {
        // Ищем просто слова с большой буквы, исключая частые
        const stopWords = ['Зал', 'Завтра', 'Сегодня', 'Привет', 'Здравствуйте', 'Добрый', 'День', 'Подскажите', 'Спасибо', 'Да', 'Нет'];
        const words = userText.match(/\b([А-Я][а-я]{2,15})\b/g);
        if (words) {
          const validNames = words.filter(w => !stopWords.includes(w));
          if (validNames.length > 0) name = validNames[validNames.length - 1];
        } else {
          // Если клиент написал просто "дима" отдельным коротким сообщением
          const lastShortMessage = currentMessages.reverse().find(m => m.role === 'user' && m.text.length < 15 && !m.text.match(/\d/));
          if (lastShortMessage) {
            name = lastShortMessage.text.trim();
            name = name.charAt(0).toUpperCase() + name.slice(1);
          }
        }
      }

      // Поиск даты
      let date = '';
      const dateMatch = userText.match(/(завтра|сегодня|послезавтра|\d{1,2}[\.\/]\d{1,2})/i);
      if (dateMatch) date = dateMatch[0];

      // Поиск зала
      let hall = '';
      if (userText.match(/0\+?/i) || userText.match(/big/i)) hall = 'big-loft';
      else if (userText.match(/7\+?/i) || userText.match(/teen/i)) hall = 'teen-loft';

      // Поиск гостей
      let guests = '';
      const guestsMatch = userText.match(/(\d{1,2})\s*(гост|челов|дет|ребят)/i);
      if (guestsMatch) guests = guestsMatch[1];

      try {
        await leadService.createLead({
          name,
          phone,
          date,
          hall,
          guests,
          message: `Авто-заявка от AI-помощника Аркаши.\n\nИстория переписки:\n${historyText}`,
          source: 'ИИ-консультант'
        });
        console.log('Лид успешно создан из AI чата');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } catch (err) {
        console.error('Не удалось автоматически создать лид:', err);
      }
    }
  };

  // Сбросить диалог
  const handleReset = () => {
    if (window.confirm('Вы действительно хотите начать диалог заново? История переписки сотрется.')) {
      const welcomeMessage: Message = {
        role: 'assistant',
        text: 'Привет! 🎉 Я **Аркаша**, ваш виртуальный помощник в лофте Arkaloft. \n\nПомогу узнать цены, выбрать квест, шоу-программу или готовый праздничный пакет. \n\nЗадайте любой вопрос или выберите подсказку ниже! 👇',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
      setLeadCreated(false);
      setContextSuggestions([]);
      setShowConfetti(false);
      localStorage.removeItem('arkasha_chat_history');
      localStorage.removeItem('arkasha_lead_created');
      localStorage.removeItem('arkasha_context_suggestions');
    }
  };

  return (
    <>
      {/* Кнопка открытия виджета */}
      <div className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-40 font-sans">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-primary-hover text-white shadow-2xl flex items-center justify-center relative cursor-pointer group"
              style={{ boxShadow: '0 8px 30px rgba(76, 175, 80, 0.4)' }}
              aria-label="Открыть чат с AI-консультантом"
            >
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-200" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary-yellow text-[10px] text-orange-900 font-black items-center justify-center">AI</span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[100] flex items-center justify-center sm:block font-sans bg-black/20 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-4 sm:p-0">
            <div className="relative">
              {/* Всплывающие кнопки соцсетей на десктопе (слева от окна чата) */}
              <div className="hidden sm:flex absolute -left-16 bottom-4 flex-col gap-3.5 z-50">
                {SOCIAL_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    className="relative flex items-center justify-end"
                    initial={{ scale: 0, opacity: 0, x: 20 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: idx * 0.08, type: 'spring', stiffness: 260, damping: 20 }
                    }}
                    exit={{ scale: 0, opacity: 0, x: 20 }}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full ${link.color} ${link.hoverColor} text-white flex items-center justify-center shadow-lg transition-all active:scale-95`}
                      onMouseEnter={() => setHoveredSocial(link.id)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      title={link.name}
                    >
                      {link.icon}
                    </a>
                    
                    <AnimatePresence>
                      {hoveredSocial === link.id && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="absolute right-14 bg-gray-900/90 text-white text-xs py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap font-bold pointer-events-none border border-gray-800"
                        >
                          Написать в {link.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-[400px] h-[85dvh] sm:w-[380px] sm:h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
                style={{ boxShadow: '0 12px 50px rgba(0, 0, 0, 0.15)' }}
              >
                {/* Шапка чата */}
                <div className="bg-gradient-to-r from-primary to-primary-hover p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xl font-bold relative cursor-pointer"
                      animate={isLoading ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, -10, 10, -10, 10, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      } : {
                        scale: 1,
                        rotate: 0
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      🦖
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-primary"></span>
                      {showConfetti && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          {Array.from({ length: 12 }).map((_, idx) => {
                            const angle = (idx / 12) * Math.PI * 2;
                            const distance = 40;
                            const x = Math.cos(angle) * distance;
                            const y = Math.sin(angle) * distance;
                            const emojis = ['🎉', '✨', '🎈', '🍭', '⭐'];
                            const emoji = emojis[idx % emojis.length];
                            return (
                              <motion.span
                                key={idx}
                                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                animate={{ scale: [0, 1.2, 0.8, 0], x: x, y: y, opacity: [1, 1, 0] }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute text-xs"
                              >
                                {emoji}
                              </motion.span>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                    <div>
                      <h4 className="font-heading font-black text-base flex items-center gap-1.5 leading-tight">
                        Аркаша
                        <Sparkles className="w-3.5 h-3.5 text-secondary-yellow fill-secondary-yellow" />
                      </h4>
                      <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">AI-гид по праздникам</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleReset}
                      title="Начать заново"
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white/80 hover:text-white"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white/80 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Мессенджеры для мобильных устройств (под шапкой) */}
                <div className="sm:hidden bg-gray-50 border-b border-gray-100/50 py-2 px-4 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Связаться напрямую:</span>
                  <div className="flex gap-2.5">
                    {SOCIAL_LINKS.map(link => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-full ${link.color} ${link.hoverColor} text-white flex items-center justify-center shadow-md transition-all active:scale-95`}
                        title={link.name}
                      >
                        <div className="scale-75">
                          {link.icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Сообщения */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-off-white relative">
                  {showConfetti && <ConfettiEffect />}
                  {messages.map((msg, index) => {
                    const isAssistant = msg.role === 'assistant';
                    return (
                      <div
                        key={index}
                        className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} items-end gap-2`}
                      >
                        {isAssistant && (
                          <div className="w-8 h-8 rounded-full bg-secondary-mint text-base flex items-center justify-center shrink-0 border border-teal-200">
                            🦖
                          </div>
                        )}
                        {isAssistant ? (
                          <div className="max-w-[75%] space-y-1 flex flex-col">
                            {parseMessageContent(msg.text)}
                            <p className="text-[9px] text-gray-400 font-bold px-1 mt-0.5">
                              {msg.timestamp}
                            </p>
                          </div>
                        ) : (
                          <div className="max-w-[75%] space-y-1">
                            <div className="p-3 rounded-2xl text-sm leading-relaxed shadow-sm bg-primary text-white rounded-br-none font-medium break-words">
                              <p className="whitespace-pre-line">{msg.text}</p>
                            </div>
                            <p className="text-[9px] text-gray-400 font-bold px-1 text-right">
                              {msg.timestamp}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Индикатор набора ответа */}
                  {isLoading && (
                    <div className="flex justify-start items-end gap-2">
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-secondary-mint text-base flex items-center justify-center shrink-0 border border-teal-200"
                        animate={{
                          y: [0, -4, 0],
                          rotate: [0, -8, 8, 0],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🦖
                      </motion.div>
                      <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100/50 shadow-sm">
                        <div className="flex items-center gap-1.5 py-1 px-2">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Подсказки (быстрые вопросы) */}
                {!isLoading && (
                  <div className="px-4 py-2 bg-background-off-white border-t border-gray-100 overflow-x-auto flex gap-2 no-scrollbar">
                    {(contextSuggestions.length > 0 ? contextSuggestions : QUICK_SUGGESTIONS).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          const cleanText = QUICK_SUGGESTIONS.includes(suggestion)
                            ? suggestion.replace(/^[^\s]+\s+/, '')
                            : suggestion;
                          handleSend(cleanText);
                        }}
                        className="shrink-0 text-xs font-bold text-gray-600 bg-white hover:bg-primary/5 hover:text-primary hover:border-primary border border-gray-200 px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Ввод сообщения */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="p-3 border-t border-gray-100 bg-white flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Спросите меня о чем угодно..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm outline-none transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-gray-100 text-white disabled:text-gray-400 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
