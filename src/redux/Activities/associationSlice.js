
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPairs: [],
  selected: [],
  resolved: [],
};

const associationSlice = createSlice({
  name: 'association',
  initialState,
  reducers: {
    setPairs: (state, action) => {
      state.currentPairs = action.payload;
      state.selected = [];
      state.resolved = [];
    },
    selectCard: (state, action) => {
      if (!state.selected.includes(action.payload)) {
        state.selected.push(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selected = [];
    },
    markResolved: (state, action) => {
      state.resolved.push(...action.payload);
    },
    resetAssociation: (state) => {
      state.currentPairs = [];
      state.selected = [];
      state.resolved = [];
    },
  },
});

export const {
  setPairs,
  selectCard,
  clearSelection,
  markResolved,
  resetAssociation,
} = associationSlice.actions;

export default associationSlice.reducer;
