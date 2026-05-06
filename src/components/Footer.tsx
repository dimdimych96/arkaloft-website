import { Link } from 'react-router-dom';
import { useState } from 'react';
import leadService from '../lib/services/leadService';
import { 
  Send, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';

export const Footer = () => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsSubmitting(true);
    try {
      await leadService.createLead({
        phone,
        source: 'Футер (Обратный звонок)'
      });
      alert('Спасибо! Мы перезвоним вам в ближайшее время.');
      setPhone('');
    } catch (err) {
      console.error('Footer form error:', err);
      alert('Ошибка при отправке. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-gray-50">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-mint/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-peach/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black font-heading tracking-tight text-gray-900">Арка Лофт</span>
            </Link>
            
            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10 max-w-sm">
              Создаем волшебные моменты и счастливые воспоминания для ваших детей в самом сердце Новосибирска.
            </p>

            <div className="flex gap-4">
              <a 
                href="https://vk.com/arka_loft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#0077FF] hover:text-white hover:shadow-xl hover:shadow-[#0077FF]/20 transition-all duration-500"
              >
                <span className="font-black text-sm">VK</span>
              </a>
              <a 
                href="https://t.me/arkaloft_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#0088CC] hover:text-white hover:shadow-xl hover:shadow-[#0088CC]/20 transition-all duration-500"
              >
                <Send className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/79830012520" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white hover:shadow-xl hover:shadow-[#25D366]/20 transition-all duration-500"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-gray-900 font-black uppercase tracking-widest text-xs mb-8">Навигация</h4>
              <ul className="space-y-4">
                {['Залы', 'Акции', 'Отзывы', 'Контакты'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === 'Залы' ? '/about' : item === 'Акции' ? '/projects' : item === 'Отзывы' ? '/reviews' : '/contact'}
                      className="text-gray-500 hover:text-primary font-bold text-base transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-black uppercase tracking-widest text-xs mb-8">Праздники</h4>
              <ul className="space-y-4">
                {['Дни рождения', 'Выпускные', 'Мастер-классы', 'Новый год'].map((item) => (
                  <li key={item}>
                    <Link to="/contact" className="text-gray-500 hover:text-primary font-bold text-base transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50/50 rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 relative group">
              {/* Decorative Blob with its own clipping container */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              </div>
              
              <h4 className="text-2xl font-black text-gray-900 font-heading mb-4 relative z-10">Запишитесь на просмотр</h4>
              <p className="text-gray-500 font-medium mb-8 relative z-10 leading-relaxed max-w-md">
                Оставьте номер, и мы подберем идеальное время для экскурсии по нашему лофту.
              </p>
              
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-base font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-gray-800 placeholder-gray-400 transition-all shadow-sm"
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <button 
                  className="bg-primary text-white font-black px-8 py-4 rounded-2xl text-base hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 whitespace-nowrap h-14 flex items-center justify-center" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Жду звонка'}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-gray-200/50 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                <div className="flex items-center gap-4 group/contact">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 group-hover/contact:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <a href="tel:+79830012520" className="text-gray-900 font-black hover:text-primary transition-colors text-sm sm:text-base">
                    8 (983) 001-25-20
                  </a>
                </div>
                <div className="flex items-center gap-4 group/contact">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 group-hover/contact:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-900 font-black text-sm sm:text-base">пр. Дзержинского, 18</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm font-bold text-gray-400">
            <p>© {new Date().getFullYear()} Arkaloft. Все права защищены.</p>
            <div className="flex gap-6">
              <Link className="hover:text-primary transition-colors underline decoration-gray-200 underline-offset-4" to="/privacy">Политика</Link>
              <Link className="hover:text-primary transition-colors underline decoration-gray-200 underline-offset-4" to="/offer">Оферта</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
            <span>Сделано с</span>
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            <span>в Новосибирске</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
