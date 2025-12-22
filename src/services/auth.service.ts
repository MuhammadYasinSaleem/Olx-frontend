import type * as Types from '@types';

import { apiClient } from './api.config';

export async function registerUser(
  payload: Types.UserRequest,
): Promise<Types.UserResponse> {
  const res = await apiClient.post<Types.UserResponse>(
    'user/register/',
    payload,
  );
  return res.data;
}

export async function loginUser(payload: {
  username: string;
  password: string;
}): Promise<Types.UserResponse> {
  const res = await apiClient.post<Types.UserResponse>('user/login/', payload);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await apiClient.post('user/logout/');
}

export async function getUserProfile(): Promise<Types.UserResponse> {
  const res = await apiClient.get<Types.UserResponse>('user/profile/');
  return res.data;
}

export async function updateUserProfile(
  payload: Types.UserProfileUpdateRequest,
): Promise<Types.UserResponse> {
  const res = await apiClient.put<Types.UserResponse>('user/profile/', payload);
  return res.data;
}

export async function patchUserProfile(
  payload: Types.PatchedUserProfileUpdateRequest,
): Promise<Types.UserResponse> {
  const res = await apiClient.patch<Types.UserResponse>(
    'user/profile/',
    payload,
  );
  return res.data;
}
