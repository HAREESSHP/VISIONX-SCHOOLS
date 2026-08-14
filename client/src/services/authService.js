import { api } from './api';

// Login a student/user
export const login = async (loginId, password) => {
  return api.post('/auth/login', { loginId, password });
};

// Login an admin
export const adminLogin = async (loginId, password) => {
  return api.post('/auth/admin-login', { loginId, password });
};

// Get current user
export const getMe = async () => {
  return api.get('/auth/me');
};

// Update user's class selection
export const updateUserClass = async (className, group) => {
  return api.patch('/auth/me/class', { className, group });
};

export default { login, adminLogin, getMe, updateUserClass };