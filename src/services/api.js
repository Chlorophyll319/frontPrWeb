import axios from 'axios'
import { useUserStore } from '@/stores/user'

// 無須登入即可使用（接後端）
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

// 須登入才能使用（接後端）
const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

// 每次發送請求前自動加上 token
apiAuth.interceptors.request.use((config) => {
  const user = useUserStore()
  config.headers.Authorization = `Bearer ${user.token}`
  return config
})

let isRefreshing = false
let refreshQueue = []

const processQueue = (error, token = null) => {
  refreshQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  refreshQueue = []
}

// token 相關 成功處理與失敗處理
apiAuth.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === 'token 已過期' &&
      error.config.url !== '/user/refresh'
    ) {
      const user = useUserStore()

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject })
        }).then((token) => {
          error.config.headers.Authorization = `Bearer ${token}`
          return apiAuth.request(error.config)
        })
      }

      isRefreshing = true
      try {
        const { data } = await apiAuth.patch('/user/refresh')
        user.token = data.token
        processQueue(null, data.token)
        error.config.headers.Authorization = `Bearer ${data.token}`
        return apiAuth.request(error.config)
      } catch (refreshError) {
        processQueue(refreshError, null)
        user.logout()
        throw refreshError
      } finally {
        isRefreshing = false
      }
    }
    throw error
  },
)

export default { api, apiAuth }
