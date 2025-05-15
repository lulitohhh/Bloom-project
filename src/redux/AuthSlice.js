import { createSlice } from '@reduxjs/toolkit';
import { getCoinsFromFirestore } from '../services/firebase/coinsService';
import { createAsyncThunk } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, 
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; 
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCoins.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserCoins.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { ...state.user, coins: action.payload };
    });
  }
});

// Thunk para cargar monedas
export const fetchUserCoins = createAsyncThunk(
  'auth/fetchUserCoins',
  async (userId) => {
    return await getCoinsFromFirestore(userId);
  }
);

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;