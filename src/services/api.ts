import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://moveit-nlw-next.vercel.app/api/',
});