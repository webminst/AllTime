import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM, 
  CART_SAVE_SHIPPING_ADDRESS, 
  CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

// Função para carregar o carrinho do localStorage
const carrinhoItensDoLocalStorage = localStorage.getItem('carrinhoItens')
  ? JSON.parse(localStorage.getItem('carrinhoItens'))
  : [];

// Função para carregar o endereço de entrega do localStorage
const enderecoEntregaDoLocalStorage = localStorage.getItem('enderecoEntrega')
  ? JSON.parse(localStorage.getItem('enderecoEntrega'))
  : {};

// Função para carregar o método de pagamento do localStorage
const metodoPagamentoDoLocalStorage = localStorage.getItem('metodoPagamento')
  ? localStorage.getItem('metodoPagamento')
  : '';

const initialState = {
  carrinhoItens: carrinhoItensDoLocalStorage,
  enderecoEntrega: enderecoEntregaDoLocalStorage,
  metodoPagamento: metodoPagamentoDoLocalStorage,
};

const cartSlice = createSlice({
  name: 'cart',
  // Usando as constantes como action types
  extraReducers: (builder) => {
    builder
      .addCase(CART_ADD_ITEM, (state, action) => {
        const item = action.payload;
        const itemExistente = state.carrinhoItens.find((x) => x.produto === item.produto);

        if (itemExistente) {
          state.carrinhoItens = state.carrinhoItens.map((x) =>
            x.produto === itemExistente.produto ? item : x
          );
          toast.info('Quantidade atualizada no carrinho');
        } else {
          state.carrinhoItens = [...state.carrinhoItens, item];
          toast.success('Produto adicionado ao carrinho');
        }
        localStorage.setItem('carrinhoItens', JSON.stringify(state.carrinhoItens));
      })
      .addCase(CART_REMOVE_ITEM, (state, action) => {
        state.carrinhoItens = state.carrinhoItens.filter((x) => x.produto !== action.payload);
        localStorage.setItem('carrinhoItens', JSON.stringify(state.carrinhoItens));
        toast.error('Produto removido do carrinho');
      })
      .addCase(CART_SAVE_SHIPPING_ADDRESS, (state, action) => {
        state.enderecoEntrega = action.payload;
        localStorage.setItem('enderecoEntrega', JSON.stringify(state.enderecoEntrega));
      })
      .addCase(CART_SAVE_PAYMENT_METHOD, (state, action) => {
        state.metodoPagamento = action.payload;
        localStorage.setItem('metodoPagamento', state.metodoPagamento);
      });
  },
  initialState,
  reducers: {
    // Reducer para limpar o carrinho (mantido como reducer síncrono)
    limparCarrinho: (state) => {
      state.carrinhoItens = [];
      localStorage.removeItem('carrinhoItens');
    },
  },
});

export const {
  adicionarAoCarrinho,
  removerDoCarrinho,
  salvarEnderecoEntrega,
  salvarMetodoPagamento,
  limparCarrinho,
} = cartSlice.actions;

// Selectors
export const selectCarrinhoItens = (state) => state.carrinho.carrinhoItens;
export const selectEnderecoEntrega = (state) => state.carrinho.enderecoEntrega;
export const selectMetodoPagamento = (state) => state.carrinho.metodoPagamento;

export const selectItensNoCarrinho = (state) =>
  state.carrinho.carrinhoItens.reduce((acc, item) => acc + item.quantidade, 0);

export const selectPrecoTotal = (state) =>
  state.carrinho.carrinhoItens
    .reduce((acc, item) => acc + item.quantidade * item.preco, 0)
    .toFixed(2);

export default cartSlice.reducer;
