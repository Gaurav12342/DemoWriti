import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Popup/index';
import { TextArea } from '../../../components/common/index';
import axios from '../../../services/api/config';
import { Toast } from '../../../components/common/Toast';
import { upsertCausion } from '../../../services/api/routes/pmr';
import RefOptionList from 'rc-select/lib/OptionList';

const PmrCautionModal = (props) => {
  const { visible, form, onCancel, title, pmrOrder, okText, editData } = props;
  const {
    getFieldDecorator,
    validateFields,
    setFieldsValue,
    resetFields,
  } = form;
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      let obj = {
        alertText: pmrOrder.alertNote?.alertText,
      };

      setFieldsValue(obj);
    }
  }, [editData]);

  const addAlert = () => {
    setBtnLoading(true);
    validateFields((err, values) => {
      if (err) {
        Toast.error('Please Add Causion');
        return;
      }
      let request = {
        _id: editData ? pmrOrder.alertNote._id : undefined,
        pmrOrderId: pmrOrder?._id,
        alertText: values.alertText,
      };
      let { method, url, baseURL } = upsertCausion;
      axios({ method, url, baseURL, data: request })
        .then((response) => {
          if (response?.data.code == 'OK') {
            setBtnLoading(false);
            onCancel(response?.data.data, false);
            // onCancel(response?.data.data);
            Toast.success(response.data.message);
            resetFields();
          } else {
            setBtnLoading(false);
            Toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setBtnLoading(false);
        });
    });
  };
  return (
    <>
      <Modal
        form={form}
        visible={visible}
        title={title}
        onCancel={onCancel}
        onClose={onCancel}
        maskClosable={false}
        onOk={addAlert}
        okButtonProps={{ loading: btnLoading }}
        // cancelText={cancelText}
        // style={{ width: '50%' }}
        okText={okText}
      >
        <div className='form_row'>
          <div className='form_group col-12'>
            <label>
              Add Caution<span>*</span>
            </label>
            <div className='additional-textarea'>
              <div className='form_wrap mb-12'>
                {getFieldDecorator('alertText', {
                  rules: [
                    {
                      required: false,
                      message: 'Please enter the description.!',
                    },
                  ],
                })(<TextArea name='alertText' />)}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PmrCautionModal;
