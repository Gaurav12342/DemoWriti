import { API_MODULE, BASE_URL } from '../../../services/api/routes/common';
const baseURL = BASE_URL[API_MODULE.PCC];
const baseURLMap = BASE_URL[API_MODULE.CUSTOMER];

export const
  getPccList = {
    method: 'POST',
    url: '/admin/pcc-fac/paginate',
    baseURL,
  },
  syncPcc = {
    method: 'GET',
    url: '/admin/pcc-fac/sync',
    baseURL,
  },
  mapPcc = {
    method: 'POST',
    url: '/admin/mapping/pcc-home-homearea',
    baseURL: baseURLMap,  
  },
  pccLogs = {
    method:'POST',
    url:'/admin/pcc-logs/paginate',
     baseURL,  
  }
