import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/firebase/userService';
import UserProfile from '../../components/UserProfile/UserProfile';
import NavBar from '../../components/navBar/navBar';
import './ProfileScreen.css'; 
const UserProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

    const loadProfile = useCallback(async () => {
    if (!user) return; 

    try {
      const data = await getUserProfile(user.uid);
      setProfileData(data);
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.uid) {
      navigate('/login');
    } else {
      loadProfile();
    }
  }, [user, navigate, loadProfile]);  

  if (loading) return <p className="loading-text">Cargando perfil...</p>;

  return (
    <>
     <NavBar />
      <div className="profile-page-container">
        <div className="notebook-bg">
          <div className="right-page">
            {profileData && (
              <UserProfile
                profileData={profileData}
                uid={user.uid}
                onProfileUpdate={loadProfile}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
