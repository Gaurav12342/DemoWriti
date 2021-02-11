import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Popup/index';
import { Input, Button, ErrorMsg } from '../../../components/common/index';
import { VERSION_PLATFORM } from '../../../constants/common';
import Thumbnail from "../../../components/common/Upload/Thumbnail";
const _ = require('lodash');

const VersionUpsertForm = (props) => {
  let errors;
  const {
    isVisible,
    onClose,
    onCancel,
    title,
    radioValue,
    okText,
    onOk,
    cancelText,
    form,
    value,
    uploaderOpen,
    filePath,
  } = props;

  
  const {
    getFieldDecorator,
    validateFields,
    getFieldError,
    setFieldsValue,
  } = form;
  const [checkValues, setCheckValues] = useState(
    value && value.isHardUpdate ? value.isHardUpdate : false
  );
  const [loading, setLoading] = useState(false);
  const [radioData, setRadioData] = useState(radioValue);
  const [platFormValue, setPlatformValue] = useState();

  const hadleRadioValue = (e) => {
    if (e.target.checked) {
      setRadioData(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    if (value) {
      setPlatformValue(value.platform);
      let obj = {
        name: value.name,
        number: value.number,
        platform: value.platform,
        isHardUpdate: value.isHardUpdate,
      };
      setFieldsValue(obj);
    }
  }, [value]);

  const handleChangeCheckBoxValue = (e) => {
    setCheckValues(e.target.checked);
  };

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        let obj = _.clone(value);
        obj = {
          platform: radioData,
          name: value.name,
          number: value.number,
          isHardUpdate: checkValues,
          isActive: false,
          apk_path: filePath != null ? filePath : null,
        };
        onOk(obj);
        setLoading(true);
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Modal
        visible={isVisible}
        onCancel={onCancel}
        onClose={onClose}
        style={{ width: '50%' }}
        title={title}
        maskClosable={false}
        onOk={handleSubmit}
        okText={okText}
        cancelText={cancelText}
        okButtonProps={{ loading: loading }}
      >
        <div className='form_row' style={{ marginTop: '2%' }}>
          <div
            className='form_group col-12 required'
            style={{ marginBottom: '3%' }}
          >
            <label>
              Version Name<span>*</span>
            </label>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please enter the version name.!',
                },
              ],
            })(<Input name='name' />)}
            {(errors = getFieldError('name')) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>
          <div
            className='form_group col-12 required'
            style={{ marginBottom: '3%' }}
          >
            <label>
              Version Number<span>*</span>
            </label>
            {getFieldDecorator('number', {
              rules: [
                {
                  required: true,
                  message: 'Please enter the version number.!',
                },
              ],
            })(<Input name='number' />)}
            {(errors = getFieldError('number')) ? (
              <ErrorMsg errors={errors} />
            ) : null}
          </div>
          <div className='form_group col-12 required'>
            <label>
              Platform<span>*</span>
            </label>
          </div>
          <div
            className=' col-12'
            style={{ marginBottom: '3%', display: 'flex' }}
          >
            {Object.keys(VERSION_PLATFORM).map((data, index) => {
              return (
                <>
                  <label className='filter_check radio'>
                    <input
                      type='checkbox'
                      name='platform'
                      value={VERSION_PLATFORM[data]}
                      checked={radioData === VERSION_PLATFORM[data]}
                      onChange={platFormValue ? platFormValue : hadleRadioValue}
                    // onChange={platFormValue ? platFormValue : hadleRadioValue}
                    />
                    <span className='checkbox radio'></span>
                    <span className='lbl'>{data.replace(/_/g, ' ')}</span>
                  </label>
                </>
              );
            })}
          </div>
          <div className='form_group col-3 inline_check'>
            <label className='filter_check checkbox'>
              <input
                type='checkbox'
                name='isHardUpdate'
                onChange={handleChangeCheckBoxValue}
                checked={checkValues}
              />
              <span className='checkbox'></span>
              <span className='lbl'>Hard Update</span>
            </label>
          </div>

          <div className='form_group col-12'>
            {radioData == VERSION_PLATFORM.HOME_BACKUP ||
              radioData == VERSION_PLATFORM.PRINT_EXE
              ? getFieldDecorator('apk_path')(
                <>
                  <Button
                    onClick={uploaderOpen}
                    type='transparent'
                    style={{ width: '250px' }}
                  >
                    Uplaod EXE
                    </Button>
                  <div className="form_row add-user">
                    {filePath && (
                      <div className="upd_img_wrap">
                        <Thumbnail path={filePath} />
                      </div>
                    )}
                  </div>
                </>
              )
              : null}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VersionUpsertForm;
