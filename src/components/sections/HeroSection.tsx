import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sendGAEvent, EventNames } from '../../lib/googleAnalytics';

interface HeroSectionProps {
  onBookingClick?: () => void;
}

const heroImages = [
  '/images/hero/hero (1).JPG',
  '/images/hero/hero (2).JPG',
  '/images/hero/hero (3).jpg',
  '/images/hero/hero (4).jpg',
  '/images/hero/hero (5).jpg',
  '/images/hero/hero (6).jpg',
  '/images/hero/hero (7).jpg',
  '/images/hero/hero (8).JPG',
];

export const HeroSection = ({ onBookingClick }: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])); // Первое изображение загружено

  // Preload следующих изображений после загрузки первого
  useEffect(() => {
    // Загружаем следующие 2 изображения в фоне
    const preloadNext = () => {
      [1, 2].forEach((index) => {
        if (!loadedImages.has(index)) {
          const img = new Image();
          img.src = heroImages[index];
          img.onload = () => {
            setLoadedImages((prev) => new Set(prev).add(index));
          };
          img.onerror = () => {
            console.warn(`Failed to preload image: ${heroImages[index]}`);
          };
        }
      });
    };

    // Начинаем preload через 1 секунду после монтирования
    const timer = setTimeout(preloadNext, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Preload изображения перед переключением
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % heroImages.length;
    if (!loadedImages.has(nextIndex)) {
      const img = new Image();
      img.src = heroImages[nextIndex];
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(nextIndex));
      };
      img.onerror = () => {
        console.warn(`Failed to preload image: ${heroImages[nextIndex]}`);
      };
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Images with Auto-change */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.12, x: -10, y: -5 }}
            animate={{ opacity: 1, scale: 1.02, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 2.0, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" },
              x: { duration: 6, ease: "linear" },
              y: { duration: 6, ease: "linear" }
            }}
            src={heroImages[currentImageIndex]}
            alt="Арка Лофт"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Decorative mask - geometric pattern */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <path d="M0,40 Q360,80 720,40 T1440,40 L1440,120 L0,120 Z" fill="white" />
          <path d="M0,50 Q360,90 720,50 T1440,50 L1440,120 L0,120 Z" fill="url(#dots)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <img
            src="/logo/arka3.png"
            alt="Арка Лофт"
            className="h-16 sm:h-20 md:h-24 w-auto mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[900] text-white leading-[1.1] mb-4 sm:mb-6 tracking-tight drop-shadow-2xl"
        >
          ЛОФТ ДЛЯ<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary-mint to-secondary-yellow">
            ЯРКИХ СОБЫТИЙ
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg"
        >
          Пространство-трансформер в Новосибирске<br className="hidden sm:block" /> для детских праздников, вечеринок и камерных свадеб
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-row items-center justify-center gap-3 mb-8 sm:mb-12 px-4"
        >
          <Link
            to="/contact"
            onClick={() => sendGAEvent(EventNames.CLICK_BOOKING, { location: 'hero_section' })}
            className="flex-1 max-w-[240px] h-14 sm:h-16 px-6 sm:px-8 rounded-full bg-white/20 backdrop-blur-xl border border-primary/50 text-white font-black text-base sm:text-lg hover:bg-white/30 hover:scale-105 hover:shadow-[0_0_20px_rgba(76,175,80,0.6)] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 touch-target group"
          >
            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform" aria-hidden="true">celebration</span>
            Забронировать
          </Link>
          <a
            href="tel:+79830012520"
            onClick={() => sendGAEvent(EventNames.CLICK_PHONE, { phone_number: '+79830012520', location: 'hero_section' })}
            className="size-14 sm:size-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all active:scale-95 flex items-center justify-center shadow-lg touch-target"
            aria-label="Позвонить"
          >
            <span className="material-symbols-outlined text-2xl">call</span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-8"
        >
          {[
            { label: 'Проведено событий', val: '500+', icon: 'celebration' },
            { label: 'Средний рейтинг', val: '4.9', icon: 'star' },
            { label: 'Уникальных зала', val: '2', icon: 'home' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl" aria-hidden="true">{stat.icon}</span>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.val}</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold text-white/70 tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-24 sm:bottom-32 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs font-bold uppercase tracking-wider">Листайте вниз</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="material-symbols-outlined text-2xl"
          aria-hidden="true"
        >
          keyboard_arrow_down
        </motion.span>
      </motion.div>
    </section>
  );
};
