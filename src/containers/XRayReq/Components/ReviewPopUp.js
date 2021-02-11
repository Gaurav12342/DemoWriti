import React, { Component, useState, useEffect } from 'react';
// import NotesModal from '../../../components/NotesModal'
import AddNoteModal from './AddNote'
// import AddNoteForm from '../../../components/NoteAddForm'
import NoteListModal from './NotesList'
import { TODO_CATEGORY, X_RAY_TODO_TYPES } from '../../../constants/todo'
import moment from 'moment';

const _ = require('lodash')
const size = 'large'

function ReviewPopUp(props) {
    const { detail, bodyPartsCodeList, isDeleted, editData, isEdit, changeNoteCount, notesCount, isVisible,
        addedNotes, authUser, addNote, onCancel, onisUrgentChange, onIsInfectionControl, onUpdateNoteList } = props
    const [xRayDetail, setXRayDetail] = useState({})
    const [notesFilterOptions, setNotesFilterOptions] = useState({})
    const [notesModal, setNotesModal] = useState(false)
    const [showAddNoteModal, setShowAddNoteModal] = useState(false)
    const [S_isDeleted, setIsDeleted] = useState({})
    const [reasonText, setReasonText] = useState('')
    const [doNotSubmit, setDoNotSubmit] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [isInfectionChecked, setIsInfectionChecked] = useState(false)
    const [addNoteListShow, setAddNoteListShow] = useEffect(false)
    const [isAddEditNote, setIsAddEditNote] = useState(false)
    this.codeList = []

    useEffect(() => {
        if (isEdit && editData && editData.isUrgent) {
            setIsChecked(true)
        }
        if (isEdit && editData.reason && editData.reason.length > 0) {
            setReasonText(editData.reason)
        }
        if (isEdit && editData && editData.isInfectionControl) {
            setIsInfectionChecked(true)
        }
        updateState(detail)
        this.codeList = bodyPartsCodeList
        setIsDeleted(isDeleted)
    }, [])

    useEffect(() => {
        if (doNotSubmit) {
            handleOk()
        }
    }, [doNotSubmit])
    useEffect(() => {
        updateState(detail)
    }, [detail])

    useEffect(() => {
        setIsDeleted(isDeleted)
    }, [isDeleted])

    useEffect(() => {
        this.codeList = bodyPartsCodeList
    }, [bodyPartsCodeList])

    const updateState = (detail) => {
        setXRayDetail(detail)
    }

    const createNotesModal = (isAddNote) => {
        if (isEdit) {
            let options = {
                xRayRequestId: editData.id,
                todoId: editData.id,
                category: TODO_CATEGORY.X_RAY,
                subCategory: X_RAY_TODO_TYPES.GENERAL,
            };
            setNotesFilterOptions(options)
            if (isAddNote) {
                setIsAddEditNote(true)
            }
            else {
                setNotesModal(true)
            }

        }
        else {
            if (isAddNote) {
                setShowAddNoteModal(true)
            }
            else {
                setAddNoteListShow(true)
            }

        }
    };
    const handleAddNoteCount = () => {
        changeNoteCountFun(false)
    }
    const hideAddNoteModal = noteText => {

        if (noteText && typeof noteText === 'string' && noteText.length > 0) {
            let tempNote = {
                addedBy: {
                    id: authUser._id,
                    name: authUser.name,
                    type: authUser.type,
                    homeId: authUser.homeId
                },
                category: TODO_CATEGORY.X_RAY,
                createdAt: moment().toISOString(),
                note: noteText,
                subCategory: X_RAY_TODO_TYPES.GENERAL,
            }
            addNote(tempNote)
        }
        showAddNoteModal(false)
    }
    const handleCancel = () => {
        setNotesModal(false)
        setNotesFilterOptions({})
    };
    const handleOk = () => {
        let tempXRayDetail = _.cloneDeep(xRayDetail)
        tempXRayDetail.bodyPartsCodeList = this.codeList
        let params = {
            updatedDetail: tempXRayDetail,
            reasonText: reasonText,
            isInfectionChecked: isInfectionChecked
        }
        xRayDetail = params;
        onCancel(params, true, S_isDeleted, doNotSubmit)
    }
    const closeReview = () => {
        setDoNotSubmit(true)
    }
    const removeCodeForList = (removeList) => {
        this.codeList = this.codeList.filter(code => {
            if (removeList.indexOf(code) < 0) {
                return true
            }
            else {
                removeList.splice(removeList.indexOf(code), 1)
                return false
            }
        })
    }
    const handleDelete = (key, subKey) => {
        if (isEdit && S_isDeleted.hasOwnProperty(key)) {
            let tempIsDeleted = _.cloneDeep(S_isDeleted)
            if (isDeleted[key] === false) {
                tempIsDeleted[key] = true
            }
            setIsDeleted(tempIsDeleted)
        }
        let { selectedOptions, selectedBodyParts } = xRayDetail
        if (key && subKey) {
            this.removeCodeForList(selectedOptions[key][subKey].bodyCodes)
            delete selectedOptions[key][subKey]
            if (Object.keys(selectedOptions[key]).length === 0) {
                delete selectedOptions[key]
                let tIndex = selectedBodyParts.indexOf(key)
                if (tIndex >= 0) {
                    selectedBodyParts.splice(tIndex, 1)
                }
            }
        }
        else {
            this.removeCodeForList(selectedOptions[key].bodyCodes)
            delete selectedOptions[key]
        }
        let partIndex = selectedBodyParts.indexOf(key)
        if (key && !subKey && partIndex >= 0) {
            selectedBodyParts.splice(partIndex, 1)
        }
        if (subKey && !selectedOptions.hasOwnProperty(key) && partIndex >= 0) {
            selectedBodyParts.splice(partIndex, 1)
        }
        setXRayDetail({
            selectedOptions,
            selectedBodyParts,
        })
    }
    const handleUrgent = (e) => {
        setIsChecked(e.target.checked)
        onisUrgentChange(e.target.checked)
    }
    const handleInfectionControl = (e) => {
        setIsInfectionChecked(e.target.checked)
        onIsInfectionControl(e.target.checked)
    }
    const handleReasonText = (e) => {
        setReasonText(e.target.value)
    }
    const handelCancelAdd = (params = {}) => {
        setIsAddEditNote(false)
    }
    const changeNoteCountFun = () => {
        changeNoteCount()
        handelCancelAdd()
    }
    const handleAddNoteListCancel = (upadtedAddedNotes) => {
        if (upadtedAddedNotes && upadtedAddedNotes.length > 0) {
            onUpdateNoteList(upadtedAddedNotes)
        }
        setAddNoteListShow(false)
    }
    const visibleNotesModal = () => {
        setNotesModal(false)
        setNotesFilterOptions(null)
    }
    return (
        // <Modal
        //     title={
        //         <div>
        //             <span>X-Ray For John Doe(36Age)</span>
        //             <Tooltip title="Edit">
        //                 <img style={{ marginLeft: "8px" }} onClick={this.closeReview} src={require("./../svg/edit.svg")} alt="" />
        //             </Tooltip>
        //         </div>
        //     }
        //     className="ReviewPopup"
        //     visible={isVisible}
        //     onOk={this.handleOk}
        //     onCancel={this.closeReview}
        //     footer={
        //         <div className="gx-d-flex gx-align-items-center" style={{ justifyContent: "space-between" }}>
        //             <div className="gx-d-flex gx-align-items-center">
        //                 {/* ()=>this.props.onisUrgentChange(reviewFor) */}
        //                 <Checkbox onChange={this.handleUrgent} checked={this.state.isChecked}>Is examination is URGENT?</Checkbox>
        //                 <div className="gx-d-flex">
        //                     <Button type="success" icon="plus" onClick={() => createNotesModal(true)} >
        //                         Add Note
        //                                             </Button>
        //                     <div style={{ color: '#fa5a5c', display: 'flex', alignItems: 'center', textDecoration: 'underline' }}>
        //                         <a onClick={this.createNotesModal}>
        //                             <Icon type="file-text" />{notesCount} Notes</a>
        //                     </div>
        //                     {/* <div className="ListViewBox">
        //                                                 <a>View Note</a>
        //                                             </div> */}
        //                     {/* <Tooltip title="Add Notes">
        //                                                 <img style={{marginRight:"10px"}} src={require("./svg/add-note.svg")} alt="" />
        //                                             </Tooltip> */}
        //                     {/* <Tooltip title="view Note">
        //                                                 <img src={require("./svg/view.svg")} alt="" />
        //                                             </Tooltip> */}
        //                 </div>
        //             </div>
        //             <Button type="primary" size={size} onClick={this.handleOk}>Submit</Button>
        //         </div>
        //     }
        // >
        //     <div className="reviewPopupWrapper">
        //         <div className="reviewPopup">
        //             <ul>
        //                 <li style={{ listStyleType: 'none' }}>                            {
        //                     //.selectedOptions: {},
        //                     Object.keys(xRayDetail).length > 0 && xRayDetail.selectedOptions && Object.keys(xRayDetail.selectedOptions).length ?
        //                         Object.keys(xRayDetail.selectedOptions).map((key, i) => {
        //                             return <> {
        //                                 xRayDetail.selectedOptions[key].optionItems &&
        //                                     xRayDetail.selectedOptions[key].optionItems.length ?
        //                                     (isEdit ? !(S_isDeleted && S_isDeleted.hasOwnProperty(key) && isDeleted[key]) : true) ?
        //                                         < li style={{ listStyleType: 'none' }}>
        //                                             <div className="reviewMianContentItem">
        //                                                 <div className="reviewMianContent">
        //                                                     <div className="reiewtitle">{`${i + 1}.${key}`}</div>
        //                                                     <p>{
        //                                                         xRayDetail.selectedOptions[key].optionItems.join(',')
        //                                                     } </p>
        //                                                 </div>
        //                                                 {
        //                                                     isEdit ? null : <div className="reviewDelet" onClick={() => this.handleDelete(key)}>
        //                                                         <img src={require('./../svg/delete.svg')} alt="" />
        //                                                     </div>
        //                                                 }

        //                                             </div>
        //                                         </li> : null :
        //                                     Object.keys(xRayDetail.selectedOptions[key]).length ?
        //                                         (isEdit ? !(S_isDeleted && S_isDeleted.hasOwnProperty(key) && isDeleted[key]) : true) ?
        //                                             <>
        //                                                 <div style={{ fontSize: '16px', marginBottom: '10px' }}><strong>{`${i + 1}.${key}`}</strong></div>
        //                                                 {
        //                                                     Object.keys(xRayDetail.selectedOptions[key]).map((subKey, j) => {
        //                                                         return <div style={{ marginBottom: '5px' }}>
        //                                                             {
        //                                                                 xRayDetail.selectedOptions[key][subKey] &&
        //                                                                     xRayDetail.selectedOptions[key][subKey].optionItems &&
        //                                                                     xRayDetail.selectedOptions[key][subKey].optionItems.length ?
        //                                                                     <li style={{ listStyleType: 'none', marginLeft: '30px' }}>
        //                                                                         <div className="reviewMianContentItem">
        //                                                                             <div className="reviewMianContent">
        //                                                                                 <div className="reiewtitle">{`${j + 1}.${subKey}`}</div>
        //                                                                                 <p>{
        //                                                                                     xRayDetail.selectedOptions[key][subKey].optionItems.join(',')
        //                                                                                 } </p>
        //                                                                             </div>
        //                                                                             {
        //                                                                                 isEdit ? null : <div className="reviewDelet" onClick={() => this.handleDelete(key, subKey)}>
        //                                                                                     <img src={require('./../svg/delete.svg')} alt="" />
        //                                                                                 </div>
        //                                                                             }

        //                                                                             <hr />
        //                                                                         </div>
        //                                                                     </li> : null
        //                                                             }
        //                                                         </div>
        //                                                     })
        //                                                 }
        //                                                 <hr />
        //                                             </> : null
        //                                         : null
        //                             }
        //                             </>
        //                         })
        //                         : null
        //                 }
        //                 </li>
        //                 <li className="checkBox">
        //                     <Checkbox onChange={this.handleInfectionControl} checked={this.state.isInfectionChecked}>Infection control</Checkbox>
        //                 </li>
        //                 <li className="textAreaBox">
        //                     <label>Indicate reason for the examination (Clinical Information)</label>
        //                     <textarea className="TextAreaBox" value={this.state.reasonText} onChange={this.handleReasonText}></textarea>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        //     {
        //         this.state.notesModal && (
        //             <NotesModal
        //                 visible={this.state.notesModal}
        //                 filterOptions={this.state.notesFilterOptions}
        //                 onCancel={this.visibleNotesModal}
        //                 onAddNotes={this.handleAddNoteCount}
        //                 onOk={this.visibleNotesModal}
        //                 isUpsertList={true}
        //             />
        //         )
        //     }
        //     {
        //         showAddNoteModal && (
        //             <AddNoteModal
        //                 isVisible={showAddNoteModal}
        //                 onCancel={this.hideAddNoteModal}
        //             />
        //         )
        //     }
        //     {
        //         isAddEditNote ?
        //             <AddNoteForm
        //                 visible={isAddEditNote}
        //                 options={this.state.notesFilterOptions}
        //                 handleCancel={this.handelCancelAdd}
        //                 onOk={this.changeNoteCountFun}
        //             /> : null
        //     }
        //     {
        //         addNoteListShow &&
        //         <NoteListModal
        //             isVisible={addNoteListShow}
        //             addedNotes={addedNotes}
        //             notesCount={notesCount}
        //             onCancel={this.handleAddNoteListCancel}
        //         />
        //     }
        // </Modal >
        <></>
    );
}

export default ReviewPopUp;
