import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Config from '../Config'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

const CategoryAll = () => {
    const [categories, setCategories] = useState([])
  
    useEffect(() => {
        _getCategoryAll();
    },[])
  
    const _getCategoryAll = async () => {
        const response = await Config.getCategoryAll();
        console.log(response.data)
        setCategories(response.data.data)
    }

    const _deleteCategoryById = async (id) => {
        const isDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
        if (isDelete) {
            await Config.getCategoryDeleteById(id);
            toast.success("Categoria eliminada con exito.");
            setTimeout(() => {
                _getCategoryAll();
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
                            <NavLink to={'/admin/category/create'} className='btn btn-primary m-3 ms-2'>Crear nueva categoria</NavLink>
                            <hr style={{ margin: "5px" }}/>
                            <h3 className='text-center'>Lista de categorias</h3>
                            <hr style={{ margin: "5px" }}/>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>ID</th>
                                        <th style={{ width: "60%" }}>Nombre</th> 
                                        <th style={{ width: "20%" }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !Array.isArray(categories) || categories.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center">Cargando categorias...</td>
                                            </tr>
                                        ) : (
                                            categories.map((category) => (
                                                <tr key={category.id}>
                                                    <td>{category.id}</td>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <NavLink to={`/admin/category/edit/${category.id}`} className='btn btn-primary me-2'>Editar</NavLink>
                                                        <button className='btn btn-primary ms-3' onClick={()=> _deleteCategoryById(category.id)}>Eliminar</button>
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

export default CategoryAll