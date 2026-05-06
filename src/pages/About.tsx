import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { hallsData } from '../data/siteData';

const halls = hallsData;

export const About = () => {
  return (
    <main className="min-h-screen bg-background-off-white font-body text-text-main overflow-x-hidden">
      <SEO 
        title="Наши залы - Arkaloft Новосибирск"
        description="Подробное описание наших пространств: Зал 0+ для малышей и Зал 7+ для подростков. Фотографии, характеристики и возможности аренды."
        keywords="залы для праздника, лофт 0+, лофт 7+, аренда зала новосибирск"
      />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-mint/10 rounded-full blur-[100px] -z-10 translate-x-1/4 -translate-y-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-peach/10 rounded-full blur-[80px] -z-10 -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 shadow-sm border border-gray-100"
          >
            <span className="material-symbols-outlined text-primary text-lg">celebration</span>
            <span className="text-sm font-black text-gray-700 font-heading">Два уникальных зала</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 font-heading mb-8"
          >
            Наши{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-mint relative inline-block">
              пространства
              <motion.svg 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute h-3 -bottom-2 left-0 text-secondary-yellow/50 -z-10" 
                preserveAspectRatio="none" 
                viewBox="0 0 100 10"
              >
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
              </motion.svg>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Мы создали два концептуальных зала, чтобы каждый праздник — от первого дня рождения до громкой подростковой вечеринки — прошел в идеальной атмосфере.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-4 bg-white p-3 pr-6 rounded-full shadow-lg border border-gray-50">
              <div className="flex -space-x-3">
                <div className="size-10 rounded-full bg-secondary-mint flex items-center justify-center text-xs font-black text-teal-900 border-2 border-white shadow-sm">0+</div>
                <div className="size-10 rounded-full bg-secondary-yellow flex items-center justify-center text-xs font-black text-orange-900 border-2 border-white shadow-sm">7+</div>
              </div>
              <span className="text-sm sm:text-base font-black text-gray-600">Для всех поколений</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Halls Section */}
      {halls.map((hall, index) => (
        <section 
          key={hall.name} 
          className={`py-16 sm:py-24 ${index % 2 === 0 ? 'bg-background-off-white' : 'bg-white'}`}
          aria-labelledby={`hall-title-${index}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden group"
            >
              {/* Decorative Background Blob */}
              <div className={`absolute top-0 right-0 w-96 h-96 ${index % 2 === 0 ? 'bg-secondary-mint/10' : 'bg-secondary-peach/10'} rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2`}></div>
              
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Image Side */}
                <div className={`relative h-[350px] sm:h-[450px] lg:h-[550px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] sm:border-[12px] border-white transition-transform duration-500 group-hover:scale-[1.02] ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <img
                    alt={`${hall.name} ${hall.age} - Arkaloft`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={hall.image}
                    loading="lazy"
                  />
                  
                  {hall.available && (
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                      <span className="size-2.5 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-800">Доступен к брони</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-6 right-6 bg-primary/95 backdrop-blur text-white px-6 py-4 rounded-2xl font-black shadow-xl z-10 transform translate-y-0 group-hover:-translate-y-2 transition-transform">
                    <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Аренда от</p>
                    <p className="text-xl sm:text-2xl">{hall.price}</p>
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Content Side */}
                <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-4 flex flex-wrap items-center gap-3"
                  >
                    <span className="px-4 py-1.5 bg-secondary-mint/20 text-teal-800 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest">{hall.tag}</span>
                    <span className="px-4 py-1.5 bg-secondary-yellow/20 text-orange-800 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest">{hall.tag2}</span>
                  </motion.div>
                  
                  <h2 id={`hall-title-${index}`} className="text-4xl sm:text-5xl font-[900] text-gray-900 font-heading mb-4 leading-tight">
                    {hall.name}
                  </h2>
                  
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
                    <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
                      <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">straighten</span> 
                      <span className="text-sm sm:text-base font-black text-gray-700">{hall.size}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
                      <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">groups</span> 
                      <span className="text-sm sm:text-base font-black text-gray-700">{hall.capacity}</span>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-10 leading-relaxed text-base sm:text-lg font-medium italic border-l-4 border-secondary-mint pl-6 py-2">
                    {hall.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-10">
                    {hall.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white border border-gray-50 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group/item">
                        <div className="size-10 rounded-xl bg-secondary-mint/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform" aria-hidden="true">
                          <span className="material-symbols-outlined text-xl">{feature.icon}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-black text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to={`/contact?hall=${hall.slug}`}
                    className="w-full sm:w-fit px-12 py-5 rounded-2xl bg-primary text-white font-black text-base sm:text-lg hover:bg-primary-hover shadow-[0_8px_0_0_#2E7D32] transition-all active:shadow-none active:translate-y-2 text-center group"
                  >
                    Хочу в этот зал
                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform inline-block align-middle" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>

              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Trust Features Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="text-primary font-black tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">Безупречный сервис</span>
            <h2 className="text-4xl sm:text-5xl font-[900] text-gray-900 font-heading leading-tight">Почему выбирают Arkaloft</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: 'eco', title: 'Безопасность', desc: 'Экологичные покрытия и отсутствие острых углов для самых маленьких.', color: 'bg-secondary-mint', iconColor: 'text-teal-800', border: 'border-green-50' },
              { icon: 'security', title: 'Приватность', desc: 'Закрытый доступ только для ваших гостей и видеонаблюдение.', color: 'bg-purple-100', iconColor: 'text-purple-800', border: 'border-purple-50' },
              { icon: 'local_parking', title: 'Комфорт', desc: 'Собственная бесплатная парковка и удобный подъезд.', color: 'bg-secondary-yellow', iconColor: 'text-yellow-800', border: 'border-yellow-50' },
              { icon: 'cleaning_services', title: 'Чистота', desc: 'Тщательная дезинфекция и кварцевание после каждого праздника.', color: 'bg-pink-100', iconColor: 'text-pink-800', border: 'border-pink-50' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-[2rem] p-8 shadow-soft border-2 ${feature.border} text-center flex flex-col items-center group transition-all duration-300`}
              >
                <div className={`w-20 h-20 ${feature.color} rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <span className={`material-symbols-outlined text-4xl ${feature.iconColor}`} aria-hidden="true">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 font-heading">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background blobs for CTA */}
        <div className="absolute inset-0 bg-primary -z-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-yellow/10 rounded-full blur-[80px] -z-10 -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-[900] font-heading text-white mb-8 leading-[1.1]"
          >
            Создайте праздник <br /> вашей мечты
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium"
          >
            Оставьте заявку сегодня и закрепите за собой лучшую дату! Мы перезвоним в течение 15 минут.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-12 py-6 bg-white text-primary rounded-[1.5rem] font-black text-xl hover:bg-secondary-yellow transition-all shadow-2xl active:scale-95 group"
            >
              Забронировать дату
              <span className="material-symbols-outlined ml-3 group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
