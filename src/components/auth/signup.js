import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

//helper functions
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    { touched && error && <span className="text-danger">{error}</span> }
  </fieldset>
)

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
// end helper functions

class Signup extends Component{
  handleFormSubmit(formProps) {
    // Sign user up
    this.props.signupUser(formProps)
  }

  renderAlert(){
    if (this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
    return(
      <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          component={renderField}
          type="text"
          label="Email" />
        <Field
          name="password"
          component={renderField}
          type="password"
          label="Password" />
        <Field
          name="passwordConfirm"
          component={renderField}
          type="password"
          label="Password Confirmation" />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};
  if (!formProps.email || !validateEmail(formProps.email)) {
    errors.email = "Enter a valid email!";
  }
  // Should make a helper function to DRY up a bit this code because repetitive
  // for example with a .map etc...
  if (!formProps.password){
    errors.password = "Enter a valid password";
  }
  if (!formProps.passwordConfirm){
    errors.passwordConfirm = "Enter a valid password confirmation";
  }
  if (formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

const reduxFormSignup = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default connect(mapStateToProps, actions)(reduxFormSignup);
