import { addCoins } from '../coinSlice';
import { markQuizCompleted } from '../activityProgressSlice';

export const rewardQuizIfNeeded = (quizId) => (dispatch, getState) => {
  const state = getState();
  const alreadyCompleted = state.activityProgress.quizCompleted.includes(quizId);
  if (!alreadyCompleted) {
    dispatch(addCoins(2));
    dispatch(markQuizCompleted(quizId));
  }
};