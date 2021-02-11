import React, { useState } from 'react';
import {
  Button,
  TextArea,
  Select,
  Option,
  ErrorMsg,
} from '../../../components/common/index';
import { URGENCY } from '../../../constants/supportFeedback';
import { PERMISSION_ACCESS_TYPE } from '../../../constants/subscription';
import { USER_TYPE } from '../../../constants/User';
import { DEVICE_TYPE } from '../../../constants/common';
import data from 'object-encrypt-decrypt';
const _ = require('lodash');

const BugsForm = (props) => {
  const {
    form,
    handleCancel,
    supportType,
    handleSubmit,
    authUser,
    loading,
  } = props;

  let checkPharmacyAdmin;
  Object.keys(USER_TYPE.PHARMACY).map((data) => {
    if (authUser.type == USER_TYPE.PHARMACY[data]) {
      // checkPharmacyAdmin =
      //   authUser.homeId.pharmacyId.assignedSubscriptionGroupId.groupPermissions;
      checkPharmacyAdmin =
        authUser?.pharmacyId?.assignedSubscriptionGroupId?.groupPermissions;
    } else {
      // checkPharmacyAdmin =
      //   authUser.homeId.assignedSubscriptionGroupId.groupPermissions;
      checkPharmacyAdmin =
        authUser?.homeId?.assignedSubscriptionGroupId?.groupPermissions;
    }
  });

  const { getFieldDecorator, validateFields, getFieldError } = form;
  const [urgencyName, setUrgencyName] = useState(1);
  let errors;
  const arrayData = [
    { value: 'Physician Review', key: '1' },
    { value: 'Nurse Prep', key: '2' },
    { value: 'To Do', key: '3' },
  ];

  const handleBugSubmit = () => {
    validateFields((error, value) => {
      let obj = {
        urgency: urgencyName,
        category: value.category2,
        query: value.query3,
        type: supportType,
        platform: DEVICE_TYPE.WEB
      };
      if (!error) {
        handleSubmit(obj);
      }
    });
  };

  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12 required'>
          <label>
            Urgency<span>*</span>
          </label>
          <div className='rx-btns drug-bts'>
            {Object.keys(URGENCY).map((name, index) => {
              return (
                <>
                  <a>
                    <Button
                      name='name'
                      className={
                        urgencyName === URGENCY[name] ? 'r-o-btn' : null
                      }
                      onClick={() => {
                        setUrgencyName(URGENCY[name]);
                      }}
                    >
                      {name}
                    </Button>
                  </a>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12'>
          <label>Which writi app(s) did this occure on?</label>
          {getFieldDecorator('category2', {
            rules: [
              {
                required: false,
                message: 'Select category.!',
              },
            ],
          })(
            <Select
              name='category2'
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder='Select category'
            >
              {_.map(checkPharmacyAdmin, (data) => {
                return (
                  <>
                    <Option key={data._id} value={data._id}>
                      {data.moduleName}
                    </Option>
                  </>
                );
              })}
              ,
            </Select>
          )}
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12 required'>
          <label>
            Details<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('query3', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter the detail.!',
                  },
                ],
              })(<TextArea name='query3' />)}
              {(errors = getFieldError('query3')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12' style={{ textAlign: 'right' }}>
          <Button size='lg' onClick={handleCancel} type='secondary'>
            Cancel
          </Button>
          &nbsp;
          <Button
            size='lg'
            type='primary'
            loading={loading}
            onClick={handleBugSubmit}
          >
            Submit bug report
          </Button>
        </div>
      </div>
    </>
  );
};

export default BugsForm;
