import React, { useState, useEffect } from 'react'
import DynamicModal from './DynamicModal'
import { Toast } from '../../../../components/common/index'
const _ = require('lodash')
function DynamicModalMain(props) {

    const { onCloseModal, isVisible, selectedBodyParts, bodyPartsCodeList, pickedBodyPartsOpt, radioData,
        residentName, residentAge, data, isEdit, onOk, P_isDeleted, onDynamicModalChange, roomNo } = props
    const [optionList, setOptionList] = useState([])
    const [title, setTitle] = useState([])
    const [alertText, setAlertText] = useState([])
    const [detectedNonIgnorableWords, setDetectedNonIgnorableWords] = useState([])
    const [selectedCodes, setSelectedCodes] = useState([])
    const [textFields, setTextFields] = useState([])
    const [errorMessage, setErrorMessage] = useState([])
    const [selectedTextInput, setSelectedTextInput] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [isDeleted, setIsDeleted] = useState({})
    const [nonIgnorableWords, setNonIgnorableWords] = useState([])
    const [currentSelectedCodes, setCurrentSelectedCodes] = useState([])

    useEffect(() => {
        setIsDeleted(P_isDeleted)
        let tempData = _.cloneDeep(data), tempOptionList = []
        let title = ''
        if (tempData.isClickable) {
            tempOptionList = tempData.optionItems
        }
        else {
            tempOptionList = radioData.optionItems
            tempOptionList = tempOptionList.map(opt => { return { ...opt, parent: radioData.code } })
        }
        console.log('tempData => ',tempData)
        title = tempData.optionItems.length &&
            tempData.optionItems[0].viewType === 5 ? tempData.optionItems[0].name : ''
        title = title.split('<NAME>').join(residentName).split('<AGE>').join(residentAge)
        title = title + (roomNo)
        setTitle(title)
        setOptionList(tempOptionList)
        setSelectedCodes(_.cloneDeep(bodyPartsCodeList))

        if (pickedBodyPartsOpt.hasOwnProperty(data.label)) {
            if (radioData) {
                if (pickedBodyPartsOpt[data.label][radioData.label]) {
                    setSelectedOptions(pickedBodyPartsOpt[data.label][radioData.label].optionItems)
                    setCurrentSelectedCodes(pickedBodyPartsOpt[data.label][radioData.label].bodyCodes)
                    setOtherOption(pickedBodyPartsOpt[data.label][radioData.label], "other")
                }
            }
            else {
                setSelectedOptions(pickedBodyPartsOpt[data.label].optionItems)
                setCurrentSelectedCodes(pickedBodyPartsOpt[data.label].bodyCodes)
                setOtherOption(pickedBodyPartsOpt[data.label], "other")
            }
        }
    }, [])

    const setOtherOption = (obj, key) => {
        if (obj.hasOwnProperty(key)) {
            setSelectedTextInput(obj[key])
        }
    }
    const handleItemChange = e => {
        setOptions(e.name)
        setCode(e.code)
    }
    const setOptions = (val) => {
        let tempOptions = _.cloneDeep(selectedOptions)
        if (tempOptions.indexOf(val) >= 0) {
            tempOptions.splice(tempOptions.indexOf(val), 1)
        }
        else {
            tempOptions.push(val)
        }
        setSelectedOptions(tempOptions)
    }
    const setCode = (code, parentCode) => {
        let tempCodeList = _.cloneDeep(selectedCodes)
        let cIndex = tempCodeList.indexOf(code)
        if (cIndex >= 0) {
            tempCodeList.splice(cIndex, 1)
        }
        else {
            tempCodeList.push(code)
        }
        let index = currentSelectedCodes.indexOf(code)
        if (index >= 0) {
            currentSelectedCodes.splice(index, 1)
        }
        else {
            currentSelectedCodes.push(code)
        }
        setSelectedCodes(tempCodeList)
        // selectedCodes = tempCodeList
    }
    const removeBodyCode = (codeList, label, tempCodeList) => {
        if (Object.keys(codeList[label]).length > 0) {
            Object.keys(codeList[label]).forEach(k => {
                if (codeList[label][k] && codeList[label][k].bodyCodes) {
                    let removeCodeList = _.cloneDeep(codeList[label][k].bodyCodes)
                    if (removeCodeList.length > 0) {
                        tempCodeList = tempCodeList.filter(code => {
                            let tIndex = removeCodeList.indexOf(code)
                            if (tIndex >= 0) {
                                removeCodeList.splice(tIndex, 1)
                                return false
                            }
                            return true
                        })
                    }
                }
            })
        }
        return tempCodeList
    }
    const getTextInputName = (data, k) => {
        if (data.optionItems.length) {
            let result
            data.optionItems.forEach(obj => {
                if (obj.code === k) {
                    result = obj
                }
            })
            return result
        }
        return
    }
    const handleOk = (event) => {
        if (alertText.length > 0) {
            Toast.warn('please remove non ignorable words')
            return
        }
        let tempCodeList = [...selectedCodes]
        let erMes = ''

        optionList.forEach(opt => {
            if (opt.isMandatory && tempCodeList.indexOf(opt.code) < 0) {
                erMes = ", " + opt.name + " "
            }
        })
        if (erMes.length > 0) {
            erMes = "Please Fill Out these Fields" + erMes
            setErrorMessage(erMes)
            return
        }
        Object.keys(selectedTextInput).forEach(k => {
            if (selectedTextInput[k].length > 0) {
                let result = radioData ? getTextInputName(radioData, k) : getTextInputName(data, k)
                if (result && selectedOptions.indexOf(result.name) < 0) {
                    selectedOptions.push(result.name)
                }
            }
        })
        let bodyPartsSelected = _.cloneDeep(selectedBodyParts)
        if (selectedOptions.length == 0) {
            setCurrentSelectedCodes([])
            // currentSelectedCodes.length = 0
        }
        if (currentSelectedCodes.length && selectedOptions.length) {
            if (tempCodeList.indexOf(data.code) < 0) {
                tempCodeList.push(data.code)
            }
            optionList.some(opt => {
                if (radioData && tempCodeList.indexOf(opt.code) >= 0) {
                    if (tempCodeList.indexOf(opt.parent) < 0) {
                        tempCodeList.push(opt.parent)
                    }
                    return true
                }
            })
            if (!bodyPartsSelected.includes(data.label)) {
                if (isEdit && isDeleted.hasOwnProperty(data.label) && isDeleted[data.label]) {
                    setIsDeleted({ ...isDeleted, [data.label]: false })
                }
                bodyPartsSelected.push(data.label)
            }
            let bodyObject = {}
            if (radioData) {
                let otherPickedParts = {}
                if (pickedBodyPartsOpt[data.label]) {
                    otherPickedParts = pickedBodyPartsOpt[data.label]
                    Object.keys(otherPickedParts).forEach(k => {
                        if (k !== radioData.label) {
                            tempCodeList = removeBodyCode(_.cloneDeep(pickedBodyPartsOpt), data.label, _.cloneDeep(tempCodeList))
                            if (tempCodeList.indexOf(data.code) < 0) {
                                tempCodeList.push(data.code)
                            }
                        }
                    })
                }
                bodyObject = {
                    ...pickedBodyPartsOpt,
                    [data.label]: {
                        [radioData.label]: {
                            optionItems: [...selectedOptions],
                            bodyCodes: [...currentSelectedCodes, data.code, radioData.code],
                            other: { ...selectedTextInput }
                        }
                    }
                }
            }
            else {
                bodyObject = {
                    ...pickedBodyPartsOpt,
                    [data.label]: {
                        optionItems: [...selectedOptions],
                        bodyCodes: [...currentSelectedCodes, data.code],
                        other: { ...selectedTextInput }
                    }
                }
            }
            onDynamicModalChange(bodyObject, bodyPartsSelected, tempCodeList, isDeleted)

        }
        else {
            let tempPickedParts = pickedBodyPartsOpt
            let tempIndex = bodyPartsSelected.indexOf(data.label)
            if (tempIndex >= 0) {
                bodyPartsSelected.splice(bodyPartsSelected.indexOf(data.label), 1)
            }
            delete tempPickedParts[data.label]
            if (isEdit && isDeleted.hasOwnProperty(data.label)) {
                setIsDeleted({ ...isDeleted, [data.label]: true })
            }
            tempCodeList.splice(tempCodeList.indexOf(data.code), 1)
            if (radioData && tempCodeList.indexOf(radioData.code) >= 0) {
                tempCodeList.splice(tempCodeList.indexOf(radioData.code), 1)
            }
            onDynamicModalChange(tempPickedParts, bodyPartsSelected, tempCodeList, isDeleted)
        }
        onCloseModal()
    }
    const handleTextChange = (val, inputOption) => {
        if (inputOption.nonIgnorableWords) {
            if (nonIgnorableWords.length === 0) {
                setNonIgnorableWords(inputOption.nonIgnorableWords.split(','))
                // console.log("inside nonIgnorableWords", nonIgnorableWords)
            }
            let inputTexts = val.split(' ')
            let detectedWords = ''
            inputTexts.forEach(words => {
                if (nonIgnorableWords.includes(words)) {
                    detectedWords = detectedWords.length == 0 ? words : detectedWords + ',' + words
                }
            })
            if (detectedWords.length > 0) {
                let alertText = inputOption.nonIgnorableWordsNotes.replace('(insert typed word)', detectedWords)
                setDetectedNonIgnorableWords(detectedWords)
                setAlertText(alertText)
            }
            else {
                if (detectedNonIgnorableWords.length > 0) {
                    setDetectedNonIgnorableWords('')
                    setAlertText('')
                }
            }
        }
        let tempTextInputs = selectedTextInput
        let obj = {
            ...tempTextInputs,
            [inputOption.code]: val
        }
        let tempCodeList = _.cloneDeep(selectedCodes)
        let codeIndex = tempCodeList.indexOf(inputOption.code)
        if (val.length > 0 && codeIndex < 0) {
            tempCodeList.push(inputOption.code)
        } else if (val.length === 0 && codeIndex >= 0) {
            tempCodeList.splice(codeIndex, 1)
        }

        let currentCodeIndex = currentSelectedCodes.indexOf(inputOption.code)
        if (val.length > 0 && currentCodeIndex < 0) {
            currentSelectedCodes.push(inputOption.code)
        } else if (val.length === 0 && currentCodeIndex >= 0) {
            currentSelectedCodes.splice(currentCodeIndex, 1)
        }
        setSelectedTextInput(obj)
        setSelectedCodes(tempCodeList)

        let tIndex = selectedOptions.indexOf(inputOption.name)
        if (!val && tIndex >= 0) {
            selectedOptions.splice(tIndex, 1)
        }
        setSelectedTextInput({ ...selectedTextInput, ...obj })
    }
    return (<DynamicModal
        onCloseModal={onCloseModal}
        isVisible={isVisible}
        onOk={handleOk}
        data={data}
        title={title}
        optionList={optionList}
        handleItemChange={handleItemChange}
        handleTextChange={handleTextChange}
        selectedBodyParts={_.cloneDeep(selectedBodyParts)}
        selectedTextInput={_.cloneDeep(selectedTextInput)}
        selectedCodes={_.cloneDeep(selectedCodes)}
        errorMessage={errorMessage}
        alertText={alertText}
    />)
}
export default DynamicModalMain