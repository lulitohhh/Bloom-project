// src/redux/activityProgressSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from './storage';

const initialState = loadFromLocalStorage('activityProgress', {
  quizCompleted: [],
  associationsCompleted: [],
  storiesCompleted: [],
});

const activityProgressSlice = createSlice({
  name: 'activityProgress',
  initialState,
  reducers: {
    markQuizCompleted: (state, action) => {
      if (!state.quizCompleted.includes(action.payload)) {
        state.quizCompleted.push(action.payload);
        saveToLocalStorage('activityProgress', state);
      }
    },
    markAssociationCompleted: (state, action) => {
      if (!state.associationsCompleted.includes(action.payload)) {
        state.associationsCompleted.push(action.payload);
        saveToLocalStorage('activityProgress', state);
      }
    },
    markStoryCompleted: (state, action) => {
      if (!state.storiesCompleted.includes(action.payload)) {
        state.storiesCompleted.push(action.payload);
        saveToLocalStorage('activityProgress', state);
      }
    },
    resetProgress: (state) => {
      state.quizCompleted = [];
      state.associationsCompleted = [];
      state.storiesCompleted = [];
      saveToLocalStorage('activityProgress', state);
    }
  }
});

export const {
  markQuizCompleted,
  markAssociationCompleted,
  markStoryCompleted,
  resetProgress
} = activityProgressSlice.actions;

export default activityProgressSlice.reducer;
