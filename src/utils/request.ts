import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const request: AxiosInstance = axios.create({
  baseURL: '/dev-api',
  timeout: 20000
})

request.interceptors.request.use(config => {
  const authStore = useAuthStore()
  const accessToken = authStore.accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ` + accessToken
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  const { data } = response
  if (data.code === 20000) {
    return data
  }
  ElMessage.error(data.message)
  return Promise.reject(data)
}, (error) => {
  return Promise.reject(error)
})

export default request