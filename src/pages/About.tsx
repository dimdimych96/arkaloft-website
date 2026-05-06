import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SEO } from '../components/SEO';
import { hallsData } from '../data/siteData';

const halls = hallsData;

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

export const About = () => {
  const [activeHall, setActiveHall] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <main className="min-h-screen bg-white font-body text-text-main overflow-x-hidden">
      <SEO
        title="Наши залы - Arkaloft Новосибирск"
        description="Подробное описание наших пространств: Зал 0+ для малышей и Зал 7+ для подростков. Фотографии, характеристики и возможности аренды."
        keywords="залы для праздника, лофт 0+, лофт 7+, аренда зала новосибирск"
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
            <span className="material-symbols-outlined text-orange-500 text-lg">meeting_room</span>
            <span className="text-sm font-black text-orange-800 font-heading">Два уникальных зала</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-gray-900 font-heading mb-6 relative max-w-4xl mx-auto"
          >
            Наши <br className="sm:hidden" />
            <span className="text-primary">пространства</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-2xl mx-auto"
          >
            Мы создали два концептуальных зала, чтобы каждый праздник — от первого дня рождения до громкой подростковой вечеринки — прошел в идеальной атмосфере.
          </motion.p>
        </div>
      </section>

      {/* Rental Halls Section */}
      <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading mb-3">Аренда залов</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base mb-4">Выберите идеальное пространство для вашего праздника</p>
          </motion.div>

          {/* Hall Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {halls.map((hall, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveHall(idx);
                  setActiveImageIndex(0);
                }}
                className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${
                  activeHall === idx
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {hall.name}
              </button>
            ))}
          </div>

          {/* Hall Content */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-soft border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Images */}
              <div className="relative h-full min-h-[300px] md:min-h-[450px]">
                {/* Mobile: Horizontal scroll */}
                <div className="md:hidden h-full">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-sm animate-pulse">swipe</span>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Листайте фото</span>
                  </div>
                  <div
                    className="flex overflow-x-auto gap-3 snap-x snap-mandatory no-scrollbar rounded-xl"
                    onScroll={(e) => {
                      const scrollLeft = e.currentTarget.scrollLeft;
                      const width = e.currentTarget.offsetWidth;
                      const index = Math.round(scrollLeft / width);
                      setActiveImageIndex(index);
                    }}
                  >
                    {halls[activeHall].images.map((img, idx) => (
                      <div key={idx} className="snap-center shrink-0 w-full">
                        <img
                          src={img}
                          alt={`${halls[activeHall].name} фото ${idx + 1}`}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Indicators */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {halls[activeHall].images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activeImageIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop: Grid */}
                <div className="hidden md:grid grid-cols-2 gap-3 h-full">
                  {halls[activeHall].images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className={idx === 0 ? 'col-span-2 h-[280px]' : 'h-[135px]'}>
                      <img
                        src={img}
                        alt={`${halls[activeHall].name} фото ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </div>

                {/* Age Badge */}
                <div className="absolute top-3 left-3 bg-secondary-yellow text-orange-900 font-black px-4 py-2 rounded-full text-sm shadow-lg z-10">
                  {halls[activeHall].age}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-heading mb-4">
                    {halls[activeHall].name}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-lg">straighten</span>
                      <span className="text-sm font-bold text-gray-700">{halls[activeHall].size}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-lg">groups</span>
                      <span className="text-sm font-bold text-gray-700">{halls[activeHall].capacity}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                    {halls[activeHall].description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {halls[activeHall].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">{feature.icon}</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                  <Link
                    to={`/contact?hall=${halls[activeHall].slug}`}
                    className="w-full py-3 px-6 bg-primary text-white rounded-xl font-black text-sm hover:bg-primary-hover transition-all shadow-lg text-center"
                  >
                    Забронировать
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-mint/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 font-heading mb-4">Почему выбирают Арка Лофт</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Безупречный сервис для вашего комфорта</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { icon: 'eco', title: 'Безопасность', desc: 'Экологичные покрытия и отсутствие острых углов для самых маленьких', color: 'bg-green-100', iconColor: 'text-green-600' },
              { icon: 'security', title: 'Приватность', desc: 'Закрытый доступ только для ваших гостей и видеонаблюдение', color: 'bg-purple-100', iconColor: 'text-purple-600' },
              { icon: 'local_parking', title: 'Комфорт', desc: 'Собственная бесплатная парковка и удобный подъезд', color: 'bg-orange-100', iconColor: 'text-orange-600' },
              { icon: 'cleaning_services', title: 'Чистота', desc: 'Тщательная дезинфекция и кварцевание после каждого праздника', color: 'bg-pink-100', iconColor: 'text-pink-600' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-4 sm:p-6 hover:shadow-xl hover:-translate-y-2 transition-all"
              >
                <div className={`size-12 sm:size-14 ${feature.color} rounded-2xl flex items-center justify-center mb-3 sm:mb-4`}>
                  <span className={`material-symbols-outlined text-2xl sm:text-3xl ${feature.iconColor}`}>{feature.icon}</span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-gray-800 mb-1 sm:mb-2 font-heading">{feature.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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

        <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-heading leading-tight">
              Создайте праздник вашей мечты
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Оставьте заявку сегодня и закрепите за собой лучшую дату! Мы перезвоним в течение 15 минут.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-full font-bold text-base sm:text-lg hover:bg-secondary-yellow hover:scale-105 transition-all shadow-2xl"
            >
              Забронировать дату
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
