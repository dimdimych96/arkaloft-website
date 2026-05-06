import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    category: 'shows',
    icon: 'theater_comedy',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Шоу-программы',
    subtitle: 'Яркие эмоции, которые запомнятся навсегда',
    items: [
      {
        name: 'Серебряное шоу',
        description: 'Килограммы блестящей фольги, в которой можно купаться и танцевать.',
        price: 'от 5 000 ₽',
        badge: 'Hit',
        image: '/images/halls/7/4.jpg',
      },
      {
        name: 'Мыльное шоу',
        description: 'Гигантские мыльные пузыри и пенная вечеринка для детей любого возраста.',
        price: 'от 4 500 ₽',
        image: '/images/halls/7/5.jpg',
      },
      {
        name: 'Бумажная дискотека',
        description: 'Танцы с конфетти, серпантином и светящимися палочками.',
        price: 'от 3 500 ₽',
        image: '/images/halls/7/6.jpg',
      },
      {
        name: 'Научное шоу',
        description: 'Увлекательные эксперименты и химические реакции.',
        price: 'от 6 000 ₽',
        image: '/images/halls/7/7.jpg',
      },
    ],
  },
  {
    category: 'animators',
    icon: 'face',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Аниматоры',
    subtitle: 'Любимые герои сказок и мультфильмов',
    items: [
      { name: 'Фиксики', price: '3500 ₽/час', image: '/images/halls/0/4.jpg' },
      { name: 'Щенячий патруль', price: '3500 ₽/час', image: '/images/halls/0/5.jpg' },
      { name: 'Холодное сердце', price: '4000 ₽/час', image: '/images/halls/0/6.jpg' },
      { name: 'Человек паук', price: '4000 ₽/час', image: '/images/halls/7/1.jpg' },
      { name: 'Единорог', price: '4500 ₽/час', image: '/images/halls/7/2.jpg' },
      { name: 'Аквамен', price: '4000 ₽/час', image: '/images/halls/7/3.jpg' },
    ],
  },
  {
    category: 'decor',
    icon: 'palette',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    title: 'Оформление и декор',
    subtitle: 'Создадим праздничную атмосферу',
    items: [
      { name: 'Фотозона', description: 'Индивидуальный дизайн под ваш праздник', price: 'от 7 000 ₽' },
      { name: 'Воздушные шары', description: 'Фонтаны, арки, гирлянды', price: 'от 3 000 ₽' },
      { name: 'Буквы из пенопласта', description: 'Имя именинника, цифра возраста', price: 'от 2 500 ₽' },
      { name: 'Тематический декор', description: 'Полный комплект под ключ', price: 'от 10 000 ₽' },
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
      { name: 'Кенди бар', description: 'Сладкий стол с десертами', price: 'от 5 000 ₽' },
      { name: 'Пончики', description: 'Набор из 20 шт.', price: 'от 2 000 ₽' },
      { name: 'Капкейки', description: 'Набор из 12 шт.', price: 'от 2 400 ₽' },
      { name: 'Фруктовая нарезка', description: 'Ассорти на компанию', price: 'от 3 500 ₽' },
    ],
  },
];

export const Services = () => {
  return (
    <main className="min-h-screen bg-white font-body text-text-main overflow-x-hidden">
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
                    key={item.name}
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden"
                  >
                    {item.badge && (
                      <div className="absolute top-2 right-2 z-10 bg-secondary-yellow text-[10px] font-black px-2 py-1 rounded-full text-orange-900 uppercase shadow-lg">
                        {item.badge}
                      </div>
                    )}
                    <div className="relative rounded-xl overflow-hidden mb-3 aspect-square">
                      <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} />
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

            {section.category === 'animators' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
              >
                {section.items.map((item: any) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer"
                  >
                    <div className="relative rounded-xl overflow-hidden mb-3 aspect-square">
                      <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-gray-800 text-center mb-1">{item.name}</h3>
                    <p className="text-xs text-primary font-bold text-center">{item.price}</p>
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
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
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
