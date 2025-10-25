import React from "react";
import AuthUser from "../pageauth/AuthUser";
import Config from "../Config.jsx";

const Navbar = () => {
    const {getLogout, getToken, getRole} = AuthUser() 

    const logoutUser = async () => {
    try {
        await Config.getLogout();
        sessionStorage.clear();
        window.location.href = '/login';
    } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data?.message || error.message);
    }
};
/*
    const logoutUser = async () => {
        try {
            await Config.getLogout();
            sessionStorage.clear();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error al cerrar sesión:', error.response?.data?.message || error.message);
        }
    };
*/
    const renderLinks = () => {
        if(getToken()){
            return (
                <>
                <li className="nav-item">
                <a className="nav-link" href="#">Categorias</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Retos</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href={`/${getRole()}`}>Administracion</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#" onClick={logoutUser}>Cerrar Sesion</a>
                </li>
                </>
            )
        } else {
            return (
                <>
                <li className="nav-item">
                <a className="nav-link" href="/register">Registrarme</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
                </li>
                </> 
            )
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">PlataformaRetos</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                
                {renderLinks()}
            </ul>
            </div>
        </div>
        </nav>
    )
    
}  

export default Navbar