import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3030/api/',
  timeout: 5000,
  // headers: {'X-Access-Token': 'foobar'}
});