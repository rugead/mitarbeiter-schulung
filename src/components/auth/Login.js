import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { signUpWithGoogle } from '../../provider'
import { InputField } from '../InputField'
import { Button } from '../Button'
import { H1 } from '../Headline'
// import { WriteUserData } from '../user'

export const Login = () => {
  const auth = getAuth()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeHandler = (ev) => {
    const {name,value} = ev.currentTarget
    if(name === 'email') setEmail(value)
    if(name === 'password') setPassword(value)
  }

  const loginWithPassword = (ev) => {
    ev.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then(() => history.push("/courses"))
    .catch((err) => {
      alert(err.message)
    })
  }
  
  return (
    <div className="flex justify-around p-5">  
      <div className="p-5 ">
        <H1>Login</H1>
        <form>
          <InputField label="Email" type="email" placeholder="email" name="email" onChange={onChangeHandler} />
          <InputField label="Password" type="password" placeholder="password" name="password" onChange={onChangeHandler}  />
          <Button label="Login" type="submit" onClick={loginWithPassword} />
          <Button label="Login with Google" type="submit" onClick={signUpWithGoogle}/>
        </form>

        <div className="mt-5 p-2">
          <Link to={`/forgotten-password`} className="text-primary hover:text-gray-200 hover:bg-primary" > 
            Passwort vergessen?
          </Link>
        </div>
     </div>
    </div>
  )
}