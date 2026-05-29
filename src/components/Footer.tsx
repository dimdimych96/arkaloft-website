import { Link } from 'react-router-dom';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import leadService from '../lib/services/leadService';
import { sendGAEvent, EventNames } from '../lib/googleAnalytics';

export const Footer = () => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

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
      setAgreedToPolicy(false);
    } catch (err) {
      console.error('Footer form error:', err);
      alert('Ошибка при отправке. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Wave top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-mint/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">celebration</span>
              </div>
              <span className="text-2xl font-black font-heading">Арка Лофт</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Создаем незабываемые праздники в Новосибирске
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://max.ru/u/f9LHodD0cOIYcK23a0o_Efgdj1uOCimE6v8OEr8dA2se3LYlescl0tOCNJQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-all"
                title="MAX"
              >
                <span className="font-bold text-xs">MAX</span>
              </a>
              <a
                href="https://vk.com/im/convo/-139149900?t2fs=204ac90745b10d3e39_2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-all"
              >
                <span className="font-bold text-xs">VK</span>
              </a>
              <a
                href="https://t.me/+79830012520"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-all"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </a>
              <a
                href="https://wa.me/79830012520"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-all"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Навигация</h4>
            <ul className="space-y-2">
              {[
                { name: 'Залы', link: '/about' },
                { name: 'Пакеты', link: '/projects' },
                { name: 'Отзывы', link: '/reviews' },
                { name: 'Контакты', link: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">phone</span>
                <a
                  href="tel:+79830012520"
                  onClick={() => sendGAEvent(EventNames.CLICK_PHONE, { phone_number: '+79830012520', location: 'footer' })}
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  8 (983) 001-25-20
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                <span className="text-sm text-gray-400">
                  пр. Дзержинского, 18<br />Новосибирск
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">schedule</span>
                <span className="text-sm text-gray-400">
                  Ежедневно<br />10:00 - 22:00
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Form */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Обратный звонок</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Оставьте номер, мы перезвоним в течение 15 минут
            </p>
            <form
              onSubmit={handleSubmit}
              className="space-y-3"
              {...{
                'webmcp-tool': 'requestCallback',
                'description': 'Форма быстрого заказа обратного звонка от менеджера Арка Лофт.'
              }}
            >
              <InputMask
                mask="+7 (999) 999-99-99"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="+7 (___) ___-__-__"
                type="tel"
                required
                {...{ description: "Контактный номер телефона для обратного звонка в формате +7 (999) 999-99-99" }}
              />

              <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/10 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                />
                <span className="leading-relaxed">
                  Я согласен с{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    политикой конфиденциальности
                  </Link>
                  {' '}и{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    пользовательским соглашением
                  </Link>
                </span>
              </label>

              <button
                className="w-full bg-primary text-white font-bold px-4 py-2.5 rounded-lg text-sm hover:bg-primary-hover transition-all disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Arkaloft. Все права защищены.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
