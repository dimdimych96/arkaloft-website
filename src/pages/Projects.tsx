import { Link } from 'react-router-dom';
import { packages } from '../data/siteData';

export const Projects = () => {
  return (
    <main className="min-h-screen bg-background-off-white font-body text-text-main overflow-x-hidden">
      {/* Header Section */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-mint/40 blob-shape blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary-yellow px-4 py-2 rounded-full mb-6 shadow-sm rotate-1">
            <span className="material-symbols-outlined text-orange-500 text-lg">magic_button</span>
            <span className="text-sm font-black text-orange-800 font-heading">Создайте свой идеальный праздник!</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-gray-900 font-heading mb-6 relative max-w-4xl mx-auto">
            Готовые решения и <br className="sm:hidden" />
            <span className="text-primary relative inline-block">
              конструктор
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary-yellow -z-10" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
              </svg>
            </span>
            {' '}под ваш бюджет
          </h1>
          <p className="text-lg text-text-secondary mb-4 leading-relaxed max-w-2xl mx-auto">
            Выберите один из популярных пакетов или соберите праздник мечты с нуля. Всё прозрачно и без скрытых доплат.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 font-heading mb-3">Готовые пакеты</h2>
            <p className="text-text-secondary max-w-2xl mx-auto mb-4 text-sm sm:text-base">Самые востребованные комбинации услуг для идеального праздника</p>
            <div className="md:hidden flex justify-center items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 py-2 rounded-full w-fit mx-auto px-4 border border-primary/10">
              <span className="material-symbols-outlined text-xs animate-bounce-x">arrow_forward</span>
              Листайте пакеты
            </div>
          </div>
          
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 no-scrollbar snap-x md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`snap-center shrink-0 w-[280px] sm:w-[320px] md:w-full relative flex flex-col bg-white rounded-[2rem] p-6 border-2 transition-all hover:-translate-y-2 hover:shadow-xl h-full ${
                  pkg.popular ? 'border-primary shadow-xl' : 'border-transparent hover:border-primary/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary-yellow text-orange-900 font-black px-4 py-1 rounded-full text-sm shadow-sm uppercase tracking-wide">
                    Хит продаж
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-black text-gray-800 font-heading">{pkg.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">{pkg.subtitle}</div>
                </div>
                <div className="my-4">
                  <div className="text-3xl font-black text-primary">{pkg.price}</div>
                  <div className="text-xs text-gray-400 font-bold mt-1">{pkg.weekend}</div>
                </div>
                <ul className="flex-grow mb-6 space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="material-symbols-outlined text-primary text-lg">check</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?package=${pkg.id}`}
                  className={`w-full py-3 rounded-xl font-bold transition-all mb-3 text-center inline-block ${
                    pkg.popular
                      ? 'bg-primary text-white hover:bg-primary-hover shadow-[0_4px_0_0_#2E7D32]'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  Выбрать
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 font-heading mb-3">Дополнительные услуги</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Сделайте ваш праздник ещё ярче с нашими услугами</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-purple-500">theater_comedy</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Шоу-программы</h3>
              <p className="text-gray-500 text-sm mb-4">Научные шоу, мыльные пузыри, бумажная дискотека и многое другое!</p>
              <div className="text-primary font-black text-lg">от 5 000 ₽</div>
            </div>
            
            <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-orange-500">face</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Аниматоры</h3>
              <p className="text-gray-500 text-sm mb-4">Любимые герои сказок и мультфильмов для детей любого возраста</p>
              <div className="text-primary font-black text-lg">от 3 500 ₽/час</div>
            </div>
            
            <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-pink-500">palette</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Оформление</h3>
              <p className="text-gray-500 text-sm mb-4">Фотозоны, шары, тематический декор для незабываемых кадров</p>
              <div className="text-primary font-black text-lg">от 7 000 ₽</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold font-heading text-white mb-6">
            Нужна помощь с выбором?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Наши менеджеры помогут подобрать идеальный пакет под ваш бюджет и пожелания
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-secondary-yellow transition-colors shadow-lg"
          >
            Получить консультацию
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </Link>
        </div>
      </section>
    </main>
  );
};
