import React, { useEffect, useState } from 'react'
import ReviewPopup from './ReviewPopup'
import { TODO_CATEGORY, X_RAY_TODO_TYPES } from '../../../../constants/todo'
import AddNoteModal from '../AddNote'
import NoteListModal from '../NotesList'
import { Toast } from '../../../../components/common/index'

const moment = require('moment')
const _ = require('lodash')
function ReviewPopUpMain(props) {

    const { detail, bodyPartsCodeList, isDeleted, editData, isEdit, changeNoteCount, notesCount, isVisible,
        addedNotes, authUser, addNote, onCancel, onisUrgentChange, onIsInfectionControl, onUpdateNoteList,
        residentName, roomNo, onOk, onExtensionChange, phoneNo, extensionNo, onPhoneNoChange, deleteSelectedPart
    } = props
    let title = `X-Ray Request - ${residentName || ''} (Room No ${roomNo || ''})`
    const [xRayDetail, setXRayDetail] = useState({})
    const [notesFilterOptions, setNotesFilterOptions] = useState({})
    const [notesModal, setNotesModal] = useState(false)
    const [showAddNoteModal, setShowAddNoteModal] = useState(false)
    const [S_isDeleted, setIsDeleted] = useState({})
    const [reasonText, setReasonText] = useState('')
    const [doNotSubmit, setDoNotSubmit] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [isInfectionChecked, setIsInfectionChecked] = useState(false)
    const [addNoteListShow, setAddNoteListShow] = useState(false)
    const [isAddEditNote, setIsAddEditNote] = useState(false)
    const [codeList, setCodeList] = useState([])

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
        setCodeList(bodyPartsCodeList)
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
        setCodeList(bodyPartsCodeList)
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
        setShowAddNoteModal(false)
    }
    const handleCancel = () => {
        setNotesModal(false)
        setNotesFilterOptions({})
    };
    const handleOk = () => {
        console.log("TCL: handleOk -> reasonText", reasonText)
        if (doNotSubmit && !isEdit) {
            onPhoneNoChange(undefined)
            onExtensionChange(undefined)
        }
        if (!doNotSubmit && isInfectionChecked && reasonText.length === 0) {
            Toast.error('please Fill this indicate reason for the examination...  field')
            return
        }

        if (!doNotSubmit && isChecked && (!phoneNo || !extensionNo)) {
            Toast.error('please Fill this Phone No. and Extension No.  field')
            return
        }
        let tempXRayDetail = _.cloneDeep(xRayDetail)
        tempXRayDetail.bodyPartsCodeList = codeList
        let params = {
            updatedDetail: tempXRayDetail,
            reasonText: reasonText,
            isInfectionChecked: isInfectionChecked
        }
        setXRayDetail(params)
        console.log("TCL: handleOk -> params", params)
        onCancel(params, true, S_isDeleted, doNotSubmit)
    }
    const closeReview = () => {
        setDoNotSubmit(true)
    }
    const removeCodeForList = (removeList) => {
        let tempCodeList = codeList.filter(code => {
            if (removeList.indexOf(code) < 0) {
                return true
            }
            else {
                removeList.splice(removeList.indexOf(code), 1)
                return false
            }
        })
        setCodeList(tempCodeList)
    }
    const handleDelete = (key, subKey) => {
        console.log('key, subKey => ', key, subKey)
        if (isEdit && S_isDeleted.hasOwnProperty(key)) {
            let tempIsDeleted = _.cloneDeep(S_isDeleted)
            if (isDeleted[key] === false) {
                tempIsDeleted[key] = true
            }
            setIsDeleted(tempIsDeleted)
        }
        let { selectedOptions, selectedBodyParts } = xRayDetail
        if (key && subKey) {
            removeCodeForList(selectedOptions[key][subKey].bodyCodes)
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
            removeCodeForList(selectedOptions[key].bodyCodes)
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

        deleteSelectedPart(key, subKey)
    }
    const handleUrgent = () => {
        setIsChecked(val => !val)
        onisUrgentChange(!isChecked)
    }
    const handleInfectionControl = () => {
        setIsInfectionChecked(val => !val)
        onIsInfectionControl(!isInfectionChecked)
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
    return <> <ReviewPopup
        onCancel={onCancel}
        onOk={handleOk}
        isVisible={isVisible}
        editData={editData}
        title={title}
        isEdit={isEdit}
        xRayDetail={xRayDetail}
        S_isDeleted={S_isDeleted}
        isDeleted={isDeleted}
        isInfectionChecked={isInfectionChecked}
        handleInfectionControl={handleInfectionControl}
        reasonText={reasonText}
        handleReasonText={handleReasonText}
        isChecked={isChecked}
        onUrgent={handleUrgent}
        onDelete={handleDelete}
        onCreateNotesModal={createNotesModal}
        notesCount={notesCount}
        onExtensionChange={onExtensionChange}
        onPhoneNoChange={onPhoneNoChange}
        phoneNo={phoneNo}
        extensionNo={extensionNo}
    />
        {
            showAddNoteModal ? (
                <AddNoteModal
                    isVisible={showAddNoteModal}
                    onCancel={hideAddNoteModal}
                />
            ) : null
        }
        {
            addNoteListShow ?
                <NoteListModal
                    isVisible={addNoteListShow}
                    addedNotes={addedNotes}
                    notesCount={notesCount}
                    onCancel={handleAddNoteListCancel}
                /> : null
        }
    </>
}
export default ReviewPopUpMain