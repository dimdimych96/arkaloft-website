import { Heart, Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-emerald-400">АРКА</h3>
              <span className="ml-2 text-sm text-gray-400">эко-лофт</span>
            </div>
            <p className="text-gray-400 text-sm">
              Создаем незабываемые моменты для вашей семьи в экологически чистом пространстве в Дзержинском районе Новосибирска.
            </p>
            <div className="flex space-x-4">
              <a href="https://vk.com/arkaloft" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors" aria-label="ВКонтакте">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/arka_loft/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#halls" className="hover:text-emerald-400 transition-colors">Аренда залов</a></li>
              <li><a href="#packages" className="hover:text-emerald-400 transition-colors">Пакеты услуг</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Анимация</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Фотосессии</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Кейтеринг</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">О нас</a></li>
              <li><a href="#reviews" className="hover:text-emerald-400 transition-colors">Отзывы</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Правила</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Блог</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+79830012520" className="hover:text-emerald-400 transition-colors">+7 983 001 25 20</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:arkaloft@mail.ru" className="hover:text-emerald-400 transition-colors">arkaloft@mail.ru</a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>г. Новосибирск<br />Дзержинский район</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 Эко-лофт "АРКА". Все права защищены.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center text-sm text-gray-400">
              <span>Сделано с</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>для семей Новосибирска</span>
            </div>
            <div className="flex space-x-4">
              <a href="https://vk.com/arkaloft" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">ВКонтакте</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.167.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/arka_loft/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}