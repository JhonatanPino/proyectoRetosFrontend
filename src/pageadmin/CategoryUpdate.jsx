import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Config from '../Config';
import Sidebar from './Sidebar.jsx';
import { toast } from 'react-toastify';

const CategoryUpdate = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const _getCategoryUpdate = async () => {
            Config.getCategoryById(id)
                .then(({ data }) => {
                    setName(data.data.name);
                })
                .catch((error) => {
                    console.error("Error fetching category:", error);
                });
        }
        _getCategoryUpdate();
    }, []);

    const submitUpdate = async (e) => {
        e.preventDefault();
        await Config.getCategoryUpdate(id, { name });
        toast.success("Categoria actualizada con exito.");
        setTimeout(() => {
            navigate("/admin/category");
        }, 2000);
    }

    return (
            <div className="container bg-light mt-3">
                <div className='row justify-content-center mt- mb-5'>
                    <Sidebar />
                    <div className='col-sm-10 mt-3 mb-3'>
                        <div className="card">
                            <div className='card-body'>
                                <h3 className="card-title text-center">Editar categoria</h3>
                                <hr style={{ margin: "10px" }}/>
                                <form onSubmit={submitUpdate}>
                                    <div className='form-group row'>                            
                                        <div className='col-sm-12'>
                                            <label className='mb-2 fw-bold'>Nombre:</label>
                                            <input type="text" 
                                                className='form-control' 
                                                value={name} 
                                                onChange={(e) => setName(e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <NavLink to={-1} className="btn btn-secondary">Cancelar</NavLink>
                                        <button type='submit' className='btn btn-primary ms-3'>Actualizar categoria</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default CategoryUpdate