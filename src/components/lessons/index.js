
import { setDoc, doc,  collection } from '@firebase/firestore';
import { db } from '../../firebase'

export const createLessonData = async (user, lessonData) => {
  if (!user) return
  const newLessonRef = await doc(collection(db, "lessons"))
  await setDoc(newLessonRef, lessonData);
}