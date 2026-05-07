import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Check } from 'lucide-react';
import { services, serviceCategories, Service } from '../data/services';

interface SelectedService extends Service {
  quantity: number;
}

interface PackageBuilderProps {
  onComplete: (selectedServices: SelectedService[], totalPrice: number) => void;
}

export const PackageBuilder = ({ onComplete }: PackageBuilderProps) => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);

  // Вычисляем общую стоимость
  const totalPrice = useMemo(() => {
    return selectedServices.reduce((sum, service) => {
      const price = typeof service.price === 'number' ? service.price : 0;
      return sum + (price * service.quantity);
    }, 0);
  }, [selectedServices]);

  // Автоматически обновляем родительский компонент при изменении выбора
  useEffect(() => {
    onComplete(selectedServices, totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, totalPrice]);

  // Добавить/удалить услугу (toggle)
  const toggleService = (service: Service) => {
    const existing = selectedServices.find(s => s.id === service.id);

    if (existing) {
      // Удаляем услугу
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else {
      // Добавляем услугу с количеством 1
      setSelectedServices(prev => [...prev, { ...service, quantity: 1 }]);
    }
  };

  // Удалить услугу
  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };

  // Проверить, выбрана ли услуга
  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId);
  };

  // Фильтр услуг по категории
  const filteredServices = services.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Категории */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {serviceCategories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all
                ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Список услуг */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        {filteredServices.map((service) => {
          const isSelected = isServiceSelected(service.id);

          return (
            <div
              key={service.id}
              className={`
                p-4 rounded-xl border-2 transition-all cursor-pointer
                ${isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-100 bg-white hover:border-gray-200'
                }
              `}
              onClick={() => toggleService(service)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
                    {service.name}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-primary font-black text-sm sm:text-base">
                      {typeof service.price === 'number' ? `${service.price.toLocaleString('ru-RU')} ₽` : service.price}
                    </span>
                    {service.unit && (
                      <span className="text-xs text-gray-500">/ {service.unit}</span>
                    )}
                  </div>
                  {service.priceDetails && (
                    <p className="text-xs text-gray-500 mt-1">{service.priceDetails}</p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-center">
                  <div
                    className={`
                      w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                      ${isSelected
                        ? 'bg-primary border-primary'
                        : 'border-gray-300 bg-white'
                      }
                    `}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Корзина (фиксированная внизу на мобильных) */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 p-4 rounded-t-2xl shadow-lg"
          >
            <div className="space-y-3">
              {/* Выбранные услуги */}
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 flex-1">
                      <button
                        type="button"
                        onClick={() => removeService(service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {(typeof service.price === 'number' ? service.price : 0).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}
              </div>

              {/* Итого */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span className="font-black text-lg text-gray-900">Итого:</span>
                </div>
                <span className="font-black text-2xl text-primary">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
