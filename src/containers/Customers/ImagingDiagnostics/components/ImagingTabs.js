import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { createForm } from "rc-form";
import Tabs, { TabPane } from "rc-tabs";
import UpsertForm from "./UpsertForm";
import SettingForm from "../../Clientele/components/SettingForm";
import {
  getSpecificImagingDiagnostics,
  imagingDiagnosticsUpsert,
  imagingDiagnosticsUpdate,
} from "../../../../services/api/routes/customer";
import { Button } from "../../../../components/common/index";
import { fileUpload } from "../../../../services/api/routes/common";
import axios from "../../../../services/api/config";
import { getAll } from "../../../../services/api/routes/subscription";
import { Toast } from "../../../../components/common/Toast";
import routes from "../../../../routes/constant";
import "rc-tabs/assets/index.css";
import Uploader, {
  FILE_CATEGORY,
  FILE_TYPES,
} from "../../../../components/common/Upload/Uploader";

import { MODULE, SUB_MODULE } from "../../../../constants/subscription";
import { canPerformAction } from "../../../../util/common";
import { CLIENTELE_TYPE } from "../../../../constants/Customer";

const _ = require("lodash");

const ImagingTabs = (props) => {
  const { form } = props;
  const { validateFields } = form;
  const [getData, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("1");
  const [subscripData, setSubscripData] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const [logoVisible, setLogoVisible] = useState(false);
  const [logoData, setLogoData] = useState(undefined);

  const [xrayVisible, setXrayVisible] = useState(false);
  const [xrayData, setXrayData] = useState(undefined);

  const [ultrasoundVisible, setUltrasoundVisible] = useState(false);
  const [ultrasoundData, setsetUltrasoundData] = useState(undefined);

  useEffect(() => {
    fetchSubscritions();
  }, []);

  useEffect(() => {
    if (props.match.params.id) {
      getImagingDiagnostics();
    }
  }, [props.match.params.id]);

  const fetchSubscritions = () => {
    let { method, url, baseURL } = getAll;
    const data = { sort: { createdAt: "DESC" }, where: { isActive: true } };
    axios({ method, url, baseURL, data })
      .then((response) => {
        if (response.data.code === "OK") {
          setSubscripData(response.data.data.data);
        } else {
          Toast.error(response.data.message);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleAddImaging = () => {
    setBtnLoading(true);
    validateFields((error, value) => {
      if (!error) {
        let obj = _.clone(value);
        obj.image = logoData;
        if (obj) {
          obj.imagingDiagnosticJSON = {
            ultrasound: ultrasoundData,
            xray: xrayData,
          };
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
        if (obj.fax && _.size(obj.fax) > 0) {
          obj.faxes = [{ fax: obj.fax, isPrimary: true }];
        }
        if (obj) {
          obj.mobiles = [
            {
              mobile: obj.phone,
              countryCode: "91",
              isPrimary: true,
            },
          ];

          obj.addresses = [
            {
              isPrimary: true,
              line1: obj.line1,
              line2: obj.line2,
              city: obj.city,
              province: obj.province,
              country: obj.country,
              postalCode: obj.postalCode,
            },
          ];
        }
        delete obj.line1;
        delete obj.line2;
        delete obj.postalCode;
        delete obj.province;
        delete obj.country;
        delete obj.city;
        delete obj.email;
        delete obj.fax;
        delete obj.ultrasound;
        delete obj.xray;
        delete obj.file;
        delete obj.printerName;
        delete obj.machineId;

        if (
          (!ultrasoundData && !xrayData) ||
          (ultrasoundData && !xrayData) ||
          (!ultrasoundData && xrayData)
        ) {
          setBtnLoading(false);
          Toast.error(
            `plz upload ${
            !ultrasoundData
              ? "ultrasoundData"
              : !xrayData
                ? "xrayData"
                : "Plz upload files."
            } file`
          );
        } else {
          let { method, url, baseURL } = getData._id
            ? imagingDiagnosticsUpdate
            : imagingDiagnosticsUpsert;
          url = getData && getData._id ? `${url}/${getData._id}` : url;
          axios({ method, url, baseURL, data: obj })
            .then((response) => {
              if (response && response.data.code === "OK") {
                setBtnLoading(false);
                Toast.success(response.data.message);
                props.history.push(routes.imagingDiagnostics.path);
              }
            })
            .catch((error) => {
              setBtnLoading(false);
              Toast.error(error);
            });
        }
      } else {
        setBtnLoading(false);
        Toast.error("Please fill required fields...!");
      }
    });
  };

  const getImagingDiagnostics = () => {
    let { method, url, baseURL } = getSpecificImagingDiagnostics;
    url = `${url}/${props.match.params.id}`;
    axios({ method, url, baseURL })
      .then((response) => {
        if (response.data.code == "OK") {
          let path = response.data.data;
          setLogoData(path ? path.image : undefined);
          setsetUltrasoundData(
            path ? path.imagingDiagnosticJSON.ultrasound : undefined
          );
          setXrayData(path ? path.imagingDiagnosticJSON.xray : undefined);
          setData(response.data.data);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const handleBackRedirect = () => {
    props.history.push(routes.imagingDiagnostics.path);
  };

  const isEdit = !!props.match.params.id;

  let settingParams = {
    moduleId: MODULE.IMAGING_DIAGNOSIS,
    subModuleId: SUB_MODULE.IMAGING_DIAGNOSIS_SETTING,
  };
  const hasSettingPermission = canPerformAction(settingParams, true);

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
                {props.match.params.id ? "Edit" : "Add"} Imaging &amp;
                Diagnostics
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
                    onLogoData={logoData}
                    onLogoVisible={() => {
                      setLogoVisible(true);
                    }}
                    onXrayVisible={() => {
                      setXrayVisible(true);
                    }}
                    onUltraSoundVisible={() => {
                      setUltrasoundVisible(true);
                    }}
                    form={form}
                    onSave={handleAddImaging}
                    editImagningDiagnostics={getData ? getData : null}
                    onTabChange={handleTabChange}
                    editId={props.match.params.id}
                    onCancel={handleBackRedirect}
                  />
                </TabPane>
                {!!hasSettingPermission && (
                  <TabPane tab="Setting" key="2" className="resi_treat">
                    <SettingForm
                      form={form}
                      loading={btnLoading}
                      onSave={handleAddImaging}
                      editId={props.match.params.id}
                      onCancel={handleBackRedirect}
                      subscripData={subscripData}
                      onXrayVisible={() => {
                        setXrayVisible(true);
                      }}
                      onUltraSoundVisible={() => {
                        setUltrasoundVisible(true);
                      }}
                      queryData={CLIENTELE_TYPE.IMAGING_DIAGNOSTIC}
                      xrayData={xrayData}
                      ultrasoundData={ultrasoundData}
                    />
                  </TabPane>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {logoVisible && (
        <Uploader
          visible={logoVisible}
          onRequestClose={() => setLogoVisible(false)}
          multiple={false}
          allowedTypes={FILE_TYPES.IMAGE}
          uploadUrl={{ ...fileUpload }}
          // defaultList={
          //   getData?._id ? [getData?.image ? getData.image : null] : null
          // }
          extraData={{
            isUploadToS3: true,
            category: [FILE_CATEGORY.IMAGE].join(","),
          }}
          maxSizeInMB={1}
          onError={(err) => {
            Toast.error(err);
          }}
          onSuccess={(uploaded) => {
            if (uploaded.code === "OK") {
              uploaded &&
                uploaded.data &&
                uploaded.data.length &&
                uploaded.data.map((data) => {
                  return setLogoData(data.path);
                });
              setLogoVisible(false);
            }
          }}
        />
      )}
      {xrayVisible && (
        <Uploader
          visible={xrayVisible}
          onRequestClose={() => setXrayVisible(false)}
          multiple={false}
          defaultList={
            getData?._id ? [getData.imagingDiagnosticJSON?.xray] : null
          }
          uploadUrl={{ ...fileUpload }}
          allowedTypes={FILE_TYPES.JSON}
          extraData={{
            isUploadToS3: true,
            category: [FILE_CATEGORY.JSON].join(","),
          }}
          maxSizeInMB={1}
          onError={(err) => {
            Toast.error(err);
          }}
          onSuccess={(uploaded) => {
            if (uploaded.code === "OK") {
              uploaded &&
                uploaded.data &&
                uploaded.data.length &&
                uploaded.data.map((data) => {
                  return setXrayData(data.path);
                });
              setXrayVisible(false);
            }
          }}
        />
      )}
      {ultrasoundVisible && (
        <Uploader
          visible={ultrasoundVisible}
          onRequestClose={() => setUltrasoundVisible(false)}
          multiple={false}
          uploadUrl={{ ...fileUpload }}
          defaultList={
            getData?._id ? [getData.imagingDiagnosticJSON?.ultrasound] : null
          }
          allowedTypes={FILE_TYPES.JSON}
          extraData={{
            isUploadToS3: true,
            category: [FILE_CATEGORY.JSON].join(","),
          }}
          maxSizeInMB={1}
          onError={(err) => {
            Toast.error(err);
          }}
          onSuccess={(uploaded) => {
            if (uploaded.code === "OK") {
              uploaded &&
                uploaded.data &&
                uploaded.data.length &&
                uploaded.data.map((data) => {
                  return setsetUltrasoundData(data.path);
                });
              setUltrasoundVisible(false);
            }
          }}
        />
      )}
    </>
  );
};

export default withRouter(createForm()(ImagingTabs));
