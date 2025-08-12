import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from '../store/slices/apiSlice';
import cartReducer from '../store/slices/cartSlice';
import authReducer from '../store/slices/authSlice';
import notificationReducer from '../store/slices/notificationSlice';

// Configuração de persistência para o carrinho
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems', 'shippingAddress', 'paymentMethod'],
};

// Configuração de persistência para autenticação
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userInfo'],
};

// Configuração da store do Redux
export const createStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: persistReducer(cartPersistConfig, cartReducer),
      auth: persistReducer(authPersistConfig, authReducer),
      notification: notificationReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

export const store = createStore();
export const persistor = persistStore(store);

const reduxConfig = {
  store,
  persistor,
};

export default reduxConfig;
