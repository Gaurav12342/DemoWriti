const SERVER_URL = 'http://192.168.2.200'

export const API_MODULE = {
  AUTH: 1,
  ROLE_BASE_ACCESS_PERMISSION: 2,
  USER: 3,
  CUSTOMER: 4,
  MASTER: 5,
  ADD_PRESCRIPTION: 6,
  SUPPORT_FEEDBACK: 7,
  RESIDENT: 8,
  PMR: 9,
  PCC: 10,
  TODO: 11,
  // RX_ORDER: 12,
  // E_PROCESSING: 13,
  X_RAY_US: 15,
  // VIRTUAL_VISIT: 16,
  // ADMISSION_READMISSION: 17,
  // NOTIFICATION: 19,
  // CHAT: 20,
  // DASHBOARD: 21,
  PROFILE: 22,
  VERSION: 23,
  FILE: 24,
  GLOBAL_SEARCH: 25,
  NOTES: 26,
  REMINDER: 27,
  DIGITAL_BINDER: 28,
};


export const BASE_URL = {
  [API_MODULE.AUTH]: `${SERVER_URL}:3053/`,
  [API_MODULE.USER]: `${SERVER_URL}:3053/`,
  [API_MODULE.RESIDENT]: `${SERVER_URL}:3019/`,//changed
  [API_MODULE.CUSTOMER]: `${SERVER_URL}:3005/`,
  [API_MODULE.MASTER]: `${SERVER_URL}:3001/`, //changed
  [API_MODULE.SUPPORT_FEEDBACK]: `${SERVER_URL}:3032/`,
  [API_MODULE.ROLE_BASE_ACCESS_PERMISSION]: `${SERVER_URL}:3012/`,
  [API_MODULE.PROFILE]: `${SERVER_URL}:3053/`,
  [API_MODULE.ADD_PRESCRIPTION]: `${SERVER_URL}:3020/`,
  [API_MODULE.VERSION]: `${SERVER_URL}:3015`,//changed
  [API_MODULE.FILE]: `${SERVER_URL}:3053/`,
  [API_MODULE.PMR]: `${SERVER_URL}:3070/`, //changed
  [API_MODULE.X_RAY_US]: `${SERVER_URL}:3061/`,
  [API_MODULE.PCC]: `${SERVER_URL}:3025/`,
  [API_MODULE.GLOBAL_SEARCH]: `${SERVER_URL}:3081/`,
  [API_MODULE.DIGITAL_BINDER]: `${SERVER_URL}:3081/`,
  [API_MODULE.NOTES]: `${SERVER_URL}:3009/`,//changed
  [API_MODULE.REMINDER]: `${SERVER_URL}:3068/`,
  [API_MODULE.TODO]: `${SERVER_URL}:3027/`

};

let apiUrl;
// console.log(process.env.PUBLIC_URL);
if (process.env.PUBLIC_URL === 'production') apiUrl = '/';
export const API_URL = apiUrl;

export const booleanStatusUpdate = {
  method: 'POST',
  url: '/admin/common/boolean-status-update',
};

export const getCascader = {
  method: 'POST',
  url: 'admin/cascader-data',
};
export const upsertReminder = {
  method: 'POST',
  url: '/admin/pmr-reminder/upsert',
};

const baseURL = BASE_URL[API_MODULE.FILE];
export const fileUpload = {
  method: 'POST',
  url: '/admin/upload-file',
  baseURL,
};
