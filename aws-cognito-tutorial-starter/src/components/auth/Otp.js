import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';



class OtpVerify extends Component {
    state = {
      user : "",
      otp_code: "",
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
      // console.log('submthandlerr')
      // event.preventDefault();
  
      // // Form validation
      // this.clearErrorState();
      // const error = Validate(event, this.state);
      // console.log(this.state,'77777777777777')
      // if (error) {
      //   this.setState({
      //     errors: { ...this.state.errors, ...error }
      //   });
      // }
  
      // // AWS Cognito integration here
      // const OTP = this.state.otp_code;
      // var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
      // console.log(retrievedObject)
      // try {
      //   // const cognitoUser = await Auth.sendCustomChallengeAnswer(retrievedObject, OTP);
      //   // console.log(retrievedObject,'sessionsession')
      //   // console.log(OTP,'OTPOTPOTPOTP')
      //   // console.log(cognitoUser,'5465465465465')
      // } catch(error){
      //   let err = null;
      //   !error.message ? err = { "message": error } : err = error;
      //   this.setState({
      //     errors: {
      //       ...this.state.errors,
      //       cognito: err
      //     }
      //   });
      // }
      console.log('inside otppppp');
    try {
      await Auth.confirmSignUp(this.state.cognitoUser, this.state.otp_code);
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
    };
    
  
    onInputChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
      document.getElementById(event.target.id).classList.remove("is-danger");
    };
  
    render() {
      return (
        <section className="section auth">
          <div className="container">
            <h1>Log in</h1>
            <FormErrors formerrors={this.state.errors} />
  
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <p className="control">
                  <input 
                    className="input" 
                    type="text"
                    id="otp_code"
                    aria-describedby="usernameHelp"
                    placeholder="Enter code"
                    value={this.state.otp_code}
                    onChange={this.onInputChange}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success">
                    Verify
                  </button>
                </p>
              </div>
            </form>
          </div>
        </section>
      );
    }
  }
  
  export default OtpVerify;