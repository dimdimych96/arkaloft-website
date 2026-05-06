import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Блокируем скролл страницы при открытом меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: '/about', label: 'Залы', icon: 'meeting_room' },
    { path: '/projects', label: 'Пакеты', icon: 'celebration' },
    { path: '/services', label: 'Услуги', icon: 'room_service' },
    { path: '/reviews', label: 'Отзывы', icon: 'reviews' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Header container - полностью прозрачный на мобильных */}
      <div className="w-full bg-transparent sm:bg-white/95 sm:backdrop-blur-md sm:border-b-2 sm:border-secondary-mint/30 fixed top-0 z-30">
        <header className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative z-10">
          {/* Logo - скрыт на мобильных */}
          <Link to="/" className="hidden sm:flex items-center touch-target group">
            <img
              src="/logo/arka3.png"
              alt="Арка Лофт"
              className="h-10 w-auto sm:h-12 md:h-14 transition-transform duration-300 group-hover:scale-105 group-active:scale-95 object-contain"
            />
          </Link>

          {/* Mobile Home Button - показываем только на не-главной странице */}
          {location.pathname !== '/' && (
            <Link
              to="/"
              className="sm:hidden size-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white active:bg-white/80 transition-all duration-200 touch-target shadow-lg border border-gray-200"
              aria-label="На главную"
            >
              <span className="material-symbols-outlined text-gray-900">home</span>
            </Link>
          )}

          {/* Spacer для мобильных чтобы бургер был справа */}
          <div className="flex-1 sm:hidden"></div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-50 p-1.5 rounded-full border border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-text-secondary hover:text-primary hover:bg-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+79830012520"
              className="hidden lg:flex items-center gap-2 group"
            >
              <div className="size-10 flex items-center justify-center rounded-full bg-secondary-yellow text-gray-700 group-hover:scale-110 transition-all duration-200 shadow-sm">
                <span className="material-symbols-outlined">call</span>
              </div>
              <span className="text-sm font-black text-gray-800 font-heading">8 (983) 001-25-20</span>
            </a>
            <a
              href="tel:+79830012520"
              className="hidden sm:flex lg:hidden size-10 items-center justify-center rounded-full bg-secondary-yellow text-gray-700 hover:scale-110 active:scale-105 transition-all duration-200 shadow-sm touch-target"
              aria-label="Позвонить"
            >
              <span className="material-symbols-outlined">call</span>
            </a>
            <Link
              to="/contact"
              className="hidden sm:flex h-10 px-5 md:px-6 items-center justify-center rounded-full bg-primary text-white font-black text-sm hover:bg-primary-hover transition-all duration-200 shadow-[0_4px_0_0_#2E7D32] active:shadow-none touch-target relative"
            >
              Забронировать
            </Link>
            {/* Mobile Menu Button - белая иконка на прозрачном фоне для главной, темная для остальных */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden size-11 flex items-center justify-center rounded-full transition-all duration-200 touch-target relative z-20 shadow-lg ${
                location.pathname === '/'
                  ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40'
                  : 'bg-white/90 backdrop-blur-sm hover:bg-white active:bg-white/80 border border-gray-200'
              }`}
              aria-label="Меню"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`material-symbols-outlined transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''} ${
                location.pathname === '/' ? 'text-white' : 'text-gray-900'
              }`}>
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 z-[40] bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - iOS Glass Style */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-[50] bg-white/30 backdrop-blur-3xl border-b border-white/30 shadow-2xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'}`}>
        {/* Mobile Menu Header с кнопкой закрытия */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <h2 className="text-2xl font-black text-gray-900 font-heading tracking-tight">Арка Лофт</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="size-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-xl hover:bg-white/50 active:bg-white/70 transition-all duration-200 touch-target"
            aria-label="Закрыть меню"
          >
            <span className="material-symbols-outlined text-gray-900">close</span>
          </button>
        </div>

        <nav className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-3xl font-bold text-sm transition-all duration-200 animate-slide-up backdrop-blur-xl border min-h-[100px] ${isActive(item.path)
                    ? 'bg-primary/80 text-white shadow-lg shadow-primary/30 border-primary/50'
                    : 'bg-white/25 text-gray-900 hover:bg-white/40 active:bg-white/60 border-white/30'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={`material-symbols-outlined text-3xl ${isActive(item.path) ? 'scale-110' : ''} transition-transform`}>
                  {item.icon}
                </span>
                {item.label}
                {isActive(item.path) && (
                  <span className="material-symbols-outlined text-lg absolute top-2 right-2">check_circle</span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="tel:+79830012520"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-full font-bold text-base bg-white/25 backdrop-blur-xl border border-white/30 text-gray-900 hover:bg-white/40 active:bg-white/60 transition-all duration-200 touch-target"
            >
              <span className="material-symbols-outlined">call</span>
              Позвонить
            </a>

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-full font-bold text-base bg-primary/80 backdrop-blur-xl border border-primary/50 text-white hover:bg-primary/90 active:bg-primary transition-all duration-200 shadow-lg shadow-primary/30 touch-target"
            >
              <span className="material-symbols-outlined">event_available</span>
              Забронировать
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
