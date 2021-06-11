import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';

class ConReg extends Component {
  state = {
    phone_number:"",
    phoneVerify: false,
    otp_code : "",
    cognitoUser :{},
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
    const { phone_number} = this.state;
    const username = 'AODH'+phone_number
    const email = phone_number+'@aodh.com'
    try{
      const signUpResponse = await Auth.signUp({
        username:username,
        password:'Wellcome1780ss@',
        attributes: {
          email: email,
          phone_number: phone_number,
        }
      });
      console.log(signUpResponse)
      this.setState({cognitoUser : signUpResponse,phoneVerify : true })
      // this.setState({phoneVerify : true })
    }
    catch(error){
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  
  handleOtpSubmit = async event => {
    console.log('inside otppppp');
    const { phone_number} = this.state;
    const username = 'AODH'+phone_number
    console.log(this.state.otp_code)
    try {
      await Auth.confirmSignUp( username, this.state.otp_code);
      this.props.history.push("/welcome");
    } catch(error){
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
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
          <h1> {this.state.phoneVerify ?  'Enter verfication code' : 'Enter Phone number'}</h1>
          <FormErrors formerrors={this.state.errors} />

          <form>
            <div className="field">
              <p className="control">
              { !this.state.phoneVerify &&
                <input 
                className="input" 
                type="text"
                id="phone_number"
                aria-describedby="usernameHelp"
                placeholder="Enter username or email"
                value={this.state.phone_number}
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
                {this.state.phoneVerify ? 'conforn' : 'Registration'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ConReg;