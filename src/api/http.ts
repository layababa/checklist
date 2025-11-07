import axios, { AxiosInstance, AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://web.flimzor.xyz/stage-api'

export const http: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
})

// 请求拦截器：添加 token
http.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理 401
let isRetrying = false
let retryQueue: any[] = []

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()

      if (!isRetrying) {
        isRetrying = true
        authStore.logout()
        // 触发登录弹框（由 App.vue 全局监听处理）
        window.dispatchEvent(new CustomEvent('needLogin'))
      }

      return Promise.reject(error)
    }

    if (error.response?.status && error.response.status >= 400) {
      const message = (error.response.data as any)?.msg || error.message || '请求失败'
      ElMessage.error(message)
    }

    return Promise.reject(error)
  }
)

export default http

