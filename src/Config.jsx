import React from "react";
import axios from "axios";

const base_api_url = "http://localhost:8000/api";

export default{
    //PUBLIC
    getRegister:(data)=>axios.post(`${base_api_url}/register`,data),
    getLogin:(data)=>axios.post(`${base_api_url}/login`,data),

    //ALL AUTHENTICATED
    getLogout: () => {
        const token = sessionStorage.getItem('token'); // Obtén el token almacenado
        return axios.post(`${base_api_url}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}` // Incluye el token en el encabezado Authorization
            }
        });
    },

    //USERS AUTHENTICATED

    //ADMIN AUTHENTICATED
    getUserAll: () => {
        const token = sessionStorage.getItem('token'); // Obtén el token almacenado en sessionStorage
        return axios.get(`${base_api_url}/users`, {
            headers: {
                Authorization: `Bearer ${token}` // Incluye el token en el encabezado Authorization
            }
        });
    },

}
