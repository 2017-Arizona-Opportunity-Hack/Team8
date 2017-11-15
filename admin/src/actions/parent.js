import axios from "axios";
import config from "../config";

const API_URL = config.API_URL;

export const fetchParents = () => {
  return {
    type: "PARENT",
    payload: axios.get(`${API_URL}/getAllParents`)
  };
};

export const addParent = parent => {
  let formdata = new FormData();
  formdata.append("firstname", parent.firstname);
  formdata.append("lastname", parent.lastname);
  formdata.append("phone", parent.phone);
  formdata.append("email", parent.email);
  formdata.append("password", parent.password);
  formdata.append("houses", parent.houses);
  return {
    type: "PARENT_ADD",
    payload: axios.post(`${API_URL}/addParent`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    // .then(response => id)
    // .catch(error => console.log(error))
  };
};

export const updateParent = (id, parent) => {
  let formdata = new FormData();
  formdata.append("_id", id);
  formdata.append("firstname", parent.firstname);
  formdata.append("lastname", parent.lastname);
  formdata.append("phone", parent.phone);
  formdata.append("email", parent.email);
  formdata.append("password", parent.password);
  formdata.append("houses", parent.houses);
  return {
    type: "PARENT_UPDATE",
    payload: axios.post(`${API_URL}/updateParent`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  };
};

export const deleteParent = (id, parent) => {
  let formdata = new FormData();
  formdata.append("_id", id);
  return {
    type: "PARENT_DELETE",
    payload: axios
      .post(`${API_URL}/deleteParent`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => id)
      .catch(error => console.log(error))
  };
};
