import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        try {
            return tokenString ? JSON.parse(tokenString) : null; // Si está almacenado como JSON
        } catch (error) {
            return tokenString; // Si no es JSON, devolver tal cual
        }
    };

    const getRole = () => {
        const roleString = sessionStorage.getItem('role');
        try {
            return roleString ? JSON.parse(roleString) : null; // Si está almacenado como JSON
        } catch (error) {
            return roleString?.replace(/"/g, ''); // Elimina comillas dobles si no es JSON
        }
    };

    const getUser = () => {
        let roleString 
        try {
            console.log("Obteniendo rol desde sessionStorage...", sessionStorage.getItem('role'));
            roleString = JSON.parse(sessionStorage.getItem('user'));
            console.log("Rol obtenido de sessionStorage:", roleString);
            return roleString;
        } catch (error) {
            console.error("Error al parsear el rol desde sessionStorage:", error);
            return roleString;
        }
    };

    
/*
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        const token = JSON.parse(tokenString)
        return token;
    }

    const getRole = () => {
        const roleString = sessionStorage.getItem('role')
        const role = JSON.parse(roleString)
        return role;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user')
        const user = JSON.parse(userString)
        return user;
    }
*/
    
    const [token, setToken] = useState();
    const [user, setUser] = useState();
    const [role, setRole] = useState();

    const saveToken = (token, user, role) => {
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('role', role)

        setToken(token)
        setUser(user)
        setRole(role)

        console.log("Rol del usuario:", role);
        if(role === "admin")
            navigate('/admin')
        if(role === "user")
            navigate('/user')
    }

    const getLogout = () => {
        sessionStorage.clear()
        navigate('/login')
    }

    return {
        setToken,
        saveToken,
        token,
        user,
        role,
        getToken,
        getUser,
        getRole,
        getLogout
    }
}

export default AuthUser

