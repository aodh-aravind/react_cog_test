import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';


class LogIn2 extends Component {
  state = {
    username: "",
    phoneVerify: false,
    otp_code : "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };
  

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    console.log(this.state,'77777777777777')
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    // const user = await Auth.signIn(this.state.username, this.state.password);
    // console.log(user);
    // // this.props.auth.setAuthStatus(true);
    // // this.props.auth.setUser(user);
    const username = "+91" + this.state.username; //phone entered in form
    console.log(username)
    try {
      const cognitoUser = await Auth.signIn(username);
      this.setState({
        cognitoUser: cognitoUser
      });
      console.log(cognitoUser,'54564654654')
      // localStorage.setItem('testObject', JSON.stringify(cognitoUser));
      // const otpUser = await Auth.sendCustomChallengeAnswer(cognitoUser, '2202');
      // console.log(otpUser,'otpUserotpUserotpUserotpUserotpUser')
      // var retrievedObject = localStorage.getItem('testObject');
      // console.log(retrievedObject,'777777777788888888')
      // this.props.history.push("/otp");
      this.setState({ phoneVerify: true });
    //   console.log('454654654654654')
    //   Auth.verifyCurrentUserAttribute('email')
    //   .then(() => {
    //       console.log('a verification code is sent');
    //   }).catch((e) => {
    //     console.log('failed with error', e);
    //     console.log('77777777777777777777777777777')
    // });
    // console.log('787987987987987987987')
    } catch {
      // Handle sign in errors
      console.log()
    }
  };
  
  handleOtpSubmit = async() => {
    console.log('inside otppppp');
    try {
      await Auth.sendCustomChallengeAnswer(this.state.cognitoUser, this.state.otp_code).then( data => {
        console.log('otp done',data);
      })
      .catch(err => console.log(err));
      let userx = await Auth.currentAuthenticatedUser();
      console.log(userx,'5465465465')
      let result = await Auth.updateUserAttributes(userx, {
        'email': 'ponnala.aravindz@gmail.com',
    });
    Auth.verifyCurrentUserAttribute('email')
    .then(() => {
        console.log('a verification code is sent');
    }).catch((e) => {
        console.log('failed with error', e);
    });
    } catch {
      // Handle sign in errors
    }
  }
  handleOtpEmail = async() => {
    console.log('inside otppppp');
    try {
      Auth.verifyCurrentUserAttributeSubmit('email', this.state.otp_code)
      .then(() => {
          console.log('phone_number verified');
      }).catch(e => {
          console.log('failed with error', e);
      });
    } catch(error){
      console.log('hkjhkjhkjhjk')
    }

  }
  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  onOtpInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1> {this.state.phoneVerify ?  'Enter Otp' : 'Enter Phone number'}</h1>
          <FormErrors formerrors={this.state.errors} />

          <form>
            <div className="field">
              <p className="control">
              { !this.state.phoneVerify &&
                <input 
                className="input" 
                type="text"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username or email"
                value={this.state.username}
                onChange={this.onInputChange}
                />
              }
              { this.state.phoneVerify &&
                <input 
                className="input" 
                type="text"
                id="otp_code"
                aria-describedby="usernameHelp"
                placeholder="Enter OTP"
                value={ this.state.otp_code}
                onChange={ this.onOtpInputChange}
                />
              }
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success" type="button" onClick={this.state.phoneVerify ? this.handleOtpSubmit : this.handleSubmit}>
                {this.state.phoneVerify ? 'Verify Otp' : 'Login'}
                </button>
                <button  type="button" onClick={this.handleOtpEmail}>
                  emailcon
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default LogIn2;