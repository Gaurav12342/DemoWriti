import moment from "moment";
import React from "react";
import { Toast } from "../components/common/Toast";
import {
  MED_REVIEW_TODO_TYPES,
  PMR_PROCESS_TYPE,
  MED_REVIEW_NAME,
} from "../constants/pmr.js";
import {
  USER_TYPE,
  SUB_NURSE_TYPE,
  DESIGNATION_TYPE,
  USER_DESIGNATION_TYPE,
  isPharmacyUser
} from "../constants/User";
import { USER_BASED_REDIRECT, EXCLUDE_TENANT } from "../constants/common";
import {
  AR_PROCESS_TYPE,
  ADMISSION_READMISSION_TODO_TYPES,
} from "../constants/Admission";
import routes from "../routes/constant";
import { PERMISSION_ACCESS_TYPE, MODULE } from "../constants/subscription";
import { history } from "../appRedux/store/index";
import { decryptData, encryptData } from "../util/Crypto";
import queryString from "query-string";
import AdminAccessPermisison from "../constants/adminRolePermission";
import { TODO_CATEGORY } from "../constants/todo";
const _ = require("lodash");

export function sortArrayDesc(arr, key) {
  //sort array in descending order
  return arr.sort(function (a, b) {
    return b[key] < a[key] ? -1 : 1;
  });
}

export function isRouteAccessible(props) {
  const { token, authUser, location } = props;
  const otpVerified = JSON.parse(localStorage.getItem("otpVerified"));
  let isAccessible = false;
  if (authUser) {
    const { excludeOTPVerification, type } = authUser;
    if (
      token &&
      (excludeOTPVerification || (!excludeOTPVerification && otpVerified)) &&
      authUser
    ) {
      if (type) {
        if (location && location.pathname) {
          let moduleId;
          Object.keys(routes).some((k) => {
            if (routes[k].path === location.pathname) {
              moduleId = routes[k].module;
              return true;
            }
          });
          if (moduleId && isModuleAccessible(moduleId)) {
            isAccessible = true;
          } else if (!moduleId) {
            isAccessible = true;
          }
        }
      }
    }
  }
  return isAccessible;
}

export function displayCatchErrorMsg(error) {
  console.log("displayCatchErrorMsg -> error", error);
  if (error && error.response && error.response && error.response.data) {
    // if (error.response.data.code !== 'E_INVALID_TOKEN')
    //   Toast.error(error.response.data.message);
  } else if (error.message) {
    Toast.error(error.message);
  } else {
    console.log(typeof error);
    Toast.error(error);
  }
}
export function isInvalidTokenError(error) {
  // console.log("TCL: isInvalidTokenError -> error.response", error.response)
  if (
    error &&
    error.response &&
    error.response &&
    error.response.data &&
    error.response.data.code === "E_INVALID_TOKEN"
  ) {
    return true;
  }
  return false;
}

export function checkModuleAccessible(
  modulePermissions,
  mappedModulePerm,
  moduleId,
  authUser
) {
  let isAccessible = false;
  if (modulePermissions && modulePermissions.length > 0) {
    modulePermissions.some((curPer) => {
      if (curPer.module === moduleId) {
        let shallCheck = true;
        if (
          authUser &&
          [USER_TYPE.HOME.NURSE, USER_TYPE.HOME.PHYSICIAN].indexOf(
            authUser.type
          ) >= 0 &&
          !curPer.isSelect
        ) {
          shallCheck = false;
        }
        if (shallCheck) {
          if (mappedModulePerm.hasOwnProperty(curPer.module)) {
            if (mappedModulePerm[moduleId] === PERMISSION_ACCESS_TYPE.DATA) {
              isAccessible = true;
            } else if (
              mappedModulePerm[moduleId] ===
              PERMISSION_ACCESS_TYPE.DO_NOT_HAVE_PERMISSION_TO_VIEW_THIS_PAGE
            ) {
              isAccessible = false;
            }
            return true;
          }
        }
      }
    });
  }
  return isAccessible;
}
export function checkArrayOfModuleAccessible(
  modulePermissions,
  mappedModulePerm,
  moduleIds
) {
  let isAccessible = false,
    count = 0;
  if (moduleIds && moduleIds.length) {
    if (modulePermissions && modulePermissions.length > 0) {
      modulePermissions.some((curPer) => {
        if (moduleIds.indexOf(curPer.module) >= 0) {
          count += 1;
          if (mappedModulePerm.hasOwnProperty(curPer.module)) {
            if (
              mappedModulePerm[curPer.module] === PERMISSION_ACCESS_TYPE.DATA
            ) {
              isAccessible = true;
            } else if (
              mappedModulePerm[curPer.module] ===
              PERMISSION_ACCESS_TYPE.DO_NOT_HAVE_PERMISSION_TO_VIEW_THIS_PAGE
            ) {
              isAccessible = false;

              return true;
            }
          }
        }
        if (count == moduleIds.length) {
          return true;
        }
      });
    }
  }
  return isAccessible;
}

