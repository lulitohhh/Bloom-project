import { updateCoinsInFirestore } from "../services/firebase/coinsService";


export const coinMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'coins/addCoins' || action.type === 'coins/setCoins') {
    const { auth, coins } = store.getState();
    if (auth.user?.uid) {
      updateCoinsInFirestore(auth.user.uid, coins.coins);
    }
  }
  return result;
};