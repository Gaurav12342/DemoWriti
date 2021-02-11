import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageHead from "./Components/Header";
import { ActiveDeactive, Toast } from "../../components/common/index";
import Table from "../../components/common/Table/index";
import { USER_TYPE, MAPPED_USER_TYPE } from "../../constants/User";
import { View, Refresh1 } from "../../assets/images/pmr/index";
import { Edit } from "../../assets/images/popup/index";
import UtilService, { isModuleAccessible } from "../../util/common";
import ResetPasswordModal from "./Components/ResetPassword";
import axios from "../../services/api/config";
import routes from "../../routes/constant";
import {
  userPaginate,
  assignHomeOrPharmacy,
  editUser,
} from "../../services/api/routes/user";
import DetailViewModal from "./Components/DetailView";
import SettingModal from "./Components/AddUser/SettingModal";
import { Filters } from "../../assets/images/resident-detail/index";
import {
  resetPassword,
  changePasswordByAdmin,
  assignedHomelist,
} from "../../services/api/routes/auth";
import { isInvalidTokenError, canPerformAction } from "../../util/common";
import { reGenerateToken } from "../../util/RegenToken";
import { MODULE, ACTIONS } from "../../constants/subscription";
import Tooltip from "rc-tooltip";
import { Info } from "../../assets/images/popup";
import { da } from "date-fns/locale";
import HomeList from "./Components/HomeList";
import { pharmacyPaginate } from "../../services/api/routes/customer";
import LoginHistory from "./Components/LoginHistory";

const USER_PATHS = [
  "writi-admin",
  "pharmacy",
  "organizations",
  "home",
  "home-area",
];

const loginUser = {
  type: 2,
};

const ALL_USER_TYPES = {
  [MAPPED_USER_TYPE["writi-admin"]]: [1, 2],
  [MAPPED_USER_TYPE["pharmacy"]]: [21, 22],
  [MAPPED_USER_TYPE["organizations"]]: [3],
  [MAPPED_USER_TYPE["home"]]: [11, 12, 13, 14, 15, 16],
};
const MAPPED_USER_CUSTOMER_MODULE = {
  [MAPPED_USER_TYPE["writi-admin"]]: [],
  [MAPPED_USER_TYPE["pharmacy"]]: [MODULE.USER, MODULE.PHARMACY],
  [MAPPED_USER_TYPE["organizations"]]: [MODULE.USER, MODULE.ORG_HOME],
  [MAPPED_USER_TYPE["home"]]: [MODULE.USER, MODULE.ORG_HOME],
};

const MAPPED_CUSTOMER_MODULE = {
  [MAPPED_USER_TYPE["writi-admin"]]: undefined,
  [MAPPED_USER_TYPE["pharmacy"]]: MODULE.PHARMACY,
  [MAPPED_USER_TYPE["organizations"]]: MODULE.ORG_HOME,
  [MAPPED_USER_TYPE["home"]]: MODULE.ORG_HOME,
};

const initialFilter = {
  page: 1,
  limit: 10,
  find: {},
  sortBy: { createdAt: "DESC" },
  populate: [
    {
      pharmacyId: ["name"]
    },
    {
      orgId: ["name"],
    },
    {
      homeId: ['name', "subscriptionRoleGroup", { subscriptionRoleGroup: ["name"] }],
    },
  ],
};

const defaultPermissions = {
  [ACTIONS.ADD.CODE]: false,
  [ACTIONS.LIST.CODE]: false,
  [ACTIONS.EDIT.CODE]: false,
};

