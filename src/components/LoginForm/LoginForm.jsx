import './LoginForm.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../../services/firebase/authservice';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/AuthSlice';


const LoginForm = () =>{
    const [email, setEmail] = useState(''); // Asumo que es el email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      try {
        const userCredential = await loginWithEmailAndPassword(email, password);
        
        // Guarda el usuario en Redux (para que el middleware pueda acceder al uid)
        dispatch(setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email
        }));
        
        navigate('/dashboard');
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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