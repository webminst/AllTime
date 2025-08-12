// Configurações base da API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Endpoints da API
export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/users/profile',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Produtos
  PRODUCTS: {
    BASE: '/products',
    TOP: '/products/top',
    REVIEWS: (productId) => `/products/${productId}/reviews`,
  },
  
  // Usuários
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
  
  // Pedidos
  ORDERS: {
    BASE: '/orders',
    MY_ORDERS: '/orders/myorders',
    PAY: (id) => `/orders/${id}/pay`,
    DELIVER: (id) => `/orders/${id}/deliver`,
  },
  
  // Upload
  UPLOAD: '/upload',
};

// Configurações de cabeçalhos padrão
export const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// Configurações para upload de arquivos
export const getFileUploadHeaders = (token) => ({
  'Content-Type': 'multipart/form-data',
  ...(token && { Authorization: `Bearer ${token}` }),
});

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  getHeaders,
  getFileUploadHeaders,
};
