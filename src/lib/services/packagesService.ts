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
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Package } from '../../types';

const COLLECTION_NAME = 'packages';

const convertTimestamps = (data: any): Package => {
  return {
    ...data,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    updatedAt: data.updatedAt?.toDate?.() || new Date(),
  };
};

// Получить все пакеты
export const getAllPackages = async (): Promise<Package[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

// Получить активные пакеты
export const getActivePackages = async (): Promise<Package[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isActive', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching active packages:', error);
    throw error;
  }
};

// Получить пакет по ID
export const getPackageById = async (id: string): Promise<Package | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() });
    }
    return null;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

// Создать новый пакет
export const createPackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...packageData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};

// Обновить пакет
export const updatePackage = async (id: string, packageData: Partial<Package>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...packageData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

// Удалить пакет
export const deletePackage = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting package:', error);
    throw error;
  }
};

// Переключить активность пакета
export const togglePackageActive = async (id: string, isActive: boolean): Promise<void> => {
  try {
    await updatePackage(id, { isActive });
  } catch (error) {
    console.error('Error toggling package active:', error);
    throw error;
  }
};
