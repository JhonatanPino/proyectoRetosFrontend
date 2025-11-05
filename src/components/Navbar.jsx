import React from "react";
import AuthUser from "../pageauth/AuthUser";
import { NavLink } from "react-router-dom";
import Config from "../Config.jsx";

const Navbar = () => {
    const { getToken, getRole, getUser} = AuthUser() 
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
                    <NavLink className="nav-link" aria-current="page" to={`/${getRole()}/info`}>Panel</NavLink>
                </li>
                <li className="nav-item me-3">
                    <NavLink className="nav-link" to={`/${getRole()}/user`}>Usuarios</NavLink>
                </li>
                <li className="nav-item me-3">
                    <NavLink className="nav-link" to={`/${getRole()}/category`}>Categorias</NavLink>
                </li>

                {getRole() === 'admin' && (
                    <li className="nav-item me-3">
                        <NavLink className="nav-link" to={`/${getRole()}/challenge`}>Retos</NavLink>
                    </li>
                )}
                {getRole() === 'user' && (
                    <li className="nav-item me-3">
                        <NavLink className="nav-link" to={`/user/category`}>Retos</NavLink>
                    </li>
                )}

                {getRole() === 'admin' && (
                    <li className="nav-item ms-auto">
                        <NavLink className="nav-link" to={`/${getRole()}/panel`}>Administracion | {getUser()?.username}</NavLink>
                    </li>
                )}
                {getRole() === 'user' && (
                    <li className="nav-item ms-auto">
                        <NavLink className="nav-link" to={`/${getRole()}/panel`}>Bienvenido | {getUser()?.username}</NavLink>
                    </li>
                )}
                <li className="nav-item me-3 ms-3">
                    <button className="btn btn-link nav-link p-0" onClick={logoutUser}>Cerrar Sesion</button>
                </li>
                </>
            )
        } else {
            return (
                <>
                <li className="nav-item me-3">
                    <NavLink className="nav-link" to="/register">Registrarme</NavLink>
                </li>
                <li className="nav-item me-3">
                    <NavLink className="nav-link" to="/login">Acceso</NavLink>
                </li>
                </> 
            )
        }
    }
    return (
        <>
            <hr style={{ margin: "0", borderTop: "2px solid #0b0b0bff" }} />
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">PlataformaRetos</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav w-100">
                            {renderLinks()}
                        </ul>
                    </div>
                </div>
            </nav>
            <hr style={{ margin: "0 0 20px 0" }} />
        </>
    );
};

export default Navbar;