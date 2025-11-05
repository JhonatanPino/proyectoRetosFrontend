import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Config from '../Config';
import Sidebar from './Sidebar.jsx';
import { toast } from 'react-toastify';

const ChallengeStoreAI = () => {
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState("");
    const [score_value, setScoreValue] = useState("");
    const [answers_count] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await Config.getCategoryAll();
                setCategories(response.data.data); 
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Error al cargar las categorías.");
            }
        };
        fetchCategories();
    }, []);

    const submitStore = async (e) => {
        e.preventDefault();
        try {
            await Config.getChallengeStoreAI({
                category_id,
                score_value,
                answers_count,
            });
            toast.success("Reto creado con éxito utilizando OpenAI.");
            setTimeout(() => {
                navigate("/admin/challenge");
            }, 2000);
        } catch (error) {
            console.error("Error creating challenge with OpenAI:", error);
            toast.error("Error al crear el reto con OpenAI.");
        }
    };


    return (
        <div className="container bg-light mt-3">
            <div className="row">
                <Sidebar />
                <div className="col-sm-10 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Crear Reto con OpenAI</h3>
                            <hr style={{ margin: '5px' }} />
                            <form onSubmit={submitStore}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Categoría:</label>
                                    <select
                                        className="form-select"
                                        value={category_id}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Puntaje:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={score_value}
                                        onChange={(e) => setScoreValue(e.target.value)}
                                        required
                                    />
                                </div>
                                <NavLink to="/admin/challenge" className="btn btn-secondary me-3">
                                    Cancelar
                                </NavLink>
                                <button type="submit" className="btn btn-primary">
                                    Crear Reto con OpenAI
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChallengeStoreAI