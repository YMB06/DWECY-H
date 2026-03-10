import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-inference.huggingface.co/models',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
