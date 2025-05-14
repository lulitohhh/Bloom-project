import './LoginForm.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../../services/firebase/authservice';


const LoginForm = () =>{
    const [username, setUsername] = useState(''); // Asumo que es el email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginWithEmailAndPassword(username, password);
      navigate('/dashboard'); // Redirige al dashboard tras login
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch(errorCode) {
      case 'auth/user-not-found':
        return 'Usuario no registrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      default:
        return 'Error al iniciar sesión';
    }
  };

    return(

    <div className="log-container">
      <h1 className='log-title'>LOGIN</h1>
      
      {location.state?.registrationSuccess && (
        <div className="success-message">
          ¡Registro completado! Por favor inicia sesión.
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="input-container">
        <label className='bloom-label'>
          <input 
            className="bloom-input" 
            type="text" 
            placeholder="Joseph123" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className='bloom-label'>
          <input 
            className="bloom-input" 
            type="password" 
            placeholder="Type your password here" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </label>
      </div>
      
      <button 
        id="logButton" 
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Login'}
      </button>

      <div className="login-links">
        <button 
          className="text-button"
          onClick={() => navigate('/register')}
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </div>
    </div>
    )

}

export default LoginForm;