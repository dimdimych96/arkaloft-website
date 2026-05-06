import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { hallsData } from '../../data/siteData';

export const HallsSectionStatic = () => {
  const [activeHall, setActiveHall] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-white relative">
      {/* Wave top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="absolute top-1/2 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-secondary-mint/20 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-secondary-peach/20 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
      <div className="max-w-5xl mx-auto relative z-10">
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
          id={`hall-panel-${hallsData[activeHall].id}`}
          role="tabpanel"
          aria-labelledby={`hall-tab-${hallsData[activeHall].id}`}
          className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[400px] transition-all duration-500"
        >
          <div className="md:w-1/2 h-56 sm:h-64 md:h-auto relative group overflow-hidden">
            <div
              className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                const index = Math.round(scrollLeft / width);
                setActiveImageIndex(index);
              }}
            >
              {hallsData[activeHall].images.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                  <img
                    alt={`${hallsData[activeHall].name} - фото ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={img}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent md:bg-gradient-to-r md:from-black/50 md:to-transparent pointer-events-none" aria-hidden="true"></div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full" aria-hidden="true">
              {hallsData[activeHall].images.map((_, idx) => (
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

            <div className="md:hidden absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm" aria-hidden="true">
              <span className="material-symbols-outlined text-xs text-primary animate-pulse">swipe</span>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider">Листайте фото</span>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white pointer-events-none z-10" aria-label={`Характеристики ${hallsData[activeHall].name}`}>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <span className="material-symbols-outlined text-sm sm:text-base" aria-hidden="true">straighten</span>
                <span className="font-bold text-xs sm:text-sm">{hallsData[activeHall].size}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="material-symbols-outlined text-sm sm:text-base" aria-hidden="true">groups</span>
                <span className="font-bold text-xs sm:text-sm">{hallsData[activeHall].capacity}</span>
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={hallsData[activeHall].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="md:w-1/2 p-5 sm:p-8 md:p-12 flex flex-col justify-center"
            >
              <h3 className="text-2xl sm:text-3xl font-black text-gray-800 font-heading mb-3 sm:mb-4">{hallsData[activeHall].fullName}</h3>
              <p className="text-text-secondary mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {hallsData[activeHall].description}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {hallsData[activeHall].features.map((feature, idx) => (
                  <div key={idx} className={`flex items-center gap-2 sm:gap-3 ${hallsData[activeHall].bgClass} p-2 sm:p-3 rounded-xl`}>
                    <span className={`material-symbols-outlined ${hallsData[activeHall].accentColor} text-base sm:text-lg`} aria-hidden="true">{feature.icon}</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
              <Link
                to={`/contact?hall=${hallsData[activeHall].slug}`}
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

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};
