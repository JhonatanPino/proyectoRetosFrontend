import React, { useState, useEffect } from 'react';
import Config, { setAuthToken } from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import { toast } from 'react-toastify';

const Login = () => {
  const { getToken } = AuthUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [message, setMessage] = useState(''); // <-- definir message para evitar error
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate('/');
    }
  }, [getToken, navigate]);

  const submitLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data } = await Config.getLogin({ username, password });
      if (data.success) {
        const successMsg = data.message || 'Login exitoso';
        toast.success(successMsg);

        if (data.token) {
          localStorage.setItem('token', data.token);
          setAuthToken(data.token);
        }

        // Guardar user si viene en la respuesta
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        // Determinar rol: preferir data.user.role, si no está, intentar decodificar JWT
        const roleFromUser = data.user?.role;
        let role = roleFromUser;
        if (!role && data.token) {
          try {
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            role = payload?.role || null;
          } catch (e) {
            role = null;
          }
        }

        // Redirigir según rol
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'user') {
          navigate('/user');
        } else {
          navigate('/'); // fallback
        }
      } else {
        const infoMsg = data.message || 'Credenciales incorrectas';
        setErrorMsg(infoMsg);
        toast.error(infoMsg);
      }
    } catch (err) {
      console.error(err);
      const resp = err?.response;
      const serverMsg = resp?.data?.message || 'Error en el servidor';
      setErrorMsg(serverMsg);
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <div className="card mt-5 mb-5">
            <div className="card-body">
              <h1 className="text-center fw-bolder">LOGIN</h1>

              <form onSubmit={submitLogin}>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Username:"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value); setErrorMsg(null); }}
                  required
                />
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Password:"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); setErrorMsg(null); }}
                  required
                />

                <button className="btn btn-primary mt-3 w-100" type="submit" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Enviar'}
                </button>
              </form>

              <p className="text-center mt-3">{message}</p>
              <hr />
              <p className="text-center mt-3">Primera vez... Debe Registrarse</p>
              <a href="/register" className='btn btn-primary w-100'>Registro</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login