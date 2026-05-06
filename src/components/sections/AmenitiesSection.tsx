import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const AmenitiesSection = () => {
  const amenities = [
    { icon: 'local_cafe', text: 'Чай & Кофе', description: 'Бесплатно для всех гостей', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: 'kitchen', text: 'Кухня', description: 'Микроволновка, холодильник', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: 'restaurant', text: 'Посуда', description: 'Всё необходимое на месте', color: 'text-pink-500', bg: 'bg-pink-50' },
    { icon: 'cleaning_services', text: 'Уборка', description: 'Мы всё уберём после вас', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: 'wifi', text: 'Wi-Fi', description: 'Быстрый интернет', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: 'music_note', text: 'Музыка', description: 'Колонки и караоке', color: 'text-red-500', bg: 'bg-red-50' }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Wave top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-mint/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 font-heading mb-4">
            Всё для вашего комфорта
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Мы продумали каждую мелочь, чтобы вы могли просто наслаждаться праздником
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {amenities.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className={`size-16 sm:size-20 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className={`material-symbols-outlined text-3xl sm:text-4xl ${item.color}`}>{item.icon}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2 font-heading">
                {item.text}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <span className="material-symbols-outlined text-primary">check_circle</span>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              И это всё бесплатно включено в аренду!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
