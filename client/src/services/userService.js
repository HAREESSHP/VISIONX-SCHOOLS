import { api } from './api';

// Get all users (admin)
export const getUsers = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.search) query.set('search', params.search);
  const qs = query.toString();
  return api.get(`/users${qs ? `?${qs}` : ''}`);
};

// Create a new user (admin)
export const createUser = async (userData) => {
  return api.post('/users', userData);
};

// Update a user (admin)
export const updateUser = async (id, userData) => {
  return api.patch(`/users/${id}`, userData);
};

// Delete a user (admin)
export const deleteUser = async (id) => {
  return api.delete(`/users/${id}`);
};

// Toggle user active status (admin)
export const toggleUserStatus = async (id) => {
  return api.patch(`/users/${id}/toggle`);
};

// Reset user password (admin)
export const resetPassword = async (id, newPassword) => {
  return api.post(`/users/${id}/reset-password`, { newPassword });
};

export default { getUsers, createUser, updateUser, deleteUser, toggleUserStatus, resetPassword };