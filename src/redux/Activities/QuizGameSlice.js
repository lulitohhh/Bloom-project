import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selection: null,
  correct: false,
};

const QuizGameSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectAnswer(state, action) {
      if (state.correct) return;

      state.selection = action.payload.answer;
      state.correct = action.payload.answer === action.payload.correctAnswer;
    },
    resetQuiz(state) {
      state.selection = null;
      state.correct = false;
    },
  },
});

export const { selectAnswer, resetQuiz } = QuizGameSlice.actions;
export default QuizGameSlice.reducer;
