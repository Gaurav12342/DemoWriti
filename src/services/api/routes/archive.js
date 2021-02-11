import { API_MODULE, BASE_URL } from '../../../services/api/routes/common';
const baseURL = BASE_URL[API_MODULE.DIGITAL_BINDER];

export const archivePaginate = {
  method: 'POST',
  url: 'admin/archieve',
  baseURL
};