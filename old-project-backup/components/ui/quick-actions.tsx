import { useState } from 'react'
import { Phone, MessageCircle, Send, X, MessageSquare } from 'lucide-react'

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = '+79830012520'
  
  return (
    <div className="md:hidden fixed bottom-20 right-4 z-40">
      {/* Expanded menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 mb-3">
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 animate-fadeIn"
            aria-label="Написать в WhatsApp"
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle className="w-6 h-6" />
          </a>

          <a
            href={`https://t.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 animate-fadeIn"
            style={{ animationDelay: '50ms' }}
            aria-label="Написать в Telegram"
            onClick={() => setIsOpen(false)}
          >
            <Send className="w-5 h-5" />
          </a>

          <a
            href={`tel:${phoneNumber}`}
            className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 animate-fadeIn"
            style={{ animationDelay: '100ms' }}
            aria-label="Позвонить"
            onClick={() => setIsOpen(false)}
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700 rotate-90' 
            : 'bg-emerald-600 hover:bg-emerald-700'
        } text-white`}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню связи'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  )
}
