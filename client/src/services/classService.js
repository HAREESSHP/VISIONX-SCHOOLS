import { api } from './api';

// Get all classes
export const getClasses = async () => {
  return api.get('/classes');
};

// Get lessons for a class
export const getClassLessons = async (classId) => {
  return api.get(`/classes/${classId}/lessons`);
};

export default { getClasses, getClassLessons };