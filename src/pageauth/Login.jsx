import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Config from '../Config.jsx';
import AuthUser from './AuthUser';
import { toast } from 'react-toastify';


const Login = () => {
  const { saveToken, getToken, getRole} = AuthUser(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/"); 
    }
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    Config.getLogin({ username, password })
      .then(({ data }) => {
        console.log(data);

        if (data?.token) {
          saveToken(data.token, data.data, data.data.role);
          toast.success(data.message || "Autenticación exitosa.");
          setTimeout(() => {
            navigate(`/${getRole()}/info`);
          }, 2000);
        } else {
          toast.error("No se pudo completar la autenticación.");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.message) {
          toast.error(response.data.message);
        } else {
          toast.error("Error al ingresar. Inténtalo de nuevo.");
        }
      });
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <div className="card mt-4 mb-4">
            <div className="card-body p-3 p-md-4">
              <h1 className="text-center fw-bolder fs-4 fs-md-3">ACCESO</h1>

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

                <button className="btn btn-primary mt-3 w-100" type="submit">Ingresar</button>              </form>

              <hr />
              <p className="text-center mt-3">Primera vez, Debe Registrarse</p>
              <NavLink to="/register" className="btn btn-primary w-100">Registrarme</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login