import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc,
  updateDoc,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../firebase/config'
import type { SiteSetting } from '../../types'

const COLLECTION_NAME = 'settings'

const convertTimestamps = (data: any): SiteSetting => {
  return {
    ...data,
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
  }
}

// Получить все настройки
export const getAllSettings = async (): Promise<SiteSetting[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
    return querySnapshot.docs.map(doc => convertTimestamps({ key: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching settings:', error)
    throw error
  }
}

// Получить настройку по ключу
export const getSettingByKey = async (key: string): Promise<SiteSetting | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, key)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return convertTimestamps({ key: docSnap.id, ...docSnap.data() })
    }
    return null
  } catch (error) {
    console.error('Error fetching setting:', error)
    throw error
  }
}

// Получить значение настройки
export const getSettingValue = async <T = any>(key: string, defaultValue?: T): Promise<T> => {
  try {
    const setting = await getSettingByKey(key)
    return setting ? setting.value : defaultValue
  } catch (error) {
    console.error('Error fetching setting value:', error)
    return defaultValue as T
  }
}

// Установить или обновить настройку
export const setSetting = async (
  key: string, 
  value: any, 
  type: 'string' | 'number' | 'boolean' | 'json',
  description: string = ''
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, key)
    await setDoc(docRef, {
      value,
      type,
      description,
      updatedAt: Timestamp.now(),
    }, { merge: true })
  } catch (error) {
    console.error('Error setting value:', error)
    throw error
  }
}

// Обновить настройку
export const updateSetting = async (key: string, value: any): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, key)
    await updateDoc(docRef, {
      value,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating setting:', error)
    throw error
  }
}

// Получить несколько настроек по ключам
export const getMultipleSettings = async (keys: string[]): Promise<Record<string, any>> => {
  try {
    const settings: Record<string, any> = {}
    const promises = keys.map(async (key) => {
      const value = await getSettingValue(key)
      if (value !== undefined) {
        settings[key] = value
      }
    })
    await Promise.all(promises)
    return settings
  } catch (error) {
    console.error('Error fetching multiple settings:', error)
    throw error
  }
}

// Инициализировать настройки по умолчанию
export const initializeDefaultSettings = async (): Promise<void> => {
  try {
    const defaultSettings: Array<{
      key: string
      value: any
      type: 'string' | 'number' | 'boolean' | 'json'
      description: string
    }> = [
      {
        key: 'site_title',
        value: 'Эко-лофт "Арка"',
        type: 'string',
        description: 'Название сайта'
      },
      {
        key: 'site_description',
        value: 'Пространство для семейного счастья в Новосибирске',
        type: 'string',
        description: 'Описание сайта'
      },
      {
        key: 'contact_phone',
        value: '+7 (913) 123-45-67',
        type: 'string',
        description: 'Контактный телефон'
      },
      {
        key: 'contact_email',
        value: 'info@arkaloft.ru',
        type: 'string',
        description: 'Контактный email'
      },
      {
        key: 'contact_address',
        value: 'г. Новосибирск, Дзержинский район',
        type: 'string',
        description: 'Адрес'
      },
      {
        key: 'working_hours',
        value: 'Ежедневно с 9:00 до 21:00',
        type: 'string',
        description: 'Часы работы'
      },
      {
        key: 'social_vk',
        value: 'https://vk.com/arkaloft',
        type: 'string',
        description: 'Ссылка на VK'
      },
      {
        key: 'social_instagram',
        value: 'https://instagram.com/arkaloft',
        type: 'string',
        description: 'Ссылка на Instagram'
      },
      {
        key: 'booking_slots_warning',
        value: 3,
        type: 'number',
        description: 'Количество оставшихся слотов для предупреждения'
      },
      {
        key: 'booking_urgency_enabled',
        value: true,
        type: 'boolean',
        description: 'Показывать предупреждение об ограниченных слотах'
      }
    ]

    const promises = defaultSettings.map(setting => 
      setSetting(setting.key, setting.value, setting.type, setting.description)
    )
    
    await Promise.all(promises)
    console.log('Default settings initialized')
  } catch (error) {
    console.error('Error initializing default settings:', error)
    throw error
  }
}
