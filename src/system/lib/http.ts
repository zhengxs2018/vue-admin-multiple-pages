import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import { get } from 'lodash-es'

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

function createError(res: object, extra?: object) {
  const error = new Error(get(res, 'message', 'parse error'))
  Object.assign(error, extra)
  return Promise.reject(error)
}

function afterResponse(response: AxiosResponse) {
  const res = response.data
  if (get(res, 'code', -1) === 200) {
    return res.data
  }
  return createError(res, { response })
}

http.interceptors.response.use(afterResponse, error => {
  return Promise.reject(error)
})

export function doGet<T = any>(
  path: string,
  params?: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return http.get(path, { ...options, params })
}

export default http
