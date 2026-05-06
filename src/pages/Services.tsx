import { Link } from 'react-router-dom';

const services = [
  {
    category: 'rent',
    icon: 'meeting_room',
    iconBg: 'bg-green-100',
    iconColor: 'text-primary',
    title: 'Аренда залов',
    items: [
      {
        name: 'Зал 0+',
        description: '135 м², огромная горка, сухой бассейн, мягкая зона для родителей и банкетная посадка до 30 человек.',
        area: '135 м²',
        guests: 'до 40 чел.',
        price: '3500 ₽/час',
        priceColor: 'text-primary',
        image: '/images/halls/0/1.jpg',
      },
      {
        name: 'Зал 7+',
        description: '75 м², игровая консоль PS5, проектор, светомузыка, зона TikTok и настольные игры.',
        area: '75 м²',
        guests: 'до 20 чел.',
        price: '2500 ₽/час',
        priceColor: 'text-orange-500',
        image: '/images/halls/7/1.jpg',
      },
    ],
  },
  {
    category: 'shows',
    icon: 'theater_comedy',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Шоу-программы',
    subtitle: 'Яркие эмоции, которые запомнятся навсегда',
    items: [
      {
        name: 'Серебряное шоу',
        description: 'Килограммы блестящей фольги, в которой можно купаться и танцевать.',
        price: 'от 5 000 ₽',
        badge: 'Hit',
        image: '/images/halls/7/4.jpg',
      },
      {
        name: 'Мыльное шоу',
        description: 'Гигантские мыльные пузыри и пенная вечеринка для детей любого возраста.',
        price: 'от 4 500 ₽',
        image: '/images/halls/7/5.jpg',
      },
      {
        name: 'Бумажная дискотека',
        description: 'Танцы с конфетти, серпантином и светящимися палочками.',
        price: 'от 3 500 ₽',
        image: '/images/halls/7/6.jpg',
      },
      {
        name: 'Научное шоу',
        description: 'Увлекательные эксперименты и химические реакции.',
        price: 'от 6 000 ₽',
        image: '/images/halls/7/7.jpg',
      },
    ],
  },
  {
    category: 'animators',
    icon: 'face',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Аниматоры',
    subtitle: 'Любимые герои сказок и мультфильмов',
    items: [
      { name: 'Фиксики', price: '3500 ₽/час', image: '/images/halls/0/4.jpg' },
      { name: 'Щенячий патруль', price: '3500 ₽/час', image: '/images/halls/0/5.jpg' },
      { name: 'Холодное сердце', price: '4000 ₽/час', image: '/images/halls/0/6.jpg' },
      { name: 'Человек паук', price: '4000 ₽/час', image: '/images/halls/7/1.jpg' },
      { name: 'Единорог', price: '4500 ₽/час', image: '/images/halls/7/2.jpg' },
      { name: 'Аквамен', price: '4000 ₽/час', image: '/images/halls/7/3.jpg' },
    ],
  },
  {
    category: 'decor',
    icon: 'palette',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    title: 'Оформление и декор',
    subtitle: 'Создадим праздничную атмосферу',
    items: [
      { name: 'Фотозона', description: 'Индивидуальный дизайн под ваш праздник', price: 'от 7 000 ₽' },
      { name: 'Воздушные шары', description: 'Фонтаны, арки, гирлянды', price: 'от 3 000 ₽' },
      { name: 'Буквы из пенопласта', description: 'Имя именинника, цифра возраста', price: 'от 2 500 ₽' },
      { name: 'Тематический декор', description: 'Полный комплект под ключ', price: 'от 10 000 ₽' },
    ],
  },
  {
    category: 'catering',
    icon: 'cake',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    title: 'Кейтеринг',
    subtitle: 'Вкусные угощения для гостей',
    items: [
      { name: 'Кенди бар', description: 'Сладкий стол с десертами', price: 'от 5 000 ₽' },
      { name: 'Пончики', description: 'Набор из 20 шт.', price: 'от 2 000 ₽' },
      { name: 'Капкейки', description: 'Набор из 12 шт.', price: 'от 2 400 ₽' },
      { name: 'Фруктовая нарезка', description: 'Ассорти на компанию', price: 'от 3 500 ₽' },
    ],
  },
];

