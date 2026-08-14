import { api } from './api';

// Save progress for a lesson
export const saveProgress = async (data) => {
  return api.post('/progress', data);
};

// Get progress for a user
export const getUserProgress = async (userId) => {
  return api.get(`/progress/${userId}`);
};

// Get user progress summary
export const getUserSummary = async (userId) => {
  return api.get(`/progress/${userId}/summary`);
};

export default { saveProgress, getUserProgress, getUserSummary };