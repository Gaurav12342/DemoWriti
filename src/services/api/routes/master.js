import { API_MODULE, BASE_URL } from './common'

export const baseURL = BASE_URL[API_MODULE.MASTER];
export const masterPaginate = {
  method: "POST",
  url: "/admin/master-submaster/paginate",
  baseURL
};

export const masterUpsert = {
  method: "POST",
  url: "/admin/master-submaster",
  baseURL
};

export const masterUpdate = {
  method: "PUT",
  url: "/admin/master-submaster",
  baseURL
};
export const masterDelete = {
  method: "DELETE",
  url: "/admin/master-submaster",
  baseURL
};

export const getSpecificMaster = {
  method: "GET",
  url: "/admin/master-submaster",
  baseURL
};
