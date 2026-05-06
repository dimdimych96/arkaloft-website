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
import type { Booking } from '../../types'

const COLLECTION_NAME = 'bookings'

const convertTimestamps = (data: any): Booking => {
  return {
    ...data,
    date: data.date?.toDate?.() || new Date(),
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
  }
}

export const getAllBookings = async (): Promise<Booking[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('date', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
}

export const getBookingsByStatus = async (status: 'pending' | 'confirmed' | 'cancelled'): Promise<Booking[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('date', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching bookings by status:', error)
    throw error
  }
}

export const getBookingsByDateRange = async (startDate: Date, endDate: Date): Promise<Booking[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching bookings by date range:', error)
    throw error
  }
}

export const getBookingById = async (id: string): Promise<Booking | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() })
    }
    return null
  } catch (error) {
    console.error('Error fetching booking:', error)
    throw error
  }
}

export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...bookingData,
      date: Timestamp.fromDate(bookingData.date),
      whatsappSent: false, // По умолчанию сообщение не отправлено
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}

export const updateBooking = async (id: string, bookingData: Partial<Booking>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const updateData: any = {
      ...bookingData,
      updatedAt: Timestamp.now(),
    }
    
    if (bookingData.date) {
      updateData.date = Timestamp.fromDate(bookingData.date)
    }
    
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error('Error updating booking:', error)
    throw error
  }
}

export const deleteBooking = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting booking:', error)
    throw error
  }
}

export const updateBookingStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<void> => {
  try {
    await updateBooking(id, { status })
  } catch (error) {
    console.error('Error updating booking status:', error)
    throw error
  }
}

export const getUpcomingBookings = async (): Promise<Booking[]> => {
  try {
    const now = new Date()
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '>=', Timestamp.fromDate(now)),
      where('status', '==', 'confirmed'),
      orderBy('date', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching upcoming bookings:', error)
    throw error
  }
}
