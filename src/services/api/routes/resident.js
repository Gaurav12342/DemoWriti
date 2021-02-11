import { API_MODULE, BASE_URL } from '../../../services/api/routes/common';
const baseURL = BASE_URL[API_MODULE.RESIDENT];

export const addResident = {
    method: 'POST',
    url: '/admin/resident/create',
    baseURL,
  },
  getResidents = {
    method: 'POST',
    url: '/admin/resident/paginate',
    baseURL,
  },
  syncKrollResident = {
    method: 'POST',
    url: '/admin/resident/kroll-sync',
    baseURL,
  };
