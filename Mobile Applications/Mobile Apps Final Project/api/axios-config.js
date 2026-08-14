// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
 
 
// axios.defaults.baseURL = "https://api.creationsatamethystblossom.com/" 
 
 
// // You can 'intercept' all requests made by ax, and add your own headers to the request
// // Here we're adding the Authorization header so that the server can keep the session going
// // NOTE: axios uses all lowercase letters for headers!
// axios.interceptors.request.use(async request => {
  
//   // get the token from AsyncStorage
//   const jwtToken = await AsyncStorage.getItem("jwtToken");
  
//   if(jwtToken){
//     // set the Authorization header value with the token
//     request.headers['authorization'] = "Bearer " + jwtToken;
//     console.log("Adding token to Authorization header:" + jwtToken);
//   }
//   return request;
// });
 
 
// export default axios
//changed this to better handle what my app needs

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://api.creationsatamethystblossom.com/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwtToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Adding token to Authorization header");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or unauthorized. Clearing storage...");

      await AsyncStorage.removeItem("jwtToken");
      await AsyncStorage.removeItem("userData");
    }

    return Promise.reject(error);
  }
)

export default api;