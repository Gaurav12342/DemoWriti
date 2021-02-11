import { API_MODULE, BASE_URL } from './common';
const baseURL = BASE_URL[API_MODULE.TODO];

export const getTodoCounts = {
    method: 'POST',
    url: '/admin/todo/counts',
    baseURL
}