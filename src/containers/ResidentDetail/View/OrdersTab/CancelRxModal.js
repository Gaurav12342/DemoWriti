import React, { useState, useEffect, useContext } from 'react';
import { Toast } from '../../..//../components/common';
import AuthenticationModal from '../../../../components/AuthenticateModal';
import {
  upsert,
  upsertEProcessing,
} from '../../../../services/api/routes/prescription';
import axios from '../../../../services/api/services/common';
import {
  MODIFY_ACTION,
  TYPE,
  STATUS,
} from '../../../../constants/prescription';
import { MODULE, ACTIONS } from '../../../../constants/subscription';

const RxModal = (props) => {
  const { visible, detail, onCancel, onOk, rxType } = props;

  const [loader, setLoader] = useState(false);

  const handleOk = async (params) => {
    let req = {
      _id: detail._id,
      isCancel: true,
      type: detail.type,
      uniqueId: params.uniqueId,
      status: STATUS.CANCELLED,
    };

    setLoader(true);

    try {
      let { method, url, baseURL } =
        rxType == MODULE.E_PROCESSING ? upsertEProcessing : upsert;
      let res = await axios({ method, url, baseURL, data: req });
      if (res) {
        if (res.code === 'OK') {
          Toast.success(res.message);
          if (onOk) onOk(params);
        } else Toast.error(res.message);
      }
      setLoader(false);
    } catch {
      setLoader(false);
    }
  };

  return visible ? (
    <AuthenticationModal
      visible={visible}
      loading={loader}
      title={`Authetication For Cancel - ${detail.orderNumber}`}
      maskClosable={false}
      onCancel={onCancel}
      onOk={handleOk}
      request={{
        prescriptionId: detail._id,
        action: MODIFY_ACTION.CANCEL,
      }}
    ></AuthenticationModal>
  ) : null;
};

export default RxModal;
