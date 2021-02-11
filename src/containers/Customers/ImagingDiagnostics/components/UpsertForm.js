import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Input,
  Button,
  TextArea,
  ErrorMsg,
} from '../../../../components/common/index';
import {
  Download,
} from '../../../../assets/images/resident-detail/index';
import Thumbnail from "../../../../components/common/Upload/Thumbnail";
const _ = require('lodash');

const UpsertForm = (props) => {
  let errors;
  const {
    form,
    editImagningDiagnostics,
    onTabChange,
    onCancel,
    editId,
    onLogoVisible,
    onXrayVisible,
    onUltraSoundVisible,
    onLogoData
  } = props;

  console.log('onLogoData', onLogoData);

  const { getFieldError, getFieldDecorator, setFieldsValue } = form;
  const PREVENT_SPECIAL_CHARS_ARRAY = ['e', '=', ',', '-', '.'];
  useEffect(() => {
    if (editId) {
      if (editImagningDiagnostics) {
        let emailData = _.find(editImagningDiagnostics.emails, {
          isPrimary: true,
        });
        let faxData = _.find(editImagningDiagnostics.faxes, {
          isPrimary: true,
        });
        let addressData = _.find(editImagningDiagnostics.addresses, {
          isPrimary: true,
        });
        let obj = {
          name: editImagningDiagnostics.name,
          code: editImagningDiagnostics.code,
          phone: editImagningDiagnostics.phone,
          website: editImagningDiagnostics.website,
          email: emailData ? emailData.email : '',
          fax: faxData ? faxData.fax : '',
          city: addressData ? addressData.city : '',
          country: addressData ? addressData.country : '',
          line1: addressData ? addressData.line1 : '',
          line2: addressData ? addressData.line2 : '',
          postalCode: addressData ? addressData.postalCode : '',
          province: addressData ? addressData.province : '',
        };
        setFieldsValue(obj);
      }
    }
  }, [editImagningDiagnostics, editId]);

  const GetFilename = (url) => {
    if (url) {
      let p = url.split('/').pop()
      return p
    }
    return "";
  }

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
                message: 'Please enter the fax detail.!',
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
      </div>

      {/* <div className='form_row' style={{ marginTop: '1%' }}>
        
        
      </div> */}

      <div className='form_row' style={{ marginTop: '1%' }}>
        <div className='form_group col-6 '>
          <label>
            Address 1<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('line1', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the line1.!',
                  },
                ],
              })(<TextArea name='line1' />)}
            </div>
          </div>
        </div>

        <div className='form_group col-6 '>
          <label>
            Address 2<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('line2', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter the line 2.!',
                  },
                ],
              })(<TextArea name='line2' />)}
            </div>
          </div>
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '1%' }}>
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
                message: 'Please enter the country name.!',
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
        style={{ marginTop: '1%', marginBottom: '135px' }}
      >
        <div className='form_group col-3'>
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
        <div className='form_group col-3'>
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
        <div className='form_group col-3 '>
          <label>
            Logo<span>*</span>
          </label>
          <>
            <Button
              type='transparent'
              style={{
                width: '100%',
              }}
              onClick={onLogoVisible}
            >
              Upload Logo
            </Button>
            <div className="form_row add-user">
              {onLogoData && (
                <div className="upd_img_wrap">
                  <Thumbnail path={onLogoData} />
                </div>
              )}
            </div>
            {/* {onLogoData && (
              <>
                <div className="upd_img_wrap mt-20">
                  <a href={onLogoData} target="_blank" download className="upd_img">
                    <div className="dwn_img">
                      <img src={onLogoData} />
                      <div className="dwn_ico">
                        <Download />
                      </div>
                    </div>
                    <p>
                      {GetFilename(onLogoData)}
                    </p>
                  </a>

                </div>
              </>
            )} */}
          </>
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
          <Button size='lg' type='secondary' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            size='lg'
            onClick={() => {
              onTabChange('2');
            }}
            // onClick={props.onSave}
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
