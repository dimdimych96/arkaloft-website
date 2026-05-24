import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { ReviewsSection } from '../components/ReviewsSection';
import { Footer } from '../components/Footer';
import { reviews, partyFormats, features, packages, hallsData } from '../data/siteData';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          aria-label="Прокрутить наверх"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-primary text-white shadow-2xl hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center group"
        >
          <span className="material-symbols-outlined text-2xl group-hover:-translate-y-1 transition-transform">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Data moved to siteData.ts

export const Home = () => {
  const [activeHall, setActiveHall] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const currentHall = hallsData[activeHall];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arkaloft (Арка Лофт)",
    "image": "https://arkaloft.ru/images/hero/main.jpg",
    "@id": "https://arkaloft.ru",
    "url": "https://arkaloft.ru",
    "telephone": "+79830012520",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "пр. Дзержинского, 18",
      "addressLocality": "Новосибирск",
      "postalCode": "630000",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.0456,
      "longitude": 82.9523
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://vk.com/arka_loft",
      "https://t.me/arkaloft_bot"
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="min-h-screen bg-background-off-white font-body text-text-main overflow-x-hidden">
      <SEO 
        title="Arkaloft - Лофт для ярких праздников в Новосибирске"
        description="Аренда лофта для детских дней рождения, вечеринок и мероприятий в Новосибирске. Залы 0+ и 7+, организация под ключ, свои еда и напитки."
        keywords="лофт новосибирск, аренда лофта, детский день рождения, площадка для праздника, лофт для вечеринки"
        ogImage="/images/hero/main.jpg"
        structuredData={structuredData}
      />
      {/* Hero Section - Universal Appeal */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-24 overflow-hidden bg-[#FAFAFA]">
        {/* Декоративные мягкие фоны для глубины */}
        <div className="absolute top-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-primary/5 rounded-full blur-[80px] sm:blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[150px] sm:w-[250px] h-[150px] sm:h-[250px] bg-secondary-mint/10 rounded-full blur-[60px] sm:blur-[80px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Левая колонка: Контент */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1 text-center lg:text-left mt-6 lg:mt-0"
            >
              {/* Хедлайнер-лейбл */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-4 sm:mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" aria-hidden="true"></span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-gray-500">Эстетика вашего праздника</span>
              </motion.div>

              {/* Главный заголовок - оптимизирован для мобильных */}
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] font-[900] text-gray-900 leading-[1.05] sm:leading-[0.95] mb-4 sm:mb-6 tracking-tight">
                ЛОФТ ДЛЯ <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary-mint">
                  ЯРКИХ
                </span> <br className="hidden sm:block" />
                СОБЫТИЙ
              </motion.h1>

              {/* Описание с акцентом на универсальность */}
              <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Пространство-трансформер в Новосибирске. <br className="hidden sm:block" />
                От уютных детских дней рождения до стильных вечеринок и камерных свадеб.
              </motion.p>

              {/* Кнопки действия (оптимизированы под мобайл) */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-10">
                <Link
                  to="/projects"
                  className="w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-10 rounded-2xl bg-primary text-white font-black text-base sm:text-lg hover:shadow-[0_10px_25px_-5px_rgba(76,175,80,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 touch-target group"
                >
                  <span className="material-symbols-outlined text-base sm:text-xl group-hover:rotate-12 transition-transform" aria-hidden="true">celebration</span>
                  События
                </Link>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Link
                    to="/about"
                    className="flex-1 sm:flex-none h-14 sm:h-16 px-4 sm:px-8 rounded-2xl bg-white border-2 border-gray-100 text-gray-700 font-bold text-sm sm:text-base hover:border-primary/30 transition-all flex items-center justify-center touch-target"
                  >
                    Залы
                  </Link>
                  <a
                    href="tel:+79830012520"
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-secondary-yellow text-gray-900 font-bold hover:shadow-lg transition-all flex items-center justify-center touch-target active:scale-95"
                    aria-label="Позвонить нам"
                  >
                    <span className="material-symbols-outlined text-xl sm:text-2xl">call</span>
                  </a>
                </div>
              </motion.div>

              {/* Статистика (в ряд на мобильных) */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 sm:gap-4 py-4 sm:py-6 border-y border-gray-100 mb-6 sm:mb-10 bg-white/40 backdrop-blur-md rounded-2xl px-4">
                {[
                  { label: 'событий', val: '500+' },
                  { label: 'рейтинг', val: '5.0' },
                  { label: 'зала', val: '2' },
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{stat.val}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Теги категорий */}
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-2">
                {['Дни рождения', 'Вечеринки', 'Фотосессии', 'Корпоративы'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[11px] font-bold text-gray-500 shadow-sm">
                    #{tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Правая колонка: Визуальный коллаж - упрощён для мобильных */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-2 relative px-2 sm:px-0 mb-6 lg:mb-0"
            >
              <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                {/* Левый стек фото - скрыт на очень маленьких экранах, показываем только главное фото */}
                <div className="col-span-5 space-y-2 sm:space-y-3 hidden sm:block">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: -3 }}
                    className="rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl rotate-[-2deg] aspect-[3/4]"
                  >
                    <img
                      alt="Стильный интерьер лофта"
                      className="w-full h-full object-cover"
                      src="/images/halls/7/1.jpg"
                      loading="lazy"
                    />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: 4 }}
                    className="rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-lg rotate-[3deg] aspect-square"
                  >
                    <img
                      alt="Уютная детская игровая зона"
                      className="w-full h-full object-cover"
                      src="/images/halls/0/2.jpg"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                {/* Правое большое фото - на мобильных на всю ширину */}
                <div className="col-span-12 sm:col-span-7">
                  <div className="rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl rotate-[1deg] sm:rotate-0 aspect-[4/3] sm:aspect-[4/5] border-4 sm:border-8 border-white">
                    <img
                      alt="Главный зал Арка Лофт для мероприятий"
                      className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                      src="/images/hero/main.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Плашка цены (парит над фото) - компактная на мобильных */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-white p-3 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-3 sm:gap-4 border border-gray-50 min-w-[180px] sm:min-w-[200px]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary-mint/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined font-bold text-base sm:text-lg" aria-hidden="true">payments</span>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Аренда от</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-[900] text-gray-900">1500 ₽<span className="text-xs sm:text-sm font-medium text-gray-400">/час</span></p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Party Formats Section */}
      <section className="py-12 sm:py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-primary font-black tracking-widest uppercase text-xs sm:text-sm mb-2 block font-heading">Форматы</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading">Что будем праздновать?</h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 justify-items-center"
          >
            {partyFormats.map((format) => (
              <motion.div key={format.name} variants={itemVariants} className="w-full">
                <Link to="/contact" className="group flex flex-col items-center gap-3 sm:gap-4 w-full">
                  <div className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-4 ${format.border} p-1 bg-white shadow-lg group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}>
                    <img alt={format.name} className="w-full h-full object-cover rounded-full" src={format.image} loading="lazy" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors rounded-full" aria-hidden="true"></div>
                  </div>
                  <h3 className="text-center font-bold text-xs sm:text-sm text-gray-800 group-hover:text-primary transition-colors line-clamp-2">{format.name}</h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-background-subtle border-y-2 border-dashed border-secondary-mint/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex justify-between items-end">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-black text-gray-800 font-heading"
          >
            Почему мы крутые?
          </motion.h2>
          <div className="md:hidden flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-primary/10" aria-hidden="true">
            <span className="material-symbols-outlined text-xs animate-bounce-x">arrow_forward</span>
            Листайте
          </div>
          <span className="hidden md:flex text-xs sm:text-sm font-bold text-primary items-center gap-1" aria-hidden="true">
            Листай <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
          </span>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 px-3 sm:px-6 lg:px-8 no-scrollbar snap-x"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="snap-center shrink-0 w-64 sm:w-72 bg-white p-4 sm:p-6 rounded-[2rem] shadow-soft border border-green-50 flex flex-col items-center text-center">
              <div className={`size-14 sm:size-16 ${feature.bg} rounded-full flex items-center justify-center ${feature.color} mb-3 sm:mb-4 shadow-inner`}>
                <span className="material-symbols-outlined text-2xl sm:text-3xl" aria-hidden="true">{feature.icon}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-gray-800 mb-2 font-heading">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Halls Section */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute top-1/2 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-secondary-mint/20 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-secondary-peach/20 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading mb-4 sm:mb-6">Выберите пространство</h2>
            <div className="inline-flex bg-gray-100 p-1 sm:p-1.5 rounded-full relative" role="tablist" aria-label="Выбор зала">
              {hallsData.map((hall, idx) => (
                <button
                  key={hall.id}
                  role="tab"
                  aria-selected={activeHall === idx}
                  aria-controls={`hall-panel-${hall.id}`}
                  id={`hall-tab-${hall.id}`}
                  onClick={() => {
                    setActiveHall(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base z-10 transition-all touch-target flex items-center justify-center ${
                    activeHall === idx
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {hall.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            id={`hall-panel-${currentHall.id}`}
            role="tabpanel"
            aria-labelledby={`hall-tab-${currentHall.id}`}
            className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[400px] transition-all duration-500"
          >
            <div className="md:w-1/2 h-56 sm:h-64 md:h-auto relative group overflow-hidden">
              {/* Image Slider */}
              <div 
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const width = e.currentTarget.clientWidth;
                  const index = Math.round(scrollLeft / width);
                  setActiveImageIndex(index);
                }}
              >
                {currentHall.images.map((img, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                    <img
                      alt={`${currentHall.name} - фото ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={img}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent md:bg-gradient-to-r md:from-black/50 md:to-transparent pointer-events-none" aria-hidden="true"></div>
                  </div>
                ))}
              </div>
              
              {/* Slide Indicators - Moved to bottom for better thumb accessibility */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full" aria-hidden="true">
                {currentHall.images.map((_, idx) => (
                  <button 
                    key={idx}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeImageIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                    onClick={(e) => {
                      const container = e.currentTarget.closest('.relative')?.querySelector('.flex');
                      if (container) {
                        container.scrollTo({ left: idx * container.clientWidth, behavior: 'smooth' });
                      }
                    }}
                  />
                ))}
              </div>

              {/* Swipe Hint for Mobile */}
              <div className="md:hidden absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm" aria-hidden="true">
                <span className="material-symbols-outlined text-xs text-primary animate-pulse">swipe</span>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider">Листайте фото</span>
              </div>

              {/* Badges on image */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white pointer-events-none z-10" aria-label={`Характеристики ${currentHall.name}`}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <span className="material-symbols-outlined text-sm sm:text-base" aria-hidden="true">straighten</span>
                  <span className="font-bold text-xs sm:text-sm">{currentHall.size}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="material-symbols-outlined text-sm sm:text-base" aria-hidden="true">groups</span>
                  <span className="font-bold text-xs sm:text-sm">{currentHall.capacity}</span>
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentHall.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="md:w-1/2 p-5 sm:p-8 md:p-12 flex flex-col justify-center"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-gray-800 font-heading mb-3 sm:mb-4">{currentHall.fullName}</h3>
                <p className="text-text-secondary mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  {currentHall.description}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {currentHall.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-2 sm:gap-3 ${currentHall.bgClass} p-2 sm:p-3 rounded-xl`}>
                      <span className={`material-symbols-outlined ${currentHall.accentColor} text-base sm:text-lg`} aria-hidden="true">{feature.icon}</span>
                      <span className="text-xs sm:text-sm font-bold text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/contact?hall=${currentHall.slug}`}
                  className={`w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white font-black text-sm sm:text-base hover:bg-primary-hover shadow-[0_4px_0_0_#2E7D32] transition-all active:shadow-none active:translate-y-1 text-center touch-target`}
                >
                  Хочу этот зал!
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => {
              setActiveHall(activeHall === 0 ? 1 : 0);
              setActiveImageIndex(0);
            }}
            className="mt-6 sm:mt-8 flex justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
          >
            <div className="flex items-center gap-2 sm:gap-4 bg-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-gray-200 shadow-sm group-hover:border-primary/30 transition-all">
              <span className="text-gray-500 font-bold text-xs sm:text-sm">Также доступен:</span>
              <span className="font-black text-gray-800 text-xs sm:text-sm">
                {hallsData[activeHall === 0 ? 1 : 0].name} ({hallsData[activeHall === 0 ? 1 : 0].size})
              </span>
              <span className="material-symbols-outlined text-primary text-base sm:text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Packages Section */}
      <section className="py-12 sm:py-16 bg-background-subtle">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading">Готовые пакеты</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base mb-4">Всё включено, чтобы вы просто отдыхали</p>
            <div className="md:hidden flex justify-center items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 py-2 rounded-full w-fit mx-auto px-4 border border-primary/10" aria-hidden="true">
              <span className="material-symbols-outlined text-xs animate-bounce-x">arrow_forward</span>
              Листайте пакеты
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 no-scrollbar snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={itemVariants}
                className={`snap-center shrink-0 w-[280px] sm:w-[320px] md:w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 transition-all shadow-soft group relative flex flex-col h-full ${
                  pkg.popular ? 'border-4 border-primary shadow-2xl z-10 md:-translate-y-4' : `${pkg.border} border-2`
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary-yellow text-orange-900 font-black px-4 py-1 rounded-full text-xs sm:text-sm shadow-sm uppercase tracking-wide whitespace-nowrap">
                    Хит продаж
                  </div>
                )}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-800 font-heading mb-1">{pkg.name}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">{pkg.subtitle}</p>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <div className={`flex items-baseline gap-1 ${pkg.popular ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-black text-primary`}>
                    {pkg.price}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-bold mt-1.5 leading-relaxed">{pkg.weekend}</div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow" aria-label={`Возможности пакета ${pkg.name}`}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <span className={`material-symbols-outlined ${pkg.checkColor} text-base sm:text-lg shrink-0`} aria-hidden="true">check_circle</span>
                      <span className={`text-xs sm:text-sm leading-tight ${pkg.popular ? 'text-gray-800 font-bold' : 'text-gray-600 font-medium'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?package=${pkg.id}`}
                  className={`w-full font-bold transition-all touch-target flex items-center justify-center ${
                    pkg.popular
                      ? 'py-3.5 sm:py-4 rounded-xl bg-primary text-white font-black text-sm sm:text-base hover:bg-primary-hover shadow-lg shadow-green-200 active:scale-95'
                      : 'py-3 sm:py-3.5 rounded-xl border-2 border-primary text-primary text-sm sm:text-base hover:bg-primary hover:text-white active:scale-95'
                  }`}
                >
                  {pkg.popular ? 'Заказать праздник' : 'Выбрать'}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ReviewsSection />

      {/* Amenities Section */}
      <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-white border-t-2 border-dashed border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="bg-green-50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
            <div className="md:w-1/2 w-full">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 font-heading mb-3 sm:mb-4">Всё для вашего комфорта</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 font-medium text-sm sm:text-base">Мы продумали каждую мелочь. Заходите и празднуйте, о быте мы позаботимся!</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: 'local_cafe', text: 'Чай & Кофе', color: 'bg-orange-50 text-orange-600' },
                  { icon: 'kitchen', text: 'Кухня', color: 'bg-blue-50 text-blue-600' },
                  { icon: 'restaurant', text: 'Посуда', color: 'bg-pink-50 text-pink-600' },
                  { icon: 'cleaning_services', text: 'Уборка', color: 'bg-green-50 text-green-600' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 border border-gray-50 hover:shadow-md transition-shadow">
                    <div className={`size-8 sm:size-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`} aria-hidden="true">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-gray-700 text-center sm:text-left">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 w-full relative">
              <div className="absolute -inset-3 sm:inset-4 bg-secondary-yellow/50 rounded-full blur-xl"></div>
              <img
                alt="Amenities"
                className="relative rounded-xl sm:rounded-2xl rotate-2 border-4 border-white shadow-lg w-full object-cover h-48 sm:h-64"
                src="/images/halls/0/3.jpeg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </main>
  );
};
