import React from 'react';
import { Check } from '../../../../assets/images/todo/index'
import { Cancel, Clarification } from '../../../../assets/images/resident-detail/index';
import { Notes } from '../../../../assets/images/pmr/index';
import { AddNotes } from '../../../../assets/images/popup/index';
import 'rc-tooltip/assets/bootstrap.css';
import Modal from "../../../../components/common/Popup/index"
import { getUserNameWithDesignation } from '../../../../util/common';
import { displayDateTime } from '../../../../util/moment';
import { Input, CheckBox } from '../../../../components/common';

function XrayReviewPopup(props) {
    const { onOk, onCancel, isVisible, title, xRayDetail, isDeleted,
        isEdit, S_isDeleted, isInfectionChecked, handleInfectionControl, handleReasonText, reasonText
        , onUrgent, isChecked, onDelete, onCreateNotesModal, notesCount, editData, onExtensionChange, onPhoneNoChange, phoneNo, extensionNo
    } = props
    return (<>
        {/* start popup */}
        <Modal
            visible={isVisible}
            title={title}
            maskClosable={true}
            // customChildren={true}
            onCancel={onCancel}
            onClose={onCancel}
            onOk={onOk}
            footer={false}
            className="lock_popup xray_selection_popup xray_review"
            closable={false}
            btnClass="d-flex-end f-end footer-block"
            footerDescription={
                <div className="modal_footer">
                    <div className="actions_wrap">
                        <h4>Actions</h4>
                        <div className="actions">
                            <a onClick={() => onCreateNotesModal(false)}>
                                <Notes />
                                <p>Notes</p>
                                <span className="notes tot" >{notesCount} Notes</span>
                            </a>
                            <a onClick={() => onCreateNotesModal(true)}>
                                <AddNotes />
                                <p>Add Note</p>
                            </a>
                            <a>
                                <Clarification />
                                <p>Clarification</p>
                            </a>
                        </div>
                    </div>
                    <div className="modal_actions">
                        <button className="btn btn-primary grey-btn" onClick={onCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={onOk}>Submit</button>
                    </div>
                </div>
            }
        >
            <form >
                {
                    isEdit ?
                        <div className="created_by">
                            <span>Created By : {editData && editData.requestedBy ? getUserNameWithDesignation(editData.requestedBy) : ''}</span>
                            <span>Created At : {editData && editData.createdAt ? displayDateTime(editData.createdAt) : '-'}</span>
                        </div> : null
                }

                <div className="xray_list_wrap">
                    {
                        Object.keys(xRayDetail).length > 0 && xRayDetail.selectedOptions && Object.keys(xRayDetail.selectedOptions).length ?
                            Object.keys(xRayDetail.selectedOptions).map((key, i) => {
                                return <> {
                                    xRayDetail.selectedOptions[key].optionItems &&
                                        xRayDetail.selectedOptions[key].optionItems.length ?
                                        (isEdit ? !(S_isDeleted && S_isDeleted.hasOwnProperty(key) && isDeleted[key]) : true) ?
                                            <div className="xray_list">
                                                <div className="xray_name">
                                                    <span>{key}</span>
                                                    {
                                                        isEdit ? null : <Cancel onClick={() => onDelete(key)} />
                                                    }
                                                </div>
                                                <div className="xray_detail">
                                                    <p>{
                                                        xRayDetail.selectedOptions[key].optionItems.join(',')
                                                    }</p>
                                                </div>
                                            </div> : null :
                                        Object.keys(xRayDetail.selectedOptions[key]).length ?
                                            (isEdit ? !(S_isDeleted && S_isDeleted.hasOwnProperty(key) && isDeleted[key]) : true) ?
                                                <>
                                                    <div className="xray_list">
                                                        <div className="xray_name">
                                                            <span>{key}</span>
                                                        </div>
                                                        {
                                                            Object.keys(xRayDetail.selectedOptions[key]).map((subKey, j) => {
                                                                return <div style={{ marginBottom: '5px' }}>
                                                                    {
                                                                        xRayDetail.selectedOptions[key][subKey] &&
                                                                            xRayDetail.selectedOptions[key][subKey].optionItems &&
                                                                            xRayDetail.selectedOptions[key][subKey].optionItems.length ?
                                                                            <div className="xray_detail">
                                                                                <h4>{subKey}</h4>
                                                                                <p>{
                                                                                    xRayDetail.selectedOptions[key][subKey].optionItems.join(',')
                                                                                }</p>
                                                                                <div className="cancel-list">
                                                                                    {
                                                                                        isEdit ? null : <Cancel onClick={() => onDelete(key, subKey)} />
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            : null
                                                                    }
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </> : null
                                            : null
                                }
                                </>
                            })
                            : null
                    }
                </div>
                <div className="filter_value d-flex infection">
                    <label htmlFor="vvs" className="filter_check">
                        <input
                            type="checkbox"
                            name="infectionControl"
                            id="infectionControl"
                            checked={isInfectionChecked} onClick={handleInfectionControl}
                            style={{ display: 'block' }}
                        />
                        <span className="lbl" ><strong> Infection control</strong></span>
                    </label>
                </div>
                <div className="form_wrap">
                    <div className="components textarea">
                        <div className="label">
                            <span style={{ display: 'inline', maxWidth: '580px', textAlign: 'left' }}>Reason for Examination (Clinical Information){isInfectionChecked ? <> and Infection Control precautions<label className="mandatory">*</label></> : ''}</span>
                        </div>
                        <textarea value={reasonText} onChange={handleReasonText}></textarea>
                    </div>
                </div>
                {/* <div>
                    <CheckBox >Is this examination urgent?</CheckBox>
                </div> */}
                <div className="filter_value d-flex infection">
                    <label htmlFor="vvs" className="filter_check">
                        <input type="checkbox" name="isUrgent" id="isUrgent"
                            checked={isChecked}
                            onClick={onUrgent}
                            style={{ display: 'block' }}
                        />
                        {/* <span className="checkbox"  ></span> */}
                        <span className="lbl"><strong>Is this examination urgent?</strong></span>
                    </label>
                </div>
                <div className="custom-inputs">
                    <div className="form_wrap">
                        <div className="components">
                            <input type="text" className="inputForm"
                                placeholder={`Phone No.${isChecked ? '*' : ''}`}
                                onChange={onPhoneNoChange}
                                value={phoneNo}
                            />
                        </div>
                        <div className="components">
                            <input type="text" className="inputForm"
                                placeholder={`Extension No.${isChecked ? '*' : ''}`}
                                value={extensionNo}
                                onChange={onExtensionChange} />
                        </div>
                    </div>
                </div>
            </form>

        </Modal>
        {/* end popup */}
    </>);
}
export default XrayReviewPopup;