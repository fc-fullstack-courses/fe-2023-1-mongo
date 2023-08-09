import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_BASE_URL
});

httpClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const { data } = response;

  if (data?.data?.accessToken) {
    localStorage.setItem(CONSTANTS.TOKEN_STRING, data.data.accessToken);
  }

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

httpClient.interceptors.request.use(function (config) {
  // Do something before request is sent

  const token = localStorage.getItem(CONSTANTS.TOKEN_STRING);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  config.headers['ngrok-skip-browser-warning'] = 'skip';

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export const login = (userData) => httpClient.post('/auth/login', userData);
export const registration = (userData) => httpClient.post('/auth/registration', userData);
export const refresh = (token) => httpClient.post('/auth/refresh', { token });
export const getAllMessages = (options) => httpClient.get(`/users/${options.id}/messages/all`);