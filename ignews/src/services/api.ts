import axios from 'axios';

export const api = axios.create({
  baseURL: '/api' // Podemos passar /api porque a parte do localhost é emitida, e o axios aproveita a URL da aplicação
})
