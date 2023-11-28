import axios from 'axios';

const baseURL = 'http://192.168.30.103:3000';
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { baseURL, axiosInstance };