import axios, { type AxiosError } from 'axios'
import { refreshToken } from './authService'
import { API_CONFIG } from '../config'

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Show current API URL in console
console.log('🌐 API Base URL:', API_CONFIG.BASE_URL);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

let refreshTokenPromise: Promise<string> | null = null

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest) {
      if (!refreshTokenPromise) {
        // If there's no refresh in progress, start one.
        refreshTokenPromise = refreshToken().then(newTokens => {
          const { access_token, refresh_token } = newTokens
          localStorage.setItem('token', access_token)
          localStorage.setItem('refreshToken', refresh_token)
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          return access_token
        }).finally(() => {
          // Reset the promise after completion.
          refreshTokenPromise = null
        })
      }

      try {
        const newToken = await refreshTokenPromise
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api 