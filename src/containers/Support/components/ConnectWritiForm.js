import React, { useState, useEffect } from 'react';
import { TextArea, Button, ErrorMsg } from '../../../components/common/index';
import { URGENCY, SUPPORT_TYPE } from '../../../constants/supportFeedback';

const ConnectWritiForm = (props) => {
  const {
    form,
    supportType,
    onSubmit,
    handleCancel,
    editRecord,
    loading,
  } = props;
  const {
    getFieldDecorator,
    validateFields,
    setFieldsValue,
    getFieldError,
  } = form;
  const [urgencyName, setUrgencyName] = useState(1);
  let errors;
  useEffect(() => {
    if (editRecord) {
      let obj = {
        query: editRecord.query,
        urgency: editRecord.urgency,
        type: editRecord.type,
      };
      setFieldsValue(obj);
    }
  }, [editRecord]);

  const handleConnectSubmit = () => {
    validateFields((error, value) => {
      let obj = {
        query: value.query1,
        urgency: urgencyName,
        type: supportType,
      };
      if (!error) {
        onSubmit(obj);
      }
    });
  };

  return (
    <>
      <div className='form_row' style={{ marginTop: '2%' }}>
        <div className='form_group col-12'>
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
        <div className='form_group col-12 required'>
          <label>
            Submit your query here<span>*</span>
          </label>
          <div className='additional-textarea'>
            <div className='form_wrap mb-10'>
              {getFieldDecorator('query1', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your query.!',
                  },
                ],
              })(
                <textarea
                  className='form_control'
                  style={{
                    width: '100%',
                    borderColor: '#919A9F',
                    borderRadius: 'unset',
                    minHeight: 100,
                  }}
                  name='query1'
                  rows={8}
                />
              )}
            </div>
          </div>
          <div className='form_wrap mb-10'>
            {(errors = getFieldError('query1')) ? (
              <ErrorMsg errors={errors} />
            ) : null}
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
            onClick={handleConnectSubmit}
          >
            Ask for assistance
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConnectWritiForm;
