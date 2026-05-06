import type { Booking } from '../../types'

// Конфигурация WhatsApp
const WHATSAPP_API_URL = 'https://api.whatsapp.com/send'
const WHATSAPP_PHONE = '+79139441996' // Замените на ваш номер WhatsApp

// Популярные супергерои и персонажи для детей
export const POPULAR_HEROES = [
  'Человек-паук',
  'Бэтмен',
  'Супермен',
  'Черепашки-ниндзя',
  'Трансформеры',
  'Миньоны',
  'Эльза (Холодное сердце)',
  'Анна (Холодное сердце)',
  'Моана',
  'Рапунцель',
  'Белль (Красавица и чудовище)',
  'Ариэль (Русалочка)',
  'Золушка',
  'Белоснежка',
  'Принцесса Жасмин',
  'Покемоны',
  'Майнкрафт',
  'Фортнайт',
  'Роблокс',
  'Другое'
]

/**
 * Формирует сообщение для WhatsApp на основе данных бронирования
 */
export const generateWhatsAppMessage = (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): string => {
  const hallName = booking.hallType === '0+' ? 'Малыш (0-6 лет)' : 
                   booking.hallType === '7+' ? 'Исследователь (7+ лет)' : 'Любой зал'
  
  const date = new Date(booking.date).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  let message = `🎉 *Новая заявка на бронирование праздника!*\n\n`
  message += `👤 *Контактная информация:*\n`
  message += `• Имя: ${booking.customerName}\n`
  
  if (booking.customerPhone) {
    message += `• Телефон: ${booking.customerPhone}\n`
  }
  
  if (booking.customerEmail) {
    message += `• Email: ${booking.customerEmail}\n`
  }
  
  message += `\n🎪 *Детали мероприятия:*\n`
  message += `• Зал: ${hallName}\n`
  message += `• Дата: ${date}\n`
  message += `• Время: ${booking.time}\n`
  message += `• Количество гостей: ${booking.guestCount || 'не указано'}\n`
  
  if (booking.packageType) {
    message += `• Пакет: ${booking.packageType}\n`
  }
  
  // Новые поля для аниматора
  if (booking.childAge) {
    message += `\n👶 *Информация о ребенке:*\n`
    message += `• Возраст ребенка: ${booking.childAge} лет\n`
    
    if (booking.favoriteHero) {
      message += `• Любимый герой/персонаж: ${booking.favoriteHero}\n`
    }
  }
  
  if (booking.notes) {
    message += `\n📝 *Особые пожелания:*\n${booking.notes}\n`
  }
  
  message += `\n⏰ *Заявка создана:* ${new Date().toLocaleString('ru-RU')}\n`
  message += `\n📞 Пожалуйста, свяжитесь с клиентом для подтверждения бронирования!`
  
  return message
}

/**
 * Создает ссылку для отправки сообщения в WhatsApp
 */
export const createWhatsAppLink = (message: string, phone?: string): string => {
  const targetPhone = phone || WHATSAPP_PHONE
  const encodedMessage = encodeURIComponent(message)
  return `${WHATSAPP_API_URL}?phone=${targetPhone}&text=${encodedMessage}`
}

/**
 * Отправляет сообщение в WhatsApp (открывает приложение/веб-версию)
 */
export const sendWhatsAppMessage = (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): void => {
  const message = generateWhatsAppMessage(booking)
  const whatsappLink = createWhatsAppLink(message, booking.customerPhone)
  
  // Открываем WhatsApp в новом окне/вкладке
  window.open(whatsappLink, '_blank')
}

/**
 * Проверяет, поддерживает ли устройство WhatsApp
 */
export const isWhatsAppSupported = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('whatsapp') || 
         userAgent.includes('android') || 
         userAgent.includes('iphone') || 
         userAgent.includes('ipad')
}

/**
 * Получает список популярных героев для выбора
 */
export const getPopularHeroes = (): string[] => {
  return POPULAR_HEROES
}
