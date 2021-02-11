import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Edit, Close } from '../../../src/assets/images/popup';
import { getUserNameWithDesignation } from '../../util/common';
import { displayDateTime, displyFromNow } from '../../util/moment';
import DeleteReminderPopup from './Delete';
import UpsertReminderPopup from './Upsert';

const ViewReminderPopup = (props) => {
  const { detail } = props;
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const authUser = useSelector(state => state.auth.authUser);
  // let foundNoteType = detail?.noteType && noteTypes.find(n => n._id == detail.noteType)

  return (
    <>
      {detail && Object.keys(detail).length > 0 ? (
        <>
          <div className='d-flex ptrik-notes'>
            <span>
              Created By :{' '}
              {detail.addedBy && Object.keys(detail.addedBy).length
                ? getUserNameWithDesignation(detail.addedBy)
                : '-'}
            </span>
            <span>
              Created At :{' '}
              {detail.createdAt && Object.keys(detail.createdAt).length
                ? displayDateTime(detail.createdAt)
                : '-'}
            </span>
          </div>

          <div className='d-flex mb-20'>
            <div className='pr-lock'>
              <span className='mdm-text'>Reminder Date</span>
              <span className='hight-text'>
                {displyFromNow(detail.reminderDate)}
              </span>
            </div>
            <div className='pr-lock'>
              <span className='mdm-text'>Associated Document</span>
              <span className='rx-text'>{props.xRayNumber}</span>
            </div>
          </div>

          <div className=''>
            <span className='ss-text'>Message</span>
            <p className='p-desc-text'>{detail.message || ''}</p>
          </div>
          {
            detail?.addedBy?._id == authUser?._id &&
            <div className='gray-block'>
              <div className='d-flex'>
                <span className='mdm-text mr-20'>Actions</span>
                <div
                  className='d-flex align-center cursor mr-20'
                  onClick={() => setVisibleEdit(true)}
                >
                  <Edit className='imgwd' />
                  <span className='small-text'>Edit Reminder</span>
                </div>
                <div
                  className='d-flex align-center cursor mr-20'
                  onClick={() => setVisibleDelete(true)}
                >
                  <Close className='imgwd' />
                  <span className='small-text'>Delete Reminder</span>
                </div>
              </div>
            </div>
          }
        </>
      ) : (
          <div className='d-flex ptrik-notes'>
            <h3>Data not found</h3>
          </div>
        )}
      {visibleDelete && (
        <DeleteReminderPopup
          visible={visibleDelete}
          detail={detail}
          handleDelete={() => {
            setVisibleDelete(false);
            props.handleDelete();
          }}
          onCancel={() => setVisibleDelete(false)}
        />
      )}
      {visibleEdit && (
        <UpsertReminderPopup
          noteTypes={props.noteTypes}
          visible={visibleEdit}
          isEdit={true}
          detail={detail}
          onCancel={() => setVisibleEdit(false)}
          xRayNumber={props.xRayNumber}
          handleUpdate={(data) => {
            setVisibleEdit(false);
            props.handleUpdate(data);
          }}
        />
      )}
    </>
  );
};

export default ViewReminderPopup;
