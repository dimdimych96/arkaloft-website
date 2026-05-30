import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cookie, X } from 'lucide-react';

declare global {
  interface Window {
    loadAnalytics?: () => void;
  }
}

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('cookie_consent_accepted');
    if (!consent) {
      // Delay showing the banner slightly for better UX/performance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'true') {
      // If already accepted, load analytics immediately
      if (typeof window !== 'undefined' && window.loadAnalytics) {
        window.loadAnalytics();
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_accepted', 'true');
    setIsVisible(false);
    if (typeof window !== 'undefined' && window.loadAnalytics) {
      window.loadAnalytics();
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent_accepted', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999] font-sans"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-gray-150 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-4 relative overflow-hidden">
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>

            {/* Header info */}
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0 border border-primary/10">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-black text-sm text-gray-900 mb-1 flex items-center gap-1.5">
                  Файлы Cookie & Конфиденциальность
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Мы используем cookie-файлы для анализа трафика и персонализации контента. 
                  Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                  <Link to="/privacy" className="text-primary hover:underline font-bold whitespace-nowrap">
                    Политикой конфиденциальности
                  </Link>.
                </p>
              </div>
              <button 
                onClick={handleDecline}
                className="text-gray-400 hover:text-gray-650 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                title="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Buttons actions */}
            <div className="flex items-center gap-3 w-full border-t border-gray-100 pt-3 relative z-10">
              <button
                onClick={handleDecline}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all cursor-pointer text-center"
              >
                Отклонить
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black shadow-sm transition-all cursor-pointer text-center"
              >
                Принять все
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