let searchTimeOut;
function UserMain(props) {
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({});
  const [btnLabel, setBtnLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultTab, setDefaultTab] = useState(1);
  const [data, setData] = useState([]);
  const [showDetailView, setShowDetailView] = useState(false);
  const [userData, setUserData] = useState({});
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(
    false
  );
  const [resetPasswordId, setResetPasswordId] = useState(undefined);
  const [userRoleOptions, setUserRoleOptions] = useState([]);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [permission, setPermission] = useState({ ...defaultPermissions });
  const [typeFilter, setTypeFilter] = useState(undefined);
  const [record, setRecord] = useState(null);
  const { form, location, history } = props;
  const { authUser, homeId } = props;
  const [showHomeListModel, setShowHomeListModel] = useState(false);
  const [homeList, setHomeList] = useState([]);
  const [pharmacyData, setPharmacyData] = useState([]);
  const [filterListLoading, setFilterListLoading] = useState(false);
  const [pageName, setPageName] = useState("");
  const [loginHistory, setLoginHistory] = useState([]);
  const [showLoginHistory, setShowLoginHistory] = useState(false);


  useEffect(() => {
    const paths = location.pathname.split("/");
    let label = paths[paths.length - 1];
    if (USER_PATHS.indexOf(label) >= 0) {
      setBtnLabel(label);
      setPageName(label);
    }
    let tempFilter = {
      ...initialFilter,
    };
    setTypeFilter(undefined);
    if (MAPPED_USER_TYPE[label]) {
      tempFilter.find = {
        type: ALL_USER_TYPES[MAPPED_USER_TYPE[label]],
      };
      setFilter({ ...tempFilter });
      setDefaultTab(MAPPED_USER_TYPE[label]);

      createPermissionModule(MAPPED_USER_TYPE[label]);
    } else {
      setFilter({ ...tempFilter });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (Object.keys(filter).length) {
      if (filter.search) {
        if (searchTimeOut) {
          clearTimeout(searchTimeOut);
          searchTimeOut = null;
        }
        searchTimeOut = setTimeout(() => {
          fetch();
        }, 600);
      } else {
        fetch();
      }
    }
  }, [filter]);

  useEffect(() => {
    if (defaultTab) {
      manageRoleOptions();
    }
  }, [defaultTab]);

  const createPermissionModule = (curTab) => {
    let result = { ...defaultPermissions };
    let permissions = {
      [ACTIONS.ADD.CODE]: [
        {
          moduleId: MODULE.USER,
          actiontoCheck: ACTIONS.ADD.CODE,
        },
        {
          moduleId: MAPPED_CUSTOMER_MODULE[curTab],
          actiontoCheck: ACTIONS.ADD.CODE,
        },
      ],
      [ACTIONS.LIST.CODE]: [
        {
          moduleId: MODULE.USER,
          actiontoCheck: ACTIONS.LIST.CODE,
        },
        {
          moduleId: MAPPED_CUSTOMER_MODULE[curTab],
          actiontoCheck: ACTIONS.LIST.CODE,
        },
      ],
      [ACTIONS.EDIT.CODE]: [
        {
          moduleId: MODULE.USER,
          actiontoCheck: ACTIONS.EDIT.CODE,
        },
        {
          moduleId: MAPPED_CUSTOMER_MODULE[curTab],
          actiontoCheck: ACTIONS.EDIT.CODE,
        },
      ],
    };
    Object.keys(permissions).map((key) => {
      permissions[key].forEach((obj) => {
        if (obj.moduleId) {
          result[key] = canPerformAction(obj);
        } else {
          result[key] = true;
        }
      });
    });

    setPermission(result);
  };

  const handleSearch = (e) => {
    if (e.target.value) {
      setFilter({
        ...filter,
        page: 1,
        limit: 10,
        search: {
          keyword: e.target.value,
          keys: ["username", "firstName", "lastName", "emails.email"],
        },
      });
    } else {
      if (filter.search) {
        let tempFilter = filter;
        delete tempFilter["search"];
        setFilter({ ...tempFilter, page: 1, limit: 10 });
      }
    }
  };
  const fetch = () => {
    setLoading(true);
    const { method, url, baseURL } = userPaginate;
    axios({
      method,
      url,
      baseURL,
      data: {
        // query : {...initialFilter},
        query: { ...filter },
        withActiveHomeRolePermissions: true,
      }
      // ,
      // headers: {
      //   homeId: authUser?.homeId._id,
      //   homeIdentifier: authUser?.homeId.homeIdentifier,
      //   isCustom: true,
      // },
    })
      .then(async ({ data }) => {
        setLoading(false);
        handleFetchResponse(data);
      })
      .catch(async (err) => {
        // if (isInvalidTokenError(err)) {
        //     let response = await reGenerateToken({ ...userPaginate, data: { ...filter } })
        //     if (response && response.code && response.code === 'OK') {
        //         handleFetchResponse(response)
        //     }
        // }
        setLoading(false);
      });
  };
  const handleFetchResponse = (data) => {
    if (data.code === "OK") {
      setData(data.data.list);
      setTotal(data.data.count);
    }
  };
  const handleAdd = () => {
    history.push({
      pathname: routes.userAdd.path,
      search: `?type=${btnLabel}`,
    });
  };
  const handleResetPassword = (id) => {
    setResetPasswordModalVisible(true);
    setResetPasswordId(id);
    // form.resetFields();
  };
  const handleSendEmail = (record) => {
    axios
      .post("admin/re-send-email", { id: record.id })
      .then(({ data }) => {
        if (data.code === "OK") {
          Toast.success(data.message);
        } else {
          Toast.error(data.message);
        }
      })
      .catch(function (error) {
        console.log("Error****:", error.message);
      });
  };

  const handleEdit = (record) => {
    const paths = location.pathname.split("/");
    let label = paths[paths.length - 1];
    if (USER_PATHS.indexOf(label) >= 0) {
      history.push({
        pathname: routes.userAdd.path,
        search: `?id=${record._id}&type=${label}&isEdit=${true}`,
      });
    }
  };
  const manageRoleOptions = () => {
    let userRoleOptions = [];
    Object.keys(USER_TYPE).forEach((key) => {
      Object.keys(USER_TYPE[key]).forEach((subkey) => {
        if (USER_TYPE[key][subkey] === defaultTab) {
          Object.keys(USER_TYPE[key]).forEach((k) => {
            userRoleOptions.push({ text: k, value: USER_TYPE[key][k] });
          });
        }
      });
    });
    setUserRoleOptions(userRoleOptions);
  };

  const handleDetailView = (action, data) => {
    setShowDetailView(action);
    setUserData(data);
  };
  const handleActiveDeactive = (rec) => {
    let tempData = data.map((obj) => {
      if (obj._id === rec._id) {
        obj.isActive = rec.isActive;
      }
    });
    setData(data);
  };

  const handleHomeListPopup = (flag, record) => {
    const { url } = assignedHomelist;
    axios({
      ...assignedHomelist,
      url: `${url}/${record._id}`,
    })
      .then(({ data }) => {
        if (data?.code === "OK") {
          setHomeList(data?.data);
          setShowHomeListModel(true);
        } else {
          Toast.error(data.message);
        }
      })
      .catch(() => {
        Toast.error(data.message);
      });
  };
  const onHomeListClose = () => {
    setShowHomeListModel(false);
  };

  const handleLoginHistoryPopup = (record) => {
    setLoginHistory(record.loginHistory);
    setShowLoginHistory(true);
  };

  const handleLoginHistoryPopupClose = () => {
    setShowLoginHistory(false);
  };




  const columns = [
    {
      title: "Sr.No",
      keyword: "index",
      dataIndex: "index",
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    {
      title: "Name",
      dataIndex: "lastName",
      render: (text, record) => (
        <span>
          {text || " "}
          {", "}
          {record.firstName || " "}
        </span>
      ),
      sorter: (a, b) => a.firstName - b.firstName,
    },
    {
      title: "Pharmacy Name",
      dataIndex: "pharmacyId",
      render: (text, record) => (
        <span>{text && text.name ? text.name : " "}</span>
      ),
    },
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => <span>{text || " "}</span>,
    },
    {
      title: "Email",
      dataIndex: "emails",
      render: (text) => (
        <span>{UtilService.getPrimaryValue(text, "email")}</span>
      ),
    },
    {
      title: "Phone No.",
      dataIndex: "mobiles",
      render: (text) => (
        <span>{UtilService.getPrimaryValue(text, "mobile")}</span>
      ),
    },
    // {
    //     title: defaultTab === CLIENTELE_TYPE.HOME ? 'Home' : 'Home',
    //     dataIndex: 'homeId',
    //     className: ([USER_TYPE.ADMIN.GENERAL, USER_TYPE.ADMIN.SUPER].indexOf(defaultTab) < 0) ? (defaultTab === CLIENTELE_TYPE.HOME || defaultTab === CLIENTELE_TYPE.HOME_AREA) ? '' : 'hideColumn' : 'hideColumn',
    //     render: (text, record) => (
    //         <span>
    //             {
    //                 text && text.name ? text.name : ' '
    //             }
    //         </span>
    //     )
    // },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => (
        <span>
          {text
            ? Object.keys(USER_TYPE).map((k) => {
              return Object.keys(USER_TYPE[k]).map((sk, i) => {
                return USER_TYPE[k][sk] === text ? (
                  <span key={i + "" + sk} className="o_status submitted">
                    {" "}
                    {sk.replace(/_/g, " ")}
                  </span>
                ) : null;
              });
            })
            : null}
        </span>
      ),
      // filters:userRoleOptions,
      // onFilter: (value, record) => record.type === value,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (text, record) => (
        <span>
          <ActiveDeactive
            record={record}
            {...record.activeDeactiveProps}
            isActive={record.isActive}
            API={editUser}
            model="user"
            documentId={record._id}
            loginUser={authUser}
            onActiveDeactive={handleActiveDeactive}
          />
        </span>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "De-active", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Action",
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className="actions">
            <div onClick={() => handleDetailView(true, record)}>
              <View />
              <p>Info</p>
            </div>
            {authUser &&
              [
                USER_TYPE.HOME.ADMIN,
                USER_TYPE.ADMIN.SUPER,
                USER_TYPE.ADMIN.GENERAL,
                USER_TYPE.PHARMACY.ADMIN,
              ].indexOf(authUser.type) ? (
                <div
                  className="refresh"
                  onClick={() => handleResetPassword(record.id)}
                >
                  <Refresh1 />
                  <p>Reset Pass</p>
                </div>
              ) : null}
            {/* {
                            isModuleAccessible(MAPPED_USER_CUSTOMER_MODULE[defaultTab], true) &&
                                permission[ACTIONS.EDIT.CODE] ?
                                <div onClick={() => handleEdit(record)}>
                                    <Edit />
                                    <p>Edit</p>
                                </div> : null
                        } */}
            <div onClick={() => handleEdit(record)}>
              <Edit />
              <p>Edit</p>
            </div>

            {[USER_TYPE.HOME.ADMIN, USER_TYPE.PHARMACY.ADMIN].includes(
              authUser?.type
            ) &&
              ![USER_TYPE.HOME.ADMIN, USER_TYPE.PHARMACY.ADMIN].includes(
                record.type
              ) ? (
                <div onClick={() => handleSetting(true, record)}>
                  <Filters />
                  <p> {record?.homeId?.subscriptionRoleGroup?._id ? 'Change' : 'Assign'} Role Permission</p>
                </div>
              ) : null}

            {(authUser &&
              [
                USER_TYPE.HOME.ADMIN,
                USER_TYPE.ADMIN.SUPER,
                USER_TYPE.ADMIN.GENERAL,
                USER_TYPE.PHARMACY.ADMIN,
              ].indexOf(authUser.type) > 0 && location.pathname === "/user/home" ) ? (
                <div onClick={() => handleHomeListPopup(true, record)}>
                  <Tooltip overlay={"Assigned Home List"} placement="top">
                    <Info
                      style={{
                        marginTop: "-4px",
                        cursor: "pointer",
                        height: "20px",
                        width: "20px",
                      }}
                      
                    />
                  </Tooltip>
                  <p>Home List</p>
                </div>
              ) : null}

            {authUser &&
              [
                USER_TYPE.HOME.ADMIN,
                USER_TYPE.ADMIN.SUPER,
                USER_TYPE.ADMIN.GENERAL,
                USER_TYPE.PHARMACY.ADMIN,
              ].indexOf(authUser.type) > 0 ? (
                <div onClick={() => handleLoginHistoryPopup(record)}>
                  <Tooltip overlay={"Assigned Home List"} placement="top">
                    <Info
                      style={{
                        marginTop: "-4px",
                        cursor: "pointer",
                        height: "20px",
                        width: "20px",
                      }}
                      onClick={() => console.log("")}
                    />
                  </Tooltip>
                  <p>Login History</p>
                </div>
              ) : null}

            {/* <div onClick={() => test(record)}>
                            <Edit />
                            <p>Mail</p>
                        </div> */}
          </div>
        </>
      ),
    },
  ];
  const getColumns = () => {
    if (location.pathname === "/user/pharmacy") {
      return columns;
    } else {
      return columns.filter((c) => {
        if (c.dataIndex !== "pharmacyId") {
          return c;
        }
      });
    }
  };

  const handleSetting = (visible, record, res) => {
    setVisibleSetting(visible);
    setRecord(record);
    if (res) {
      fetch();
    }
  };

  const handleTypeFilter = (val) => {
    let tempFilter = {
      ...filter,
      page: 1,
    };
    tempFilter.find = {
      ...tempFilter.find,
      type: val ? [val] : ALL_USER_TYPES[defaultTab],
    };
    setTypeFilter(val);
    setFilter(tempFilter);
  };
  const handleTableChange = (pagination, tfilter, sorter) => {
    let tempFilter = filter;
    tempFilter = {
      ...tempFilter,
      page: pagination.current,
      limit: pagination.pageSize,
    };
    if (tfilter && Object.keys(tfilter).length) {
      Object.keys(tfilter).map((k) => {
        if (tfilter[k] && tfilter[k].length > 0) {
          tempFilter.find = {
            ...tempFilter.find,
            [k]: tfilter[k],
          };
          tempFilter.page = pagination.current;
        } else {
          delete tempFilter["find"][k];
        }
      });
    } else {
      tempFilter.find = {
        type: tempFilter.find.type,
      };
    }
    setFilter(tempFilter);
  };
  const handleResetSetPassword = (newPassword) => {
    if (newPassword) {
      axios({
        ...changePasswordByAdmin,
        data: {
          password: newPassword,
          userId: authUser._id,
        },
      }).then(({ data }) => {
        if (data.code === "OK") {
          Toast.success("Password Updated Successfully");
          setResetPasswordModalVisible(false);
        }
      });
    }
  };

  const handleUnassignUser = (data) => {
    if (data?._id) {
      axios({
        ...assignHomeOrPharmacy,
        data: {
          is_assign: false,
          homeId: data.homeId._id,
          userId: data._id,
        },
      })
        .then(({ data }) => {
          if (data.code === "OK") {
            Toast.success(data.message);
            setShowDetailView(false);
            fetch();
          }
        })
        .catch((err) => {
          Toast.error("Something went wrong try Again ");
        });
    }
  };

  const handleResetPasswordCancel = () => {
    setResetPasswordModalVisible(false);
  };
  useEffect(() => {
    setFilterListLoading(true);
    const pharmacyFilter = {
      fields: ["name"],
    };
    axios({ ...pharmacyPaginate, data: { query: pharmacyFilter } })
      .then((data) => {
        if (data.data.code === "OK") {
          setPharmacyData(data.data.data.data);
        } else {
          Toast.error(data.data.message);
          setFilterListLoading(true);
        }
        setFilterListLoading(false);
      })
      .catch((err) => {
        setFilterListLoading(false);
        Toast.error(err);
      });
  }, []);
  const onPharmacyFilterChange = (pharmacyId) => {
    const tempFilter = { ...filter };
    tempFilter.find = { ...tempFilter.find, pharmacyId };
    setFilter(tempFilter);
  };
  return (
    <div className="pmr_wrap">
      <div className="container">
        <PageHead
          placeholder={"Select Pharmacy"}
          total={total}
          onSearch={handleSearch}
          btnLabel={btnLabel}
          typeFilter={typeFilter}
          onTypeFilter={handleTypeFilter}
          form={form}
          defaultTab={defaultTab}
          onAdd={handleAdd}
          MAPPED_USER_CUSTOMER_MODULE={MAPPED_USER_CUSTOMER_MODULE}
          loginUser={loginUser}
          filter={filter}
          permission={permission}
          userRoleOptions={userRoleOptions}
          pharmacyData={pharmacyData}
          filterListLoading={filterListLoading}
          onPharmacyFilterChange={onPharmacyFilterChange}
          pageName={pageName}
          authUser={authUser}
        />
        {/* {
                isModuleAccessible(MAPPED_USER_CUSTOMER_MODULE[defaultTab], true) &&
                    permission[ACTIONS.LIST.CODE] ? */}
        <Table
          columns={getColumns()}
          datasource={data}
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            current: filter.page,
            pageSize: filter.limit,
            total: total,
          }}
        />
        {/* : null
            } */}
      </div>
      {showDetailView ? (
        <DetailViewModal
          visible={showDetailView}
          data={userData}
          onUnassignUser={handleUnassignUser}
          onCancel={() => handleDetailView(false, null)}
        />
      ) : null}
      {visibleSetting ? (
        <SettingModal
          visible={visibleSetting}
          detail={record}
          homeId={homeId}
          authUser={authUser}
          onCancel={(res) => handleSetting(false, null, res)}
        />
      ) : null}
      {resetPasswordModalVisible ? (
        <ResetPasswordModal
          visible={resetPasswordModalVisible}
          onCancel={handleResetPasswordCancel}
          onResetSetPassword={handleResetSetPassword}
        />
      ) : null}
      {showHomeListModel && (
        <HomeList
          visible={showHomeListModel}
          data={homeList}
          onCancel={onHomeListClose}
        />
      )}
      {showLoginHistory && (
        <LoginHistory
          visible={showLoginHistory}
          data={loginHistory}
          onCancel={handleLoginHistoryPopupClose}
        />
      )}
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
export default connect(mapStateToProps)(UserMain);
