import { getAuth, signInWithPopup, updateProfile, updateEmail, sendEmailVerification, GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider()
const auth = getAuth()

export const signUpWithGoogle = (async e => {
    e.preventDefault()

    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      alert(e.message)
    }
  })



export const updateGoogleProfile = (async e => {
  e.preventDefault()
  try {
    await updateProfile(auth.currentUser, {
      displayName: "xxxx"
    })
  } catch (e) {
    alert(e.message)
  }
})

export const updateGoogleEmail = (async e => {
  e.preventDefault()
  try {
    await updateEmail(auth.currentUser,  "r.vogel@icando.de" )
    await sendEmailVerification(auth.currentUser)

  } catch (e) {
    alert(e.message)
  }
})

// export const sendGoogleEmailVerification = (async e => {
//   e.preventDefault()
//   try {
//     await sendEmailVerification(auth.currentUser,  "r.vogel@icando.de" )
//   } catch (e) {
//     alert(e.message)
//   }
// })
