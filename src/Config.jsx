import React from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true, // Importante para enviar cookies o encabezados
    headers: {
      "Content-Type": "application/json",
    },
});

// permite setear / quitar el Authorization header
export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export function initAuthFromStorage() {
  const t = localStorage.getItem("token");
  if (t) setAuthToken(t);
}

export default {
  // AUTH
  getRegister: (data) => api.post("/register", data),
  getLogin: (data) => api.post("/login", data),

  // exposición de utilidad por compatibilidad
  api,
  setAuthToken,
  initAuthFromStorage,
};
/*
import axios from "axios";

const base_api_url = "http://localhost:8000/api";

export default{
    //AUTH
    getRegister:(data)=>axios.post(`${base_api_url}/register`,data),
    getLogin:(data)=>axios.post(`${base_api_url}/login`,data)
}
*/