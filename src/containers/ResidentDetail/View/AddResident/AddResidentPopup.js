import React from 'react';
// import { DatePicker } from '../../../../components/common/DatePicker/index'
import {
  Input,
  ErrorMsg,
  TextArea,
  DateTimePicker,
} from '../../../../components/common/index';
import Modal from '../../../../components/common/Popup/index';
import Select, { Option } from '../../../../components/common/AutoComplete';
import DoctorFilter from '../../../../components/DoctorFilter';
import HomeAreaFilter from '../../../../components/HomeAreaFilter';
import { GENDER_TYPE } from '../../../../constants/common';
import { isDrOrNp, capitalizeStr } from '../../../../util/common';
import {
  DobValidationForAdult,
  displayDateByFormat,
  displayDate,
} from '../../../../util/moment';
import { dateFormat } from '../../../../util/moment';
import { PlusBtn } from '../../../../assets/images/resident-detail/index';
import { Close } from '../../../../assets/images/popup/index';

const moment = require('moment');
const _ = require('lodash');
const text = (
  <span className='tooltip-desc d-flex'>
    <span className='left-contry'>
      <p className='desc-c'> Alberta</p>
      <p className='desc-c'>BC </p>
      <p className='desc-c'>Manitoba</p>
      <p className='desc-c'>PEI </p>
      <p className='desc-c'>Nova Scotia </p>
      <p className='desc-c'>New Brunswick </p>
      <p className='desc-c'>Quebec </p>
      <p className='desc-c'>Ontario </p>
      <p className='desc-c'>Red Card </p>
      <p className='desc-c'>Saskatchewan </p>
      <p className='desc-c'>NWT </p>
      <p className='desc-c'>Yukon </p>
      <p className='desc-c'>Nunavut </p>
    </span>

    <span className='right-con'>
      <p className='desc-2d'> : 00000-0000</p>
      <p className='desc-2d'>: 0000 000 000 </p>
      <p className='desc-2d'>: 000 000 000 </p>
      <p className='desc-2d'>: 00000000 </p>
      <p className='desc-2d'>: 0000 000 000 </p>
      <p className='desc-2'>: 000-000-000 </p>
      <p className='desc-2d'>: 0000 0000 </p>
      <p className='desc-2'>: 0000-000-000-AA </p>
      <p className='desc-2d'>: 0000 000 000 </p>
      <p className='desc-2d'>: 000 000 000 </p>
      <p className='desc-2d'>: A0000000 </p>
      <p className='desc-2d'>: 000-000-000 </p>
      <p className='desc-2d'>: 000000000 </p>
    </span>
  </span>
);
function AddResidentUI(props) {
  const {
    isVisible,
    onCancel,
    onOk,
    form,
    onDoctorChange,
    onDeleteClick,
    authUser,
    homeAreaId,
    onCascaderChange,
    onSubmit,
    current,
    POAData,
    onAddCustomFields,
    btnLoading,
  } = props;
  const { getFieldError, getFieldDecorator, isFieldValidating } = form;
  let errors;
  const PREVENT_SPECIAL_CHARS_ARRAY = ['e', '=', ',', '-', '.'];

  const transformUppercase = (e) => {
    let value = e.target.value;
    value = value.toString().toUpperCase();
    return value;
  };
  const capitalize = (e) => {
    if (e.target.value.length > 0) {
      let value = e.target.value;
      return capitalizeStr(value);
    }
  };
  const checkDate = (current) => {
    if (moment().diff(moment(current), 'years', false) >= 18) {
      return current;
    } else {
      return undefined;
    }
  };
  const handleDatePicker = (date) => {
    form.setFieldsValue({
      dob: date,
    });
  };
  return (
    <Modal
      title='Add Resident'
      visible={isVisible}
      maskClosable={false}
      onCancel={onCancel}
      onClose={onCancel}
      onOk={onSubmit}
      okText='ADD RESIDENT'
      okButtonProps={{ loading: btnLoading }}
      footer={true}
      className='logout_popup audit_warper resident_wrap add_R_p'
      btnClass='d-flex-end f-end footer-block'
    >
      <div className='pmr_wrap' style={{ padding: 0 }}>
        <div className='container'>
          <p className='small-text mb-20'>*Required Fields</p>
          <div className='pmr_list_wrap'>
            <div className='patient_order_wrap' style={{ border: 'none' }}>
              <div className='form_wrap flex-wrap'>
                <div className='form_row add-user'>
                  <div className='form_group required col-4'>
                    <label>
                      First Name<span>*</span>
                    </label>
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter First Name',
                          whitespace: true,
                        },
                      ],
                      getValueFromEvent: capitalize,
                    })(<Input placeholder='First Name*' />)}
                    {(errors = getFieldError('firstName')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Last Name<span>*</span>
                    </label>
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter First Name',
                          whitespace: true,
                        },
                      ],
                      getValueFromEvent: capitalize,
                    })(<Input placeholder='Last Name*' />)}
                    {(errors = getFieldError('lastName')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Date of Birth<span>*</span>
                    </label>
                    <div className='ui input'>
                      {getFieldDecorator('dob', {
                        rules: [
                          {
                            required: true,
                            message:
                              'Please select Date of Birth of age greater than 18',
                          },
                        ],
                        getValueFromEvent: checkDate,
                      })(
                        <DateTimePicker
                          name='dob'
                          disabledDate={DobValidationForAdult}
                          placeholder='select Birth Date'
                          onChange={handleDatePicker}
                          format={displayDate}
                        />
                      )}
                      {(errors = getFieldError('dob')) ? (
                        <ErrorMsg errors={errors} />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className='form_row add-user'>
                  <div className='form_group required col-4'>
                    <label>
                      Gender<span>*</span>
                    </label>
                    {getFieldDecorator('gender', {
                      rules: [
                        { required: true, message: 'Please select Gender' },
                      ],
                    })(
                      <Select placeholder='Select Gender'>
                        {Object.keys(GENDER_TYPE).map((x) => {
                          return (
                            <Option key={x} value={x}>
                              {GENDER_TYPE[x]}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                    {(errors = getFieldError('gender')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Room No<span>*</span>
                    </label>
                    {getFieldDecorator('room', {
                      rules: [
                        {
                          required: true,
                          message: 'please Enter Room No',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder='Room No*' type='number' />)}
                    {(errors = getFieldError('room')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Bed<span>*</span>
                    </label>
                    {getFieldDecorator('bed', {
                      rules: [
                        {
                          required: true,
                          message: 'please Enter Bed No',
                          whitespace: true,
                        },
                      ],
                    })(<Input placeholder='Bed*' type='number' />)}
                    {(errors = getFieldError('bed')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                </div>
                <div className='form_row add-user'>
                  <div className='form_group required col-4'>
                    <label>
                      Physician/Nurse Practitioner<span>*</span>
                    </label>
                    {getFieldDecorator('physicianId', {
                      rules: [
                        {
                          required: isDrOrNp(authUser) ? false : true,
                          message: 'Select Physician/Nurse Practitioner',
                        },
                      ],
                    })(
                      <DoctorFilter
                        allowClear={false}
                        // size={220}
                        allowClear={true}
                        placeholder='Search Physician/Nurse Practitioner'
                        authUser={authUser}
                        onDoctorChange={onDoctorChange}
                      />
                    )}
                    {(errors = getFieldError('physicianId')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Homearea<span>*</span>
                    </label>
                    {getFieldDecorator('homeAreaId', {
                      rules: [
                        {
                          required: true,
                          message: 'please Select Home Area',
                          whitespace: true,
                        },
                      ],
                    })(
                      <HomeAreaFilter
                        placeholder='Filter Homearea'
                        // options={options}
                        // value={['Primary']}
                        // value={homeAreaId}
                        onChange={(e) => onCascaderChange}
                      />
                    )}
                    {(errors = getFieldError('homeAreaId')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Height<span>*</span>
                    </label>
                    {getFieldDecorator('height', {
                      rules: [
                        {
                          required: true,
                          message: 'please Enter Bed No',
                          whitespace: true,
                        },
                      ],
                    })(<Input type='text' placeholder='Height*' />)}
                    {(errors = getFieldError('height')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                </div>
                <div className='form_row add-user'>
                  <div className='form_group required col-4'>
                    <label>
                      Weight<span>*</span>
                    </label>
                    {getFieldDecorator('weight', {
                      rules: [
                        {
                          required: true,
                          message: 'please Enter Weight',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Input type='text' placeholder='Weight' />
                    )}
                    {(errors = getFieldError('weight')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Health Card No<span>*</span>
                    </label>
                    {getFieldDecorator('hc', {
                      rules: [
                        {
                          required: true,
                          message: 'Please Enter Healthcard No',
                          whitespace: true,
                        },
                      ],
                      getValueFromEvent: transformUppercase,
                    })(<Input type='text' placeholder='Health Card No*' />)}
                    {(errors = getFieldError('hc')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                </div>
                <div className='form_row add-user'>
                  <div className='form_group required col-4'>
                    <label>
                      City<span>*</span>
                    </label>
                    {getFieldDecorator('city', {
                      rules: [
                        {
                          required: true,
                          message: 'Please Enter City',
                          whitespace: true,
                        },
                      ],
                    })(<Input type='text' placeholder='City*' />)}
                    {(errors = getFieldError('city')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Province<span>*</span>
                    </label>
                    {getFieldDecorator('province', {
                      rules: [
                        {
                          required: true,
                          message: 'Please Enter Province',
                          whitespace: true,
                        },
                      ],
                    })(<Input type='text' placeholder='Province*' />)}
                    {(errors = getFieldError('province')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                  <div className='form_group required col-4'>
                    <label>
                      Pincode<span>*</span>
                    </label>
                    {getFieldDecorator('pincode', {
                      rules: [
                        {
                          required: true,
                          message: 'Please Enter Pincode',
                          whitespace: true,
                        },
                      ],
                    })(<Input type='text' placeholder='Pincode*' />)}
                    {(errors = getFieldError('pincode')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                </div>
                <div className='form_row add-user'>
                  <div className='form_group required col-6'>
                    <label>
                      Address 1<span>*</span>
                    </label>
                    {getFieldDecorator('line1', {
                      rules: [
                        {
                          required: true,
                          message: 'Please Enter Line 1',
                          whitespace: true,
                        },
                      ],
                    })(
                      <TextArea
                        col={30}
                        row={2}
                        type='text'
                        placeholder='Line 1'
                        className='text-area'
                      />
                    )}
                    {(errors = getFieldError('line1')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>

                  <div className='form_group col-6'>
                    <label>
                      Address 2
                    </label>
                    {getFieldDecorator('line2', {
                      rules: [
                        {
                          required: false,
                          message: 'Please Enter Line 2',
                          whitespace: true,
                        },
                      ],
                    })(
                      <TextArea
                        col={30}
                        row={2}
                        type='text'
                        placeholder='Line 2'
                        className='text-area'
                      />
                    )}
                    {(errors = getFieldError('line2')) ? (
                      <ErrorMsg errors={errors} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div style={{ visibility: 'hidden' }}>{current}</div>
              <div className='mdm-text mb-20'> P.O.A Details</div>
              {current && current.length > 0
                ? current.map((i, pi) => {
                  return (
                    <div className='form_wrap flex-wrap'>
                      <div className='form_row add-user'>
                        <div className='form_group required col-4'>
                          <label>First Name</label>
                          {getFieldDecorator(`poaFirstName${i}`, {
                            rules: [{ whitespace: true }],
                            getValueFromEvent: capitalize,
                          })(<Input placeholder='First Name*' />)}
                          {(errors = getFieldError(`poaFirstName${i}`)) ? (
                            <ErrorMsg errors={errors} />
                          ) : null}
                        </div>
                        <div className='form_group required col-4'>
                          <label>Last Name</label>
                          {getFieldDecorator(`poaLastName${i}`, {
                            rules: [{ whitespace: true }],
                            getValueFromEvent: capitalize,
                          })(<Input placeholder='Last Name*' />)}
                          {(errors = getFieldError(`poaLastName${i}`)) ? (
                            <ErrorMsg errors={errors} />
                          ) : null}
                        </div>
                        <div className='form_group required col-4'>
                          <label>Phone</label>
                          {getFieldDecorator(`poaPhone${i}`, {
                            rules: [{ whitespace: true }],
                          })(
                            <Input
                              placeholder='Phone'
                              type='number'
                              onKeyDown={(evt) => {
                                if (
                                  PREVENT_SPECIAL_CHARS_ARRAY.includes(
                                    evt.key
                                  )
                                )
                                  evt.preventDefault();
                              }}
                            />
                          )}
                          {(errors = getFieldError(`poaPhone${i}`)) ? (
                            <ErrorMsg errors={errors} />
                          ) : null}
                        </div>
                      </div>
                      <div className='form_row add-user'>
                        <div className='form_group required col-4'>
                          <label>Email</label>
                          {getFieldDecorator(`poaEmail${i}`, {
                            rules: [
                              {
                                type: 'email',
                                message: 'Please Enter valid Email',
                              },
                            ],
                          })(<Input placeholder='Email' type='email' />)}
                          {(errors = getFieldError(`poaEmail${i}`)) ? (
                            <ErrorMsg errors={errors} />
                          ) : null}
                        </div>

                        <div className='action'>
                          {pi === current.length - 1 ? (
                            <PlusBtn
                              className='plus-btn'
                              onClick={onAddCustomFields}
                            />
                          ) : null}
                          {pi === 0 && current.length === 1 ? null : (
                            <Close
                              className='plus-btn'
                              onClick={() => onDeleteClick(i)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
                : null}
              {/* <div className="d-flex flex-end">
                            <Button type="secondary" size="lg" onClick={onCancel} style={{ marginRight: '15px' }}>CANCEL</Button>
                            <Button size="lg" onClick={onSubmit} loading={btnLoading}>ADD RESIDENT</Button>
                        </div> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default AddResidentUI;
