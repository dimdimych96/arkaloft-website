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
    <section className="py-12 sm:py-16 bg-background-subtle">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading">Готовые пакеты</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base mb-4">Всё включено, чтобы вы просто отдыхали</p>
          <div className="md:hidden flex justify-center items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 py-2 rounded-full w-fit mx-auto px-4 border border-primary/10" aria-hidden="true">
            <span className="material-symbols-outlined text-xs animate-bounce-x">arrow_forward</span>
            Листайте пакеты
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 no-scrollbar snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={itemVariants}
              className={`snap-center shrink-0 w-[280px] sm:w-[320px] md:w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 transition-all shadow-soft group relative flex flex-col h-full ${
                pkg.popular ? 'border-4 border-primary shadow-2xl z-10 md:-translate-y-4' : `${pkg.border} border-2`
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary-yellow text-orange-900 font-black px-4 py-1 rounded-full text-xs sm:text-sm shadow-sm uppercase tracking-wide whitespace-nowrap">
                  Хит продаж
                </div>
              )}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-gray-800 font-heading mb-1">{pkg.name}</h3>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">{pkg.subtitle}</p>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className={`flex items-baseline gap-1 ${pkg.popular ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-black text-primary`}>
                  {pkg.price}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-bold mt-1.5 leading-relaxed">{pkg.weekend}</div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow" aria-label={`Возможности пакета ${pkg.name}`}>
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3">
                    <span className={`material-symbols-outlined ${pkg.checkColor} text-base sm:text-lg shrink-0`} aria-hidden="true">check_circle</span>
                    <span className={`text-xs sm:text-sm leading-tight ${pkg.popular ? 'text-gray-800 font-bold' : 'text-gray-600 font-medium'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/contact?package=${pkg.id}`}
                className={`w-full font-bold transition-all touch-target flex items-center justify-center ${
                  pkg.popular
                    ? 'py-3.5 sm:py-4 rounded-xl bg-primary text-white font-black text-sm sm:text-base hover:bg-primary-hover shadow-lg shadow-green-200 active:scale-95'
                    : 'py-3 sm:py-3.5 rounded-xl border-2 border-primary text-primary text-sm sm:text-base hover:bg-primary hover:text-white active:scale-95'
                }`}
              >
                {pkg.popular ? 'Заказать праздник' : 'Выбрать'}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
