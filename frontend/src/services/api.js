import axios from 'axios';

const api = axios.create({
  baseURL: 'https://know-your-fan-backend-joec.onrender.com', // URL do seu backend FastAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;