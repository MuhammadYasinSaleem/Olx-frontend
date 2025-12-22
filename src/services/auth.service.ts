import type * as Types from '@types';

import { apiClient } from './api.config';

export const registerUser = async (
  payload: Types.UserRequest,
): Promise<Types.UserResponse> => {
  const res = await apiClient.post<Types.UserResponse>(
    'user/register/',
    payload,
  );
  return res.data;
};

export const loginUser = async (payload: {
  username: string;
  password: string;
}): Promise<Types.UserResponse> => {
  const res = await apiClient.post<Types.UserResponse>('user/login/', payload);
  return res.data;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post('user/logout/');
};

export const getUserProfile = async (): Promise<Types.UserResponse> => {
  const res = await apiClient.get<Types.UserResponse>('user/profile/');
  return res.data;
};

export const updateUserProfile = async (
  payload: Types.UserProfileUpdateRequest,
): Promise<Types.UserResponse> => {
  const res = await apiClient.put<Types.UserResponse>('user/profile/', payload);
  return res.data;
};

export const patchUserProfile = async (
  payload: Types.PatchedUserProfileUpdateRequest,
): Promise<Types.UserResponse> => {
  const res = await apiClient.patch<Types.UserResponse>(
    'user/profile/',
    payload,
  );
  return res.data;
};
