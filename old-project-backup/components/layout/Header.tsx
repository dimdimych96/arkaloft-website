import React from 'react'
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react'
import { Button } from '../ui/button'

interface HeaderProps {
  onBookingClick: () => void
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('home')

  // Track scroll position to highlight active navigation item
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'halls', 'packages', 'reviews', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white/95 header-glass header-shadow sticky top-0 z-50 border-b border-emerald-100 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <div className="flex items-center">
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                АРКА
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'halls', label: 'Залы' },
              { id: 'packages', label: 'Пакеты' },
              { id: 'reviews', label: 'Отзывы' },
              { id: 'contact', label: 'Контакты' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`header-nav-button px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
                aria-label={`Перейти к разделу ${item.label}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Info & Booking Button */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+79830012520" 
                className="flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200 hover:scale-105"
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-medium">+7 983 001 25 20</span>
              </a>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="font-medium">10:00-22:00</span>
              </div>
            </div>
            <Button 
              onClick={onBookingClick} 
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Забронировать
            </Button>
          </div>

          {/* Mobile contact info */}
          <div className="md:hidden flex items-center space-x-3">
            <a 
              href="tel:+79830012520" 
              className="flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                <Phone className="h-3 w-3" />
              </div>
              <span className="hidden xs:inline font-medium">+7 983 001 25 20</span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-emerald-50 transition-colors"
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-emerald-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden py-4 border-t border-emerald-100 bg-gradient-to-b from-white to-emerald-50/30 mobile-menu-enter">
            <nav className="flex flex-col space-y-2">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'halls', label: 'Залы' },
                { id: 'packages', label: 'Пакеты' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'contact', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`header-nav-button px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                  aria-label={`Перейти к разделу ${item.label}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-emerald-100 space-y-3">
                <a 
                  href="tel:+79830012520" 
                  className="flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium">+7 983 001 25 20</span>
                </a>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="font-medium">10:00-22:00</span>
                </div>
                <Button 
                  onClick={onBookingClick} 
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold w-full py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Забронировать
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}