import { useState } from 'react'
import { getAuth, updateProfile, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { signUpWithGoogle } from '../../provider'
import { DialogOverlay } from '../DialogOverlay'
import { Button } from "../Button"
import { InputField } from "../InputField"
import { H1 } from '../Headline'
import { createUserData } from '../user'

export const SignUp = () => {
  const auth = getAuth()
  
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Error')
  const [dialogDescription, setDialogDescription] = useState('unknown error')
  const [dialogButtonText, setDialogButtonText] = useState('cancel')
   
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  


  const onChangeHandler = (ev) => {
    ev.preventDefault()
    const { name, value } = ev.currentTarget
    
    if (name === "email") setEmail(value)
    if (name === "password") setPassword(value)
    if (name === "passwordConfirm") setPasswordConfirm(value)
    if (name === "name") setName(value)
  }
  
  
  const signUpWithEmail = async(ev) => {
    ev.preventDefault()
    if (password !== passwordConfirm) {
      setDialogTitle('Password missmatch')
      setDialogDescription('Die Passwörter stimmen nicht überein.')
      setDialogIsOpen(true)
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => sendEmailVerification( auth.currentUser ))
    .then(() => updateProfile(auth.currentUser, {displayName: name})
    .then(() => createUserData(auth.currentUser))
    )
    .catch((err) => {
      setDialogTitle('Sign up error')
      setDialogDescription(err.message)
      setDialogButtonText('no ok!')
      setDialogIsOpen(true)
    })
  }

  return (
    <>
      <DialogOverlay isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} title={dialogTitle} description={dialogDescription} buttonText={dialogButtonText}/>
      <div className="flex justify-around  p-5">
        <div className="p-5  ">
          <H1>SignUp</H1>
          <form >
            <InputField label="Name" type="text" name="name" placeholder="Name" onChange={onChangeHandler} />
            <InputField label="Email" type="email" name="email" placeholder="email" onChange={onChangeHandler} />
            <InputField label="Password" type="password" name="password" placeholder="password" onChange={onChangeHandler} />
            <InputField label="Password Confirmation" type="password" name="passwordConfirm" placeholder="password confirmation" onChange={onChangeHandler} />
            <Button label="Sign up with Email" type="submit" onClick={signUpWithEmail} />

            <Button label="Login with Google" type="submit" onClick={signUpWithGoogle}/>
          </form>
        </div>
      </div>
    </>
  )
}