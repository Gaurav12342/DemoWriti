import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Tabs, { TabPane } from "rc-tabs";
import { Button } from "../../../../components/common/index";
import {
  CLIENTELE_TYPE,
  EHR_Integration,
} from "../../../../constants/Customer";
import queryString from "query-string";
import UpsertForm from "./UpsertForm";
import SettingForm from "./SettingForm";
import axios from "../../../../services/api/config";
import { Toast } from "../../../../components/common/Toast";
import {
  homeOrgUpsert,
  getSpecificHomeOrg,
  pharmacyPaginate,
  homeOrgPagination,
  homeOrgUpdate,
  imagingDiagnosticsPaginate,
  homeAreaUpsert,
  getSpecificHomeArea,
  homeAreaUpdate,
} from "../../../../services/api/routes/customer";
import { getAll } from "../../../../services/api/routes/subscription";
import routes from "../../../../routes/constant";
import { createForm } from "rc-form";
import "rc-tabs/assets/index.css";
import { isModuleAccessible, canPerformAction } from "../../../../util/common";
import { MODULE, SUB_MODULE } from "../../../../constants/subscription";
import { da } from "date-fns/locale";
const _ = require("lodash");

function ClienteleTabs(props) {
  const { authUser, form, location, history } = props;
  const [queryData, setQueryData] = useState("");
  const [selectedTab, setSelectedTab] = useState("1");
  const [pharamcy, setPharmacy] = useState([]);
  const [organization, setOrganization] = useState();
  const [imgDia, setImgDia] = useState();
  const [data, setData] = useState({});
  const [editId, setEditId] = useState(undefined);
  const [subscripData, setSubscripData] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [eHR, setEHR] = useState();
  console.log(data.eHR)
  useEffect(() => { if (data) setEHR(data.eHR) }, [data])

  useEffect(() => {
    fetchSubscriptions();
  }, [queryData]);

  useEffect(() => {
    if (editId) getSpecificCustomerData();
    getPharmacy();
    getOrganization();
    getImagingDiagnostics();
  }, [editId]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.type == "organization") {
      setQueryData(CLIENTELE_TYPE.ORGANIZATION);
    } else if (query.type == "home") {
      setQueryData(CLIENTELE_TYPE.HOME);
    } else if (query.type == "homeArea") {
      setQueryData(CLIENTELE_TYPE.HOME_AREA);
    } else {
      setQueryData(query.type);
    }

    if (query.id) {
      setEditId(query.id);
    }
  }, [location]);

  const fetchSubscriptions = async () => {
    if (queryData == CLIENTELE_TYPE.HOME) {
      const { method, url, baseURL } = getAll;
      const data = { sortBy: { createdAt: "DESC" }, where: { isActive: true } };
      let res = await axios({ method, url, data, baseURL });
      if (res) {
        if (res.data.code === "OK") {
          setSubscripData(res.data.data.data);
        } else {
          Toast.error(res.data.message);
        }
      }
    }
  };

  const getPharmacy = () => {
    let { method, url, baseURL } = pharmacyPaginate;
    axios({
      method,
      url,
      baseURL,
      data: {
        query: {
          fields: [],
          sortBy: { createdAt: "DESC" },
          find: editId ? {} : { isActive: true },
        },
      },
    })
      .then((response) => {
        if (response.data.code === "OK") {
          setPharmacy(response.data.data.data);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const getOrganization = () => {
    let { method, url, baseURL } = homeOrgPagination;
    axios({
      method,
      url,
      baseURL,
      data: {
        query: {
          find: {
            type: CLIENTELE_TYPE.ORGANIZATION,
            isActive: true,
          },
        },
      },
    })
      .then((response) => {
        if (response.data.code === "OK") {
          setOrganization(response.data.data.data);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const getImagingDiagnostics = () => {
    let { method, url, baseURL } = imagingDiagnosticsPaginate;
    axios({
      method,
      url,
      baseURL,
      data: { query: { find: { isActive: true } } },
    })
      .then((response) => {
        if (response.data.code === "OK") {
          setImgDia(response.data.data.data);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const getSpecificCustomerData = () => {
    const query = queryString.parse(location.search);
    let { method, url, baseURL } =
      queryData == CLIENTELE_TYPE.HOME_AREA
        ? getSpecificHomeArea
        : getSpecificHomeOrg;
    url = `${url}/${query.id}`;
    axios({
      method,
      url,
      baseURL,
      headers: {
        homeId: authUser.homeId?._id,
        homeIdentifier: authUser.homeId?.homeIdentifier,
        isCustom: true,
      },
    })
      .then((response) => {
        if (response.data.code == "OK") {
          setData(response.data.data);
        } else {
          Toast.error(response.data.message);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const handleClienteleUpsert = (e) => {
    setBtnLoading(true);
    form.validateFields((error, value) => {
      if (!error) {
        let obj = _.clone(value);
        if (eHR) {
          obj.eHR = eHR;
        }
        obj.code =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        // obj.image = "xyz.png";
        obj.type = queryData;
        obj.isActive = true;
        obj.careClause = obj.careClause;
        // obj.krollId = Math.floor(Math.random() * (+10000 + 1 - +1)) + +1;
        obj.pharmacyId = obj.pharmacyId;
        obj.orgId = obj.orgId;
        obj.imagingAndDiagnosticId = obj.imagingAndDiagnosticId;
        if (obj.fax && _.size(obj.fax) > 0) {
          obj.faxes = [{ fax: obj.fax, isPrimary: true }];
          delete obj.fax;
        }

        if (obj) {
          obj.printer = {
            name: obj.printerName,
            machineId: obj.machineId,
          };
        }

        if (obj) {
          obj.mobiles = [
            { mobile: obj.phone, countryCode: "91", isPrimary: true },
          ];
        }
        if (obj) {
          obj.printer = {
            name: obj.printerName,
            machineId: obj.machineId,
          };
        }
        if (obj.email && _.size(obj.email) > 0) {
          obj.emails = [{ email: obj.email, isPrimary: true }];
        }
        if (obj) {
          obj.addresses = [
            {
              isPrimary: true,
              line1: obj.line1,
              line2: obj.line1,
              city: obj.city,
              province: obj.province,
              country: obj.country,
              postalCode: obj.postalCode,
            },
          ];
          delete obj.line1;
          delete obj.line2;
          delete obj.city;
          delete obj.province;
          delete obj.country;
          delete obj.postalCode;
        }
        delete obj.printerName;
        delete obj.machineId;
        delete obj.email;

        let { method, url, baseURL } = editId
          ? queryData == CLIENTELE_TYPE.HOME_AREA
            ? homeAreaUpdate
            : homeOrgUpdate
          : queryData == CLIENTELE_TYPE.HOME_AREA
            ? homeAreaUpsert
            : homeOrgUpsert;
        url = editId ? `${url}/${editId}` : url;
        axios({
          method,
          url,
          baseURL,
          headers: {
            homeId: authUser && authUser.homeId._id,
            homeIdentifier: authUser && authUser.homeId.homeIdentifier,
            isCustom: true,
          },
          data: { ...obj },
        })
          .then((response) => {
            if (response.data.code === "OK") {
              setBtnLoading(false);
              Toast.success(response.data.message);
              handleBackRedirect();
            } else {
              setBtnLoading(false);
              Toast.error(response.data.message);
            }
          })
          .catch((error) => {
            setBtnLoading(false);
            Toast.error(error);
          });
      } else {
        setBtnLoading(false);
        Toast.error("Please fill required fields...!");
      }
    });
  };

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleBackRedirect = (e) => {
    if (queryData == CLIENTELE_TYPE.ORGANIZATION) {
      return history.push(`${routes.clientele.path}?type=organization`);
    } else if (queryData == CLIENTELE_TYPE.HOME) {
      return history.push(`${routes.clientele.path}?type=home`);
    } else if (queryData == CLIENTELE_TYPE.HOME_AREA) {
      return history.push(`${routes.clientele.path}?type=homeArea`);
    } else {
      return null;
    }
    return;
  };

  let settingParams = {
    moduleId: MODULE.ORG_HOME,
    subModuleId: SUB_MODULE.ORG_HOME_SETTING,
  };
  if (queryData === CLIENTELE_TYPE.HOME_AREA) {
    settingParams = {
      moduleId: MODULE.HOMEAREA,
      subModuleId: SUB_MODULE.HOMEAREA_SETTING,
    };
  }

  const onSourceMediumChange = (e) => {
    setEHR(parseInt(e.target.value));
  };

  return (
    <>
      <div className="pmr_wrap">
        <div className="container">
          <div className="page_head">
            <span
              style={{
                marginBottom: "-1%",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              <b>
                {queryData == CLIENTELE_TYPE.ORGANIZATION && editId
                  ? "Edit Organization"
                  : queryData == CLIENTELE_TYPE.ORGANIZATION
                    ? "Add Organization"
                    : null || (queryData == CLIENTELE_TYPE.HOME && editId)
                      ? "Edit Home"
                      : queryData == CLIENTELE_TYPE.HOME
                        ? "Add Home"
                        : null || (queryData == CLIENTELE_TYPE.HOME_AREA && editId)
                          ? "Edit Home Area"
                          : queryData == CLIENTELE_TYPE.HOME_AREA
                            ? "Add Home Area"
                            : null}
              </b>
            </span>

            <Button
              style={{ marginTop: "5px" }}
              size="lg"
              onClick={() => {
                handleBackRedirect();
              }}
            >
              Back
            </Button>
          </div>
          <div className="pmr_list_wrap">
            <div className="patient_order_wrap" style={{ border: "none" }}>
              <Tabs
                defaultActiveKey={selectedTab}
                activeKey={selectedTab}
                className="permission_tab_wrap"
                onChange={handleTabChange}
              >
                <TabPane tab="Basic" key="1" className="resi_treat">
                  <UpsertForm
                    authUser={authUser}
                    onTabChange={handleTabChange}
                    handleUpsert={handleClienteleUpsert}
                    form={form}
                    getPharmacy={pharamcy}
                    organization={organization}
                    editCustomerData={data}
                    imgDia={imgDia}
                    editId={editId}
                    queryData={queryData}
                    handleClienteleRedirect={handleBackRedirect}
                  />
                </TabPane>
                {canPerformAction(settingParams, true) ? (
                  <TabPane tab="Setting" key="2" className="resi_treat">
                    <SettingForm
                      authUser={authUser}
                      onSave={handleClienteleUpsert}
                      queryData={queryData}
                      form={form}
                      editId={editId}
                      loading={btnLoading}
                      subscripData={subscripData}
                      onCancel={handleBackRedirect}
                      editPhamacy={data}
                      eHR={eHR}
                      onSourceMediumChange={onSourceMediumChange}
                    />
                  </TabPane>
                ) : null}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(createForm()(ClienteleTabs));
