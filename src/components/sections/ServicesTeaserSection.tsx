import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export const ServicesTeaserSection = () => {
  const services = [
    {
      icon: 'explore',
      title: 'Квесты',
      desc: 'Командные приключения: Форт Боярд, квизы и интерактивные игры.',
      bg: 'bg-green-50',
      color: 'text-green-600',
      category: 'shows'
    },
    {
      icon: 'face',
      title: 'Аниматоры',
      desc: 'Любимые сказочные герои и профессиональные ведущие праздников.',
      bg: 'bg-orange-50',
      color: 'text-orange-600',
      category: 'animators'
    },
    {
      icon: 'celebration',
      title: 'Шоу-программы',
      desc: 'Бумажное, неоновое, мыльное шоу и праздничные дискотеки.',
      bg: 'bg-purple-50',
      color: 'text-purple-600',
      category: 'shows'
    },
    {
      icon: 'palette',
      title: 'Декор и фотозоны',
      desc: 'Индивидуальное оформление зала и воздушные шары под ключ.',
      bg: 'bg-pink-50',
      color: 'text-pink-600',
      category: 'decor'
    },
    {
      icon: 'cake',
      title: 'Кейтеринг и торты',
      desc: 'Организация сладкого стола (candy bar) и торты ручной работы.',
      bg: 'bg-blue-50',
      color: 'text-blue-600',
      category: 'catering'
    },
    {
      icon: 'photo_camera',
      title: 'Фото и видео',
      desc: 'Профессиональная съемка ярких моментов вашего события.',
      bg: 'bg-teal-50',
      color: 'text-teal-600',
      category: 'shows'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-background-off-white/40 to-white relative overflow-hidden border-t border-b border-gray-100">
      {/* Decorative background blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary-peach/5 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-primary font-black tracking-widest uppercase text-xs sm:text-sm mb-2 block">Услуги под ключ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-heading mb-3">
            Соберите свой праздник сами
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Если готовые пакеты вам не подходят, вы можете арендовать зал и выбрать любые услуги отдельно
          </p>
        </motion.div>

        {/* Services List: 1 column on Mobile, 2 columns on Desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="w-full"
            >
              <Link 
                to={`/services?category=${item.category}`} 
                className="group flex items-center justify-between p-3.5 bg-white hover:bg-gray-50/50 rounded-2xl border border-gray-150/70 hover:border-primary/20 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`size-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined text-xl sm:text-2xl ${item.color}`} aria-hidden="true">{item.icon}</span>
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="text-sm sm:text-base font-black text-gray-900 font-heading leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-normal truncate max-w-[240px] xs:max-w-[280px] sm:max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all text-xl shrink-0" aria-hidden="true">
                  chevron_right
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Link to all services */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 text-xs sm:text-sm touch-target"
          >
            Перейти в каталог услуг
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
