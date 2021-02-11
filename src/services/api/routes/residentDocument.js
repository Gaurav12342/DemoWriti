import { API_MODULE, BASE_URL } from '../../../services/api/routes/common';
const baseURL = BASE_URL[API_MODULE.RESIDENT];

export const createResidentDocument = {
    method: 'POST',
    url: '/admin/resident-document/create',
    baseURL,
}

export const listResidentDocuments = {
    method: 'POST',
    url: '/admin/resident-document/list',
    baseURL,
}

export const deleteResidentDocument = {
    method: 'POST',
    url: '/admin/resident-document/destroy',
    baseURL,
}