import React from 'react'
import { Check } from '../../../../assets/images/todo/index'
import Modal from "../../../../components/common/Popup/index"
function DynamicModal(props) {
    const { onCloseModal, isVisible, optionList, handleTextChange, handleItemChange,
        selectedCodes, selectedTextInput, title, onOk, errorMessage, alertText } = props
    return (<Modal
        visible={isVisible}
        // title="Finger(s) X-Ray - O'Laughlin, Craig (Room No 2056)"
        title={title}
        maskClosable={false}
        onCancel={onCloseModal}
        onClose={onCloseModal}
        footer={true}
        className="lock_popup xray_selection_popup toes_popup"
        closable={false}
        onOk={onOk}
        btnClass="d-flex-end f-end footer-block">
        <form >
            <div className="xray_type">
                <div className="form_wrap">
                    {
                        optionList && optionList.length > 0 ?
                            optionList.map((option, i) => {
                                return option.viewType !== 5 ?
                                    option.viewType === 1 ?
                                        <div className="components">
                                            <label for={option.name + '' + i} className="lg_check" key={option.name} >
                                                <input type="checkbox" id="pne" required="required"
                                                    checked={selectedCodes.includes(option.code)}
                                                    onClick={() => handleItemChange(option)}
                                                />
                                                <span
                                                    onClick={() => handleItemChange(option)}
                                                >{option.name} {option.isMandatory ? <span className="mandatory-filled">*</span> : null}
                                                    <Check />
                                                </span>
                                            </label>
                                        </div> :
                                        option.viewType === 3 ?
                                            <div className="components textarea">
                                                <textarea
                                                    placeholder={`${option.name}${option.isMandatory ? '*' : ''}` || 'Other'}
                                                    value={selectedTextInput[option.code]}
                                                    onChange={(e) => handleTextChange(e.target.value, option)}
                                                ></textarea>
                                            </div> : option.viewType === 2 ?
                                                <input placeholder={`${option.name}${option.isMandatory ? '*' : ''}` || 'Other'}
                                                    onChange={(e) => handleTextChange(e.target.value, option)}
                                                    value={selectedTextInput[option.code]}
                                                ></input> : null
                                    : null
                            }) : null
                    }
                </div>
            </div>
            {/* <div className="bottom-part">
                    <div className="d-flex">
                        <label>
                            <span>Selected&nbsp;-&nbsp;</span>Osteoarthritis (All)
                        </label>
                    </div>
                </div>*/}
            <div className="alert-mes" style={{ textAlign: "center", color: 'red', wordWrap: 'break-word' }}>
                <div>
                    {
                        alertText
                    }
                </div>
                <div>
                    {
                        errorMessage
                    }
                </div>
            </div>
        </form>
    </Modal>);
}
export default DynamicModal




