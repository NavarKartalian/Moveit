import axios from 'axios';

export const api = axios.create({
  baseURL: 'moveit-mocha-three.vercel.app/api/',
});