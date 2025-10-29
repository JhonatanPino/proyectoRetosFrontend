import React, { useEffect, useState } from 'react';
import Sidebar from '../pageadmin/Sidebar';
import Config from '../Config';
import { useNavigate } from 'react-router-dom';

const CategoryAllUser = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        _getCategoryAll();
    }, []);

    const _getCategoryAll = async () => {
        const response = await Config.getCategoryAll();
        setCategories(response.data.data);
    };

    //
    const handleViewChallenges = (categoryId) => {
        navigate(`/user/category/${categoryId}/challenges`);
    };

    return (
        <div className="container bg-light mt-3">
            <div className="row">
                <Sidebar />
                <div className="col-sm-10 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body pt-2">
                            <h3 className="text-center">Lista de Categorías</h3>
                            <hr style={{ margin: '0 0 18px 0' }} />
                            <div className="row">
                                {
                                    !Array.isArray(categories) || categories.length === 0 ? (
                                        <div className="col-12 text-center">
                                            <p>Cargando categorías...</p>
                                        </div>
                                    ) : (
                                        categories.map((category) => (
                                            <div key={category.id} className="col-md-6 mb-4">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        
                                                        <h5 className="card-title mb-3">{category.name}</h5>
                                                        <button
                                                            className="btn btn-primary pe-4 ps-4"
                                                            onClick={() => handleViewChallenges(category.id)}
                                                        >
                                                            Ver retos
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryAllUser;