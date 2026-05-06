import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useActivePackages } from '../../hooks/usePackages';

interface PackagesSectionProps {
  onBookingClick?: () => void;
}

export const PackagesSection = ({ onBookingClick }: PackagesSectionProps) => {
  const { data: packages, isLoading, error } = useActivePackages();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  // Обработка ошибок изображений
  const handleImageError = (packageId: string) => {
    setImageErrors(prev => ({ ...prev, [packageId]: true }));
    setImageLoading(prev => ({ ...prev, [packageId]: false }));
  };

  // Обработка загрузки изображений
  const handleImageLoad = (packageId: string) => {
    setImageLoading(prev => ({ ...prev, [packageId]: false }));
  };

  // Получение URL изображения с fallback
  const getImageUrl = (pkg: any) => {
    if (imageErrors[pkg.id]) {
      return '/images/packages/default.webp';
    }
    return pkg.imageUrl || '/images/packages/min.webp';
  };

  // Проверка на выходные дни
  const isWeekend = () => {
    const today = new Date();
    const day = today.getDay();
    return day === 0 || day === 6;
  };

  // Состояния загрузки и ошибок
  if (isLoading) {
    return (
      <section id="packages" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
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
      <section id="packages" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Ошибка загрузки данных. Пожалуйста, обновите страницу.
          </div>
        </div>
      </section>
    );
  }

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="hidden sm:block absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-teal-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              🎉 Специальные предложения
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Пакеты услуг
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            Выберите подходящий пакет для вашего праздника. Все пакеты включают экологически чистые материалы и безопасную среду
          </p>

          {/* Urgency banner */}
          <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 px-4 sm:px-6 py-3 rounded-full shadow-lg animate-pulse max-w-full">
            <span className="text-lg sm:text-2xl animate-bounce flex-shrink-0">⚡</span>
            <p className="text-xs sm:text-sm text-orange-900 font-semibold leading-tight">
              <span className="hidden sm:inline">Ограниченное предложение! Осталось только </span>
              <span className="sm:hidden">Осталось только </span>
              <span className="text-red-600 font-bold">3 слота</span>
              <span className="hidden sm:inline"> на эти выходные</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col group animate-fade-in-up ${
                pkg.popular ? 'ring-2 ring-primary md:scale-105 shadow-lg' : 'md:hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                  Популярный
                </div>
              )}

              <div className="relative h-32 sm:h-40 md:h-48">
                {imageLoading[pkg.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <span className="material-symbols-outlined text-3xl animate-spin text-primary">progress_activity</span>
                  </div>
                )}
                <img
                  src={getImageUrl(pkg)}
                  alt={`${pkg.name} - пакет услуг`}
                  className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
                    imageLoading[pkg.id] ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(pkg.id)}
                  onError={() => handleImageError(pkg.id)}
                />
                <div className="absolute top-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-xl text-primary">{pkg.icon || 'celebration'}</span>
                </div>
              </div>

              <CardHeader className="text-center p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300 leading-tight">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm leading-relaxed">{pkg.description}</CardDescription>
                <div className="mt-4">
                  {isWeekend() && pkg.priceWeekend ? (
                    <div>
                      <div className="text-sm text-gray-400 line-through">₽{pkg.price.toLocaleString()}</div>
                      <div className="text-2xl sm:text-3xl font-bold text-primary">₽{pkg.priceWeekend.toLocaleString()}</div>
                      <div className="mt-1">
                        <Badge variant="warning" size="sm">Выходные</Badge>
                        <span className="text-sm text-gray-600 ml-2">/ {pkg.duration}ч</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl sm:text-4xl font-bold text-primary">₽{pkg.price.toLocaleString()}</span>
                      <span className="text-base text-gray-600 ml-2">/ {pkg.duration} часа</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-0 flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-4">
                  {pkg.includedItems.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">check_circle</span>
                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onBookingClick}
                  className={`w-full transition-all duration-300 transform hover:scale-105 ${
                    pkg.popular
                      ? 'bg-primary hover:bg-primary-hover shadow-lg hover:shadow-primary/20'
                      : 'bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-gray-200'
                  }`}
                >
                  Выбрать пакет
                  <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-gray-600 mb-4">Нужно что-то особенное?</p>
          <Button
            variant="outline"
            size="lg"
            onClick={onBookingClick}
            className="h-12 px-6"
          >
            Создать индивидуальный пакет
          </Button>
        </div>
      </div>
    </section>
  );
};
