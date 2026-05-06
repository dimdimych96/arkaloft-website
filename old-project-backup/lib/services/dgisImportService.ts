import { createReview } from './reviewsService'
import type { Review } from '../../types'

// Интерфейс для отзыва из 2GIS API
export interface DgisApiReview {
  id: string
  text: string
  rating: number
  date_created: string
  is_hidden: boolean
  user: {
    name: string
    photo_preview_urls?: {
      '320x'?: string
      '640x'?: string
      url?: string
    }
  }
}

// Интерфейс для полного ответа API 2GIS
export interface DgisApiResponse {
  meta: {
    branch_rating: number
    branch_reviews_count: number
    total_count: number
  }
  reviews: DgisApiReview[]
}

// Старый интерфейс для совместимости
export interface DgisReview {
  id: string
  text: string
  rating: number
  date: string
  user: {
    name: string
    avatar?: string
  }
}

// Интерфейс для импортированных данных
export interface ImportedReview {
  authorName: string
  authorAvatar?: string
  rating: number
  content: string
  hallType: '0+' | '7+' | 'both'
  originalDate?: Date
}

/**
 * Парсит JSON ответ от API 2GIS (новый формат)
 * Формат API ответа 2GIS с полными данными
 */
export const parseDgisApiResponse = (jsonData: string): ImportedReview[] => {
  try {
    const data: DgisApiResponse = JSON.parse(jsonData)
    
    if (!data.reviews || !Array.isArray(data.reviews)) {
      throw new Error('Неверный формат данных API 2GIS. Ожидается объект с полем "reviews"')
    }

    return data.reviews
      .filter(review => !review.is_hidden && review.text && review.text.trim().length > 0) // Фильтруем скрытые и пустые отзывы
      .map((review: DgisApiReview) => {
        if (!review.text || !review.rating || !review.user?.name) {
          throw new Error('Отзыв должен содержать text, rating и user.name')
        }

        // Выбираем лучшее качество аватара
        const avatar = review.user.photo_preview_urls?.['640x'] || 
                      review.user.photo_preview_urls?.['320x'] || 
                      review.user.photo_preview_urls?.url

        return {
          authorName: review.user.name,
          authorAvatar: avatar,
          rating: Math.min(5, Math.max(1, review.rating)), // Ограничиваем 1-5
          content: review.text.trim(),
          hallType: 'both' as const, // По умолчанию для обоих залов
          originalDate: new Date(review.date_created),
        }
      })
  } catch (error) {
    console.error('Error parsing 2GIS API response:', error)
    throw error
  }
}

/**
 * Парсит JSON с отзывами из 2GIS (старый формат для совместимости)
 * Формат ожидаемого JSON:
 * {
 *   "reviews": [
 *     {
 *       "id": "123",
 *       "text": "Отличное место!",
 *       "rating": 5,
 *       "date": "2024-01-15",
 *       "user": {
 *         "name": "Иван Иванов",
 *         "avatar": "https://..."
 *       }
 *     }
 *   ]
 * }
 */
export const parseDgisReviews = (jsonData: string): ImportedReview[] => {
  try {
    const data = JSON.parse(jsonData)
    
    if (!data.reviews || !Array.isArray(data.reviews)) {
      throw new Error('Неверный формат данных. Ожидается объект с полем "reviews"')
    }

    return data.reviews.map((review: DgisReview) => {
      if (!review.text || !review.rating || !review.user?.name) {
        throw new Error('Отзыв должен содержать text, rating и user.name')
      }

      return {
        authorName: review.user.name,
        authorAvatar: review.user.avatar,
        rating: Math.min(5, Math.max(1, review.rating)), // Ограничиваем 1-5
        content: review.text,
        hallType: 'both' as const, // По умолчанию для обоих залов
        originalDate: review.date ? new Date(review.date) : undefined,
      }
    })
  } catch (error) {
    console.error('Error parsing 2GIS reviews:', error)
    throw error
  }
}

/**
 * Импортирует отзывы в Firebase
 * @param reviews - массив отзывов для импорта
 * @param autoApprove - автоматически одобрять отзывы (по умолчанию false)
 * @returns объект с результатами импорта
 */
export const importReviews = async (
  reviews: ImportedReview[],
  autoApprove: boolean = false
): Promise<{
  success: number
  failed: number
  errors: string[]
}> => {
  let success = 0
  let failed = 0
  const errors: string[] = []

  for (const review of reviews) {
    try {
      await createReview({
        authorName: review.authorName,
        authorAvatar: review.authorAvatar,
        rating: review.rating,
        content: review.content,
        hallType: review.hallType,
        isApproved: autoApprove,
      })
      success++
    } catch (error) {
      failed++
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
      errors.push(`${review.authorName}: ${errorMessage}`)
      console.error(`Failed to import review from ${review.authorName}:`, error)
    }
  }

  return { success, failed, errors }
}

/**
 * Полный процесс импорта из API ответа 2GIS: парсинг + сохранение
 */
export const importFromDgisApi = async (
  jsonData: string,
  autoApprove: boolean = false
): Promise<{
  success: number
  failed: number
  errors: string[]
}> => {
  const reviews = parseDgisApiResponse(jsonData)
  return await importReviews(reviews, autoApprove)
}

/**
 * Полный процесс импорта (старый формат): парсинг + сохранение
 */
export const importFromJson = async (
  jsonData: string,
  autoApprove: boolean = false
): Promise<{
  success: number
  failed: number
  errors: string[]
}> => {
  const reviews = parseDgisReviews(jsonData)
  return await importReviews(reviews, autoApprove)
}

/**
 * Парсит CSV файл с отзывами
 * Формат CSV: name,rating,text,date,avatar
 */
export const parseReviewsFromCsv = (csvData: string): ImportedReview[] => {
  const lines = csvData.trim().split('\n')
  
  if (lines.length < 2) {
    throw new Error('CSV файл пуст или содержит только заголовок')
  }

  // Пропускаем заголовок
  const reviews: ImportedReview[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Простой парсинг CSV (для более сложных случаев используйте библиотеку)
    const parts = line.split(',').map(p => p.trim().replace(/^"|"$/g, ''))
    
    if (parts.length < 3) {
      console.warn(`Пропущена строка ${i + 1}: недостаточно данных`)
      continue
    }

    const [name, ratingStr, text, date, avatar] = parts
    const rating = parseInt(ratingStr, 10)

    if (!name || !text || isNaN(rating)) {
      console.warn(`Пропущена строка ${i + 1}: неверные данные`)
      continue
    }

    reviews.push({
      authorName: name,
      rating: Math.min(5, Math.max(1, rating)),
      content: text,
      hallType: 'both',
      originalDate: date ? new Date(date) : undefined,
      authorAvatar: avatar || undefined,
    })
  }

  return reviews
}

/**
 * Импорт из CSV
 */
export const importFromCsv = async (
  csvData: string,
  autoApprove: boolean = false
): Promise<{
  success: number
  failed: number
  errors: string[]
}> => {
  const reviews = parseReviewsFromCsv(csvData)
  return await importReviews(reviews, autoApprove)
}