export function getMappedPermission(authUser) {
  let tempMappedModulePerm = {},
    tempMappedSubModulePerm = {},
    isMapped = false;
  if (localStorage.getItem("mappedModulePermissions")) {
    isMapped = true;
    tempMappedModulePerm = decryptData(
      localStorage.getItem("mappedModulePermissions")
    );
    tempMappedSubModulePerm = decryptData(
      localStorage.getItem("mappedSubModulePermissions")
    );
  } else if (authUser && !isMapped) {
    const isAdmin =
      (authUser &&
        authUser.type &&
        [USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL].indexOf(
          authUser.type
        ) >= 0) ||
      false;
    if (isAdmin) {
      let tempGroupPermissions = [...AdminAccessPermisison];
      tempGroupPermissions.map((cur) => {
        tempMappedModulePerm[cur.module] = PERMISSION_ACCESS_TYPE.DATA;
        if (cur.subModules && cur.subModules.length > 0) {
          cur.subModules.map((sub) => {
            tempMappedSubModulePerm[sub.subModule] =
              PERMISSION_ACCESS_TYPE.DATA;
          });
        }
      });
    } else if (authUser.homeId || authUser.pharmacyId) {
      let homeData = {}
      if (isPharmacyUser(authUser.type)) {
        homeData = _.cloneDeep(authUser.pharmacyId);
      } else {
        homeData = _.cloneDeep(authUser.homeId);
      }
      if (homeData?.assignedSubscriptionGroupId && !isMapped) {
        let tempGroupPermissions = homeData.assignedSubscriptionGroupId.groupPermissions;
        if (tempGroupPermissions && tempGroupPermissions.length) {
          tempGroupPermissions.map((cur) => {
            tempMappedModulePerm[cur.module] = cur.permissionAccesstype;
            if (cur.subModules && cur.subModules.length > 0) {
              cur.subModules.map((sub) => {
                tempMappedSubModulePerm[sub.subModule] =
                  sub.permissionAccesstype;
              });
            }
          });
        }
      }
    }
    localStorage.setItem(
      "mappedModulePermissions",
      encryptData(tempMappedModulePerm)
    );
    localStorage.setItem(
      "mappedSubModulePermissions",
      encryptData(tempMappedSubModulePerm)
    );
  }
  return { tempMappedModulePerm, tempMappedSubModulePerm };
}
export function getRolePermissionGroup(authUser) {
  let rolePemissionModules = localStorage.getItem("rolePemissionModules");
  let modulePermissions;
  if (rolePemissionModules) {
    modulePermissions = decryptData(rolePemissionModules);
  } else {
    if (
      authUser &&
      authUser.homeId &&
      authUser.homeId._id &&
      authUser.homeId.roleBasePermission
    ) {
      let homeData = _.cloneDeep(authUser.homeId.roleBasePermission);
      if (
        homeData.roleAccessPermissions &&
        homeData.roleAccessPermissions.length
      ) {
        modulePermissions = homeData.roleAccessPermissions;
      }
    } else if (
      authUser &&
      authUser.type &&
      [USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL].indexOf(authUser.type) >=
      0
    ) {
      // action acess permisison for SUPER/GENERAL ADMIN
      modulePermissions = [...AdminAccessPermisison];
    } else if (
      authUser &&
      (authUser.type === USER_TYPE.HOME.ADMIN ||
        authUser.type === USER_TYPE.PHARMACY.ADMIN)
    ) {
      // action acess permisison for HOME/PHARMACY ADMIN
      let tempSubcriptionGroup =
        authUser.type === USER_TYPE.HOME.ADMIN &&
          authUser.homeId?.assignedSubscriptionGroupId
          ? [...authUser.homeId?.assignedSubscriptionGroupId.groupPermissions]
          : authUser.type === USER_TYPE.PHARMACY.ADMIN &&
            authUser.pharmacyId?.assignedSubscriptionGroupId
            ? [
              ...authUser.pharmacyId?.assignedSubscriptionGroupId
                ?.groupPermissions,
            ]
            : undefined;

      modulePermissions = tempSubcriptionGroup?.map((mod) => {
        mod.isSelect = true;
        mod.actions = mod.actions?.map((act) => {
          act.isSelect = true;
          return act;
        });
        mod.subModule = mod.subModule?.map((sub) => {
          sub.isSelect = true;
          sub.actions = sub.actions?.map((act) => {
            act.isSelect = true;
            return act;
          });
          return sub;
        });
        return mod;
      });
    }
    if (modulePermissions)
      localStorage.setItem(
        "rolePemissionModules",
        encryptData(modulePermissions)
      );
  }
  return modulePermissions;
}

