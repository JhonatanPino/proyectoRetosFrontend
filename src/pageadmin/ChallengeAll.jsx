import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Config from '../Config'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

const ChallengeAll = () => {
    const [challenges, setChallenges] = useState([])
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        _getChallengeAll(); 
        _getCategories(); 
    }, []);
      
    const _getChallengeAll = async (categoryId = '') => {
        try {
            let response;
            if (categoryId) {
                response = await Config.getChallengeByCategory(categoryId);
            } else {
                response = await Config.getChallengeAll();
            }
            setChallenges(response.data.data); 
        } catch (error) {
            console.error('Error al cargar los retos:', error);
            toast.error('Error al cargar los retos.');
        }
    }

    const _getCategories = async () => {
        try {
            const response = await Config.getCategoryAll();
            setCategories(response.data.data); 
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
            toast.error('Error al cargar las categorías.');
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId); 
        _getChallengeAll(categoryId); 
    };

    const _deleteChallengeById = async (id) => {
        const isDelete = window.confirm("¿Estás seguro de que deseas eliminar este reto?");
        if (isDelete) {
            await Config.getChallengeDeleteById(id);
            toast.success("Reto eliminado con exito.");
            setTimeout(() => {
                _getChallengeAll();
            }, 2000);
        }
    }

    return (
        <div className="container bg-light mt-3">
            <div className="row">
                <Sidebar />
                <div className="col-sm-10 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body pt-0">
                            <div className="mb-3 d-flex align-items-center">
                                <NavLink
                                    to={'/admin/challenge/create'}
                                    className="btn btn-primary mt-4 me-4 ms-2"
                                >Crear nuevo reto</NavLink>
                                <NavLink
                                    to={'/admin/challenge/create/ai'}
                                    className="btn btn-primary mt-4 me-4"
                                >Crear nuevo reto con OpenAI</NavLink>
                                <div className="ms-auto" style={{ width: '350px' }}>
                                    <label htmlFor="categoryFilter" className="form-label fw-bold ms-2 mt-2 ">
                                        Filtrar por Categoría:
                                    </label>
                                    <select
                                        id="categoryFilter"
                                        className="form-select"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">Todas las Categorías</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <hr style={{ margin: '5px' }} />
                            <h3 className="text-center">Lista de retos</h3>
                            
                            <hr style={{ margin: '5px' }} />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>ID</th>
                                        <th style={{ width: '20%' }}>Nombre</th>
                                        <th style={{ width: '50%' }}>Descripción</th>
                                        <th style={{ width: '5%' }}>Puntos</th>
                                        <th style={{ width: '20%' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!Array.isArray(challenges) || challenges.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                Cargando retos...
                                            </td>
                                        </tr>
                                    ) : (
                                        challenges.map((challenge) => (
                                            <tr key={challenge.id}>
                                                <td>{challenge.id}</td>
                                                <td>{challenge.name}</td>
                                                <td>{challenge.description}</td>
                                                <td>{challenge.score_value}</td>
                                                <td>
                                                    <NavLink
                                                        to={`/admin/challenge/edit/${challenge.id}`}
                                                        className="btn btn-primary me-4"
                                                    >Editar</NavLink>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => _deleteChallengeById(challenge.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ChallengeAll