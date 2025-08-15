import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = '', pageNumber = '', category = '', brand = '' }) => ({
        url: '/api/products',
        params: { keyword, pageNumber, category, brand },
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    createProductReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `/api/products/${productId}/reviews`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
      ],
    }),
    getTopProducts: builder.query({
      query: () => '/api/products/top',
      keepUnusedDataFor: 5,
    }),
    // Admin endpoints
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/api/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/products/${product._id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (result, error, { _id }) => [
        'Products',
        { type: 'Product', id: _id },
      ],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: '/api/upload',
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductReviewMutation,
  useGetTopProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productApiSlice;

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    error: null,
    products: [],
    product: null,
    topProducts: [],
    categories: [],
    brands: [],
    page: 1,
    pages: 1,
  },
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addMatcher(
        productApiSlice.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.products = action.payload.products;
          state.page = action.payload.page;
          state.pages = action.payload.pages;
          state.categories = action.payload.categories;
          state.brands = action.payload.brands;
        }
      )
      // Get Product Details
      .addMatcher(
        productApiSlice.endpoints.getProductDetails.matchFulfilled,
        (state, action) => {
          state.product = action.payload;
        }
      )
      // Get Top Products
      .addMatcher(
        productApiSlice.endpoints.getTopProducts.matchFulfilled,
        (state, action) => {
          state.topProducts = action.payload;
        }
      )
      // Handle loading and error states
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'An error occurred';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearProductError, resetProductState } = productSlice.actions;
export default productSlice.reducer;
