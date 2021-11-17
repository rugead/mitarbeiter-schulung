
import { setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase'

export const createUserData = async (user) => {
  if (!user) return
  const docRef = await doc(db, "users", user.uid)

  if (!docRef.exists){
    const payload = {
      name: user.displayName,
      email: user.email, 
      role: ['student'],
      timestamp: serverTimestamp()
    }
    setDoc(docRef, payload)
    .catch((err) => alert(err))
  } 
}

export const updateUserData = async (user, userData) => {
  if (!user) return
  const docRef = await doc(db, "users", user.uid)

  if (!docRef.exists){
    const payload = {
      name: user.displayName,
      email: user.email, 
      role: ['student'],
      timestamp: serverTimestamp()
    }
    setDoc(docRef, payload)
    .catch((err) => alert(err))
  } else {
    updateDoc(doc, ...userData)
    .catch((err) => alert(err))
  }
}