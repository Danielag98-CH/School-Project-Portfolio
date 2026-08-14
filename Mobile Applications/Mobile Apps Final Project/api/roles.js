import axios from "./axios-config";

export function getAllRoles(){
  return axios.get("roles/").then(resp => resp.data)
}