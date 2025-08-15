import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import apiClient from '../../utils/apiClient';

// Async thunks para autenticação
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, senha }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/auth/login', { email, senha });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Erro ao fazer login'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ nome, email, senha }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/auth/registrar', {
        nome,
        email,
        senha,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Erro ao registrar'
      );
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await apiClient.get('/auth/usuario', config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Erro ao obter detalhes do usuário'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      toast.success('Você saiu da sua conta');
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      toast.success('Login realizado com sucesso!');
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      toast.success('Registro realizado com sucesso!');
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // Get User Details
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = { ...state.userInfo, ...action.payload };
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
