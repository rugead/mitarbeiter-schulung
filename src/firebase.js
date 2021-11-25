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
  const [userData, setUserData]= useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setUserData, setError)
    return () => unsubscribe()
  }, [user])
  
  return <AuthContext.Provider value={{ user, userData, error }} {...props} />
}






export function useUser() {
  const {user, userData, error} = useContext(AuthContext)
  // const docRef = doc((getFirestore(), "users", user.id))
  // const docSnap =  getDoc(docRef);
  // const userData= docSnap.exists() ? docSnap.data() :  console.log("No such document!")
  // console.log('userData: ', userData);

  // console.log('useCurrentUser firebase: ', user, error)
  return { user, error, userData }
}



export const db = getFirestore()