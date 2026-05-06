import { useState, useEffect } from 'react'
import { X, Check, ArrowRight, MessageCircle, User, Phone, Mail, Calendar, Gift, Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '../../hooks/use-toast'
import { sendWhatsAppMessage } from '../../lib/services/whatsappService'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useAnalytics } from '../../hooks/useAnalytics'
import { startBookingFunnel, trackBookingFunnelSteps, trackAbandonmentReasons, completeBookingFunnel } from '../../lib/analytics/conversionFunnel'

interface BookingFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingFormModal({ isOpen, onClose }: BookingFormModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    hall: '0+' as '0+' | '7+',
    date: '',
    time: '',
    guests: '',
    package: '',
    notes: '',
    childAge: '',
    favoriteHero: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [networkError, setNetworkError] = useState<string>('')
  const { toast } = useToast()
  const analytics = useAnalytics()
  const [funnelId, setFunnelId] = useState<string>('')

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('bookingForm')
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (e) {
        console.error('Ошибка загрузки данных формы:', e)
      }
    }
  }, [])

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('bookingForm', JSON.stringify(formData))
  }, [formData])

  // Обработка Escape для закрытия модального окна
  useEffect(() => {
    const handleEscape = (_e: KeyboardEvent) => {
      // Отключаем закрытие по Escape для предотвращения случайного закрытия
      // Модальное окно можно закрыть только кнопкой X
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, isInteracting, onClose])

  // Initialize funnel when modal opens
  useEffect(() => {
    if (isOpen && !funnelId) {
      const newFunnelId = startBookingFunnel()
      setFunnelId(newFunnelId)
      trackBookingFunnelSteps.modalOpened(newFunnelId, 'header_button')
    }
  }, [isOpen, funnelId])

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Track specific field changes
    if (field === 'hall') {
      analytics.trackHall(value)
      if (funnelId) trackBookingFunnelSteps.hallSelected(funnelId, value)
    } else if (field === 'package') {
      analytics.trackPackage(value)
      if (funnelId) trackBookingFunnelSteps.packageSelected(funnelId, value, 0) // Price will be calculated later
    } else if (field === 'date' && value) {
      if (funnelId) trackBookingFunnelSteps.dateTimeSelected(funnelId, value, formData.time)
    } else if (field === 'time' && value) {
      if (funnelId) trackBookingFunnelSteps.dateTimeSelected(funnelId, formData.date, value)
    } else if (field === 'childAge' && value) {
      if (funnelId) trackBookingFunnelSteps.additionalInfoFilled(funnelId, parseInt(value), formData.favoriteHero)
    } else if (field === 'favoriteHero' && value) {
      if (funnelId) trackBookingFunnelSteps.additionalInfoFilled(funnelId, formData.childAge ? parseInt(formData.childAge) : undefined, value)
    }
    
    // Track contact info completion
    if ((field === 'name' || field === 'phone' || field === 'email') && value) {
      if (funnelId) trackBookingFunnelSteps.contactInfoFilled(funnelId, !!formData.phone, !!formData.email)
    }
    
    // Очищаем ошибку валидации для этого поля при изменении
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const nextStep = () => {
    if (step < 3) {
      analytics.trackBooking(`step_${step + 1}_start`, {
        current_step: step,
        next_step: step + 1
      })
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      analytics.trackBooking(`step_${step}_back`, {
        current_step: step,
        previous_step: step - 1
      })
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Очищаем предыдущие ошибки
    setValidationErrors({})
    setNetworkError('')

    // Базовая валидация ТОЛЬКО ОБЯЗАТЕЛЬНЫХ полей
    const errors: Record<string, string> = {}

    // Обязательные поля для отправки формы
    if (!formData.name.trim()) {
      errors.name = 'Имя обязательно для заполнения'
    }

    if (!formData.hall) {
      errors.hall = 'Выберите зал для мероприятия'
    }

    if (!formData.date) {
      errors.date = 'Выберите дату мероприятия'
    }

    if (!formData.time) {
      errors.time = 'Выберите время начала мероприятия'
    }

    // Дополнительная валидация для введенных данных (если заполнены)
    if (formData.date) {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        errors.date = 'Дата не может быть в прошлом'
      }
    }

    if (formData.time && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.time)) {
      errors.time = 'Введите корректное время в формате HH:MM'
    }

    // Валидация НЕОБЯЗАТЕЛЬНЫХ полей (только если заполнены)
    if (formData.guests && parseInt(formData.guests) <= 0) {
      errors.guests = 'Количество гостей должно быть больше 0'
    }

    if (formData.childAge && (parseInt(formData.childAge) < 0 || parseInt(formData.childAge) > 99)) {
      errors.childAge = 'Возраст ребенка должен быть от 0 до 99 лет'
    }

    if (formData.notes && formData.notes.length > 500) {
      errors.notes = 'Примечание не должно превышать 500 символов'
    }

    // Диагностика для отладки
    console.log('Form Data:', formData)
    console.log('Validation Errors:', errors)
    console.log('Обязательные поля:', {
      name: formData.name.trim(),
      hall: formData.hall,
      date: formData.date,
      time: formData.time
    })

    // Если есть ошибки валидации, показываем их
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      toast({
        title: "⚠️ Ошибка валидации",
        description: "Пожалуйста, исправьте отмеченные поля",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Подготовка данных для WhatsApp
      const bookingData = {
        customerName: formData.name,
        customerPhone: formData.phone || undefined,
        customerEmail: formData.email || undefined,
        hallType: formData.hall,
        date: new Date(formData.date),
        time: formData.time,
        duration: 2, // По умолчанию 2 часа
        guestCount: parseInt(formData.guests) || 0,
        packageType: formData.package,
        totalAmount: 0, // Будет рассчитано позже
        status: 'pending' as const,
        notes: formData.notes,
        childAge: formData.childAge ? parseInt(formData.childAge) : undefined,
        favoriteHero: formData.favoriteHero || undefined
      }

      // Отправляем сообщение в WhatsApp
      await sendWhatsAppMessage(bookingData)

      // Track successful booking submission
      analytics.trackWhatsApp(bookingData)
      analytics.trackEvent('booking_completed', {
        event_category: 'conversion',
        hall_type: bookingData.hallType,
        package_type: bookingData.packageType,
        guest_count: bookingData.guestCount,
        child_age: bookingData.childAge
      })

      // Track funnel completion
      if (funnelId) {
        trackBookingFunnelSteps.formSubmitted(funnelId, bookingData.totalAmount || 0)
        trackBookingFunnelSteps.whatsappRedirect(funnelId)
        completeBookingFunnel(funnelId, bookingData.totalAmount || 0)
      }

      toast({
        title: "🎉 Заявка отправлена!",
        description: "Сообщение отправлено в WhatsApp. Мы свяжемся с вами в течение 30 минут для подтверждения.",
      })

    } catch (error) {
      console.error('Ошибка отправки в WhatsApp:', error)
      setNetworkError('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.')

      toast({
        title: "❌ Ошибка отправки",
        description: "Не удалось отправить сообщение в WhatsApp. Проверьте подключение к интернету и попробуйте еще раз.",
      })
    } finally {
      setIsSubmitting(false)
    }

    // Очистка данных только при успешной отправке
    if (!networkError) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        hall: '0+',
        date: '',
        time: '',
        guests: '',
        package: '',
        notes: '',
        childAge: '',
        favoriteHero: ''
      })
      localStorage.removeItem('bookingForm')
      setStep(1)
      onClose()
    }
  }

  if (!isOpen) return null

  // Валидация шагов
  const canProceedToStep2 = formData.name.trim() // Телефон больше не обязателен
  const canProceedToStep3 = formData.hall && formData.date && formData.time
  const canSubmit = formData.name.trim() && formData.hall && formData.date && formData.time

  const handleBackdropClick = (_e: React.MouseEvent) => {
    // Полностью отключаем закрытие по клику на фон
    // Модальное окно можно закрыть только кнопкой X
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 booking-modal-container"
      onClick={handleBackdropClick}
    >
      <Card 
        className="w-full max-w-3xl max-h-[98vh] sm:max-h-[95vh] overflow-y-auto bg-gradient-to-br from-white to-slate-50 border-0 shadow-2xl animate-fade-in-up rounded-none sm:rounded-lg booking-modal-mobile modal-mobile sm:modal-mobile"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 sm:p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-white text-lg sm:text-xl font-bold truncate">Бронирование праздника</CardTitle>
                <p className="text-emerald-100 text-xs sm:text-sm hidden sm:block">Создадим незабываемый день для вашего ребенка</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </CardHeader>

        {/* Индикатор шагов */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {[
              { num: 1, title: 'Контакты', icon: User },
              { num: 2, title: 'Детали', icon: Calendar },
              { num: 3, title: 'Дополнительно', icon: Gift }
            ].map((stepInfo, index) => (
              <div key={stepInfo.num} className="flex items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                  step >= stepInfo.num 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepInfo.num ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <stepInfo.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>
                <div className="ml-2 sm:ml-3 hidden md:block">
                  <div className={`text-xs sm:text-sm font-semibold ${
                    step >= stepInfo.num ? 'text-emerald-600' : 'text-gray-500'
                  }`}>
                    {stepInfo.title}
                  </div>
                </div>
                {index < 2 && (
                  <div className={`w-8 sm:w-16 h-1 mx-2 sm:mx-4 transition-all duration-300 ${
                    step > stepInfo.num 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
            Шаг {step} из 3 • {step === 1 ? 'Контактная информация' : step === 2 ? 'Детали мероприятия' : 'Дополнительные пожелания'}
          </p>
        </div>

        <CardContent 
          className="px-4 sm:px-6 pb-4 sm:pb-6"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            {/* Шаг 1: Контактная информация */}
            {step === 1 && (
              <div 
                className="space-y-4 sm:space-y-6 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Контактная информация</h3>
                  <p className="text-sm sm:text-base text-gray-600">Расскажите, как с вами связаться</p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-2 sm:mb-3 text-gray-700">
                      <User className="w-4 h-4 inline mr-2" />
                      Ваше имя <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Введите ваше имя"
                      className={`h-12 sm:h-14 text-base sm:text-lg border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 ${
                        validationErrors.name 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-200 focus:border-emerald-500'
                      }`}
                      required
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                        <span className="w-3 h-3 sm:w-4 sm:h-4 mr-1">⚠️</span>
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold mb-2 sm:mb-3 text-gray-700">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Телефон <span className="text-gray-400 text-xs">(необязательно)</span>
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Если не укажете телефон, мы свяжемся через WhatsApp
                    </p>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold mb-2 sm:mb-3 text-gray-700">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email <span className="text-gray-400 text-xs">(необязательно)</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="your@email.com"
                      className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <span className="w-3 h-3 mr-1">📧</span>
                      Для отправки подтверждения бронирования
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Шаг 2: Детали мероприятия */}
            {step === 2 && (
              <div 
                className="space-y-4"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">Детали мероприятия</h3>

                <div>
                  <label className="block text-sm font-medium mb-3">Выберите зал</label>
                  <div className={`grid grid-cols-2 gap-3 ${validationErrors.hall ? 'ring-2 ring-red-500 rounded-lg p-2' : ''}`}>
                    <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hall === '0+' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        value="0+"
                        checked={formData.hall === '0+'}
                        onChange={(e) => updateField('hall', e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-3xl mb-2">👶</div>
                        <div className="font-semibold">Малыш</div>
                        <div className="text-sm text-gray-500">0-6 лет</div>
                      </div>
                    </label>

                    <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hall === '7+' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        value="7+"
                        checked={formData.hall === '7+'}
                        onChange={(e) => updateField('hall', e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-3xl mb-2">🚀</div>
                        <div className="font-semibold">Исследователь</div>
                        <div className="text-sm text-gray-500">7+ лет</div>
                      </div>
                    </label>
                  </div>
                  {validationErrors.hall && (
                    <p className="text-red-500 text-sm mt-2">{validationErrors.hall}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Дата <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`h-12 ${validationErrors.date ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.date && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Время <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => updateField('time', e.target.value)}
                      className={`h-12 ${validationErrors.time ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.time && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.time}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Количество гостей
                  </label>
                  <Input
                    type="number"
                    value={formData.guests}
                    onChange={(e) => updateField('guests', e.target.value)}
                    placeholder="Примерное количество"
                    min="1"
                    className="h-12"
                  />
                </div>
              </div>
            )}

            {/* Шаг 3: Дополнительные услуги */}
            {step === 3 && (
              <div 
                className="space-y-4"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">Дополнительные услуги</h3>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Пакет услуг
                  </label>
                  <div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <label 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.package === '' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        updateField('package', '')
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <input
                        type="radio"
                        name="package"
                        value=""
                        checked={formData.package === ''}
                        onChange={(e) => {
                          e.stopPropagation()
                          updateField('package', e.target.value)
                        }}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">🎉</div>
                        <div className="font-semibold">Без пакета</div>
                        <div className="text-sm text-gray-500">Только аренда зала</div>
                      </div>
                    </label>

                    <label 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.package === 'standard' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        updateField('package', 'standard')
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <input
                        type="radio"
                        name="package"
                        value="standard"
                        checked={formData.package === 'standard'}
                        onChange={(e) => {
                          e.stopPropagation()
                          updateField('package', e.target.value)
                        }}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">⭐</div>
                        <div className="font-semibold">Стандарт</div>
                        <div className="text-sm text-gray-500">15 000₽</div>
                      </div>
                    </label>

                    <label 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.package === 'optimal' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        updateField('package', 'optimal')
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <input
                        type="radio"
                        name="package"
                        value="optimal"
                        checked={formData.package === 'optimal'}
                        onChange={(e) => {
                          e.stopPropagation()
                          updateField('package', e.target.value)
                        }}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">🌟</div>
                        <div className="font-semibold">Оптимальный</div>
                        <div className="text-sm text-gray-500">22 500₽</div>
                      </div>
                    </label>

                    <label 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.package === 'premium' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        updateField('package', 'premium')
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <input
                        type="radio"
                        name="package"
                        value="premium"
                        checked={formData.package === 'premium'}
                        onChange={(e) => {
                          e.stopPropagation()
                          updateField('package', e.target.value)
                        }}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">💎</div>
                        <div className="font-semibold">Премиум</div>
                        <div className="text-sm text-gray-500">48 500₽</div>
                      </div>
                    </label>

                    <label 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.package === 'soap' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        updateField('package', 'soap')
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <input
                        type="radio"
                        name="package"
                        value="soap"
                        checked={formData.package === 'soap'}
                        onChange={(e) => {
                          e.stopPropagation()
                          updateField('package', e.target.value)
                        }}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">🧼</div>
                        <div className="font-semibold">Мыльное шоу</div>
                        <div className="text-sm text-gray-500">21 500₽</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Новые поля для подбора аниматора */}
                <div 
                  className="bg-blue-50 p-4 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <h4 className="font-semibold text-blue-900 mb-3">🎭 Информация для подбора аниматора</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Возраст ребенка (лет)
                      </label>
                      <Input
                        type="number"
                        value={formData.childAge}
                        onChange={(e) => updateField('childAge', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                        placeholder="Например: 5"
                        min="0"
                        max="18"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Любимый герой/персонаж
                      </label>
                      <Input
                        type="text"
                        value={formData.favoriteHero}
                        onChange={(e) => updateField('favoriteHero', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                        placeholder="Например: Человек-паук, Эльза..."
                        className="h-12"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Укажите любимого персонажа ребенка для подбора аниматора
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-blue-700 mt-2">
                    💡 Эта информация поможет нам подобрать идеального аниматора для вашего ребенка!
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Особые пожелания
                  </label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    placeholder="Расскажите о ваших пожеланиях..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Сводка заявки */}
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">📋 Ваша заявка:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Имя:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    {formData.phone && (
                    <div className="flex justify-between">
                      <span>Телефон:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    )}
                    <div className="flex justify-between">
                      <span>Зал:</span>
                      <span className="font-medium">
                        {formData.hall === '0+' ? 'Малыш (0+)' : 'Исследователь (7+)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Дата:</span>
                      <span className="font-medium">
                        {formData.date ? new Date(formData.date).toLocaleDateString('ru-RU') : '-'}
                      </span>
                    </div>
                    {formData.time && (
                      <div className="flex justify-between">
                        <span>Время:</span>
                        <span className="font-medium">{formData.time}</span>
                      </div>
                    )}
                    {formData.childAge && (
                      <div className="flex justify-between">
                        <span>Возраст ребенка:</span>
                        <span className="font-medium">{formData.childAge} лет</span>
                      </div>
                    )}
                    {formData.favoriteHero && (
                      <div className="flex justify-between">
                        <span>Любимый герой:</span>
                        <span className="font-medium">{formData.favoriteHero}</span>
                      </div>
                    )}
                    {formData.package && (
                      <div className="flex justify-between">
                        <span>Пакет:</span>
                        <span className="font-medium">
                          {formData.package === 'standard' ? 'Стандарт (15 000₽)' :
                           formData.package === 'optimal' ? 'Оптимальный (22 500₽)' :
                           formData.package === 'premium' ? 'Премиум (48 500₽)' :
                           formData.package === 'soap' ? 'Мыльное шоу (21 500₽)' :
                           'Без пакета'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center text-green-800">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        После отправки заявка будет автоматически отправлена в WhatsApp
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Кнопки навигации */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="w-full sm:flex-1 h-12 sm:h-12 text-sm sm:text-base font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Назад
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={step === 1 ? !canProceedToStep2 : !canProceedToStep3}
                  className="w-full sm:flex-1 h-12 sm:h-12 text-sm sm:text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  Далее
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={!canSubmit || isSubmitting}
                  onClick={handleSubmit}
                  className="w-full sm:flex-1 h-12 sm:h-12 text-sm sm:text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      <span className="hidden sm:inline">Отправка в WhatsApp...</span>
                      <span className="sm:hidden">Отправка...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="hidden sm:inline">Отправить в WhatsApp</span>
                      <span className="sm:hidden">Отправить</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
