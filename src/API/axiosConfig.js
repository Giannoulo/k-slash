import axios from "axios";

const unsplashInstance = axios.create({ baseURL: "https://api.unsplash.com" });

// Set the access key for any request
unsplashInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = "Client-ID ke8UoeOtoR2aHGyY58DT1ggrYzMVcCaamwUkSm9atx4";
  return config;
});

export default unsplashInstance;
