import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const syncCoinsFromFirestore = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().coins || 0 : 0;
};

export const updateCoinsInFirestore = async (userId, newCoins) => {
  try {
    // ¡Clave! Usa doc() con la referencia a 'users/{userId}'
    const userRef = doc(db, 'users', userId); 
    await updateDoc(userRef, { coins: newCoins });
  } catch (error) {
    console.error("Error updating coins in Firestore:", error);
    throw error; // Opcional: re-lanza el error para manejarlo en el middleware
  }
};