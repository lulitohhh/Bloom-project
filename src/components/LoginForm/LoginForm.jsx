import './LoginForm.css'

const LoginForm = () =>{
    const [username, setUsername] = useState(''); // Asumiré que es el email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
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