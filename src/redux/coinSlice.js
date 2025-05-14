// src/redux/coinSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from './storage';
import { syncCoinsFromFirestore } from '../services/firebase/coinsService';

const initialState = loadFromLocalStorage('coins', { coins: 0 });

const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    addCoins: (state, action) => {
      state.coins += action.payload;
      saveToLocalStorage('coins', state); // guardamos cada vez
    },
    resetCoins: (state) => {
      state.coins = 0;
      saveToLocalStorage('coins', state);
    },
  },
});

export const loadCoinsFromFirestore = (userId) => async (dispatch) => {
  const firestoreCoins = await syncCoinsFromFirestore(userId); // Usa el servicio que creamos antes
  dispatch(addCoins(firestoreCoins)); // O crea un nuevo reducer "setCoins" si prefieres
};




export const { addCoins, resetCoins } = coinSlice.actions;
export default coinSlice.reducer;
