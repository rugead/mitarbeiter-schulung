import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import {  getFirestore } from 'firebase/firestore'
import { useState, useEffect, useContext, createContext } from 'react'

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const AuthContext = createContext()

export const AuthContextProvider = props => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
  
    return () => unsubscribe()
  }, [user])

  // useEffect(() => {
  //   const getUserData = async () => {
  //     if (!user) return 
  //     const docRef = doc(db, "users", user.uid)
  //     const docSnap = await getDoc(docRef);
  //     const userDoc = docSnap.data()
  //     setUserData(userDoc)        
  //     }
  //     return () => getUserData()
  // }, [user])


  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export function useUser() {
  const {user, error} = useContext(AuthContext)
  return { user, error}
}

export const db = getFirestore()