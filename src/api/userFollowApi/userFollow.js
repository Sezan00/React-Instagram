
//__It's follow api call with slug (username)__//

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const getUserProfile = (userId) => API.get(`/user/${userId}`)
export const toggleFollow = (userId) => API.post(`/user/${userId}/follow`);
