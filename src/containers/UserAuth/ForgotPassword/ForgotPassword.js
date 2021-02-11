import React from 'react'
import { Logo } from '../../../assets/images/index'
import {Input,ErrorMsg,Button} from '../../../components/common/index'
import { Link } from 'react-router-dom';
import routes from '../../../routes/constant';
import { forgotPassword } from '../../../services/api/routes/auth'
import PropTypes from 'prop-types'
function ForgotPassword(props) {
    let errors;
    const { getFieldProps, getFieldError, getFieldDecorator, loading } = props.form;
    return (<div className="container">
        {/* <Spin spinning={true} colorCode={'#609fae'} str={'overlay center'}><span>Loading...</span></Spin> */}
        <div className="loginContainer">
            <div className="loginBox">
                <div className="loginLogo">
                    <Logo height="66"/>
                </div>
                <h2>Forgot Your Password ?</h2>
                <span className="forgot-pass-text">Don't worry. Recovering the password is easy. Just tell us the email.</span>
                <div className="form">
                    <form>
                        <div className="compnents">
                            {getFieldDecorator('email', {
                                rules: [{
                                    required: true, type: 'email',
                                    message: 'The input is not valid E-mail!',
                                }],
                            })(
                                <Input placeholder="Email Address" className="inputForm" />
                            )}
                            {(errors = getFieldError('email')) ? <ErrorMsg errors={errors} /> : null}
                        </div>
                        <div className="compnents">
                            <div className="signBtn send-btn">
                                <Button loading={loading}
                                    onClick={(e) => { e.preventDefault(); props.onForgotPassSubmit() }}>SEND</Button>
                                    
                                {/* <Link to={routes.login.path} className="back-login">
                                    <span ><strong>Back to Login</strong></span>
                                </Link> */}
                            </div>
                            <Link to={routes.login.path}>
                                <span><label className="back-to-login">Back to Login</label></span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    </div>)
}
export default ForgotPassword
forgotPassword.propTypes = {
    loading: PropTypes.bool,
    onForgotPassSubmit: PropTypes.func,
}