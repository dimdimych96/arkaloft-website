import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { PRICES } from '../../data/prices';

const features = [
  {
    icon: 'home_work',
    title: 'В аренду входит',
    items: [
      'Посуда на 12 взрослых и 12 детей',
      'Музыкальное сопровождение',
      'Чай, сахар, кулер',
      'Микроволновка, батут',
      'Монитор для фото/видео'
    ],
    color: 'emerald',
    bgGradient: 'from-emerald-50 to-teal-50'
  },
  {
    icon: 'celebration',
    title: 'Дополнительные услуги',
    items: [
      'Аниматоры и ведущие',
      'Фотограф и видеограф',
      'Аквагрим и мастер-классы',
      'Серебряное шоу',
      'Крио шоу с мороженым'
    ],
    color: 'teal',
    bgGradient: 'from-cyan-50 to-blue-50'
  },
  {
    icon: 'palette',
    title: 'Оформление',
    items: [
      'Фотозоны под ключ',
      'Кенди бар',
      `Гелиевые шары от ${PRICES.decor.balloonClassic}₽`,
      'Тематические декорации',
      'Оформление на выезд'
    ],
    color: 'orange',
    bgGradient: 'from-orange-50 to-pink-50'
  },
  {
    icon: 'groups',
    title: 'Наши преимущества',
    items: [
      'Два уникальных зала для детей 0+ и 7+',
      'Творческая атмосфера с экологичными материалами',
      'Высокие потолки и арочные окна',
      'Мебель ручной работы'
    ],
    color: 'purple',
    bgGradient: 'from-purple-50 to-indigo-50'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-primary to-teal-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              ✨ Почему выбирают нас
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 bg-clip-text text-transparent">
            Всё для вашего праздника
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Мы создали особенное место с уникальным интерьером, где каждый праздник становится незабываемым
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-6 sm:p-8 border-2 border-${feature.color}-200/50 hover:border-${feature.color}-300 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm relative overflow-hidden animate-fade-in-up`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Декоративный фон */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10"></div>

              <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h3>

              <ul className="space-y-3">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-primary to-teal-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover эффект */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 sm:p-8 border border-emerald-200/50 shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-yellow-400 text-xl">star</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Рекомендуем бронировать праздник за 1-2 месяца, чтобы выбрать желаемую дату
            </p>
            <a
              href="https://wa.me/79830012520"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="material-symbols-outlined">coffee</span>
              Записаться на экскурсию с кофе
              <span className="material-symbols-outlined">favorite</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
