const API_URL = import.meta.env.VITE_API_URL;

const ENDPOINTS = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
  },

  tickets: {
    list: `${API_URL}/tickets`,                 // listar todos los tickets
    create: `${API_URL}/tickets`,               // crear nuevo ticket
    byId: (id) => `${API_URL}/tickets/${id}`,   // obtener/actualizar ticket por ID
    assign: `${API_URL}/tickets/asignar`,       // asignar tickets a técnicos (admin)
    mine: `${API_URL}/tickets/mios`,            // tickets propios del cliente (cuando lo implementes)
    assigned: `${API_URL}/tickets/asignados`,   // tickets asignados al técnico (cuando lo implementes)
  },

  comments: {
    list: (ticketId) => `${API_URL}/tickets/${ticketId}/comments`,   // obtener comentarios
    create: (ticketId) => `${API_URL}/tickets/${ticketId}/comments`, // crear comentario
  },

  users: {
    list: `${API_URL}/users`, // listar todos los usuarios (admin)
  },
};

export default ENDPOINTS;
