import { motion } from 'framer-motion';
import { features } from '../../data/siteData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export const WhyUsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-secondary-mint/10 to-secondary-yellow/5 relative overflow-hidden">
      {/* Wave top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-mint/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 font-heading mb-3">
            Почему мы крутые?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Мы создаём незабываемые события с душой и вниманием к деталям
          </p>
        </motion.div>

        {/* Mobile: 2-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:hidden grid grid-cols-2 gap-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${feature.bg} p-3.5 sm:p-4 rounded-2xl shadow-lg border-2 border-white/50 backdrop-blur-sm flex flex-col items-center text-center h-full`}
            >
              <div className={`size-12 sm:size-14 bg-white rounded-xl flex items-center justify-center ${feature.color} mb-3 shadow-md`}>
                <span className="material-symbols-outlined text-2xl font-bold" aria-hidden="true">{feature.icon}</span>
              </div>
              <h3 className="text-sm font-black text-gray-900 mb-1.5 font-heading leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop: 3-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`${feature.bg} p-6 rounded-3xl shadow-xl border-2 border-white/50 backdrop-blur-sm flex flex-col items-center text-center h-full`}
            >
              <div className={`size-16 bg-white rounded-2xl flex items-center justify-center ${feature.color} mb-4 shadow-lg`}>
                <span className="material-symbols-outlined text-3xl font-bold" aria-hidden="true">{feature.icon}</span>
              </div>
              <h3 className="text-base font-black text-gray-900 mb-2 font-heading">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {feature.description}
              </p>
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
