import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShowModal } from '../components/ShowModal';
import { showsData, ShowDetail } from '../data/showsData';

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

const services = [
  {
    category: 'rent',
    icon: 'meeting_room',
    iconBg: 'bg-green-100',
    iconColor: 'text-primary',
    title: 'Аренда залов',
    subtitle: 'Выберите идеальное пространство для вашего праздника',
    items: [
      {
        name: 'Зал 0+ (будни)',
        description: '135 м², горка, сухой бассейн, до 30 гостей',
        price: '2 500 ₽/час',
        details: 'С 4-го часа: 2 500 ₽/час',
      },
      {
        name: 'Зал 0+ (выходные)',
        description: '135 м², горка, сухой бассейн, до 30 гостей',
        price: '3 500 ₽/час',
        details: 'С 4-го часа: 3 000 ₽/час',
      },
      {
        name: 'Зал 7+ (любой день)',
        description: '75 м², PS5, проектор, караоке, до 25 гостей',
        price: '2 500 ₽/час',
        details: 'С 4-го часа: 2 000 ₽/час',
      },
      {
        name: 'Игротека',
        description: 'Пока ребенок играет, вы отдыхаете за чашкой чая',
        price: '450 ₽/час',
        details: '2 взрослых + 1 ребенок. За 2-го ребенка +300 ₽/час',
      },
    ],
  },
  {
    category: 'shows',
    icon: 'theater_comedy',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Шоу-программы',
    subtitle: 'Яркие эмоции, которые запомнятся навсегда',
    items: showsData.map(show => ({
      id: show.id,
      name: show.name,
      description: show.description.substring(0, 100) + '...',
      price: show.pricing[0].price,
      badge: show.badge,
      image: show.image,
    })),
  },
  {
    category: 'animators',
    icon: 'face',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Аниматоры',
    subtitle: 'Любимые герои сказок и мультфильмов',
    items: [
      { name: 'Аниматор (стандарт)', price: '4 500 ₽/50 мин', description: 'Профессиональный аниматор в костюме', emoji: '🎭' },
      { name: 'Аниматор (премиум)', price: '5 500 ₽/50 мин', description: 'Премиум костюм +1000 ₽', emoji: '⭐' },
      { name: 'Ростовая кукла', price: 'от 5 500 ₽/30 мин', description: 'Большая ростовая кукла', emoji: '🐻' },
      { name: 'Аквагрим, блеск-тату', price: 'от 2 500 ₽/час', description: 'Рисунки на лице и теле', emoji: '🎨' },
    ],
    heroes: [
      { name: 'Трансформеры', emoji: '🤖' },
      { name: 'Уэнсдей', emoji: '🖤' },
      { name: 'Человек-паук', emoji: '🕷️' },
      { name: 'Леди Баг', emoji: '🐞' },
      { name: 'Фиксики', emoji: '🔧' },
      { name: 'Щенячий патруль', emoji: '🐕' },
      { name: 'Единорожки', emoji: '🦄' },
      { name: 'И многие другие', emoji: '✨' },
    ]
  },
  {
    category: 'decor',
    icon: 'palette',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    title: 'Оформление и декор',
    subtitle: 'Создадим праздничную атмосферу',
    items: [
      { name: 'Фотозона', description: 'Индивидуальный дизайн под ваш праздник', price: 'от 4 500 ₽' },
      { name: 'Декор кенди-бара', description: 'Аренда посуды для сладостей', price: '2 500 ₽' },
      { name: 'Шары гелиевые', description: 'Фонтаны, арки, гирлянды', price: 'от 160 ₽/шт' },
    ],
  },
  {
    category: 'catering',
    icon: 'cake',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    title: 'Кейтеринг',
    subtitle: 'Вкусные угощения для гостей',
    items: [
      { name: 'Фуршет (кейтеринг)', description: 'Полноценное меню', price: 'от 5 000 ₽' },
      { name: 'Торт', description: 'На заказ', price: 'от 3 000 ₽/кг' },
      { name: 'Сахарная вата безлимит', description: 'Неограниченное количество', price: '3 000 ₽/час' },
    ],
  },
];

