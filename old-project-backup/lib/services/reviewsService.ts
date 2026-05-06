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
import type { Review } from '../../types'

const COLLECTION_NAME = 'reviews'

const convertTimestamps = (data: any): Review => {
  return {
    ...data,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
  }
}

export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}

export const getApprovedReviews = async (): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isApproved', '==', true),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching approved reviews:', error)
    throw error
  }
}

export const getPendingReviews = async (): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isApproved', '==', false),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching pending reviews:', error)
    throw error
  }
}

export const getReviewsByHallType = async (hallType: '0+' | '7+' | 'both'): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('hallType', '==', hallType),
      where('isApproved', '==', true),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching reviews by hall type:', error)
    throw error
  }
}

export const getReviewById = async (id: string): Promise<Review | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() })
    }
    return null
  } catch (error) {
    console.error('Error fetching review:', error)
    throw error
  }
}

export const createReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...reviewData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

export const updateReview = async (id: string, reviewData: Partial<Review>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...reviewData,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating review:', error)
    throw error
  }
}

export const deleteReview = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}

export const approveReview = async (id: string): Promise<void> => {
  try {
    await updateReview(id, { isApproved: true })
  } catch (error) {
    console.error('Error approving review:', error)
    throw error
  }
}

export const rejectReview = async (id: string): Promise<void> => {
  try {
    await updateReview(id, { isApproved: false })
  } catch (error) {
    console.error('Error rejecting review:', error)
    throw error
  }
}
