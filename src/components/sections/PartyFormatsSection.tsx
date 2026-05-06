import { useState } from 'react';
import { motion } from 'framer-motion';
import { partyFormats } from '../../data/siteData';
import { StoriesViewer } from '../StoriesViewer';

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

// Моковые данные для stories (позже можно заменить на реальные)
const storiesData: Record<string, { image: string; title: string }[]> = {
  'День Рождения': [
    { image: '/images/halls/0/1.jpg', title: 'Детский праздник' },
    { image: '/images/halls/0/2.jpg', title: 'Игровая зона' },
    { image: '/images/halls/0/3.jpeg', title: 'Украшения' },
  ],
  'Гендер Пати': [
    { image: '/images/halls/7/1.jpg', title: 'Гендер пати декор' },
    { image: '/images/halls/7/arka3.jpg', title: 'Розовый или голубой?' },
  ],
  'Свадьба': [
    { image: '/images/hero/arka3.jpg', title: 'Камерная свадьба' },
    { image: '/images/halls/7/1.jpg', title: 'Банкетный зал' },
  ],
  'Корпоратив': [
    { image: '/images/halls/7/arka3.jpg', title: 'Корпоративное мероприятие' },
  ],
  'Фотосессия': [
    { image: '/images/hero/main.jpg', title: 'Фотозона' },
    { image: '/images/halls/7/1.jpg', title: 'Студийный свет' },
  ],
  'Вечеринка': [
    { image: '/images/halls/7/arka3.jpg', title: 'Танцпол' },
    { image: '/images/halls/0/1.jpg', title: 'Вечеринка' },
  ],
};

export const PartyFormatsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsStoriesOpen(true);
  };

  const handleCloseStories = () => {
    setIsStoriesOpen(false);
    setTimeout(() => setSelectedCategory(null), 300);
  };

  const currentStories = selectedCategory ? storiesData[selectedCategory] || [] : [];
  const currentFormat = partyFormats.find(f => f.name === selectedCategory);

  return (
    <>
      <section className="py-12 sm:py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 keep-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-primary font-black tracking-widest uppercase text-xs sm:text-sm mb-2 block font-heading">Форматы</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading">Что будем праздновать?</h2>
            <p className="text-sm text-gray-500 mt-2">Нажмите на категорию, чтобы увидеть примеры</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 justify-items-center"
          >
            {partyFormats.map((format) => (
              <motion.div key={format.name} variants={itemVariants} className="w-full">
                <button
                  onClick={() => handleCategoryClick(format.name)}
                  className="group flex flex-col items-center gap-3 sm:gap-4 w-full cursor-pointer"
                >
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 ${format.border} p-1 bg-white shadow-lg group-hover:scale-105 group-active:scale-95 transition-transform duration-300 relative overflow-hidden`}>
                    <img alt={format.name} className="w-full h-full object-cover rounded-full" src={format.image} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-full" aria-hidden="true"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-2xl sm:text-3xl drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">play_circle</span>
                    </div>
                  </div>
                  <h3 className="text-center font-bold text-xs sm:text-sm text-gray-800 group-hover:text-primary transition-colors line-clamp-2">{format.name}</h3>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedCategory && currentFormat && (
        <StoriesViewer
          isOpen={isStoriesOpen}
          onClose={handleCloseStories}
          stories={currentStories}
          categoryName={selectedCategory}
          categoryColor={currentFormat.bgClass}
        />
      )}
    </>
  );
};
