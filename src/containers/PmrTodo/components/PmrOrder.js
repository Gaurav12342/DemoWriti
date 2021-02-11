import React, { Component, useEffect, useState } from 'react';
import { displayDate, displayTime } from '../../../util/moment';
import { createForm } from 'rc-form';
import {
  PMR_ORDER,
  PMR_ORDER_LABEL,
  PMR_ORDER_COLOR,
  KROLL_ORDER_TYPE,
  KROLL_ORDER_STATUS
} from '../../../constants/pmr';
import { Input, Search } from '../../../components/common/index';
import { Edit, Cancel } from '../../../assets/images/resident-detail/index';
import { isDrOrderView, isCautionAlertNotes } from '../../../util/pmr';
import NotesModal from '../../../components/NotesPopup/List';
import ReminderModal from '../../../components/ReminderPopup/List';
import { Notes, Reminder } from '../../../assets/images/pmr/index';
import { SUB_CATEGORY, TODO_CATEGORY } from '../../../constants/todo';
import ConfirmPopup from '../../../components/common/ConfirmPopup';
import PmrCautionModal from './PmrCautionModal';
import { isDrOrNp, getUserNameWithDesignation } from '../../../util/common';
import { deleteCausion } from '../../../services/api/routes/pmr';
import { Toast } from '../../../components/common/Toast';
import axios from '../../../services/api/config';

const getOrderTag = (pmrOrder) => {
  // show tag only for cont, discont, hold order

  return pmrOrder.docStatusUpdate &&
    (PMR_ORDER.STATUS['CONTINUE'] === pmrOrder.status ||
      PMR_ORDER.STATUS['DISCONTINUE'] === pmrOrder.status ||
      PMR_ORDER.STATUS['HOLD'] === pmrOrder.status)
    ? Object.keys(PMR_ORDER.STATUS).map((st) => {
      let orderTag = { class: '' };
      if (PMR_ORDER.STATUS[st] === pmrOrder.status) {
        orderTag.class = PMR_ORDER_COLOR.TAG_CLASS[st];
        return (
          <p className={`order-tag ${orderTag.class}`}>
            {st.replace(/_/g, ' ')}
          </p>
        );
      }
    })
    : '';
};

