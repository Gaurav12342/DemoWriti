import React, { Component, useState, useEffect } from 'react';
import DynamicModal from './DynamicModal'
import ReviewModal from './ReviewPopUp'
import { requisitionRequest } from '../../../services/api/routes/x_ray'
import { X_RAY_FORM_TYPE } from '../../../constants/xray'
import ConfirmPopup from '../../../components/common/ConfirmPopup'
import { Toast } from '../../../components/common/Toast'
import './.././style.css'
const _ = require('lodash')


const customChecked = {
    backgroundColor: 'rgb(135, 208, 104)',
    color: '#fff!important'
}
const disbaleItemsStyle = {

    display: 'block',
    pointerEvents: 'none',
    // backgroundColor: '#dddddd'
}
const initialXrayDetail = {
    selectedOptions: {},
    selectedBodyParts: [],
    bodyPartsCodeList: []
}

function DisplayDynamicJsonData(props) {

    const { activeTab, isEdit, editData, imagingInfo, UltraSoundJson, setNotesCount,
        residentData, doctorId, authUser, jsonData, size, residentAge, setLoading, loading, notesCount, setActive, active,
        redirectToListing, residentName,onSubmit
    } = props

    const [showReviewPopUp, setShowReviewPopUp] = useState(false)
    const [showDynamicModal, setShowDynamicModal] = useState(false)
    const [addedNotes, setAddedNotes] = useState([])
    const [selectedPart, setSelectedPart] = useState(null)
    const [radioData, setRadioData] = useState('')
    const [isUrgent, setIsUrgent] = useState(false)
    const [isInfectionControl, setIsInfectionControl] = useState(false)
    const [reasonText, setReasonText] = useState('')
    const [xRayDetail, setXRayDetail] = useState(initialXrayDetail)
    const [editCode, setEditCode] = useState(undefined)
    this.editData = undefined
    this.isDeleted = {}

    useEffect(() => {
        setInitialState()
        if (isEdit && editData && Object.keys(editData).length) {
            setStateByeditData(true)
        }
    }, [activeTab, isEdit])

    useEffect(() => {
        checkActiveStatus()
    }, [xRayDetail])

    const getInitialStateValues = () => {
        setShowReviewPopUp(false)
        setShowDynamicModal(false)
        setAddedNotes([])
        setSelectedPart(null)
        setRadioData('')
        setIsUrgent(false)
        setIsInfectionControl(false)
        setReasonText('')
        setXRayDetail(initialXrayDetail)
    }
    const handleShowReviewPopUp = (e) => {
        e.stopPropagation()
        setShowReviewPopUp(true)
    }

    const closeReviewPopUp = () => {
        setShowReviewPopUp(false)
    }

    const displayDynamicModal = (data, radioData) => {
        setRadioData(radioData)
        setSelectedPart(data)
        setShowDynamicModal(true)
    }

    const hideDynamicModal = () => {
        setShowDynamicModal(false)
        setSelectedPart(null)
    }

    const hideReviewModal = (args, isSubmitted, updatedIsdeleted, doNotSubmit) => {
        console.log("TCL: DisplayDynamicJsonData -> hideReviewModal -> args", args)
        if (isSubmitted && updatedIsdeleted) {
            this.isDeleted = updatedIsdeleted
            console.log("hideReviewModal ->  this.isDeleted", this.isDeleted)
        }
        if (args && args.hasOwnProperty('updatedDetail') && isSubmitted) {
            setXRayDetail(args.updatedDetail)
            setShowReviewPopUp(false)
            setReasonText(args.reasonText)
            if (!doNotSubmit) {
                handleSubmit()
            }
        }
        else {
            setShowReviewPopUp(false)
        }
        checkActiveStatus()
    }

    const checkActiveStatus = () => {
        let action = activeTab
        let selectedBodyParts = _.cloneDeep(xRayDetail.selectedBodyParts)
        let tempActive = _.cloneDeep(active)
        if (selectedBodyParts && selectedBodyParts.length > 0 && !active[action]) {
            tempActive[action] = true
        }
        else if (selectedBodyParts.length === 0) {
            tempActive = {
                [X_RAY_FORM_TYPE.X_RAY]: false,
                [X_RAY_FORM_TYPE.MOBILE_ULTRASOUND]: false,
            }
        }
        setActive(tempActive)
    }
    const setInitialState = () => {
        getInitialStateValues()
        this.isDeleted = {}
        checkActiveStatus()
    }

    const handleDynamicModalChange = (selectedParts, selectedBodyParts, updatedcodeList, updatedIsdeleted) => {
        // let tempSelectedOpt = _.cloneDeep(xRayDetail.selectedOptions)
        let tempSelectedOpt = { ...selectedParts }
        let tempXRayDetail = _.cloneDeep(xRayDetail)
        tempXRayDetail = {
            selectedOptions: tempSelectedOpt,
            selectedBodyParts,
            bodyPartsCodeList: updatedcodeList
        }
        this.isDeleted = updatedIsdeleted
        setXRayDetail(tempXRayDetail)
    }
    const handleIsUrgentChange = (val) => {
        setIsUrgent(val)
    }
    const handleInfectionControl = (val) => {
        setIsInfectionControl(val)
    }
    const setStateByeditData = (assignToState) => {
        let editData = _.cloneDeep(editData)
        console.log("TCL: DisplayDynamicJsonData -> setStateByeditData -> editData", editData)
        if (editData && editData.selectedBodyParts && editData.selectedBodyParts.length) {
            let parentObj = {}, selectedBodyParts = [], bodyPartsCodeList = []
            editData.selectedBodyParts.forEach(obj => {
                if (assignToState) {
                    setEditCode(obj.code)
                }
                if (obj.isClickable) {

                    let isDeleteObj = false
                    if (assignToState && obj.hasOwnProperty('this.isDeleted') && obj.this.isDeleted) {
                        isDeleteObj = true
                    }
                    if (!isDeleteObj) {
                        bodyPartsCodeList.push(obj.code)
                        selectedBodyParts.push(obj.label)
                        if (assignToState) {
                            this.isDeleted[obj.label] = false
                        }
                        let optionList = []
                        let bodyCodesList = []
                        let other = {}
                        obj.optionItems.forEach(option => {
                            if (option.hasOwnProperty("value") && option.value.length > 0) {
                                other[option.code] = option.value
                            }
                            optionList.push(option.name)
                            bodyPartsCodeList.push(option.code)
                            bodyCodesList.push(option.code)
                        })
                        bodyCodesList.push(obj.code)
                        parentObj = {
                            ...parentObj,
                            [obj.label]: {
                                optionItems: optionList,
                                bodyCodes: bodyCodesList
                            }
                        }
                        if (Object.keys(other).length) {
                            parentObj[obj.label] = {
                                ...parentObj[obj.label],
                                other: { ...other }
                            }
                        }
                    }
                }
                else {
                    if (obj.optionItems.length) {
                        obj.optionItems.forEach(option => {
                            if (option.radioButtons && option.radioButtons.length) {
                                option.radioButtons.forEach(radioOption => {
                                    let isDeleteObj = false
                                    if (assignToState && obj.hasOwnProperty('this.isDeleted') && obj.this.isDeleted) {
                                        isDeleteObj = true
                                    }
                                    if (!isDeleteObj) {
                                        bodyPartsCodeList.push(obj.code)
                                        selectedBodyParts.push(obj.label)
                                        if (assignToState) {
                                            this.isDeleted[obj.label] = false
                                        }
                                        if (radioOption.optionItems.length) {
                                            let tempCodeList = []
                                            let optionList = []
                                            let bodyCodesList = []
                                            let other = {}
                                            radioOption.optionItems.forEach(obj => {
                                                if (obj.hasOwnProperty('value') && obj.value.length > 0) {
                                                    other = {
                                                        ...other,
                                                        [obj.code]: obj.value
                                                    }
                                                }
                                                optionList.push(obj.name)
                                                bodyPartsCodeList.push(obj.code)
                                                tempCodeList.push(obj.code)
                                            })
                                            tempCodeList.push(obj.code, radioOption.code)
                                            bodyCodesList.push(obj.code)
                                            let tempObj = {
                                                [radioOption.label]: {
                                                    optionItems: optionList,
                                                    bodyCodes: tempCodeList
                                                }
                                            }
                                            if (Object.keys(other).length > 0) {
                                                tempObj[radioOption.label] = {
                                                    ...tempObj[radioOption.label],
                                                    other: { ...other }
                                                }
                                            }
                                            bodyPartsCodeList.push(obj.code, radioOption.code)
                                            parentObj[obj.label] = {
                                                // ...parentObj[obj.label],
                                                ...tempObj
                                            }
                                        }
                                    }
                                })

                            }
                        })
                    }
                }
            })
            let tempXRayDetail = {
                selectedOptions: parentObj,
                selectedBodyParts: selectedBodyParts,
                bodyPartsCodeList: bodyPartsCodeList
            }
            if (isEdit && editData && editData.isUrgent) {
                setIsUrgent(editData.isUrgent)
            }
            // console.log("tempXRayDetail", tempXRayDetail)
            if (assignToState) {
                setXRayDetail(tempXRayDetail)
            }
            else {
                return tempXRayDetail
            }

        }
    }
    const handleReasonTextChange = () => {
        setReasonText(reasonText)
    }
    const changeNoteCount = (isDelete) => {
        const tempNotesCount = isDelete && isDelete === true ? notesCount - 1 : notesCount + 1
        setNotesCount(tempNotesCount)
    }
    const handleSubmit = () => {
        let { bodyPartsCodeList, selectedOptions } = _.cloneDeep(xRayDetail)
        if (Object.keys(selectedOptions).length === 0) {
            Toast.error('Empty Request cant be submitted')
            return
        }
        let jsonData =_.cloneDeep(imagingJson)
        let formData = []
        jsonData.forEach(jsonObj => {
            if (bodyPartsCodeList.indexOf(jsonObj.code) >= 0) {
                let customObj = { ...jsonObj }
                if (jsonObj.isClickable) {
                    let filter = []
                    jsonObj.optionItems.forEach(opt => {
                        if (bodyPartsCodeList.indexOf(opt.code) >= 0) {
                            if (opt.hasOwnProperty('value')) {
                                let tempValue = ''
                                if (selectedOptions[jsonObj.label] && selectedOptions[jsonObj.label].other
                                    && selectedOptions[jsonObj.label].other[opt.code]) {
                                    tempValue = selectedOptions[jsonObj.label].other[opt.code]
                                }
                                let optionToadd = {
                                    ...opt,
                                    value: tempValue,
                                    isSelected: true
                                }
                                filter.push({ ...optionToadd })
                            }
                            else {
                                filter.push({ ...opt, isSelected: true })
                            }
                        }
                    })
                    if (isEdit) {
                        customObj.this.isDeleted = this.isDeleted[customObj.label] ? true : false
                    }
                    customObj.optionItems = filter
                    customObj.isSelected = true
                }
                else {
                    let isFound = false
                    let filters = []
                    jsonObj.optionItems.forEach(opt => {
                        if (opt.radioButtons) {
                            let btnArr = []
                            opt.radioButtons.forEach(radioBtn => {
                                if (bodyPartsCodeList.indexOf(radioBtn.code) >= 0) {
                                    let radioOptionsList = []
                                    radioBtn.optionItems.forEach(radioOption => {
                                        if (bodyPartsCodeList.indexOf(radioOption.code) >= 0) {
                                            let tempValue = ''
                                            if (radioOption.hasOwnProperty('value')) {
                                                if (selectedOptions[jsonObj.label] && selectedOptions[jsonObj.label][radioBtn.label]
                                                    && selectedOptions[jsonObj.label][radioBtn.label].other &&
                                                    selectedOptions[jsonObj.label][radioBtn.label].other[radioOption.code]) {
                                                    tempValue = selectedOptions[jsonObj.label][radioBtn.label].other[radioOption.code]
                                                }
                                            }
                                            let optionToadd = {
                                                ...radioOption,
                                                value: tempValue,
                                                isSelected: true
                                            }
                                            radioOptionsList.push({ ...optionToadd })
                                        }
                                    })
                                    radioBtn.optionItems = radioOptionsList
                                    btnArr.push({ ...radioBtn, isSelected: true })
                                    isFound = true
                                }
                            })
                            if (isFound) {
                                filters.push({ ...opt, radioButtons: btnArr, isSelected: true })
                            }
                        }
                    })
                    if (isEdit) {
                        customObj.this.isDeleted = this.isDeleted[customObj.label] ? true : false
                    }
                    customObj.optionItems = filters
                }
                formData.push({ ...customObj })
            }
        })
        if (isEdit) {
            let editData = _.cloneDeep(editData)
            if (editData && editData.selectedBodyParts && editData.selectedBodyParts.length) {
                let clonedData = _.cloneDeep(editData.selectedBodyParts)
                formData = formData.map(formObj => {
                    let newObj = formObj
                    clonedData.forEach((selPart, i) => {
                        if (formObj.code === selPart.code) {
                            newObj = { ...selPart, ...formObj }
                            clonedData.splice(i, 1)
                        }
                    })
                    return newObj
                })
            }
        }
        if (formData.length === 0) {
            Toast.warn('You cant submit empty requisition')
            return
        }
        let isVerbalOrder = false
        if (isEdit) {
            isVerbalOrder = editData.isVerbalOrder
        }
        else {
            if (authUser._id !== doctorId) {
                isVerbalOrder = true
            }
        }
        console.log('formData', formData)
        let request = {
            residentId: residentData.id,
            residentInfoId: residentData.patientInfoId.id,
            homeId: authUser.homeId,
            homeAreaId: residentData.parentClientele[0].id,
            imagingDiagnosticId: imagingInfo.id || '',
            physicianId: doctorId,
            isVerbalOrder: isVerbalOrder,
            isUrgent: isUrgent,
            isInfectionControl: isInfectionControl,
            formType: activeTab,
            selectedBodyParts: formData,
        }
        if (reasonText.length > 0) {
            request.reason = reasonText
        }
        if (isEdit) {
            request.isCancel = false
            request.id = editData.id
        }
        else {
            request.notes = _.cloneDeep(addedNotes)
        }
        console.log('request', request)
        setLoading(true)
        onSubmit(request)
    }
    const confirmClear = (e) => {
        e.stopPropagation()
        return <ConfirmPopup
            title={`Clear Selections `}
            onOk={setInitialState}
            onCancel={() => { }}
            okText="Confirm"
            cancelText="Cancel"
            footerDescription="This action cannot be undone"
        > <p>Are you sure you want to clear Selected options</p></ConfirmPopup >
    }
    const addNote = note => {
        let addedNotes = _.cloneDeep(addedNotes)
        addedNotes.push({ ...note, key: addedNotes.length })
        setNotesCount(addedNotes.length)
        setAddedNotes(addedNotes)
    }
    const handleUpdateNoteList = (updatedNoteList) => {
        if (updatedNoteList && updatedNoteList.length > 0) {
            setNotesCount(updatedNoteList.length)
            setAddedNotes(updatedNoteList)
        }
    }
    let clonedSelectedParts = []
    let clonedCodeList = []
    if (xRayDetail && xRayDetail.selectedBodyParts.length > 0) {
        clonedSelectedParts = xRayDetail.selectedBodyParts
    }
    if (xRayDetail && xRayDetail.bodyPartsCodeList.length > 0) {
        clonedCodeList = xRayDetail.bodyPartsCodeList
    }
    return (
        // <div>
        //     <div className="residantDetailWithSticky">
        //         <div className="residentLefts">
        //             <div className="residentCards">
        //                 <div className="mobileX-rayBox">
        //                     {
        //                         Object.keys(jsonData).length ?
        //                             Object.keys(jsonData).map(key => {
        //                                 return <div className="mobileX-rayBoxWrapper">
        //                                     <div className="mobileX-rayTitle" style={{ minHeight: '108px' }}>{key}
        //                                     </div>
        //                                     <div className="mobileX-rayDetail">
        //                                         <div className="gx-d-flex gx-align-items-center">
        //                                             {
        //                                                 jsonData[key].map((obj, i) => {
        //                                                     return !obj.isClickable ?
        //                                                         < div className="mobileX-rayRound">
        //                                                             <label key={`${obj.label}${i}`} style={{ minWidth: '120px', paddingLeft: '5 !important', paddingRight: '5 !important', marginRight: '10px' }}
        //                                                                 className={obj.isClickable ? "mobileX-raybox select" : "mobileX-raybox"}>{obj.label}</label>
        //                                                             {
        //                                                                 obj.optionItems.length ?
        //                                                                     obj.optionItems.map(current => {
        //                                                                         return current.viewType === 4 ?
        //                                                                             current.radioButtons.map(radioBtn => {
        //                                                                                 return <div className="gx-d-flex radioGroupBox"
        //                                                                                     key={`${obj.label}${i}${radioBtn.label}`}>
        //                                                                                     <label htmlFor="2" className="outlinrBorderBox"
        //                                                                                         style={isEdit ? editCode === obj.code ? null : disbaleItemsStyle : null}
        //                                                                                         onClick={() => displayDynamicModal(obj, radioBtn)}>
        //                                                                                         <input id="2" type="radio" name="radio"  />
        //                                                                                         <span className="outlinrBorder" style={clonedCodeList.indexOf(radioBtn.code) >= 0 ? customChecked : null} >
        //                                                                                             {radioBtn.label}
        //                                                                                         </span>
        //                                                                                     </label>

        //                                                                                 </div>
        //                                                                             }) : null
        //                                                                     })
        //                                                                     : null
        //                                                             }
        //                                                         </div>
        //                                                         : <Tooltip title={obj.note} ><label htmlFor="1" className="outlinrBorderBox" key={`${obj.label}${i}`}
        //                                                             style={isEdit ? editCode === obj.code ? null : disbaleItemsStyle : null}
        //                                                             onClick={() => displayDynamicModal(obj)}>
        //                                                             <input id="1" type="radio" name={obj.label} />
        //                                                             <span className="outlinrBorder" style={clonedSelectedParts.indexOf(obj.label) >= 0 ? customChecked : null}>
        //                                                                 {
        //                                                                     obj.label
        //                                                                 }
        //                                                             </span>
        //                                                         </label>
        //                                                         </Tooltip>
        //                                                 })
        //                                             }
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             })
        //                             : <div style={{ textAlign: 'center', width: '100%', marginTop: '100px' }}><Spin></Spin></div>
        //                     }
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="fixBottomSelect">
        //             <div className="fixBottomSelectItem gx-d-flex">
        //                 <div className="selectBox" style={{ wordWrap: 'break-word', maxWidth: '600px' }}>
        //                     <label>Selected :-</label>
        //                     <span>{xRayDetail.selectedBodyParts.join(',')}</span>
        //                     {/* <span>{isEdit ? xRayDetail.selectedBodyParts.filter(part =>  this.isDeleted.hasOwnProperty(part) &&  this.isDeleted[part] === true ? false : true).join(',') : xRayDetail.selectedBodyParts.join(',')}</span> */}
        //                 </div>
        //                 <div className="bottomAction" style={{ maxWidth: '300px' }}>
        //                     <button type="primary" size={size} onClick={confirmClear}>
        //                         Clear All
        //                             </button>
        //                     <button type="primary" size={size} onClick={handleShowReviewPopUp}>
        //                         Review & Submit
        //                             </button>
        //                     {/* <button type="primary" loading={loading} size={size} onClick={ handleSubmit}>
        //                             Submit
        //                             </button> */}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     {
        //         showDynamicModal ?
        //             <DynamicModal
        //                 onDynamicModalChange={handleDynamicModalChange}
        //                 isVisible={showDynamicModal}
        //                 data={_.cloneDeep(selectedPart)}
        //                 isEdit={isEdit}
        //                 isDeleted={this.isDeleted}
        //                 selectedBodyParts={_.cloneDeep(xRayDetail.selectedBodyParts)}
        //                 bodyPartsCodeList={_.cloneDeep(xRayDetail.bodyPartsCodeList)}
        //                 pickedBodyPartsOpt={_.cloneDeep(xRayDetail.selectedOptions)}
        //                 radioData={_.cloneDeep(radioData)}
        //                 onCancel={hideDynamicModal}
        //                 residentName={residentName}
        //                 residentAge={residentAge}
        //             /> : null
        //     }
        //     {
        //         showReviewPopUp ? <ReviewModal
        //             detail={_.cloneDeep(xRayDetail)}
        //             isVisible={showReviewPopUp}
        //             authUser={authUser}
        //             isEdit={isEdit}
        //             editData={editData}
        //             isDeleted={_.cloneDeep(this.isDeleted)}
        //             bodyPartsCodeList={_.cloneDeep(xRayDetail.bodyPartsCodeList)}
        //             onReasonTextChange={handleReasonTextChange}
        //             onisUrgentChange={handleIsUrgentChange}
        //             onIsInfectionControl={handleInfectionControl}
        //             onCancel={hideReviewModal}
        //             addNote={addNote}
        //             addedNotes={_.cloneDeep(addedNotes)}
        //             notesCount={notesCount}
        //             changeNoteCount={changeNoteCount}
        //             changeNoteCounts={setNotesCount}
        //             onUpdateNoteList={handleUpdateNoteList}
        //         /> : null
        //     }
        // </div >
        <></>
    );

}

export default DisplayDynamicJsonData;
