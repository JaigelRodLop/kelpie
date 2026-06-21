const API_URL = import.meta.env.VITE_API_URL; 

export const ENDPOINTS = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
  },

  admin: {
    users: `${API_URL}/admin/users`,       
    tickets: `${API_URL}/admin/tickets`,   
    asignar: `${API_URL}/admin/tickets/asignar`, 
  },

  tecnico: {
    tickets: `${API_URL}/tecnico/tickets`, 
    update: (id) => `${API_URL}/tecnico/tickets/${id}`, 
    comments: (id) => `${API_URL}/tecnico/tickets/${id}/comments`, 
  },

  cliente: {
    tickets: `${API_URL}/cliente/tickets`, 
    create: `${API_URL}/cliente/tickets`,  
    comments: (id) => `${API_URL}/cliente/tickets/${id}/comments`,
  },
};
