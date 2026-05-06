import { z } from 'zod'

// Схема валидации для формы бронирования
export const bookingFormSchema = z.object({
  name: z.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(/^[а-яА-ЯёЁa-zA-Z\s]+$/, 'Имя может содержать только буквы и пробелы'),

  phone: z.string()
    .optional()
    .refine((val: string) => !val || /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(val), {
      message: 'Введите корректный номер телефона'
    }),

  email: z.string()
    .optional()
    .refine((val: string) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Введите корректный email адрес'
    }),

  hall: z.enum(['0+', '7+'], {
    required_error: 'Выберите зал для мероприятия'
  }),

  date: z.string()
    .min(1, 'Выберите дату мероприятия')
    .refine((val: string) => {
      const selectedDate = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, {
      message: 'Дата не может быть в прошлом'
    }),

  time: z.string()
    .min(1, 'Выберите время начала мероприятия')
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Введите корректное время в формате HH:MM'),

  guests: z.string()
    .optional()
    .refine((val: string) => !val || parseInt(val) > 0, {
      message: 'Количество гостей должно быть больше 0'
    }),

  package: z.string()
    .optional(),

  notes: z.string()
    .max(500, 'Примечание не должно превышать 500 символов')
    .optional(),

  childAge: z.string()
    .optional()
    .refine((val: string) => !val || (parseInt(val) >= 0 && parseInt(val) <= 18), {
      message: 'Возраст ребенка должен быть от 0 до 18 лет'
    }),

  favoriteHero: z.string()
    .optional()
})

// Тип для данных формы
export type BookingFormData = z.infer<typeof bookingFormSchema>

// Схема для серверной валидации (расширенная версия)
export const serverBookingSchema = bookingFormSchema.extend({
  // Дополнительные поля для серверной валидации
  totalAmount: z.number().min(0, 'Сумма должна быть положительной'),
  duration: z.number().min(1, 'Длительность должна быть минимум 1 час'),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type ServerBookingData = z.infer<typeof serverBookingSchema>
