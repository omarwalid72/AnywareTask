import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.5:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