export const Services = () => {
  return (
    <main className="min-h-screen bg-background-off-white font-body text-text-main overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-mint/30 blob-shape blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-secondary-peach/20 blob-shape-2 blur-3xl -z-10 -translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary-yellow/50 text-yellow-800 text-xs font-black uppercase tracking-widest mb-4">
            Каталог развлечений
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 font-heading mb-6 max-w-4xl mx-auto leading-tight">
            Все услуги для{' '}
            <span className="text-primary relative inline-block">
              идеального
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary-peach -z-10 opacity-60" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
              </svg>
            </span>
            {' '}праздника
          </h1>
          <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
            Мы берем на себя все заботы: от подбора аниматора до украшения торта. Профессиональная организация событий в наших уютных лофтах или на выезде.
          </p>
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 no-scrollbar overflow-x-auto pb-4 px-4 snap-x">
            {services.map((service) => (
              <a
                key={service.category}
                href={`#${service.category}`}
                className="snap-start flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-green-100 text-gray-700 font-bold hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <span className={`material-symbols-outlined ${service.iconColor} text-lg`}>{service.icon}</span>
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((section) => (
        <section
          key={section.category}
          id={section.category}
          className={`py-16 ${section.category === 'rent' || section.category === 'decor' ? 'bg-white' : 'bg-background-subtle relative border-y border-dashed border-gray-200'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className={`size-10 ${section.iconBg} rounded-full flex items-center justify-center ${section.iconColor}`}>
                  <span className="material-symbols-outlined">{section.icon}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 font-heading">{section.title}</h2>
                  {section.subtitle && (
                    <p className="text-sm text-gray-500 font-medium mt-1">{section.subtitle}</p>
                  )}
                </div>
              </div>
              <a className="text-primary font-bold hover:text-primary-hover transition-colors flex items-center gap-1" href="#">
                Все {section.title.toLowerCase()} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Section Content */}
            {section.category === 'rent' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items.map((item: any) => (
                  <div key={item.name} className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col h-full">
                    <div className="h-64 overflow-hidden relative">
                      <img alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.image} />
                      <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase ${item.priceColor}`}>
                        {item.name}
                      </div>
                      <div className={`absolute bottom-4 right-4 ${item.priceColor.replace('text-', 'bg-')} text-white px-4 py-2 rounded-xl font-bold shadow-md`}>
                        {item.price}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-gray-800 font-heading mb-2">
                        {item.name === 'Зал 0+' ? 'Просторный зал для малышей' : 'Стильный лофт для подростков'}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex gap-4 text-sm font-medium text-gray-600 mb-6">
                        <span className="flex items-center gap-1">
                          <span className={`material-symbols-outlined ${item.priceColor} text-lg`}>straighten</span> {item.area}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className={`material-symbols-outlined ${item.priceColor} text-lg`}>groups</span> {item.guests}
                        </span>
                      </div>
                      <div className="mt-auto">
                        <Link to="/contact" className={`inline-flex items-center ${item.priceColor} font-bold hover:underline`}>
                          Забронировать <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.category === 'shows' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items.map((item: any) => (
                  <div key={item.name} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all group">
                    <div className="relative rounded-xl overflow-hidden mb-4 h-48">
                      {item.badge && (
                        <div className="absolute top-2 right-2 z-10 bg-secondary-yellow text-xs font-black px-2 py-1 rounded text-orange-900 uppercase">
                          {item.badge}
                        </div>
                      )}
                      <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} />
                    </div>
                    <h3 className="text-lg font-black text-gray-800 font-heading mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                      <span className="text-primary font-black">{item.price}</span>
                      <button className="text-primary hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.category === 'animators' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {section.items.map((item: any) => (
                  <div key={item.name} className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                    <div className="relative rounded-xl overflow-hidden mb-3 aspect-square">
                      <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    <h3 className="text-sm font-black text-gray-800 text-center mb-1">{item.name}</h3>
                    <p className="text-xs text-primary font-bold text-center">{item.price}</p>
                  </div>
                ))}
              </div>
            )}

            {(section.category === 'decor' || section.category === 'catering') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items.map((item: any) => (
                  <div key={item.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-primary">celebration</span>
                    </div>
                    <h3 className="text-lg font-black text-gray-800 font-heading mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                    <div className="text-primary font-black text-lg">{item.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold font-heading text-white mb-6">
            Нужна помощь с выбором?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Наши менеджеры помогут подобрать идеальные услуги для вашего праздника
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
