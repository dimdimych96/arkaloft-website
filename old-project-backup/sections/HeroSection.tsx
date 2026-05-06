import { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Calendar, Star, Users, Coffee, Sparkles, Eye } from 'lucide-react'
import { VirtualTourModal } from '../modals/VirtualTourModal'

interface HeroSectionProps {
  onBookingClick: () => void
}

export function HeroSection({ onBookingClick }: HeroSectionProps) {
  const [isTourOpen, setIsTourOpen] = useState(false)
  
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Уникальное пространство для детских праздников</span>
            <span className="sm:hidden">Уникальное пространство</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Эко-лофт
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              АРКА
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Создаем незабываемые моменты детства в экологичном пространстве с душой
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button 
              onClick={onBookingClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto h-14 sm:h-16 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Забронировать праздник</span>
              <span className="sm:hidden">Забронировать</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <button
              onClick={() => setIsTourOpen(true)}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold text-emerald-700 bg-white border-2 border-emerald-200 hover:border-emerald-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto h-14 sm:h-16"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Виртуальная экскурсия</span>
              <span className="sm:hidden">Экскурсия</span>
            </button>
          </div>
        </div>

        {/* Улучшенная Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Площадь */}
          <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-emerald-200">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight group-hover:text-emerald-700 transition-colors">135</div>
            <div className="text-xs sm:text-sm text-gray-600 group-hover:text-emerald-700 transition-colors">кв.м площадь</div>
          </div>
          {/* Залы */}
          <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-teal-200">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 group-hover:text-teal-700 transition-colors" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight group-hover:text-teal-700 transition-colors">2</div>
            <div className="text-xs sm:text-sm text-gray-600 group-hover:text-teal-700 transition-colors">уникальных зала</div>
          </div>
          {/* Аниматоры */}
          <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-orange-200">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600 group-hover:text-orange-700 transition-colors" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight group-hover:text-orange-700 transition-colors">50+</div>
            <div className="text-xs sm:text-sm text-gray-600 group-hover:text-orange-700 transition-colors">аниматоров</div>
          </div>
          {/* Довольные семьи */}
          <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-purple-200">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <Coffee className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 group-hover:text-purple-700 transition-colors" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight group-hover:text-purple-700 transition-colors">100+</div>
            <div className="text-xs sm:text-sm text-gray-600 group-hover:text-purple-700 transition-colors">довольных семей</div>
          </div>
        </div>


      </div>
      
      <VirtualTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
    </section>
  )
}