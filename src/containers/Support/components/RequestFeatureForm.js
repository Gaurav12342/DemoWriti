import React from 'react';
import {
  Input,
  TextArea,
  Button,
  Select,
  Option,
  ErrorMsg,
} from '../../../components/common/index';

const RequestFeatureForm = (props) => {
  const {
    form,
    supportType,
    handleCancel,
    handleSubmit,
    masterData,
    loading,
  } = props;
  const { getFieldDecorator, validateFields, getFieldError } = form;
  let errors;
  const handleRequestSubmit = () => {
    validateFields((error, value) => {
      let obj = {
        title: value.title,
        query: value.query2,
        category: value.category1,
        type: supportType,
      };
      if (!error) {
        handleSubmit(obj);
      }
    });
  };

  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12'>
          <label>
            Create suggestion<span>*</span>
          </label>
          {getFieldDecorator('category1', {
            rules: [
              {
                required: false,
                message: 'Select category.!',
              },
            ],
          })(
            <Select
              name='category1'
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder='Select category'
            >
              {masterData &&
                masterData.length &&
                masterData.map((data, index) => {
                  return (
                    <>
                      <Option name={index + 1} value={data._id}>
                        {data.code}
                      </Option>
                    </>
                  );
                })}
            </Select>
          )}
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12'>
          <label>
            Title<span>*</span>
          </label>
          {getFieldDecorator('title', {
            rules: [
              {
                required: false,
                message: 'Please enter short description title.!',
              },
            ],
          })(<Input name='title' />)}
        </div>
      </div>

      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12 required'>
          <label>
            Details<span>*</span>
            <div className='additional-textarea'>
              <div className='form_wrap mb-10'>
                {getFieldDecorator('query2', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter the query.!',
                    },
                  ],
                })(<TextArea name='query2' />)}
                {(errors = getFieldError('query2')) ? (
                  <ErrorMsg errors={errors} />
                ) : null}
              </div>
            </div>
          </label>
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
            onClick={handleRequestSubmit}
          >
            Request
          </Button>
        </div>
      </div>
    </>
  );
};

export default RequestFeatureForm;
