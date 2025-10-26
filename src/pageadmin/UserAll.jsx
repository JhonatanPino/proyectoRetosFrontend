import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Config from '../Config'

const UserAll = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUserAll();
    },[])

    const getUserAll = async () => {
        const response = await Config.getUserAll();
        console.log(response.data)
        setUsers(response.data.data)
    }

  return (
    <div className="container bg-light mt-3">
        <div className="row">
        <Sidebar />
            <div className='col-sm-9 mt-3 mb-3'>
                <div className='card'>
                    <div className='card-body pt-2'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Puntaje</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !Array.isArray(users) || users.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center">Cargando usuarios...</td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.score}</td>
                                                <td>{user.role}</td>
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

export default UserAll