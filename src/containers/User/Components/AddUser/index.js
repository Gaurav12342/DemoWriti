import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { createForm } from "rc-form";
import {
  addUser,
  editUser,
  searchExistingUser,
  assignHomeOrPharmacy,
} from "../../../../services/api/routes/user";
import { masterPaginate } from "../../../../services/api/routes/master";
import { USER_TYPE, MAPPED_USER_TYPE } from "../../../../constants/User";
import axios from "../../../../services/api/config";
import AddUser from "./AddUser";
import {
  pharmacyPaginate,
  OrganizationHomePaginate,
} from "../../../../services/api/routes/customer";
import { Toast } from "../../../../components/common";
import routes from "../../../../routes/constant";
import { reGenerateToken } from "../../../../util/RegenToken";
import { CLIENTELE_TYPE } from "../../../../constants/Customer";
import { isInvalidTokenError } from "../../../../util/common";
import { isPharmacyUser } from '../../../../constants/User'

const _ = require("lodash");
const loginUser = { type: 1 };
function AddUserMain(props) {
  const [type, setType] = useState(undefined);
  const [selectedType, setSelectedType] = useState(undefined);
  const [customerType, setCustomerType] = useState(undefined);
  const [userRoleOptions, setUserRoleOptions] = useState({});
  const [subParentList, setSubParentList] = useState([]);
  const [showUploader, setShowUploader] = useState(false);
  const [organizationList, setOrganizationList] = useState([]);
  const [homeList, setHomeList] = useState([]);
  const [pharmacyList, setPharmacyList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [editId, setEditId] = useState();
  const [designationData, setDesignationData] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [existingUserId, setExistingUserId] = useState(undefined);
  const [profilePic, setProfilePic] = useState("");
  const [accessPermission, setAccessPermission] = useState(undefined);
  const [editData, setEditData] = useState({});
  const { location, form, authUser, homeId, history } = props;



  const pharmacyId =
    authUser?.type === USER_TYPE.PHARMACY.ADMIN
      ? authUser?.pharmacyId?._id
      : undefined;


  useEffect(() => {
    if (location.search) {
      const query = queryString.parse(location.search);
      if (query.type) {
        setType(query.type);
        setSelectedType(MAPPED_USER_TYPE[query.type]);
        setCustomerType(MAPPED_USER_TYPE[query.type]);
      }
      if (query.isEdit) {
        setIsEdit(query.isEdit);
      }
      if (query.id) {
        setEditId(query.id);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (customerType && Object.keys(userRoleOptions).length === 0) {
      manageRoleOptions();
    }
    if (customerType === USER_TYPE.HOME.ADMIN) {
      fetchDesignation();
    }
  }, [customerType]);

  useEffect(() => {
    if (isEdit) {
      fetchEditData();
    }
  }, [isEdit]);

  const fetchEditData = () => {
    if (editId) {
      let editApi = addUser.url + "/" + editId;
      axios({
        url: editApi,
        method: 'GET',
        baseURL: addUser.baseURL,
        headers: {
          homeId: authUser.homeId?._id,
          homeIdentifier: authUser.homeId?.homeIdentifier,
          isCustom: true,
        }
      }).then(
        ({ data }) => {
          let tempData = data.data;
          if (tempData) {
            setEditData(tempData);
            setSelectedType(tempData.type);
            const mobileData = _.find(tempData.mobiles, { isPrimary: true });
            let mobile;
            if (mobileData?.mobile.startsWith("+1")) {
              mobile = mobileData?.mobile.substring(2, mobileData?.mobile.length);
            } else {
              mobile = mobileData?.mobile
            }

            let value = {
              ...tempData,
              emails:
                tempData?.emails && tempData.emails.length
                  ? tempData.emails[0].email
                  : "",
              mobiles: mobile,
              // mobiles: tempData?.mobiles && tempData.mobiles.length ? tempData.mobiles[0].mobile.slice(2) : '',
              subscriptionRoleGroup:
                tempData.homeId?.subscriptionRoleGroup?._id,
              designationId: tempData.homeId?.designationId?._id,
            };
            form.setFieldsValue(value);
          }
        }
      );
    }
  };
  const fetchData = () => {
    fetchPharmacy();
    const request = {
      type: CLIENTELE_TYPE.ORGANIZATION,
    };
    fetchOrganizationAndHomes(CLIENTELE_TYPE.ORGANIZATION, request);
  };
  const fetchDesignation = () => {
    if (Object.keys(designationData).length === 0) {
      let data = {
        query: {
          // select: "parentId code name isActive description slug _id updatedAt createdAt",
          find: {
            isActive: true,
            code: "DESIGNATION_TYPE",
          },
          populate: [
            {
              subMaster: null,
              match: { isActive: true },
            },
          ],
        },
      };
      axios({ ...masterPaginate, data }).then(({ data }) => {
        if (data.code === "OK") {
          if (data?.data?.data?.length > 0) {
            if (
              data.data.data[0].subMaster &&
              data.data.data[0].subMaster.length
            ) {
              setDesignationData(data.data.data[0].subMaster);
            }
          }
        }
      });
    }
  };
  const fetchPharmacy = () => {
    const { method, url, baseURL } = pharmacyPaginate;
    axios({
      url,
      method,
      baseURL,
      data: {
        query: {
          find: {
            isActive: true,
          },
        },
      },
    }).then(({ data }) => {
      if (data.code == "OK") {
        if (data?.data?.data?.length) {
          data.data.data = data.data.data.filter((obj) => obj.isActive);
          setPharmacyList(data.data.data);
        }
      }
    });
  };
  const fetchOrganizationAndHomes = (isFor, request = {}) => {
    const { method, url, baseURL } = OrganizationHomePaginate;
    axios({
      url,
      method,
      data: {
        query: {
          ...request,
          find: { type: CLIENTELE_TYPE.ORGANIZATION, isActive: true },
        },
      },
      baseURL,
    }).then(({ data }) => {
      if (data.code == "OK") {
        if (isFor === CLIENTELE_TYPE.ORGANIZATION) {
          setOrganizationList(data.data.data);
        } else if (isFor === USER_TYPE.HOME.ADMIN) {
          data.data.data = data.data.data.filter((obj) => obj.isActive);
          setHomeList(data.data.data);
        }
      }
    });
  };

  const manageRoleOptions = () => {
    let userRoleOptions = {};
    Object.keys(USER_TYPE).forEach((key) => {
      Object.keys(USER_TYPE[key]).forEach((subkey) => {
        if (USER_TYPE[key][subkey] === customerType) {
          userRoleOptions[key] = _.cloneDeep(USER_TYPE[key]);
          if (USER_TYPE[key][subkey] === USER_TYPE.ADMIN.SUPER) {
            delete userRoleOptions[key][subkey];
          }
        }
      });
    });
    setUserRoleOptions(userRoleOptions);
    if (customerType === USER_TYPE.ADMIN.SUPER) {
      form.setFieldsValue({ type: USER_TYPE.ADMIN.GENERAL });
    } else {
      form.setFieldsValue({ type: customerType });
    }
  };
  const handleUploaderChange = (action) => {
    setShowUploader(action);
  };
  const handleAddUser = () => {
    form.validateFields((error, value) => {
      if (error && !existingUserId) {
        return;
      }
      setBtnLoading(true);

      let { method, url, baseURL } = existingUserId
        ? assignHomeOrPharmacy
        : isEdit
          ? editUser
          : addUser;
      if (existingUserId) {
        value = {
          is_assign: true,
          homeId: homeId,
          userId: existingUserId,
        };
      } else {
        value = {
          ...value,
          emails: value.emails
            ? [{ email: value.emails, isPrimary: true }]
            : null,
          mobiles: value.mobiles
            ? [{ mobile: '+1' + value.mobiles, isPrimary: true }]
            : null,
          homeId: homeId,
          // subscriptionRoleGroup: "5f6314e009a7353d9848652c",
          // subscriptionRoleGroup: accessPermission,
        };
      }
      if (
        [USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL].indexOf(
          customerType
        ) >= 0
      ) {
        delete value.homeId;
      }
      if (profilePic) {
        value.image = profilePic
      }
      if (customerType === USER_TYPE.HOME.ADMIN) {
        value.homeId = homeId;
      }
      if (customerType === USER_TYPE.PHARMACY.ADMIN) {
        value.pharmacyId = isPharmacyUser(authUser?.type) ? pharmacyId : value.pharmacyId;
        // value.pharmacyId
        delete value.homeId
      }
      if (isEdit) {
        url = url + editId;
      } else {
        value.defaultPassword = true;
      }

      axios({ method, url, baseURL, data: { ...value } })
        .then(({ data }) => {
          setBtnLoading(false);
          if (data.code === "OK") {
            pushListingRoute();
          }
        })
        .catch((err) => setBtnLoading(false));
    });
  };
  const pushListingRoute = () => {
    let mappedRoutes = {
      [USER_TYPE.HOME.ADMIN]: routes.userHome.path,
      [USER_TYPE.PHARMACY.ADMIN]: routes.userPharmacy.path,
      [USER_TYPE.ORGANIZATION.ADMIN]: routes.userOrganization.path,
      [USER_TYPE.ADMIN.SUPER]: routes.userAdmin.path,
    };
    if (mappedRoutes[customerType]) {
      history.push({
        pathname: mappedRoutes[customerType],
      });
    }
  };
  const handleSearchUser = (data) => {
    if (data.code === "OK") {
      Toast.success(data.message);
      let tData = _.cloneDeep(data.data);
      setExistingUserId(tData._id);
      setSelectedType(tData.type);
      let value = {
        ...tData,
        emails:
          tData.emails && tData.emails.length ? tData.emails[0].email : "",
        mobiles:
          tData.mobiles && tData.mobiles.length ? tData.mobiles[0].mobile : "",
      };
      if (profilePic) {
        value.image = profilePic;
      }
      form.setFieldsValue(value);
      setIsDisable(true);
    }
  };
  const handleFindSerialNo = () => {
    let username = form.getFieldValue("findUser");
    if (username) {
      axios({
        ...searchExistingUser,
        data: {
          search: username,
          filter: {
            find: {
              type: [
                USER_TYPE.HOME.NURSE,
                USER_TYPE.HOME.ADMIN,
                USER_TYPE.HOME.OTHER,

                USER_TYPE.HOME.STAFF,

                USER_TYPE.HOME.TECH,

                USER_TYPE.HOME.PHYSICIAN,
              ],
            },
          },
        },
      })
        .then(({ data }) => {
          handleSearchUser(data);
        })
        .catch(async (err) => {
          console.log(
            "TCL: handleFindSerialNo -> isInvalidTokenError(err)",
            isInvalidTokenError(err)
          );
          if (isInvalidTokenError(err)) {
            console.log("isInvalidTokenError(err)", isInvalidTokenError(err));
            let response = await reGenerateToken({
              ...searchExistingUser,
              data: {
                search: username,
              },
            });
            if (response && response.code === "OK") {
              handleSearchUser(response);
            }
            console.log("TCL: handleFindSerialNo -> reqsonse", response);
          }
        });
    }
  };
  const handleChangeUserType = (val) => {
    if (val) {
      setSelectedType(val);
    }
  };
  const handlePharmacyChange = (val) => {
    if (val) {
      form.setFieldsValue("pharmacyId", val);
      let request = {
        query: {
          find: {
            parentPharmacyId: val,
          },
        },
      };
      fetchOrganizationAndHomes(CLIENTELE_TYPE.ORGANIZATION, request);
    }
  };
  const handleUserNameChange = (e) => {
    if (!e.target.value && isDisable) {
      clearForm();
    }
  };
  const handleCancel = () => {
    pushListingRoute();
  };
  const clearForm = () => {
    form.setFieldsValue({
      firstName: "",
      lastName: "",
      emails: "",
      mobiles: "",
      designationId: undefined,
      pharmacyId: undefined,
      organizationId: undefined,
      licenceNo: "",
      type: customerType,
    });
    setSelectedType(customerType);
    setIsDisable(false);
  };
  const handleSetUserPermission = (val) => {
    setAccessPermission(val);
  };
  const handleUploader = (action, uploadedData) => {
    if (uploadedData && uploadedData.data && uploadedData.data.length) {
      uploadedData.data.some((obj) => {
        if (obj.path) {
          setProfilePic(obj.path);
          return true;
        }
      });
    }
    setUploadVisible(action);
  };
  return (
    <div>
      <AddUser
        form={form}
        type={type}
        userRoleOptions={userRoleOptions}
        userSelectedType={selectedType}
        customerType={customerType}
        loginUser={loginUser}
        subParentList={subParentList}
        homeList={homeList}
        pharmacyList={pharmacyList}
        organizationList={organizationList}
        onUploaderChange={handleUploaderChange}
        showUploader={showUploader}
        designationData={designationData}
        changeUserType={handleChangeUserType}
        onAddUser={handleAddUser}
        onFindSerialNo={handleFindSerialNo}
        btnLoading={btnLoading}
        onPharmacyChange={handlePharmacyChange}
        onUserNameChange={handleUserNameChange}
        isDisable={isDisable}
        onsetUserPermission={handleSetUserPermission}
        onCancel={handleCancel}
        isEdit={isEdit}
        onUploadAction={handleUploader}
        authUser={authUser}
        isUploadVisible={isUploadVisible}
        editData={editData}
      />
    </div>
  );
}
const mapStateToProps = ({ auth }) => {
  const { authUser, homeId } = auth;
  return {
    authUser,
    homeId,
  };
};
const Form = createForm()(AddUserMain);
export default connect(mapStateToProps)(Form);
