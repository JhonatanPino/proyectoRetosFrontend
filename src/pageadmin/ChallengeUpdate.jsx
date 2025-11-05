import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Config from '../Config';
import Sidebar from './Sidebar.jsx';
import { toast } from 'react-toastify';

const ChallengeUpdate = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]); 
    const [category_id, setCategoryId] = useState("");
    const [category_name, setCategoryName] = useState(""); 
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [score_value, setScoreValue] = useState("");
    const [answers, setAnswers] = useState([
        { description: "", is_correct: false },
        { description: "", is_correct: false },
        { description: "", is_correct: false },
        { description: "", is_correct: false },
    ]);
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

        const fetchChallenge = async () => {
            try {
                const response = await Config.getChallengeById(id);
                const data = response.data.data;

                setCategoryId(data.category_id);
                setName(data.name);
                setDescription(data.description);
                setScoreValue(data.score_value);
                setAnswers(data.answers);
            } catch (error) {
                console.error("Error fetching challenge:", error);
            }
        };

        fetchCategories();
        fetchChallenge();
    }, [id]);

    useEffect(() => {
        // Busca el nombre de la categoría correspondiente al category_id
        const category = categories.find((cat) => cat.id === category_id);
        if (category) {
            setCategoryName(category.name);
        }
    }, [categories, category_id]);

    const handleAnswerChange = (index, field, value) => {
        const updatedAnswers = [...answers];

        if (field === "is_correct" && value === true) {
            // Si se selecciona un checkbox, desactiva los demás
            updatedAnswers.forEach((answer, i) => {
                updatedAnswers[i].is_correct = i === index;
            });
        } else {
            updatedAnswers[index][field] = value;
        }

        setAnswers(updatedAnswers);
    };

    const submitUpdate = async (e) => {
        e.preventDefault();
        try {
            await Config.getChallengeUpdate(id, {
                category_id,
                name,
                description,
                score_value,
                answers,
            });
            toast.success("Reto actualizado con éxito.");
            setTimeout(() => {
                navigate("/admin/challenge");
            }, 2000);
        } catch (error) {
            console.error("Error updating challenge:", error);
            toast.error("Error al actualizar el reto.");
        }
    };

    return (
        <div className="container bg-light mt-3">
            <div className="row justify-content-center mt- mb-5">
                <Sidebar />
                <div className="col-sm-10 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Editar reto</h3>
                            <hr style={{ margin: "5px" }} />
                            <form onSubmit={submitUpdate}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Categoría:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={category_name} // Muestra el nombre de la categoría
                                        disabled // Campo de solo lectura
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Descripción:</label>
                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Valor del Puntaje:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={score_value}
                                        onChange={(e) => setScoreValue(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Respuestas:</label>
                                    {answers.map((answer, index) => (
                                        <div key={index} className="mb-3 d-flex align-items-center">
                                            <input
                                                type="text"
                                                className="form-control me-3"
                                                style={{ flex: "0 0 80%" }} 
                                                placeholder={`Respuesta ${index + 1}`}
                                                value={answer.description}
                                                onChange={(e) =>
                                                    handleAnswerChange(index, "description", e.target.value)
                                                }
                                            />
                                            <div
                                                className="form-check d-flex align-items-center justify-content-end pe-4"
                                                style={{ flex: "0 0 20%" }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input me-2"
                                                    checked={answer.is_correct}
                                                    onChange={(e) =>
                                                        handleAnswerChange(index, "is_correct", e.target.checked)
                                                    }
                                                />
                                                <label className="form-check-label fw-bold">
                                                    ¿Respuesta correcta?
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <NavLink to="/admin/challenge" className="btn btn-secondary me-3">
                                    Cancelar
                                </NavLink>
                                <button type="submit" className="btn btn-primary">
                                    Actualizar reto
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeUpdate;