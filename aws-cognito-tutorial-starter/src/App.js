import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import OtpVerify from './components/auth/Otp';
import Register2 from './components/auth/Register2';
import LogIn2 from './components/auth/Login2';
import ConReg from './components/auth/ConforRegistration';
import ConReg3 from './components/auth/Register3';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/admin" component={ProductAdmin} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} />
              <Route exact path="/changepassword" component={ChangePassword} />
              <Route exact path="/changepasswordconfirmation" component={ChangePasswordConfirm} />
              <Route exact path="/welcome" component={Welcome} />
              <Route exact path="/otp" component={OtpVerify} />
              <Route exact path="/reg" component={Register2} />
              <Route exact path="/otplogin" component={LogIn2} />
              <Route exact path="/con" component={ConReg} />
              <Route exact path="/con3" component={ConReg3} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;




