import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const AuthenticatedAPI = () => {
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default AuthenticatedAPI;
