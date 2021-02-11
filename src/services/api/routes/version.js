import { API_MODULE, BASE_URL } from "./common";

const baseURL = BASE_URL[API_MODULE.VERSION];

export const versionPaginate = {
    url: "/admin/version/paginate",
    method: "POST",
    baseURL,
  },
  versionDelete = {
    url: "/admin/version/destroy",
    method: "DELETE",
    baseURL,
  },
  versionUpsert = {
    url: "/admin/version/upsert",
    method: "POST",
    baseURL,
  },
  getSpecificVersion = {
    url: "/admin/version",
    method: "GET",
    baseURL,
  },
  versionUpdate = {
    url: "/admin/version/upsert",
    method: "PUT",
    baseURL,
  },
  versionActiveDeActive = {
    url: "/admin/version/set-active",
    method: "PUT",
    baseURL,
  },
  versionHardUpdate = {
    url: "/admin/version/hard-update",
    method: "PUT",
    baseURL,
  };
