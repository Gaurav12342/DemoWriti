import { API_MODULE, BASE_URL } from './common'
const baseURL = BASE_URL[API_MODULE.USER]

export const getPatientDetail = {
    method: 'GET',
    url: "/admin/resident",
    baseURL:BASE_URL[API_MODULE.RESIDENT]
}
export const getPhysicianList = {
    method: 'POST',
    url: 'admin/user/prescriber-list',
    baseURL
}
export const searchResident = {
    method: 'POST',
    url: 'admin/resident/list',
    baseURL
}
export const addUser = {
    method: "POST",
    url: 'admin/user',
    baseURL
}

export const userPaginate = {
    method: "POST",
    url: 'admin/user/paginate',
    baseURL
}
export const editUser = {
    method: "PUT",
    url: 'admin/user/',
    baseURL
}
export const searchExistingUser = {
    method: "POST",
    url: 'admin/user/search/',
    baseURL
}
export const assignHomeOrPharmacy = {
    method: 'POST',
    url: 'admin/user/assign-home-or-pharmacy/',
    baseURL
}
export const  privateBucketUrl = {
    method: 'POST', url: 'admin/get-signed-url', baseURL
}
