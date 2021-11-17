import React from 'react';
import {Link} from 'react-router-dom'
import { useUser } from '../firebase';
import { LogOut } from './auth/LogOut';



const Navbar = () => {
  const { user } = useUser()
  
  return (
    <div className="bg-green-100 text-gray-600 flex justify-between p-5">
      <div>
          <Link to="/">Home</Link>
      </div>
                    
      { user ? 
        <div>
      
          <Link to="/courses">Schulungen</Link> {' | '}
          <Link to="/profile">Profile</Link> {' | '}
          <LogOut>SignOut</LogOut>
        </div>
        :
        <div>
          <Link to="/login">Login</Link> {' | '}
          <Link to="/signup">SignUp</Link> 
        </div>          
      }
    </div>
  );
}
 
export default Navbar