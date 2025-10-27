import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Config from '../Config'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ChallengeAll = () => {
    const [challenges, setChallenges] = useState([])
      
    useEffect(() => {
        _getChallengeAll();
    },[])
      
    const _getChallengeAll = async () => {
        const response = await Config.getChallengeAll();
        console.log(response.data)
        setChallenges(response.data.data)
    }

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
                <div className='col-sm-10 mt-3 mb-3'>
                    <div className='card'>
                        <div className='card-body pt-0'>
                            <Link to={'/admin/challenge/create'} className='btn btn-primary m-3 ms-2'>Crear nuevo reto</Link>
                            <hr style={{ margin: "5px" }}/>
                            <h3 className='text-center'>Lista de retos</h3>
                            <hr style={{ margin: "5px" }}/>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: "5%" }}>ID</th>
                                        <th style={{ width: "20%" }}>Nombre</th>
                                        <th style={{ width: "50%" }}>Descripcion</th>
                                        <th style={{ width: "5%" }}>Puntos</th>
                                        <th style={{ width: "20%" }}>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !Array.isArray(challenges) || challenges.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center">Cargando retos...</td>
                                            </tr>
                                        ) : (
                                            challenges.map((challenge) => (
                                                <tr key={challenge.id}>
                                                    <td>{challenge.id}</td>
                                                    <td>{challenge.name}</td>
                                                    <td>{challenge.description}</td>
                                                    <td>{challenge.score_value}</td>
                                                    <td>
                                                        <Link to={`/admin/challenge/edit/${challenge.id}`} className='btn btn-primary me-4'>Editar</Link>
                                                        <button className='btn btn-primary' onClick={()=> _deleteChallengeById(challenge.id)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ChallengeAll