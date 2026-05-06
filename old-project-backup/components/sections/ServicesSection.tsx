import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Sparkles, Camera, Palette, Users, Cake, PartyPopper, Zap, Snowflake, Loader2 } from 'lucide-react'
import { useActiveServices } from '../../hooks/useServices'

// Типизированный маппинг иконок
type IconComponent = typeof Users | typeof Camera | typeof Palette | typeof Snowflake | 
                    typeof Sparkles | typeof PartyPopper | typeof Zap | typeof Cake

const iconMap: Record<string, IconComponent> = {
  Users,
  Camera,
  Palette,
  Snowflake,
  Sparkles,
  PartyPopper,
  Zap,
  Cake,
}

export function ServicesSection() {
  const { data: services, isLoading, error } = useActiveServices()

  // Разделение услуг по категориям
  const mainServices = services?.filter(service => service.category === 'main') || []
  const additionalServices = services?.filter(service => service.category === 'additional') || []

  // Состояния загрузки и ошибок
  if (isLoading) {
    return (
      <section id="services" className="py-12 md:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="services" className="py-12 md:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Ошибка загрузки данных. Пожалуйста, обновите страницу.
          </div>
        </div>
      </section>
    )
  }

  if (!services || services.length === 0) {
    return null
  }

  return (
    <section id="services" className="py-12 md:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Дополнительные услуги
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Сделайте ваш праздник еще более незабываемым с нашими дополнительными услугами и шоу-программами
          </p>
        </div>

        {/* Основные услуги */}
        {mainServices.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Основные услуги
            </h3>
            <div 
              className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
              role="list"
              aria-label="Основные услуги"
            >
              {mainServices.map((service, index) => (
                <Card 
                  key={service.id} 
                  className="service-card group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  role="listitem"
                  aria-labelledby={`service-title-${service.id}`}
                  tabIndex={0}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-${service.color}-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {(() => {
                          const IconComponent = iconMap[service.icon] || Sparkles
                          return <IconComponent className={`w-8 h-8 text-${service.color}-600`} aria-hidden="true" />
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle 
                          id={`service-title-${service.id}`}
                          className="text-lg sm:text-xl mb-2 group-hover:text-emerald-600 transition-colors duration-300"
                        >
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-sm mb-3">{service.description}</CardDescription>
                        {service.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-emerald-600">
                              ₽{service.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {service.category === 'main' ? 'Основная' : 'Дополнительная'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Дополнительные услуги */}
        {additionalServices.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Дополнительные услуги
            </h3>
            <div 
              className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
              role="list"
              aria-label="Дополнительные услуги"
            >
              {additionalServices.map((service, index) => (
                <Card 
                  key={service.id} 
                  className="service-card group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${(mainServices.length + index) * 100}ms` }}
                  role="listitem"
                  aria-labelledby={`service-title-${service.id}`}
                  tabIndex={0}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-${service.color}-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {(() => {
                          const IconComponent = iconMap[service.icon] || Sparkles
                          return <IconComponent className={`w-8 h-8 text-${service.color}-600`} aria-hidden="true" />
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle 
                          id={`service-title-${service.id}`}
                          className="text-lg sm:text-xl mb-2 group-hover:text-emerald-600 transition-colors duration-300"
                        >
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-sm mb-3">{service.description}</CardDescription>
                        {service.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-emerald-600">
                              ₽{service.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {service.category === 'main' ? 'Основная' : 'Дополнительная'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Статичные шоу-программы */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-100">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Другие шоу-программы
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Узнайте о всех доступных развлечениях для вашего праздника
            </p>
            <div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left"
              role="list"
              aria-label="Доступные шоу-программы"
            >
              {[
                { name: 'Поролоновое шоу', icon: '🎭' },
                { name: 'Шоу мыльных пузырей', icon: '🫧' },
                { name: 'Научное шоу', icon: '🧪' },
                { name: 'Шоу трансформеров', icon: '🤖' },
                { name: 'Цирковое шоу', icon: '🎪' },
                { name: 'Фокусная программа', icon: '🎩' }
              ].map((show, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors duration-300 group"
                  role="listitem"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {show.icon}
                  </span>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    {show.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-100">
              <p className="text-xs text-gray-500">
                💡 Все программы адаптированы под возраст детей и включают безопасные материалы
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
