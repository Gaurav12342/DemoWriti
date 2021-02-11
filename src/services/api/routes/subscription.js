import { API_MODULE, BASE_URL } from './common'

const baseURL = BASE_URL[API_MODULE.ROLE_BASE_ACCESS_PERMISSION]
export const
    getAll = {
        method: 'POST', url: '/admin/subscription-group/paginate', baseURL
    },
    insert = {
        method: 'POST', url: '/admin/subscription-group', baseURL
    },
    update = {
        method: 'PUT', url: '/admin/subscription-group/', baseURL
    },
    get = {
        method: 'GET', url: '/admin/subscription-group/', baseURL
    },
    remove = {
        method: 'DELETE', url: '/admin/subscription-group/', baseURL
    }