import React, { useEffect, useState } from 'react'
import Config from '../Config'
import Sidebar from '../pageadmin/Sidebar'

const UserMe = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        _getUserMe();
    },[])

    const _getUserMe = async () => {
        const response = await Config.getUserMe();
        console.log(response.data)
        setUser(response.data)
    }

  return (
    <div className="container bg-light mt-3">
        <div className="row">
        <Sidebar />
            <div className='col-sm-10 mt-3 mb-3'>
                <div className='card'>
                    <div className='card-body pt-2'>
                            <h3 className='text-center'>Mi usuario</h3>
                            <hr style={{ margin: "5px" }}/>
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
                                {user ? (
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.score}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">Cargando usuario...</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserMe