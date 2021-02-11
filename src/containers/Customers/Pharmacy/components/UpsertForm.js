import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Input,
  Button,
  TextArea,
  ErrorMsg,
  Select,
  Option,
} from '../../../../components/common/index';
const _ = require('lodash');

const UpsertForm = (props) => {
  let errors;
  const {
    form,
    editPhamacy,
    parentPharmacy,
    store,
    onTabChange,
    editId,
    onCancel,
    onTabVisible,
    onTabVisible1,
    onSave,
  } = props;
  const { getFieldError, getFieldDecorator, setFieldsValue } = form;
  const PREVENT_SPECIAL_CHARS_ARRAY = ['e', '=', ',', '-', '.'];
  useEffect(() => {
    if (editId) {
      if (editPhamacy) {
        let emailData = _.find(editPhamacy.emails, { isPrimary: true });
        let faxData = _.find(editPhamacy.faxes, { isPrimary: true });
        let addressData = _.find(editPhamacy.addresses, { isPrimary: true });

        let obj = {
          name: editPhamacy.name,
          phone: editPhamacy.phone,
          website: editPhamacy.website,
          storeId: editPhamacy.storeId,
          parentId: editPhamacy.parentId,
          code: editPhamacy.code,
          email: emailData ? emailData.email : '',
          fax: faxData ? faxData.fax : '',
          line1: addressData ? addressData.line1 : '',
          line2: addressData ? addressData.line2 : '',
          city: addressData ? addressData.city : '',
          country: addressData ? addressData.country : '',
          postalCode: addressData ? addressData.postalCode : '',
          province: addressData ? addressData.province : '',
        };
        setFieldsValue(obj);
      }
    }
  }, [editPhamacy, editId]);

  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-3 required'>
          <label>
            Name<span>*</span>
          </label>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please enter the name.!',
              },
            ],
          })(<Input name='name' />)}
          {(errors = getFieldError('name')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3 '>
          <label>
            Parent Pharmacy<span>*</span>
          </label>
          {getFieldDecorator('parentId', {
            rules: [
              {
                required: false,
                message: 'Please enter the email.!',
              },
            ],
          })(
            <Select
              name='parentId'
              placeholder='Select parent pharmacy'
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {parentPharmacy.map((data) => {
                return (
                  <Option value={data._id} key={data._id} disabled={!data.isActive}>
                    {data.name}
                  </Option>
                );
              })}
            </Select>
          )}
          {(errors = getFieldError('parentId')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3'>
          <label>
            StoreId<span>*</span>
          </label>
          {getFieldDecorator('storeId', {
            rules: [
              {
                required: false,
                message: 'Please select the store Id.!',
              },
            ],
          })(
            <Select name='storeId' placeholder='Select store Id' allowClear>
              {store &&
                store.length &&
                store.map((data) => {
                  return (
                    <>
                      <Option value={data.id} key={data.id}>
                        {data.name}
                      </Option>
                    </>
                  );
                })}
            </Select>
          )}
          {(errors = getFieldError('storeId')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3 '>
          <label>
            Code<span>*</span>
          </label>
          {getFieldDecorator('code', {
            rules: [
              {
                required: false,
                message: 'Please enter the stlCode.!',
              },
            ],
          })(<Input name='code' />)}
          {(errors = getFieldError('code')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '1%' }}>
        <div className='form_group col-3 required'>
          <label>
            Email<span>*</span>
          </label>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please enter the email.!',
              },
            ],
          })(<Input name='email' />)}
          {(errors = getFieldError('email')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3'>
          <label>
            Fax<span>*</span>
          </label>
          {getFieldDecorator('fax', {
            rules: [
              {
                required: false,
                message: 'Please enter the fax.!',
              },
            ],
          })(<Input name='fax' />)}
          {(errors = getFieldError('fax')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3'>
          <label>
            Phone No<span>*</span>
          </label>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: false,
                message: 'Please enter the phone number.!',
              },
            ],
          })(
            <Input
              type='number'
              name='phone'
              onKeyDown={(evt) => {
                if (PREVENT_SPECIAL_CHARS_ARRAY.includes(evt.key))
                  evt.preventDefault();
              }}
            />
          )}
          {(errors = getFieldError('phone')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3 '>
          <label>
            Website<span>*</span>
          </label>
          {getFieldDecorator('website', {
            rules: [
              {
                required: false,
                message: 'Please enter the website name.!',
              },
            ],
          })(<Input name='website' />)}
          {(errors = getFieldError('website')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '1%' }}>
        <div className='form_group col-6'>
          <label>
            Address 1<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('line1', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the address line 1.!',
                  },
                ],
              })(<TextArea name='line1' />)}
            </div>
          </div>
        </div>

        <div className='form_group col-6'>
          <label>
            Address 2<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('line2', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the address line 2.!',
                  },
                ],
              })(<TextArea name='line2' />)}
            </div>
          </div>
        </div>
      </div>

      <div
        className='form_row'
        style={{ marginTop: '1%', marginBottom: '14%' }}
      >
        <div className='form_group col-3 '>
          <label>
            City<span>*</span>
          </label>
          {getFieldDecorator('city', {
            rules: [
              {
                required: false,
                message: 'Please enter the city.!',
              },
            ],
          })(<Input name='city' />)}
          {(errors = getFieldError('city')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3 '>
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

        <div className='form_group col-3 '>
          <label>
            Postal Code<span>*</span>
          </label>
          {getFieldDecorator('postalCode', {
            rules: [
              {
                required: false,
                message: 'Please enter the postal code.!',
              },
            ],
          })(<Input name='postalCode' />)}
          {(errors = getFieldError('postalCode')) ? (
            <ErrorMsg errors={errors} />
          ) : null}
        </div>

        <div className='form_group col-3 '>
          <label>
            Country<span>*</span>
          </label>
          {getFieldDecorator('country', {
            rules: [
              {
                required: false,
                message: 'Please enter the country.!',
              },
            ],
          })(<Input name='country' />)}
          {(errors = getFieldError('country')) ? (
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
          <Button size='lg' onClick={onCancel} type='secondary'>
            Cancel
          </Button>
          <Button
            onClick={() => onTabChange('2')}
            size='lg'
            style={{ marginLeft: '10px' }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default withRouter(UpsertForm);
