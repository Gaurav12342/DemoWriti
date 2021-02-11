import { API_MODULE, BASE_URL } from "./common"


const baseURL = BASE_URL[API_MODULE.REMINDER]
export const
  deleteReminder = {
    method: 'DELETE',
    url: '/admin/reminder/destroy',
    baseURL
  },
  getAllReminder = {
    method: 'POST',
    url: 'admin/reminder/paginate',
    baseURL
  },
  upsertReminder = {
    method: 'POST',
    url: '/admin/reminder/upsert',
    baseURL
  }