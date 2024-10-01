import React from 'react';
import './App.less'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components'
import PrivateVendorRoute from './components/auth/privateRoute'
import Login from './components/auth/login 31Oct'
import ShowVersion from './components/auth/version'
import Newpaassword from './components/auth/newPaassword';
import OTPLogin from './components/auth/PhoneOTPSignIn'


function App() {

  return (  
  
  <Router>
    <main className="App">

   <PrivateVendorRoute path="/dashboard" component={Dashboard} />
   <Route path="/" component={Login} exact/>
   <Route path = "/newPassword/:id" component={Newpaassword }/>
   <Route path ="/version-release" component={ ShowVersion }/>
   <Route path = "/loginWithPhoneNumber" component={OTPLogin}/>
   
  
     </main>
    </Router>
  );
}

export default App;
