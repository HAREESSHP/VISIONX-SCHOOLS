export const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` 
  : '/api';

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Central fetch wrapper with auth and error handling
export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || 'Something went wrong');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem('token');
    }
    throw error;
  }
}

// Convenience methods
export const api = {
  get: (endpoint) => apiFetch(endpoint),
  post: (endpoint, body) =>
    apiFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    }),
  patch: (endpoint, body) =>
    apiFetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }),
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' })
};

export default api;