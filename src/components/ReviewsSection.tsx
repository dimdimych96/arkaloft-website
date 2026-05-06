import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { reviews } from '../data/siteData';

export const ReviewsSection = () => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setIndex(newIndex);
    }
  };

  const scrollToIndex = (i: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: cardWidth * i,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-mint/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary font-black tracking-widest uppercase text-xs sm:text-sm mb-3 block">Отзывы</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">Что говорят родители</h2>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="lg:hidden">
          <div className="flex items-center justify-end gap-2 mb-4 px-4">
            <span className="material-symbols-outlined text-primary text-sm animate-pulse">swipe</span>
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Листайте</span>
          </div>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
          >
            {reviews.map((review, i) => (
              <div key={i} className="snap-center shrink-0 w-full px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 min-h-[280px] flex flex-col justify-center relative overflow-hidden"
                >
                  {/* Quote decoration */}
                  <div className="absolute top-4 left-4 text-primary/10">
                    <span className="material-symbols-outlined text-6xl font-black">format_quote</span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, idx) => (
                        <span key={idx} className="text-orange-400 text-2xl">★</span>
                      ))}
                    </div>
                    <p className="text-base text-gray-700 font-medium leading-relaxed italic mb-6 text-center">
                      "{review.text}"
                    </p>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-black text-gray-900">{review.name}</span>
                      <span className="text-xs font-bold text-gray-400 mt-1">{review.date}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-primary' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                aria-label={`Перейти к отзыву ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Carousel */}
        <div className="hidden lg:block relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 -translate-x-4 -translate-y-8 text-primary/10 select-none">
            <span className="material-symbols-outlined text-[12rem] font-black">format_quote</span>
          </div>

          <motion.div
            className="relative z-10 bg-white rounded-[3rem] p-16 shadow-2xl border-2 border-white/50 min-h-[300px] flex flex-col justify-center"
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
                    <span key={i} className="material-symbols-outlined text-secondary-yellow text-3xl fill-current">star</span>
                  ))}
                </div>
                <p className="text-2xl text-gray-700 font-medium leading-relaxed italic mb-8">
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

        {/* Link to all reviews */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Все отзывы
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
