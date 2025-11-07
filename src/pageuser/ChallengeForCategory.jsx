import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Config from '../Config';
import Sidebar from '../pageadmin/Sidebar';

const ChallengeForCategory = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        _getCategoryDetails();
        _getChallengesForCategory();
    }, []);

    const _getCategoryDetails = async () => {
        try {
            const response = await Config.getCategoryById(categoryId); 
            setCategory(response.data.data); 
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
        }
    };

    const _getChallengesForCategory = async () => {
        try {
            const response = await Config.getChallengesByCategory(categoryId);
            setChallenges(response.data.data);
        } catch (error) {
            console.error('Error al cargar los retos:', error);
        }
    };

    return (
        <div className="container bg-light mt-3">
            <div className="row">
                <Sidebar />
                <div className="col-sm-10 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Retos de la Categoría {category ? category.name : 'Cargando...'}</h3>
                            <hr style={{ margin: '0 0 20px 0' }} />
                            <div className="row">
                                {!Array.isArray(challenges) || challenges.length === 0 ? (
                                    <div className="col-12 text-center">
                                        <p>Regresa a la pestaña de Categorias y elige una Categoria.</p>
                                    </div>
                                ) : (
                                    challenges.map((challenge) => (
                                        <div key={challenge.id} className="col-md-6 mb-4">
                                            <div className="card h-100 d-flex flex-column">
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{challenge.name}</h5>
                                                    <p className="card-text">
                                                        <strong>Puntos:</strong> {challenge.score_value}
                                                    </p>
                                                    <div className="mt-auto">
                                                        <div className="mt-auto">
                                                            <button
                                                                className="btn btn-success pe-4 ps-4"
                                                                style={{ width: 'auto' }}
                                                                onClick={() => navigate(`/user/challenge/solve/${challenge.id}`)}
                                                                disabled={challenge.user_has_answered} 
                                                            >
                                                                {challenge.user_has_answered ? 'Ya resuelto' : 'Resolver reto'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    ))
                                )}
                                <div className="d-flex justify-content-center mt-3 ">
                                    <button
                                        className="btn btn-primary ps-3 pe-3"
                                        onClick={() => navigate('/user/category')}
                                    >
                                        Ir a Categorías
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeForCategory;