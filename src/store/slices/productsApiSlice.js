import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = '', pageNumber = 1 }) => ({
        url: '/produtos',
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/produtos/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: '/produtos/destaque',
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: '/produtos',
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/produtos/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetTopProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
