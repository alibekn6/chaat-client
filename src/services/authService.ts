import api from './api'
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../types/auth'

export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const refreshToken = async (): Promise<LoginResponse> => {
  const currentRefreshToken = localStorage.getItem('refreshToken');
  const response = await api.post('/auth/refresh', {
    refresh_token: currentRefreshToken,
  });
  return response.data;
}; 