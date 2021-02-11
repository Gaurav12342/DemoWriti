import React, { useState, useEffect } from 'react';
import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
  ErrorMsg,
  Button,
  Input,
  TextArea,
  Select,
  Option,
} from '../../../components/common/index';
import Thumbnail from "../../../components/common/Upload/Thumbnail";
const _ = require('lodash');

const ProfileForm = (props) => {
  let errors;
  const {
    form,
    onUpdateProfile,
    authUser,
    onProfileLoader,
    onOpen,
    fileData,
  } = props;
  const {
    getFieldError,
    getFieldDecorator,
    setFieldsValue,
    validateFields,
  } = form;
  const timeArray = _.range(1, 31);
  const PREVENT_SPECIAL_CHARS_ARRAY = ['e', '=', ',', '-', '.'];
  const lockActivityArray = [
    { id: 30, value: 30 },
    { id: 45, value: 45 },
    { id: 60, value: 60 },
  ];

  

  useEffect(() => {
    if (authUser) {
      const emailData = _.find(authUser.emails, { isPrimary: true });
      const mobileData = _.find(authUser.mobiles, { isPrimary: true });
      const addressData = _.find(authUser.addresses, { isPrimary: true });
      let obj = {
        firstName: authUser?.firstName,
        lastName: authUser?.lastName,
        inActiveTime: authUser?.timeout.inActiveTime,
        lockScreenTime: authUser?.timeout.lockScreenTime,
        email: emailData?.email,
        mobile: mobileData?.mobile,
        image: authUser?.image,
        // line1: addressData.line1 != null ? addressData.line1 : "",
        // line2: authUser._id ? addressData.line2 : "",
        // province: authUser._id ? addressData.province : "",
        // pincode: authUser._id ? addressData.pincode : "",
        // city: authUser._id ? addressData.city : "",
        // country: authUser._id ? addressData.country : "",
      };
      setFieldsValue(obj);
    }
  }, [authUser]);

  const handleUpdateProfile = () => {
    validateFields((error, value) => {
      if (!error) {
        let obj = _.clone(value);
        obj.mergeLFName = obj.lastName + ',' + obj.firstName;
        if (obj) {
          obj.image = fileData ? fileData : null
          // obj.image = fileData ? fileData.path : null
        }
        if (obj.email && _.size(obj.email) > 0) {
          obj.emails = [
            {
              email: obj.email,
              isPrimary: true,
              id: '5f87cae4-2ab2-4181-a680-7275b389bd74',
            },
          ];
          delete obj.email;
        }
        if (obj.mobile && _.size(obj.mobile) > 0) {
          obj.mobiles = [{ mobile: obj.mobile, isPrimary: true }];
          delete obj.mobile;
        }
        if (obj) {
          obj.address = {
            line1: obj.line1,
            line2: obj.line2,
            city: obj.city,
            province: obj.province,
            country: obj.country,
            pincode: obj.pincode,
            isPrimary: true,
          };

          delete obj.line1;
          delete obj.line2;
          delete obj.city;
          delete obj.province;
          delete obj.country;
          delete obj.pincode;
        }
        if (obj) {
          obj.timeout = {
            inActiveTime: obj.inActiveTime,
            lockScreenTime: obj.lockScreenTime,
          };
          delete obj.inActiveTime;
          delete obj.lockScreenTime;
        }

        onUpdateProfile(obj);
      }
    });
  };

  // const compareToFirstPassword = (rule, value, callback) => {
  //   if (value && value !== getFieldValue('newPassword')) {
  //     alert('Please not enter the special character.');
  //   } else {
  //     callback();
  //   }
  // };

  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-3 required'>
          <label>
            FirstName<span>*</span>
          </label>
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please enter the first name.!',
              },
            ],
          })(<Input name='firstName' />)}
          {(errors = getFieldError('firstName')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
        <div className='form_group col-3 required'>
          <label>
            LastName<span>*</span>
          </label>
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter the last name.!',
              },
            ],
          })(<Input name='lastName' />)}
          {(errors = getFieldError('lastName')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
        <div className='form_group col-3 required'>
          <label>
            Email<span>*</span>
          </label>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please enter the email address.!',
              },
            ],
          })(<Input name='email' />)}
          {(errors = getFieldError('email')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
        <div className='form_group col-3'>
          <label>
            Mobile
          </label>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: false,
                message: 'Please enter the phone no.!',
              },
            ],
          })(
            <Input
              type='number'
              name='mobile'
              onKeyDown={(evt) => {
                if (PREVENT_SPECIAL_CHARS_ARRAY.includes(evt.key))
                  evt.preventDefault();
              }}
            />
          )}
          {(errors = getFieldError('mobile')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-6'>
          <label>
            Address1<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('line1', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the addrsess line 1.!',
                  },
                ],
              })(<TextArea name='line1' />)}
            </div>
          </div>
        </div>
        <div className='form_group col-6'>
          <label>
            Address2<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('line2', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the addrsess line 2.!',
                  },
                ],
              })(<TextArea name='line2' />)}
            </div>
          </div>
        </div>
      </div>
      <div className='form_row' style={{ marginTop: '1%' }}>
        <div className='form_group col-3'>
          <label>
            Country<span>*</span>
          </label>
          {getFieldDecorator('country', {
            rules: [
              {
                required: false,
                message: 'Please enter the country name.!',
              },
            ],
          })(<Input name='country' />)}
          {(errors = getFieldError('country')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
        <div className='form_group col-3'>
          <label>
            Province<span>*</span>
          </label>
          {getFieldDecorator('province', {
            rules: [
              {
                required: false,
                message: 'Please enter the province.!',
              },
            ],
          })(<Input name='province' />)}
          {(errors = getFieldError('province')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
        <div className='form_group col-3'>
          <label>
            City<span>*</span>
          </label>
          {getFieldDecorator('city', {
            rules: [
              {
                required: false,
                message: 'Please enter the city name.!',
              },
            ],
          })(<Input name='city' />)}
          {(errors = getFieldError('city')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
        <div className='form_group col-3'>
          <label>
            Pincode<span>*</span>
          </label>
          {getFieldDecorator('pincode', {
            rules: [
              {
                required: false,
                message: 'Please enter the postal code.!',
              },
            ],
          })(<Input name='pincode' />)}
          {(errors = getFieldError('pincode')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
      </div>
      <div
        className='form_row'
        style={{ marginTop: '2%', paddingBottom: '10%' }}
      >
        <div className='form_group col-3'>
          <label>
            InActivity Time Out<span>*</span>
          </label>

          {getFieldDecorator('inActiveTime')(
            <Select
              name='inActiveTime'
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder='Inactivity Timeout'
            >
              {timeArray &&
                timeArray.map((time) => {
                  return (
                    <>
                      <Option value={time}>{`${time} mins`}</Option>{' '}
                    </>
                  );
                })}
            </Select>
          )}
          <p className="font-18"> Select activity timeout between 1 & 30 (mins)</p>
        </div>

        <div className='form_group col-3'>
          <label>
            Lock Screen Time Out<span>*</span>
          </label>
          {getFieldDecorator('lockScreenTime')(
            <Select
              name='lockScreenTime'
              className='inputForm select'
              placeholder='Inactivity Timeout'
            >
              {lockActivityArray &&
                lockActivityArray.map((time) => {
                  return (
                    <>
                      <Option
                        key={time.id}
                        value={time.id}
                      >{`${time.value} mins`}</Option>{' '}
                    </>
                  );
                })}
            </Select>
          )}
        </div>
        <div className='form_group col-3'>
          <Button
            type='transparent'
            style={{ width: '100%', marginTop: '20px' }}
            onClick={() => {
              onOpen();
            }}
          >
            Upload Image
          </Button>

          <div className="form_row add-user">
            {fileData && (
              <div className="upd_img_wrap">
                <Thumbnail path={fileData} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='form_row' style={{ marginTop: '1%' }}>
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
            size='lg'
            loading={onProfileLoader}
            onClick={handleUpdateProfile}
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );
};
export default ProfileForm;
