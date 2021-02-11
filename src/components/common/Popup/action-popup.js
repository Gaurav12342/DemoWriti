/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component, useState } from 'react';
import { PMR_ORDER } from '../../../constants/pmr'
import Modal from "../../../components/common/Popup/index";
import { DateTimePicker } from "../../../components/common";
import { KROLL_ORDER_TYPE, PMR_ORDER_LABEL, KROLL_ORDER_STATUS } from "../../../constants/pmr"
import moment from 'moment'
import { displayDate } from '../../../util/moment'

const ActionPopup = props => {
  const { visible, onCancel, onUpdateOrderStatus, order, orderStatus } = props
  const [holdUntil, setHoldUntil] = useState('')
  const [visibleHold, setVisibleHold] = useState(false)

  const handleVisibleHold = (visible, str) => {
    setVisibleHold(visible)
    if (visible) {
      setHoldUntil('')
    }
    if (str === 'ok') {
      onCancel(PMR_ORDER.STATUS.HOLD, holdUntil)
    }
  }

  return <> <Modal
    visible={visible}
    title="Actions"
    maskClosable={false}
    onCancel={onCancel}
    onClose={onCancel}
    footer={false}
    className="lock_popup action-popup"
  >
    <div className="">
      {
        orderStatus === PMR_ORDER.STATUS.CONTINUE ?
          <div className="action-notes-d-c">
            <div className="d-c-icon"
              onClick={() => onCancel(PMR_ORDER.STATUS.CONTINUE)}>
              <span>Continue to Medication</span>
            </div>
            <div className="d-c-icon"
              onClick={() => onCancel('SUSPEND')}>
              <span> Continue to Suspend</span>
            </div>
          </div>
          : orderStatus === PMR_ORDER.STATUS.HOLD ?
            <div className="action-notes-d-c">
              <div className="d-c-icon"
                onClick={() => onCancel(PMR_ORDER.STATUS.HOLD)}>
                <span>Continue to Hold</span>
              </div>
              <div className="d-c-icon"
                onClick={() => handleVisibleHold(true)}>
                <span> Hold Until</span>
              </div>
            </div>
            : <div className="action-notes-d-c">
              <div className="d-c-icon"
                onClick={() => onCancel('DC')}>
                <img src={require('../../../containers/NursePrep/img/d-c.svg')} />
                <span>D/C</span>
              </div>
              {/* <div className="d-c-icon">
            <img src={require('../../../containers/NursePrep/img/hold1.svg')} />
            <span>Hold</span>
          </div> */}
              <div className="d-c-icon"
                style={order?.krollOrderType === KROLL_ORDER_TYPE.STANDING ?
                  { pointerEvents: 'none', opacity: '0.5' } : null}
                onClick={() => onCancel('EDIT')}>
                <img src={require('../../../containers/NursePrep/img/edit.svg')} />
                <span>Edit</span>
              </div>
              <div className="d-c-icon"
                style={order && (order.source === 'WRITI' ||
                  (order.label === PMR_ORDER_LABEL.CHANGED ||
                    order.status === PMR_ORDER.STATUS.DISCONTINUE) ||
                  (order.krollOrderType === KROLL_ORDER_TYPE.STANDING)) ?
                  { pointerEvents: 'none', opacity: '0.5' } : null}
                onClick={() => onCancel('DC_NEW')}>
                <img src={require('../../../containers/NursePrep/img/d-c-create-new.svg')} />
                <span>D/C & Create New</span>
              </div>
            </div>
      }
    </div>

    {visibleHold &&
      <Modal
        visible={visibleHold}
        title="Hold Until"
        maskClosable={false}
        onCancel={() => handleVisibleHold(false, 'cancel')}
        onOk={() => handleVisibleHold(false, 'ok')}
        className="lock_popup action-popup"
      >
        <div className="form_group col-12">
          <DateTimePicker format={displayDate} value={holdUntil}
            disabledDate={(current) => { return current && current <= moment().subtract(1, "day") }}
            onChange={(date) => setHoldUntil(date)} />
        </div>
      </Modal>
    }
  </Modal>
  </>
}
export default ActionPopup;