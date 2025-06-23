export interface RegisterRequest {
  email: string
  password: string
  full_name: string
}

export interface RegisterResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
} 