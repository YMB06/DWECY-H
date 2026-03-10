import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
