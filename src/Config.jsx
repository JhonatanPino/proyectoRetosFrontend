import React from "react";
import axios from "axios";

const base_api_url = "http://localhost:8000/api";

export default{
    //PUBLIC
    getRegister:(data)=>axios.post(`${base_api_url}/register`,data),
    getLogin:(data)=>axios.post(`${base_api_url}/login`,data),

    //ALL AUTHENTICATED
    getLogout: () => {
        const token = sessionStorage.getItem('token');
        return axios.post(`${base_api_url}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    //USERS AUTHENTICATED
    getUserMe: () => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getChallengeAll: () => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/challenges`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getChallengeById: (id) => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/challenges/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getChallengeDeleteById: (id) => {
        const token = sessionStorage.getItem('token');
        return axios.delete(`${base_api_url}/challenges/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getChallengeUpdate: (id, data) => {
        const token = sessionStorage.getItem('token');
        return axios.put(`${base_api_url}/challenges/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getChallengeStore: (data) => {
        const token = sessionStorage.getItem('token');
        return axios.post(`${base_api_url}/challenges`, data, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },


    //ADMIN AUTHENTICATED
    getUserAll: () => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/users`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getCategoryAll: () => {
        const token = sessionStorage.getItem('token');  
        return axios.get(`${base_api_url}/categories`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getCategoryStore: (data) => {
        const token = sessionStorage.getItem('token'); 
        return axios.post(`${base_api_url}/categories`, data, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getCategoryById: (id) => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getCategoryUpdate: (id, data) => {
        const token = sessionStorage.getItem('token');
        return axios.put(`${base_api_url}/categories/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

    },
    getCategoryDeleteById: (id) => {
        const token = sessionStorage.getItem('token');
        return axios.delete(`${base_api_url}/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },

}
