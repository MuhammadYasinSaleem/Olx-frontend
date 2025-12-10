export type UserRequest = {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_no?: string;
  address?: string | number;
  password: string;
};

export type UserResponse = {
  id: string;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_no?: string;
  address?: string | number;
};
