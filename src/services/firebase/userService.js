import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

const db = getFirestore(app);

export const createUserProfile = (userId, userData) => {
  return setDoc(doc(db, "users", userId), { // Retorna la promesa directamente
    ...userData,
     resources: {
      water: 0,
      fertilizer: 0
    },
    purchasedItems: [], 
    bigPotPlant: null,
    plantGrowth: 0,  
    potPlants: [null, null], 
    createdAt: new Date()
  });
};