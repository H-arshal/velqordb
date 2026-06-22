import axios from 'axios'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types'
import { API_BASE } from '@/utils/constants'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('velqordb_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>('/user/login', data)
    return res.data
  },

  async register(data: RegisterRequest): Promise<void> {
    await api.post('/user/register', data)
  },

  async logout(): Promise<void> {
    await api.post('/user/logout')
    localStorage.removeItem('velqordb_token')
    localStorage.removeItem('velqordb_user')
  },
}

export default api
