import React from "react";
import AuthUser from "../pageauth/AuthUser";
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
                    <a className="nav-link " aria-current="page" href={`/${getRole()}/info`}>Panel</a>
                </li>
                <li className="nav-item me-3">
                <a className="nav-link" href={`/${getRole()}/user`}>Usuarios</a>
                </li>
                <li className="nav-item me-3">
                <a className="nav-link" href={`/${getRole()}/category`}>Categorias</a>
                </li>
                

                {getRole() === 'admin' && (
                    <li className="nav-item me-3">
                        <a className="nav-link" href={`/${getRole()}/challenge`}>Retos</a>
                    </li>
                )}
                {getRole() === 'user' && (
                    <li className="nav-item me-3">
                        <a className="nav-link" href={`/${getRole()}/category/:categoryId/challenges`}>Retos</a>
                    </li>
                )}

                {getRole() === 'admin' && (
                    <li className="nav-item ms-auto">
                        <a className="nav-link" href={`/${getRole()}/panel`}>Administracion | {getUser()?.username}</a>
                    </li>
                )}
                {getRole() === 'user' && (
                    <li className="nav-item ms-auto">
                        <a className="nav-link" href={`/${getRole()}/panel`}>Bienvenido | {getUser()?.username}</a>
                    </li>
                )}
                <li className="nav-item me-3 ms-3">
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
                <a className="nav-link" href="/login">Acceso</a>
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