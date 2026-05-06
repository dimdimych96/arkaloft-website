import { Coffee, Home, Sparkles, Camera, Users, Star, Heart } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Home,
      title: 'В аренду входит',
      items: [
        'Посуда на 12 взрослых и 12 детей',
        'Музыкальное сопровождение',
        'Чай, сахар, кулер',
        'Микроволновка, батут',
        'Монитор для фото/видео'
      ],
      color: 'emerald',
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      icon: Sparkles,
      title: 'Дополнительные услуги',
      items: [
        'Аниматоры и ведущие',
        'Фотограф и видеограф',
        'Аквагрим и мастер-классы',
        'Серебряное шоу',
        'Крио шоу с мороженым'
      ],
      color: 'teal',
      gradient: 'from-cyan-400 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-50'
    },
    {
      icon: Camera,
      title: 'Оформление',
      items: [
        'Фотозоны под ключ',
        'Кенди бар',
        'Гелиевые шары от 150₽',
        'Тематические декорации',
        'Оформление на выезд'
      ],
      color: 'orange',
      gradient: 'from-orange-400 to-pink-500',
      bgGradient: 'from-orange-50 to-pink-50'
    },
    {
      icon: Users,
      title: 'Наши преимущества',
      items: [
        'Два уникальных зала для детей 0+ и 7+',
        'Творческая атмосфера с экологичными материалами',
        'Высокие потолки и арочные окна',
        'Мебель ручной работы',
        'Вкусный кофе для родителей ☕'
      ],
      color: 'purple',
      gradient: 'from-purple-400 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
    }
  ]

  const getColorClasses = (color: string, gradient: string, bgGradient: string) => {
    const colors = {
      emerald: {
        bg: `bg-gradient-to-br ${bgGradient}`,
        icon: `bg-gradient-to-br ${gradient} text-white shadow-lg`,
        border: 'border-emerald-200/50',
        hover: 'hover:border-emerald-300 hover:shadow-2xl',
        shadow: 'shadow-emerald-100'
      },
      teal: {
        bg: `bg-gradient-to-br ${bgGradient}`,
        icon: `bg-gradient-to-br ${gradient} text-white shadow-lg`,
        border: 'border-cyan-200/50',
        hover: 'hover:border-cyan-300 hover:shadow-2xl',
        shadow: 'shadow-cyan-100'
      },
      orange: {
        bg: `bg-gradient-to-br ${bgGradient}`,
        icon: `bg-gradient-to-br ${gradient} text-white shadow-lg`,
        border: 'border-orange-200/50',
        hover: 'hover:border-orange-300 hover:shadow-2xl',
        shadow: 'shadow-orange-100'
      },
      purple: {
        bg: `bg-gradient-to-br ${bgGradient}`,
        icon: `bg-gradient-to-br ${gradient} text-white shadow-lg`,
        border: 'border-purple-200/50',
        hover: 'hover:border-purple-300 hover:shadow-2xl',
        shadow: 'shadow-purple-100'
      }
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              ✨ Почему выбирают нас
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 bg-clip-text text-transparent">
            Всё для вашего праздника
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Мы создали особенное место с уникальным интерьером, где каждый праздник становится незабываемым
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color, feature.gradient, feature.bgGradient)
            return (
              <div
                key={index}
                className={`group ${colors.bg} rounded-3xl p-8 border-2 ${colors.border} ${colors.hover} transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${colors.shadow} backdrop-blur-sm relative overflow-hidden animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Декоративный фон */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                
                <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                
                <ul className="space-y-3">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover эффект */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200/50 shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Рекомендуем бронировать праздник за 1-2 месяца, чтобы выбрать желаемую дату
            </p>
            <a
              href="https://wa.me/79830012520"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Coffee className="w-6 h-6" />
              Записаться на экскурсию с кофе
              <Heart className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
