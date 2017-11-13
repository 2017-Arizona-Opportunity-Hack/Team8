import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;

export const fetchProfiles = () => {
  return ({
    type: 'CHILD',
    payload: axios.get(`${API_URL}/api/child`)
  });
}
