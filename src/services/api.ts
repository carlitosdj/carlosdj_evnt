import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.carlosdj.com.br'
  //baseURL: 'http://89.116.186.124:3001',
  //baseURL: "https://institutodefelicibus.com.br/apicarlosdj",
  //baseURL: 'http://localhost:3000',
});

export default api;
