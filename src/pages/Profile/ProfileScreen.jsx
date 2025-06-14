import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/firebase/userService';
import UserProfile from '../../components/UserProfile/UserProfile';
import NavBar from '../../components/navBar/navBar';
import './ProfileScreen.css'; 
import LoaderPlant from '../../components/LoaderPlant/LoaderPlant';

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

  if (loading) return <LoaderPlant></LoaderPlant>;

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
