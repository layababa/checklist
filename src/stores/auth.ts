import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AuthState {
  token: string | null
  userRole: number | null
  username: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const userRole = ref<number | null>(
    localStorage.getItem('userRole') ? parseInt(localStorage.getItem('userRole')!) : null
  )
  const username = ref<string | null>(localStorage.getItem('username'))

  const isLoggedIn = computed(() => !!token.value && userRole.value !== null)

  const setAuth = (newToken: string, role: number, newUsername: string) => {
    token.value = newToken
    userRole.value = role
    username.value = newUsername
    localStorage.setItem('token', newToken)
    localStorage.setItem('userRole', String(role))
    localStorage.setItem('username', newUsername)
  }

  const logout = () => {
    token.value = null
    userRole.value = null
    username.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('username')
  }

  return {
    token,
    userRole,
    username,
    isLoggedIn,
    setAuth,
    logout,
  }
})

