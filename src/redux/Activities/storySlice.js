// src/redux/Activities/storySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storyId: null,
  currentPage: 0,
  correctAnswers: 0,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    startStory: (state, action) => {
      state.storyId = action.payload;
      state.currentPage = 0;
      state.correctAnswers = 0;
    },
    nextPage: (state, action) => {
      const maxPageIndex = action.payload;
      if (state.currentPage < maxPageIndex) {
        state.currentPage += 1;
      }
    },
    registerCorrect: (state) => {
      state.correctAnswers += 1;
    },
    resetStory: (state) => {
      state.storyId = null;
      state.currentPage = 0;
      state.correctAnswers = 0;
    },
  },
});


export const {
  startStory,
  nextPage,
  registerCorrect,
  resetStory,
} = storySlice.actions;

export default storySlice.reducer;
