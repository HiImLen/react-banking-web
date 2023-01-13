import axios from 'axios'
import { useNavigate } from 'react-router'

const instance = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 5000,
  headers: { 'x-access-token': localStorage.token }
})

instance.interceptors.response.use((response) => {
  return response
}, async (err) => {
  console.log(err.response.config.url)
  console.log('err', err)
  if (err.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
  if (err.response.config.url === '/Users/Login') {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
  if (err.response.config.url === '/RefreshToken/Refresh') {
    console.log('ERROR NO REFRESH')
    const navigate = useNavigate()
    navigate('/login')
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
  console.log('abc')
  const success = await instance.post('/RefreshToken/Refresh', { refreshToken: localStorage.refreshToken }, { withCrendentials: true })
  const config = err.response.config
  config.headers['x-access-token'] = success.data.data.token
  localStorage.token = success.data.data.token
  return await instance(config)
})

export { instance }

export function parseJwt (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}
