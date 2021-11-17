import React from 'react';
import { getAuth, signOut } from 'firebase/auth'
// import { useHistory } from 'react-router';
import { useHistory} from 'react-router-dom'



export const LogOut = ({children}) => {
  const history = useHistory()
  
  function logOut(ev){
    ev.preventDefault()
  
    signOut(getAuth())
    .then(() => history.push('/'))
  }

  return ( 
    <span 
      className="cursor-pointer"
      onClick={logOut}
      >
      {children}
    </span>
   );
}