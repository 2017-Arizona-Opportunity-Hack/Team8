import axios from "axios";
import config from "../config";

const API_URL = config.API_URL;

export const login = (email, password) => {
  let formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  console.log("in login actions >>> formdata", formdata);
  return {
    type: "AUTH",
    payload: axios.post(`${API_URL}/login`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    // .then(response => response)
    // .catch(error => console.log(error))
  };
};
export const logout = () => {
  console.log("in login actions >>> logout");
  return {
    type: "N_AUTH",
    payload: new Promise((resolve, reject) => {
      resolve({ done: 1 });
    })
    // .then(response => response)
    // .catch(error => console.log(error))
  };
};
