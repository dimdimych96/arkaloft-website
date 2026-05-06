import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { useActiveServices } from '../../hooks/useServices';

export const ServicesSection = () => {
  const { data: services, isLoading, error } = useActiveServices();

  // Разделение услуг по категориям
  const mainServices = services?.filter(service => service.category === 'main') || [];
  const additionalServices = services?.filter(service => service.category === 'additional') || [];
  const showServices = services?.filter(service => service.category === 'show') || [];
  const animatorServices = services?.filter(service => service.category === 'animator') || [];

  // Состояния загрузки и ошибок
  if (isLoading) {
    return (
      <section id="services" className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center text-red-600 text-sm sm:text-base">
            Ошибка загрузки данных. Пожалуйста, обновите страницу.
          </div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Дополнительные услуги
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Сделайте ваш праздник еще более незабываемым с нашими дополнительными услугами и шоу-программами
          </p>
        </div>

        {/* Аниматоры */}
        {animatorServices.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Аниматоры
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {animatorServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden mb-3 aspect-square">
                    {service.imageUrl ? (
                      <img
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={service.imageUrl}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-orange-500">face</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                  </div>
                  <h3 className="text-sm font-black text-gray-800 text-center mb-1">{service.name}</h3>
                  {service.price && (
                    <p className="text-xs text-primary font-bold text-center">₽{service.price.toLocaleString()}/час</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Шоу-программы */}
        {showServices.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Шоу-программы
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {showServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative rounded-xl overflow-hidden mb-4 h-48">
                    {service.imageUrl ? (
                      <img
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={service.imageUrl}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-purple-500">celebration</span>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg mb-2">{service.name}</CardTitle>
                    <CardDescription className="text-sm mb-3">{service.description}</CardDescription>
                    {service.price && (
                      <div className="text-primary font-bold">от ₽{service.price.toLocaleString()}</div>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Основные услуги */}
        {mainServices.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Основные услуги
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {mainServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-${service.color}-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <span className={`material-symbols-outlined text-3xl text-${service.color}-600`}>{service.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-sm mb-3">{service.description}</CardDescription>
                        {service.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                              ₽{service.price.toLocaleString()}
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
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {additionalServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-${service.color}-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <span className={`material-symbols-outlined text-3xl text-${service.color}-600`}>{service.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-sm mb-3">{service.description}</CardDescription>
                        {service.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                              ₽{service.price.toLocaleString()}
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

        {/* Статичные шоу-программы (если нет данных в БД) */}
        {showServices.length === 0 && (
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-100">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-primary">celebration</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Другие шоу-программы
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Узнайте о всех доступных развлечениях для вашего праздника
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
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
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors duration-300"
                  >
                    <span className="text-2xl">{show.icon}</span>
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
        )}
      </div>
    </section>
  );
};
