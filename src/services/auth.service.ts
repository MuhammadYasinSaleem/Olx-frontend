import type * as Types from '@customtypes/index';

import { apiClient } from '@services/api.config';

export async function registerUser(
  payload: Types.UserRequest,
): Promise<Types.UserResponse> {
  const res = await apiClient.post<Types.UserResponse>(
    'user/register/',
    payload,
  );
  return res.data;
}
