
import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Popup/index';
import {
    Input,
    Button,
    ErrorMsg,
} from '../../../components/common/index';

const _ = require('lodash');

const { PCC_LOGS_STATUS_TEXT_TYPE } = require("../../../constants/common");

const FilterForPcc = (props) => {
    let errors;

    const { form, onSave ,radioData, setRadioData} = props
    const {
        getFieldDecorator,
        validateFields,
        getFieldError,
        setFieldsValue,

    } = form;
    const { isVisible, onCancel, onClose } = props
    // const [radioData, setRadioData] = useState("ALL");

    const handleSubmit = () => {
        validateFields((error, value) => {
            if (!error) {
                const obj = {
                    url:value.url,
                    type:radioData
                }
                onSave(obj);
            } else {
                console.log(error);
            }
        });
    };

    const hadleRadioValue = (e) => {
        if (e.target.checked) {
            setRadioData(e.target.value);
        }
    };
    return (
        <>
            <Modal
                visible={isVisible}
                onCancel={onClose}
                onClose={onClose}
                // style={{ width: '50%' }}
                // title={title}
                maskClosable={true}
                onOk={handleSubmit}
            // okText={okText}
            // cancelText={cancelText}
            // okButtonProps={{ loading: loading }}
            >
                <div className='form_row' style={{ marginTop: '2%' }}>
                    <div
                        className='form_group col-12 '
                        style={{ marginBottom: '3%' }}
                    >
                        <label>
                            Url<span>*</span>
                        </label>
                        {getFieldDecorator('url', {
                            
                        })(<Input name='url' />)}
                        {(errors = getFieldError('url')) ? (
                            <ErrorMsg errors={errors} />
                        ) : null}
                    </div>

                    <div className='form_group col-12 required'>
                        <label>
                            Type<span>*</span>
                        </label>
                    </div>
                    <div
                        className=' col-12'
                        style={{ marginBottom: '3%', display: 'flex' }}
                    >
                        {Object.keys(PCC_LOGS_STATUS_TEXT_TYPE).map((data, index) => {
                            return (
                                <>
                                    <label className='filter_check radio'>
                                        <input
                                            type='checkbox'
                                            name='type'
                                            value={PCC_LOGS_STATUS_TEXT_TYPE[data]}
                                            checked={radioData === PCC_LOGS_STATUS_TEXT_TYPE[data]}
                                            onChange={hadleRadioValue}
                                        />
                                        <span className='checkbox radio'></span>
                                        <span className='lbl'>{data.replace(/_/g, ' ')}</span>
                                    </label>
                                </>
                            );
                        })}
                    </div>

                </div>
            </Modal>
        </>
    );
}
export default (FilterForPcc); 