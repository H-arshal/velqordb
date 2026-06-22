import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User, UserRole } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const stored = localStorage.getItem('velqordb_user')
const initialState: AuthState = {
  user: stored ? JSON.parse(stored) : null,
  isAuthenticated: !!localStorage.getItem('velqordb_token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('velqordb_token', action.payload.token)
      localStorage.setItem('velqordb_user', JSON.stringify(action.payload))
    },
    clearUser(state) {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('velqordb_token')
      localStorage.removeItem('velqordb_user')
    },
    setRole(state, action: PayloadAction<UserRole>) {
      if (state.user) {
        state.user.role = action.payload
        localStorage.setItem('velqordb_user', JSON.stringify(state.user))
      }
    },
  },
})

export const { setUser, clearUser, setRole } = authSlice.actions
export default authSlice.reducer
