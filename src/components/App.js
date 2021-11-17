
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import Navbar from './Navbar'
import { Home } from './Home'
import { SignUp } from './auth/SignUp'
import { Login } from './auth/Login'
import { AuthContextProvider, useUser } from '../firebase'
import { Profile }  from './auth/Profile'
import { Quiz } from './quiz/Quiz'
import { Courses } from './Courses'
import { Course } from './Course'
import { ForgottenPassword } from './auth/ForgottenPassword'
import { VerifyEmailAddress } from './auth/VerifyEmailAddress'



const PrivatRoute = ({component: Component, ...rest}) => {
  const { user } = useUser()
  // console.log('user app: ', user);
  return (
    <Route {...rest} 
      render={(props) =>  {   
      
      if ( user === null ) {
        return <Redirect to='/login' />
      } 
  
      if (user && user.emailVerified === false ) {
        return <Redirect to='/verify-email-address' />
      } 
  
      if (user && user.emailVerified === true ) {
        // return <Redirect to='/' />
        return <Component {...props} />

      } 
      }} 
    />
  )
} 

function App() {
  
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <PrivatRoute exact path="/courses" component={Courses} />
        <PrivatRoute exact path="/courses/:indexOfItem"  component={Course} />
        <PrivatRoute exact path="/" component={Home} />
        <PrivatRoute exact path="/profile" component={Profile} />
        <PrivatRoute exact path="/quiz" component={Quiz} />
        <Route exact path="/verify-email-address" component={VerifyEmailAddress} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />

      </Router>
    </AuthContextProvider>
  )
}

export default App