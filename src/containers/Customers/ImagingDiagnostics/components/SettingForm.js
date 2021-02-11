import React from 'react';
import {
  Select,
  Option,
  Button,
  ErrorMsg,
} from '../../../../components/common';
import { Info } from '../../../../assets/images/popup';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const SettingForm = (props) => {
  let errors;
  const { onSave, editId, onRedirect, form, subscripData } = props;
  const { getFieldDecorator, getFieldError, getFieldValue } = form;

  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div
          className='form_group col-5 required'
          style={{ marginBottom: '500px' }}
        >
          <label>
            Subscription<span>*</span>
          </label>
          {getFieldDecorator('assignedSubscriptionGroupId', {
            rules: [
              {
                required: true,
                message: `Please select`,
              },
            ],
          })(
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder='Select Subscription Plan'
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              name='assignedSubscriptionGroupId'
            >
              {subscripData.map((v) => {
                return (
                  <Option key={v.id} value={v.id}>
                    {v.name}
                  </Option>
                );
              })}
            </Select>
          )}
          {(errors = getFieldError('assignedSubscriptionGroupId')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
          {getFieldValue('subscriptionId') ? (
            <Tooltip overlay={'View Subscription'}>
              <Info style={{ marginLeft: '5px', cursor: 'pointer' }} />
            </Tooltip>
          ) : null}
        </div>
      </div>
      <div className='form_row'>
        <div
          className='form_group col-12'
          style={{
            textAlign: 'right',
            borderTop: '1px solid #919A9F',
            paddingTop: '20px',
            paddingBottom: '10px',
          }}
        >
          <Button type='secondary' onClick={onRedirect} size='lg'>
            Cancel
          </Button>
          <Button size='lg' onClick={onSave} style={{ marginLeft: '10px' }}>
            {editId ? 'Update' : 'Add'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingForm;
