import React, { Component, useState, useEffect } from "react";
import Spin from 'rc-spinner'
import ReviewPopup from './ReviewPopup/index'
import DynamicModal from './DynamicModal'
import { IMAGING_FORM_NAME } from '../../../constants/xray'
import { Toast, Button } from '../../../components/common/index'
import { displayDateTime } from '../../../util/moment'
import ConfirmPopup from '../../../components/common/ConfirmPopup'

import BodyPart from './BodyPart'
import { priority } from "../../../constants/notes";
const _ = require('lodash')
const moment = require('moment')

const initialXrayDetail = {
  selectedOptions: {},
  selectedBodyParts: [],
  bodyPartsCodeList: []
}

function XRayDetail(props) {

  const { activeTab, isEdit, editDatas, imagingInfo, UltraSoundJson, setNotesCount,
    residentData, doctorId, authUser, jsonData, size, residentAge, setBtnLoading, loading, notesCount,
    redirectToListing, residentName, onSubmit, imagingJson, roomNo, btnLoading
  } = props

  const [showDynamicModal, setShowDynamicModal] = useState(false)
  const [showReviewPopUp, setShowReviewPopUp] = useState(false)
  const [addedNotes, setAddedNotes] = useState([])
  const [selectedPart, setSelectedPart] = useState(null)
  const [radioData, setRadioData] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)
  const [isInfectionControl, setIsInfectionControl] = useState(false)
  const [reasonText, setReasonText] = useState('')
  const [xRayDetail, setXRayDetail] = useState(initialXrayDetail)
  const [editCode, setEditCode] = useState([])
  const [editData, setEditData] = useState(undefined)
  const [isDeleted, setIsDeleted] = useState({})
  const [isConfirmPopup, setConFirmPopup] = useState(false)
  const [isSubmit, setSubmit] = useState(false)
  const [extensionNo, setExtensionNo] = useState(undefined)
  const [phoneNo, setPhoneNo] = useState(undefined)

  useEffect(() => {
    setInitialState()
    if (isEdit && editDatas && Object.keys(editDatas).length) {
      setEditData(editDatas)
      console.log("TCL: XRayDetail -> editDatas", editDatas)
      if (editDatas.phone) {
        setPhoneNo(editDatas.phone)
      }
      if (editDatas.extension) {
        setExtensionNo(editDatas.extension)
      }
      // setStateByeditData(true)
    }
  }, [activeTab, isEdit, editDatas])

  useEffect(() => {
    if (isEdit && editData && Object.keys(editData).length) {
      setStateByeditData(true)
    }
  }, [editData])
  useEffect(() => {
    if (isSubmit) {
      handleSubmit()
    }
  }, [isSubmit])

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

    if (isSubmitted && updatedIsdeleted) {
      setIsDeleted(updatedIsdeleted)
    }
    if (args && args.hasOwnProperty('updatedDetail') && isSubmitted) {
      setXRayDetail(args.updatedDetail)
      setShowReviewPopUp(false)
      setReasonText(args.reasonText)
      if (!doNotSubmit) {
        setSubmit(true)
        // handleSubmit()
      }
    }
    else {
      setShowReviewPopUp(false)
    }
  }

  const setInitialState = () => {
    setConFirmPopup(false)
    getInitialStateValues()
    setIsDeleted({})

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
    setIsDeleted(updatedIsdeleted)
    setXRayDetail(tempXRayDetail)
  }
  const handleIsUrgentChange = (val) => {
    setIsUrgent(val)
  }
  const handleInfectionControl = (val) => {
    setIsInfectionControl(val)
  }
  const setStateByeditData = (assignToState) => {
    let tempEditData = _.cloneDeep(editData)
    if (tempEditData && tempEditData.selectedBodyParts && tempEditData.selectedBodyParts.length) {
      let parentObj = {}, selectedBodyParts = [], bodyPartsCodeList = []
      tempEditData.selectedBodyParts.forEach(obj => {
        if (assignToState) {
          setEditCode(oldCodes => [...oldCodes, obj.code])
        }
        if (obj.isClickable) {

          let isDeleteObj = false
          if (assignToState && obj.hasOwnProperty('isDeleted') && obj.isDeleted) {
            isDeleteObj = true
          }
          if (!isDeleteObj) {
            bodyPartsCodeList.push(obj.code)
            selectedBodyParts.push(obj.label)
            if (assignToState) {
              setIsDeleted(oldDeleted => ({ ...oldDeleted, [obj.label]: false }))
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
                  if (assignToState && obj.hasOwnProperty('isDeleted') && obj.isDeleted) {
                    isDeleteObj = true
                  }
                  if (!isDeleteObj) {
                    bodyPartsCodeList.push(obj.code)
                    selectedBodyParts.push(obj.label)
                    if (assignToState) {
                      setIsDeleted(oldDeleted => ({ ...oldDeleted, [obj.label]: false }))
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
      if (isEdit && tempEditData && tempEditData.isUrgent) {
        setIsUrgent(tempEditData.isUrgent)
      }
      // console.log("tempXRayDetail", tempXRayDetail)
      if (assignToState) {
        console.log("TCL: setStateByeditData -> setXRayDetail")
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
    let jsonData = _.cloneDeep(imagingJson)
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
            customObj.isDeleted = isDeleted[customObj.label] ? true : false
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
            customObj.isDeleted = isDeleted[customObj.label] ? true : false
          }
          customObj.optionItems = filters
        }
        formData.push({ ...customObj })
      }
    })
    if (isEdit) {
      let tempEditData = _.cloneDeep(editData)
      if (tempEditData && tempEditData.selectedBodyParts && tempEditData.selectedBodyParts.length) {
        let clonedData = _.cloneDeep(tempEditData.selectedBodyParts)
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
      isVerbalOrder = editDatas.isVerbalOrder
    }
    else {
      if (authUser._id !== doctorId) {
        isVerbalOrder = true
      }
    }
    console.log('formData', formData)
    let request = {
      residentId: residentData._id,
      // residentInfoId: residentData.patientInfoId.id,
      homeId: authUser.homeId._id,
      homeAreaId: residentData.homeAreaId || '',
      imagingDiagnosticId: imagingInfo._id || '',
      physicianId: doctorId,
      isVerbalOrder: isVerbalOrder,
      isUrgent: isUrgent,
      isInfectionControl: isInfectionControl,
      formType: +activeTab,
      selectedBodyParts: formData,
    }

    if (reasonText.length > 0) {
      request.reason = reasonText
    }
    else if (isEdit && editData.reason && editData.reason.length > 0) {
      request.reason = reasonText
    }
    if (isUrgent && phoneNo && extensionNo) {
      request.phone = phoneNo
      request.extension = extensionNo
    }

    if (isEdit) {
      request.isCancel = false
      request.id = editData._id
    }
    else {
      let allNotes = _.cloneDeep(addedNotes);
      allNotes.map(note => {
        delete note.key;
        delete note.createdAt;
        note.addedBy = note.addedBy.id;
        note.isPublic = true;
        note.noteType = '5fe0724ff1c36b129ac204ab'; //check
        note.priority = priority.LOW;
        return note;
      })
      request.notes = _.cloneDeep(allNotes)
    }
    request.isCancel = false;
    onSubmit(request)
  }
  const confirmClear = (e) => {
    e.stopPropagation()
    setConFirmPopup(true)
  }
  const addNote = note => {
    let tempAddedNotes = _.cloneDeep(addedNotes)
    tempAddedNotes.push({ ...note, key: addedNotes.length })
    setNotesCount(tempAddedNotes.length)
    setAddedNotes(tempAddedNotes)
  }
  const handleUpdateNoteList = (updatedNoteList) => {
    if (updatedNoteList && updatedNoteList.length > 0) {
      setNotesCount(updatedNoteList.length)
      setAddedNotes(updatedNoteList)
    }
  }
  const handlePhoneNoChange = (e) => {
    if (e === undefined) {
      setPhoneNo(undefined)
    }
    else if (e.target.value && e.target.value.length < 12) {
      setPhoneNo(e.target.value)
    }
    else if (!e.target.value) {
      setPhoneNo(undefined)
    }
  }
  const handleExtensionChange = (e) => {
    if (e === undefined) {
      setExtensionNo(undefined)
    }
    else if (e.target.value && e.target.value.length <= 5) {
      setExtensionNo(e.target.value)
    }
    else if (!e.target.value) {
      setExtensionNo(undefined)
    }
  }

  let clonedSelectedParts = []
  let clonedCodeList = []
  if (xRayDetail && xRayDetail.selectedBodyParts.length > 0) {
    clonedSelectedParts = xRayDetail.selectedBodyParts
  }
  // console.log("TCL: XRayDetail -> clonedCodeList", clonedCodeList)
  if (xRayDetail && xRayDetail.bodyPartsCodeList.length > 0) {
    clonedCodeList = xRayDetail.bodyPartsCodeList
  }

  const handleDynamicModal = (action) => {
    setShowDynamicModal(action)
  }


  const deleteSelectedPart = (key, subKey) => {
    const accData = (temp) => {
      if (subKey) {
        return _.cloneDeep(temp[key][subKey])
      } else return _.cloneDeep(temp[key]);
    }
    const selected = _.cloneDeep(xRayDetail);
    const selectedOptions = _.cloneDeep(selected.selectedOptions);
    delete selected.selectedOptions[key];
    selected.selectedBodyParts.splice(selected.selectedBodyParts.indexOf(key), 1);
    accData(selectedOptions).bodyCodes.map(bodyCode => {
      selected.bodyPartsCodeList.splice(selected.bodyPartsCodeList.indexOf(bodyCode), 1)
    })

    setXRayDetail(selected)
  }

  const todayDate = displayDateTime(moment());
  return (
    <div className="xray-details">
      <div className="details-table">
        <div className="main-title">
          <h4>
            {IMAGING_FORM_NAME[activeTab]}&nbsp;-&nbsp;{residentName} (Room No {roomNo})&nbsp;&nbsp;{todayDate}
          </h4>
        </div>
        {
          (loading || Object.keys(jsonData).length == 0) ?
            <div className="spin"><Spin height={40} /></div> :
            <>
              {
                Object.keys(jsonData).map((bodyPart, i) => {
                  return <BodyPart key={`bodyPart${i}`}
                    onShowDynamicModal={displayDynamicModal}
                    clonedCodeList={clonedCodeList}
                    clonedSelectedParts={clonedSelectedParts}
                    name={bodyPart}
                    isEdit={isEdit}
                    editCode={editCode}
                    data={jsonData[bodyPart]} />
                })
              }
            </>
        }
      </div>
      <div className="bottom-part">
        <div className="d-flex">
          <label>
            <span>Selected&nbsp;-&nbsp;</span>{xRayDetail.selectedBodyParts.join(',')}
          </label>
          <div className="d-flex-end">
            <div className="save-graft">
              <span onClick={confirmClear}>Clear all</span>
            </div>
            <Button loading={btnLoading} size="lg" onClick={handleShowReviewPopUp}>&nbsp;Review & Submit&nbsp;&nbsp;</Button>
          </div>
        </div>
      </div>
      {
        showDynamicModal ?
          <DynamicModal
            onDynamicModalChange={handleDynamicModalChange}
            isVisible={showDynamicModal}
            data={_.cloneDeep(selectedPart)}
            isEdit={isEdit}
            P_isDeleted={isDeleted}
            selectedBodyParts={_.cloneDeep(xRayDetail.selectedBodyParts)}
            bodyPartsCodeList={_.cloneDeep(xRayDetail.bodyPartsCodeList)}
            pickedBodyPartsOpt={_.cloneDeep(xRayDetail.selectedOptions)}
            radioData={_.cloneDeep(radioData)}
            onCloseModal={hideDynamicModal}
            roomNo={roomNo}
            residentName={residentName}
            residentAge={residentAge}
          /> : null
      }
      {
        showReviewPopUp ?
          <ReviewPopup
            detail={_.cloneDeep(xRayDetail)}
            deleteSelectedPart={deleteSelectedPart}
            isVisible={showReviewPopUp}
            authUser={authUser}
            isEdit={isEdit}
            editData={editData}
            isDeleted={_.cloneDeep(isDeleted)}
            bodyPartsCodeList={_.cloneDeep(xRayDetail.bodyPartsCodeList)}
            onReasonTextChange={handleReasonTextChange}
            onisUrgentChange={handleIsUrgentChange}
            onIsInfectionControl={handleInfectionControl}
            onCancel={hideReviewModal}
            addNote={addNote}
            addedNotes={_.cloneDeep(addedNotes)}
            notesCount={notesCount}
            changeNoteCount={changeNoteCount}
            changeNoteCounts={setNotesCount}
            onExtensionChange={handleExtensionChange}
            onPhoneNoChange={handlePhoneNoChange}
            phoneNo={phoneNo}
            extensionNo={extensionNo}
            onUpdateNoteList={handleUpdateNoteList}
            roomNo={roomNo}
            residentName={residentName}
          />
          : null
      }
      {
        isConfirmPopup ?
          <ConfirmPopup
            title='Clear Selections'
            visible={isConfirmPopup}
            onOk={setInitialState}
            onCancel={() => { setConFirmPopup(false) }}
            okText="Confirm"
            cancelText="Cancel"
            footerDescription="This action cannot be undone"
          > <p>Are you sure you want to clear Selected options</p></ConfirmPopup > : null
      }
      {/* {
        fingersPopup && <FingersPopup visible={fingersPopup}
        // onClosed={() => modalActionFn('fingersPopup', false)}
        />
      } */}
    </div>
  );
}

export default XRayDetail;
