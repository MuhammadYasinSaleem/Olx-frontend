import type * as Types from '@customtypes/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  loginUser as loginUserService,
  registerUser as registerUserService,
} from '@services/auth.service';

export const registerUser = createAsyncThunk<
  Types.UserResponse,
  Types.UserRequest,
  { rejectValue: { message: string; status?: number } }
>('user/register', async (payload, { rejectWithValue }) => {
  try {
    const user = await registerUserService(payload);
    return user;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Registration failed',
      status: error?.status,
    });
  }
});

export const loginUser = createAsyncThunk<
  Types.UserResponse,
  { username: string; password: string },
  { rejectValue: { message: string; status?: number } }
>('user/login', async (payload, { rejectWithValue }) => {
  try {
    const user = await loginUserService(payload);
    return user;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Login failed',
      status: error?.status,
    });
  }
});

type UserState = {
  user: Types.UserResponse | null;
  loading: boolean;
  error: { message: string; status?: number } | null;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Unknown error' };
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Unknown error' };
      });
  },
});

export const { clearUser, clearError } = userSlice.actions;
export default userSlice.reducer;
