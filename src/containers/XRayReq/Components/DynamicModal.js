import React, { Component } from 'react';
import { Modal, Checkbox, Form, Input, message } from 'antd'
import './.././style.css'
const _ = require('lodash')
const FormItem = Form.Item
class DynamicModal extends Component {
    state = {
        optionList: [],
        title: '',
        alertText: '',
        detectedNonIgnorableWords: '',
        selectedCodes: [],
        textFields: {},
        errorMessage: '',
        selectedTextInput: {}
    }
    selectedOptions = []
    isDeleted = {}
    checkedWords = 0
    nonIgnorableWords = []
    currentSelectedCodes = []
    componentWillMount() {
        let { data, radioData, bodyPartsCodeList, pickedBodyPartsOpt, isDeleted } = this.props
        this.isDeleted = isDeleted
        let tempData = _.cloneDeep(data), tempOptionList = []
        let title = ''
        if (tempData.isClickable) {
            tempOptionList = tempData.optionItems
        }
        else {
            tempOptionList = radioData.optionItems
            tempOptionList = tempOptionList.map(opt => { return { ...opt, parent: radioData.code } })
        }
        let { residentName, residentAge } = this.props
        title = tempData.optionItems.length &&
            tempData.optionItems[0].viewType === 5 ? tempData.optionItems[0].name : ''
        title = title.split('<NAME>').join(residentName).split('<AGE>').join(residentAge)
        this.setState({
            title,
            optionList: tempOptionList
        })
        this.setState({
            selectedCodes: bodyPartsCodeList
        })
        if (pickedBodyPartsOpt.hasOwnProperty(data.label)) {
            if (radioData) {
                if (pickedBodyPartsOpt[data.label][radioData.label]) {
                    this.selectedOptions = pickedBodyPartsOpt[data.label][radioData.label].optionItems
                    this.currentSelectedCodes = pickedBodyPartsOpt[data.label][radioData.label].bodyCodes
                    this.setOtherOption(pickedBodyPartsOpt[data.label][radioData.label], "other")
                }
            }
            else {
                this.selectedOptions = pickedBodyPartsOpt[data.label].optionItems
                this.currentSelectedCodes = pickedBodyPartsOpt[data.label].bodyCodes
                this.setOtherOption(pickedBodyPartsOpt[data.label], "other")
            }
        }
    }
    setOtherOption = (obj, key) => {
        if (obj.hasOwnProperty(key)) {
            this.setState({
                selectedTextInput: obj[key]
            })
        }
    }
    handleItemChange = e => {
        this.setOptions(e.name)
        this.setCode(e.code)
    }
    setOptions = (val) => {
        let tempOptions = _.cloneDeep(this.selectedOptions)
        if (tempOptions.indexOf(val) >= 0) {
            tempOptions.splice(tempOptions.indexOf(val), 1)
        }
        else {
            tempOptions.push(val)
        }
        this.selectedOptions = tempOptions
    }
    setCode = (code, parentCode) => {
        let tempCodeList = _.cloneDeep(this.state.selectedCodes)
        let cIndex = tempCodeList.indexOf(code)
        if (cIndex >= 0) {
            tempCodeList.splice(cIndex, 1)
        }
        else {
            tempCodeList.push(code)
        }
        let index = this.currentSelectedCodes.indexOf(code)
        if (index >= 0) {
            this.currentSelectedCodes.splice(index, 1)
        }
        else {
            this.currentSelectedCodes.push(code)
        }
        this.setState({
            selectedCodes: tempCodeList
        })
        // this.selectedCodes = tempCodeList
    }
    removeBodyCode = (codeList, label, tempCodeList) => {
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
    getTextInputName = (data, k) => {
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
    handleOk = (event) => {
        if (this.state.alertText.length > 0) {
            message.warn('please remove non ignorable words')
            return
        }
        let { data, selectedBodyParts, radioData, pickedBodyPartsOpt } = this.props
        let tempCodeList = [...this.state.selectedCodes]
        let erMes = ''
        this.state.optionList.forEach(opt => {
            if (opt.isMandatory && tempCodeList.indexOf(opt.code) < 0) {
                erMes = ", " + opt.name + " "
            }
        })
        if (erMes.length > 0) {
            erMes = "Please Fill Out these Fields" + erMes
            this.setState({
                errorMessage: erMes
            })
            return
        }
        Object.keys(this.state.selectedTextInput).forEach(k => {
            if (this.state.selectedTextInput[k].length > 0) {
                let result = radioData ? this.getTextInputName(radioData, k) : this.getTextInputName(data, k)
                if (result && this.selectedOptions.indexOf(result.name) < 0) {
                    this.selectedOptions.push(result.name)
                }
            }
        })
        let bodyPartsSelected = _.cloneDeep(selectedBodyParts)
        if (this.selectedOptions.length == 0) {
            this.currentSelectedCodes.length = 0
        }
        if (this.currentSelectedCodes.length && this.selectedOptions.length) {
            if (tempCodeList.indexOf(data.code) < 0) {
                tempCodeList.push(data.code)
            }
            this.state.optionList.some(opt => {
                if (radioData && tempCodeList.indexOf(opt.code) >= 0) {
                    if (tempCodeList.indexOf(opt.parent) < 0) {
                        tempCodeList.push(opt.parent)
                    }
                    return true
                }
            })
            if (!bodyPartsSelected.includes(data.label)) {
                if (this.props.isEdit && this.isDeleted.hasOwnProperty(data.label) && this.isDeleted[data.label]) {
                    this.isDeleted[data.label] = false
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
                            tempCodeList = this.removeBodyCode(_.cloneDeep(pickedBodyPartsOpt), data.label, _.cloneDeep(tempCodeList))
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
                            optionItems: [...this.selectedOptions],
                            bodyCodes: [...this.currentSelectedCodes, data.code, radioData.code],
                            other: { ...this.state.selectedTextInput }
                        }
                    }
                }
            }
            else {
                bodyObject = {
                    ...pickedBodyPartsOpt,
                    [data.label]: {
                        optionItems: [...this.selectedOptions],
                        bodyCodes: [...this.currentSelectedCodes, data.code],
                        other: { ...this.state.selectedTextInput }
                    }
                }
            }
            this.props.onDynamicModalChange(bodyObject, bodyPartsSelected, tempCodeList, this.isDeleted)
        }
        else {
            let tempPickedParts = pickedBodyPartsOpt
            let tempIndex = bodyPartsSelected.indexOf(data.label)
            if (tempIndex >= 0) {
                bodyPartsSelected.splice(bodyPartsSelected.indexOf(data.label), 1)
            }
            delete tempPickedParts[data.label]
            if (this.props.isEdit && this.isDeleted.hasOwnProperty(data.label)) {
                this.isDeleted[data.label] = true
            }
            tempCodeList.splice(tempCodeList.indexOf(data.code), 1)
            if (radioData && tempCodeList.indexOf(radioData.code) >= 0) {
                tempCodeList.splice(tempCodeList.indexOf(radioData.code), 1)
            }
            this.props.onDynamicModalChange(tempPickedParts, bodyPartsSelected, tempCodeList, this.isDeleted)
        }
        this.props.onCancel()
    }
    handleTextChange = (val, inputOption) => {
        if (inputOption.nonIgnorableWords) {
            if (this.nonIgnorableWords.length === 0) {
                this.nonIgnorableWords = inputOption.nonIgnorableWords.split(',')
                // console.log("inside this.nonIgnorableWords", this.nonIgnorableWords)
            }
            let inputTexts = val.split(' ')
            let detectedWords = ''
            inputTexts.forEach(words => {
                if (this.nonIgnorableWords.includes(words)) {
                    detectedWords = detectedWords.length == 0 ? words : detectedWords + ',' + words
                }
            })
            if (detectedWords.length > 0) {
                let alertText = inputOption.nonIgnorableWordsNotes.replace('(insert typed word)', detectedWords)
                this.setState({
                    detectedNonIgnorableWords: detectedWords,
                    alertText
                })
            }
            else {
                if (this.state.detectedNonIgnorableWords.length > 0) {
                    this.setState({
                        detectedNonIgnorableWords: '',
                        alertText: ''
                    })
                }
            }
        }
        let tempTextInputs = this.state.selectedTextInput
        let obj = {
            ...tempTextInputs,
            [inputOption.code]: val
        }
        let tempCodeList = _.cloneDeep(this.state.selectedCodes)
        let codeIndex = tempCodeList.indexOf(inputOption.code)
        if (val.length > 0 && codeIndex < 0) {
            tempCodeList.push(inputOption.code)
        } else if (val.length === 0 && codeIndex >= 0) {
            tempCodeList.splice(codeIndex, 1)
        }

        let currentCodeIndex = this.currentSelectedCodes.indexOf(inputOption.code)
        if (val.length > 0 && currentCodeIndex < 0) {
            this.currentSelectedCodes.push(inputOption.code)
        } else if (val.length === 0 && currentCodeIndex >= 0) {
            this.currentSelectedCodes.splice(currentCodeIndex, 1)
        }
        this.setState({
            selectedTextInput: obj,
            selectedCodes: tempCodeList
        })

        let tIndex = this.selectedOptions.indexOf(inputOption.name)
        if (!val && tIndex >= 0) {
            this.selectedOptions.splice(tIndex, 1)
        }
        // this.selectedTextInput = {
        //     ...this.selectedTextInput,
        //     ...obj
        // }
    }
//     render() {
//         const { isVisible, onCancel, onOk, data, selectedBodyParts } = this.props
//         const { title, optionList, alertText, errorMessage } = this.state
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Modal
//                 title={title}
//                 visible={isVisible}
//                 onOk={this.handleOk}
//                 onCancel={onCancel}
//                 okButtonProps={{ htmlType: "submit", htmlFor: 'submit' }}
//             >
//                 <Form style={{ marginLeft: '15px', marginRight: '15px' }} onSubmit={this.handleOk}>
//                     <div className="popupCheckBox">
//                         <div className="popupCheckBoxWrapper">
//                             <FormItem style={{ display: 'block' }}>
//                                 {getFieldDecorator('bodyPart', {
//                                     rules: [],
//                                 })(
//                                     <>
//                                         {
//                                             optionList.map(option => {
//                                                 return option.viewType !== 5 ?
//                                                     option.viewType === 1 ?
//                                                         <label htmlFor="CheckBox1" key={option.name} className="popupCheckBoxItem">
//                                                             <input type="checkbox"
//                                                                 value={option.name}
//                                                                 checked={this.state.selectedCodes.includes(option.code)}
//                                                                 onClick={() => this.handleItemChange(option)}
//                                                             />
//                                                             <span className="checkMark"></span>
//                                                             <div className="checkBoxTitle" onClick={() => this.handleItemChange(option)} style={{ lineHeight: 1.4 }}>
//                                                                 <span>{option.name}</span>
//                                                                 {option.isMandatory ? <span style={{ color: 'red' }}>*</span> : null}

//                                                             </div>
//                                                         </label> : option.viewType === 3 ?
//                                                             <Input.TextArea
//                                                                 className='TextAreaBox'
//                                                                 placeholder={`${option.name}${option.isMandatory ? '*' : ''}` || 'Other'}
//                                                                 value={this.state.selectedTextInput[option.code]}
//                                                                 onChange={(e) => this.handleTextChange(e.target.value, option)} required></Input.TextArea>
//                                                             : option.viewType === 2 ?
//                                                                 <Input placeholder={`${option.name}${option.isMandatory ? '*' : ''}` || 'Other'}
//                                                                     onChange={(e) => this.handleTextChange(e.target.value, option)}
//                                                                     value={this.state.selectedTextInput[option.code]}
//                                                                 ></Input> : null : null
//                                             })
//                                         }</>
//                                 )
//                                 }
//                             </FormItem>
//                         </div>
//                         <div style={{ textAlign: "center", color: 'red', wordWrap: 'break-word' }}>
//                             <div>
//                                 {
//                                     alertText
//                                 }
//                             </div>
//                             <div>
//                                 {
//                                     errorMessage
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </Form>
//             </Modal>
//         );
//     }
// }
// const wrappedDynamicModal = Form.create()(DynamicModal)
// export default wrappedDynamicModal