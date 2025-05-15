import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);

export const registerWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password); // Firebase ya maneja errores
};

export const loginWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};