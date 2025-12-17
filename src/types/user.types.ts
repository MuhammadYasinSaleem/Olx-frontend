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
