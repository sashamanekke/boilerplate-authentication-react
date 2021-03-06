import axios from 'axios';
import {browserHistory} from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}){
  return function(dispatch){
    //submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password}) // == {email: email, password: password}
      .then(response => {
        // if request is good...
        // - save the jwt token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
        // - update state to indicate user is auth
        dispatch({type: AUTH_USER});
      })
      .catch(() => {
        // if request is bad...
        // - show an error to the user
        dispatch(authError('Bad login info'));
      })
  };
}

export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, {email,password})
      .then(response => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      // this is key here! because now we van make auhtenticated request to the
      // backend server by including the token in the header
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}



















