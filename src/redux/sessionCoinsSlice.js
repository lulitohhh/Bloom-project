// redux/sessionCoinsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const sessionCoinsSlice = createSlice({
  name: 'sessionCoins',
  initialState: {
    sessionTotal: 0
  },
  reducers: {
    addSessionCoins: (state, action) => {
      state.sessionTotal += action.payload;
    },
    resetSessionCoins: (state) => {
      state.sessionTotal = 0;
    }
  }
});

export const { addSessionCoins, resetSessionCoins } = sessionCoinsSlice.actions;
export default sessionCoinsSlice.reducer;
