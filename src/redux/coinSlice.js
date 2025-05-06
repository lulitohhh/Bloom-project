// src/redux/coinSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from './storage';

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

export const { addCoins, resetCoins } = coinSlice.actions;
export default coinSlice.reducer;
