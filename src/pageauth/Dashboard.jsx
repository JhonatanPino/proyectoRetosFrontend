import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";

const Dashboard = () => {
    const { getRole, getUser } = AuthUser();
    const [role, setRole] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const role = getRole();
        const user = getUser();
        setRole(role);
        setUser(user);
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Panel Principal</h1>
            <div className="mt-4">
                <div className="d-flex justify-content-center mb-5" >
                    <div className="card pt-2" style={{ width: "40%" }}>
                        <div className="card-body">
                            <h5 className="card-title">Información del Usuario</h5>
                            <p><strong>Nombre de usuario:</strong> {user.username}</p>
                            <p><strong>Puntaje:</strong> {user.score}</p>
                            <p><strong>Rol:</strong> {role}</p>
                        </div>
                    </div>
                </div>
                {role === "admin" ? (
                    <div>
                        <h2 className="text-center">Bienvenido, Administrador: {getUser()?.username}</h2>
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Gestionar usuarios</h5>
                                        <p className="card-text">Administra los usuarios registrados en la plataforma.</p>
                                        <a href="/admin/user" className="btn btn-primary">Explorar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Gestionar categorías</h5>
                                        <p className="card-text">Administra las categorías disponibles para los retos.</p>
                                        <a href="/admin/category" className="btn btn-primary">Explorar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Gestionar retos</h5>
                                        <p className="card-text">Crea, edita y elimina retos para los usuarios.</p>
                                        <a href="/admin/challenge" className="btn btn-primary">Explorar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : role === "user" ? (
                    <div>
                        <h2 className="text-center">Bienvenido, Usuario: {getUser()?.username}</h2>
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Participar en retos</h5>
                                        <p className="card-text">Compite en retos y mejora tu puntuación.</p>
                                        <a href="/user/category/:categoryId/challenges" className="btn btn-primary">Explorar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Ver Categorias</h5>
                                        <p className="card-text">Explora una serie de categorias disponibles.</p>
                                        <a href="/user/category" className="btn btn-primary">Explorar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Consultar puntuaciones</h5>
                                        <p className="card-text">Revisa tus puntuaciones y preparate para otro reto.</p>
                                        <a href="/user/user" className="btn btn-primary">Explorar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Cargando...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;