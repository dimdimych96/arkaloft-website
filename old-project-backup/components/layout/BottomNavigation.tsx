import React from 'react'
import { Home, Building2, Package, MessageSquare, Phone } from 'lucide-react'
import { cn } from '../../lib/utils'

export function BottomNavigation() {
  const [activeSection, setActiveSection] = React.useState('home')

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
    }
  }

  const navItems = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'halls', label: 'Залы', icon: Building2 },
    { id: 'packages', label: 'Пакеты', icon: Package },
    { id: 'reviews', label: 'Отзывы', icon: MessageSquare },
    { id: 'contact', label: 'Контакты', icon: Phone },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 bottom-nav-glass border-t border-emerald-100 bottom-nav-shadow animate-bottom-nav-slide-up">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "bottom-nav-button flex flex-col items-center justify-center space-y-1 transition-all duration-300 relative group",
              activeSection === item.id
                ? "text-emerald-600 bg-emerald-50/80"
                : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50"
            )}
            aria-label={`Перейти к разделу ${item.label}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            <div className={cn(
              "transition-all duration-300",
              activeSection === item.id 
                ? "scale-110 animate-nav-item-pulse" 
                : "group-hover:scale-105"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={cn(
              "text-xs font-medium transition-all duration-300",
              activeSection === item.id 
                ? "font-semibold" 
                : "group-hover:font-medium"
            )}>
              {item.label}
            </span>
            {activeSection === item.id && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}