import axios from 'axios';
import config from '../config';
import { API_CONSTANTS } from '../constants';

const API_BASE_URL = config.apiBaseUrl[process.env.NODE_ENV || 'development'];

export function axiosGet(resourceName, params = {}) {
  const axiosConfig = {
    method: 'get',
    url: `${API_BASE_URL}/${resourceName}`,
    params: params
  };
  return axios(axiosConfig);
}

export function fetchIncidents(queryParams) {
  return axiosGet(`${API_CONSTANTS.INCIDENTS}`, queryParams)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
