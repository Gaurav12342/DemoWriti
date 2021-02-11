import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Popup/index';
import {
    ErrorMsg,
    Select,
    Option,
} from '../../components/common/index'
import { createForm } from 'rc-form';

const MasterUpsortForm = (props) => {
    const {
        visible,
        onCancel,
        reasonList,
        record,
        form,
        loading,
        onDocumentDelete
    } = props;
    let errors;

    const {
        getFieldError,
        getFieldDecorator,
        setFieldsValue,
        validateFields,
    } = form;
    let residentName = record.residentId && record.residentId.lastName ? `${record.residentId.lastName} , ${record.residentId.firstName || ''}` : ''

    const handleSubmit = () => {
        form.validateFields((error, value) => {
            if (error) {
                return
            }
            onDocumentDelete(value)
        })
    }
    return (
        <>
            <Modal
                visible={visible}
                title={`Delete Document - ${residentName}`}
                onCancel={() => onCancel(false)}
                onClose={() => onCancel(false)}
                maskClosable={false}
                onOk={handleSubmit}
                style={{ width: '40%' }}
                okButtonProps={{ loading: loading }}
            >
                <div className='form_row'>
                    <div className='col-12'>
                        <div className='form_group col-12 required'>
                            <label>
                                Reason<span>*</span>
                            </label>
                            {getFieldDecorator('deleteReason', {
                                rules: [{
                                    required: true,
                                    message: "Please select delete document reason"
                                }]
                            })(<Select
                                placeholder="Select Record Type"
                                showSearch
                                allowClear
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {reasonList &&
                                    reasonList.map((data) => {
                                        return (
                                            <Option key={data._id} value={data._id}>
                                                {data.name}
                                            </Option>
                                        );
                                    })}
                            </Select>)}
                            {(errors = getFieldError('deleteReason')) ? (
                                <ErrorMsg errors={errors} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default createForm()(MasterUpsortForm);
