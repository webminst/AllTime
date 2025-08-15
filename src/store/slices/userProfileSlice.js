import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const userProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/api/users/profile',
      providesTags: ['UserProfile'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['UserProfile'],
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/api/users/password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    getAddresses: builder.query({
      query: () => '/api/users/addresses',
      providesTags: ['Addresses'],
    }),
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: '/api/users/addresses',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ['Addresses'],
    }),
    updateAddress: builder.mutation({
      query: ({ id, ...addressData }) => ({
        url: `/api/users/addresses/${id}`,
        method: 'PUT',
        body: addressData,
      }),
      invalidatesTags: ['Addresses'],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/api/users/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Addresses'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = userProfileApiSlice;

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    loading: false,
    error: null,
    user: null,
    addresses: [],
    defaultAddress: null,
  },
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    setDefaultAddress: (state, action) => {
      state.defaultAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userProfileApiSlice.endpoints.getProfile.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        userProfileApiSlice.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        userProfileApiSlice.endpoints.getProfile.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { clearProfileError, setDefaultAddress } = userProfileSlice.actions;
export default userProfileSlice.reducer;
