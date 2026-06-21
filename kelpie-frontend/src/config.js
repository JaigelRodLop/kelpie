const API_URL = import.meta.env.VITE_API_URL; 

const ENDPOINTS = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
  },

  admin: {
    users: `${API_URL}/users`,              // listar todos los usuarios
    tickets: `${API_URL}/tickets`,          // ver todos los tickets
    asignar: `${API_URL}/tickets/asignar`,  // asignar tickets a técnicos
  },

  tecnico: {
    tickets: `${API_URL}/tickets/asignados`, // tickets asignados al técnico
    update: (id) => `${API_URL}/tickets/${id}`, // actualizar estado de ticket
    comments: (id) => `${API_URL}/tickets/${id}/comments`, // añadir comentarios
  },

  cliente: {
    tickets: `${API_URL}/tickets/mios`,     // tickets propios del cliente
    create: `${API_URL}/tickets`,           // crear nuevo ticket
    comments: (id) => `${API_URL}/tickets/${id}/comments`, // añadir info extra
  },
};

export default ENDPOINTS;
