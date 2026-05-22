import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <>
      <SEO
        title="Страница не найдена"
        description="Запрашиваемая страница не существует"
        noindex
      />

      <div className="min-h-screen bg-gradient-to-br from-secondary-mint/20 via-secondary-peach/20 to-secondary-yellow/20 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="inline-block"
            >
              <h1 className="text-[180px] md:text-[240px] font-black leading-none bg-gradient-to-br from-primary via-secondary-peach to-secondary-yellow bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Упс! Страница потерялась
            </h2>

            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Похоже, эта страница улетела на праздник и забыла вернуться. Но не переживайте — у нас есть много других интересных мест!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  На главную
                </motion.button>
              </Link>

              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Наши услуги
                </motion.button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto"
            >
              <Link
                to="/"
                className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow group flex flex-col items-center"
              >
                <span className="material-symbols-outlined text-4xl text-primary mb-2 group-hover:scale-110 transition-transform">
                  home
                </span>
                <p className="text-sm font-medium text-gray-700">Главная</p>
              </Link>

              <Link
                to="/services"
                className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow group flex flex-col items-center"
              >
                <span className="material-symbols-outlined text-4xl text-secondary-peach mb-2 group-hover:scale-110 transition-transform">
                  celebration
                </span>
                <p className="text-sm font-medium text-gray-700">Услуги</p>
              </Link>

              <Link
                to="/reviews"
                className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow group flex flex-col items-center"
              >
                <span className="material-symbols-outlined text-4xl text-secondary-yellow mb-2 group-hover:scale-110 transition-transform">
                  star
                </span>
                <p className="text-sm font-medium text-gray-700">Отзывы</p>
              </Link>

              <Link
                to="/contact"
                className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow group flex flex-col items-center"
              >
                <span className="material-symbols-outlined text-4xl text-purple-500 mb-2 group-hover:scale-110 transition-transform">
                  phone
                </span>
                <p className="text-sm font-medium text-gray-700">Контакты</p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
