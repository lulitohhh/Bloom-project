import { configureStore } from '@reduxjs/toolkit';
import QuizGameReducer from './Activities/QuizGameSlice'
import coinReducer from './coinSlice';
import associationReducer from './Activities/associationSlice';
import storyReducer from './Activities/storySlice';
import activityProgressReducer from './ActivityProgressSlice';

export const store = configureStore({
  reducer: {
    association: associationReducer,
    story: storyReducer,
    quiz: QuizGameReducer,
    coins: coinReducer,
    activityProgress: activityProgressReducer,
  
  }
});