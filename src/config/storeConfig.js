import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../store/slices/apiSlice';
import authReducer from '../store/slices/authSlice';
import cartReducer from '../store/slices/cartSlice';
import notificationReducer from '../store/slices/notificationSlice';

export const createStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      cart: cartReducer,
      notification: notificationReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  // Habilita o refetchOnFocus/refetchOnReconnect
  setupListeners(store.dispatch);

  return store;
};

export const store = createStore();

export default store;
