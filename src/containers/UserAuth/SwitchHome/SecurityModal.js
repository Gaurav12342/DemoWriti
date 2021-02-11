import React from 'react'
import Modal from '../../../components/common/Popup/index'
import { Close } from '../../../assets/images/popup'
import ErrorMsg from '../../../components/common/ErrorMsg'
import { Input } from '../../../components/common'
function SecurityModal(props) {
    const { visible, title, onCancel, onClose,showPass,onHideShowPassChange,
        onOk, forPassword, form, count, excludeOTPVerification, okBtnLoading, onResentLink } = props
    let errors;
    const { getFieldError, getFieldDecorator } = form;
    return (<Modal
        visible={visible}
        title={title}
        maskClosable={false}
        closeIcon={<Close />}
        onCancel={onCancel}
        onClose={onClose}
        onOk={onOk}
        okButtonProps={{ loading: okBtnLoading }} >
        <form onSubmit={onOk} onSubmit={(e)=>e.preventDefault()}>
            <div className="form_wrap flex-wrap">
                <div className='form_row add-user'>
                    {
                        forPassword &&
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
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Enter Password"
                                    hideshowpasschange={onHideShowPassChange}
                                    show={showPass}
                                />
                            )}
                            {(errors = getFieldError('password')) ? <ErrorMsg errors={errors} /> : null}
                        </div>
                    }
                    {
                        !forPassword && !excludeOTPVerification &&
                        <div className='form_group required col-12'>
                            <label>OTP<span>*</span></label>
                            {getFieldDecorator('otp', {
                                rules: [
                                    {
                                        len: 6,
                                        message: "OTP should have 6 digits"
                                    },
                                    {
                                        required: true,
                                        message: "Please enter a valid OTP code",
                                        whitespace: true,
                                    }
                                ]
                            })(<Input placeholder="Enter OTP" />
                            )}
                            {(errors = getFieldError('otp')) ? <ErrorMsg errors={errors} /> : null}
                        </div>
                    }
                    {
                        !forPassword && !excludeOTPVerification &&
                        <>
                            <div className="compnents ">
                                <span><p>This code will expire in {<span id="timer" style={{ fontSize: "16px" }}>
                                    00:
                        {count < 10
                                        ? "0" + count
                                        : count}
                                </span>} minutes</p></span>
                            </div>
                            <div className="compnents resend-otp">
                                <p>Didn't receive your OTP? <span><a
                                    className={count > 0 ? 'disable-link' : 'resend-link'}
                                    onClick={onResentLink}>Resend OTP</a> </span></p>
                            </div>
                        </>
                    }



                </div>
            </div>
        </form>
    </Modal>)
}
export default SecurityModal