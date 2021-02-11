import React from 'react';
import {
  Select,
  Option,
  Button,
  ErrorMsg,
  Input,
} from '../../../../components/common';
import { Info } from '../../../../assets/images/popup';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const settingForm = (props) => {
  let errors;
  const { onSave, editId, onRedirect, form, subscripData, loading } = props;
  const { getFieldDecorator, getFieldError, getFieldValue } = form;
  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-5 required' style={{ float: 'left' }}>
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

      <div className='form_row' style={{ marginTop: '1%' }}>
        <div
          className='form_group col-5'
          style={{ float: 'left', marginBottom: '500px' }}
        >
          <label>
            Printer Name<span>*</span>
          </label>

          {getFieldDecorator('printerName', {
            rules: [
              {
                required: false,
                message: `Please enter the printer name.`,
              },
            ],
          })(<Input name='printerName' />)}
          {(errors = getFieldError('printerName')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div
          className='form_group col-5'
          style={{ float: 'left', marginBottom: '300px' }}
        >
          <label>
            Machine Id<span>*</span>
          </label>

          {getFieldDecorator('machineId', {
            rules: [
              {
                required: false,
                message: `Please enter the machine id.`,
              },
            ],
          })(<Input name='machineId' />)}
          {(errors = getFieldError('machineId')) ? (
            <ErrorMsg errors={errors} />
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
          <Button type='secondary' size='lg' onClick={onRedirect}>
            Cancel
          </Button>
          <Button
            size='lg'
            onClick={onSave}
            loading={true}
            style={{ marginLeft: '10px' }}
          >
            {editId ? 'Update' : 'Add'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default settingForm;
