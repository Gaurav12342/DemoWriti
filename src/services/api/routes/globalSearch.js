import { API_MODULE, BASE_URL } from '../../../services/api/routes/common';
const baseURL = BASE_URL[API_MODULE.GLOBAL_SEARCH];
const baseURLMap = BASE_URL[API_MODULE.GLOBAL_SEARCH];

export const
  SerachPaginate = {
    method: 'POST',
    url: '/admin/global-search',
    baseURL,
  },
 Timeline = {
    method: 'POST',
    url: '/admin/timeline',
    baseURL,
  }
 