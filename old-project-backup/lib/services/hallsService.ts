import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../firebase/config'
import type { Hall } from '../../types'

const COLLECTION_NAME = 'halls'

// Конвертация Firestore Timestamp в Date
const convertTimestamps = (data: any): Hall => {
  return {
    ...data,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
  }
}

// Получить все залы
export const getAllHalls = async (): Promise<Hall[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('id', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching halls:', error)
    throw error
  }
}

// Получить активные залы
export const getActiveHalls = async (): Promise<Hall[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isActive', '==', true)
    )
    const querySnapshot = await getDocs(q)
    // Сортируем на клиенте
    const halls = querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
    return halls.sort((a, b) => a.id.localeCompare(b.id))
  } catch (error) {
    console.error('Error fetching active halls:', error)
    throw error
  }
}

// Получить зал по ID
export const getHallById = async (id: string): Promise<Hall | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() })
    }
    return null
  } catch (error) {
    console.error('Error fetching hall:', error)
    throw error
  }
}

// Создать новый зал
export const createHall = async (hallData: Omit<Hall, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...hallData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating hall:', error)
    throw error
  }
}

// Обновить зал
export const updateHall = async (id: string, hallData: Partial<Hall>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...hallData,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating hall:', error)
    throw error
  }
}

// Удалить зал
export const deleteHall = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting hall:', error)
    throw error
  }
}

// Переключить активность зала
export const toggleHallActive = async (id: string, isActive: boolean): Promise<void> => {
  try {
    await updateHall(id, { isActive })
  } catch (error) {
    console.error('Error toggling hall active:', error)
    throw error
  }
}
