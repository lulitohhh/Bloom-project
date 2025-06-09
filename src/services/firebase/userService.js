import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

const db = getFirestore(app);



export const createUserProfile = (userId, userData) => {
return setDoc(doc(db, "users", userId), {
...userData,
resources: {
water: 0,
fertilizer: 0
},
purchasedItems: [],
plants: [null, null, null], 
centralIndex: 1, 
createdAt: new Date()
});
};

export const getUserProfile = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    throw new Error("Perfil de usuario no encontrado");
  }
};

export const updateUserProfile = async (userId, updatedData) => {
  const userRef = doc(db, "users", userId);
  return await updateDoc(userRef, updatedData);
};