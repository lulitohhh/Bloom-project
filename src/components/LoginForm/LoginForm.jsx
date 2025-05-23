import './LoginForm.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/AuthSlice';
import { fetchUserCoins } from '../../redux/AuthSlice';


const LoginForm = () =>{
    const [email, setEmail] = useState(''); 
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
        const { loginWithEmailAndPassword } = await import('../../services/firebase/authservice');
        const userCredential = await loginWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;
        
    
    dispatch(setUser({ uid: userId, email: userCredential.user.email }));
    dispatch(fetchUserCoins(userId));
        
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
        aria-busy={isLoading}
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