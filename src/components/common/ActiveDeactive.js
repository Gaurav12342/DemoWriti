/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import CommonService from '../../services/api/services/common';
import { Button, Toast } from '../../components/common';
import Confirm from '../../components/common/Popup/ConfirmPopup';
// import { booleanStatusUpdate } from '../../services/api/routes/common';
import { masterUpdate } from '../../../src/services/api/routes/master';
import { editUser } from '../../services/api/routes/user';

const ActiveDeactive = (props) => {
  const {
    record,
    documentId,
    model,
    onActiveDeactive,
    API,
    extraRequest,
  } = props;
  const [confirm, setConfirm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isActive, setIsActive] = useState(props.isActive);
  const [confirmText, setConfirmText] = useState('');
  let checkActive = record.isActive && record.isActive === true;

  const handleConfirmation = () => {
    const status = checkActive ? 'De-Active' : 'Active';
    const name = record
      ? record.name
        ? record.name
        : record.mergeLFName
        ? record.mergeLFName
        : ''
      : '';
    setConfirmText(`Are you sure, you want to ${status} ${name} ?`);
    setConfirm(true);
  };

  const handleOk = async () => {
    setLoader(true);
    setBtnLoading(true);
    //let apiDetail = masterUpdate, data;
    //if (model === 'user') {
    //apiDetail = editUser
    //apiDetail.url = apiDetail.url + record._id;
    //data = {
    // ...record,
    //isActive: !record.isActive
    //}
    // }
    //else {
    // apiDetail.url = apiDetail.url + documentId;
    //data = {
    // id: documentId,
    //model: model,
    //fieldName: "isActive",
    // isActive: !isActive,
    //};
    //}

    let { method, url, baseURL } = API;
    url = `${url}/${documentId}`;
    // url = url + documentId;
    let data = {
      id: documentId,
      model: model,
      fieldName: 'isActive',
      isActive: !isActive,
      ...extraRequest,
    };
    let newValue = isActive;
    let response = await CommonService({ method, url, data, baseURL });
    if (response) {
      if (response.code === 'OK') {
        // console.log("activeDeatcive", response);
        newValue = !isActive;
        let record = { ...props.record };
        record.isActive = !record.isActive;
        onActiveDeactive(record);
        setConfirm(false);
        setBtnLoading(false);
        Toast.success(response.message);
      } else {
        setBtnLoading(false);
        Toast.error(response.message);
      }
    }
    setBtnLoading(false);
    setLoader(false);
    setIsActive(newValue);
  };

  return (
    <>
      <Button
        type={checkActive ? 'primary' : 'danger'}
        size='xs'
        onClick={handleConfirmation}
        loading={loader}
      >
        {checkActive ? 'Active' : 'De-Active'}
      </Button>
      {confirm && (
        <Confirm
          style={{ width: '400px' }}
          visible={confirm}
          footer={[
            <Button
              style={{ 'margin-right': '5%' }}
              key='cancel'
              type='secondary'
              size='lg'
              onClick={() => setConfirm(false)}
            >
              CANCEL&nbsp;
            </Button>,
            <Button
              key='ok'
              loading={btnLoading}
              type='primary'
              size='lg'
              onClick={handleOk}
            >
              Ok
            </Button>,
          ]}
          // onOk={handleOk}
          // onCancel={() => setConfirm(false)}
        >
          <p>{confirmText}</p>
        </Confirm>
      )}
    </>
  );
};
export default ActiveDeactive;
