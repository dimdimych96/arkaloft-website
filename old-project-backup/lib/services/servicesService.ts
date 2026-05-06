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
import type { Service } from '../../types'

const COLLECTION_NAME = 'services'

const convertTimestamps = (data: any): Service => {
  return {
    ...data,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
  }
}

export const getAllServices = async (): Promise<Service[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('order', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching services:', error)
    throw error
  }
}

export const getActiveServices = async (): Promise<Service[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isActive', '==', true)
    )
    const querySnapshot = await getDocs(q)
    // Сортируем на клиенте
    const services = querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
    return services.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error fetching active services:', error)
    throw error
  }
}

export const getServicesByCategory = async (category: 'main' | 'additional'): Promise<Service[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching services by category:', error)
    throw error
  }
}

export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() })
    }
    return null
  } catch (error) {
    console.error('Error fetching service:', error)
    throw error
  }
}

export const createService = async (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...serviceData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating service:', error)
    throw error
  }
}

export const updateService = async (id: string, serviceData: Partial<Service>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...serviceData,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating service:', error)
    throw error
  }
}

export const deleteService = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting service:', error)
    throw error
  }
}

export const toggleServiceActive = async (id: string, isActive: boolean): Promise<void> => {
  try {
    await updateService(id, { isActive })
  } catch (error) {
    console.error('Error toggling service active:', error)
    throw error
  }
}

export const reorderServices = async (services: { id: string; order: number }[]): Promise<void> => {
  try {
    const updatePromises = services.map(({ id, order }) => 
      updateService(id, { order })
    )
    await Promise.all(updatePromises)
  } catch (error) {
    console.error('Error reordering services:', error)
    throw error
  }
}
