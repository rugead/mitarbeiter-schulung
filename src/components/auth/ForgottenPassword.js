import React,  {useState} from 'react';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { H1 } from '../Headline';

export const ForgottenPassword = () => {
  const auth = getAuth();
  
  const [email, setEmail] = useState('')
  
  const passwordReset = (ev) => {
    ev.preventDefault()
    
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('email send')
    })
    .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log("🚀 ~ file: ForgottenPassword.js ~ line 16 ~ errorCode", errorCode)
      console.log("🚀 ~ file: ForgottenPassword.js ~ line 17 ~ errorMessage", errorMessage)
    })
  }

  const onChangeHandler = (ev) => {
    const {name,value} = ev.currentTarget
    if(name === 'email') {
      setEmail(value)
    }
  }

  return ( 
    <div className="flex justify-around p-5">  
      <div className="w-5/6">
        <H1 className="text-5xl text-gray-300">Passwort vergessen?</H1>
        
        <div className="w-full text-gray-400 mt-5 mb-5" >
          Bitte geben Sie Ihre Email-Adresse ein. Sie erhalten einen Link per E-Mail, womit Sie ein neues Passwort erstellen können.
        </div>
        
        <label 
          htmlFor="displayName"
          className="">
            Email-Adresse
        </label>

        <div className="pb-2 w-full">
          <input 
            type="email" 
            className="p-2 w-full select-none bg-green-100 disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md" 
            name="email" 
            placeholder="Email" 
            value={email} 
            id="email" 
            onChange={ev => onChangeHandler(ev)} 
          />
        </div>


        <div 
          onClick={passwordReset}
          className="p-3 mt-3 w-full text-primary hover:bg-primary hover:text-gray-100 border border-primary rounded-md"
        >
          Passwort zurücksetzen
        </div>
      </div>
    </div>
  );
}
   