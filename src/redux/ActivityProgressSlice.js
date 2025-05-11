import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizCompleted: [],
  associationsCompleted: [],
  storiesCompleted: [],
};

const activityProgressSlice = createSlice({
  name: 'activityProgress',
  initialState,
  reducers: {
    resetProgress: (state) => {
      state.quizCompleted = [];
      state.associationsCompleted = [];
      state.storiesCompleted = [];
    }
  }
});

export const { resetProgress } = activityProgressSlice.actions;
export default activityProgressSlice.reducer;

