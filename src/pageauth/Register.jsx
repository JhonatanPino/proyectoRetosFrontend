import React, { useState, useEffect } from 'react';
import Config from '../Config.jsx';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import { toast } from 'react-toastify';

  const Register = () => {
    const {getToken} = AuthUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
      if(getToken()){
        navigate("/")
      }
    },[])

  const submitRegistro = async (e) => {
      e.preventDefault();

      Config.getRegister({ username, password })
            .then(({ data }) => {
                console.log(data);

                if (data?.token) {
                    toast.success(data.message || "Registro exitoso.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000); // Espera 2 segundos antes de redirigir
                } else {
                    toast.error("No se pudo completar el registro.");
                }
            })
            .catch(({ response }) => {
                console.log(response);
                // Manejar errores del backend
                if (response?.data?.message) {
                    toast.error(response.data.message);
                } else {
                    toast.error("Error al registrar. Inténtalo de nuevo.");
                }
            });
  };

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
                  onChange={(e) => {setUsername(e.target.value); }}
                  required
                />
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Password:"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); }}
                  required
                />

                <button className="btn btn-primary mt-3 w-100" type="submit">Enviar</button>
              </form>
  
              <a href="#" className="d-block text-center mt-3">Términos y condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;