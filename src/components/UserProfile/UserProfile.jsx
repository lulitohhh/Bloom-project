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
      <p className="profile-detail">Plantas compradas: 🌱 {profile.purchasedItems?.length || 0}</p>
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
    <h3>🌼 Tipos de flores compradas</h3>
    <div className="profile-box">[Aquí van las flores]</div>
  </div>

  <div className="profile-section">
    <h3>🌿 Ecosistemas conseguidos</h3>
    <div className="profile-box">[Aquí van los ecosistemas]</div>
  </div>
</div>

  );
};

export default UserProfile;
