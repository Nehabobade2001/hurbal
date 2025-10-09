import logo from "../assets/images/hurbulLogo.png";
import logo1 from "../assets/images/hurbulLogo.png";
import { store } from "../Redux/store";
import axios from "axios";

export const MainContent = {
  name: "Herbal",
  logo: logo,
  logo1: logo1,
  email: " info@herbal.in"
};

export const backendConfig = {
  // base: "http://192.168.1.57:6067/api",
  // origin: "http://192.168.1.57:6067",


  // base: "https://adm.api.smartchainstudio.in/api",
  // origin: "https://adm.api.smartchainstudio.in",
  
  base: "https://herbaliferise-backend-main.onrender.com/api",
  origin: "https://herbaliferise-backend-main.onrender.com",

  // origin: "http://localhost:6067/api",
  // base: "http://localhost:6067/api",
};

export const backendConfig1 = {
  origin: "https://herbaliferise-backend-main.onrender.com",
  // origin: "https://adm.api.smartchainstudio.in",
  // origin: "http://localhost:6067/api",
};


export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
