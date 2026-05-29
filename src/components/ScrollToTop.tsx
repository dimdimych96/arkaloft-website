import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-2xl active:scale-95 transition-all focus:outline-none border border-white/10 cursor-pointer group"
          style={{ boxShadow: '0 8px 30px rgba(76, 175, 80, 0.4)' }}
          aria-label="Наверх"
        >
          <span className="material-symbols-outlined text-2xl font-bold group-hover:-translate-y-1 transition-transform">
            arrow_upward
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