export function isModuleAccessiblePharmacyHome(moduleId, tempMappedModulePerm, subModuleId, tempMappedSubModulePerm) {
  // console.log("isModuleAccessiblePharmacyHome -> moduleId, tempMappedModulePerm", moduleId, tempMappedModulePerm)
  let isAccessible = false;

  if (tempMappedModulePerm.hasOwnProperty(moduleId)) {
    if (tempMappedModulePerm[moduleId] === PERMISSION_ACCESS_TYPE.DATA) {
      isAccessible = true;
    } else if (
      tempMappedModulePerm[moduleId] ===
      PERMISSION_ACCESS_TYPE.DO_NOT_HAVE_PERMISSION_TO_VIEW_THIS_PAGE
    ) {
      isAccessible = false;
    }
  }
  return isAccessible;
}
export function isSubModuleAccessible(subModuleId, tempMappedSubModulePerm) {
  //to check subscription of submodule
  return (tempMappedSubModulePerm[subModuleId] === PERMISSION_ACCESS_TYPE.DATA)
}
export function isArrayModuleAccessiblePharmacyHome(
  moduleIds,
  tempMappedModulePerm
) {
  let isAccessible = false,
    count = 0;
  if (moduleIds && moduleIds.length) {
    moduleIds.some((moduleId) => {
      if (tempMappedModulePerm.hasOwnProperty(moduleId)) {
        count += 1;
        if (tempMappedModulePerm[moduleId] === PERMISSION_ACCESS_TYPE.DATA) {
          isAccessible = true;
        } else if (
          tempMappedModulePerm[moduleId] ===
          PERMISSION_ACCESS_TYPE.DO_NOT_HAVE_PERMISSION_TO_VIEW_THIS_PAGE
        ) {
          isAccessible = false;
          return true;
        }
      }
      if (count == moduleIds.length) {
        return true;
      }
    });
  }
  return isAccessible;
}
export function isModuleAccessible(moduleId, isMultiple, subModuleId) {
  let isAccessible = false;
  let authUser = localStorage.getItem("user")
    ? decryptData(localStorage.getItem("user"))
    : null;

  if (authUser) {
    if (
      authUser.type &&
      [USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL].indexOf(authUser.type) >=
      0
    ) {
      return true;
    }
    let { tempMappedModulePerm, tempMappedSubModulePerm } = getMappedPermission(authUser);

    if (
      authUser.type &&
      [USER_TYPE.PHARMACY.ADMIN, USER_TYPE.HOME.ADMIN].indexOf(authUser.type) >=
      0
    ) {
      if (isMultiple) {
        isAccessible = isArrayModuleAccessiblePharmacyHome(
          moduleId,
          tempMappedModulePerm
        );
      } else {
        isAccessible = isModuleAccessiblePharmacyHome(
          moduleId,
          tempMappedModulePerm

        );
        if (isAccessible && subModuleId)
          isAccessible = isSubModuleAccessible(subModuleId,
            tempMappedSubModulePerm)
      }
    } else {
      let tempPermissionGroup = getRolePermissionGroup(authUser);
      if (isMultiple) {
        isAccessible = checkArrayOfModuleAccessible(
          tempPermissionGroup,
          tempMappedModulePerm,
          moduleId
        );
      } else {
        isAccessible = checkModuleAccessible(
          tempPermissionGroup,
          tempMappedModulePerm,
          moduleId,
          authUser
        );
      }
    }
  }

  return isAccessible;
}

export function canPerformAction(params, doNotIncludeAction) {
  let shouldPerform = false;
  let authUser = localStorage.getItem("user")
    ? decryptData(localStorage.getItem("user"))
    : null;
  if (authUser) {
    // if (authUser.type && [USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL].indexOf(authUser.type) >= 0) {
    //     // action acess permisison for SUPER/GENERAL ADMIN

    //     return true
    // }
    let tPermGroup = getRolePermissionGroup(authUser);
    let { tempMappedModulePerm } = getMappedPermission(authUser);
    shouldPerform = checkActionCanBePerformed(
      tPermGroup,
      tempMappedModulePerm,
      params,
      doNotIncludeAction
    );
  }
  return shouldPerform;
}
export function checkActionCanBePerformed(
  tempPermissionGroup,
  tMappedModulePerm,
  params,
  doNotIncludeAction
) {
  let checkCanPerformAction = false,
    isFound = false;
  if (params.moduleId) {
    if (tempPermissionGroup && tempPermissionGroup.length) {
      tempPermissionGroup.some((curModule) => {
        if (curModule.module === params.moduleId) {
          if (
            tMappedModulePerm[params.moduleId] === PERMISSION_ACCESS_TYPE.DATA
          ) {
            if (params.hasOwnProperty("actiontoCheck")) {
              if (curModule.actions && curModule.actions.length) {
                curModule.actions.some((action) => {
                  const actionKey = params.actionKey || 'code'
                  if (action.isSelect && action[actionKey] === params.actiontoCheck) {
                    checkCanPerformAction = true;
                    isFound = true;
                    return true;
                  }
                });
              }
            }
            if (!params.hasOwnProperty("actiontoCheck")) {
              if (
                params.subModuleId &&
                curModule.subModules &&
                curModule.subModules.length
              ) {
                curModule.subModules.some((curSubModule) => {
                  if (
                    params.subModuleId === curSubModule.subModule &&
                    curSubModule.isSelect
                  ) {
                    if (doNotIncludeAction) {
                      checkCanPerformAction = true;
                      isFound = true;
                      return true;
                    }
                    if (
                      params.checkSubAction &&
                      curSubModule.actions &&
                      curSubModule.actions.length
                    ) {
                      curSubModule.actions.some((subAction) => {
                        const actionKey = params.actionKey || 'code'
                        if (subAction.isSelect && subAction[actionKey] === params.checkSubAction) {
                          checkCanPerformAction = true;
                          isFound = true;
                          return true;
                        }
                      });
                    }
                    if (isFound) {
                      return true;
                    }
                  }
                });
              }
            }
            if (isFound) {
              return true;
            }
          }
        }
        if (isFound) {
          return true;
        }
      });
    } else {
      // if (authUser.type && [USER_TYPE.PHARMACY.ADMIN, USER_TYPE.HOME.ADMIN].indexOf(authUser.type) >= 0)
    }
  }
  return checkCanPerformAction;
}
export function getUserBaseRedirect(user) {
  let foundRoute = routes.viewResident.path;
  // if (user && user.type) {
  //     Object.keys(USER_BASED_REDIRECT).some(route => {
  //         if (USER_BASED_REDIRECT[route].indexOf(user.type) >= 0) {
  //             foundRoute = route
  //             return route
  //         }
  //     })
  // }
  // console.log("TCL: getUserBaseRedirect -> foundRoute", foundRoute)
  return foundRoute;
}
export function isKeyExist(obj, keys) {
  let newObj = obj,
    isExist = false;
  if (obj && newObj && typeof newObj === "object" && Object.keys(obj).length) {
    keys.forEach((k, i) => {
      if (newObj.hasOwnProperty(k)) {
        if (i === keys.length - 1) {
          isExist = true;
        }
        newObj = newObj[k];
      }
    });
  }
  return isExist;
}

export function isDrOrNp(user) {
  if (!user) return;
  // return true if user is Doctor or Nurse Practioner
  return (
    user.type === USER_TYPE.HOME.PHYSICIAN ||
    user.subNurseType === SUB_NURSE_TYPE["NURSE_PRACTITIONER"]
  );
}

var timerid;

const fileTypesExtensions = {
  image: ["tif", "raw", "tiff", "jpg", "jpeg", "png", "gif", "bmp"],
  pdf: ["pdf"],
};

const UtilService = {
  getPrimaryValue: (array, key) => {
    let email = "";
    if (array && array.length) {
      array.some((obj) => {
        if (Object.keys(obj).length && obj.isPrimary && obj[key]) {
          email = obj[key];
          return true;
        }
      });
    }
    return email;
  },
  getPrimaryObj: (array) => {
    return array && array.length ? _.find(array, { isPrimary: true }) : "";
  },
  getLoginUserWiseHomesObj: (obj, loginUser) => {
    if (
      obj &&
      obj.homes &&
      obj.homes.length &&
      loginUser.type === USER_TYPE.HOME.ADMIN
    ) {
      obj.homeAreaId = obj.homes[0] ? obj.homes[0] : null;
      delete obj.homes;
    } else if (obj && obj.homes && obj.homes.length) {
      obj.pharmacyId = obj.homes[0] ? obj.homes[0] : null;
      obj.homeId = obj.homes[1] ? obj.homes[1] : null;
      obj.homeAreaId = obj.homes[2] ? obj.homes[2] : null;
      delete obj.homes;
    } else if (loginUser.type === USER_TYPE.HOME.ADMIN) {
      obj.homeAreaId =
        loginUser.parentClientele && loginUser.parentClientele.length
          ? loginUser.parentClientele[0].id
          : null;
    }
    return obj;
  },
  getLoginUserWiseHomesEditObj: (obj, loginUser) => {
    if (loginUser.type === USER_TYPE.HOME.ADMIN) {
      obj.homes = [obj.homeAreaId];
    } else {
      obj.homes = [obj.pharmacyId, obj.homeId, obj.homeAreaId];
    }

    return obj;
  },
  getSubCategory: (obj) => {
    if (obj === 1) {
      return "Consent obtained";
    } else {
      return "General";
    }
  },
  // setReadMore: (text, strLength, width) => {
  //     let string = text.substr(0, strLength || 20);
  //     if (text.length > 20) {
  //         let content = <div style={{ wordWrap: "break-word", width: width || 700 }}>{text}</div>;
  //         return (
  //             <Popover content={content} trigger="click">
  //                 {string}
  //                 <a style={{ color: "#0645AD" }}>...Read more</a>
  //             </Popover>
  //         );
  //     } else {
  //         return string;
  //     }
  // },
  displayType: (obj) => {
    if (obj === 1) {
      return "Draft";
    } else if (obj === 2) {
      return "Order";
    } else {
      return "";
    }
  },

  attachExtensionImageMulti(path) {
    var fileExtension = path ? path.substr(path.lastIndexOf(".") + 1) : "";
    let fileType = "";
    _.each(fileTypesExtensions, function (extensions, key) {
      if (extensions.indexOf(fileExtension) !== -1) {
        fileType = key;
      }
    });

    if (fileType != "image") {
      path = "/img/common/" + fileType + ".png";
    }
    return path;
  },

  //   displayPmrProcess(val, view) {
  //     if (typeof val !== 'object') return;
  //     let todoType, subNurseType;
  //     Object.keys(TODO_CATEGORY.MED_REVIEW).map((todo) => {
  //       if (TODO_CATEGORY.MED_REVIEW[todo] === val.type) {
  //         todoType = todo.replace(/_/g, ' ');
  //         todoType = MED_REVIEW_NAME[todo].replace(/_/g, ' ');

  //         return <span style={{ textTransform: 'capitalize' }}>{todoType} </span>;
  //       }
  //     });
  //     if (val.completedBy && val.completedBy.subNurseType) {
  //       Object.keys(SUB_NURSE_TYPE).map((subNurse) => {
  //         if (SUB_NURSE_TYPE[subNurse] === val.completedBy.subNurseType) {
  //           subNurseType = subNurse.replace(/_/g, ' ');
  //           return (
  //             <span style={{ textTransform: 'capitalize' }}>
  //               ({subNurseType})
  //             </span>
  //           );
  //         }
  //       });
  //     }

  //     return (
  //       <div>
  //         {view === 'list'
  //           ? val.processType === PMR_PROCESS_TYPE.INITIATED
  //             ? `Initiated by ${val.completedBy?.mergeLFName} ${
  //                 val.completedBy && val.completedBy.subNurseType
  //                   ? val.completedBy && isDrOrNp(val.completedBy)
  //                   : ''
  //               } `
  //             : `Completed by ${val.completedBy?.mergeLFName} ${
  //                 val.completedBy && val.completedBy.subNurseType
  //                   ? val.completedBy && isDrOrNp(val.completedBy)
  //                   : ''
  //               } at
  //                                                  ${displayDateTime(
  //                                                    val.completedAt
  //                                                  )}`
  //           : val.processType === PMR_PROCESS_TYPE.INITIATED
  //           ? `${todoType} is Initiated by ${val.completedBy?.mergeLFName} ${
  //               val.completedBy && val.completedBy.subNurseType
  //                 ? val.completedBy && isDrOrNp(val.completedBy)
  //                 : ''
  //             } `
  //           : `${todoType} is Completed by ${val.completedBy?.mergeLFName} ${
  //               val.completedBy && val.completedBy.subNurseType
  //                 ? val.completedBy && isDrOrNp(val.completedBy)
  //                 : ''
  //             } at
  //                                                      ${displayDateTime(
  //                                                        val.completedAt
  //                                                      )}`}
  //       </div>
  //     );
  //   },

  displayArProcess(val, view) {
    if (typeof val !== "object") return;
    let todoType, subNurseType;
    Object.keys(ADMISSION_READMISSION_TODO_TYPES).map((todo) => {
      if (ADMISSION_READMISSION_TODO_TYPES[todo] === val.type) {
        todoType = todo.replace(/_/g, " ");
        return <span style={{ textTransform: "capitalize" }}>{todoType} </span>;
      }
    });
    if (val.completedBy && val.completedBy.subNurseType) {
      Object.keys(SUB_NURSE_TYPE).map((subNurse) => {
        if (SUB_NURSE_TYPE[subNurse] === val.completedBy.subNurseType) {
          subNurseType = subNurse.replace(/_/g, " ");
          return (
            <span style={{ textTransform: "capitalize" }}>
              ({subNurseType})
            </span>
          );
        }
      });
    }

    return (
      <div>
        {view === "list"
          ? val.processType === AR_PROCESS_TYPE.INITIATED
            ? `Initiated by ${
            val.completedBy
              ? getUserNameWithDesignation(val.completedBy)
              : ""
            } ${
            val.completedBy && val.completedBy.subNurseType
              ? `(${subNurseType})`
              : val.completedBy && isDrOrNp(val.completedBy)
                ? ` (Physician)`
                : ""
            } `
            : `Completed by ${
            val.completedBy
              ? getUserNameWithDesignation(val.completedBy)
              : ""
            } ${
            val.completedBy && val.completedBy.subNurseType
              ? `(${subNurseType})`
              : val.completedBy && isDrOrNp(val.completedBy)
                ? ` (Physician)`
                : ""
            } at
                                                 ${moment(
              val.completedAt
            ).format("MM/DD/YYYY, HH:mm")}`
          : val.processType === AR_PROCESS_TYPE.INITIATED
            ? `${todoType} is Initiated by ${
            val.completedBy ? getUserNameWithDesignation(val.completedBy) : ""
            } ${
            val.completedBy && val.completedBy.subNurseType
              ? `(${subNurseType})`
              : val.completedBy && isDrOrNp(val.completedBy)
                ? ` (Physician)`
                : ""
            } `
            : `${todoType} is Completed by ${
            val.completedBy ? getUserNameWithDesignation(val.completedBy) : ""
            } ${
            val.completedBy && val.completedBy.subNurseType
              ? `(${subNurseType})`
              : val.completedBy && isDrOrNp(val.completedBy)
                ? ` (Physician)`
                : ""
            } at
                                                     ${moment(
              val.completedAt
            ).format(
              "MM/DD/YYYY, HH:mm"
            )}`}
      </div>
    );
  },

  displayPhone(phone) {
    // (705) 326-835
    phone = phone.replace(/[^\d]/g, "");
    phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    return phone;
  },
};

export function trimStr(str, type) {
  if (!type) return str.trim();
  if (type === "left") return str.trimStart();
  else if (type === "right") return str.trimEnd();
}

export function redirectToActiveAR(options, pageName) {
  if (pageName === "todo")
    return `/wa/admission-readmission-todo?todoCategory=${options.todoCategory}&todoSubCategory=${options.todoSubCategory}&viewType=${options.viewType}&arId=${options.arId}`;
  else
    return `/wa/admission-readmission-order?todoSubCategory=${options.todoSubCategory}&viewType=${options.viewType}&arId=${options.arId}`;
}

export function capitalizeStr(value) {
  if (value.length > 0) {
    return value.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

export function getDesignation({ subNurseType, type }) {
  //return user's designation
  let designation;
  Object.keys(DESIGNATION_TYPE).map((x) => {
    if (
      (subNurseType && DESIGNATION_TYPE[x].id === subNurseType) ||
      DESIGNATION_TYPE[x].id === type
    )
      designation = DESIGNATION_TYPE[x].name;
  });
  return designation;
}

export function getUserNameWithDesignation(
  { type, mergeLFName, homeId, assignedCustomer }
) {
  if (!mergeLFName)
    return '-'
  if (type === USER_TYPE.HOME.NURSE || type === USER_TYPE.HOME.PHYSICIAN) {
    let designationId = '', userType = ''
    if (homeId)
      designationId = homeId?.designationId?.name || ''
    else if (assignedCustomer?.length > 0) {
      designationId = assignedCustomer[0]?.designationId?.name
    }
    if (!designationId) {
      Object.keys(USER_TYPE.HOME).map(x => {
        if (USER_TYPE.HOME[x] === type)
          userType = x.replace(/_/g, ' ')
        return x
      })
    }
    const desig = designationId || userType
    const name = `${capitalizeStr(mergeLFName)}${desig ? ` (${desig.toUpperCase()})` : ''}`
    return name
  }
  return mergeLFName
}

export function getUserName(userData) {
  if (
    userData &&
    typeof userData === "object" &&
    Object.keys(userData).length > 0 &&
    userData.firstName &&
    userData.lastName
  ) {
    let userName = `${userData.lastName}  ${userData.firstName}`;
    if (userData.type && USER_DESIGNATION_TYPE.hasOwnProperty(userData.type)) {
      return `${userName} (${USER_DESIGNATION_TYPE[userData.type]})`;
    } else if (
      userData.subNurseType &&
      USER_DESIGNATION_TYPE.hasOwnProperty(userData.subNurseType)
    ) {
      return `${userName} (${USER_DESIGNATION_TYPE[userData.subNurseType]})`;
    } else {
      return userName;
    }
  }
  return "";
}

export function isCautionAlertNotes(pmrDetail, defaultToDoCategory) {
  if (!pmrDetail) return;
  if (
    (pmrDetail.checkType === MED_REVIEW_TODO_TYPES.NURSE_REVIEW_1 ||
      pmrDetail.checkType === MED_REVIEW_TODO_TYPES.NURSE_REVIEW_2) &&
    pmrDetail.checkType !== MED_REVIEW_TODO_TYPES.PMR &&
    defaultToDoCategory !== pmrDetail.subCategory && //orderlist
    pmrDetail.pmrStatusUpdate &&
    pmrDetail.pmrStatusUpdate.latest &&
    pmrDetail.pmrStatusUpdate.latest.type &&
    pmrDetail.pmrStatusUpdate.latest.type !== MED_REVIEW_TODO_TYPES.PMR
  )
    return true;
  else return false;
}

export function isDrOrNurse(user) {
  // return true if user is Doctor or Nurse
  let type;
  if (typeof user === "object") type = user.type;
  else type = user;
  return type === USER_TYPE.HOME.DOCTOR || type === USER_TYPE.HOME.NURSE;
}

export function getVirtualVisitDueDays(schedule) {
  if (!schedule || !schedule.from || !schedule.to) return "-";
  let days = moment().diff(schedule.to, "days");
  if (days > 0)
    return `Overdue ${Math.abs(days)} ${Math.abs(days) === 1 ? "day" : "days"}`;
  else if (days === 0) return `Due Today`;
  else
    return `Due in ${Math.abs(days)} ${Math.abs(days) === 1 ? "day" : "days"}`;
}

export function getResidentHeightWeight(data) {
  if (
    data.patientInfoId.writiChart &&
    data.patientInfoId.writiChart.length > 0
  ) {
    data.patientInfoId.writiChart.forEach((obj) => {
      if (obj.type === "PatChartDetailReadingType_Weight") {
        data.patientInfoId.weight = obj.unit;
      }
      if (obj.type === "PatChartDetailReadingType_Height") {
        data.patientInfoId.height = obj.unit;
      }
      if (obj.type === "PatChartDetailReadingType_Creatinine") {
        let creatinineUnit = "";
        if (obj.uom === "MicromolesPerLitre") {
          creatinineUnit = "umol/l";
        }
        if (obj.uom === "MilligramsPerDecilitre") {
          creatinineUnit = "mg/dL";
        }
        if (data.chartInfo) {
          data.chartInfo["creatinineUnit"] = creatinineUnit;
        }
      }
    });
  }
  return data;
}

//function for checking feature is accessible for user like digital binder or E-processing
export function isFeatureAccessible(authUser, pModule) {
  let canAccess = false;
  let tempAuth = _.cloneDeep(authUser);
  if (
    tempAuth &&
    tempAuth.permissionGroup &&
    tempAuth.permissionGroup.permissions
  ) {
    let tempPermission = _.cloneDeep(tempAuth.permissionGroup.permissions);
    tempPermission.some((obj) => {
      if (obj.module == pModule + "" && obj.isAllowedFromPanel) {
        canAccess = true;
        return true;
      }
    });
  } else if (tempAuth && !tempAuth.hasOwnProperty("permissionGroup")) {
    canAccess = true;
  }
  return canAccess;
}

export function isViewPermissionAllowed(authUser, pModule) {
  let isAllowed = false;
  let tempAuth = _.cloneDeep(authUser);
  if (
    tempAuth &&
    tempAuth.permissionGroup &&
    tempAuth.permissionGroup.permissions
  ) {
    let tempPermission = _.cloneDeep(tempAuth.permissionGroup.permissions);
    tempPermission.some((obj) => {
      if (obj.module == pModule + "") {
        if (obj.viewPermissionType === PERMISSION_ACCESS_TYPE.DATA) {
          isAllowed = true;
          return true;
        }
      }
    });
  } else if (tempAuth && !tempAuth.hasOwnProperty("permissionGroup")) {
    isAllowed = true;
  }
  return isAllowed;
}

export function setCallDuration(setCall, show) {
  if (!show) {
    clearInterval(timerid);
    return;
  }
  var self = this;
  setCall({ showTimer: true });
  var seconds = 0,
    minutes = 0,
    hours = 0;
  timerid = setInterval(countdown, 1000);

  function countdown() {
    setCall({
      seconds: checkTime(seconds),
      minutes: checkTime(minutes),
      hours: checkTime(hours),
    });
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }
}

export function socketValidity(homeAreaId, authUser, str) {
  // to listen socket for only Assigned Home and Home Area
  if (!homeAreaId || !authUser) return true;
  if (homeAreaId && typeof homeAreaId === "object") homeAreaId = homeAreaId.id;
  // let parentClientele = _.map(authUser.parentClientele, 'id')
  // if (parentClientele.includes(homeAreaId)) {
  let assignedHome;
  if (!str)
    assignedHome = authUser.assignedHomeId.find(
      (x) => x.homeAreaId === homeAreaId
    );
  if (
    (assignedHome && assignedHome.homeId === authUser.homeId) ||
    (str === "home" && homeAreaId === authUser.homeId)
  ) {
    console.log("Valid socket!");
    return true;
  } else {
    console.log("Invalid socket!");
    return false;
  }
  // }
}

export function selectedBodyParts(current) {
  let parentObj = {};
  if (current.selectedBodyParts && current.selectedBodyParts.length) {
    current.selectedBodyParts.forEach((obj) => {
      if (!obj.isDeleted) {
        if (obj.isClickable) {
          let optionList = [];
          obj.optionItems.forEach((option) => {
            optionList.push(option.name);
          });
          parentObj = {
            ...parentObj,
            [obj.label]: {
              items: optionList.join(","),
              isClickable: true,
            },
          };
        } else {
          if (obj.optionItems.length) {
            obj.optionItems.forEach((option) => {
              if (option.radioButtons && option.radioButtons.length) {
                option.radioButtons.forEach((radioOption) => {
                  if (radioOption.optionItems.length) {
                    let optionList = [];
                    radioOption.optionItems.forEach((obj) => {
                      optionList.push(obj.name);
                    });
                    let tempObj = {
                      [radioOption.label]: {
                        optionItems: optionList.join(","),
                        isClickable: false,
                      },
                    };
                    parentObj[obj.label] = parentObj[obj.label]
                      ? {
                        ...parentObj[obj.label],
                        ...tempObj,
                      }
                      : {
                        ...tempObj,
                      };
                  }
                });
              }
            });
          }
        }
      }
    });
  }
  current.selectedOptions = parentObj;
  return current;
}

export default UtilService;

export function getNewTabIndex(data, index) {
  //return new tab index on tabclose
  let newIndex = index;
  if (index === 0) newIndex = 1;
  else if (index === data.length) newIndex = data.length - 2;
  else newIndex++;
  return newIndex;
}

export const UpperCaseStr = (str) => {
  return str.toUpperCase();
};

export const isExcludeTenant = (params) => {
  // show switch home in header
  // @isHome is to check module is Org or Home as both have same module constant
  const { authUser } = params;
  let path = window.location.pathname,
    id,
    isHome = false,
    defaultExclude = false,
    excludeTenant;
  Object.keys(routes).map((x) => {
    if (routes[x].path === path) {
      id = routes[x].module;
      isHome = routes[x].isHome;
      if (routes[x].isCustomer) {
        const query = queryString.parse(window.location.search);
        if (query?.type === "home") {
          // customer home
          defaultExclude = false;
        } else if (query?.type === "homeArea") {
          // customer home area
          defaultExclude = true;
        }
      }
    } else if (routes[x].mainPath) {
      // user module
      let lastIndex = path.lastIndexOf("/");
      let s1 = path.substring(0, lastIndex);
      if (s1 === routes[x].mainPath) {
        id = routes[x].module;
        isHome = routes[x].isHome;
      }
      const query = queryString.parse(window.location.search);
      if (query && query.type === "home") {
        id = routes[x].module;
        isHome = true;
        defaultExclude = true;
      }
    }
  });
  if (!id) return setExcludeTenant(true);

  if (defaultExclude) return setExcludeTenant(false);

  if (id && EXCLUDE_TENANT.includes(id) && !isHome) {
    if (authUser.type === USER_TYPE.HOME.ADMIN && id === MODULE.MASTER) {
      return setExcludeTenant(false);
    }
    return setExcludeTenant(true);
  } else return setExcludeTenant(false);

  function setExcludeTenant(value) {
    localStorage.setItem("excludeTenant", !value);
    return value;
  }
};

export const userLogout = () => {
  clearLocalStorage();
  history.push({
    pathname: routes.login.path,
  });
};

export const clearLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("homeId");
  localStorage.removeItem("homeAreaId");
  localStorage.removeItem("cascader-filter");
  localStorage.removeItem("physician-filter");
  localStorage.removeItem("mappedModulePermissions");
  localStorage.removeItem("rolePemissionModules");
  localStorage.removeItem("tenantId");
  localStorage.removeItem("otpVerified");
  localStorage.removeItem("prescriptions");
  localStorage.removeItem("excludeTenant");
  localStorage.removeItem("mappedSubModulePermissions");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("excludeOTPVerification");
};

export const codeConvert = (string) => {
  let removedCharString = string.replace(/[^\w-+.\\/\s]/g, "");
  removedCharString = removedCharString.trim();
  return removedCharString.replace(/\s+/g, "_").toUpperCase();
};

export const getLFName = (user, marginFlag) => {
  if (!user) return;
  if (!user.firstName && user.mergeLFName) {
    let str = user.mergeLFName.split(",");
    user.lastName = str[0].trim();
    user.firstName = str[1].trim();
    if (!user.lastName || !user.firstName)
      return
  }

  return (
    <div
      style={{
        display: "block",
        height: "35px",
        width: "35px",
        lineHeight: "35px",
        borderRadius: "30px",
        backgroundColor: "#E5E4E2",
        color: "Black",
        textAlign: "center",
        fontSize: "1em",
        marginRight: "8%",
      }}
      className={marginFlag ? "mr-0 user_initial" : "user_initial"}
    >
      {user.lastName.charAt(0).toUpperCase() +
        user.firstName.charAt(0).toUpperCase()}
    </div>
  );
};
