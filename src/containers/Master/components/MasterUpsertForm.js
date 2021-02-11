import React, { useState, useEffect } from "react";
import Modal from "../../../components/common/Popup/index";
import {
  Input,
  TextArea,
  ErrorMsg,
  Select,
  Option,
} from "../../../../src/components/common/index";
import { codeConvert } from "../../../../src/util/common";
import { createForm } from "rc-form";
import { Toast } from "../../../../src/components/common/Toast";
import { MASTER_MEDIUM } from "../../../constants/MasterMedium";
import { map } from "lodash";
import { USER_TYPE } from "../../../constants/User";
import axios from "../../../services/api/services/common";
import { getAll as getAllRoles } from "../../../services/api/routes/permission";
import _ from "lodash";
const MasterUpsortForm = (props) => {
  const {
    visible,
    onCancel,
    onClose,
    maskClosable,
    title,
    okText,
    cancelText,
    form,
    pharmacy,
    home,
    value,
    authUser,
    loading,
    phamracyLoader,
    onHomePharmacy,
    radioValue,
    masterDetail,
    isAdmin,
  } = props;

  let errors;
  const [loader, setLoader] = useState(false);
  const [roles, setRoles] = useState([]);
  const fetchRoles = async () => {
    setLoader(true);
    const data = {
      sortBy: { createdAt: -1 },
      find: {
        isActive: true,
        homeId:
          form.getFieldValue("homeId")
        // pharmacyId:
        //   props.authUser.type === USER_TYPE.PHARMACY.ADMIN
        //     ? props.authUser.pharmacyId?._id
        //     : undefined,
      },
    };
    let res = await axios({ ...getAllRoles, data: { query: data } });
    if (res) {
      if (res.code === "OK") {
        setRoles(res.data.data);
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    if (masterDetail?.code === "DESIGNATION_TYPE") {
      fetchRoles();
    }
  }, [masterDetail, form.getFieldValue("homeId")]);

  const {
    getFieldError,
    getFieldDecorator,
    setFieldsValue,
    validateFields,
  } = form;

  const [checkValues, setCheckValues] = useState(value?.isActive);

  useEffect(() => {
    if (value && visible) {
      let obj = {};
      if (value.masterForMedium === MASTER_MEDIUM["HOME"]) {
        obj = {
          homeId: value.homeId ? value.homeId._id : null,
        };
      }
      if (value.masterForMedium === MASTER_MEDIUM["PHARMACY"]) {
        obj = {
          pharmacyId: value.pharmacyId ? value.pharmacyId._id : null,
        };
      }
      obj = {
        ...value,
        ...obj,
      };
      setFieldsValue(obj);
    }
    else if (visible && value?.isActive) {
      setCheckValues(value?.isActive)
    } else {
      setCheckValues(true)
      
    }
  }, [value, visible]);

  const handleOnChange = (e) => {
    const code = codeConvert(e.target.value);
    setFieldsValue({ code: code });
  };

  const handleChangeCheckBoxValue = (e) => {
    setCheckValues(e.target.checked);
  };

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) return;
      let tempData = {
        name: value.name,
        code: value.code,
        description: value.description,
        isActive: !!checkValues,
        pharmacyId: value.pharmacyId,
        homeId: value.homeId,
        masterForMedium: radioValue,
        defaultRoleAccessPermission: value.defaultRoleAccessPermission
          ? value.defaultRoleAccessPermission
          : null,
      };

      if (authUser.type === USER_TYPE.HOME.ADMIN) {
        tempData = {
          ...tempData,
          homeId: authUser.homeId._id,
          pharmacyId: undefined,
          masterForMedium: MASTER_MEDIUM["HOME"],
        };
      } else if (authUser.type === USER_TYPE.PHARMACY.ADMIN) {
        tempData = {
          ...tempData,
          homeId: undefined,
          pharmacyId: authUser.homeId._id,
          masterForMedium: MASTER_MEDIUM["PHARMACY"],
        };
      }
      props.onOk(tempData);
    });
  };

  return (
    <>
      <Modal
        form={form}
        visible={visible}
        title={title}
        onCancel={onCancel}
        onClose={onClose}
        maskClosable={maskClosable}
        onOk={handleSubmit}
        style={{ width: "50%" }}
        okText={okText}
        okButtonProps={{ loading: loading }}
        cancelText={cancelText}
      >
        <div className="form_row">
          {!masterDetail &&
            (authUser.type === USER_TYPE.ADMIN.SUPER ||
              authUser.type === USER_TYPE.ADMIN.GENERAL) ? (
              <>
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
                    {Object.keys(MASTER_MEDIUM).map((x) => {
                      return (
                        <label className="filter_check radio">
                          <input
                            type="checkbox"
                            name="medium"
                            value={MASTER_MEDIUM[x]}
                            checked={radioValue === MASTER_MEDIUM[x]}
                            onChange={onHomePharmacy}
                          />
                          <span className="checkbox radio"></span>
                          <span className="lbl">{x}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}
          {masterDetail && isAdmin ? (
            <div className="form_group col-12">
              {radioValue === MASTER_MEDIUM.GENERAL ? null : radioValue ===
                MASTER_MEDIUM.HOME ? (
                  <>
                    {getFieldDecorator("homeId", {
                      rules: [
                        {
                          required: radioValue === MASTER_MEDIUM.HOME,
                          message: "Please Select Home",
                        },
                      ],
                    })(
                      <Select
                        name="homeId"
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder={"Select Home"}
                        loading={loader}
                      >
                        {home &&
                          home.map((data) => {
                            return (
                              <Option key={data._id} value={data._id}>
                                {data.name}
                              </Option>
                            );
                          })}
                      </Select>
                    )}
                    {(errors = getFieldError("homeId")) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </>
                ) : radioValue === MASTER_MEDIUM.PHARMACY ? (
                  <>
                    {getFieldDecorator("pharmacyId", {
                      rules: [
                        {
                          required: radioValue === MASTER_MEDIUM.PHARMACY,
                          message: "Please Select Pharmacy",
                        },
                      ],
                    })(
                      <Select
                        name="pharmacyId"
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder={"Select Parmacy"}
                      >
                        {pharmacy &&
                          pharmacy.map((data) => {
                            return (
                              <Option value={data._id} key={data._id}>
                                {data.name}
                              </Option>
                            );
                          })}
                      </Select>
                    )}
                    {(errors = getFieldError("pharmacyId")) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </>
                ) : null}
            </div>
          ) : null}
          <div className="form_group col-12 required">
            <label>
              Name<span>*</span>
            </label>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: `Please enter name`,
                  whitespace: true,
                },
                {
                  pattern: /^[a-z\d\s]+$/i,
                  message: "Code cannot have special characters!",
                },
              ],
            })(<Input name="name" onChange={handleOnChange} />)}
            {(errors = getFieldError("name")) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>

          <div className="form_group col-12 required">
            <label>
              Code<span>*</span>
            </label>
            {getFieldDecorator("code", {
              rules: [
                {
                  required: true,
                  message: `Please enter code`,
                },
                {
                  pattern: /^[\w-+.\\/]+$/,
                  message: "Code cannot have special characters or spaces!",
                },
              ],
            })(<Input name="code" />)}
            {(errors = getFieldError("code")) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>

          <div className="form_group col-12">
            <label>
              Description<span>*</span>
            </label>
            <div className="additional-textarea">
              <div className="form_wrap mb-10">
                {getFieldDecorator("description", {
                  rules: [
                    {
                      required: false,
                      message: "Please enter the description.!",
                    },
                  ],
                })(<TextArea name="description" />)}
              </div>
            </div>
          </div>
          <div className="form_group col-3 inline_check">
            <label className="filter_check checkbox">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                onChange={handleChangeCheckBoxValue}
                checked={checkValues}
              />
              <span className="checkbox"></span>
              <span className="lbl">IsActive</span>
            </label>
          </div>
          {masterDetail?.code === "DESIGNATION_TYPE" && (
            <div className="form_group col-12">
              {getFieldDecorator("defaultRoleAccessPermission", {
                // rules: [
                //   {
                //     required: radioValue === MASTER_MEDIUM.HOME,
                //     message: "Please Select Home",
                //   },
                // ],
              })(
                <Select
                  name="defaultRoleAccessPermission"
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder={"Select Role Base Access Permission"}
                  allowClear={true}
                >
                  {_.size(roles) > 0 &&
                    roles.map((data) => {
                      return (
                        <Option key={data._id} value={data._id}>
                          {data.name}
                        </Option>
                      );
                    })}
                </Select>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default createForm()(MasterUpsortForm);
