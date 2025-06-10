import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const getCoinsFromFirestore = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data().coins || 0 : 0;
  } catch (error) {
    console.error("Error al obtener monedas:", error);
    return 0; 
  }
};

export const syncCoinsFromFirestore = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().coins || 0 : 0;
};

export const updateCoinsInFirestore = async (userId, newCoins) => {
  try {
    
    const userRef = doc(db, 'users', userId); 
    await updateDoc(userRef, { coins: newCoins });
    console.log("Monedas actualizadas en Firestore para UID:", userId);
  } catch (error) {
    console.error("Error en updateCoinsInFirestore:", error);
    throw error; 
  }
}; 
