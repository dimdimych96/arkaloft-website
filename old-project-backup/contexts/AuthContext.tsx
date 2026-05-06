import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase/config'

interface AdminData {
  role: 'admin' | 'moderator'
  isActive: boolean
  email: string
  username: string
}

interface AuthContextType {
  user: User | null
  adminData: AdminData | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
  isModerator: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        // Загружаем данные администратора из Firestore
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid))
          if (adminDoc.exists()) {
            setAdminData(adminDoc.data() as AdminData)
          } else {
            setAdminData(null)
          }
        } catch (error) {
          console.error('Error fetching admin data:', error)
          setAdminData(null)
        }
      } else {
        setAdminData(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      // Проверяем, что пользователь является администратором
      const adminDoc = await getDoc(doc(db, 'admins', result.user.uid))
      if (!adminDoc.exists()) {
        await firebaseSignOut(auth)
        throw new Error('У вас нет прав администратора')
      }
      
      const data = adminDoc.data() as AdminData
      if (!data.isActive) {
        await firebaseSignOut(auth)
        throw new Error('Ваш аккаунт деактивирован')
      }
      
      setAdminData(data)
    } catch (error: any) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setAdminData(null)
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const isAdmin = adminData?.role === 'admin' && adminData?.isActive === true
  const isModerator = adminData?.isActive === true

  const value = {
    user,
    adminData,
    loading,
    signIn,
    signOut,
    isAdmin,
    isModerator,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
