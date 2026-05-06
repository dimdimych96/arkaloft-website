import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll 
} from 'firebase/storage'
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { storage, db } from '../firebase/config'
import type { MediaFile } from '../../types'

const COLLECTION_NAME = 'media'
const STORAGE_PATH = 'images'

const convertTimestamps = (data: any): MediaFile => {
  return {
    ...data,
    uploadedAt: data.uploadedAt?.toDate?.() || new Date(),
  }
}

// Загрузить файл
export const uploadMedia = async (
  file: File, 
  category: string = 'general',
  alt?: string
): Promise<MediaFile> => {
  try {
    // Генерируем уникальное имя файла
    const timestamp = Date.now()
    const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const storagePath = `${STORAGE_PATH}/${category}/${filename}`
    
    // Загружаем файл в Storage
    const storageRef = ref(storage, storagePath)
    await uploadBytes(storageRef, file)
    
    // Получаем URL
    const url = await getDownloadURL(storageRef)
    
    // Сохраняем метаданные в Firestore
    const mediaData = {
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url,
      alt: alt || '',
      category,
      uploadedAt: Timestamp.now(),
    }
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), mediaData)
    
    return {
      id: docRef.id,
      ...mediaData,
      uploadedAt: new Date(),
    }
  } catch (error) {
    console.error('Error uploading media:', error)
    throw error
  }
}

// Получить все медиа файлы
export const getAllMedia = async (): Promise<MediaFile[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('uploadedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching media:', error)
    throw error
  }
}

// Получить медиа по категории
export const getMediaByCategory = async (category: string): Promise<MediaFile[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category),
      orderBy('uploadedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching media by category:', error)
    throw error
  }
}

// Получить медиа файл по ID
export const getMediaById = async (id: string): Promise<MediaFile | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() })
    }
    return null
  } catch (error) {
    console.error('Error fetching media:', error)
    throw error
  }
}

// Удалить медиа файл
export const deleteMedia = async (id: string): Promise<void> => {
  try {
    // Получаем данные файла
    const media = await getMediaById(id)
    if (!media) {
      throw new Error('Media not found')
    }
    
    // Удаляем файл из Storage
    const category = media.category || 'general'
    const storagePath = `${STORAGE_PATH}/${category}/${media.filename}`
    const storageRef = ref(storage, storagePath)
    await deleteObject(storageRef)
    
    // Удаляем метаданные из Firestore
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting media:', error)
    throw error
  }
}

// Загрузить несколько файлов
export const uploadMultipleMedia = async (
  files: File[], 
  category: string = 'general'
): Promise<MediaFile[]> => {
  try {
    const uploadPromises = files.map(file => uploadMedia(file, category))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading multiple media:', error)
    throw error
  }
}

// Получить список категорий
export const getMediaCategories = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
    const categories = new Set<string>()
    querySnapshot.docs.forEach(doc => {
      const data = doc.data()
      if (data.category) {
        categories.add(data.category)
      }
    })
    return Array.from(categories).sort()
  } catch (error) {
    console.error('Error fetching media categories:', error)
    throw error
  }
}
