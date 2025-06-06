
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
      saveToLocalStorage('coins', state);
    },
    subtractCoins: (state, action) => {  
      state.coins -= action.payload;
      saveToLocalStorage('coins', state);
    },
    resetCoins: (state) => {
      state.coins = 0;
      saveToLocalStorage('coins', state);
    },
    setCoins: (state, action) => {
      state.coins = action.payload; 
      saveToLocalStorage('coins', state);
    },
    
  },
});

export const loadCoinsFromFirestore = (userId) => async (dispatch) => {
  const firestoreCoins = await syncCoinsFromFirestore(userId);
  dispatch(setCoins(firestoreCoins)); 
};



export const { addCoins, resetCoins, setCoins, subtractCoins } = coinSlice.actions;
export default coinSlice.reducer;
