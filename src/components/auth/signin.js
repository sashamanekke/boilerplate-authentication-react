import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {

  handleFormSubmit({email, password}){
    console.log(email, password);
    // Need to do something to log user in
    this.props.signinUser({email, password});
  }
  render(){
    const renderInput = field => (
      <div>
        <input {...field.input} type={field.type} className="form-control" />
          {field.meta.touched && field.meta.error}
        <span>{field.meta.error}</span>
      </div>
    )
    const { handleSubmit, fields: {email, password }} = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email</label>
          <Field
           name="email"
           component={renderInput}
           type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <Field
           name="password"
           component={renderInput}
           type="text" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const reduxFormSignin = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);

export default connect(null, actions)(reduxFormSignin);
