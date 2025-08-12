import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => `/api/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `/api/orders/${orderId}/pay`,
        method: 'PUT',
        body: paymentResult,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        'MyOrders',
      ],
    }),
    getMyOrders: builder.query({
      query: () => '/api/orders/myorders',
      providesTags: ['MyOrders'],
    }),
    getOrders: builder.query({
      query: ({ pageNumber = '' }) => ({
        url: `/api/orders?pageNumber=${pageNumber}`,
      }),
      providesTags: ['Orders'],
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, orderId) => [
        { type: 'Order', id: orderId },
        'Orders',
      ],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    success: false,
    order: null,
    error: null,
    orders: [],
    myOrders: [],
    currentPage: 1,
    pages: 1,
  },
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.order = null;
      state.error = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addMatcher(
        orderApiSlice.endpoints.createOrder.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        orderApiSlice.endpoints.createOrder.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.order = action.payload;
        }
      )
      .addMatcher(
        orderApiSlice.endpoints.createOrder.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      // Get Order Details
      .addMatcher(
        orderApiSlice.endpoints.getOrderDetails.matchFulfilled,
        (state, action) => {
          state.order = action.payload;
        }
      )
      // Pay Order
      .addMatcher(
        orderApiSlice.endpoints.payOrder.matchFulfilled,
        (state, action) => {
          state.order = action.payload;
          state.success = true;
        }
      )
      // Get My Orders
      .addMatcher(
        orderApiSlice.endpoints.getMyOrders.matchFulfilled,
        (state, action) => {
          state.myOrders = action.payload;
        }
      )
      // Get All Orders (Admin)
      .addMatcher(
        orderApiSlice.endpoints.getOrders.matchFulfilled,
        (state, action) => {
          state.orders = action.payload.orders;
          state.pages = action.payload.pages;
          state.currentPage = action.payload.page;
        }
      );
  },
});

export const { resetOrder, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
