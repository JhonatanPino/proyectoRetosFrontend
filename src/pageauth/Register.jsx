import React, { useState, useEffect } from 'react';
import Config, { setAuthToken } from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import { toast } from 'react-toastify';

const Register = () => {
  const { getToken } = AuthUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate('/');
    }
  }, [getToken, navigate]);

  const submitRegistro = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const payload = {
      username: (username || '').trim(),
      password: password,
    };

    if (!payload.username || !payload.password) {
      const msg = 'Nombre de usuario y contraseña son obligatorios.';
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const res = await Config.getRegister(payload); // POST /register
      const data = res.data;
      console.log('register response', data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
      }

      if (data.success || res.status === 201) {
        const successMsg = data.message || 'Usuario registrado exitosamente.';
        toast.success(successMsg);
        navigate('/login');
      } else {
        const infoMsg = data.message || 'Registro completado (sin token).';
        setErrorMsg(infoMsg);
        toast.info(infoMsg);
      }
    } catch (err) {
      console.error('register error', err);
      const resp = err?.response;
      if (resp) {
        if (resp.data?.errors) {
          const first = Object.values(resp.data.errors)[0];
          const fieldMsg = Array.isArray(first) ? first[0] : String(first);
          setErrorMsg(fieldMsg);
          toast.error(fieldMsg);
        } else {
          const serverMsg = resp.data?.message || JSON.stringify(resp.data);
          setErrorMsg(serverMsg);
          toast.error(serverMsg);
        }
      } else {
        const netMsg = 'Error de red. Comprueba el servidor.';
        setErrorMsg(netMsg);
        toast.error(netMsg);
      }
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
              <h1 className="text-center fw-bolder">REGISTRO</h1>

              <form onSubmit={submitRegistro}>
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
                  {loading ? 'Registrando...' : 'Enviar'}
                </button>
              </form>

              <p className="text-center mt-3">Términos y condiciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;