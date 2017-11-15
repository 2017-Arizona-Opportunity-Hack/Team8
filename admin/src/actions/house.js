import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;

export const fetchHouses = () => {
  return ({
    type: 'HOUSE',
    payload: axios.get(`${API_URL}/getAllHouses`)
  });
}
