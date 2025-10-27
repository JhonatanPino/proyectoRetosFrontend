import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../Config';
import Sidebar from './Sidebar.jsx';
import { toast } from 'react-toastify';

const ChallengeStore = () => {
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState("");
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
                setCategories(response.data.data); // Asigna las categorías al estado
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Error al cargar las categorías.");
            }
        };
        fetchCategories();
    }, []);

    const handleAnswerChange = (index, field, value) => {
        const updatedAnswers = [...answers];
        if (field === "is_correct" && value === true) {
            // Asegura que solo un checkbox esté seleccionado
            updatedAnswers.forEach((answer, i) => {
                updatedAnswers[i].is_correct = i === index;
            });
        } else {
            updatedAnswers[index][field] = value;
        }
        setAnswers(updatedAnswers);
    };

    const submitStore = async (e) => {
        e.preventDefault();
        try {
            // Envía los datos al backend
            await Config.getChallengeStore({
                category_id,
                name,
                description,
                score_value,
                answers,
            });
            toast.success("Reto creado con éxito.");
            setTimeout(() => {
                navigate("/admin/challenge");
            }, 2000);
        } catch (error) {
            console.error("Error creating challenge:", error);
            toast.error("Error al crear el reto. Inténtalo de nuevo.");
        }
    };


    return (
        <div className="container bg-light mt-3">
            <div className="row justify-content-center mt- mb-5">
                <Sidebar />
                <div className="col-sm-10 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Crear reto</h3>
                            <hr style={{ margin: "5px" }} />
                            <form onSubmit={submitStore}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Categoría ID:</label>
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
                                    <label className="form-label fw-bold">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Descripción:</label>
                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Valor del Puntaje:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={score_value}
                                        onChange={(e) => setScoreValue(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Respuestas:</label>
                                    {answers.map((answer, index) => (
                                        <div key={index} className="mb-2 d-flex align-items-center">
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                style={{ flex: "0 0 80%" }}
                                                placeholder={`Respuesta ${index + 1}`}
                                                value={answer.description}
                                                onChange={(e) =>
                                                    handleAnswerChange(index, "description", e.target.value)
                                                }
                                                required
                                            />
                                            <div className="form-check d-flex align-items-center justify-content-end pe-4"
                                                style={{ flex: "0 0 20%" }}>
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
                                <Link to="/admin/challenge" className="btn btn-secondary me-3">
                                    Cancelar
                                </Link>
                                <button type="submit" className="btn btn-primary">
                                    Crear reto
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChallengeStore