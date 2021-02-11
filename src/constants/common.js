import routes from "../routes/constant";
import { USER_TYPE } from './User'

export const BASE_URL = window.location.origin;
export const fileTypesExtensions = {
  image: ["tif", "raw", "tiff", "jpg", "jpeg", "png", "gif", "bmp"],
  pdf: ["pdf"],
  json: ["application/json"],
};

export const SOURCE_MEDIUM = {
  WEB: 1,
  ANDROID_HOME_APP: 2,
  IOS_HOME_APP: 3,
  DESKTOP: 4,
  ANDROID_PHYSICIAN_APP: 5,
  IOS_PHYSICIAN_APP: 6,
};

export const VERSION_PLATFORM = {
  WINDOWS: 1,
  ANDROID: 2,
  IPHONE: 3,
  HOME_BACKUP: 4,
  PRINT_EXE: 5,
};

export const DEVICE_TYPE = {
  WEB: 1,
};

export const USER_BASED_REDIRECT = {
  [routes.todo.path]: [USER_TYPE.HOME.NURSE, USER_TYPE.HOME.DOCTOR],
  [routes.viewResident.path]: [USER_TYPE.PHARMACY.PHARMACIST],
  [routes.order.path]: [
    USER_TYPE.PHARMACY.RECEIVER,
    USER_TYPE.PHARMACY.SHIPPER,
    USER_TYPE.PHARMACY.LICENSED_TECHNICIAN,
    USER_TYPE.PHARMACY.INTERN,
  ],
  [routes.viewResident.path]: [
    USER_TYPE.ADMIN.SUPER,
    USER_TYPE.ADMIN.GENERAL,
    USER_TYPE.HOME.ADMIN,
    USER_TYPE.PHARMACY.ADMIN,
    USER_TYPE.ORGANIZATION.ADMIN]
}
export const PUBLIC_ROUTES_COLLECTIONS = [routes.init.path,
routes.login.path,
routes.verifyOtp.path,
routes.forgotPassword.path,
routes.pageNotFound.path,
routes.unAuthorizedPage.path,
routes.updateDefaultPassword.path,
routes.resetPassword.path
]

export const VIEW_PERMISSION_TYPE = {
  DATA: 1,
  DONT_HAVE_PERMISSION_PAGE: 2,
};
export const GENDER_TYPE = {
  1: "Male",
  2: "Female",
  3: "Unspecified",
};

export const EXCLUDE_TENANT = [
  routes.subscription.module,
  // routes.rolePermission.module,
  routes.pharmacy.module,
  routes.imagingDiagnostics.module,
  routes.master.module,
  routes.pcc.module,
  routes.userAdmin.module,
  routes.userPharmacy.module,
  routes.userOrganization.module,
];
export const PCC_LOGS_STATUS_TEXT_TYPE = {
  "ALL": "ALL",
  "SUCCESS": "SUCCESS",
  "ERROR": "ERROR"
}
