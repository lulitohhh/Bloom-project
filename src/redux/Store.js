import { configureStore } from '@reduxjs/toolkit';
import QuizGameReducer from './Activities/QuizGameSlice'
import coinReducer from './coinSlice';
import associationReducer from './Activities/associationSlice';
import storyReducer from './Activities/storySlice';
import activityProgressReducer from './ActivityProgressSlice';
import sessionCoinsReducer from './sessionCoinsSlice';
import { coinMiddleware } from './coinMiddleware';
import authReducer from './AuthSlice'

export const store = configureStore({
  reducer: {
    association: associationReducer,
    story: storyReducer,
    quiz: QuizGameReducer,
    coins: coinReducer,
    activityProgress: activityProgressReducer,
    sessionCoins: sessionCoinsReducer,
    auth: authReducer,
  
  },
   middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(coinMiddleware), // Añade tu middleware
});