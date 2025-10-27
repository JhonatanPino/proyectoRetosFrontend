import React from 'react'
import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Config from '../Config.jsx';
import { Link,  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CategoryStore = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const submitStore = async (e) => {
        e.preventDefault();
        await Config.getCategoryStore({ name });
        toast.success("Categoria creada con exito.");
        setTimeout(() => {
            navigate("/admin/category");
        }, 2000);
    };


    return (
        <div className="container bg-light mt-3">
            <div className='row justify-content-center mt- mb-5'>
                <Sidebar />
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card-body'>

                        <form onSubmit={submitStore}>
                            <div className='form-group row'>                            
                                <div className='col-sm-8'>
                                    <label className='mb-2'>Nombre:</label>
                                    <input type="text" 
                                        className='form-control' 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className='mt-3'>
                                <Link to={-1} className="btn btn-primary">Regresar</Link>
                                <button type='submit' className='btn btn-primary ms-3'>Crear categoria</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryStore