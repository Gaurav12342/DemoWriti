import { API_MODULE, BASE_URL } from './common';

// export const masterPaginate = {
//   method: 'POST',
//   url: 'admin/master/paginate',
// };

export const baseURL = BASE_URL[API_MODULE.SUPPORT_FEEDBACK];

export const feedbackUpsert = {
    method: 'POST',
    url: '/admin/feedback',
    baseURL,
  },
  supportUpsert = {
    method: 'POST',
    url: '/admin/support',
    baseURL,
  },
  supportUpdate = {
    method: 'PUT',
    url: '/admin/support',
    baseURL,
  },
  supportPaginate = {
    method: 'POST',
    url: '/admin/support/paginate',
    baseURL,
  },
  supportDelete = {
    method: 'DELETE',
    url: '/admin/support',
    baseURL,
  }, feedbackPaginate= {
  method: "POST",
  url: "/admin/feedback/paginate",
  baseURL,
};
  