const PmrOrder = (props) => {
  const {
    detail,
    pmrOrder,
    isNotification,
    query,
    form,
    authUser,
    onUpdateOrder,
    isMedTodo,
    handleOrderRef
  } = props;

  const orderRef = React.useRef();
  const { resetFields } = form;
  const [notesModal, setNotesModal] = useState(false);
  const [notesFilterOptions, setNotesFilterOptions] = useState({});
  const [reminderFilterOptions, setReminderFilterOptions] = useState({});
  const [reminderModal, setReminderModal] = useState(false);
  const [visibleCausion, setVisibleCausion] = useState(false);
  const [currentCausionData, setCurrentCausionData] = useState('');
  const [deleteCausionModal, setDeleteCausionModal] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [editData, setEditData] = useState(undefined);

  const visibleNotesModal = (visible, record, str, data) => {
    setNotesModal(visible);
    setNotesFilterOptions({});
    if (data) {
      onUpdateOrder('notesCount', { orderId: pmrOrder._id, data: data });
    }
  };

  const createNotesModal = () => {
    let options = {
      query: {
        find: {
          pmrOrderId: pmrOrder?._id,
          category: TODO_CATEGORY.MED_REVIEW,
          subCategory: detail?.subCategory,
        },
        populate: [{ addedBy: [] }],
      },
    };
    setNotesFilterOptions(options);
    setNotesModal(true);
  };

  const visibleReminderModal = (visible, record, str, data) => {
    setReminderModal(visible);
    setReminderFilterOptions({});
    if (data)
      onUpdateOrder('reminderCount', { orderId: pmrOrder._id, data: data });
  };

  const createReminderModal = () => {
    let options = {
      query: {
        find: {
          pmrOrderId: pmrOrder?._id,
          category: TODO_CATEGORY.MED_REVIEW,
          subCategory: detail?.subCategory,
        },
        populate: [{ addedBy: [] }],
      },
    };
    setReminderFilterOptions(options);
    setReminderModal(true);
  };

  const handleAddCausion = (edit) => {
    setEditData(edit);
    setVisibleCausion(true);
    if (!edit) {
      resetFields();
    }
  };

  let pmrLabel = { label: '', color: '', class: '' };
  if (pmrOrder.label) {
    pmrLabel.class =
      pmrOrder.label === PMR_ORDER_LABEL.CHANGED
        ? PMR_ORDER_COLOR.TAG_CLASS.CHANGED
        : pmrOrder.label === PMR_ORDER_LABEL.NEW
          ? PMR_ORDER_COLOR.TAG_CLASS.NEW
          : pmrOrder.label === PMR_ORDER_LABEL.NEW_EDIT
            ? PMR_ORDER_COLOR.TAG_CLASS.NEW_EDIT
            : '';
  }

  Object.keys(PMR_ORDER_LABEL).map((label) => {
    return PMR_ORDER_LABEL[label] === pmrOrder.label
      ? (pmrLabel.label = label.replace(/_/g, ' '))
      : '';
  });

  React.useEffect(() => {
    if (handleOrderRef) {
      handleOrderRef(pmrOrder._id, orderRef.current);
    }
  }, [])

  const isStroke =
    pmrOrder.isClonedExist ||
    pmrOrder.status === PMR_ORDER.STATUS.DISCONTINUE ||
    (pmrOrder.source === 'KROLL' &&
      pmrOrder.docStatusUpdate === PMR_ORDER.STATUS.DISCONTINUE);

  const handleDeleteCausionModal = (value) => {
    setDeleteCausionModal(value);
  };

  const handleDeleteCausion = () => {
    setDeleteBtnLoading(true);
    let { method, url, baseURL } = deleteCausion;
    url = `${url}/${pmrOrder.alertNote?._id}`;
    let obj = {
      isDeleted: false,
    };
    axios({ method, url, baseURL, data: obj })
      .then((response) => {
        if (response?.data.code == 'OK') {
          handleUpdateAlert(response.data.data)
          setDeleteBtnLoading(false);
          handleDeleteCausionModal(false);
          Toast.success(response.data.message);
        } else {
          setDeleteBtnLoading(false);
          Toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setDeleteBtnLoading(false);
      });
  };

  const handleUpdateAlert = (orderData) => {
    if (!orderData.isAlert) orderData = null;
    onUpdateOrder('alertNote', { orderId: pmrOrder._id, data: orderData });
  };

  return (
    <div ref={orderRef}>
      {pmrOrder.krollOrderType === KROLL_ORDER_TYPE.PMR ? (
        <>
          <div
            className={`inner-res-block d-flex ${
              isStroke ? 'line-through' : ''
              }`}
          >
            <div className='resident-desc-box w-d-50'>
              <span className='main'>Order</span>
              <span className='sub'>
                {pmrOrder.drug?.name}{" "}{pmrOrder.drug?.strength}
                {pmrOrder.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED ? (
                  <p className={`order-tag ${PMR_ORDER_COLOR.TAG_CLASS.SUSPENDED}`}>
                    Suspended
                  </p>
                ) : null}
                {pmrLabel.label ? (
                  <p className={`order-tag ${pmrLabel.class}`}>
                    {pmrLabel.label}
                  </p>
                ) : null}
              </span>
            </div>
            <div className='resident-desc-box w-d-25'>
              <span className='main'>Rx No</span>
              <span className='sub'>
                {' '}
                {pmrOrder.krollRxNo || pmrOrder.orderNumber}
              </span>
            </div>
            <div className='resident-desc-box w-d-25'>
              <span className='main'>DIN</span>
              <span className='sub'>{pmrOrder.din || 'NA'}</span>
            </div>
          </div>
          <div
            className={`inner-res-block d-flex ${
              isStroke ? 'line-through' : ''
              }`}
          >
            <div className='resident-desc-box w-d-50'>
              <span className='main'>Equiv. to</span>
              <span className='sub'>{pmrOrder.drug?.equivTo || 'NA'}</span>
            </div>
            <div className='resident-desc-box w-d-25'>
              <span className='main'>Last Fill</span>
              <span className='sub'>
                {pmrOrder.lastFillDate &&
                  pmrOrder.krollStatus !== 'RxStatus_Unfill'
                  ? displayDate(pmrOrder.lastFillDate)
                  : ' NA '}
              </span>
            </div>
            <div className='resident-desc-box w-d-25'>
              {
                pmrOrder.source === 'KROLL' ? <>
                  <span className='main'>Exp</span>
                  <span className='sub'>
                    {' '}
                    {pmrOrder.luCode?.[0]?.expiryDateString || 'NA'}
                  </span>
                </> : null
              }
            </div>
          </div>
          <div
            className={`inner-res-block d-flex ${
              isStroke ? 'line-through' : ''
              }`}
          >
            <div className='resident-desc-box w-d-50'>
              <span className='main'>Source</span>
              <span className='sub'>{pmrOrder.source}</span>
            </div>
            <div className='resident-desc-box w-d-25'>
              {
                pmrOrder.source === 'KROLL' ? <>
                  <span className='main'>LU code</span>
                  <span className='sub'>
                    {pmrOrder.luCode ?
                      pmrOrder.luCode.reasonForUseId == 0 ? 'Does not qualify'
                        : pmrOrder.luCode.reasonForUseId == -1 ? 'N/A'
                          : pmrOrder.luCode.reasonForUseId || "NA"
                      : "NA"}
                  </span>
                </> : null}
            </div>
            <div className='resident-desc-box w-d-25'>
              <span className='main'>Indication</span>
              <span className='sub'>{pmrOrder.indication || '-'}</span>
            </div>
          </div>
          <div
            className={`inner-res-block d-flex ${
              isStroke ? 'line-through' : ''
              }`}
          >
            <div className='resident-desc-box w-d-50'>
              <span className='main'>Direction</span>
              <span className='sub'>{pmrOrder.sig || pmrOrder.direction}</span>
            </div>
            <div className='resident-desc-box w-d-25'>
              {/* <span className="main">Order Type</span>
                    <span className="sub">NA</span> */}
            </div>
            <div className='resident-desc-box w-d-25'>
              <span className='main'></span>
              <span className='sub'></span>
            </div>
          </div>
          {isDrOrderView(detail.subCategory, authUser) ? (
            <div className='inner-res-block'>
              <div className='resident-desc-box w-d-50'>
                {pmrOrder.holdUntil ?
                  <>
                    <span className='main'>Hold Until</span>
                    <span className='sub'>{displayDate(pmrOrder.holdUntil)}</span>
                  </> : null
                }
              </div>
              <div className='resident-desc-box w-d-25'></div>
              <div className='resident-desc-box w-d-25'>
                <span className='sub'>
                  {isDrOrNp(authUser) ||
                    query.subCategory === SUB_CATEGORY.MED_REVIEW.PMR
                    ? getOrderTag(pmrOrder)
                    : null}
                </span>
              </div>
            </div>
          ) : null}
          <div
            className={`inner-res-block d-flex ${
              isStroke ? 'line-through' : ''
              }`}
          >
            <div className='resident-desc-box d-f-e w-d-50'>
              <div className='flex-block'>
                {!isNotification && !isMedTodo &&
                  query.subCategory &&
                  !pmrOrder.alertNote &&
                  isCautionAlertNotes(detail, query.subCategory) ? (
                    <>
                      <p className='green-bg mr-5'>
                        <img src={require('../../NursePrep/img/plus.svg')} />
                      </p>
                      <span
                        className='add-causion'
                        onClick={() => {
                          handleAddCausion();
                        }}
                      >
                        Add Caution
                  </span>
                    </>
                  ) : null}
              </div>
            </div>
            {
              (!isNotification && !isMedTodo) ? <>
                <div className='resident-desc-box d-f-e w-d-25'>
                  <a className='p-relative align-item-center'
                    onClick={() => {
                      createReminderModal();
                    }}
                  >
                    <Reminder />
                    {pmrOrder.reminderCount ? (
                      <p className="note-numb reminder-numb">{pmrOrder.reminderCount}</p>
                    ) : null}
                    <span className='reminder-info m-l-5'>Reminder </span>
                  </a>
                </div>
                <div className='resident-desc-box d-f-e w-d-25'>
                  <div className="p-relative align-item-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { createNotesModal(); }}>
                    {pmrOrder.notesCount ? <p className="note-numb">{pmrOrder.notesCount}</p> : null}
                    <img src={require("../../NursePrep/img/notes.svg")} className="mr-5" />
                    <span className="reminder-info">Notes </span>
                  </div>
                </div>

              </> : null
            }
          </div>
          {pmrOrder.alertNote ?
            <div
              className={`inner-res-block d-flex ${
                isStroke ? 'line-through' : ''
                }`}
            >
              <div className='resident-desc-box d-f-e w-d-50'>
                <span className='cusion-info'>
                  Caution: {pmrOrder.alertNote?.alertText}
                </span>
              </div>
              <div className='resident-desc-box d-f-e w-d-25'>
                <span className='cusion-info'>
                  {pmrOrder.alertNote?.addedBy ? getUserNameWithDesignation(pmrOrder.alertNote.addedBy) : ''}
                </span>
              </div>
              {!isMedTodo && !isNotification &&
                authUser?._id === pmrOrder.alertNote?.addedBy?._id ? <>
                  <div className='resident-desc-box d-f-e w-d-25'>
                    <div
                      style={{ cursor: 'pointer', marginRight: '10%' }}
                      onClick={() => {
                        handleAddCausion(true);
                      }}
                    >
                      <Edit />
                    </div>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleDeleteCausionModal(true);
                      }}
                    >
                      <Cancel />
                    </div>
                  </div>
                </>
                : null
              }
            </div>
            : null}
        </>
      ) : (
          <>
            <div
              className={`inner-res-block d-flex ${
                isStroke ? 'line-through' : ''
                }`}
            >
              <div className='resident-desc-box w-d-50'>
                <span className='sub'>
                  {pmrOrder.description}
                  <span>
                    {' '}
                    {pmrLabel.label ? (
                      <p className={`order-tag ${pmrLabel.class}`}>
                        {pmrLabel.label}
                      </p>
                    ) : null}
                  </span>
                </span>
              </div>
            </div>
            <div
              className={`inner-res-block d-flex ${
                isStroke ? 'line-through' : ''
                }`}
            >
              <div className='resident-desc-box d-f-e w-d-50'>
                {isDrOrderView(detail.subCategory, authUser) ? (
                  <div className='inner-res-block'>
                    <div className='resident-desc-box w-d-50'></div>
                    <div className='resident-desc-box w-d-25'></div>
                    <div className='resident-desc-box w-d-25'>
                      <span className='sub'>
                        {isDrOrNp(authUser) ||
                          query.subCategory === SUB_CATEGORY.MED_REVIEW.PMR
                          ? getOrderTag(pmrOrder)
                          : null}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              {
                (!isNotification && !isMedTodo) ?
                  <>
                    <div className='resident-desc-box d-f-e w-d-25'>
                      <a className='p-relative align-item-center'
                        onClick={() => {
                          createReminderModal();
                        }}
                      >
                        <Reminder />
                        {pmrOrder.reminderCount ? (
                          <p className="note-numb reminder-numb">{pmrOrder.reminderCount}</p>
                        ) : null} <span className='reminder-info m-l-5'>Reminder </span>
                      </a>
                    </div>
                    <div className='resident-desc-box d-f-e w-d-25'>
                      <div className='d-flex align-center' style={{ cursor: 'pointer' }}>
                        <div className="p-relative align-item-center"
                          style={{ cursor: 'pointer' }}
                          onClick={() => { createNotesModal(); }}>
                          {pmrOrder.notesCount ? <p className="note-numb">{pmrOrder.notesCount}</p> : null}
                          <img src={require("../../NursePrep/img/notes.svg")} className="mr-5" />
                          <span className="reminder-info">Notes </span>
                        </div>
                      </div>
                    </div>
                  </>
                  : null
              }
            </div>
          </>
        )
      }
      {pmrOrder.isClonedExist && <hr></hr>}

      {
        notesModal && (
          <NotesModal
            visible={notesModal}
            filterOptions={notesFilterOptions}
            onCancel={(data) => visibleNotesModal(false, null, 'cancel', data)}
            onOk={() => visibleNotesModal(false)}
            isUpsertList={true}
            modalTitle={`View Note - ${detail.pmrId}`}
            xRayNumber={pmrOrder.orderNumber}
            addData={{
              residentId: detail?.patientId._id,
              pmrOrderId: pmrOrder?._id,
              category: TODO_CATEGORY.MED_REVIEW,
              subCategory: detail?.subCategory,
            }}
          />
        )
      }

      {
        reminderModal && (
          <ReminderModal
            visible={reminderModal}
            filterOptions={reminderFilterOptions}
            onCancel={(data) => visibleReminderModal(false, null, 'cancel', data)}
            onOk={() => visibleReminderModal(false)}
            isUpsertList={true}
            modalTitle={`View Reminder - ${detail.pmrId}`}
            xRayNumber={pmrOrder.orderNumber}
            addData={{
              residentId: detail?.patientId._id,
              pmrOrderId: pmrOrder?._id,
              category: TODO_CATEGORY.MED_REVIEW,
              subCategory: detail?.subCategory,
            }}
          />
        )
      }

      {
        visibleCausion && (
          <PmrCautionModal
            title={editData ? 'Update causion' : 'Add causion'}
            form={form}
            okText={editData ? 'Update' : 'Add'}
            onCancel={(propsData, closeModal) => {
              handleUpdateAlert(propsData);
              setVisibleCausion(closeModal);
            }}
            visible={visibleCausion}
            pmrOrder={pmrOrder}
            editData={editData}
          // onPmrOrderId={pmrOrder?._id}
          />
        )
      }

      {
        deleteCausionModal && (
          <ConfirmPopup
            // value={pmrOrder}
            visible={deleteCausionModal}
            title={`Delete Caution Note`}
            description={`Are you want to delete this note ${pmrOrder.alertNote?.alertText} ?`}
            onOk={() => {
              handleDeleteCausion();
            }}
            okText='Yes'
            cancelText='Cancel'
            // loading={deleteBtnLoading}
            okButtonProps={{ loading: deleteBtnLoading }}
            onClose={() => {
              handleDeleteCausionModal(false);
            }}
            onCancel={() => {
              handleDeleteCausionModal(false);
            }}
          />
        )
      }
    </div>
  );
};

export default createForm()(PmrOrder);
