import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/firebase/userService';
import UserProfile from '../../components/UserProfile/UserProfile';

const UserProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useCallback para memorizar loadProfile y evitar recrearlo cada render
  const loadProfile = useCallback(async () => {
    try {
      const data = await getUserProfile(user.uid);
      setProfileData(data);
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      setLoading(false);
    }
  }, [user.uid]);

  useEffect(() => {
    if (!user?.uid) {
      navigate('/login'); // Redirige si no hay sesión
    } else {
      loadProfile();
    }
  }, [user, navigate, loadProfile]);  // Aquí agregamos todas las dependencias

  if (loading) return <p className="loading-text">Cargando perfil...</p>;

  return (
    <div className="profile-page-container">
      <h1 className="profile-page-title">Tu Perfil</h1>
      {profileData && (
        <UserProfile
          profileData={profileData}
          uid={user.uid}
          onProfileUpdate={loadProfile}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
