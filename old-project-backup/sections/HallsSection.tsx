import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Baby, Rocket, Sparkles, ChevronLeft, ChevronRight, Loader2, Star, Heart, Users } from 'lucide-react'
import { useActiveHalls } from '../../hooks/useHalls'

interface HallsSectionProps {
  onBookingClick: () => void
}

// Маппинг иконок
const iconMap: Record<string, any> = {
  Baby,
  Rocket,
}

export function HallsSection({ onBookingClick }: HallsSectionProps) {
  const { data: halls, isLoading, error } = useActiveHalls()
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({
    '0+': 0,
    '7+': 0
  })

  const handlePrevImage = (hallId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [hallId]: prev[hallId] === 0 ? totalImages - 1 : prev[hallId] - 1
    }))
  }

  const handleNextImage = (hallId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [hallId]: prev[hallId] === totalImages - 1 ? 0 : prev[hallId] + 1
    }))
  }

  // Состояния загрузки и ошибок
  if (isLoading) {
    return (
      <section id="halls" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Загружаем информацию о залах...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="halls" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center min-h-[400px] flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ошибка загрузки</h3>
              <p className="text-gray-600">Не удалось загрузить информацию о залах. Пожалуйста, обновите страницу.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!halls || halls.length === 0) {
    return null
  }

  return (
    <section id="halls" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              🏠 Выберите свой зал
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 bg-clip-text text-transparent">
            Наши залы
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Два уникальных пространства, продуманных до мелочей для комфорта и безопасности детей разных возрастов
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {halls.map((hall, index) => {
            const currentIndex = currentImageIndex[hall.id] || 0
            const isRose = hall.color === 'rose'
            return (
              <Card 
                key={hall.id} 
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up ${
                  isRose 
                    ? 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200/50' 
                    : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/50'
                } backdrop-blur-sm relative`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Image Carousel */}
                <div className="relative h-56 sm:h-72 group overflow-hidden">
                  <img
                    src={hall.images[currentIndex]}
                    alt={`${hall.name} - фото ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-6 left-6 p-3 rounded-2xl shadow-lg ${
                    isRose 
                      ? 'bg-gradient-to-br from-rose-400 to-pink-500' 
                      : 'bg-gradient-to-br from-emerald-400 to-teal-500'
                  }`}>
                    {(() => {
                      const IconComponent = iconMap[hall.icon] || Sparkles
                      return <IconComponent className="w-7 h-7 text-white" />
                    })()}
                  </div>

                  {/* Age Badge */}
                  <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                    isRose 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  }`}>
                    {hall.ageGroup}
                  </div>

                  {/* Carousel Navigation */}
                  {hall.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrevImage(hall.id, hall.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                        aria-label="Предыдущее фото"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleNextImage(hall.id, hall.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                        aria-label="Следующее фото"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                      
                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {hall.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              idx === currentIndex 
                                ? 'bg-white w-6 shadow-lg' 
                                : 'bg-white/50 w-2 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <CardHeader className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {hall.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold mt-2 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-gray-500" />
                        {hall.ageGroup} • {hall.area}
                      </CardDescription>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed mb-4">{hall.description}</p>
                  <div className="flex items-center justify-between">
                    <p className={`text-lg font-bold ${
                      isRose ? 'text-rose-600' : 'text-emerald-600'
                    }`}>
                      {hall.price}
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 sm:p-8 pt-0">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <Sparkles className={`w-6 h-6 mr-3 ${
                          isRose ? 'text-rose-500' : 'text-emerald-500'
                        }`} />
                        Особенности зала
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {hall.features.map((feature, index) => (
                          <div key={index} className="flex items-start text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                              isRose 
                                ? 'bg-gradient-to-r from-rose-400 to-pink-500' 
                                : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                            }`}>
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span className="leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={onBookingClick}
                        className={`flex-1 h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                          isRose 
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600' 
                            : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                        }`}
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        Забронировать
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}