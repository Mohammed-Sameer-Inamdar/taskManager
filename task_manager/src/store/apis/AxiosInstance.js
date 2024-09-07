import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/', // Replace with your API base URL
});

export default axiosInstance;
