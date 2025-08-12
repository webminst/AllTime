// Rotas públicas
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registrar',
  PRODUCT_LIST: '/produtos',
  PRODUCT_DETAIL: '/produto/:id',
  CART: '/carrinho',
  SEARCH: '/buscar/:keyword',
  CATEGORY: '/categoria/:category',
  PAGE: '/pagina/:pageNumber',
  SEARCH_WITH_PAGE: '/buscar/:keyword/pagina/:pageNumber',
};

// Rotas protegidas (requerem autenticação)
export const PRIVATE_ROUTES = {
  PROFILE: '/perfil',
  USER_ORDERS: '/meus-pedidos',
  SHIPPING: '/envio',
  PAYMENT: '/pagamento',
  PLACE_ORDER: '/finalizar-pedido',
  ORDER_DETAIL: '/pedido/:id',
};

// Rotas de administração (requerem privilégios de admin)
export const ADMIN_ROUTES = {
  // Produtos
  ADMIN_PRODUCT_LIST: '/admin/lista-produtos',
  ADMIN_PRODUCT_CREATE: '/admin/produto/novo',
  ADMIN_PRODUCT_EDIT: '/admin/produto/:id/editar',
  
  // Pedidos
  ADMIN_ORDER_LIST: '/admin/lista-pedidos',
  
  // Usuários
  ADMIN_USER_LIST: '/admin/lista-usuarios',
  ADMIN_USER_EDIT: '/admin/usuario/:id/editar',
};

// Funções auxiliares para gerar rotas com parâmetros
export const getRoute = {
  // Rotas públicas
  productDetail: (id) => `/produto/${id}`,
  search: (keyword) => `/buscar/${encodeURIComponent(keyword)}`,
  category: (category) => `/categoria/${encodeURIComponent(category)}`,
  pagination: (pageNumber) => `/pagina/${pageNumber}`,
  searchWithPage: (keyword, pageNumber) => 
    `/buscar/${encodeURIComponent(keyword)}/pagina/${pageNumber}`,
  
  // Rotas protegidas
  orderDetail: (id) => `/pedido/${id}`,
  
  // Rotas de administração
  adminProductEdit: (id) => `/admin/produto/${id}/editar`,
  adminUserEdit: (id) => `/admin/usuario/${id}/editar`,
};

// Exportar todas as rotas juntas para facilitar a importação
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PRIVATE_ROUTES,
  ...ADMIN_ROUTES,
  get: getRoute,
};

export default ROUTES;
