import axios from 'axios'

const api = axios.create({
  baseURL: 'https://institutodefelicibus.com.br/apiassociacao',
  // baseURL: 'http://localhost:8886',
})

export default api
