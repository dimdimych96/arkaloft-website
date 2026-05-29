import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShowModal } from '../components/ShowModal';
import { showsData, ShowDetail } from '../data/showsData';
import { questsData, QuestDetail } from '../data/questsData';
import { QuestModal } from '../components/QuestModal';
import { servicesData } from '../data/siteData';
import { PRICES } from '../data/prices';
import { SEO } from '../components/SEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const rentCategory = servicesData.find(c => c.category === 'rent')!;
const animatorsCategory = servicesData.find(c => c.category === 'animators')!;
const decorCategory = servicesData.find(c => c.category === 'decor')!;
const cateringCategory = servicesData.find(c => c.category === 'catering')!;

const services = [
  {
    category: 'rent',
    icon: 'meeting_room',
    iconBg: 'bg-green-100',
    iconColor: 'text-primary',
    title: 'Аренда залов',
    subtitle: 'Выберите идеальное пространство для вашего праздника',
    items: rentCategory.items.map(item => ({
      name: item.name,
      description: item.description,
      price: item.price,
      details: item.name.includes('0+') 
        ? (item.name.includes('будни') ? `С 4-го часа: ${PRICES.halls.kidsWeekdayExtra.toLocaleString('ru-RU')} ₽/час` : `С 4-го часа: ${PRICES.halls.kidsWeekendExtra.toLocaleString('ru-RU')} ₽/час`)
        : `С 4-го часа: ${PRICES.halls.teensExtra.toLocaleString('ru-RU')} ₽/час`
    }))
  },
  {
    category: 'shows',
    icon: 'theater_comedy',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Шоу-программы',
    subtitle: 'Яркие эмоции, которые запомнятся навсегда',
    items: showsData.map(show => ({
      id: show.id,
      name: show.name,
      description: show.description.substring(0, 100) + '...',
      price: show.pricing[0].price,
      badge: show.badge,
      image: show.image,
    })),
  },
  {
    category: 'quests',
    icon: 'explore',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    title: 'Квесты',
    subtitle: 'Захватывающие игры-приключения для детей от 7 лет',
    items: questsData.map(quest => ({
      id: quest.id,
      name: quest.name,
      description: quest.description,
      price: quest.price,
      emoji: quest.emoji,
      image: quest.image,
    })),
  },
  {
    category: 'animators',
    icon: 'face',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Аниматоры',
    subtitle: 'Любимые герои сказок и мультфильмов',
    items: animatorsCategory.items.map(item => ({
      name: item.name,
      price: item.price,
      description: item.name.includes('стандарт') 
        ? 'Профессиональный аниматор в костюме'
        : item.name.includes('премиум')
          ? 'Премиум костюм +1000 ₽'
          : item.name.includes('Ростовая')
            ? 'Большая ростовая кукла'
            : 'Рисунки на лице и теле',
      emoji: item.name.includes('стандарт') 
        ? '🎭' 
        : item.name.includes('премиум') 
          ? '⭐' 
          : item.name.includes('Ростовая') 
            ? '🐻' 
            : '🎨'
    })),
    heroes: [
      { name: 'Трансформеры', emoji: '🤖' },
      { name: 'Уэнсдей', emoji: '🖤' },
      { name: 'Человек-паук', emoji: '🕷️' },
      { name: 'Леди Баг', emoji: '🐞' },
      { name: 'Фиксики', emoji: '🔧' },
      { name: 'Щенячий патруль', emoji: '🐕' },
      { name: 'Единорожки', emoji: '🦄' },
      { name: 'И многие другие', emoji: '✨' },
    ]
  },
  {
    category: 'photo-video',
    icon: 'photo_camera',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    title: 'Фотограф и видеограф',
    subtitle: 'Профессиональная съемка ярких моментов вашего праздника',
    items: [
      {
        name: 'Фотограф',
        description: 'Репортажная и постановочная съемка детского праздника, портреты гостей, цветокоррекция всех хороших кадров (от 70-100 фото за час).',
        price: `${PRICES.photoVideo.photographer.toLocaleString('ru-RU')} ₽ / час`
      },
      {
        name: 'Видеограф',
        description: 'Съемка видео на профессиональное оборудование. Изготовление динамичного клипа о празднике (Reels/Shorts формат или мини-фильм).',
        price: `${PRICES.photoVideo.videographer.toLocaleString('ru-RU')} ₽ / час`
      }
    ]
  },
  {
    category: 'decor',
    icon: 'palette',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    title: 'Оформление и декор',
    subtitle: 'Создадим праздничную атмосферу',
    items: decorCategory.items,
  },
  {
    category: 'catering',
    icon: 'cake',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    title: 'Кейтеринг',
    subtitle: 'Вкусные угощения для гостей',
    items: cateringCategory.items,
  },
];

