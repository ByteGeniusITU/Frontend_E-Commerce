import { BACKEND_HOSTING_URL } from './constants';
import axios from 'axios';

export const iniciarServidor = async (id) => {
  return axios.post(`${BACKEND_HOSTING_URL}/dashboard/start`, {id});
};

export const detenerServidor = async (id) => {
  return axios.post(`${BACKEND_HOSTING_URL}/dashboard/stop`, {id});
};

export const statusServidor = async (id) => {
  return axios.post(`${BACKEND_HOSTING_URL}/dashboard/status`, {id});
};
