import React from 'react';
import { sendEmailVerification } from "firebase/auth";
import { Button } from '../Button';
import { Redirect, useHistory } from 'react-router';
import { useUser } from '../../firebase'

export const VerifyEmailAddress = () => {
  const { user } = useUser()
  const history = useHistory()

  const resendEmailVerification = (ev) => {
    ev.preventDefault()
    
    sendEmailVerification(user)
    .then(() => history.push('/verify-email-address'))
    .then(alert('email sent'))
  }
  
  const Please = () => {
    return (
      <div>
        <Button 
          type="submit"
          label="resent email"
          onClick={resendEmailVerification}
          />
          Bitte Email Adresse bestätigen
      </div>
    )
  }

  return (
    <div className="bg-green-100 flex justify-between p-5">
      {
        user && user.emailVerified ? 
          <Redirect to='/courses' />
        :
         <Please />        
      }
    </div>
  )
  
}
 