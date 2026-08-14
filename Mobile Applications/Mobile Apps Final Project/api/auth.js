// import axios from "./axios-config";
import api from './axios-config';
 
export function login(email, password){
  return api.post("auth/login",{email, password})
    .then(resp => {
      // get the access token from the Authorization header
      const authorizationHeader = resp.headers["authorization"] || "";
      const token = authorizationHeader.startsWith("Bearer ")
       ? authorizationHeader.substring("Bearer ".length)
       : null;
      
      const user = resp.data;

      return { user, token };
    });
}

