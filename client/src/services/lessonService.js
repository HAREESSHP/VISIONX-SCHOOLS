import { api } from './api';

// Get a single lesson by ID
export const getLesson = async (id) => {
  return api.get(`/lessons/${id}`);
};

// Get all lessons (with optional filters)
export const getLessons = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.className) query.set('className', params.className);
  if (params.area) query.set('area', params.area);
  const qs = query.toString();
  return api.get(`/lessons${qs ? `?${qs}` : ''}`);
};

export default { getLesson, getLessons };