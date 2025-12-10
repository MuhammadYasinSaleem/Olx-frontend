import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT);

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response) {
        return Promise.reject({
          message: axiosError.response.data?.message || 'An error occurred',
          status: axiosError.response.status,
        });
      } else if (axiosError.request) {
        return Promise.reject({
          message: 'No response from server. Please check your connection.',
          status: 0,
        });
      }
    }

    return Promise.reject({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      status: 500,
    });
  },
);
