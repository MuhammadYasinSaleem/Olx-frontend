/**
 * @fileoverview Authentication service functions for user registration, login, and profile management.
 * @module services/auth.service
 */

import type * as Types from '@types';

import { apiClient } from './api.config';

/**
 * Registers a new user account.
 *
 * @param {Types.UserRequest} payload - User registration data
 * @returns {Promise<Types.UserResponse>} Created user data
 */
export const registerUser = async (
  payload: Types.UserRequest,
): Promise<Types.UserResponse> => {
  const res = await apiClient.post<Types.UserResponse>(
    'user/register/',
    payload,
  );
  return res.data;
};

/**
 * Authenticates a user with username and password.
 *
 * @param {Object} payload - Login credentials
 * @param {string} payload.username - User's username
 * @param {string} payload.password - User's password
 * @returns {Promise<Types.UserResponse>} Authenticated user data
 */
export const loginUser = async (payload: {
  username: string;
  password: string;
}): Promise<Types.UserResponse> => {
  const res = await apiClient.post<Types.UserResponse>('user/login/', payload);
  return res.data;
};

/**
 * Logs out the current user by invalidating session.
 *
 * @returns {Promise<void>}
 */
export const logoutUser = async (): Promise<void> => {
  await apiClient.post('user/logout/');
};

/**
 * Fetches the current user's profile data.
 *
 * @returns {Promise<Types.UserResponse>} User profile data
 */
export const getUserProfile = async (): Promise<Types.UserResponse> => {
  const res = await apiClient.get<Types.UserResponse>('user/profile/');
  return res.data;
};

/**
 * Updates the user's profile with full replacement.
 *
 * @param {Types.UserProfileUpdateRequest} payload - Complete profile update data
 * @returns {Promise<Types.UserResponse>} Updated user data
 */
export const updateUserProfile = async (
  payload: Types.UserProfileUpdateRequest,
): Promise<Types.UserResponse> => {
  const res = await apiClient.put<Types.UserResponse>('user/profile/', payload);
  return res.data;
};

/**
 * Partially updates the user's profile.
 *
 * @param {Types.PatchedUserProfileUpdateRequest} payload - Partial profile update data
 * @returns {Promise<Types.UserResponse>} Updated user data
 */
export const patchUserProfile = async (
  payload: Types.PatchedUserProfileUpdateRequest,
): Promise<Types.UserResponse> => {
  const res = await apiClient.patch<Types.UserResponse>(
    'user/profile/',
    payload,
  );
  return res.data;
};
