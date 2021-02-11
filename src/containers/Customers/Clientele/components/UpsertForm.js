import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Input,
  Button,
  TextArea,
  ErrorMsg,
} from '../../../../components/common/index';
import Select, { Option } from '../../../../components/common/AutoComplete';
import { CLIENTELE_TYPE } from '../../../../constants/Customer';
const _ = require('lodash');

function UpsertForm(props) {
  let errors;
  const {
    form,
    queryData,
    getPharmacy,
    organization,
    imgDia,
    editCustomerData,
    handleClienteleRedirect,
    editId,
    onTabChange,
  } = props;
  const {
    getFieldError,
    getFieldDecorator,
    setFieldsValue,
    getFieldsValue,
    getFieldValue,
  } = form;
  const PREVENT_SPECIAL_CHARS_ARRAY = ['e', '=', ',', '-', '.'];

  useEffect(() => {
    if (editId) {
      if (editCustomerData) {
        let emailData = _.find(editCustomerData.emails, { isPrimary: true });
        let faxData = _.find(editCustomerData.faxes, { isPrimary: true });
        let addressData = _.find(editCustomerData.addresses);
        let obj = {
          name: editCustomerData.name,
          code: editCustomerData.code,
          phone: editCustomerData.phone,
          website: editCustomerData.website,
          pharmacyId: editCustomerData.pharmacyId,
          orgId: editCustomerData.orgId,
          imagingAndDiagnosticId: editCustomerData.imagingAndDiagnosticId,
          email: emailData ? emailData.email : '',
          fax: faxData ? faxData.fax : '',
          city: addressData ? addressData.city : '',
          line1: addressData ? addressData.line1 : '',
          line2: addressData ? addressData.line2 : '',
          postalCode: addressData ? addressData.postalCode : '',
          province: addressData ? addressData.province : '',
          country: addressData ? addressData.country : '',
        };
        setFieldsValue(obj);
        setFieldsValue({
          stlCode: editCustomerData ? editCustomerData.stlCode : '',
        });
      } else {
        return null;
      }
    }
  }, [editId, editCustomerData]);

  return (
    <>
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

          {queryData == CLIENTELE_TYPE.HOME && (
            <div className='form_group col-3 '>
              <label>
                Associated pharmacy<span>*</span>
              </label>
              {getFieldDecorator('pharmacyId', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the name.!',
                  },
                ],
              })(
                <Select
                  name='pharmacyId'
                  placeholder='Select associate pharmacy'
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {getPharmacy.map((data) => {
                    return (
                      <Option key={data._id} value={data._id} disabled={!data.isActive}>
                        {data.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
          )}

          {queryData == CLIENTELE_TYPE.HOME ? (
            <div className='form_group col-3 '>
              <label>
                Organization<span>*</span>
              </label>
              {getFieldDecorator('orgId', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the name.!',
                  },
                ],
              })(
                <Select
                  name='orgId'
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder='Select organization'
                >
                  {organization && organization.length
                    ? organization.map((data) => (
                      <Option key={data._id} value={data._id} disabled={!data.isActive}>
                        {data.name}
                      </Option>
                    ))
                    : null}
                </Select>
              )}
            </div>
          ) : null}

          {queryData == CLIENTELE_TYPE.HOME && (
            <div className='form_group col-3 '>
              <label>
                Imagine and Diagnostics<span>*</span>
              </label>
              {getFieldDecorator('imagingAndDiagnosticId', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the name.!',
                  },
                ],
              })(
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  name='imagingAndDiagnosticId'
                  placeholder='Select imagning and diagnostics'
                >
                  {imgDia &&
                    imgDia.length &&
                    imgDia.map((data) => {
                      return (
                        <Option key={data._id} value={data._id} disabled={!data.isActive}>
                          {data.name}
                        </Option>
                      );
                    })}
                </Select>
              )}
            </div>
          )}
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
                  message: 'Please enter the email addrsess.!',
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

          <div className='form_group col-3'>
            <label>
              Website<span>*</span>
            </label>
            {getFieldDecorator('website', {
              rules: [
                {
                  required: false,
                  message: 'Please enter the website.!',
                },
              ],
            })(<Input name='website' />)}
            {(errors = getFieldError('website')) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>
        </div>

        <div className='form_row' style={{ marginTop: '1%' }}>
          <div className='form_group col-6 '>
            <label>
              address1<span>*</span>
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

          <div className='form_group col-6 '>
            <label>
              address2<span>*</span>
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

        <div className='form_row'>
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

        <div
          className='form_row'
          style={{
            marginBottom: '250px',
            opacity: getFieldValue('imagingAndDiagnosticId') ? '1' : '0',
          }}
        >
          {/* {getFieldValue("imagingAndDiagnosticId") ? ( */}
          <div className='form_group col-3 '>
            <label>
              StlCode<span>*</span>
            </label>
            {getFieldDecorator('stlCode', {
              rules: [
                {
                  required: !!getFieldValue('imagingAndDiagnosticId'),
                  message: 'Please enter stl code',
                },
              ],
            })(<Input name='stlCode' />)}
            {(errors = getFieldError('stlCode')) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>
          {/* ) : null} */}
        </div>

        <div className='form_row' style={{ marginTop: '1%' }}>
          <div
            className='form_group col-12 required'
            style={{
              textAlign: 'right',
              borderTop: '1px solid #919A9F',
              paddingTop: '20px',
              paddingBottom: '10px',
            }}
          >
            <>
              <Button
                size='lg'
                type='secondary'
                onClick={handleClienteleRedirect}
              >
                Cancel
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                size='lg'
                onClick={() => {
                  onTabChange('2');
                }}
              >
                Next
              </Button>
            </>
          </div>
        </div>
      </>
    </>
  );
}
export default withRouter(UpsertForm);
