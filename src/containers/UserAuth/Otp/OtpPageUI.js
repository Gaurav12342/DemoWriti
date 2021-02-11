import React from 'react'
import { ReactComponent as Logo } from '../../../assets/images/logo.svg'
import { ReactComponent as PlayStore } from '../../../assets/images/PlayStore.svg';
import { ReactComponent as AppStore } from '../../../assets/images/AppStore.svg';
import { ErrorMsg, Button } from '../../../components/common'
import { Link } from 'react-router-dom';
import routes from '../../../routes/constant';
import PropTypes from 'prop-types'

function OtpPageUI(props) {
    let errors;
    const { onOtpSubmit, timer, disbaleLink, onResentLink, disbaleBtn, contactNo, email, onUserLogout } = props

    const { getFieldError, getFieldDecorator } = props.form;
    return (
        <div className="container">
            <div className="loginContainer">
                <div className="loginBox">
                    <div className="loginLogo">
                        <Logo />
                    </div>
                    <h1>
                        Multi Factor Authentication
                        </h1>
                    <p>
                        Your one time 6-digit OTP was sent to your registered mobile number via text message<br />as well to your registered email address.
                        </p>
                    <p>
                        <span>{contactNo}</span>
                        <span>{email}</span>
                    </p>
                    <p>
                        This code will expire in few seconds
                        </p>
                    <div className="form">
                        <form action="\resident-detail">
                            <div className="compnents">
                                {
                                    getFieldDecorator(`otp`, {
                                        rules: [
                                            {
                                                len: 6,
                                                message: "OTP should have 6 digits"
                                            },
                                            {
                                                required: true,
                                                message: "Please enter a valid OTP code"
                                            }
                                        ]
                                    })(<input type="text" placeholder="Enter 6-digit Code" className="inputForm centerInput" />)}
                                {(errors = getFieldError('otp')) ? <ErrorMsg errors={errors} /> : null}
                            </div>
                            <div className="forgotPasswordLink dontask text-center flexed">
                                {
                                    getFieldDecorator('extendCheck')(
                                        <div className="checkbx-lb">
                                            <input type="checkbox" id="no2" name="no2" value="no" />
                                            <span style={{cursor:"default"}}> Don't ask me again for next 4 hours on this device</span>
                                        </div>)
                                }
                            </div>
                            {(errors = getFieldError('extendCheck')) ? errors.join(',') : null}
                            <div className="signBtn">
                                <Button
                                    loading={disbaleBtn}
                                    onClick={onOtpSubmit} disabled={disbaleBtn} >LOGIN</Button>
                            </div>
                        </form>
                        <div className="timer-block" style={{ fontSize: '20px' }}>
                            <div className="time-count">{timer ? timer >= 10 ? `00:${timer}` : `00:0${timer}` : ''} </div>
                            <p>Didn't receive your OTP? <span><a
                                className={disbaleLink ? 'disable-link' : 'resend-link'}
                                onClick={onResentLink}>Resend OTP</a> </span></p>
                            <Link to={routes.login.path} onClick={onUserLogout}>
                                <span><label className="back-to-login">Back to Login</label></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="loginFooter">
                <div className="topFooter">
                    <ul>
                        <li>
                            <a href="">Privacy Policy</a>
                        </li>
                        <li>
                            •
                            </li>
                        <li>
                            <a href="">Terms of Use</a>
                        </li>
                    </ul>
                </div>
                <div className="bottomFooter">
                    <div className="playAppLogo">
                        <ul>
                            <li>
                                <a>
                                    <PlayStore />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <AppStore />
                                </a>
                            </li>
                            <li className="versionName">
                                V2.0, 25th May 2020
                                </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OtpPageUI
OtpPageUI.propTypes = {
    onOtpSubmit: PropTypes.func.isRequired,
    timer: PropTypes.number.isRequired,
    disbaleLink: PropTypes.bool.isRequired,
    onResentLink: PropTypes.func.isRequired,
    disbaleBtn: PropTypes.bool.isRequired
}