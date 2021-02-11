import React, { useState, useEffect, useContext } from 'react';
import { Dialog, Input, ErrorMsg, Toast } from './../components/common'
import { createForm } from 'rc-form'
import { authenticatePassword } from '../services/api/routes/auth'
import axios from "../services/api/services/common";

const AuthenticateModal = (props) => {
    const { visible, detail, title, onOk, onCancel, form, request, loading } = props
    const { getFieldDecorator, getFieldError } = form

    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false)
    let errors
    const handleShowPass = () => setShow(show => !show)

    const handleOk = async () => {
        form.validateFields(async (err, values) => {
            if (err) return
            let req = {
                "excludeOTPVerification": true,
                "password": values.password,
                ...request
            }
            setLoader(true)
            try {
                let res = await axios({ ...authenticatePassword, data: req })
                if (res) {
                    if (res.code === 'OK') {
                        Toast.success(res.message)
                        if (onOk)
                            onOk(res.data)
                    }
                }
                setLoader(false)
            } catch{
                setLoader(false)
            }
        })
    }

    return <Dialog
        visible={visible}
        title={title || 'Authetication'}
        maskClosable={false}
        onCancel={onCancel}
        onOk={handleOk}
        okButtonProps={{ loading: loader || loading }} >
        <div className='form_group required col-12'>
            <label>Password<span>*</span></label>
            {getFieldDecorator('password', {
                rules: [{
                    required: true,
                    message: 'Please Enter Your Password',
                    whitespace: true,
                }],
            })(<Input
                ispass={true}
                type={show ? 'text' : 'password'}
                placeholder="Enter Password"
                hideshowpasschange={handleShowPass}
                show={show}
            />
            )}
            {(errors = getFieldError('password')) ? <ErrorMsg errors={errors} /> : null}
        </div>
    </Dialog >

}

export default createForm()(AuthenticateModal)