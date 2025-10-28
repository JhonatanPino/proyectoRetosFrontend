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
    getUserAll: () => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/users`, {
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
    getChallengesByCategory: (categoryId) => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/categories/${categoryId}/challenges`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getChallengeById: (challengeId) => {
        const token = sessionStorage.getItem('token');
        return axios.get(`/api/challenges/${challengeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    submitChallengeAnswer: (challengeId, payload) => {
        const token = sessionStorage.getItem('token');
        return axios.post(`/api/challenges/${challengeId}/submit`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    
    //ADMIN AUTHENTICATED 
    // CATEGORIES
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

    // CHALLENGES
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
    getChallengeByCategory: (categoryId) => {
        const token = sessionStorage.getItem('token');
        return axios.get(`${base_api_url}/challenges?category_id=${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    },
    getChallengeStoreAI: (data) => {
        const token = sessionStorage.getItem('token');
        return axios.post(`${base_api_url}/challenges/generate-random`, data, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    }

}
