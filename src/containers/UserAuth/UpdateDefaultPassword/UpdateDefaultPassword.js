import React from 'react'
import { Input, ErrorMsg, Button } from '../../../components/common/index'
import routes from '../../../routes/constant'
import { Logo } from '../../../assets/images/index'
import { Link } from 'react-router-dom'

function UpdateDefaultPassword(props) {

    const { form, onReset, btnLoading, onBackLogin, hideshowpasschange, showPassword } = props
    const { getFieldError, getFieldDecorator } = form
    let errors

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        if (value && value === form.getFieldValue('currentPassword')) {
            callback('Old password and new password could not be same');
            return;
        }
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    return <div className="pmr_wrap defaultPasswordWrap">
        <div className="container defaultPassword">
            <div className="page_head">
                <Logo height="70" />
            </div>
            <div className="page_head">
                <h3>Reset Password</h3>
            </div>
            <div className="page_head2 align-center">
                <label>To access our panel you will have to reset a new password.</label>
            </div>
            <div className="pmr_list_wrap">
                <div className="patient_order_wrap" style={{ border: "none" }}>
                    <div className="form_wrap flex-wrap">
                        <div className='form_row add-user'>
                            <div className='form_group required col-10'>
                                <label>Current Password<span>*</span></label>
                                {getFieldDecorator('currentPassword', {
                                    rules: [{
                                        required: true, message: 'Please input your old password!',
                                    }, {
                                        min: 8,
                                        message: 'Password must be minimum of 8 digit.',
                                    },
                                    ],
                                })(
                                    <Input
                                        ispass={true}
                                        type={showPassword["currentPass"] ? "text" : "password"}
                                        placeholder="Current Password"
                                        hideshowpasschange={() => hideshowpasschange('currentPass')}
                                        show={showPassword["currentPass"]}
                                    />
                                )}
                                {(errors = getFieldError('currentPassword')) ? <ErrorMsg errors={errors} /> : null}
                            </div>
                        </div>
                        <div className='form_row add-user'>
                            <div className='form_group required col-10'>
                                <label>New Password<span>*</span></label>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }, {
                                        min: 8,
                                        message: 'New Password must be minimum of 8 digit.',
                                    }, {
                                        validator: validateToNextPassword,
                                    }],
                                })(
                                    <Input
                                        ispass={true}
                                        type={showPassword["password"] ? "text" : "password"}
                                        placeholder="New Password"
                                        hideshowpasschange={() => hideshowpasschange('password')}
                                        show={showPassword["password"]}
                                    />
                                )}
                                {(errors = getFieldError('password')) ? <ErrorMsg errors={errors} /> : null}
                            </div>
                        </div>
                        <div className='form_row add-user'>
                            <div className='form_group required col-10'>
                                <label>Confirm Password<span>*</span></label>
                                {getFieldDecorator('newPassword', {
                                    rules: [{
                                        required: true, message: 'Please confirm your password!',
                                    }, {
                                        validator: compareToFirstPassword,
                                    }],
                                })(<Input
                                    ispass={true}
                                    type={showPassword["newPass"] ? "text" : "password"}
                                    placeholder="Retype New Password"
                                    hideshowpasschange={() => hideshowpasschange('newPass')}
                                    show={showPassword["newPass"]}
                                />
                                )}
                                {(errors = getFieldError('newPassword')) ? <ErrorMsg errors={errors} /> : null}
                            </div>
                        </div>
                    </div>

                    <div className="compnents">
                        <div className="signBtn send-btn2">
                            <Button size="lg" loading={btnLoading} onClick={onReset}>Reset</Button>
                            <Link to={routes.login.path} onClick={onBackLogin}>
                                <span><a className="back-to-login">Back to Login</a></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div >
}
export default UpdateDefaultPassword