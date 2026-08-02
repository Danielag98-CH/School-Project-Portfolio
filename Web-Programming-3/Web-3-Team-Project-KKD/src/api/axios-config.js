import axios from "axios";

// Will need to change this URL once we deploy the backend and go live:
axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.baseURL = "http://192.168.1.218:8080/";

// errorHandler Function
export function errorHandler(err) {
  console.log("ERROR (in data-access):", err.message);
  throw err;
}

export default axios;