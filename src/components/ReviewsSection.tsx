import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviews } from '../data/siteData';

export const ReviewsSection = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary font-black tracking-widest uppercase text-xs sm:text-sm mb-3 block">Отзывы</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">Что говорят родители</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 -translate-x-4 -translate-y-8 text-primary/10 select-none">
            <span className="material-symbols-outlined text-8xl sm:text-[12rem] font-black">format_quote</span>
          </div>
          
          <motion.div 
            className="relative z-10 bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 shadow-2xl border border-white/20 min-h-[300px] flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(reviews[index].rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-secondary-yellow text-2xl sm:text-3xl fill-current">star</span>
                  ))}
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed italic mb-8">
                  "{reviews[index].text}"
                </p>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-gray-900">{reviews[index].name}</span>
                  <span className="text-sm font-bold text-gray-400 mt-1">{reviews[index].date}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-10">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-primary' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                  aria-label={`Перейти к отзыву ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
