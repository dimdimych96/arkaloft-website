import { useForm, Controller } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import leadService from '../lib/services/leadService';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import InputMask from 'react-input-mask';
import { PackageBuilder } from '../components/PackageBuilder';
import {
  User,
  Phone,
  Calendar,
  Users,
  MapPin,
  Clock,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Layout,
  Package,
  MessageCircle,
  ChevronRight,
  Check
} from 'lucide-react';

interface ContactFormData {
  name: string;
  phone: string;
  date?: string;
  guests?: string;
  hall: string;
  package: string;
  message: string;
}

const packages = [
  {
    id: 'paket-start',
    name: 'Старт',
    price: 'от 12 000 ₽',
    priceDetails: 'В будние: 12 000 ₽\nВыходные: 14 000 ₽',
    description: 'Бюджетный вариант для небольшого праздника',
    features: ['2 часа аренды лофта', 'Аниматор (стандарт) 50 минут', 'Фотозона (фонтан и надпись)']
  },
  {
    id: 'paket-1',
    name: 'Минимальный',
    price: 'от 15 000 ₽',
    priceDetails: 'В будние: 15 000 ₽\nПт (с 18:00) и выходные: 18 000 ₽',
    description: 'Базовый набор для отличного праздника',
    features: ['3 часа аренды лофта', 'Аниматор (стандарт) 1 час', 'Дискотека со спецэффектами 30 минут', 'Фотозона']
  },
  {
    id: 'paket-2',
    name: 'Стандартный',
    price: 'от 22 500 ₽',
    priceDetails: 'В будние: 22 500 ₽\nПт (с 18:00) и выходные: 26 000 ₽',
    description: 'Оптимальный выбор с аквагримом и фотографом',
    features: ['3 часа аренды лофта', 'Аниматор (стандарт) 1 час', 'Аквагрим или блеск-тату 1 час', 'Фотограф 1 час', 'Дискотека со спецэффектами', 'Фотозона']
  },
  {
    id: 'paket-4',
    name: 'Максимальный',
    price: 'от 21 500 ₽',
    priceDetails: 'В будние: 21 500 ₽\nПт (с 18:00) и выходные: 24 500 ₽',
    description: 'С шоу на выбор и мыльными пузырями',
    features: ['3 часа аренды лофта', 'Аниматор (стандарт) 1 час', 'Погружение в мыльный пузырь', 'Шоу на выбор (серебряная/неоновая диско)', 'Фотозона под ключ']
  },
  {
    id: 'paket-3',
    name: 'VIP',
    price: '48 500 ₽',
    priceDetails: 'Единая цена на любые дни',
    description: 'Всё включено по максимуму (фото, видео, шоу)',
    features: ['3 часа аренды лофта', 'Аниматор (премиум) 1 час', 'Велком зона с героем или торт', 'Шоу на выбор', 'Фотограф и Видеограф', 'Фотозона под ключ и Пиньята']
  },
  {
    id: 'wednesday-barbie',
    name: 'Уэнсдей против Барби',
    price: 'от 46 500 ₽',
    priceDetails: 'Зал 7+: 46 500 ₽\nЗал 0+: 49 500 ₽',
    description: 'Уникальная тематическая вечеринка',
    features: ['3 часа аренды лофта', 'Вечеринка Уэнсдей против Барби 1 час', 'Неоновая розовая дискотека', 'Фотограф 1 час', 'Фотозона под ключ', 'Сахарная вата или торт 2.5 кг']
  },
  {
    id: 'morning',
    name: 'Утренние часы',
    price: '2 000 ₽ / час',
    priceDetails: 'Только в будние дни с 10:00 до 13:00',
    description: 'Специальный тариф для утренних праздников',
    features: ['Только аренда лофта', 'Бронирование от 3-х часов', 'Скидка на стоимость часа (вместо 3500₽)']
  },
  {
    id: 'custom',
    name: 'Индивидуальный расчёт',
    price: 'По запросу',
    priceDetails: 'Свяжемся с вами для обсуждения деталей',
    description: 'Создадим уникальное предложение под ваши пожелания',
    features: ['Персональный подход', 'Гибкая комплектация услуг', 'Индивидуальное ценообразование', 'Консультация менеджера']
  }
];

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialPackage = searchParams.get('package') || '';
  const initialHall = searchParams.get('hall') || '';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ready' | 'individual' | 'constructor'>('ready');
  const [customPackageDetails, setCustomPackageDetails] = useState<string>('');

  // Получаем сегодняшнюю дату в формате YYYY-MM-DD для min атрибута
  const today = new Date().toISOString().split('T')[0];

  // Группировка пакетов по категориям
  const packageCategories = {
    ready: {
      label: 'Готовые пакеты',
      icon: '📦',
      description: 'Со скидкой'
    },
    individual: {
      label: 'Индивидуально',
      icon: '💬',
      description: 'Свяжется менеджер'
    },
    constructor: {
      label: 'Конструктор',
      icon: '🛠️',
      description: 'Соберите сами'
    }
  };

  // Готовые пакеты для вкладки "ready"
  const readyPackages = {
    basic: {
      label: 'Базовые',
      packages: [packages[0], packages[1], packages[2]] // Минимальный, Стандартный, Максимальный
    },
    premium: {
      label: 'Премиум',
      packages: [packages[3]] // VIP
    },
    special: {
      label: 'Специальные',
      packages: [packages[4], packages[5]] // Уэнсдей, Утренние часы
    }
  };

  const { register, handleSubmit, reset, watch, setValue, control, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    defaultValues: {
      package: initialPackage,
      hall: initialHall
    }
  });

  const selectedPackage = watch('package');

  useEffect(() => {
    register('package');
  }, [register]);

  const generateMessageText = (data: ContactFormData) => {
    const pkgName = packages.find(p => p.id === data.package)?.name || data.package;
    return `Здравствуйте! Хочу забронировать праздник.%0A%0AИмя: ${data.name}%0AТелефон: ${data.phone}%0AДата: ${data.date || 'Не выбрана'}%0AГостей: ${data.guests || 'Не указано'}%0AПространство: ${data.hall || 'Не выбрано'}%0AПакет: ${pkgName || 'Не выбран'}%0AПожелания: ${data.message || 'Нет'}`;
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError(null);

      // Save data for messenger links
      setSubmittedData(data);

      // Try sending to AmoCRM/API
      try {
        await leadService.createLead({
          ...data,
          source: 'Контактная страница',
          // Добавляем детали индивидуального пакета в сообщение
          message: data.package === 'custom' && customPackageDetails
            ? `${data.message ? data.message + '\n\n' : ''}Выбранные услуги: ${customPackageDetails}`
            : data.message
        });
      } catch (e) {
        console.warn('API error, continuing to success screen for messengers', e);
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError('Произошла ошибка при отправке.');
    }
  };

  const handleReturn = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset({
      name: '',
      phone: '',
      date: '',
      guests: '',
      hall: '',
      package: '',
      message: ''
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isSubmitted && submittedData) {
    const messageText = generateMessageText(submittedData);
    const phoneNum = '79830012520';

    return (
      <main className="min-h-screen bg-background-off-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl text-center border-2 border-primary/20"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-heading mb-4">Заявка принята!</h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Мы уже получили вашу заявку. Вы можете ускорить процесс оформления, написав нам напрямую в удобный мессенджер!
          </p>

          <div className="space-y-4 mb-8">
            <a
              href={`https://wa.me/${phoneNum}?text=${messageText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-white font-black hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Отправить в WhatsApp
            </a>

            <a
              href={`https://t.me/+${phoneNum}?text=${messageText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#0088cc] text-white font-black hover:bg-[#007ab8] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <Send className="w-6 h-6" />
              Отправить в Telegram
            </a>

            <a
              href="https://vk.com/im/convo/-139149900?t2fs=204ac90745b10d3e39_2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#0077FF] text-white font-black hover:bg-[#006be6] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <MessageSquare className="w-6 h-6" />
              Отправить в VK
            </a>
          </div>

          <button
            onClick={handleReturn}
            className="text-text-secondary font-bold hover:text-primary transition-colors underline"
          >
            Вернуться назад
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-off-white font-body text-text-main overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 sm:pb-16 overflow-hidden px-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-secondary-mint/30 blob-shape blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-secondary-peach/20 blob-shape-2 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"
        />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-secondary-yellow px-4 sm:px-5 py-2 rounded-full mb-6 sm:mb-8 shadow-md rotate-1 border border-yellow-200"
          >
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-xs sm:text-sm font-black text-orange-800 font-heading tracking-wide uppercase">Быстрое бронирование</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 font-heading mb-4 sm:mb-6 leading-tight"
          >
            Создадим ваш <br className="sm:hidden" />
            <span className="text-primary italic">идеальный</span> праздник
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto font-medium px-2"
          >
            Оставьте заявку, и мы возьмем на себя всю организацию. Вам останется только наслаждаться моментом!
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Form Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary-mint via-primary to-secondary-peach"></div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 font-medium text-sm sm:text-base">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="contact-name" className="block text-xs sm:text-sm font-black text-gray-700 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
                      Ваше имя
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        autoFocus
                        aria-label="Ваше имя"
                        aria-required="true"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        {...register('name', { required: 'Имя обязательно' })}
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold bg-gray-50/50 text-base"
                        placeholder="Александр"
                      />
                    </div>
                    {errors.name && <p id="name-error" className="mt-2 text-xs font-bold text-red-500 ml-1" role="alert">{errors.name.message}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="contact-phone" className="block text-xs sm:text-sm font-black text-gray-700 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
                      Телефон
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          required: 'Телефон обязателен',
                          pattern: {
                            value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                            message: 'Неверный формат телефона'
                          }
                        }}
                        render={({ field }) => (
                          <InputMask
                            {...field}
                            mask="+7 (999) 999-99-99"
                            id="contact-phone"
                            type="tel"
                            aria-label="Номер телефона"
                            aria-required="true"
                            aria-invalid={errors.phone ? 'true' : 'false'}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold bg-gray-50/50 text-base"
                            placeholder="+7 (999) 000-00-00"
                          />
                        )}
                      />
                    </div>
                    {errors.phone && <p id="phone-error" className="mt-2 text-xs font-bold text-red-500 ml-1" role="alert">{errors.phone.message}</p>}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="contact-date" className="block text-xs sm:text-sm font-black text-gray-700 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
                      Дата праздника
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <input
                        id="contact-date"
                        type="date"
                        min={today}
                        aria-label="Дата праздника"
                        {...register('date')}
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold bg-gray-50/50 text-base"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="contact-guests" className="block text-xs sm:text-sm font-black text-gray-700 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
                      Количество гостей
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                        <Users className="w-5 h-5" />
                      </div>
                      <input
                        id="contact-guests"
                        type="number"
                        aria-label="Количество гостей"
                        {...register('guests')}
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold bg-gray-50/50 text-base"
                        placeholder="15"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="contact-hall" className="block text-xs sm:text-sm font-black text-gray-700 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
                      Выберите пространство
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                        <Layout className="w-5 h-5" />
                      </div>
                      <select
                        id="contact-hall"
                        aria-label="Выберите пространство"
                        {...register('hall')}
                        className="w-full pl-12 pr-10 py-3 sm:py-4 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold bg-gray-50/50 appearance-none text-base"
                      >
                        <option value="">Выберите пространство</option>
                        <option value="big-loft">Зал 0+</option>
                        <option value="teen-loft">Зал 7+</option>
                        <option value="both">Оба пространства</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-2">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <label className="block text-xs sm:text-sm font-black text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        Пакет услуг
                      </label>
                    </div>

                    {/* Tabs */}
                    <div
                      className="flex gap-2 mb-4 overflow-x-auto pb-2"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {(Object.keys(packageCategories) as Array<keyof typeof packageCategories>).map((key) => {
                        const category = packageCategories[key];
                        const isActive = activeTab === key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setActiveTab(key)}
                            className={`
                              flex flex-col items-center gap-1 px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all
                              ${isActive
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }
                            `}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span>{category.label}</span>
                            <span className={`text-xs font-normal ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                              {category.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Packages Grid или Конструктор */}
                    {activeTab === 'individual' ? (
                      // Индивидуальная консультация
                      <motion.div
                        key="individual"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-br from-primary/5 to-secondary-mint/10 rounded-2xl p-6 border-2 border-primary/20"
                      >
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <MessageSquare className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-black text-xl text-gray-900">Индивидуальная консультация</h3>
                          <p className="text-text-secondary leading-relaxed">
                            Наш менеджер свяжется с вами, обсудит все детали праздника и подберёт оптимальный вариант под ваши пожелания и бюджет.
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-primary font-bold">
                            <Check className="w-5 h-5" />
                            <span>Персональный подход к каждому клиенту</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : activeTab === 'constructor' ? (
                      // Конструктор пакета
                      <motion.div
                        key="constructor"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PackageBuilder
                          onComplete={(selectedServices, totalPrice) => {
                            // Формируем описание выбранных услуг
                            const servicesText = selectedServices
                              .map(s => s.name)
                              .join(', ');

                            setCustomPackageDetails(`${servicesText} | Итого: ${totalPrice.toLocaleString('ru-RU')} ₽`);
                            setValue('package', 'constructor', { shouldValidate: true });
                          }}
                        />
                      </motion.div>
                    ) : (
                      // Готовые пакеты
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                      >
                      {packages.map((pkg) => {
                        const isSelected = selectedPackage === pkg.id;
                        const isExpanded = expandedPackage === pkg.id;

                        return (
                          <div
                            key={pkg.id}
                            className={`
                                relative rounded-2xl border-2 text-left w-full transition-all duration-300
                                ${isSelected
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50'
                              }
                              `}
                          >
                            <div
                              onClick={() => {
                                setValue('package', isSelected ? '' : pkg.id, { shouldValidate: true });
                                // На мобильных автоматически раскрываем выбранный пакет
                                if (window.innerWidth < 640) {
                                  setExpandedPackage(isSelected ? null : pkg.id);
                                }
                              }}
                              className="cursor-pointer p-4"
                            >
                              {isSelected && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
                                  <Check className="w-4 h-4" />
                                </div>
                              )}

                              <div className="pr-8">
                                <h3 className={`font-black text-base sm:text-lg mb-1 ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                                  {pkg.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-text-secondary mb-2">
                                  {pkg.description}
                                </p>
                                <div className={`text-lg font-black ${isSelected ? 'text-primary/90' : 'text-orange-600'} mb-1`}>
                                  {pkg.price}
                                </div>
                                <div className="text-xs text-gray-500 whitespace-pre-line leading-relaxed bg-gray-100/50 p-1.5 rounded-lg border border-gray-100">
                                  {pkg.priceDetails}
                                </div>
                              </div>

                              {/* Кнопка раскрытия для мобильных */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedPackage(isExpanded ? null : pkg.id);
                                }}
                                className="sm:hidden mt-3 text-xs font-bold text-primary flex items-center gap-1"
                              >
                                {isExpanded ? 'Скрыть детали' : 'Показать детали'}
                                <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                              </button>
                            </div>

                            {/* Детали пакета - всегда видны на desktop, accordion на mobile */}
                            <motion.div
                              initial={false}
                              animate={{
                                height: window.innerWidth >= 640 || isExpanded ? 'auto' : 0,
                                opacity: window.innerWidth >= 640 || isExpanded ? 1 : 0
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4">
                                <div className="bg-white/50 rounded-xl p-3">
                                  <ul className="space-y-2">
                                    {pkg.features.map((feat, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                                        <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-primary' : 'text-orange-400'}`} />
                                        <span className="leading-snug">{feat}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </motion.div>
                    )}
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="contact-message" className="block text-xs sm:text-sm font-black text-gray-700 mb-2 sm:mb-3 ml-1 uppercase tracking-wider">
                    Ваши пожелания
                  </label>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                      id="contact-message"
                      rows={3}
                      aria-label="Ваши пожелания"
                      {...register('message')}
                      className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold bg-gray-50/50 resize-none text-base"
                      placeholder="Напишите, что для вас важно в этот день..."
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 sm:py-5 rounded-2xl bg-primary text-white font-black text-lg sm:text-xl hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative"
                    style={{ transform: isSubmitting ? 'translateY(6px)' : 'none', boxShadow: isSubmitting ? 'none' : '0 6px 0 0 #2E7D32' }}
                    onMouseDown={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = 'none'; } }}
                    onMouseUp={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 0 0 #2E7D32'; } }}
                    onMouseLeave={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 0 0 #2E7D32'; } }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white/30 border-t-white rounded-full"
                        />
                        Отправка заявки...
                      </>
                    ) : (
                      <>
                        Забронировать праздник
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="mt-6 text-center text-xs sm:text-sm text-text-secondary font-medium">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <Link to="/privacy" className="text-primary hover:underline font-bold">
                      политикой конфиденциальности
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            {/* Info Section */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary-mint/20 via-transparent to-secondary-peach/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
                <h2 className="text-3xl font-black text-gray-900 mb-10 font-heading relative inline-block">
                  Наши контакты
                  <span className="absolute -bottom-2 left-0 w-12 h-1.5 bg-primary rounded-full"></span>
                </h2>

                <div className="space-y-10">
                  <a href="https://yandex.ru/maps/-/CCU8vYxP~A" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group/item">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0 border border-gray-50 group-hover/item:scale-110 group-hover/item:bg-secondary-peach/10 transition-all duration-500">
                      <MapPin className="w-7 h-7 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1.5">Адрес</p>
                      <p className="text-gray-900 font-bold text-lg leading-tight group-hover/item:text-primary transition-colors">
                        пр. Дзержинского, 18
                      </p>
                    </div>
                  </a>

                  <a href="tel:+79830012520" className="flex items-center gap-6 group/item">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0 border border-gray-50 group-hover/item:scale-110 group-hover/item:bg-secondary-yellow/20 transition-all duration-500">
                      <Phone className="w-7 h-7 text-orange-700" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1.5">Телефон</p>
                      <p className="text-gray-900 font-bold text-xl group-hover/item:text-primary transition-colors">
                        8 (983) 001-25-20
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-6 group/item">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0 border border-gray-50 group-hover/item:scale-110 group-hover/item:bg-secondary-mint/20 transition-all duration-500">
                      <Clock className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1.5">Режим работы</p>
                      <p className="text-gray-900 font-bold text-lg flex items-center gap-2">
                        10:00 — 22:00
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      </p>
                    </div>
                  </div>

                  <a href="mailto:info@arkaloft.ru" className="flex items-center gap-6 group/item">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0 border border-gray-50 group-hover/item:scale-110 group-hover/item:bg-blue-50 transition-all duration-500">
                      <Mail className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1.5">Email</p>
                      <p className="text-gray-900 font-bold text-lg group-hover/item:text-primary transition-colors">
                        info@arkaloft.ru
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* VK Social Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0077FF] to-[#0055CC] rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,119,255,0.25)]"></div>

              <div className="relative h-full p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/30">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4 font-heading leading-tight">Есть вопросы?</h2>
                  <p className="text-white/80 font-medium leading-relaxed max-w-[240px]">
                    Менеджер ответит за 5 минут в ВКонтакте!
                  </p>
                </div>

                <a
                  href="https://vk.com/im/convo/-139149900?t2fs=204ac90745b10d3e39_2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-8 inline-flex items-center justify-center gap-3 h-14 rounded-2xl bg-white text-[#0077FF] font-black text-base hover:bg-gray-50 transition-all shadow-xl group-hover:shadow-2xl"
                >
                  Написать в VK
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <span className="inline-block text-primary font-black uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">Место встречи</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 font-heading leading-[1.1] mb-6">
                Ждем вас <br />в <span className="text-primary italic">гости</span>
              </h2>
              <p className="text-lg sm:text-xl text-text-secondary font-medium leading-relaxed">
                Бесплатная парковка для гостей и удобный вход. Приезжайте на просмотр пространства в любое время!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block pb-4"
            >
              <div className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-xs">
                <span>пр. Дзержинского, 18</span>
                <span className="w-12 h-px bg-gray-200"></span>
                <span>Новосибирск</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Map Frame decoration */}
            <div className="absolute -inset-1 sm:-inset-4 bg-gradient-to-br from-secondary-mint via-primary/20 to-secondary-peach rounded-[2.5rem] sm:rounded-[4rem] blur-xl opacity-20"></div>

            <div className="relative bg-white p-2 sm:p-4 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden">
              <div className="h-[400px] sm:h-[600px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=82.957519%2C55.048386&mode=search&oid=6540306110&ol=biz&z=16"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-1000 ease-in-out"
                ></iframe>
              </div>

              {/* Map Floating Card */}
              <div className="absolute top-8 left-8 sm:top-12 sm:left-12 max-w-[280px] hidden sm:block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/50"
                >
                  <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-2">Локация</p>
                  <p className="font-black text-gray-900 mb-2 text-2xl font-heading">Арка Loft</p>
                  <p className="text-sm text-text-secondary mb-8 font-medium leading-relaxed">
                    Прекрасное место для вашего праздника. Ждем вас!
                  </p>
                  <a
                    href="https://yandex.ru/maps/-/CCU8vYxP~A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 py-3 px-6 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary-hover transition-all shadow-lg hover:shadow-primary/25"
                  >
                    В путь
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Mobile button */}
              <div className="absolute bottom-6 left-6 right-6 sm:hidden">
                <a
                  href="https://yandex.ru/maps/-/CCU8vYxP~A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-primary text-white font-black text-base shadow-xl"
                >
                  Открыть в навигаторе
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
