import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);

export const registerWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password); // Firebase ya maneja errores
};