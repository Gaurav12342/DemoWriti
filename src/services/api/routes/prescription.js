import { API_MODULE, BASE_URL } from './common'

const baseURL = BASE_URL[API_MODULE.ADD_PRESCRIPTION]
export const
    getFavouriteMeds = {
        method: 'POST', url: '/admin/medication-favourite/paginate', baseURL
    },
    addFavouriteMeds = {
        method: 'POST', url: '/admin/medication-favourite/add', baseURL
    },
    removeFavouriteMeds = {
        method: 'POST', url: '/admin/medication-favourite/remove', baseURL
    },
    upsert = {
        method: 'POST', url: 'admin/prescription/upsert', baseURL
    },
    getDrugs = {
        method: 'POST', url: '/admin/drug-bank/list', baseURL
    },
    getAllRxOrders = {
        method: 'POST', url: 'admin/prescription/paginate', baseURL
    },
    upsertEProcessing = {
        method: 'POST', url: 'admin/third-party-prescription/upsert', baseURL
    },
    rxImage = {
        method: 'POST', url: 'admin/prescription/get-prescription-order-images', baseURL
    }