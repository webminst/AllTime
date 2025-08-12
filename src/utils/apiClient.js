import axios from 'axios';

// Cria uma instância do axios com configurações padrão
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona um interceptor para requisições
apiClient.interceptors.request.use(
  (config) => {
    // Adiciona o token de autenticação se estiver disponível
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para respostas
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erros de autenticação
    if (error.response && error.response.status === 401) {
      // Redireciona para a página de login se não autenticado
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
