import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;

export const fetchParents = () => {
  return ({
    type: 'PARENT',
    payload: axios.get(`${API_URL}/getAllParents`)
  });
}
