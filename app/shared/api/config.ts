import axios from 'axios';

const defaultURL = 'http://localhost:3000/';

const baseURL = process.env.VITE_API_BASE_URL ?? defaultURL;

const API = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
