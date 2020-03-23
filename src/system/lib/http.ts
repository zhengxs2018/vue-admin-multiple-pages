import axios, { AxiosRequestConfig } from 'axios'

const http = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 5000,
  withCredentials: true
})

http.interceptors.response.use(
  res => res.data,
  error => Promise.reject(error)
)

export function doGet<T = any>(
  path: string,
  params?: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return http.get(path, { ...options, params })
}

export default http
