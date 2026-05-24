import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { packages } from '../data/siteData';

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

export const Projects = () => {
  return (
    <main className="min-h-screen bg-white font-body text-text-main overflow-x-hidden">
      {/* Header Section */}
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
            <span className="material-symbols-outlined text-orange-500 text-lg">celebration</span>
            <span className="text-sm font-black text-orange-800 font-heading">Создайте свой идеальный праздник!</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-gray-900 font-heading mb-6 relative max-w-4xl mx-auto"
          >
            Готовые пакеты для <br className="sm:hidden" />
            <span className="text-primary">вашего праздника</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-2xl mx-auto"
          >
            Выберите один из популярных пакетов или соберите праздник мечты с нуля. Всё прозрачно и без скрытых доплат.
          </motion.p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-12 sm:py-16 bg-background-subtle relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading mb-3">Готовые пакеты</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base mb-4">Всё включено, чтобы вы просто отдыхали</p>
          </motion.div>

          {/* Mobile: Horizontal scroll */}
          <div className="lg:hidden mb-4">
            <div className="flex items-center justify-end gap-2 px-3 mb-3">
              <span className="material-symbols-outlined text-primary text-sm animate-pulse">swipe</span>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Листайте</span>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-6 px-3 snap-x snap-mandatory no-scrollbar pt-4">
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.name}
                  variants={itemVariants}
                  className={`snap-center shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl p-5 sm:p-6 transition-all shadow-soft relative flex flex-col ${
                    pkg.popular ? 'ring-2 ring-primary shadow-xl' : `${pkg.border} border-2`
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 -right-2 bg-secondary-yellow text-orange-900 font-black px-3 py-1.5 rounded-full text-xs shadow-lg whitespace-nowrap z-10">
                      ⭐ Хит продаж
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-gray-800 font-heading mb-1">{pkg.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{pkg.subtitle}</p>
                  </div>

                  <div className="mb-4">
                    <div className={`flex items-baseline gap-1 ${pkg.popular ? 'text-3xl' : 'text-2xl'} font-black text-primary`}>
                      {pkg.price}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold mt-1.5 leading-relaxed">{pkg.weekend}</div>
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className={`material-symbols-outlined ${pkg.checkColor} text-base shrink-0`}>check_circle</span>
                        <span className={`text-xs leading-tight ${pkg.popular ? 'text-gray-800 font-bold' : 'text-gray-600 font-medium'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/contact?package=${pkg.id}`}
                    className={`w-full font-bold transition-all touch-target flex items-center justify-center ${
                      pkg.popular
                        ? 'py-3.5 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary-hover shadow-lg shadow-green-200 active:scale-95'
                        : 'py-3 rounded-xl border-2 border-primary text-primary text-sm hover:bg-primary hover:text-white active:scale-95'
                    }`}
                  >
                    {pkg.popular ? 'Заказать праздник' : 'Выбрать'}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden lg:grid lg:grid-cols-3 gap-6"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={itemVariants}
                className={`bg-white rounded-2xl sm:rounded-3xl p-6 md:p-8 transition-all shadow-soft group relative flex flex-col h-full ${
                  pkg.popular ? 'border-4 border-primary shadow-2xl z-10 -translate-y-4' : `${pkg.border} border-2`
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary-yellow text-orange-900 font-black px-4 py-1 rounded-full text-sm shadow-sm uppercase tracking-wide whitespace-nowrap">
                    Хит продаж
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-gray-800 font-heading mb-1">{pkg.name}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{pkg.subtitle}</p>
                </div>

                <div className="mb-6">
                  <div className={`flex items-baseline gap-1 ${pkg.popular ? 'text-4xl' : 'text-3xl'} font-black text-primary`}>
                    {pkg.price}
                  </div>
                  <div className="text-xs text-gray-400 font-bold mt-1.5 leading-relaxed">{pkg.weekend}</div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${pkg.checkColor} text-lg shrink-0`}>check_circle</span>
                      <span className={`text-sm leading-tight ${pkg.popular ? 'text-gray-800 font-bold' : 'text-gray-600 font-medium'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?package=${pkg.id}`}
                  className={`w-full font-bold transition-all touch-target flex items-center justify-center ${
                    pkg.popular
                      ? 'py-4 rounded-xl bg-primary text-white font-black text-base hover:bg-primary-hover shadow-lg shadow-green-200 active:scale-95'
                      : 'py-3.5 rounded-xl border-2 border-primary text-primary text-base hover:bg-primary hover:text-white active:scale-95'
                  }`}
                >
                  {pkg.popular ? 'Заказать праздник' : 'Выбрать'}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Services Preview */}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 font-heading mb-4">Дополнительные услуги</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Сделайте ваш праздник ещё ярче с нашими услугами</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className="size-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-purple-500">theater_comedy</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2 font-heading">Шоу-программы</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">Научные шоу, мыльные пузыри, бумажная дискотека и многое другое!</p>
              <div className="text-primary font-black text-lg">от 5 000 ₽</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className="size-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-orange-500">face</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2 font-heading">Аниматоры</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">Любимые герои сказок и мультфильмов для детей любого возраста</p>
              <div className="text-primary font-black text-lg">от 3 500 ₽/час</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className="size-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-pink-500">palette</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2 font-heading">Оформление</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">Фотозоны, шары, тематический декор для незабываемых кадров</p>
              <div className="text-primary font-black text-lg">от 7 000 ₽</div>
            </motion.div>
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
              Наши менеджеры помогут подобрать идеальный пакет под ваш бюджет и пожелания
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
