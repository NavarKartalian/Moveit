import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://moveit-mocha-three.vercel.app/api',
});