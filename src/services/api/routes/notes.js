import { API_MODULE, BASE_URL } from "./common"


const baseURL = BASE_URL[API_MODULE.NOTES]
export const
    deleteNote = {
        method: 'DELETE',
        url: '/admin/note/',
        baseURL
    },
    upsertNote = {
        method: 'POST',
        url: '/admin/note',
        baseURL
    },
    updateNote = {
        method: 'PUT',
        url: '/admin/note',
        baseURL
    },
    getAllNotes = {
        method: 'POST',
        url: 'admin/note/paginate',
        baseURL
    },
    getNoteTypes = {
        method: 'GET',
        url: 'admin/note/type',
        baseURL
    }