import axios from "axios";

const api = axios.create({
  baseURL: "https://institutodefelicibus.com.br/apicarlosdj",
  //baseURL: 'http://localhost:3000',
});

export default api;
