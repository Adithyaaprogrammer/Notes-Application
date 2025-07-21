import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:3000/api';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;