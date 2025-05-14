import { updateCoinsInFirestore } from "../services/firebase/coinsService";

export const coinMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (action.type === 'coins/addCoins' || action.type === 'coins/resetCoins') {
    const { auth } = store.getState();
    const { coins } = store.getState().coins;

    if (auth?.user?.uid) {
      updateCoinsInFirestore(auth.user.uid, coins)
        .then(() => console.log("Monedas actualizadas en Firestore"))
        .catch((error) => console.error("Error en middleware:", error));
    }
  }
  
  return result;
};