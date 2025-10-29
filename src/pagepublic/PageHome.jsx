import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const PageHome = () => {
    const { getRole, getToken } = AuthUser(); 
    const navigate = useNavigate();

    const handleExploreClick = () => {
        if (!getToken()) {
            navigate('/login');
        } else if (getRole() === 'admin') {
            navigate(`/admin/challenge`);
        } else{
            navigate(`/user/category/:categoryId/challenges`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="mb-4">¡Bienvenido a la Plataforma de Retos!</h1>
                    <p className="lead">
                        Participa en retos emocionantes, mejora tus habilidades y compite con otros usuarios. 
                        Explora categorías interesantes y demuestra tus conocimientos.
                    </p>
                    <button
                        onClick={handleExploreClick}
                        className="btn btn-primary btn-lg mt-3 mb-3"
                    >
                        Explorar Retos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageHome;