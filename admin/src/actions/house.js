import axios from "axios";
import config from "../config";

const API_URL = config.API_URL;

export const fetchHouses = () => {
  return {
    type: "HOUSE",
    payload: axios.get(`${API_URL}/getAllHouses`)
  };
};
export const addHouse = house => {
  let formdata = new FormData();
  formdata.append("house_name", house.house_name);
  formdata.append("address", house.address);
  return {
    type: "HOUSE_ADD",
    payload: axios.post(`${API_URL}/addHouse`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    // .then(response => id)
    // .catch(error => console.log(error))
  };
};

export const updateHouse = house => {
  let formdata = new FormData();
  formdata.append("_id", house._id);
  formdata.append("house_name", house.house_name);
  formdata.append("address", house.address);
  return {
    type: "HOUSE_UPDATE",
    payload: axios.post(`${API_URL}/updateHouse`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    // .then(response => id)
    // .catch(error => console.log(error))
  };
};

export const deleteHouse = (id, house) => {
  let formdata = new FormData();
  formdata.append("_id", id);
  return {
    type: "HOUSE_DELETE",
    payload: axios
      .post(`${API_URL}/deleteHouse`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => id)
      .catch(error => console.log(error))
  };
};
