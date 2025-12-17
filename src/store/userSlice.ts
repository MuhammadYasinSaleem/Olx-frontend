import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import {
  getUserProfile as getUserProfileService,
  loginUser as loginUserService,
  logoutUser as logoutUserService,
  registerUser as registerUserService,
} from '@services';

import { clearCart } from './cartSlice';

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

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string; status?: number } }
>('user/logout', async (_, { rejectWithValue, dispatch }) => {
  try {
    await logoutUserService();
    dispatch(clearCart());
    return undefined;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Logout failed',
      status: error?.status,
    });
  }
});

export const fetchUserProfile = createAsyncThunk<
  Types.UserResponse,
  void,
  { rejectValue: { message: string; status?: number } }
>('user/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const user = await getUserProfileService();

    return user;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to fetch profile',
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

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Unknown error' };
      });

    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Unknown error' };
      })
      .addCase(clearCart, () => {});
  },
});

export const { clearUser, clearError } = userSlice.actions;
export default userSlice.reducer;
