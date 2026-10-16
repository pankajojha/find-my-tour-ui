import axios from 'axios';
import { API_BASE } from '../config';

const baseURL = String(API_BASE || '/api').replace(/\/$/, '');

const client = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('findmytour_token') || sessionStorage.getItem('findmytour_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default client;
