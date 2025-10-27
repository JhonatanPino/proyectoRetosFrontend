import React from "react";
import AuthUser from "../pageauth/AuthUser";
import Config from "../Config.jsx";

const Navbar = () => {
    const { getToken, getRole } = AuthUser() 

    const logoutUser = async () => {
        try {
            await Config.getLogout();
            sessionStorage.clear();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error al cerrar sesión:', error.response?.data?.message || error.message);
        }
    };

    const renderLinks = () => {
        if(getToken()){
            return (
                <>
                <li className="nav-item me-3 ms-3">
                    <a className="nav-link active" aria-current="page" href={`/${getRole()}/info`}>Dashboard</a>
                </li>
                <li className="nav-item me-3">
                <a className="nav-link" href={`/${getRole()}/user`}>Usuarios</a>
                </li>
                <li className="nav-item me-3">
                <a className="nav-link" href={`/${getRole()}/category`}>Categorias</a>
                </li>
                <li className="nav-item me-3">
                <a className="nav-link" href={`/${getRole()}/challenge`}>Retos</a>
                </li>
                <li className="nav-item me-3">
                <a className="nav-link" href={`/${getRole()}/panel`}>Administracion</a>
                </li>
                <li className="nav-item ms-auto">
                <a className="nav-link" href="#" onClick={logoutUser}>Cerrar Sesion</a>
                </li>
                </>
            )
        } else {
            return (
                <>
                <li className="nav-item me-3">
                <a className="nav-link" href="/register">Registrarme</a>
                </li>
                <li className="nav-item me-3">
                <a className="nav-link" href="/login">Login</a>
                </li>
                </> 
            )
        }
    }
    return (
        <>
        <hr style={{ margin: "0",borderTop: "2px solid #0b0b0bff" }}/>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">PlataformaRetos</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav w-100">
                        {renderLinks()}
                    </ul>
                </div>
            </div>
        </nav>
        <hr style={{ margin: "0 0 20px 0" }}/>
        </>
    )
    
}  

export default Navbar