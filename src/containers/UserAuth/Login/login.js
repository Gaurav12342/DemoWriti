import React from 'react'
import { Logo, PlayStore, AppStore, Pvisible, Punvisible } from '../../../assets/images/index'
import { Button, ErrorMsg } from '../../../components/common/index'
import PropTypes from 'prop-types'
import { DEVICE_LINK } from '../../../constants/User'

function Login(props) {
    const { onSubmit, isDisableLogin, onForgetPassword, show, passwordVisible, count } = props
    let errors
    const { getFieldProps, getFieldError, getFieldDecorator } = props.form;
    return (
        <div className="container">

            {/* <Spin spinning={true} colorCode={'#609fae'} str={'overlay center'}><span>Loading...</span></Spin> */}
            <div className="loginContainer smallH">
                <div className="loginBox">
                    <div className="loginLogo">
                        <Logo />
                    </div>
                    <h1>Welcome Back!</h1>
                    <div className="form">
                        <form>
                            <div className="compnents">
                                {getFieldDecorator('email', {
                                    rules: [{
                                        required: true,
                                        message: 'Please provide the text',
                                    }],
                                })(
                                    <input placeholder="Email Address" className="inputForm" />
                                )}
                                {(errors = getFieldError('email')) ? <ErrorMsg errors={errors} /> : null}
                            </div>

                            <div className="compnents">
                                <input type={(show) ? 'text' : 'password'} placeholder="Password" className="inputForm"
                                    {...getFieldProps('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please provide valid password '
                                            }
                                        ]
                                    })
                                    } />
                                {(errors = getFieldError('password')) ? <ErrorMsg errors={errors} /> : null}
                                {
                                    show ?
                                        (
                                            <Punvisible onClick={passwordVisible} />
                                        )
                                        :
                                        (
                                            <Pvisible onClick={passwordVisible} />
                                        )
                                }
                            </div>
                            <div className="forgotPasswordLink">
                                <a onClick={onForgetPassword}>Forgot your password?</a>
                            </div>

                            <div className="signBtn">
                                <Button
                                    onClick={onSubmit}
                                    loading={isDisableLogin}
                                    disabled={count && count > 0 ? true : false}
                                >SIGN IN</Button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

            <div className="loginFooter">
                <div className="topFooter">
                    <ul>
                        <li onClick={() => { window.open(DEVICE_LINK.PRIVACY_POLICY, '_blank') }}>
                            <a>Privacy Policy</a>
                        </li>
                        <li>
                            •
                            </li>
                        <li onClick={() => { window.open(DEVICE_LINK.TERMS_CONDITION, '_blank') }}>
                            <a>Terms of Use</a>
                        </li>
                    </ul>
                </div>
                <div className="bottomFooter">
                    <div className="playAppLogo">
                        <ul>
                            <li onClick={() => { window.open(DEVICE_LINK.ANDROID, '_blank') }}>
                                <a >
                                    <PlayStore />
                                </a>
                            </li>
                            <li onClick={() => { window.open(DEVICE_LINK.IOS, '_blank') }}>
                                <a>
                                    <AppStore />
                                </a>
                            </li>
                            <li className="versionName">
                                V2.0, 8th Feb 2021
                                </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                count && count > 0 ? <div className="custom-error-msg">
                    Maximum Login Attemps Exceeds Please Login after {count}
                </div> : null
            }

        </div>
    )
}
export default Login
Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isDisableLogin: PropTypes.bool.isRequired,
    onForgetPassword: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}