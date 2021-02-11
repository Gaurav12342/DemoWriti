import React, { useEffect, useState } from 'react';
import { createForm } from 'rc-form';
import {
  Input,
  ErrorMsg,
  Select,
  Option,
  Button,
  DateTimePicker,
  Toast,
  Spin,
} from '../../../../../components/common';
import {
  ORDER_TYPE,
  RX_TYPE,
  STATUS,
  TYPE,
} from '../../../../../constants/prescription';
import { isDrOrNp } from '../../../../../util/common';
import {
  addFavouriteMeds,
  upsert,
} from '../../../../../services/api/routes/prescription';
import axios from '../../../../../services/api/services/common';
import { fileUpload } from '../../../../../services/api/routes/common';
import { PlusBtn } from '../../../../../assets/images/resident-detail/index';
import Uploader, {
  FILE_CATEGORY,
  FILE_TYPES,
} from '../../../../../components/common/Upload/Uploader';
import DoctorFilter from '../../../../../components/DoctorFilter';
import { Close, Next, Prev } from '../../../../../assets/images/index';
import Image from '../../../../../components/common/Image';
import _ from 'lodash';
import {
  dateTimeFormat,
  disabledHours,
  disabledMinutes,
  currentDate,
} from '../../../../../util/moment';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import Thumbnail from "../../../../../components/common/Upload/Thumbnail";

