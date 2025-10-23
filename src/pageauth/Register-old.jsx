import React, { useState, useEffect} from 'react'
import Config from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

const Register = () => {
    const { getToken } = AuthUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
      if(getToken()){
        navigate("/")
      }
    },[])

    const submitRegistro = async(e) => {
        e.preventDefault();

        Config.getRegister({username: username, password: password})
        .then(({data})=>{
            console.log(data);
            alert("Registro Exitoso");
            if(data.success){
                navigate("/login");
            }
        })
        .catch(({response})=>{
            console.log(response);
            alert("Error en el registro");
        })
    }

  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-sm-4">
                <div className="card mt-5 mb-5">
                    <div className="card-body">
                        <h1 className="text-center fw-bolder">REGISTRO</h1>
                        <form onSubmit={submitRegistro}>
                          <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Username:"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            className="form-control mt-3"
                            placeholder="Password:"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button className="btn btn-primary mt-3 w-100" type="submit">Enviar</button>
                        </form>
                        <p className='text-center mt-3'><a href="#" className='small text-decoration-none'></a>Terminos y condiciones</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register