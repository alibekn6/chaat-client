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
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('password', data.password)
  params.append('grant_type', 'password')

  const response = await api.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
} 