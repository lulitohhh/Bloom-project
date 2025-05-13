import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

const db = getFirestore(app);

export const createUserProfile = (userId, userData) => {
  return setDoc(doc(db, "users", userId), { // Retorna la promesa directamente
    ...userData,
    createdAt: new Date()
  });
};