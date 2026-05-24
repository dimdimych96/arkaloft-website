import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { hallsData } from '../data/siteData';

const halls = hallsData;

const hallDetailedZones = [
  {
    id: 0,
    zones: [
      {
        title: 'Игровая зона',
        icon: 'child_care',
        desc: 'Детский городок с горкой, батут, игрушки, генератор мыльных пузырей, различные световые приборы и качественный звук для проведения дискотеки. Вы можете воспользоваться нашей музыкой или принести свою.'
      },
      {
        title: 'Банкетная зона',
        icon: 'restaurant',
        desc: 'Рассчитана на 12 взрослых и 12 детей, при необходимости количество посадочных мест для взрослых можно увеличить до 18.'
      },
      {
        title: 'Кухонная зона',
        icon: 'kitchen',
        desc: 'Здесь Вы сможете найти и воспользоваться всем необходимым для проведения вашего праздника: посуда на 12 взрослых и 12 детей, чайник, кулер с водой, микроволновая печь, чай, сахар.'
      }
    ]
  },
  {
    id: 1,
    zones: [
      {
        title: 'Основная зона',
        icon: 'celebration',
        desc: 'Посадочные места до 30 человек, столы, сцена (автоматические кулисы, можно сделать сюрприз имениннику на сцене). Профессиональный свет и звук для незабываемых вечеринок.'
      },
      {
        title: 'Кухонная зона',
        icon: 'kitchen',
        desc: 'Со всей необходимой посудой, чайник, микроволновая печь, питьевая вода, чай, сахар.'
      },
      {
        title: 'Зона для отдыха',
        icon: 'weekend',
        desc: 'С диваном и телевизором, плейстейшн. Также здесь можно организовать накрытие стола на небольшое количество человек. Например, для родителей, пока идет программа для детей в основной комнате.'
      }
    ]
  }
];

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
  const [activeRulesTab, setActiveRulesTab] = useState<'terms' | 'rules'>('terms');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  // Synchronize scroll position of the Lightbox scroll container when it opens
  useEffect(() => {
    if (isLightboxOpen) {
      const timer = setTimeout(() => {
        const container = document.getElementById('lightbox-scroll-container');
        if (container) {
          container.scrollLeft = container.offsetWidth * lightboxImageIndex;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLightboxOpen]);

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

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

          {/* Hall Tabs - Segmented Style */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50 shadow-inner">
              {halls.map((hall, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveHall(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-black text-sm transition-all duration-300 ${
                    activeHall === idx
                      ? 'bg-white text-primary shadow-sm scale-[1.02]'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
                  }`}
                >
                  {hall.name}
                </button>
              ))}
            </div>
          </div>

          {/* Hall Content */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-soft border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Images */}
              <div className="relative h-full">
                {/* Mobile: Premium Airbnb-Style Image Carousel */}
                <div className="md:hidden">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full shadow-lg border border-gray-100 bg-gray-50">
                    <div
                      className="flex overflow-x-auto gap-0 snap-x snap-mandatory no-scrollbar h-full w-full"
                      onScroll={(e) => {
                        const scrollLeft = e.currentTarget.scrollLeft;
                        const width = e.currentTarget.offsetWidth;
                        if (width > 0) {
                          const index = Math.round(scrollLeft / width);
                          setActiveImageIndex(index);
                        }
                      }}
                    >
                      {halls[activeHall].images.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="snap-center shrink-0 w-full h-full cursor-pointer"
                          onClick={() => openLightbox(idx)}
                        >
                          <img
                            src={img}
                            alt={`${halls[activeHall].name} фото ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading={idx === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                      ))}
                    </div>



                    {/* Photo Counter Overlay */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 z-10">
                      <span className="material-symbols-outlined text-xs">photo_camera</span>
                      <span>{activeImageIndex + 1} из {halls[activeHall].images.length}</span>
                    </div>

                    {/* Dot Indicators Overlay - Only show if 6 or fewer photos */}
                    {halls[activeHall].images.length <= 6 && (
                      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {halls[activeHall].images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === activeImageIndex ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/55'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Swipe gesture hint */}
                  <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">swipe</span>
                    <span>Листайте для просмотра зала</span>
                  </div>
                </div>

                {/* Desktop: Grid */}
                <div className="hidden md:grid grid-cols-2 gap-3 h-full min-h-[450px]">
                  {halls[activeHall].images.slice(0, 4).map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`${idx === 0 ? 'col-span-2 h-[280px]' : 'h-[135px]'} cursor-pointer`}
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={img}
                        alt={`${halls[activeHall].name} фото ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-sm hover:opacity-90 transition-opacity"
                      />
                    </div>
                  ))}
                </div>


              </div>

              {/* Info */}
              <div className="flex flex-col justify-between mt-4 md:mt-0">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-heading mb-4">
                    {halls[activeHall].name}
                  </h3>

                  <div className="flex flex-wrap gap-2.5 mb-5">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-150/60 px-3.5 py-1.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-lg">straighten</span>
                      <span className="text-xs sm:text-sm font-bold text-gray-700">{halls[activeHall].size}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-150/60 px-3.5 py-1.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-lg">groups</span>
                      <span className="text-xs sm:text-sm font-bold text-gray-700">{halls[activeHall].capacity}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                    {halls[activeHall].description}
                  </p>

                  {/* Styled Features Chips */}
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Особенности зала:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                    {halls[activeHall].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-gray-50/70 border border-gray-150/50 rounded-xl p-2.5">
                        <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-base">{feature.icon}</span>
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold text-gray-700 leading-tight">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rental Price and CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Стоимость аренды</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-primary font-heading">{halls[activeHall].price}</span>
                    </div>
                  </div>
                  <Link
                    to={`/contact?hall=${halls[activeHall].slug}`}
                    className="py-3.5 px-8 bg-primary hover:bg-primary-hover text-white rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-primary/25 hover:shadow-xl text-center flex-1 sm:flex-none"
                  >
                    Забронировать зал
                  </Link>
                </div>
              </div>
            </div>

            {/* Detailed Zones */}
            <div className="border-t border-gray-100 pt-8 mt-8">
              <h4 className="text-xl sm:text-2xl font-black text-gray-900 font-heading mb-6 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">dashboard</span>
                Подробное зонирование
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {hallDetailedZones[activeHall].zones.map((zone, zIdx) => (
                  <div 
                    key={zIdx} 
                    className="bg-white hover:bg-gray-50 border-2 border-gray-100 hover:border-primary/20 transition-all rounded-2xl p-4 flex gap-3.5 items-start relative overflow-hidden"
                  >
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-xl">{zone.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-black text-gray-900 text-base mb-1 font-heading leading-tight">{zone.title}</h5>
                      <p className="text-xs text-gray-500 leading-relaxed">{zone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 bg-secondary-mint/10 border border-secondary-mint/30 p-4 rounded-xl mt-6 max-w-2xl mx-auto text-center sm:text-left">
                <span className="material-symbols-outlined text-primary text-2xl shrink-0">thermostat</span>
                <p className="text-xs sm:text-sm font-black text-teal-900">
                  Везде пол с подогревом (в теплый период включается по вашему запросу).
                </p>
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
                className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-4 sm:p-6 hover:shadow-xl hover:-translate-y-2 transition-all h-full flex flex-col"
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

      {/* Rules and Terms Section */}
      <section className="py-16 sm:py-20 bg-background-off-white relative overflow-hidden">
        {/* Soft background decor blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 font-heading mb-4">
              Условия аренды и правила
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Всё, что нужно знать для комфортной организации вашего праздника
            </p>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="lg:hidden flex bg-gray-100 p-1.5 rounded-2xl mb-8 max-w-xs sm:max-w-sm mx-auto border border-gray-200/50 shadow-inner">
            <button
              onClick={() => setActiveRulesTab('terms')}
              className={`flex-1 py-2.5 px-4 text-center rounded-xl font-black text-xs transition-all duration-300 ${
                activeRulesTab === 'terms'
                  ? 'bg-white text-primary shadow-sm scale-[1.02]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Условия аренды
            </button>
            <button
              onClick={() => setActiveRulesTab('rules')}
              className={`flex-1 py-2.5 px-4 text-center rounded-xl font-black text-xs transition-all duration-300 ${
                activeRulesTab === 'rules'
                  ? 'bg-white text-orange-600 shadow-sm scale-[1.02]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Правила посещения
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Column 1: Условия аренды залов */}
            <div className={`${activeRulesTab === 'terms' ? 'block' : 'hidden'} lg:block bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all`}>
              <div>
                <h3 className="text-2xl font-black text-gray-900 font-heading mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">key</span>
                  Условия аренды
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: 'schedule',
                      title: 'Минимальное время',
                      desc: 'Минимальное время аренды составляет 2 часа.'
                    },
                    {
                      icon: 'payments',
                      title: 'Бронирование и задаток',
                      desc: 'Вы можете забронировать нужную дату и время. Для подтверждения брони необходимо внести задаток в размере 2000 рублей и заполнить анкету в течение 3-х дней.'
                    },
                    {
                      icon: 'swap_horiz',
                      title: 'Перенос брони',
                      desc: 'При возникновении изменений возможен перенос вашей брони на любую дату в течение 1 месяца. Задаток не возвращается, но вы можете передать бронь своим друзьям.'
                    },
                    {
                      icon: 'login',
                      title: 'Прибытие гостей',
                      desc: 'В день праздника вы можете приходить не раньше, чем за 15 минут до начала. Пожалуйста, предупредите об этом своих гостей.'
                    },
                    {
                      icon: 'celebration',
                      title: 'Время на оформление',
                      desc: 'Если вам необходимо дополнительное время для оформления, вы можете арендовать его по сниженной стоимости (детали уточняйте у менеджера).'
                    },
                    {
                      icon: 'hourglass_bottom',
                      title: 'Окончание праздника',
                      desc: 'В конце мероприятия можно задержаться не более чем на 10 минут. Задержавшись дольше, вам нужно будет оплатить последующие полчаса.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="shrink-0 size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base mb-1 font-heading">{item.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Правила посещения лофта */}
            <div className={`${activeRulesTab === 'rules' ? 'block' : 'hidden'} lg:block bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all`}>
              <div>
                <h3 className="text-2xl font-black text-gray-900 font-heading mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="material-symbols-outlined text-orange-500 text-3xl">gavel</span>
                  Правила посещения
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: 'child_care',
                      title: 'Безопасность детей',
                      desc: 'Ответственность за деток несут сопровождающие взрослые. Пожалуйста, внимательно следите за своими малышами.'
                    },
                    {
                      icon: 'footprint',
                      title: 'Сменная обувь',
                      desc: 'Вы можете взять с собой чистую сменную обувь для себя и деток или приобрести одноразовые тапочки у администратора. Пожалуйста, предупредите об этом своих гостей.'
                    },
                    {
                      icon: 'cleaning_services',
                      title: 'Уборка лофта',
                      desc: 'В конце мероприятия просим вас собрать необходимые остатки еды, а выносить мусор и мыть посуду не нужно — мы всё сделаем сами!'
                    },
                    {
                      icon: 'no_drinks',
                      title: 'Алкоголь',
                      desc: 'Крепкие алкогольные напитки в нашем лофте не приветствуются.'
                    },
                    {
                      icon: 'no_food',
                      title: 'Ограничения в игровой',
                      desc: 'В игровую зону и на батут строго запрещено ходить с едой и напитками. Пожалуйста, следите за детками!'
                    },
                    {
                      icon: 'more_time',
                      title: 'Продление аренды',
                      desc: 'Продление арендного времени возможно только в случае отсутствия следующего по времени праздника.'
                    },
                    {
                      icon: 'warning',
                      title: 'Сохранность имущества',
                      desc: 'Порча любого имущества лофта оплачивается по его фактической стоимости.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="shrink-0 size-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base mb-1 font-heading">{item.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-between overflow-hidden"
          >
            {/* Immersive Blurred Background based on active photo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
              <img
                src={halls[activeHall].images[lightboxImageIndex]}
                alt=""
                className="w-full h-full object-cover blur-[60px] sm:blur-[100px] scale-125 opacity-40 transition-all duration-500 ease-in-out"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>
            </div>

            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4 text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
              <span className="text-sm font-bold font-heading">
                {lightboxImageIndex + 1} из {halls[activeHall].images.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="size-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all focus:outline-none"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Gallery Swipe Container */}
            <div className="flex-1 w-full flex items-center justify-center relative bg-transparent select-none z-10">
              {/* Desktop Left navigation */}
              {lightboxImageIndex > 0 && (
                <button
                  onClick={() => {
                    const container = document.getElementById('lightbox-scroll-container');
                    if (container) {
                      const targetIndex = lightboxImageIndex - 1;
                      container.scrollTo({ left: container.offsetWidth * targetIndex, behavior: 'smooth' });
                      setLightboxImageIndex(targetIndex);
                    }
                  }}
                  className="hidden md:flex absolute left-4 text-white/70 hover:text-white size-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-all z-20 focus:outline-none"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
              )}
              
              <div
                id="lightbox-scroll-container"
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const width = e.currentTarget.offsetWidth;
                  if (width > 0) {
                    const index = Math.round(scrollLeft / width);
                    setLightboxImageIndex(index);
                  }
                }}
              >
                {halls[activeHall].images.map((img, idx) => (
                  <div key={idx} className="snap-center shrink-0 w-full h-full flex items-center justify-center p-4">
                    <img
                      src={img}
                      alt=""
                      className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                    />
                  </div>
                ))}
              </div>

              {/* Desktop Right navigation */}
              {lightboxImageIndex < halls[activeHall].images.length - 1 && (
                <button
                  onClick={() => {
                    const container = document.getElementById('lightbox-scroll-container');
                    if (container) {
                      const targetIndex = lightboxImageIndex + 1;
                      container.scrollTo({ left: container.offsetWidth * targetIndex, behavior: 'smooth' });
                      setLightboxImageIndex(targetIndex);
                    }
                  }}
                  className="hidden md:flex absolute right-4 text-white/70 hover:text-white size-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-all z-20 focus:outline-none"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              )}
            </div>

            {/* Footer space / swipe instructions */}
            <div className="p-4 text-center text-white/40 text-xs bg-gradient-to-t from-black/80 to-transparent z-10">
              Листайте влево / вправо для просмотра других фото
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
