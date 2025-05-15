import React from "react";
import "./pot.css"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { doc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { getDoc } from "firebase/firestore";



const Pot = ({ index }) => {
  const currentUser = useSelector(state => state.auth.user);
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const loadPlant = async () => {
      if (!currentUser?.uid) return;
      
      const userRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const potPlants = userData.potPlants || [null, null]; // Asegura 2 slots
        setPlant(potPlants[index] || null); // Maneja índices fuera de rango
      }
    };

    loadPlant();
  }, [currentUser, index]);

  return (
    <div className='pot'>
      {plant ? (
        <img 
          src={plant.isMature ? (plant.matureImage || plant.image) : (plant.sproutImage || plant.image)} 
          alt={plant.name} 
          className="pot-plant"
        />
      ) : (
        <div className="empty-pot"></div>
      )}
    </div>
  );
};

export default Pot;