import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { packages } from '../../data/siteData';

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

export const PackagesSectionStatic = () => {
  return (
    <section className="py-12 sm:py-16 bg-background-subtle relative overflow-hidden">
      {/* Wave top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading">Готовые пакеты</h2>
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

                <ul className="space-y-2 mb-6 flex-grow" aria-label={`Возможности пакета ${pkg.name}`}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${pkg.checkColor} text-base shrink-0`} aria-hidden="true">check_circle</span>
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

              <ul className="space-y-4 mb-8 flex-grow" aria-label={`Возможности пакета ${pkg.name}`}>
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className={`material-symbols-outlined ${pkg.checkColor} text-lg shrink-0`} aria-hidden="true">check_circle</span>
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
  );
};
