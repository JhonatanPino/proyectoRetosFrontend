import React, { useState } from 'react'
import Sidebar from './Sidebar.jsx';
import Config from '../Config.jsx';
import { Link,  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CategoryStore = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const submitStore = async (e) => {
        e.preventDefault();
        try {
            await Config.getCategoryStore({ name });
            toast.success("Categoria creada con exito.");
            setTimeout(() => {
                navigate("/admin/category");
            }, 2000);
        } catch (error) {
            console.error("Error creating category:", error);
            toast.error("Error al crear la categoria. Inténtalo de nuevo.");
        }        
    };


    return (
        <div className="container bg-light mt-3">
            <div className='row justify-content-center mt- mb-5'>
                <Sidebar />
                <div className='col-sm-10 mt-3 mb-3'>
                    <div className="card">
                        <div className='card-body'>
                            <h3 className="card-title text-center">Crear categoria</h3>
                            <hr style={{ margin: "10px" }}/>
                            <form onSubmit={submitStore}>
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
                                    <Link to={-1} className="btn btn-secondary">Cancelar</Link>
                                    <button type='submit' className='btn btn-primary ms-3'>Crear categoria</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryStore