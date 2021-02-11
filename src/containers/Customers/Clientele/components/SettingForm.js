import React, { useEffect, useState } from "react";
import {
  Select,
  Input,
  Option,
  Button,
  ErrorMsg,
  TextArea,
} from "../../../../components/common";
import routes from "../../../../routes/constant";
import axios from "../../../../services/api/services/common";
import { getAll } from "../../../../services/api/routes/subscription";
import { Info } from "../../../../assets/images/popup";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import ViewSubscription from "../../../SubscriptionUpsert/components/ViewSubscription";
import {
  Download,
} from './../../../../assets/images/resident-detail/index';
import Thumbnail from "../../../../components/common/Upload/Thumbnail";
import _ from 'lodash'
import { CLIENTELE_TYPE, EHR_Integration } from "../../../../constants/Customer";
import { Attachments } from "../../../../assets/images/resident-detail";
function SettingForm(props) {
  const {
    isPharmacy,
    onSave,
    onCancel,
    form,
    editId,
    queryData,
    col,
    isModal,
    editPhamacy,
    onRedirect,
    onPdfVisible,
    onJsonVisible,
    loading,
    onXrayVisible,
    onUltraSoundVisible,
    xrayData,
    ultrasoundData,
    onPdfData,
    onJsonData,
    eHR,
    onSourceMediumChange
  } = props;

  const { getFieldError, getFieldDecorator, getFieldValue } = form;
  const [subscripData, setSubscripData] = useState([]);
  const [visible, setVisible] = useState(false);
  let errors;

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    if (editPhamacy) {
      form.setFieldsValue({
        assignedSubscriptionGroupId: editPhamacy.assignedSubscriptionGroupId,
        careClause: editPhamacy.careClause,
      });
      if (editPhamacy.printer) {
        form.setFieldsValue({ printerName: editPhamacy.printer.name });
        form.setFieldsValue({ machineId: editPhamacy.printer.machineId });
      }
    }
  }, [editPhamacy]);

  const fetchSubscriptions = async () => {
    const data = { sortBy: { createdAt: "DESC" }, where: { isActive: true } };
    let res = await axios({ ...getAll, data });
    if (res) {
      if (res.code === "OK") {
        setSubscripData(res.data.data);
      }
    }
  };

  const viewSubscription = (visible) => {
    setVisible(visible);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const GetFilename = (url) => {
    if (url) {
      let p = url.split('/').pop()
      return p
    }
    return "";
  }

  return (
    <>
      {!isModal  && queryData == CLIENTELE_TYPE.PHARMACY && (
        <div className="form_row" style={{marginTop:"20px"}}>

<div
                className="form_group col-2"
              >
          <b>PMS Integration</b>
          {getFieldDecorator("isKroll", {
            rules: [
              {
                required: false,
                // message: "Please enter the description.!",
              },
            ],
          })(
            <label className="filter_check checkbox">
              <input
                type="checkbox"
                name="isKroll"
                id="isKroll"
              // onChange={handleChangeCheckBoxValue}
              // checked={checkValues}
              />
              <span className="checkbox"></span>
              <span className="lbl">Telus Health(Kroll)</span>
            </label>
          )}
        </div>
        </div>
      )}


      {!isModal && queryData == CLIENTELE_TYPE.HOME
        ? (
          <div className="form_row" style={{ marginTop: "20px" }}>

            <div
              className="form_group col-12"
              style={{ marginBottom: "1px" }}
            >
              <label>
                Source Medium<span>*</span>
              </label>
            </div>
            <div className="col-12">
              <div style={{ display: "flex" }}>
                {Object.keys(EHR_Integration).map((x) => {
                  return (
                    <label className="filter_check radio">
                      <input
                        type="checkbox"
                        name="medium"
                        value={EHR_Integration[x]}
                        checked={eHR === EHR_Integration[x]}
                        onChange={onSourceMediumChange}
                      />
                      <span className="checkbox radio"></span>
                      <span className="lbl">{x}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}



      {queryData == CLIENTELE_TYPE.HOME ||
        queryData == CLIENTELE_TYPE.PHARMACY ? (
          <div className="form_row" style={{ marginTop: "2%" }}>
            <div
              className={`form_group  ${col ? col : "col-6"}`}
              style={{ marginTop: "2%", marginBottom: col ? "0" : "0" }}
            >
              <div
                className="form_group col-10 required"
                style={{ float: "left", marginLeft: "-15px" }}
              >
                <label>
                  Subscription<span>*</span>
                </label>
                {getFieldDecorator("assignedSubscriptionGroupId", {
                  rules: [
                    {
                      required: true,
                      message: `Please select`,
                    },
                  ],
                })(
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select Subscription Plan"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    name="assignedSubscriptionGroupId"
                  >
                    {subscripData.map((v) => {
                      return (
                        <Option key={v._id} value={v._id}>
                          {v.name}
                        </Option>
                      );
                    })}
                  </Select>
                )}
                {(errors = getFieldError("assignedSubscriptionGroupId")) ? (
                  <ErrorMsg errors={errors} />
                ) : null}
              </div>

              <div className="form_group col-1" style={{ float: "right" }}>
                {getFieldValue("assignedSubscriptionGroupId") ? (
                  <Tooltip overlay={"View Subscription"}>
                    <Info
                      style={{
                        marginTop: "-7px",
                        marginRight: "45px",
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => viewSubscription(true)}
                    />
                  </Tooltip>
                ) : null}
              </div>
            </div>

            {!isModal && (queryData == CLIENTELE_TYPE.HOME || isPharmacy) ? (
              <div
                className={`form_group  ${col ? col : "col-6"}`}
                style={{
                  marginTop: "2%",
                  marginLeft: "-1%",
                  marginBottom: col ? "0" : "0",
                }}
              >
                <div className="form_group col-12 ">
                  <label>
                    Care Clause<span>*</span>
                  </label>
                  <div className="additional-textarea">
                    <div className="form_wrap mb-12">
                      {getFieldDecorator("careClause", {
                        rules: [
                          {
                            required: false,
                            message: "Please enter the addrsess line 1.!",
                          },
                        ],
                      })(
                        <TextArea style={{ width: "100%" }} name="careClause" />
                      )}
                      {(errors = getFieldError("careClause")) ? (
                        <ErrorMsg errors={errors} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

      {!isModal && queryData == CLIENTELE_TYPE.PHARMACY ? (
        <div className="form_row" style={{ marginTop: "1%" }}>
          <div className="form_group col-6 required" style={{ float: "left" }}>
            <label>
              PDF Path<span>*</span>
            </label>

            <Button
              type="transparent"
              onClick={onPdfVisible}
              style={{ width: "100%" }}
            >
              PDF Path
            </Button>

            <div className="form_row add-user">
              {onPdfData && (
                <div className="upd_img_wrap">
                  <Thumbnail path={onPdfData} />
                </div>
              )}
            </div>
          </div>


          <div className="form_group col-6 required" style={{ float: "left" }}>
            <label>
              JSON Path<span>*</span>
            </label>

            <Button
              type="transparent"
              onClick={onJsonVisible}
              style={{ width: "100%" }}
            >
              JSON Path
            </Button>

            <div className="form_row add-user">
              {onJsonData && (
                <div className="upd_img_wrap">
                  <Thumbnail path={onJsonData} />
                </div>
              )}
            </div>
          </div>

        </div>
      ) : null}

      {!isModal && (queryData == CLIENTELE_TYPE.HOME || isPharmacy) ? (
        <div className="form_row" style={{ marginTop: "1%" }}>
          <div className="form_group col-6">
            <label>
              Printer Name<span>*</span>
            </label>

            {getFieldDecorator("printerName", {
              rules: [
                {
                  required: false,
                  message: `Please enter the printer name.`,
                },
              ],
            })(<Input name="printerName" />)}
            {(errors = getFieldError("printerName")) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>

          <div
            className="form_group col-6"
            style={{ float: "left", marginBottom: "330px" }}
          >
            <label>
              Machine Id<span>*</span>
            </label>

            {getFieldDecorator("machineId", {
              rules: [
                {
                  required: false,
                  message: `Please enter the machine id.`,
                },
              ],
            })(<Input name="machineId" />)}
            {(errors = getFieldError("machineId")) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>
        </div>
      ) : null}

      {queryData == CLIENTELE_TYPE.IMAGING_DIAGNOSTIC && (
        <div className="form_row" style={{ marginTop: "20px" }}>
          <div className="form_group col-4 required">
            <label>
              X-Ray JSON<span>*</span>
            </label>
            <div className="d-flex align-items-center">
              <Button
                type="transparent"
                onClick={onXrayVisible}
                classNames="img-upload"
                style={{ "min-width": "auto" }}
              >
                Uplaod X-Ray JSON
              </Button>
            </div>
            <div className="form_row add-user">
              {xrayData && (
                <div className="upd_img_wrap">
                  <Thumbnail path={xrayData} />
                </div>
              )}
            </div>
          </div>
          <div className="form_group col-4 required">
            <label>
              Ultrasound JSON<span>*</span>
            </label>
            <div className="d-flex align-items-center">
              <Button
                type="transparent"
                classNames="img-upload"
                onClick={onUltraSoundVisible}
              >
                Uplaod Ultrasound JSON
            </Button>
            </div>
            <div className="form_row add-user">
              {ultrasoundData && (
                <div className="upd_img_wrap">
                  <Thumbnail path={ultrasoundData} />
                </div>
              )}
            </div>
          </div>
          <div>

          </div>
        </div>
      )}

      <div className="form_row">
        <div
          className="form_group col-12"
          style={{
            textAlign: "right",
            borderTop: "1px solid #919A9F",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <Button type="secondary" size="lg" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={onSave}
            size="lg"
            style={{ marginLeft: "10px" }}
          >
            {editId ? "Update" : "Add"}
          </Button>
          {visible ? (
            <ViewSubscription
              visible={visible}
              id={getFieldValue("assignedSubscriptionGroupId")}
              onCancel={() => viewSubscription(false)}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
export default SettingForm;
