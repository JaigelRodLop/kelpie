export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const ENDPOINTS = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
  },
  users: {
    list: `${API_URL}/users`,
  },
  tickets: {
    list: `${API_URL}/tickets`,
    create: `${API_URL}/tickets`,
  },
  comments: {
    list: `${API_URL}/comments`,
    create: `${API_URL}/comments`,
  },
};
