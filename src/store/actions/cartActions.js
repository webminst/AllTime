import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// Action para adicionar item ao carrinho
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    // Aqui você faria uma chamada à API para buscar os detalhes do produto
    // const { data } = await api.get(`/api/products/${id}`);
    
    // Dados simulados - substitua pela chamada à API real
    const data = {
      _id: id,
      name: `Produto ${id}`,
      image: '/images/sample.jpg',
      price: 99.99,
      countInStock: 10,
    };

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        produto: data._id,
        nome: data.name,
        imagem: data.image,
        preco: data.price,
        quantidade: Number(qty),
        emEstoque: data.countInStock,
      },
    });

    // Salva o carrinho no localStorage
    localStorage.setItem(
      'carrinhoItens',
      JSON.stringify(getState().cart.carrinhoItens)
    );
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    // Aqui você pode despachar uma ação de erro se necessário
  }
};

// Action para remover item do carrinho
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // Atualiza o localStorage
  localStorage.setItem(
    'carrinhoItens',
    JSON.stringify(getState().cart.carrinhoItens)
  );
};

// Action para salvar endereço de entrega
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // Salva o endereço no localStorage
  localStorage.setItem('enderecoEntrega', JSON.stringify(data));
};

// Action para salvar método de pagamento
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  // Salva o método de pagamento no localStorage
  localStorage.setItem('metodoPagamento', data);
};

// Action para limpar o carrinho após a compra ser concluída
export const clearCart = () => (dispatch) => {
  // Limpa o carrinho no localStorage
  localStorage.removeItem('carrinhoItens');
  // Se necessário, você pode limpar outros itens do localStorage também
  // localStorage.removeItem('enderecoEntrega');
  // localStorage.removeItem('metodoPagamento');
  
  // Despacha a ação para limpar o carrinho no estado
  dispatch({ type: 'carrinho/limparCarrinho' });
};
