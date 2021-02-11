import { DEVICE_TYPE } from '../../../constants/common';
import { BASE_URL, API_MODULE } from './common';
const baseURL = BASE_URL[API_MODULE.AUTH];
export const verifyPassword = {
  method: 'POST',
  url: '/admin/authenticate',
  baseURL,
  request: { password: '', excludeOTPVerification: true },
};

export const login = {
    method: 'POST',
    // url: 'admin/auth/login',
    url: 'admin/login',
    baseURL,
    headers: {
      // devicetype: DEVICE_TYPE.WEB,
    },
  },
  logout = {
    method: 'POST',
    // url: 'admin/auth/login',
    url: 'admin/logout',
    baseURL,
  };
export const resendOtpLink = {
  url: 'admin/user/resend-otp',
  method: 'GET',
  baseURL,
};
export const verifyOtp = {
  url: 'admin/user/verify-otp',
  method: 'POST',
  baseURL,
};
export const forgotPassword = {
  url: 'api/v1/forgetPassword',
  method: 'POST',
  baseURL,
};

// set preferred HomeId globally for Doctor and Nurse because they can assigned to Multiple home
export const setHomeId = {
    method: 'POST',
    url: 'admin/user/change-home',
    baseURL,
  },
  tokenRefresh = {
    method: 'POST',
    url: '/re-gen-token',
    baseURL,
  },
  resetPassword = {
    method: 'POST',
    url: 'admin/reset-password',
    baseURL,
  },
  checkPassTokenRefresh = {
    method: 'POST',
    url: '/admin/user/check-password',
    baseURL,
  },
  updateDefaultPassword = {
    method: 'POST',
    url: 'admin/user/change-password',
    baseURL,
  },
  changePasswordByAdmin = {
    method: 'POST',
    url: 'admin/user/change-password-by-admin',
    baseURL,
  },
  authenticatePassword = {
    method: 'POST',
    url: 'admin/user/check-password',
    baseURL,
  },
  assignedHomelist = {
    method:"GET",
    url: 'admin/user/assigned-home-list',
    baseURL
  }
