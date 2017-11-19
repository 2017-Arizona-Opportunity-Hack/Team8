import axios from "axios";
import config from "../config";

const API_URL = config.API_URL;

export const fetchChildren = () => {
  return {
    type: "CHILD",
    payload: axios.get(`${API_URL}/getAllChildren`)
  };
};

export const addChild = child => {
  let formdata = new FormData();
  console.log(child.house);
  formdata.append("firstname", child.firstname);
  formdata.append("lastname", child.lastname);
  formdata.append("age", child.age);
  console.log("JSON parser", JSON.parse(child.house));
  formdata.append("house_id", JSON.parse(child.house)._id);
  return {
    type: "CHILD_ADD",
    payload: axios.post(`${API_URL}/addChild`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    // .then(response => id)
    // .catch(error => console.log(error))
  };
};

export const updateChild = (id, child) => {
  let formdata = new FormData();
  formdata.append("_id", id);
  formdata.append("firstname", child.firstname);
  formdata.append("lastname", child.lastname);
  formdata.append("age", child.age);
  console.log("JSON parser", JSON.parse(child.house));
  formdata.append("house_id", JSON.parse(child.house)._id);
  return {
    type: "CHILD_UPDATE",
    payload: axios.post(`${API_URL}/updateChild`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  };
};

export const deleteChild = (id, child) => {
  let formdata = new FormData();
  formdata.append("_id", id);
  return {
    type: "CHILD_DELETE",
    payload: axios
      .post(`${API_URL}/deleteChild`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => id)
      .catch(error => console.log(error))
  };
};
