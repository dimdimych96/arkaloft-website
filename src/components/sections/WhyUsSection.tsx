import { motion } from 'framer-motion';
import { features } from '../../data/siteData';

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

export const WhyUsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-background-subtle border-y-2 border-dashed border-secondary-mint/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex justify-between items-end">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black text-gray-800 font-heading"
        >
          Почему мы крутые?
        </motion.h2>
        <div className="md:hidden flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-primary/10" aria-hidden="true">
          <span className="material-symbols-outlined text-xs animate-bounce-x">arrow_forward</span>
          Листайте
        </div>
        <span className="hidden md:flex text-xs sm:text-sm font-bold text-primary items-center gap-1" aria-hidden="true">
          Листай <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
        </span>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 px-3 sm:px-6 lg:px-8 no-scrollbar snap-x"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={itemVariants} className="snap-center shrink-0 w-64 sm:w-72 bg-white p-4 sm:p-6 rounded-[2rem] shadow-soft border border-green-50 flex flex-col items-center text-center">
            <div className={`size-14 sm:size-16 ${feature.bg} rounded-full flex items-center justify-center ${feature.color} mb-3 sm:mb-4 shadow-inner`}>
              <span className="material-symbols-outlined text-2xl sm:text-3xl" aria-hidden="true">{feature.icon}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-gray-800 mb-2 font-heading">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
