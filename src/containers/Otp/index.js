import React, { Component } from 'react'
import { Logo, PlayStore, AppStore } from '../../../src/assets/images/index';

// import { ReactComponent as Logo } from '../../images/logo.svg';
// import { ReactComponent as PlayStore } from '../../images/PlayStore.svg';
// import { ReactComponent as AppStore } from '../../images/AppStore.svg';

import { createForm, formShape } from 'rc-form';
import Spin from '../common/Spin'
class OTP extends Component {
    static propTypes = {
        form: formShape,
    };
    submit = () => {
        this.props.form.validateFields((error, value) => {
            // console.log(error, value);
        });
    }
    render() {
        console.log(12)
        let errors;
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
        return (<>
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
                            ******1515<br />****tor1@writi.ca
                        </p>
                        <p>
                            This code will expire in 60 seconds
                        </p>
                        <div className="form">
                            <form action="\resident-detail">
                                <div className="compnents">
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            required: true, type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        }],
                                    })(
                                        <input type="text" placeholder="Enter 6-digit Code" className="inputForm centerInput"
                                        />
                                    )}
                                    {(errors = getFieldError('email')) ? errors.join(',') : null}
                                </div>
                                <div className="forgotPasswordLink text-center flexed">
                                    <a className="">
                                        <input type="checkbox" id="no2" name="no2" value="no" />
                                        Don't ask me again for next 4 hours <span className="b-b">on this device</span>
                                    </a>
                                </div>
                                {(errors = getFieldError('required')) ? errors.join(',') : null}
                                <div className="signBtn">

                                    <button className="btn" onClick={this.submit}>
                                        {/* <Spin spinning={true} colorCode={"#ffffff"} str={"left"}></Spin> */}
                                        LOGIN</button>
                                </div>
                            </form>
                            <div className="timer-block">
                                <div className="time-count">00:00</div>
                                <p>Didn't receive your OTP? <span>Resend OTP</span></p>
                                <span>Back to Login</span>
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
        </>)
    }
}
export default createForm()(OTP);