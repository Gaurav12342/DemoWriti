import React, { useEffect, useState, useRef } from 'react';
import {
  Input,
  ErrorMsg,
  Select,
  Option,
  DateTimePicker,
  Search,
  Toast,
} from '../../../../components/common';
import HomeAreaFilter from '../../../../components/HomeAreaFilter';
import { PMR_SCHEDULE_GROUP_FREQUENCY } from '../../../../constants/pmr';
import moment from 'moment';
import { displayDate, setMomentObj } from '../../../../util/moment';
import { getUserNameWithDesignation } from '../../../../util/common';
import ReactTableScroll from 'rc-table-s';
import Tooltip from 'rc-tooltip';
import { Info } from '../../../../assets/images/popup';

const _ = require('lodash');

let pushDayDiff;

const UpsertForm = (props) => {
  const {
    visible,
    form,
    isSetPref,
    loadResident,
    total,
    onHomeArea,
    getDetail,
    residentList,
    onResidentId,
    defaultValues,
    onHomeAreaValue,
    onSearch,
    // errorRef
  } = props;
  console.log("UpsertForm -> props", props)

  const {
    getFieldError,
    getFieldDecorator,
    validateFields,
    setFieldsValue,
    getFieldsValue,
  } = form;
  let errors;
  const [patientData, setPatientData] = useState('');
  const errorRef = useRef(false);

  useEffect(() => {
    if (getDetail) {
      let obj = {
        groupName: getDetail.groupName,
        frequency: getDetail.frequency,
        totalDays: getDetail.totalDays,
        pushDays: getDetail.pushDays,
        dueDays: getDetail.dueDays,
        startDate: setMomentObj(getDetail.startDate),
        endDate: setMomentObj(getDetail.endDate),
        pushDate: displayDate(getDetail.startDate),
        dueDate: displayDate(getDetail.endDate),
        homeAreaIds: _.map(getDetail?.homeAreaIds, (dd) => {
          return dd.id;
        }),
      };
      setFieldsValue(obj);
    }
  }, [getDetail]);

  const disabledDate = (current) => {
    if (!current) {
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current && current < date.endOf('day'); // can not select days before today and today
  };

  const residentColumns = () => [
    {
      text: 'Resident',
      valueKey: 'mergeLFName',
      width: '250px',
      render: (text, record) => {
        return (
          <>
            <span style={{ wordWrap: 'break-word' }}>
              {text || '-'}
              {record.pmrGroup && _.size(record.pmrGroup) > 0 ? (
                <Tooltip
                  overlay={
                    <div>
                      <b>Group Name</b>
                      {_.map(record.pmrGroup, (p) => {
                        return (
                          <ul>
                            <li>{p.groupName}</li>
                          </ul>
                        );
                      })}
                    </div>
                  }
                >
                  <Info
                    style={{
                      marginTop: '2px',
                      marginLeft: '5px',
                      cursor: 'pointer',
                      width: '17px',
                      height: '17px',
                    }}
                  />
                </Tooltip>
              ) : null} &nbsp;&nbsp;
              <Tooltip
                overlay={
                  <div>
                    <b>Added from</b>
                  </div>
                }
              >
                <span style={{ height: '30px', width: '40px' }} className='o_status submitted'>{!record.pccId && !record.krollId ? 'WRITI' : 'KROLL'}</span>
              </Tooltip>
            </span>
          </>
        );
      },
    },
    {
      text: "Room No",
      valueKey: "room",
      width: "100px",
      render: (text) => {
        return <span>{text ? text : '-'}</span>;
      },
    },
    {
      text: "Home Area",
      valueKey: "homeAreaId",
      width: "200px",
      render: (text, record) => {
        return <span>{text ? text.name : "-"}</span>;
      },
    },
    {
      text: 'Physician',
      valueKey: 'physicianId',
      width: '100px',
      render: (text) => {
        return <span>{text ? getUserNameWithDesignation(text) : '-'}</span>;
      },
    },
    {
      text: 'HC #',
      valueKey: 'hc',
      width: '100px',
      render: (text) => <span>{text || '-'}</span>,
    },
  ];

  const dateFrequencyChanges = (value, key) => {
    let frequency = null,
      startDate = null,
      endDate = null;
    let fieldValue = getFieldsValue(['frequency', 'startDate', 'endDate']);

    frequency = key === 'frequency' ? value : fieldValue.frequency;
    startDate = key === 'startDate' ? value : fieldValue.startDate;
    endDate = key === 'endDate' ? value : fieldValue.endDate;

    if (frequency && startDate) {
      if (frequency === PMR_SCHEDULE_GROUP_FREQUENCY.MONTHLY) {
        endDate = moment(startDate).add(1, 'month');
      } else if (frequency === PMR_SCHEDULE_GROUP_FREQUENCY.QUARTERLY) {
        endDate = moment(startDate).add(3, 'month');
      } else if (frequency === PMR_SCHEDULE_GROUP_FREQUENCY.SEMI_ANNUAL) {
        endDate = moment(startDate).add(6, 'month');
      } else if (frequency === PMR_SCHEDULE_GROUP_FREQUENCY.YEARLY) {
        endDate = moment(startDate).add(1, 'year');
      }
      setFieldsValue({ endDate: endDate });
      // Set validation for start date, push days
      let pushDiff = startDate.diff(moment().format(), 'days');
      pushDayDiff = pushDiff + 1; //set max value for push days
    }

    if (startDate && endDate) {
      let dayDiff = endDate.diff(startDate, 'days');
      setFieldsValue({ totalDays: dayDiff });
    }
  };

  const dayChangeFn = (value, key) => {
    value = parseInt(value);
    let fieldValue = getFieldsValue(['startDate']);
    let startDate = fieldValue.startDate;

    if (key === 'pushDay') {
      let validateObj = validatePushDueDays(value, pushDayDiff, 'Push Days');
      if (!validateObj.validateStatus) {
        Toast.error(validateObj.errorMsg);
      }
      if (value) {
        let pushDate = moment(startDate)
          .subtract(value, 'days')
          .format('MM/DD/YYYY');
        setFieldsValue({
          pushDate: pushDate,
        });
      } else {
        setFieldsValue({ pushDate: '' });
      }
    } else if (key === 'dueDay') {
      let validateObj = validatePushDueDays(value, pushDayDiff, 'Due Days');
      if (!validateObj.validateStatus) {
        Toast.error(validateObj.errorMsg);
        return;
      }
      if (value) {
        if (value > form.getFieldValue('pushDays')) {
          Toast.error(`Cannot add due days, which can go below the Start Date`);
          return;
        }
        let dueDate = moment(startDate)
          .subtract(value, 'days')
          .format('MM/DD/YYYY');
        setFieldsValue({
          dueDate: dueDate,
        });
      } else {
        setFieldsValue({ dueDate: '' });
      }
    }
  };

  function validatePushDueDays(number, pushDayDiff, key) {
    if (!number) {
      errorRef.current = {
        validateStatus: false,
        errorMsg: 'Please input minimum 1 day',
      };
      return errorRef.current;
    }
    if (!key) return;

    if (number <= pushDayDiff) {
      errorRef.current = {
        validateStatus: true,
        errorMsg: '',
      };
      return errorRef.current;
    }
    errorRef.current = {
      validateStatus: false,
      errorMsg: `Cannot add ${key}, which can go below the Start Date`,
    };
    return errorRef.current;
  }

  return (
    <>
      <div className='form_row'>
        <div className='form_group col-12'>
          <label>
            Group Name<span>*</span>
          </label>
          {getFieldDecorator('groupName', {
            rules: [
              {
                required: false,
                whitespace: true,
              },
            ],
          })(
            <Input
              style={{ width: '100%' }}
              name='groupName'
              placeholder='Name'
            />
          )}
          {(errors = getFieldError('groupName')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
        {isSetPref ? (
          <>
            <div className='form_group col-4 required'>
              <label>
                Frequency<span>*</span>
              </label>
              {getFieldDecorator('frequency', {
                rules: [
                  {
                    required: true,
                    message: 'Please Select Frequency',
                  },
                ],
              })(
                <Select
                  name='frequency'
                  mode='single'
                  onChange={(value) => dateFrequencyChanges(value, 'frequency')}
                  placeholder='Select Frequency'
                >
                  {Object.keys(PMR_SCHEDULE_GROUP_FREQUENCY).map((val) => {
                    return (
                      <Option
                        key={val}
                        value={PMR_SCHEDULE_GROUP_FREQUENCY[val]}
                      >
                        {val.replace(/_/g, ' ')}
                      </Option>
                    );
                  })}
                </Select>
              )}
              {(errors = getFieldError('frequency')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>
            <div className='form_group col-4 required'>
              <label>
                Start Date<span>*</span>
              </label>
              {getFieldDecorator('startDate', {
                rules: [
                  {
                    required: true,
                    message: 'Please select Start date',
                  },
                ],
              })(
                <DateTimePicker
                  name='startDate'
                  timePicker={false}
                  // value={}
                  disabledDate={disabledDate}
                  placeholder='select start date'
                  disabled={!form.getFieldValue('frequency')}
                  onChange={(value) => dateFrequencyChanges(value, 'startDate')}
                />
              )}
              {(errors = getFieldError('startDate')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>
            <div className='form_group col-4 required'>
              <label>
                End Date<span>*</span>
              </label>
              {getFieldDecorator('endDate', {
                rules: [
                  {
                    required: true,
                    message: 'Please select end date',
                  },
                ],
              })(
                <DateTimePicker
                  name='endDate'
                  placeholder='select end date'
                  disabled={true}
                  onChange={(value) => dateFrequencyChanges(value, 'endDate')}
                />
              )}
              {(errors = getFieldError('endDate')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>

            <div className='form_group col-4'>
              <label>Total Days</label>
              {getFieldDecorator('totalDays')(
                <Input
                  type='number'
                  name='totalDays'
                  placeholder='Total Days'
                  disabled={true}
                />
              )}
            </div>
            <div className='form_group col-4 required'>
              <label>
                Push Days<span>*</span>
              </label>
              {getFieldDecorator('pushDays')(
                <Input
                  name='pushDays'
                  type='number'
                  placeholder='Push Days'
                  min={1}
                  disabled={
                    !form.getFieldValue('frequency') ||
                    !form.getFieldValue('startDate')
                  }
                  onChange={(e) => dayChangeFn(e.target.value, 'pushDay')}
                />
              )}
            </div>
            <div className='form_group col-4'>
              <label>Push Date</label>
              {getFieldDecorator('pushDate')(
                <Input name='pushDate' disabled />
              )}
            </div>
            <div className='form_group col-4 required'>
              <label>
                Due Days<span>*</span>
              </label>
              {getFieldDecorator('dueDays')(
                <Input
                  type='number'
                  name='dueDays'
                  placeholder='Due Days'
                  min={0}
                  max={form.getFieldValue('pushDays')}
                  disabled={!form.getFieldValue('startDate')}
                  onChange={(e) => dayChangeFn(e.target.value, 'dueDay')}
                />
              )}
            </div>
            <div className='form_group col-4'>
              <label>Due Date</label>
              {getFieldDecorator('dueDate')(<Input name='dueDate' disabled />)}
            </div>

            <div className='form_group col-12 required'>
              <label>
                Home Area<span>*</span>
              </label>
              {getFieldDecorator('homeAreaIds', {
                rules: [
                  {
                    required: true,
                    message: 'Please select home area',
                  },
                ],
              })(
                <HomeAreaFilter
                  name='homeAreaIds'
                  onChange={onHomeArea}
                  defaultValue={defaultValues}
                  // defaultValue={homeAreaDefault}
                  multiple={true}
                />
              )}
              {(errors = getFieldError('homeAreaIds')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>

            <div className='col-12'>
              <div
                className='page_head'
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <h3>
                  Residents <span className='r_no'>{total ? total : ''}</span>
                </h3>

                <div className='form_group' style={{ paddingTop: '5px' }}>
                  {onHomeAreaValue?.length > 0 && residentList && (
                    <Search
                      onChange={onSearch}
                      allowClear={true}
                      placeholder='Search by resident'
                      style={{ width: '250px' }}
                    />
                  )}
                </div>
              </div>
              <ReactTableScroll
                data={residentList}
                cols={residentColumns()}
                showCheckbox={true}
                onTableSelected={onResidentId}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default UpsertForm;
