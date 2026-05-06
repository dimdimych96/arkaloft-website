import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Отслеживаем скролл
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // На не-главных страницах хедер всегда в "scrolled" состоянии для десктопа
  const isHeaderScrolled = location.pathname === '/' ? isScrolled : true;

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
      {/* Header container - transparent with gradient on scroll (desktop only) */}
      <div className={`w-full fixed top-0 z-30 transition-all duration-300 ${
        isHeaderScrolled
          ? 'lg:bg-white lg:shadow-md'
          : 'bg-transparent'
      }`}>
        <header className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative z-10">
          {/* Desktop Logo/Home - показываем на не-главных страницах */}
          {location.pathname !== '/' && (
            <Link
              to="/"
              className="hidden lg:flex items-center gap-2 touch-target group"
            >
              <span className="material-symbols-outlined text-primary text-2xl">home</span>
              <span className="text-sm font-bold text-gray-900">Главная</span>
            </Link>
          )}

          {/* Mobile Home Button - показываем только на не-главной странице */}
          {location.pathname !== '/' && (
            <Link
              to="/"
              className={`lg:hidden size-11 flex items-center justify-center rounded-full transition-all duration-300 touch-target shadow-lg ${
                isScrolled
                  ? 'bg-black/20 backdrop-blur-md hover:bg-black/30'
                  : 'bg-white/90 backdrop-blur-sm hover:bg-white active:bg-white/80 border border-gray-200'
              }`}
              aria-label="На главную"
            >
              <span className={`material-symbols-outlined ${
                isScrolled ? 'text-white' : 'text-gray-900'
              }`}>home</span>
            </Link>
          )}

          {/* Spacer для мобильных */}
          <div className="flex-1 lg:hidden"></div>

          {/* Desktop Nav - centered */}
          <nav className={`hidden lg:flex items-center gap-1 ${location.pathname === '/' ? 'flex-1 justify-center' : 'justify-center flex-1'}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? isHeaderScrolled
                      ? 'text-primary bg-primary/10'
                      : 'text-primary bg-white/20'
                    : isHeaderScrolled
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+79830012520"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                isHeaderScrolled
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${isHeaderScrolled ? 'text-gray-700' : 'text-white'}`}>call</span>
              <span className={`text-sm font-bold ${isHeaderScrolled ? 'text-gray-700' : 'text-white'}`}>8 (983) 001-25-20</span>
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all duration-200 shadow-lg"
            >
              <span className="material-symbols-outlined text-lg">event_available</span>
              Забронировать
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            {/* Mobile Menu Button - адаптивный цвет */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`size-11 flex items-center justify-center rounded-full transition-all duration-300 touch-target relative z-20 shadow-lg ${
                isScrolled
                  ? 'bg-black/20 backdrop-blur-md hover:bg-black/30'
                  : location.pathname === '/'
                    ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40'
                    : 'bg-white/90 backdrop-blur-sm hover:bg-white active:bg-white/80 border border-gray-200'
              }`}
              aria-label="Меню"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`material-symbols-outlined transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''} ${
                isScrolled
                  ? 'text-white'
                  : location.pathname === '/'
                    ? 'text-white'
                    : 'text-gray-900'
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

      {/* SVG Clip Path Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.95 Q 0.75,0.98 0.5,0.95 Q 0.25,0.92 0,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Mobile Menu - iOS Glass Style */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-[50] bg-white/30 backdrop-blur-3xl shadow-2xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'}`}
        style={{
          clipPath: isMobileMenuOpen ? 'url(#wave-clip)' : undefined
        }}
      >
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

        <nav className="max-w-7xl mx-auto px-4 py-6 pb-10">
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