export const Services = () => {
  const [selectedShow, setSelectedShow] = useState<ShowDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowClick = (showId: string) => {
    const show = showsData.find(s => s.id === showId);
    if (show) {
      setSelectedShow(show);
      setIsModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-white font-body text-text-main overflow-x-hidden">
      <ShowModal
        show={selectedShow}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
            <span className="material-symbols-outlined text-orange-500 text-lg">auto_awesome</span>
            <span className="text-sm font-black text-orange-800 font-heading">Каталог развлечений</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-gray-900 font-heading mb-6 relative max-w-4xl mx-auto"
          >
            Все услуги для <br className="sm:hidden" />
            <span className="text-primary">идеального праздника</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Мы берем на себя все заботы: от подбора аниматора до украшения торта. Профессиональная организация событий в наших уютных лофтах.
          </motion.p>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {services.map((service) => (
              <a
                key={service.category}
                href={`#${service.category}`}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-full bg-white border-2 border-gray-100 text-gray-700 font-bold hover:border-primary hover:text-primary hover:shadow-lg transition-all whitespace-nowrap text-sm"
              >
                <span className={`material-symbols-outlined ${service.iconColor} text-lg`}>{service.icon}</span>
                {service.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((section, sectionIndex) => (
        <section
          key={section.category}
          id={section.category}
          className={`py-12 sm:py-16 relative overflow-hidden ${
            sectionIndex % 2 === 0 ? 'bg-white' : 'bg-background-subtle'
          }`}
        >
          {/* Wave top для нечетных секций */}
          {sectionIndex % 2 === 1 && (
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
              <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
              </svg>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`size-12 sm:size-14 ${section.iconBg} rounded-2xl flex items-center justify-center ${section.iconColor}`}>
                  <span className="material-symbols-outlined text-2xl">{section.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 font-heading">{section.title}</h2>
                  {section.subtitle && (
                    <p className="text-sm text-gray-500 font-medium mt-1">{section.subtitle}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Section Content */}
            {section.category === 'shows' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
              >
                {section.items.map((item: any) => (
                  <motion.div
                    key={item.id || item.name}
                    variants={itemVariants}
                    onClick={() => item.id && handleShowClick(item.id)}
                    className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden cursor-pointer"
                  >
                    {item.badge && (
                      <div className="absolute top-2 right-2 z-10 bg-secondary-yellow text-[10px] font-black px-2 py-1 rounded-full text-orange-900 uppercase shadow-lg">
                        {item.badge}
                      </div>
                    )}
                    <div className="relative rounded-xl overflow-hidden mb-3 aspect-square">
                      <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                          visibility
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-gray-800 font-heading mb-1 text-center">{item.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2 leading-relaxed line-clamp-2 text-center">{item.description}</p>
                    <div className="text-center">
                      <span className="text-primary font-black text-xs sm:text-sm">{item.price}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}


            {section.category === 'rent' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-primary text-xl">meeting_room</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-black text-gray-900 font-heading mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <div className="text-primary font-black text-xl mb-1">{item.price}</div>
                        {item.details && (
                          <p className="text-xs text-gray-500">{item.details}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA to About page */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-primary/5 to-secondary-mint/10 rounded-2xl p-6 border-2 border-primary/20 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-2xl">photo_camera</span>
                    <h3 className="text-xl font-black text-gray-900 font-heading">Хотите увидеть наши залы?</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    Посмотрите фотографии залов, узнайте все особенности и выберите идеальное пространство для вашего праздника
                  </p>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-black text-sm hover:bg-primary-hover transition-all shadow-lg"
                  >
                    Смотреть фото залов
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {section.category === 'animators' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Services Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {section.items.map((item: any) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all text-center"
                    >
                      <div className="text-5xl mb-3">{item.emoji}</div>
                      <h3 className="text-sm sm:text-base font-black text-gray-800 font-heading mb-2">{item.name}</h3>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                      <div className="text-primary font-black text-sm">{item.price}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Heroes List */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-100"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-orange-500 text-2xl">stars</span>
                    <h3 className="text-xl font-black text-gray-900 font-heading">Популярные герои:</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {section.heroes?.map((hero: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all text-center"
                      >
                        <div className="text-3xl mb-2">{hero.emoji}</div>
                        <span className="text-xs sm:text-sm font-bold text-gray-700">{hero.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-4 text-center">
                    💬 Не нашли нужного героя? Напишите нам — мы подберем костюм специально для вас!
                  </p>
                </motion.div>
              </motion.div>
            )}

            {(section.category === 'entertainment' || section.category === 'photo-video') && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
              >
                {section.items.map((item: any) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all"
                  >
                    <div className={`size-12 sm:size-14 ${section.iconBg} rounded-2xl flex items-center justify-center mb-3 mx-auto`}>
                      <span className={`material-symbols-outlined text-xl sm:text-2xl ${section.iconColor}`}>celebration</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-gray-800 font-heading mb-2 text-center leading-tight">{item.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2 leading-relaxed text-center line-clamp-2">{item.description}</p>
                    <div className="text-primary font-black text-xs text-center">{item.price}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {(section.category === 'decor' || section.category === 'catering') && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
              >
                {section.items.map((item: any) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all"
                  >
                    <div className={`size-12 sm:size-14 ${section.iconBg} rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto`}>
                      <span className={`material-symbols-outlined text-xl sm:text-2xl ${section.iconColor}`}>celebration</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-gray-800 font-heading mb-2 text-center">{item.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-3 leading-relaxed text-center line-clamp-2">{item.description}</p>
                    <div className="text-primary font-black text-xs sm:text-sm text-center">{item.price}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Wave bottom для нечетных секций */}
          {sectionIndex % 2 === 1 && (
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
              <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
              </svg>
            </div>
          )}
        </section>
      ))}

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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-heading leading-tight">
              Нужна помощь с выбором?
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Наши менеджеры помогут подобрать идеальные услуги для вашего праздника
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-full font-bold text-base sm:text-lg hover:bg-secondary-yellow hover:scale-105 transition-all shadow-2xl"
            >
              Получить консультацию
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
