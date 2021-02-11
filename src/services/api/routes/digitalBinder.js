import { API_MODULE, BASE_URL } from '../../../services/api/routes/common';
const baseURL = BASE_URL[API_MODULE.DIGITAL_BINDER];

export const digitalBinderPaginate = {
  method: 'POST',
  url: 'admin/digital-binder',
  baseURL,
};