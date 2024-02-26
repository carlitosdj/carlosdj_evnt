import axios from "axios";

const api = axios.create({
  baseURL: 'https://carlosdj.com.br/api'
  //baseURL: 'http://89.116.186.124:3001',
  //baseURL: "https://institutodefelicibus.com.br/apicarlosdj",
  //baseURL: 'http://localhost:3000',
});

export default api;
