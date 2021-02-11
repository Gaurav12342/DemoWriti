import React from 'react';
// import { createForm } from "rc-form";
import { Input, Button, ErrorMsg } from '../../../components/common/index';
const _ = require('lodash');

const ChangesPasswordForm = (props) => {
  let errors;
  const { form, onResetPassword, onPassLoader } = props;
  const {
    getFieldError,
    getFieldDecorator,
    validateFields,
    resetFields,
    getFieldValue,
  } = form;

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('newPassword')) {
      callback('Confirm password not match.');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      validateFields(['conPassword'], { force: true });
    }
    callback();
  };

  const handleResetPassword = () => {
    validateFields((error, value) => {
      if (!error) {
        let obj = _.clone(value);
        obj.currentPassword = obj.currentPassword;
        obj.newPassword = obj.newPassword;
        // delete obj.conPassword;
        // resetFields();
        onResetPassword(obj);
      } else {
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-4 required'>
          <label>
            Current Passowrd<span>*</span>
          </label>
          {getFieldDecorator('currentPassword', {
            rules: [
              {
                required: true,
                message: 'Please enter the password.!',
              },
              {
                min: 8,
                message: 'Password must be minimum of 8 digit.',
              },
            ],
          })(
            <Input
              type='password'
              // placeholder="New Password *"
              name='currentPassword'
            />
          )}
          {(errors = getFieldError('currentPassword')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
      </div>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-4 required'>
          <label>
            New Passowrd<span>*</span>
          </label>
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: 'Please enter the password.!',
              },
              {
                min: 8,
                message: 'Password must be minimum of 8 digit.',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(
            <Input
              type='password'
              // placeholder="New Password *"
              name='newPassword'
            />
          )}
          {(errors = getFieldError('newPassword')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
      </div>
      <div
        className='form_row'
        style={{ marginTop: '2%', paddingBottom: '18%' }}
      >
        <div className='form_group col-4 required'>
          <label>
            Confirm Password<span>*</span>
          </label>
          {getFieldDecorator('conPassword', {
            rules: [
              {
                required: true,
                message: 'Please enter the confirm password.!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input
              type='password'
              // placeholder="Confirm Password *"
              name='conPassword'
            />
          )}
          {(errors = getFieldError('conPassword')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '2%' }}>
        <div
          className='form_group col-12'
          style={{
            textAlign: 'right',
            borderTop: '1px solid #919A9F',
            paddingTop: '20px',
            paddingBottom: '10px',
          }}
        >
          <Button
            loading={onPassLoader}
            onClick={handleResetPassword}
            size='lg'
          >
            Change Password{' '}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangesPasswordForm;
