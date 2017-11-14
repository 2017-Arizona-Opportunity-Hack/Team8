import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;

export const fetchParents = () => {
  return ({
    type: 'PARENT',
    payload: axios.get(`${API_URL}/getAllParents`)
  });
}

// export const addParent = () => {
//   return ({
//     type: 'PARENT_ADD',
//     payload: ''
//   });
// }

export const deleteParent = (id, parent) => {
  let formdata = new FormData();
  formdata.append("_id", id);
  return ({
    type: 'PARENT_DELETE',
    payload: axios.post(`${API_URL}/deleteParent`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  });
}
