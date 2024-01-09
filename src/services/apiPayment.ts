import axios from 'axios'

const apiPayment = axios.create({
  baseURL: 'https://sandbox.asaas.com/api/v3',
  headers: {
    access_token: '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwMzY5MTY6OiRhYWNoXzVkNjRlZmIzLTMxZjAtNDg3NC1hYzU1LTJhMTA4YTUwZWZkYw==',
    // Host: 'labiopalatina.com.br',
    // "User-Agent": "Java/1.8.0_282",
    // 'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*"
  }
  // baseURL: 'http://localhost:8886',
})

export default apiPayment
