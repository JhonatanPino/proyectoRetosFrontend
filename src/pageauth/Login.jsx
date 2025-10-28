import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../Config.jsx';
import AuthUser from './AuthUser';
import { toast } from 'react-toastify';
import axios from 'axios';


const Login = () => {
  const { saveToken, getToken, getRole} = AuthUser(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/admin"); 
    }
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    await axios.get('/sanctum/csrf-cookie').then((response) => {
      Config.getLogin({ username, password })
      .then(({ data }) => {
        console.log(data);
    
        if (data?.token) {
          saveToken(data.token, data.data, data.data.role);
          toast.success(data.message || "Autenticacion exitosa.");
          setTimeout(() => {
            navigate(`/${getRole()}/info`);
          }, 2000);
                    
        } else {
          toast.error("No se pudo completar la autenticacion.");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        // Manejar errores del backend
        if (response?.data?.message) {
          toast.error(response.data.message);
        } else {
          toast.error("Error al ingresar. Inténtalo de nuevo.");
        }
      });
    })
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <div className="card mt-5 mb-5">
            <div className="card-body">
              <h1 className="text-center fw-bolder">ACCESO</h1>

              <form onSubmit={submitLogin}>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Username:"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value);}}
                  required
                />
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Password:"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value);}}
                  required
                />

                <button className="btn btn-primary mt-3 w-100" type="submit" >Ingresar</button>
              </form>

              <hr />
              <p className="text-center mt-3">Primera vez, Debe Registrarse</p>
              <a href="/register" className='btn btn-primary w-100'>Registrarme</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login