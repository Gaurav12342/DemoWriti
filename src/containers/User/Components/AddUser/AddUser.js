import React, { useEffect, useState } from "react";
import { Input, ErrorMsg, Button } from "../../../../components/common/index";
import Select, {
  Option,
  OptGroup,
} from "../../../../components/common/AutoComplete";
import { capitalizeStr } from "../../../../util/common";
import Uploader, {
  FILE_TYPES,
  FILE_CATEGORY,
} from "../../../../components/common/Upload/Uploader";
import { MAPPED_USER_TYPE, USER_TYPE } from "../../../../constants/User";
import SettingForm from "./SettingForm";
import { fileUpload } from "../../../../services/api/routes/common";
import { editUser } from "../../../../services/api/routes/user";
import {
  Attachments,
  Download,
} from "../../../../assets/images/resident-detail";
import { isPharmacyUser } from "../../../../constants/User";
import Thumbnail from "../../../../components/common/Upload/Thumbnail";
import _ from "lodash";
function AddUser(props) {
  // authUser = { authUser }
  const {
    form,
    type,
    userRoleOptions,
    userSelectedType,
    changeUserType,
    onUserNameChange,
    authUser,
    onUploaderChange,
    showUploader,
    onAddUser,
    onFindSerialNo,
    btnLoading,
    designationData,
    isDisable,
    pharmacyList,
    organizationList,
    onOrgChange,
    onCancel,
    isEdit,
    onUploadAction,
    isUploadVisible,
    editData,
  } = props;
  const PREVENT_SPECIAL_CHARS_ARRAY = ["e", "=", ",", "-", "."];

  const { getFieldDecorator, getFieldError, getFieldValue } = form;
  let errors;

  const [
    defaultAssignRolePermission,
    setDefaultAssignRolePermission,
  ] = useState("");
  const capitalize = (e) => {
    if (e.target.value.length > 0) {
      let value = e.target.value;
      return capitalizeStr(value);
    }
  };
  const removeWhiteSpace = (e) => {
    if (e.target.value.length > 0) {
      let value = e.target.value.replace(/ /g, "");
      return value;
    }
  };
  const isDrOrNurseSelected = [
    USER_TYPE.HOME.NURSE,
    USER_TYPE.HOME.PHYSICIAN,
  ].includes(userSelectedType);
  let customCN = "col-4";
  if (isDrOrNurseSelected) {
    customCN = "col-3";
  }
  const showPharmacy =
    [USER_TYPE.PHARMACY.ADMIN].indexOf(userSelectedType) >= 0;
  const showOrg = userSelectedType === MAPPED_USER_TYPE.organizations;
  const [uploadedData, setUploadedData] = useState([]);
  const handleDesignationChange = (v, o) => {
    let tempRoleAccessId = _.find(designationData, { _id: v });
    form.setFieldsValue({
      subscriptionRoleGroup: tempRoleAccessId?.defaultRoleAccessPermission,
    });
    // setDefaultAssignRolePermission(tempRoleAccessId.defaultRoleAccessPermission)
  };

  useEffect(() => {
    if (editData && editData.image) {
      setUploadedData([{ path: editData.image }]);
    }
  }, [editData]);


  return (
    <div className="pmr_wrap">
      <div className="container">
        <div className="page_head">
          <label>
            <strong>
              {isEdit ? "Edit" : "Add"}{" "}
              {type ? capitalizeStr(type.replace(/-/g, " ")) : ""} User
            </strong>
          </label>
        </div>
        <div className="pmr_list_wrap">
          <div className="patient_order_wrap" style={{ border: "none" }}>
            <div className="form_wrap flex-wrap">
              {!isEdit &&
                [
                  USER_TYPE.HOME.NURSE,
                  USER_TYPE.HOME.PHYSICIAN,
                  USER_TYPE.HOME.TECH,
                  USER_TYPE.HOME.OTHER,
                  USER_TYPE.HOME.ADMIN,
                ].indexOf(userSelectedType) >= 0 ? (
                  <div
                    className="form_row add-user"
                    style={{
                      borderBottom: "1px solid #bbb",
                      paddingBottom: "25px",
                    }}
                  >
                    <div className="form_group  col-4">
                      <label style={{ fontSize: "15px" }}>
                        <strong>Existing User ?</strong>
                      </label>
                      {getFieldDecorator("findUser")(
                        <Input
                          placeholder="Search UserName"
                          onChange={onUserNameChange}
                        />
                      )}
                      {(errors = getFieldError("findUser")) ? (
                        <ErrorMsg errors={errors} />
                      ) : null}
                    </div>
                    <div className="form_group col-1">
                      <label></label>
                      <Button
                        style={{ marginTop: "20px" }}
                        onClick={onFindSerialNo}
                      >
                        Find
                    </Button>
                    </div>
                  </div>
                ) : null}
              <hr />
              <div className="form_row add-user">
                <div className="form_group required col-4">
                  <label>
                    First Name<span>*</span>
                  </label>
                  {getFieldDecorator("firstName", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter First Name",
                        whitespace: true,
                      },
                    ],
                    getValueFromEvent: capitalize,
                  })(<Input placeholder="First Name*" disabled={isDisable} />)}
                  {(errors = getFieldError("firstName")) ? (
                    <ErrorMsg errors={errors} />
                  ) : null}
                </div>
                <div className="form_group required col-4">
                  <label>
                    Last Name<span>*</span>
                  </label>
                  {getFieldDecorator("lastName", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter First Name",
                        whitespace: true,
                      },
                    ],
                    getValueFromEvent: capitalize,
                  })(<Input placeholder="Last Name*" disabled={isDisable} />)}
                  {(errors = getFieldError("lastName")) ? (
                    <ErrorMsg errors={errors} />
                  ) : null}
                </div>
                <div className="form_group required col-4">
                  <label>
                    Username<span>*</span>
                  </label>
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter User Name",
                        whitespace: true,
                      },
                    ],
                    getValueFromEvent: removeWhiteSpace,
                  })(<Input placeholder="Username*" disabled={isDisable} />)}
                  {(errors = getFieldError("username")) ? (
                    <ErrorMsg errors={errors} />
                  ) : null}
                </div>
              </div>
              <div className="form_row add-user">
                <div className="form_group required col-4">
                  <label>
                    Role<span>*</span>
                  </label>
                  {getFieldDecorator("type", {
                    rules: [
                      {
                        required: true,
                        message: "Please select Role",
                      },
                    ],
                  })(
                    <Select
                      placeholder="Select Type"
                      disabled={isDisable}
                      onChange={(value, event) => changeUserType(value, event)}
                    >
                      {Object.keys(userRoleOptions).map((val) => {
                        return (
                          <OptGroup label={val.replace(/_/g, " ")} key={val}>
                            {Object.keys(userRoleOptions[val]).map((v) => {
                              return (
                                <Option key={v} value={userRoleOptions[val][v]}>
                                  {v.replace(/_/g, " ")}
                                </Option>
                              );
                            })}
                          </OptGroup>
                        );
                      })}
                    </Select>
                  )}
                  {(errors = getFieldError("type")) ? (
                    <ErrorMsg errors={errors} />
                  ) : null}
                </div>
                <div
                  className={`form_group col-4 ${
                    userSelectedType !== USER_TYPE.HOME.NURSE && "required"
                    }`}
                >
                  {/* <div className="form_group col-4 required"> */}
                  <label>
                    Email
                    <span>
                      {userSelectedType !== USER_TYPE.HOME.NURSE && "*"}{" "}
                    </span>
                  </label>
                  {getFieldDecorator("emails", {
                    validateTrigger: ["onChange", "onBlur"],
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                        required:
                          userSelectedType !== USER_TYPE.HOME.NURSE && true,
                      },
                    ],
                  })(
                    <Input
                      placeholder="Email"
                      type="email"
                      disabled={isDisable}
                    />
                  )}
                  {(errors = getFieldError("emails"))
                    ? userSelectedType !== USER_TYPE.HOME.NURSE && (
                      <ErrorMsg errors={errors} />
                    )
                    : null}
                </div>
                <div className="form_group col-4 required">
                  <label>Phone</label>
                  <div style={{ display: 'flex' }}>
                    <Input
                      style={{ width: '50px' }}
                      type="number"
                      placeholder="+1"
                      value="+1"
                      disabled={true}
                    />
                    {getFieldDecorator('mobiles', {
                      validate: [
                        {
                          trigger: 'onBlur',
                          rules: [
                            {
                              required: false,
                            }
                          ],
                        },
                        {
                          trigger: ['onBlur', 'onChange'],
                          rules: [
                            {
                              min: 10,
                              message: 'Please enter 10 digit mobile no only.'
                            }
                          ]
                        }
                      ],
                    })(
                      <Input
                        type='number'
                        name='mobiles'
                        placeholder="16474*****3"
                        disabled={isDisable}
                        onKeyDown={(evt) => {
                          if (PREVENT_SPECIAL_CHARS_ARRAY.includes(evt.key))
                            evt.preventDefault();
                        }}
                      />,
                    )}

                  </div>
                  {(errors = getFieldError('mobiles')) ? (
                    <ErrorMsg errors={errors} />
                  ) : null}
                </div>
              </div>

              <div className="form_row add-user">
                {showOrg ? (
                  <div
                    className={`form_group col-4 ${showOrg ? "required" : ""}`}
                  >
                    <label>
                      Organization<span>{showOrg ? "*" : ""}</span>{" "}
                    </label>
                    {getFieldDecorator("orgId", {
                      rules: [
                        {
                          required: showOrg,
                          message: "Please select your parent!",
                        },
                      ],
                    })(
                      <Select
                        placeholder="Select Organization"
                        showSearch
                        allowClear
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {organizationList &&
                          organizationList.map((data) => {
                            return (
                              <Option key={data._id} value={data._id}>
                                {data.name}
                              </Option>
                            );
                          })}
                      </Select>
                    )}
                    {(errors = getFieldError("organization")) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                ) : null}
                {showPharmacy ? (
                  isPharmacyUser(authUser?.type) ? null : (
                    <div
                      className={`form_group col-4 ${
                        showPharmacy ? "required" : ""
                        }`}
                    >
                      <label>
                        Pharmacy <span>{showPharmacy ? "*" : ""}</span>
                      </label>
                      {getFieldDecorator("pharmacyId", {
                        rules: [
                          {
                            required: showPharmacy,
                            message: "Please select Pharmacy",
                          },
                        ],
                      })(
                        <Select
                          placeholder="Select Pharmacy"
                          showSearch
                          allowClear
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {pharmacyList.map((obj) => {
                            return (
                              <Option key={obj._id} value={obj._id} disabled={!obj.isActive}>
                                {obj.name}
                              </Option>
                            );
                          })}
                        </Select>
                      )}
                      {(errors = getFieldError("pharamcyId")) ? (
                        <ErrorMsg errors={errors} />
                      ) : null}
                    </div>
                  )
                ) : null}
                {isDrOrNurseSelected ? (
                  <div className="form_row add-user">
                    <div className="form_group col-4">
                      <label>Designation</label>
                      {getFieldDecorator("designationId")(
                        <Select
                          onChange={(v, o) => handleDesignationChange(v, o)}
                          placeholder="Select Designation"
                          name="Designation"
                          allowClear={true}
                        >
                          {designationData && designationData.length
                            ? designationData.map((obj) => {
                              return (
                                <Option key={obj._id} value={obj._id}>
                                  {obj.code}
                                </Option>
                              );
                            })
                            : null}
                        </Select>
                      )}
                      {/* {(errors = getFieldError('firstName')) ? <ErrorMsg errors={errors} /> : null} */}
                    </div>
                    {getFieldValue("type") ===
                      userRoleOptions.HOME.PHYSICIAN && (
                        <div className="form_group required col-4">
                          <label>
                            License No<span>*</span>
                          </label>
                          {getFieldDecorator("licenceNo", {
                            validateTrigger: ["onChange", "onBlur"],
                            rules: [
                              {
                                required:
                                  getFieldValue("type") ===
                                  userRoleOptions.HOME.PHYSICIAN,
                                message: "Please input your License No!",
                              },
                            ],
                          })(
                            <Input
                              placeholder="License No"
                              disabled={isDisable}
                            />
                          )}
                          {(errors = getFieldError("licenceNo")) ? (
                            <ErrorMsg errors={errors} />
                          ) : null}
                        </div>
                      )}

                    {getFieldValue("type") ===
                      userRoleOptions.HOME.PHYSICIAN && (
                        <div className="form_group col-4">
                          <label>OHIP No</label>
                          {getFieldDecorator("ohipNo", {
                            rules: [],
                          })(
                            <Input
                              placeholder="Enter OHIP No"
                              disabled={isDisable}
                            />
                          )}
                        </div>
                      )}
                  </div>
                ) : null}
                <div className="form_row add-user">
                  <div className="form_group col-12">
                    {
                      (getFieldValue("designationId") || [USER_TYPE.PHARMACY.ADMIN, USER_TYPE.HOME.ADMIN, USER_TYPE.ADMIN.GENERAL, USER_TYPE.ADMIN.SUPER].indexOf(
                        authUser?.type
                      ) >= 0) &&
                        userSelectedType !== USER_TYPE.HOME.ADMIN &&
                        userSelectedType !== USER_TYPE.PHARMACY.ADMIN ? (
                          <SettingForm
                            form={form}
                            authUser={authUser}
                          // defaultValue = {defaultAssignRolePermission}
                          />
                        ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="form_row add-user">
              <div className="form_group col-6">
                <label>Profile Picture</label>
                <div className="form_row add-user align-items-center">
                  <div className="form_group mb-0">
                    <Button
                      size="lg"
                      type="transparent"
                      style={{ width: "180px", float: "left" }}
                      onClick={() => {
                        onUploadAction(true);
                      }}
                    >
                      Upload Image
                    </Button>
                  </div>
                  <div className="form_row add-user">
                    {uploadedData.length > 0 && (
                      <div className="upd_img_wrap">
                        <Thumbnail path={uploadedData[0].path} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: "22%", float: "right", marginTop: "50px" }}>
              <Button
                size="lg"
                type="secondary"
                style={{ marginRight: "8px" }}
                onClick={onCancel}
                validationParams={{
                  moduleId: 1,
                  actiontoCheck: "ADD",
                }}
              >
                Cancel
              </Button>
              <Button size="lg" loading={btnLoading} onClick={onAddUser}>
                {isEdit ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </div>
        {isUploadVisible ? (
          <Uploader
            title="Upload Profile"
            visible={isUploadVisible}
            onRequestClose={() => onUploadAction(false)}
            uploadUrl={{ ...fileUpload }}
            extraData={{
              isUploadToS3: true,
              category: [FILE_CATEGORY.IMAGE].join(","),
            }}
            allowedTypes={[FILE_TYPES.IMAGE]}
            // maxSizeInMB={1}
            onError={(err) => {
              console.log("on error => ", err);
            }}
            multiple={false}
            onSuccess={(uploaded) => {
              setUploadedData(uploaded.data);
              onUploadAction(false, uploaded);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
export default AddUser;