export const Services = () => {
  const [selectedShow, setSelectedShow] = useState<ShowDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<QuestDetail | null>(null);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [isBalloonsExpanded, setIsBalloonsExpanded] = useState(false);

  const smoothScrollTo = (targetY: number, duration: number = 400) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Premium EaseOutCubic: starts fast, decelerates gently for a smooth landing
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startY + difference * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
    e.preventDefault();
    const element = document.getElementById(categoryId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      // Adjust header offset: h-16 (64px) on mobile, h-20 (80px) on desktop, plus custom margin
      const headerOffset = window.innerWidth < 768 ? 72 : 90;
      smoothScrollTo(Math.max(0, offsetTop - headerOffset), 450); // fast and snappy scroll
      
      // Update browser URL hash without page jump
      window.history.pushState(null, '', `#${categoryId}`);
    }
  };



  const handleShowClick = (showId: string) => {
    const show = showsData.find(s => s.id === showId);
    if (show) {
      setSelectedShow(show);
      setIsModalOpen(true);
    }
  };

  const handleQuestClick = (questId: string) => {
    const quest = questsData.find(q => q.id === questId);
    if (quest) {
      setSelectedQuest(quest);
      setIsQuestModalOpen(true);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Аренда Зала 0+ (Kids)",
          "description": "Игровое пространство 135 м² с деревянной горкой, сухим бассейном и банкетной зоной для праздников.",
          "offers": {
            "@type": "Offer",
            "price": PRICES.halls.kidsWeekend.toString(),
            "priceCurrency": "RUB",
            "description": "Аренда зала в час в выходные"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Аренда Зала 7+ (Teens)",
          "description": "Стильная лаунж-пространство 76 м² с PS5, караоке, проектором и светомузыкой.",
          "offers": {
            "@type": "Offer",
            "price": PRICES.halls.teens.toString(),
            "priceCurrency": "RUB",
            "description": "Аренда зала в час"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "Шоу мыльных пузырей",
          "description": "Интерактивное шоу мыльных пузырей на детский праздник.",
          "offers": {
            "@type": "Offer",
            "price": PRICES.shows.bubble.toString(),
            "priceCurrency": "RUB"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Product",
          "name": "Крио шоу с мороженым",
          "description": "Фантастическое научное шоу с азотом и приготовлением мороженого для ребят.",
          "offers": {
            "@type": "Offer",
            "price": PRICES.shows.cryo.toString(),
            "priceCurrency": "RUB"
          }
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white font-body text-text-main overflow-x-hidden">
      <SEO
        title="Услуги и цены - развлечения и аренда лофта"
        description="Полный список услуг лофт-пространства Арка Лофт в Новосибирске. Аренда залов, аниматоры на детский праздник, шоу-программы, квесты и кейтеринг."
        keywords="услуги лофта новосибирск, аниматоры новосибирск цены, крио шоу заказать, квесты для детей новосибирск"
        structuredData={structuredData}
      />
      <ShowModal
        show={selectedShow}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <QuestModal
        quest={selectedQuest}
        isOpen={isQuestModalOpen}
        onClose={() => setIsQuestModalOpen(false)}
      />
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary-mint/10 to-secondary-yellow/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-mint/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-secondary-yellow px-4 py-2 rounded-full mb-6 shadow-lg"
          >
            <span className="material-symbols-outlined text-orange-500 text-lg">auto_awesome</span>
            <span className="text-sm font-black text-orange-800 font-heading">Каталог развлечений</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-gray-900 font-heading mb-6 relative max-w-4xl mx-auto"
          >
            Все услуги для <br className="sm:hidden" />
            <span className="text-primary">идеального праздника</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Мы берем на себя все заботы: от подбора аниматора до украшения торта. Профессиональная организация событий в наших уютных лофтах.
          </motion.p>

          {/* Quick Navigation Panel */}
          <div className="px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-2 p-2 bg-gray-100/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 max-w-md mx-auto md:max-w-[760px] md:inline-flex md:flex-wrap md:justify-center md:gap-2.5 md:rounded-3xl md:p-2 md:bg-gray-150/40"
            >
              {services.map((service, idx) => {
                // Кастомные стили для каждой категории при наведении
                const categoryHoverStyles: Record<string, string> = {
                  rent: 'hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/40 hover:shadow-emerald-100',
                  shows: 'hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50/40 hover:shadow-purple-100',
                  quests: 'hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50/40 hover:shadow-rose-100',
                  animators: 'hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40 hover:shadow-orange-100',
                  'photo-video': 'hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/40 hover:shadow-teal-100',
                  decor: 'hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50/40 hover:shadow-pink-100',
                  catering: 'hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/40 hover:shadow-blue-100'
                };
                const hoverStyle = categoryHoverStyles[service.category] || 'hover:border-primary hover:text-primary hover:bg-primary/5';

                return (
                  <a
                    key={service.category}
                    href={`#${service.category}`}
                    onClick={(e) => handleNavClick(e, service.category)}
                    className={`flex items-center gap-2 px-3 py-2.5 sm:px-4.5 sm:py-3 rounded-xl md:rounded-full bg-white border border-gray-150/70 text-gray-700 font-bold shadow-sm hover:shadow transition-all active:scale-95 text-xs sm:text-sm w-full md:w-auto shrink-0 justify-center md:justify-start ${hoverStyle} ${idx === services.length - 1 ? 'col-span-2' : ''}`}
                  >
                    <span className={`material-symbols-outlined ${service.iconColor} text-lg shrink-0`}>{service.icon}</span>
                    <span className="truncate">{service.title}</span>
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((section, sectionIndex) => (
        <section
          key={section.category}
          id={section.category}
          className={`relative overflow-hidden ${
            sectionIndex % 2 === 0
              ? 'bg-white py-8 md:py-16'
              : 'bg-background-subtle pt-16 pb-8 md:py-16'
          }`}
        >
          {/* Wave top для нечетных секций */}
          {sectionIndex % 2 === 1 && (
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
              <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
              </svg>
            </div>
          )}

          <div className={`mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${
            section.category === 'rent'
              ? 'max-w-4xl'
              : section.category === 'photo-video'
                ? 'max-w-3xl'
                : section.category === 'animators'
                  ? 'max-w-5xl'
                  : section.category === 'catering'
                    ? 'max-w-4xl'
                    : section.category === 'quests'
                      ? 'max-w-6xl'
                      : 'max-w-7xl'
          }`}>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`size-12 sm:size-14 ${section.iconBg} rounded-2xl flex items-center justify-center ${section.iconColor}`}>
                  <span className="material-symbols-outlined text-2xl">{section.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 font-heading">{section.title}</h2>
                  {section.subtitle && (
                    <p className="text-sm text-gray-500 font-medium mt-1">{section.subtitle}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Section Content */}
            {section.category === 'shows' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
              >
                {section.items.map((item: any) => {
                  // Определяем эмодзи для каждого шоу
                  const showEmojis: Record<string, string> = {
                    'bubble-show': '🫧',
                    'tiktok-party': '📱',
                    'science-show': '🔬',
                    'silver-disco': '✨',
                    'cryo-show': '🍦',
                    'foam-show': '🧱',
                    'touch-show': '📦',
                    'transformers-show': '🤖',
                    'circus-show': '🎪',
                    'magician': '🎩'
                  };
                  const emoji = showEmojis[item.id] || '🎪';

                  return (
                    <motion.div
                      key={item.id || item.name}
                      variants={itemVariants}
                      onClick={() => item.id && handleShowClick(item.id)}
                      className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden cursor-pointer flex flex-col justify-between h-full"
                    >
                      <div>
                        {item.badge && (
                          <div className="absolute top-2 right-2 z-10 bg-secondary-yellow text-[10px] font-black px-2 py-1 rounded-full text-orange-900 uppercase shadow-lg">
                            {item.badge}
                          </div>
                        )}
                        <div className="relative rounded-xl overflow-hidden mb-3 aspect-square bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                          <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-500">{emoji}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-gray-800 font-heading mb-1 text-center">{item.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-600 mb-2 leading-relaxed line-clamp-2 text-center">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
                        <span className="text-primary font-black text-xs sm:text-sm">{item.price}</span>
                        <span className="text-[10px] sm:text-xs text-purple-600 font-bold flex items-center gap-0.5 group-hover:text-primary transition-colors shrink-0">
                          Подробнее
                          <span className="material-symbols-outlined text-xs sm:text-sm font-bold">arrow_forward</span>
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}


            {section.category === 'rent' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Mobile View: Compact List Layout */}
                <div className="md:hidden space-y-3">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-4 border-2 border-gray-100 shadow-sm flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                          <span className="material-symbols-outlined text-xl">meeting_room</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-gray-900 font-heading leading-tight">{item.name}</h3>
                          <p className="text-[10px] text-gray-500 mt-1 leading-normal">{item.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-primary font-black text-sm">{item.price}</div>
                        {item.details && (
                          <p className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">{item.details}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop View: Regular Cards Grid */}
                <div className="hidden md:grid md:grid-cols-2 gap-6">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary text-xl">meeting_room</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-black text-gray-900 font-heading mb-1">{item.name}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <div className="text-primary font-black text-xl mb-1">{item.price}</div>
                        {item.details && (
                          <p className="text-xs text-gray-500">{item.details}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA to About page */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-primary/5 to-secondary-mint/10 rounded-2xl p-4 sm:p-6 border-2 border-primary/20 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                    <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">photo_camera</span>
                    <h3 className="text-lg sm:text-xl font-black text-gray-900 font-heading">Хотите увидеть наши залы?</h3>
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm max-w-xl mx-auto">
                    Посмотрите фотографии залов, узнайте все особенности и выберите идеальное пространство для вашего праздника
                  </p>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-white rounded-xl font-black text-xs sm:text-sm hover:bg-primary-hover transition-all shadow-lg"
                  >
                    Смотреть фото залов
                    <span className="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {section.category === 'animators' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Services Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all text-center"
                    >
                      <div className="text-5xl mb-3">{item.emoji}</div>
                      <h3 className="text-sm sm:text-base font-black text-gray-800 font-heading mb-2">{item.name}</h3>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                      <div className="text-primary font-black text-sm">{item.price}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Heroes List */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-100"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-orange-500 text-2xl">stars</span>
                    <h3 className="text-xl font-black text-gray-900 font-heading">Популярные герои:</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {section.heroes?.map((hero: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all text-center"
                      >
                        <div className="text-3xl mb-2">{hero.emoji}</div>
                        <span className="text-xs sm:text-sm font-bold text-gray-700">{hero.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-4 text-center">
                    💬 Не нашли нужного героя? Напишите нам — мы подберем костюм специально для вас!
                  </p>
                </motion.div>
              </motion.div>
            )}

            {section.category === 'entertainment' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
              >
                {section.items.map((item: any) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all"
                  >
                    <div className={`size-12 sm:size-14 ${section.iconBg} rounded-2xl flex items-center justify-center mb-3 mx-auto`}>
                      <span className={`material-symbols-outlined text-xl sm:text-2xl ${section.iconColor}`}>celebration</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-gray-800 font-heading mb-2 text-center leading-tight">{item.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2 leading-relaxed text-center line-clamp-2">{item.description}</p>
                    <div className="text-primary font-black text-xs text-center">{item.price}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {section.category === 'photo-video' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
              >
                {section.items.map((item: any) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="bg-gradient-to-br from-white to-teal-50/15 rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-t-4 border-gray-150/70 border-t-teal-500 hover:shadow-xl hover:border-teal-200 hover:border-t-teal-500 transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-4 border-b border-gray-100 pb-4">
                        <div className={`size-12 rounded-xl ${section.iconBg} flex items-center justify-center shrink-0`}>
                          <span className={`material-symbols-outlined text-2xl ${section.iconColor}`}>
                            {item.name === 'Фотограф' ? 'photo_camera' : 'videocam'}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-gray-900 font-heading leading-tight">{item.name}</h3>
                          <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Профессионально</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium mb-6">{item.description}</p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Стоимость:</span>
                        <span className="text-primary font-black text-base sm:text-lg font-heading">{item.price}</span>
                      </div>
                      <Link
                        to={`/contact?service=${item.name === 'Фотограф' ? 'photographer' : 'videographer'}`}
                        className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm text-center block shadow-md hover:shadow-lg active:scale-95 transition-all touch-target"
                      >
                        Заказать съемку
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {section.category === 'quests' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Intro Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 sm:p-6 border-2 border-rose-100 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-gray-900 font-heading mb-2 flex items-center gap-2">
                      <span className="text-2xl">🧩</span> Квесты для детей в лофте
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                      Не знаете, чем удивить подрастающего ребёнка? И обычного аниматора уже не хочется заказывать? Для вас есть решение! Квесты для детей от 7 лет — это развлекательная игра для команды из нескольких человек в заранее подготовленном помещении. У каждого квеста свои правила и свои задачи: где-то нужно собрать ключи, разгадать загадки, а где-то пройти испытания на смелость и найти выход.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-white/70 backdrop-blur-sm rounded-xl border border-rose-200/50 p-2.5 text-center">
                    <div className="flex flex-col items-center justify-center border-r border-rose-100">
                      <span className="material-symbols-outlined text-rose-500 text-lg sm:text-xl mb-0.5">schedule</span>
                      <span className="text-[9px] sm:text-xs text-gray-500 font-medium">Время</span>
                      <span className="text-[10px] sm:text-sm font-black text-gray-800">1 час</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-r border-rose-100">
                      <span className="material-symbols-outlined text-rose-500 text-lg sm:text-xl mb-0.5">payments</span>
                      <span className="text-[9px] sm:text-xs text-gray-500 font-medium">Цена</span>
                       <span className="text-[10px] sm:text-sm font-black text-gray-800">от {Math.min(...Object.values(PRICES.quests)).toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-rose-500 text-lg sm:text-xl mb-0.5">checkroom</span>
                      <span className="text-[9px] sm:text-xs text-gray-500 font-medium">Дресс-код</span>
                      <span className="text-[10px] sm:text-sm font-black text-gray-800">Приветствуется</span>
                    </div>
                  </div>
                </motion.div>

                {/* Quests Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      onClick={() => handleQuestClick(item.id)}
                      className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-rose-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer flex flex-col h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[360px]"
                    >
                      <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] sm:text-xs font-black shadow-sm text-gray-800 flex items-center gap-1">
                          <span>{item.emoji}</span>
                          <span>Квест</span>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-gray-900 font-heading mb-1.5 group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-primary font-black text-sm sm:text-base">{item.price}</span>
                          <span className="text-[10px] sm:text-xs text-rose-600 font-bold flex items-center gap-0.5 group-hover:text-primary transition-colors shrink-0">
                            Подробнее
                            <span className="material-symbols-outlined text-xs sm:text-sm font-bold">arrow_forward</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section.category === 'decor' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Photozones & Candy Bar Cards - Side-by-Side on Mobile, Grid on Desktop */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4">
                  {section.items.slice(0, 2).map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-3.5 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all flex flex-col justify-between relative overflow-hidden h-full"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <div className="size-10 sm:size-12 bg-pink-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 text-pink-500">
                          <span className="material-symbols-outlined text-xl sm:text-2xl">
                            {item.name === 'Фотозона' ? 'photo_camera' : 'cake'}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-lg md:text-xl font-black text-gray-900 font-heading mb-1">{item.name}</h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-3 leading-relaxed line-clamp-2 md:line-clamp-none">{item.description}</p>
                      </div>
                      <div className="border-t border-gray-100 pt-2.5 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center relative">
                        <span className="text-[9px] sm:text-xs text-gray-400 font-bold">Оформление</span>
                        <span className="text-primary font-black text-sm sm:text-lg md:text-xl mt-0.5 sm:mt-0">{item.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Helium Balloons Pricing Panel */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-pink-50/50 via-white to-pink-50/20 rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-pink-100 shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500 shrink-0">
                        <span className="text-xl sm:text-2xl">🎈</span>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-xl font-black text-gray-900 font-heading">Оформление гелиевыми шарами</h3>
                        <p className="text-[10px] sm:text-sm text-gray-500">Подробный прайс на качественные воздушные шары с обработкой</p>
                      </div>
                    </div>
                  </div>

                  {/* Toggle button on mobile, hidden on desktop */}
                  <div className="md:hidden">
                    <button
                      onClick={() => setIsBalloonsExpanded(!isBalloonsExpanded)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-pink-100/50 hover:bg-pink-100 text-pink-700 font-black text-xs transition-all active:scale-95 border border-pink-100"
                    >
                      <span>{isBalloonsExpanded ? 'Скрыть подробный прайс-лист' : 'Показать подробный прайс-лист'}</span>
                      <span className="material-symbols-outlined text-base">
                        {isBalloonsExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>

                  {/* Pricing grid - collapsible on mobile, always grid on desktop */}
                  <div className={`${isBalloonsExpanded ? 'grid' : 'hidden'} md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 md:mt-0`}>
                    {/* Category 1: Classic */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-pink-100/50 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-gray-900 mb-3 flex items-center gap-1.5 font-heading">
                          <span className="text-lg">🎈</span> Классические шары
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">Шар с обработкой (1 шт.)</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonClassic.toLocaleString('ru-RU')} ₽</span>
                          </li>
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">С рисунком / надписью</span>
                            <span className="font-bold text-gray-800">+50 ₽</span>
                          </li>
                          <li className="flex justify-between py-1.5">
                            <span className="text-gray-600">Перламутр (с обработкой)</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonPearl.toLocaleString('ru-RU')} ₽</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Category 2: Decorative */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-pink-100/50 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-gray-900 mb-3 flex items-center gap-1.5 font-heading">
                          <span className="text-lg">✨</span> Декоративные шары
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">Хром / С конфетти</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonChrome.toLocaleString('ru-RU')} ₽/шт</span>
                          </li>
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">Агат с обработкой</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonAgate.toLocaleString('ru-RU')} ₽/шт</span>
                          </li>
                          <li className="flex justify-between py-1.5">
                            <span className="text-gray-600">Кристалл (шар в шаре)</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonCrystal.toLocaleString('ru-RU')} ₽/шт</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Category 3: Foil & Giants */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-pink-100/50 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-gray-900 mb-3 flex items-center gap-1.5 font-heading">
                          <span className="text-lg">⭐️</span> Фольгированные и фигуры
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">Звезда / Сердце фольга</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonFoilStar.toLocaleString('ru-RU')} ₽/шт</span>
                          </li>
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">Фольгированный с рисунком</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonFoilPattern.toLocaleString('ru-RU')} ₽/шт</span>
                          </li>
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">Фигурный фольгированный</span>
                            <span className="font-bold text-gray-800">от {PRICES.decor.balloonFoilFigure.toLocaleString('ru-RU')} ₽/шт</span>
                          </li>
                          <li className="flex justify-between py-1.5 border-b border-gray-50">
                            <span className="text-gray-600">Цифра фольгированная</span>
                            <span className="font-bold text-gray-800">{PRICES.decor.balloonNumber.toLocaleString('ru-RU')} ₽</span>
                          </li>
                          <li className="flex justify-between py-1.5">
                            <span className="text-gray-600">Шар-гигант</span>
                            <span className="font-bold text-gray-800">от {PRICES.decor.balloonGiant.toLocaleString('ru-RU')} ₽ <span className="text-[10px] text-gray-400 font-normal">(на тассел +300₽)</span></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decor Photos Gallery Grid */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 shadow-md"
                >
                  <h4 className="text-base sm:text-lg font-black text-gray-900 mb-4 font-heading flex items-center gap-2">
                    <span className="material-symbols-outlined text-pink-500">photo_library</span>
                    Примеры наших оформлений:
                  </h4>
                  
                  {/* Horizontal Scroll on Mobile, Grid on Desktop */}
                  <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scrollbar-none px-1 -mx-1 snap-x snap-mandatory flex-nowrap md:flex-wrap">
                    {[
                      '/images/show/service/Pasted image 20260524125513.png',
                      '/images/show/service/Pasted image 20260524125516.png',
                      '/images/show/service/Pasted image 20260524125520.png',
                      '/images/show/service/Pasted image 20260524125524.png',
                      '/images/show/service/Pasted image 20260524125531.png',
                      '/images/show/service/Pasted image 20260524125536.png',
                      '/images/show/service/Pasted image 20260524125540.png',
                      '/images/show/service/Pasted image 20260524125545.png'
                    ].map((imgUrl, i) => (
                      <div 
                        key={i} 
                        className="w-44 h-44 md:w-full md:h-48 shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100 snap-center hover:scale-[1.02] transition-transform duration-300"
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Оформление ${i + 1}`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {section.category === 'catering' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {/* Mobile View: Compact List Layout */}
                <div className="md:hidden space-y-3">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-4 border-2 border-gray-100 shadow-sm flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${section.iconBg} rounded-xl flex items-center justify-center shrink-0 ${section.iconColor}`}>
                          <span className="material-symbols-outlined text-xl">celebration</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-gray-900 font-heading leading-tight">{item.name}</h3>
                          <p className="text-[10px] text-gray-500 mt-1 leading-normal">{item.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-primary font-black text-sm">{item.price}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop View: Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className={`size-12 sm:size-14 ${section.iconBg} rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto`}>
                          <span className={`material-symbols-outlined text-xl sm:text-2xl ${section.iconColor}`}>celebration</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-gray-800 font-heading mb-2 text-center">{item.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-600 mb-3 leading-relaxed text-center line-clamp-2">{item.description}</p>
                      </div>
                      <div className="text-primary font-black text-xs sm:text-sm text-center pt-2 border-t border-gray-150">{item.price}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Wave bottom для нечетных секций */}
          {sectionIndex % 2 === 1 && (
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
              <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
              </svg>
            </div>
          )}
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-primary-hover to-primary relative overflow-hidden">
        {/* Wave top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-heading leading-tight">
              Нужна помощь с выбором?
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Наши менеджеры помогут подобрать идеальные услуги для вашего праздника
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-full font-bold text-base sm:text-lg hover:bg-secondary-yellow hover:scale-105 transition-all shadow-2xl"
            >
              Получить консультацию
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" className="fill-white"></path>
          </svg>
        </div>
      </section>
    </main>
  );
};
