import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
import userProfileReducer from './slices/userProfileSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import notificationReducer from './slices/notificationSlice';

// Configuration for persisting the cart
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems', 'shippingAddress', 'paymentMethod'],
};

// Configuration for persisting auth state
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userInfo'],
};

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: persistReducer(cartPersistConfig, cartSliceReducer),
  auth: persistReducer(authPersistConfig, authSliceReducer),
  userProfile: userProfileReducer,
  order: orderReducer,
  product: productReducer,
  notification: notificationReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {
        ignoredPaths: ['api'],
      },
    }).concat(
      apiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create the persistor
const persistor = persistStore(store);

// Export both store and persistor
export { store, persistor };

// Export the RootState and AppDispatch types
export const selectCart = (state) => state.cart;
export const selectAuth = (state) => state.auth;
export const selectUserProfile = (state) => state.userProfile;
export const selectOrder = (state) => state.order;
export const selectProduct = (state) => state.product;

export default store;
