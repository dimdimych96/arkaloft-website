import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../firebase/config'

/**
 * Загружает файл в Firebase Storage
 * @param file - Файл для загрузки
 * @param path - Путь в Storage (например: 'halls/image.jpg')
 * @returns URL загруженного файла
 */
export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

/**
 * Загружает изображение с автоматическим именем
 * @param file - Файл изображения
 * @param folder - Папка в Storage ('halls', 'packages', 'services')
 * @returns URL загруженного изображения
 */
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  const timestamp = Date.now()
  const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
  const path = `${folder}/${fileName}`
  return uploadFile(file, path)
}

/**
 * Удаляет файл из Firebase Storage по URL
 * @param url - URL файла в Firebase Storage
 */
export const deleteFileByUrl = async (url: string): Promise<void> => {
  try {
    // Извлекаем путь из URL
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/'
    if (!url.startsWith(baseUrl)) {
      console.warn('URL is not a Firebase Storage URL')
      return
    }

    const pathStart = url.indexOf('/o/') + 3
    const pathEnd = url.indexOf('?')
    const encodedPath = url.substring(pathStart, pathEnd)
    const path = decodeURIComponent(encodedPath)

    const fileRef = ref(storage, path)
    await deleteObject(fileRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

/**
 * Валидация файла изображения
 * @param file - Файл для проверки
 * @param maxSizeMB - Максимальный размер в МБ (по умолчанию 5)
 * @returns true если файл валиден, иначе выбрасывает ошибку
 */
export const validateImageFile = (file: File, maxSizeMB: number = 5): boolean => {
  // Проверка типа файла
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Неподдерживаемый формат файла. Используйте JPG, PNG, WEBP или GIF')
  }

  // Проверка размера файла
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    throw new Error(`Размер файла не должен превышать ${maxSizeMB} МБ`)
  }

  return true
}

/**
 * Оптимизирует изображение перед загрузкой (уменьшает размер)
 * @param file - Исходный файл
 * @param maxWidth - Максимальная ширина (по умолчанию 1920)
 * @param quality - Качество сжатия 0-1 (по умолчанию 0.8)
 * @returns Оптимизированный файл
 */
export const optimizeImage = async (
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        // Уменьшаем размер если нужно
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
              resolve(optimizedFile)
            } else {
              reject(new Error('Failed to optimize image'))
            }
          },
          'image/jpeg',
          quality
        )
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
  })
}
