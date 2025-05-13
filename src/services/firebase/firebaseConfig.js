import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDBhtFJpWJ7abXbYBaDIv_o936X3YMc1ec",
  authDomain: "jotaud-c34f3.firebaseapp.com",
  projectId: "jotaud-c34f3",
  storageBucket: "jotaud-c34f3.firebasestorage.app",
  messagingSenderId: "509309319305",
  appId: "1:509309319305:web:893d24d8ffab5002ee6e58",
  measurementId: "G-502NC9C4Q9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);