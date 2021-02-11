import { API_MODULE, BASE_URL } from './common'

const baseURL = BASE_URL[API_MODULE.ADD_PRESCRIPTION]
const baseURLTodo = BASE_URL[API_MODULE.TODO]

export const
    getPrescriptionDetail = {
        method: 'POST', url: 'admin/prescription/detail', baseURL
    },
    performTodo = {
        method: 'POST', url: 'admin/prescription-todo/perform', baseURL: baseURLTodo
    },
    getTodoList = {
        method: 'POST', url: 'admin/prescription-todo/list', baseURL
    }
