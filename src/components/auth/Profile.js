import React, { useEffect, useState } from 'react';
import { useUser,db } from '../../firebase'
import { getDoc, doc } from '@firebase/firestore';
import { updateEmail, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential  } from '@firebase/auth';
import { DialogOverlay } from '../DialogOverlay';
import { updateUserData } from '../user';

export const Profile = () => {
  const { user } = useUser()
  const [userData, setUserData]= useState()
  console.log('userData: ', userData);
  
  const [isOpen, setIsOpen] = useState(false)
  
  const [displayName, setDisplayName] = useState('')
  const [disableDisplayName, setDisableDisplayName] = useState(true)
  const [disableEmail, setDisableEmail] = useState(true)
  const [disablePersonalnummer, setDisablePersonalnummer] = useState(true)
  const [disablePasswordReset, setDisablePasswordReset] = useState(true)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [personalnummer, setPersonalnummer] = useState('')
  
  const credential = EmailAuthProvider.credential(
    user.email,
    password
  )
    

  const updateGoogleProfile = (ev) => {
    ev.preventDefault()

    updateProfile(user, { displayName: displayName })
    .then(() => updateUserData(user, {name: displayName, personalnummer: personalnummer}))
    .then(() => setDisableDisplayName(true))
    .then(() => setDisablePersonalnummer(true)) 
    .catch((err) => {
      alert(err)
    });
  } 
    
  const updateGoogleEmail = (ev) => {
    ev.preventDefault()
    
    reauthenticateWithCredential(user, credential)
      .then(() => updateEmail(user, email))
      .then(() => updateUserData(user, {email: email}))
      .then(() => setDisableEmail(!disableEmail))
      .catch((err) => {
        alert(err.message)
      }
    );
  } 
  
  const updateGooglePassword = (ev) => {
    ev.preventDefault()
    if (newPassword !== newPasswordConfirm) {
      setIsOpen(true)
      return
    }    
    reauthenticateWithCredential(user, credential)
      .then(() => updatePassword(user, newPassword))
      .then(() => setDisablePasswordReset(!disablePasswordReset))
      .catch((err) => {
        alert(err.message)
      }
    );
  }

  const onChangeHandler = (ev) => {
    const { name, value } = ev.currentTarget
    if(name === 'displayName') setDisplayName(value)
    if(name === 'email') setEmail(value)
    if(name === 'password') setPassword(value)
    if(name === 'newPassword') setNewPassword(value)
    if(name === 'newPasswordConfirm') setNewPasswordConfirm(value)
    if(name === 'personalnummer') setPersonalnummer(value)
  }
  
  const toggleDisabledInput = (ev) => {
    ev.preventDefault();
    const {name } = ev.currentTarget
    if(name === 'disableDisplayName') setDisableDisplayName(!disableDisplayName)
    if(name === 'disableEmail') setDisableEmail(!disableEmail)
    if (name === 'disablePasswordReset') setDisablePasswordReset(!disablePasswordReset)
    if (name === 'disablePersonalnummer') setDisablePersonalnummer(!disablePersonalnummer)
  }

  useEffect(() => {
    const getUserData = async () => {
      if (!user) return 
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.data()
      setUserData(userDoc)        
      }
     getUserData()
  }, [user])

  
  useEffect(() => {
    setDisplayName(user.displayName || '')
    setEmail(user.email || '')
    setPersonalnummer(userData?.personalnummer || '')
  }, [user, userData])
  
  return ( 
    <div className="flex justify-center">      
      <DialogOverlay isOpen={isOpen} setIsOpen={setIsOpen} title="Nix Passwort" description="bal" buttonText="ok"/>

      <div className="">

              <h1 className="text-9xl text-gray-200">Profile</h1>

              <label htmlFor="displayName" className="pl-3 flex-shrink w-60 ">
                <span className="">Display Name: </span>
              </label>

              <div className="pl-3 pb-5 flex items-start">
                <input 
                  type="text" 
                  className="p-2 bg-green-100 w-full disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md"
                  name="displayName" 
                  value={displayName}
                  id="displayName"
                  onChange={ev => onChangeHandler(ev)} 
                  disabled={disableDisplayName} 
                />
           
              {disableDisplayName 
                ?
                <button 
                  className="ml-2 p-2 border border-gray-300 rounded-md" 
                  name="disableDisplayName" 
                  onClick={(ev) => toggleDisabledInput(ev)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> 
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                :
                <button className="p-2  select-none border border-gray-300 rounded-md bg-green-300" name="disableDisplayName" onClick={(ev) => updateGoogleProfile(ev)}>Save</button>
              }
            </div>

            <label htmlFor="displayName" className="pl-3 flex-shrink w-60 ">
                <span className="">Personalnummer: </span>
              </label>

              <div className="pl-3 pb-5 flex items-start">
                <input 
                  type="text" 
                  className="p-2 bg-green-100 w-full disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md"
                  name="personalnummer" 
                  value={personalnummer}
                  id="personalnummer"
                  onChange={ev => onChangeHandler(ev)} 
                  disabled={disablePersonalnummer} 
                />
           
              {disablePersonalnummer
                ?
                <button 
                  className="ml-2 p-2 border border-gray-300 rounded-md" 
                  name="disablePersonalnummer" 
                  onClick={(ev) => toggleDisabledInput(ev)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> 
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                :
                <button className="p-2  select-none border border-gray-300 rounded-md bg-green-300" name="disablePersonalnummer" onClick={(ev) => updateGoogleProfile(ev)}>Save</button>
              }
            </div>






            <label htmlFor="displayName" className="pl-3 flex-shrink w-40 ">
              <span className="">Email: </span>
            </label>

            <div className="pl-3 pb-2 flex items-start">
              <input 
                type="email" 
                className="p-2 select-none bg-green-100 w-full disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md" 
                name="email" 
                placeholder="Email" 
                value={email} 
                id="email" 
                onChange={ev => onChangeHandler(ev)} 
                disabled={disableEmail}
              />
            </div>
    
            <div className="pl-3 pb-5 flex items-start">
              <input 
                type="password"
                className="p-2 select-none w-full bg-green-100 disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md" 
                name="password" 
                placeholder="Password" 
                onChange={ev => onChangeHandler(ev)}
                disabled={disableEmail}
                
              />

              {disableEmail ?
                <button 
                  className="ml-2 p-2  select-none border border-gray-300 rounded-md" 
                  name="disableEmail" 
                  onClick={(ev) => toggleDisabledInput(ev)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> 
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              :
                <button className="p-2  select-none border border-gray-300 rounded-md bg-green-300"  onClick={(ev) => updateGoogleEmail(ev)}>Save</button>
              }
            </div>

          
              <label htmlFor="passwordReset" className="pl-3 w-40 ">
                <span className="">Password reset: </span>
              </label>

              <div className="pl-3 pb-2 flex items-start">
                <input 
                  type="password"
                  className="p-2 select-none w-full bg-green-100 disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md" 
                  name="password" 
                  placeholder="Old password" 
                  onChange={ev => onChangeHandler(ev)}
                  disabled={disablePasswordReset}
                />
              </div>   
            
              <div className="pl-3 pb-2 flex items-start">
                <input 
                  type="password"
                  className="p-2 select-none w-full bg-green-100 disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md" 
                  name="newPassword" 
                  placeholder="New Password" 
                  onChange={ev => onChangeHandler(ev)}
                  disabled={disablePasswordReset}
                />
              </div>    
            
              <div className="pl-3 pb-5 flex items-start">
                <input 
                  type="newPasswordConfirm"
                  className="p-2 select-none w-full bg-green-100 disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md" 
                  name="newPasswordConfirm" 
                  placeholder="New Password Confirm" 
                  onChange={ev => onChangeHandler(ev)}
                  disabled={disablePasswordReset}
                />

           {disablePasswordReset ?
                    <button 
                    className="ml-2 p-2  select-none border border-gray-300 rounded-md" 
                    name="disablePasswordReset" 
                    onClick={(ev) => toggleDisabledInput(ev)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> 
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    :
                    <button className="p-2  select-none border border-gray-300 rounded-md bg-green-300" name="disableDisplayName" onClick={(ev) => updateGooglePassword(ev)}>Save</button>
                  }

                  </div>

      </div>
    </div>  
  )
}
