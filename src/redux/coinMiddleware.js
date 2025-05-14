import { updateCoinsInFirestore } from "../services/firebase/coinsService";
import { db } from "../services/firebase/firebaseConfig";

export const coinMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (action.type === 'coins/addCoins' || action.type === 'coins/resetCoins') {
    const { auth } = store.getState();
    const { coins } = store.getState().coins;

    console.log("Middleware - db:", db); // Verifica que db no sea undefined
    console.log("Middleware - UID:", auth?.user?.uid); // Verifica el UID

    if (auth?.user?.uid) {
      updateCoinsInFirestore(auth.user.uid, coins)
        .then(() => console.log("Monedas actualizadas en Firestore"))
        .catch((error) => console.error("Error en middleware:", error));
    }
  }
  
  return result;
};