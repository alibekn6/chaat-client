import api from './api'
import type {
    LoginCredentials,
    RegisterData,
    AuthTokens,
    AuthResponse,
    EmailVerificationResponse,
} from '../types/auth'

export const register = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const login = async (data: LoginCredentials): Promise<AuthTokens> => {
  const response = await api.post('/auth/login', data)
  return response.data
} 

export const refreshToken = async (): Promise<AuthTokens> => {
  const currentRefreshToken = localStorage.getItem('refreshToken');
  const response = await api.post('/auth/refresh', {
    refresh_token: currentRefreshToken,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// ✅ Новый метод для верификации email
export const verifyEmail = async (token: string): Promise<EmailVerificationResponse> => {
  try {
    const requestData = { token };
    console.log('📤 Sending verification request:', requestData);
    console.log('📤 Token in request:', token);
    
    const response = await api.post('/auth/verify-email', requestData);
    console.log('✅ Verification response:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('❌ Verification request failed:', error);
    
    // Улучшенная обработка ошибок
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { detail?: string }; status?: number }; code?: string };
      
      console.error('❌ Error response data:', axiosError.response?.data);
      console.error('❌ Error status:', axiosError.response?.status);
      
      if (axiosError.response?.data?.detail) {
        throw new Error(axiosError.response.data.detail);
      } else if (axiosError.response?.status === 400) {
        throw new Error('Invalid or expired verification token');
      } else if (axiosError.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your connection');
      }
    }
    throw new Error('An error occurred during email verification');
  }
}; 

export const googleAuth = async (code: string) => {
  try {
    const response = await api.post('/auth/google', { code });
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { detail?: string }; status?: number }; code?: string };
      if (axiosError.response?.data?.detail) {
        const detail = axiosError.response.data.detail;
        throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail));
      } else if (axiosError.response?.status === 400) {
        throw new Error('Invalid or expired Google code');
      } else if (axiosError.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your connection');
      }
    }
    throw new Error('An error occurred during Google authentication');
  }
}; 