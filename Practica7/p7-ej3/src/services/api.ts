import axios from 'axios'

const api = axios.create({
  baseURL: '/api/huggingface/hf-inference/models',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
