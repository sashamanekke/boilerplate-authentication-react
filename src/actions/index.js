import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}){
  return function(dispatch){
    //submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password}); // == {email: email, password: password}
    // if request is good...
    // - update state to indicate user is auth
    // - save the jwt token
    // - redirect to the route '/feature'

    // if request is bad...
    // - show an error to the user
  }



}
