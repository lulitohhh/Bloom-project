import { createUserProfile } from '../../services/firebase/userService';
import {registerWithEmailAndPassword} from '../../services/firebase/authservice'
import './registerForm.css'
import { useState } from "react";
import { avatarOptions } from '../../data/avatarData';

const RegisterForm = () =>{
    const [selectedAvatar, setSelectedAvatar] = useState('avatar1');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // 1. Registro en Firebase Auth
      const userCredential = await registerWithEmailAndPassword(email, password);
      
      // 2. Guardar perfil en Firestore
      await createUserProfile(userCredential.user.uid, {
        name,
        email,
        avatar: selectedAvatar,
        lastLogin: new Date()
      });

      // 3. Redirigir (ejemplo con react-router)
      // navigate('/dashboard');

    } catch (err) {
      // Mapeo de errores de Firebase
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('El correo ya está registrado');
          break;
        case 'auth/weak-password':
          setError('La contraseña debe tener 6+ caracteres');
          break;
        case 'auth/invalid-email':
          setError('Correo electrónico inválido');
          break;
        default:
          setError('Error al crear la cuenta');
          console.error('Error detallado:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };
    




    return (
    <div className="reg-container">
      <h1 className='reg-title'>REGISTER</h1>
      
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="reg-input-container">
          <div className="text-input-container">
            <label className='bloom-label'>
              <input 
                className="bloom-input" 
                type="text" 
                name="name"
                placeholder="Full Name" 
                required 
                minLength="2"
              />
            </label>
            <label className='bloom-label'>
              <input 
                className="bloom-input" 
                type="email" 
                name="email"
                placeholder="Email Address" 
                required 
              />
            </label>
            <label className='bloom-label'>
              <input 
                className="bloom-input" 
                type="password" 
                name="password"
                placeholder="Password (min 6 chars)" 
                required 
                minLength="6"
              />
            </label>
          </div>

          <div className="avatar-selection-container">
            <h3 className="avatar-title">Choose your avatar</h3>
            <div className="avatar-grid">
              {avatarOptions.map((avatar) => (
                <div 
                  key={avatar.id}
                  className={`avatar-item ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(avatar.id)}
                >
                  <img 
                    src={avatar.image} 
                    alt={avatar.alt}
                    className="avatar-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          id="regButton" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;