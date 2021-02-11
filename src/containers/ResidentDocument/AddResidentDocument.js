import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Popup/index';
import {
  ErrorMsg,
  Select,
  Option,
  DateTimePicker,
  Button,
  FileList,
} from '../../components/common/index';
import HomeAreaFilter from '../../components/HomeAreaFilter';
import Uploader, {
  FILE_TYPES,
  FILE_CATEGORY,
} from '../../components/common/Upload/Uploader';
import { fileUpload } from '../../services/api/routes/common';
import { Attachments } from '../../assets/images/resident-detail';
import Thumbnail from "../../components/common/Upload/Thumbnail";
import axios, {
  getPrivateBucketUrl,
} from "../../services/api/services/common";
import { Download } from "../../assets/images/resident-detail";
import { extensions } from "../../components/common/Upload/Uploader"
import moment from 'moment';
import { createForm } from 'rc-form';
const _ = require('lodash');

const MasterUpsortForm = (props) => {
  const {
    visible,
    onCancel,
    form,
    isEdit,
    onUploadAction,
    isUploadVisible,
    recordTypeList,
    loading,
    documentList,
    onSubmit,
    residentListing,
    editRecord,
    onResidentSearch,
    onDatePickerChange,
  } = props;
  let errors;

  const [fileData, setFileData] = useState([]);

  const [ext, setExt] = useState('')
  let abc;
  useEffect(() => {
    _.map(fileData.data, (data) => {
      abc = data.path
    })
    var result = abc?.split("/").pop();
    var resultData = result?.split("?", 1);
    const ext = extensions.IMAGE.includes(resultData)
    if (ext) {
    }
    else {
      setExt(resultData)
    }
  }, [fileData])



  // const GetFilename = (url) => {
  //   console.log('URL', url);
  //   var res = url?.split("/").pop();
  //   var res1 = res?.split("?", 1);
  //   const ext = extensions.IMAGE.includes(res)
  //   if (ext) {
  //   }
  //   else {
  //     setExt(res1)
  //   }
  //   // if (url) {
  //   //   let p = url?.split('/').pop()
  //   //   return p
  //   // }
  //   // return "";
  // }


  const {
    getFieldError,
    getFieldDecorator,
    setFieldsValue,
    validateFields,
  } = form;

  const disableFutureDt = (current) => {
    const today = moment();
    return current.isAfter(today);
  };




  return (
    <>
      <Modal
        visible={visible}
        title={isEdit ? 'Edit Resident Document' : 'Add Resident Document'}
        onCancel={() => onCancel(false)}
        onClose={() => onCancel(false)}
        okText={isEdit ? 'Update' : 'Ok'}
        maskClosable={false}
        onOk={onSubmit}
        style={{ width: '50%' }}
        okButtonProps={{ loading: loading }}
      >
        <div className='form_row'>
          <div className='col-12'>
            <div className='form_group col-12 required'>
              <label>
                Resident<span>*</span>
              </label>
              {getFieldDecorator('residentId', {
                rules: [
                  {
                    required: true,
                    message: 'Please Search and Select Resident',
                  },
                ],
              })(
                <Select
                  showSearch
                  allowClear={true}
                  showArrow={false}
                  filterOption={false}
                  placeholder='Search Resident'
                  onSearch={onResidentSearch}
                  notFoundContent={null}
                >
                  {residentListing.length > 0
                    ? residentListing.map((resident) => {
                      return (
                        <Option value={resident._id}>
                          <span style={{ display: 'inline !important' }}>
                            {' '}
                            <p>
                              {resident.firstName} , {resident.lastName}
                              {'  '}
                              {resident && resident.hc
                                ? `(${resident.hc})`
                                : ''}
                              {'  '}
                              {resident &&
                                resident.homeAreaId &&
                                resident.homeAreaId.name
                                ? `(${resident.homeAreaId.name})`
                                : ''}
                            </p>
                          </span>
                        </Option>
                      );
                    })
                    : null}
                </Select>
              )}
              {(errors = getFieldError('residentId')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>
            {/* <div className='form_group col-12 required'>
              <label>
                Home Area<span>*</span>
              </label>
              {getFieldDecorator('homeAreaId', {
                rules: [
                  {
                    required: true,
                    message: 'Please Select HomeArea',
                  },
                ],
              })(<HomeAreaFilter placeholder='Filter Homearea' />)}
              {(errors = getFieldError('homeAreaId')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div> */}
            <div className='form_group col-12 required'>
              <label>
                Date and Time<span>*</span>
              </label>
              {getFieldDecorator('documentDate', {
                rules: [
                  {
                    required: true,
                    message: 'Please Select Date and Time',
                  },
                ],
              })(
                <DateTimePicker
                  placeholder='Select Date & Time*'
                  timePicker={true}
                  onChange={onDatePickerChange}
                  disabled={false}
                  disabledDate={disableFutureDt}
                  showOk={true}
                />
              )}
              {(errors = getFieldError('documentDate')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>

            <div className='form_group col-12 required'>
              <label>
                Record Type<span>*</span>
              </label>
              {getFieldDecorator('masterId', {
                rules: [
                  {
                    required: true,
                    message: `Please Select Record Type`,
                    whitespace: true,
                  },
                ],
              })(
                <Select
                  placeholder='Select Record Type'
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {recordTypeList &&
                    recordTypeList.map((data) => {
                      return (
                        <Option key={data.value} value={data.value}>
                          {data.text}
                        </Option>
                      );
                    })}
                </Select>
              )}
              {(errors = getFieldError('masterId')) ? (
                <ErrorMsg errors={errors} />
              ) : null}
            </div>

            <div className='form_row'>
              <div className='form_group col-12 required'>
                <Button
                  size='lg'
                  type='transparent'
                  style={{ width: '280px' }}
                  onClick={() => onUploadAction(true)}
                >
                  Upload Document
                </Button>
                <div className="form_row add-user">
                  {fileData && fileData.data && fileData.data.length > 0 && fileData.data.map((data) => {
                    return (
                      <div className="upd_img_wrap">
                        {/* <Thumbnail path={data.path} /> */}
                        <div onClick={() => { window.open(data.path, '_blank') }} download className="upd_img">
                          <div className="dwn_img">
                            <img src={data.path} />
                            <div className="dwn_ico">
                              <Download />
                            </div>
                          </div>
                          <p>{ext}</p>
                          {/* <p>{GetFilename(data.path)}</p> */}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {isUploadVisible ? (
              <Uploader
                visible={isUploadVisible}
                multiple={true}
                fileLength={10}
                // defaultList={isEdit ? documentList : []}
                onRequestClose={() => onUploadAction(false)}
                uploadUrl={{ ...fileUpload }}
                extraData={{
                  isUploadToS3: true,
                  isPrivateBucket: true,
                  returnSignedURL: true,
                  category: [FILE_CATEGORY.IMAGE].join(','),
                }}

                allowedTypes={[
                  FILE_TYPES.IMAGE,
                  // FILE_TYPES.PDF,
                  // FILE_TYPES.DOC,
                ]}
                // maxSizeInMB={1}
                onError={(err) => {
                  console.log('on error => ', err);
                }}
                onSuccess={(uploaded) => {
                  setFileData(uploaded);
                  onUploadAction(false, uploaded);
                }}
              />
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default createForm()(MasterUpsortForm);
