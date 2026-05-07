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

// Данные для stories
const storiesData: Record<string, { image?: string; video?: string; title: string; type: 'image' | 'video' }[]> = {
  'Зал 0+': [
    // Видео
    { video: '/images/halls/0/halls0video.mp4', title: 'Обзор зала 0+', type: 'video' },
    // Halls фото
    { image: '/images/halls/0/halls (1).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (2).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (3).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (4).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (5).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (6).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (7).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (8).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (9).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (10).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (11).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (12).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (13).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (14).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (15).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (16).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (17).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (18).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (19).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (20).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (21).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (22).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (23).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (24).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (25).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (26).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (27).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (28).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (29).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (30).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (31).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (32).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (33).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (34).JPG', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (35).jpg', title: 'Зал 0+', type: 'image' },
    { image: '/images/halls/0/halls (36).jpg', title: 'Зал 0+', type: 'image' },
  ],
  'Зал 7+': [
    // Видео
    { video: '/images/halls/7/halls7video1.mp4', title: 'Обзор зала 7+', type: 'video' },
    // Listovka
    { image: '/images/halls/7/listovka (1).png', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/listovka (4).png', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/listovka (5).png', title: 'Зал 7+', type: 'image' },
    // Halls фото
    { image: '/images/halls/7/halls7 (1).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (2).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (3).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (4).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (5).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (6).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (7).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (8).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (9).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (10).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (11).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (12).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (13).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (14).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (15).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (16).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (17).jpg', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (18).jpg', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (19).JPG', title: 'Зал 7+', type: 'image' },
    { image: '/images/halls/7/halls7 (20).jpg', title: 'Зал 7+', type: 'image' },
  ],
  'ДР': [
    { video: '/stories/birthday1.mp4', title: 'День рождения', type: 'video' },
    { video: '/stories/birthday2.mp4', title: 'Праздник для детей', type: 'video' },
    { video: '/stories/birthday3.mp4', title: 'Веселье и радость', type: 'video' },
  ],
  'Гендер пати': [
    { video: '/stories/gender_party1.mp4', title: 'Гендер пати', type: 'video' },
    { video: '/stories/gender_party2.mp4', title: 'Розовый или голубой?', type: 'video' },
    { video: '/stories/gender_party3.mp4', title: 'Праздник ожидания', type: 'video' },
  ],
  'Вечеринки': [
    { video: '/stories/party1.mp4', title: 'Вечеринка', type: 'video' },
    { video: '/stories/party2.mp4', title: 'Танцы и веселье', type: 'video' },
    { video: '/stories/party3.mp4', title: 'Дискотека', type: 'video' },
    { video: '/stories/party4.mp4', title: 'Праздничная атмосфера', type: 'video' },
    { video: '/stories/party5.mp4', title: 'Незабываемые моменты', type: 'video' },
  ],
  'Фотосессии': [
    { image: '/images/halls/7/halls7 (1).JPG', title: 'Фотозона в лофте', type: 'image' },
    { image: '/images/halls/0/halls (1).jpg', title: 'Яркие декорации', type: 'image' },
    { image: '/images/halls/7/halls7 (5).JPG', title: 'Студийный свет', type: 'image' },
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary-mint/10 px-4 py-2 rounded-full mb-4">
              <span className="material-symbols-outlined text-primary text-lg animate-pulse">play_circle</span>
              <span className="text-primary font-black tracking-widest uppercase text-xs sm:text-sm font-heading">У нас есть Stories!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading">Смотрите наши залы и праздники</h2>
            <p className="text-sm text-gray-500 mt-2">Нажмите на категорию, чтобы посмотреть фото и видео</p>
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
