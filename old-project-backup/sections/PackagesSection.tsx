import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Check, Star, Crown, Gift, Sparkles, Loader2 } from 'lucide-react'
import { useActivePackages } from '../../hooks/usePackages'
import { useState } from 'react'

interface PackagesSectionProps {
  onBookingClick: () => void
}

// Типизированный маппинг иконок
type IconComponent = typeof Gift | typeof Crown | typeof Star | typeof Sparkles

const iconMap: Record<string, IconComponent> = {
  Gift,
  Crown,
  Star,
  Sparkles,
}

export function PackagesSection({ onBookingClick }: PackagesSectionProps) {
  const { data: packages, isLoading, error } = useActivePackages()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({})

  // Обработка ошибок изображений
  const handleImageError = (packageId: string) => {
    setImageErrors(prev => ({ ...prev, [packageId]: true }))
    setImageLoading(prev => ({ ...prev, [packageId]: false }))
  }

  // Обработка загрузки изображений
  const handleImageLoad = (packageId: string) => {
    setImageLoading(prev => ({ ...prev, [packageId]: false }))
  }

  const handleImageStart = (packageId: string) => {
    setImageLoading(prev => ({ ...prev, [packageId]: true }))
  }

  // Получение URL изображения с fallback
  const getImageUrl = (pkg: any) => {
    if (imageErrors[pkg.id]) {
      return '/images/packages/default.webp'
    }
    return pkg.imageUrl || '/images/packages/min.webp'
  }

  // Проверка на выходные дни
  const isWeekend = () => {
    const today = new Date()
    const day = today.getDay()
    return day === 0 || day === 6 // Воскресенье или суббота
  }

  // Состояния загрузки и ошибок
  if (isLoading) {
    return (
      <section id="packages" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
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
      <section id="packages" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Ошибка загрузки данных. Пожалуйста, обновите страницу.
          </div>
        </div>
      </section>
    )
  }

  if (!packages || packages.length === 0) {
    return null
  }

  return (
    <section id="packages" className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50 relative overflow-hidden">
      {/* Decorative elements - скрыты на мобильных для лучшей производительности */}
      <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="hidden sm:block absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              🎉 Специальные предложения
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Пакеты услуг
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-4">
            Выберите подходящий пакет для вашего праздника. Все пакеты включают экологически чистые материалы и безопасную среду
          </p>
          
          {/* Urgency banner - адаптивный для мобильных */}
          <div className="mt-4 sm:mt-6 inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg animate-pulse max-w-full">
            <span className="text-lg sm:text-2xl animate-bounce flex-shrink-0">⚡</span>
            <p className="text-xs sm:text-sm md:text-base text-orange-900 font-semibold leading-tight">
              <span className="hidden sm:inline">Ограниченное предложение! Осталось только </span>
              <span className="sm:hidden">Осталось только </span>
              <span className="text-red-600 font-bold">3 слота</span>
              <span className="hidden sm:inline"> на эти выходные</span>
            </p>
          </div>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr"
          role="list"
          aria-label="Пакеты услуг"
        >
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`package-card relative overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col group animate-fade-in-up ${
                pkg.popular ? 'ring-2 ring-emerald-500 md:scale-105 shadow-lg' : 'md:hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              role="listitem"
              aria-labelledby={`package-title-${pkg.id}`}
              tabIndex={0}
            >
              {pkg.popular && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-emerald-500 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium z-10">
                  Популярный
                </div>
              )}

              <div className="relative h-32 sm:h-40 md:h-48">
                {imageLoading[pkg.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
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
                  onLoadStart={() => handleImageStart(pkg.id)}
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded-lg bg-white/90 backdrop-blur-sm">
                  {(() => {
                    const IconComponent = iconMap[pkg.icon || 'Gift'] || Gift
                    return <IconComponent className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                  })()}
                </div>
              </div>

              <CardHeader className="text-center p-3 sm:p-4 md:p-6">
                <CardTitle 
                  id={`package-title-${pkg.id}`}
                  className="text-lg sm:text-xl md:text-2xl group-hover:text-emerald-600 transition-colors duration-300 leading-tight"
                >
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base min-h-[2.5rem] sm:min-h-[3rem] leading-relaxed">{pkg.description}</CardDescription>
                <div className="mt-4 package-pricing">
                  {isWeekend() && pkg.priceWeekend ? (
                    <div className="package-pricing-weekend">
                      <div className="price-line">
                        <span className="text-base sm:text-lg text-gray-400 line-through">₽{pkg.price.toLocaleString()}</span>
                        <span className="text-2xl sm:text-3xl font-bold text-emerald-600">₽{pkg.priceWeekend.toLocaleString()}</span>
                      </div>
                      <div className="badge-line">
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                          Выходные
                        </span>
                        <span className="text-sm sm:text-base text-gray-600">/ {pkg.duration}ч</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl sm:text-4xl font-bold text-emerald-600">₽{pkg.price.toLocaleString()}</span>
                      <span className="text-base sm:text-lg text-gray-600 ml-2">/ {pkg.duration} часа</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 md:p-6 pt-0 flex-1 flex flex-col justify-between">
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  {pkg.includedItems.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={onBookingClick}
                  className={`w-full transition-all duration-300 transform hover:scale-105 ${
                    pkg.popular 
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-200' 
                      : 'bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-gray-200'
                  } h-10 sm:h-11 text-xs sm:text-sm md:text-base`}
                  aria-label={`Выбрать пакет ${pkg.name}`}
                >
                  <span className="flex items-center justify-center gap-1 sm:gap-2">
                    Выбрать пакет
                    <span className="text-sm sm:text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">Нужно что-то особенное?</p>
          <Button variant="outline" size="lg" onClick={onBookingClick} className="h-10 sm:h-11 text-xs sm:text-sm md:text-base px-4 sm:px-6">
            Создать индивидуальный пакет
          </Button>
        </div>
      </div>
    </section>
  )
}