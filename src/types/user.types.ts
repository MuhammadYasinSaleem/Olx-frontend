/**
 * @fileoverview Types for user requests, responses, and profile update shapes.
 * @module types/user.types
 */

export type UserRequest = {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_no?: string;
  address?: string;
  password: string;
};

export type UserResponse = {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  phone_no?: string;
  address?: string;
};

export type UserProfileUpdateRequest = {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_no?: string;
  address?: string;
};

export type PatchedUserProfileUpdateRequest = Partial<UserProfileUpdateRequest>;