let selectedDate = currentDate;
const AddEprocessing = (props) => {
  const {
    form,
    residentDetail,
    authUser,
    onOk,
    onCancel,
    okLoader,
    documentTypes,
    subMasterLoader,
  } = props;
  let errors;
  const {
    getFieldValue,
    getFieldError,
    getFieldDecorator,
    validateFields,
  } = form;
  const [docType, SetDocType] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploadData, setUploadData] = useState([]);
  const [value, setValue] = useState();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currImg, setCurrImg] = useState(0);

  const showTime = {
    format: 'HH:mm',
    minuteStep: 5,
    showSecond: false,
    use12Hours: false,
    disabledHours: () => disabledHours(selectedDate),
    disabledMinutes: () => disabledMinutes(selectedDate),
  };

  const onChange = (date) => {
    if (date) selectedDate = date;
  };

  const handleSave = () => {
    validateFields((err, values) => {
      if (err) return;
      let preparedAttach = prepareAttachments(_.cloneDeep(uploadData));
      if (!docType) return Toast.error('Please select document type');
      if (preparedAttach && preparedAttach.length <= 0)
        return Toast.error('Please upload document');

      let request = {
        ...values,
        attachments: preparedAttach || [],
        thirdPartyPrescriptionType: docType,
      };
      if (onOk) onOk(request);
    });
  };

  const prepareAttachments = (attachments) => {
    return attachments.filter((x, i) => {
      if (x.status) {
        x.sequence = i;
        x.type = 0;
        delete x.status;
        delete x.showPath;
        delete x.isDownload;
      }
      return x;
    });
  };

  const handleChangeType = (e) => {
    SetDocType(e.target.value);
  };

  const handleVisibleUpload = (visible) => {
    setUploadVisible(visible);
  };

  const openViewer = (visiblity) => {
    setViewerIsOpen(visiblity);
  };
  const uploadedDocPath = uploadData.length > 0 ? uploadData[0] : null;

  const disableFutureDt = (current) => {
    const today = moment();
    return current.isAfter(today);
  };

  return (
    <>
      <div className='on_going_call_container'>
        <div className='call_header'>
          <h4>Add E-Processing for {residentDetail.mergeLFName} </h4>
          {/* <p>Created By : Nurse Patrick Jane, Created At : 26th May, 2020 | 04:00 pm</p> */}
        </div>
        <div className='call_detail_wrap'>
          <div className='call_detail_content'>
            <form>
              <div className='form_wrap flex-wrap'>
                <div className='doc_type filter_wrap'>
                  <div className='filter_section'>
                    <h4 className='filter_head'>Document Type</h4>
                    <div className='filter_value'>
                      {subMasterLoader && !documentTypes ? (
                        <Spin spinning={subMasterLoader} str='center'></Spin>
                      ) : (
                          documentTypes?.map((x) => {
                            return (
                              <label
                                className='filter_switch'
                                style={{ margin: '3px' }}
                              >
                                <input
                                  type='radio'
                                  name='doc'
                                  id={x._id}
                                  value={x._id}
                                  checked={docType === x._id}
                                  onChange={handleChangeType}
                                />
                                <span>{x.name}</span>
                              </label>
                            );
                          })
                        )}
                    </div>
                  </div>
                </div>
                <div
                  className='form_group col-12 required'
                  style={{
                    padding: '0px',
                    margin: '10px 0 0 0',
                  }}
                >
                  <label>
                    E-Processing Date<span>*</span>
                  </label>
                  {getFieldDecorator('orderGeneratedAt', {
                    rules: [
                      {
                        required: true,
                        message: 'Please select Date and Time',
                      },
                    ],
                  })(
                    <DateTimePicker
                      placeholder='Select Date & Time*'
                      value={value}
                      onChange={onChange}
                      timePicker={true}
                      disabled={false}
                      showOk={true}
                      timePickerProps={showTime}
                      format={dateTimeFormat}
                      //   disabledDate={disabledDate}
                      disabledDate={disableFutureDt}
                    />
                  )}
                  {(errors = getFieldError('orderGeneratedAt')) ? (
                    <ErrorMsg errors={errors} />
                  ) : null}
                </div>
                <div className="group_action">
                <div className='d-flex authorized'>
                  <div className='components pl-0'>
                    {!isDrOrNp(authUser) ? (
                      <div className='m-b-10'>
                        {getFieldDecorator('physicianId', {
                          rules: [
                            {
                              required: true,
                              message: 'Please Select Physician',
                            },
                          ],
                        })(<DoctorFilter />)}
                        {(errors = getFieldError('physicianId')) ? (
                          <ErrorMsg errors={errors} />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className='components filter_value'>
                    {getFieldDecorator('isMedicalDirectiveAuthorized', {
                      rules: [
                        {
                          required: false,
                        },
                      ],
                    })(
                      <label for='vvs' className='filter_check'>
                        <input type='checkbox' name='vvs' id='vvs' />
                        <span className='checkbox'></span>
                        <span className='lbl'>
                          Authorized by medical directive
                        </span>
                      </label>
                    )}
                  </div>
                </div>
                <div className='upd_sec_wrap'>
                  <div
                    className='upd_sec '
                    onClick={() => handleVisibleUpload(true)}
                  >
                    <PlusBtn />
                    <span>Upload Images</span>

                    {/* {uploadData.length > 0 && (
                      <div className="upd_img_wrap">
                        <Thumbnail path={uploadData[0].path} />
                      </div>
                    )} */}
                  </div>
                  <div className='upd_sec '>
                    <PlusBtn />
                    <span>Add Notes</span>
                  </div>
                  <div className='upd_sec '>
                    <PlusBtn />
                    <span>Set Reminder</span>
                  </div>
                </div>
                      </div>
                <div className='footer_btn'>
                  <Button
                    className='prev-screen-btn gray-btn'
                    onClick={onCancel}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type='primary'
                    loading={okLoader}
                    onClick={handleSave}
                  >
                    SAVE
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className='uploaded_image_viewer_wrap'>
            {uploadedDocPath ? (
              <div className='uploaded_image_viewer_container'>
                <div className='head'>
                  <div>
                    <h5 style={{ float: 'left', marginRight: '5px' }}>
                      E-Processing
                    </h5>
                    {uploadData.length > 1 ? (
                      <Tooltip overlay='Click Here to view more documents'>
                        <div
                          onClick={() => openViewer(true)}
                          className='badge simple'
                          style={{ float: 'right' }}
                        >
                          <h5>{uploadData.length}</h5>
                        </div>
                      </Tooltip>
                    ) : null}
                  </div>

                  <a onClick={() => openViewer(true)}>ZOOM IN</a>
                </div>
                <figure>
                  {uploadedDocPath.isDownload ? (
                    <a download href={uploadData[currImg].path}>
                      <Image image={uploadedDocPath.showPath} alt='image' />
                    </a>
                  ) : (
                      <Image image={uploadedDocPath.showPath} alt='image' />
                    )}
                </figure>
                <div className='pagination_wrap'>
                  {/* <div className="pagination">
                                <a><Prev /></a>
                                <a className="active_page">01</a>
                                <a>02</a>
                                <a>03</a>
                                <a>04</a>
                                <a>05</a>
                                <a><Next /></a>
                            </div> */}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Uploader
        visible={uploadVisible}
        onRequestClose={() => setUploadVisible(false)}
        multiple
        allowedTypes={[FILE_TYPES.IMAGE]}
        // allowedTypes={[FILE_TYPES.IMAGE, FILE_TYPES.PDF, FILE_TYPES.DOC]}
        uploadUrl={{ ...fileUpload }}
        fileLength={10}
        extraData={{
          isUploadToS3: true,
          isPrivateBucket: true,
          returnSignedURL: true,
          fileName: 'abc.png',
          category: [
            FILE_CATEGORY.IMAGE,
            // FILE_CATEGORY.PDF,
            // FILE_CATEGORY.DOC,
          ].join(','),
        }}
        onError={(err) => {
          console.log('on error => ', err);
        }}
        onSuccess={(res) => {
          if (res) {
            if (res.code === 'OK') {
              res.data = res.data.filter((x) => {
                if (x.status) {
                  let extension = x.path.substr(x.path.lastIndexOf('.') + 1);
                  x.showPath = x.path;
                  if (extension === 'pdf') {
                    x.showPath = require('../../../../../assets/images/pdf.png');
                    x.isDownload = true;
                  } else if (extension === 'doc' || extension === 'docx') {
                    x.showPath = require('../../../../../assets/images/doc.png');
                    x.isDownload = true;
                  }
                  return x;
                }
              });
              let newData = [...uploadData];
              newData = newData.concat(res.data);
              setUploadData(newData);
              handleVisibleUpload(false);
            }
          }
        }}
      />
      {viewerIsOpen ? (
        <>
          <Lightbox
            mainSrc={uploadData[currImg].showPath}
            imageTitle={
              <div>
                <div style={{ float: 'left' }}>
                  {uploadData[currImg].isDownload ? (
                    <a target='_blank' download href={uploadData[currImg].path}>
                      download
                    </a>
                  ) : null}
                </div>
              </div>
            }
            nextSrc={uploadData[(currImg + 1) % uploadData.length].showPath}
            prevSrc={
              uploadData[(currImg + uploadData.length - 1) % uploadData.length]
                .showPath
            }
            onCloseRequest={() => setViewerIsOpen(false)}
            onMovePrevRequest={() =>
              setCurrImg(
                (currImg) =>
                  (currImg + uploadData.length - 1) % uploadData.length
              )
            }
            onMoveNextRequest={() =>
              setCurrImg((currImg) => (currImg + 1) % uploadData.length)
            }
          />
        </>
      ) : null}
    </>
  );
};
export default createForm()(AddEprocessing);
