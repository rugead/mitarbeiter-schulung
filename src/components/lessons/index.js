
import { setDoc, doc, serverTimestamp, updateDoc, collection } from '@firebase/firestore';
import { db } from '../../firebase'

// export const createUserData = async (user) => {
//   if (!user) return
//   const docRef = await doc(db, "users", user.uid)

//   if (!docRef.exists){
//     const payload = {
//       name: user.displayName,
//       email: user.email, 
//       role: ['student'],
//       timestamp: serverTimestamp()
//     }
//     setDoc(docRef, payload)
//     .catch((err) => alert(err))
//   } 
// }

export const createLessonData = async (user, lessonData) => {
  if (!user) return
  const newLessonRef = await doc(collection(db, "lessons"))
  await setDoc(newCityRef, data);

  // if (!docRef.exists){
  //   const payload = {
  //     name: user.displayName,
  //     email: user.email, 
  //     role: ['student'],
  //     timestamp: serverTimestamp()
  //   }
  //   setDoc(docRef, payload)
  //   .catch((err) => alert(err))
  // } else {
  //   updateDoc(doc, ...userData)
  //   .catch((err) => alert(err))
  // }
}