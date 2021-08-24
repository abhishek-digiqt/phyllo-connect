import axios from "axios";
import { apiURL, clientSecret, clientId } from "../utils/helper";
//TODO: Ask Mohit if Client Secret and ID are diffenret for each user
const api = axios.create({
  baseURL: apiURL,
  auth: {
    username: clientId,
    password: clientSecret,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
