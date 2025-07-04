export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    full_name: string;
    is_verified: boolean;
  };
  tokens?: AuthTokens;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  is_verified: boolean;
}

// ✅ Новые типы для email верификации
export interface EmailVerificationRequest {
  token: string;
}

export interface EmailVerificationResponse {
  message: string;
  is_verified: boolean;
  tokens: AuthTokens;
  user?: User;
} 