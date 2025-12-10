import * as Types from '../types';
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
