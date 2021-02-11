import { API_MODULE, BASE_URL } from "../../../services/api/routes/common";

const baseURL = BASE_URL[API_MODULE.PROFILE];
export const updateProfile = {
    method: "POST",
    url: "admin/user/update-profile",
    baseURL,
  },
  changePassword = {
    method: "POST",
    url: "/admin/user/change-password",
    baseURL,
  },
  getUserDetail = {
    method: "GET",
    url: "/admin/user",
    baseURL,
  };
