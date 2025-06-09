import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUserProfile } from '../../services/firebase/userService';
import { updateUserProfile } from '../../services/firebase/userService';
import { avatarOptions } from '../RegisterForm/RegisterForm';
import { setUser } from '../../redux/AuthSlice';
import './UserProfile.css';

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        // Asegúrate de que purchasedPlants sea un array, si no existe o es null, inicialízalo
        if (!data.purchasedPlants) {
          data.purchasedPlants = [];
        }
        setProfile(data);
        setNewUsername(data.username);
        setNewAvatar(data.avatar);
      } catch (error) {
        console.error("No se pudo cargar el perfil:", error);
      }
    };
    if (user?.uid) fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    try {
      await updateUserProfile(user.uid, {
        username: newUsername,
        avatar: newAvatar
      });
      dispatch(setUser({ ...user, username: newUsername, avatar: newAvatar }));
      // Actualizar el estado local del perfil para reflejar los cambios
      setProfile(prevProfile => ({
        ...prevProfile,
        username: newUsername,
        avatar: newAvatar
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  if (!profile) return <p>Cargando perfil...</p>;

  const avatarImg = avatarOptions.find(a => a.id === profile.avatar)?.image;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={avatarImg} alt="Avatar" className="profile-avatar" />
        <div className="profile-info">
          <h2 className="profile-title">¡Hola, {profile.username}!</h2>
          {/* Muestra la cantidad de plantas compradas del nuevo array */}
          <p className="profile-detail">Plantas compradas: 🌱 {profile.purchasedPlants?.length || 0}</p>
        </div>
        <button className="edit-icon-button" onClick={() => setIsEditing(true)}>
          ✏️
        </button>
      </div>

      {isEditing && (
        <div className="edit-form">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Nuevo nombre"
            className="profile-input"
          />
          <div className="avatar-grid">
            {avatarOptions.map((avatar) => (
              <img
                key={avatar.id}
                src={avatar.image}
                alt={avatar.alt}
                onClick={() => setNewAvatar(avatar.id)}
                className={`avatar-option ${newAvatar === avatar.id ? 'selected' : ''}`}
              />
            ))}
          </div>
          <button className="save-button" onClick={handleUpdate}>Guardar</button>
        </div>
      )}

      <div className="profile-section">
        <h3>🌼 Flores compradas</h3>
        <div className="profile-box purchased-plants-grid"> {/* Añadimos una clase para estilos si es necesario */}
          {profile.purchasedPlants && profile.purchasedPlants.length > 0 ? (
            profile.purchasedPlants.map((plant, index) => (
              <div key={plant.id + '-' + index} className="purchased-plant-item"> {/* Añadimos una key única */}
                <img 
                  src={plant.image} // Usamos la imagen principal de la planta
                  alt={plant.name} 
                  className="purchased-plant-img" 
                />
                <span className="purchased-plant-name">{plant.name}</span>
              </div>
            ))
          ) : (
            <p>Aún no has comprado ninguna planta. ¡Visita la tienda!</p>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3>🌿 Ecosistemas conseguidos</h3>
        <div className="profile-box">[Aquí van los ecosistemas]</div>
      </div>
    </div>
  );
};

export default UserProfile;
