import { API_MODULE, BASE_URL } from './common'
const baseURL = BASE_URL[API_MODULE.X_RAY_US]

export const requisitionRequest = {
    method: 'POST',
    url: 'admin/x-ray/upsert',
    baseURL
}
export const xRayListing = {
    method: 'POST',
    url: 'admin/x-ray/paginate',
    baseURL
}
export const getXrayPDF={
    method:'POST',
    url:'/admin/x-ray/getpdf',
    baseURL
}
