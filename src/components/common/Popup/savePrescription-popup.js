import React, { useState } from 'react';
import Dialog from 'rc-dialog';
import { Correct } from '../../../assets/images/resident-detail/index';
import { Button } from '../../../components/common';
import { STATUS } from '../../../constants/prescription';

const SavePrescriptionPopup = props => {
  const { onDraft, onOk, onCancel, visible, residentDetail, edit } = props


  return (<>
    <Dialog
      visible={visible}
      onClose={onCancel}
      className="lock_popup del-notes-wrap save-pre-wrap"
    >
      <div className="popup-content">
        <h3 className="name_head">Save Prescription {edit ? `- ${edit.orderNumber}` : ''}</h3>
        <div className="bb"></div>
        <p className="">Are you sure you want to add this Rx Order for</p>
        <span className="large-text">{residentDetail.mergeLFName}  (Room No {residentDetail.room})?</span>
        <div className="mb-20">
          <Button type='secondary' size='lg' className='screen-btn' onClick={onCancel}>CANCEL</Button>
          <Button size='lg' className='screen-btn' style={{ marginLeft: '5px' }}
            onClick={onOk}>YES</Button>
        </div>
        {
          edit?.status !== STATUS.SUBMITTED ?
            <div className="save-graft">
              <span onClick={onDraft}>Save as Draft</span>
              <Correct />
            </div> : null}

        <div className="bottom-line">This Rx Order will be automatically transmitted to the pharmacy.</div>

      </div>

    </Dialog>

  </>);

}
export default SavePrescriptionPopup;