import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../Config';
import { toast } from 'react-toastify';

const ChallengeSolve = () => {
    const { challengeId } = useParams(); 
    const [challenge, setChallenge] = useState(null); 
    const [selectedAnswer, setSelectedAnswer] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        _getChallengeDetails();
    }, []);

    const _getChallengeDetails = async () => {
        try {
            const response = await Config.getChallengeById(challengeId); 
            const challengeData = response.data.data;
            console.log(challengeData);
            setChallenge(challengeData); 
        } catch (error) {
            console.error('Error al cargar el reto:', error);
        } finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async () => {
    //     if (!selectedAnswer) {
    //         alert('Por favor, selecciona una respuesta antes de enviar.');
    //         return;
    //     }

    //     try {
    //         const payload = {
    //             selected_answer_id: selectedAnswer, 
    //         };
    //         console.log('Payload:', payload);
    //         const response = await Config.submitChallengeAnswer(challengeId, payload);
    //         alert(response.data.message); 
    //         toast.success('Respuesta enviada con éxito.');

    //         // Redirigir a los retos de la categoría
    //         if (challenge && challenge.category_id) {
    //             navigate(`/user/category/${challenge.category_id}/challenges`);
    //         } else {
    //             console.error('No se encontró el ID de la categoría.');
    //         }
    //     } catch (error) {
    //         console.error('Error al enviar la respuesta:', error.response?.data || error.message);
    //         alert('Hubo un error al enviar tu respuesta. Intenta nuevamente.');
    //     }
    // };
    const handleSubmit = async () => {
        if (!selectedAnswer) {
            alert('Por favor, selecciona una respuesta antes de enviar.');
            return;
        }

        try {
            const payload = {
                selected_answer_id: selectedAnswer,
            };
            console.log('Payload:', payload);

            const response = await Config.submitChallengeAnswer(challengeId, payload);
            console.log('Response:', response.data);

            alert(response.data.message);
            toast.success('Respuesta enviada con éxito.');

            if (challenge && challenge.category_id) {
                navigate(`/user/category/${challenge.category_id}/challenges`);
            } else {
                console.error('No se encontró el ID de la categoría.');
            }
        } catch (error) {
            console.error('Error al enviar la respuesta:', error.response?.data || error.message);
            alert('Hubo un error al enviar tu respuesta. Intenta nuevamente.');
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Cargando reto...</div>;
    }

    if (!challenge) {
        return <div className="text-center mt-5">No se encontró el reto.</div>;
    }

    return (
        <div className="container bg-light mt-3">
            <div className="row justify-content-center py-4">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">{challenge.name}</h3>
                            <p className="card-text">{challenge.description}</p>
                            <hr />
                            {challenge.answers && challenge.answers.length > 0 ? (
                                <div>
                                    <h5 className="m-3">Opciones de respuesta:</h5>
                                    <ul className="list-group mt-3">
                                        {challenge.answers.map((answer) => (
                                            <li key={answer.id} className="list-group-item">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="answer"
                                                        value={answer.id}
                                                        onChange={() => setSelectedAnswer(answer.id)}
                                                        className="me-2 mt-2"
                                                    />
                                                    {answer.description}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <button
                                        className="btn btn-success mt-3 me-4"
                                        onClick={handleSubmit}
                                        disabled={!selectedAnswer}
                                    >
                                        Enviar Respuesta
                                    </button>
                                    <button className="btn btn-secondary mt-3 float-end"
                                        onClick={() => navigate('/user/category')}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p>No hay respuestas asociadas a este reto aún.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeSolve;