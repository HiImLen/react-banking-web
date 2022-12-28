import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 5000,
  // headers: {'X-Access-Token': 'foobar'}
});

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}