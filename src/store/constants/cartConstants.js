// Tipos de ação para o carrinho
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS';
export const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD';
export const CART_CLEAR_ITEMS = 'CART_CLEAR_ITEMS';

// Constantes para métodos de pagamento
export const PAYMENT_METHODS = {
  PAYPAL: 'PayPal',
  CREDIT_CARD: 'Cartão de Crédito',
  BOLETO: 'Boleto',
  PIX: 'PIX',
};

// Constantes para status do carrinho
export const CART_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

// Mensagens de erro
export const CART_ERROR_MESSAGES = {
  ITEM_NOT_FOUND: 'Item não encontrado no carrinho',
  INVALID_QUANTITY: 'Quantidade inválida',
  OUT_OF_STOCK: 'Produto fora de estoque',
};

// Exportando todas as constantes
const cartConstants = {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  PAYMENT_METHODS,
  CART_STATUS,
  ...CART_ERROR_MESSAGES
};

export default cartConstants;
