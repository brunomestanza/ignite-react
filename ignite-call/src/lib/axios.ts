import axios from 'axios'

export const api = axios.create({
  // Aproveita o host do FrontEnd e coloca o /api na frente
  baseURL: '/api',
})
