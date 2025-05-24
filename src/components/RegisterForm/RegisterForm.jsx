import Avatar1 from '../../assets/avatars/avatar1.png';
import Avatar2 from '../../assets/avatars/avatar2.png';
import Avatar3 from '../../assets/avatars/avatar3.png';
import Avatar4 from '../../assets/avatars/avatar4.png';
import Avatar5 from '../../assets/avatars/avatar5.png';
import Avatar6 from '../../assets/avatars/avatar6.png';
import { createUserProfile } from '../../services/firebase/userService';
import {registerWithEmailAndPassword} from '../../services/firebase/authservice'
import './RegisterForm.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export const avatarOptions = [
  { id: 'avatar1', image: Avatar1, alt: 'Avatar estilo cartoon 1' },
  { id: 'avatar2', image: Avatar2, alt: 'Avatar estilo cartoon 2' },
  { id: 'avatar3', image: Avatar3, alt: 'Avatar profesional' },
  { id: 'avatar4', image: Avatar4, alt: 'Avatar animal' },
  { id: 'avatar5', image: Avatar5, alt: 'Avatar abstracto' },
  { id: 'avatar6', image: Avatar6, alt: 'Avatar pixel art' }
];

const RegisterForm = () =>{
    const [selectedAvatar, setSelectedAvatar] = useState('avatar1');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      
      const userCredential = await registerWithEmailAndPassword(email, password);
      
      
      await createUserProfile(userCredential.user.uid, {
        username,
        email,
        avatar: selectedAvatar,
        lastLogin: new Date()
      });

      navigate('/', { 
        state: { 
          registrationSuccess: true,
        } 
      });

    } catch (err) {
      
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
                name="username"
                placeholder="Username" 
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