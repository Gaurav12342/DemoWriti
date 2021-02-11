import React, { useEffect, useState } from 'react'
import { createForm } from 'rc-form';
import { connect } from 'react-redux'
import OtpPageUI from './OtpPageUI'
import axios from '../../../services/api/config'
import { verifyOtp, resendOtpLink } from '../../../services/api/routes/auth'
import { userSignOut, setOtpVerified } from '../../../appRedux/actions/Auth'
import { addUserData } from '../../../util/DBService'
import UtilService, { isDrOrNp, getUserBaseRedirect } from '../../../util/common'
import { SET_OTP_VERIFIED, SIGNOUT_USER_SUCCESS } from '../../../appRedux/ActionTypes';
import { Toast } from '../../../components/common/Toast'

function OTP(props) {
    const [email, setEmail] = useState(undefined)
    const [contactNo, setContactNo] = useState(undefined)
    const [disbaleLink, setDisbaleLink] = useState(true)
    const [disbaleBtn, setDisbaleBtn] = useState(false)
    const [count, setCount] = useState(0)

    const { authUser } = props

    useEffect(() => {

        startTimer()
        setUserEmail(authUser)
        setUserConatctNo(authUser)

    }, [])

    function startTimer() {
        var timeLeft = 60;
        var timerid = setInterval(countdown, 1000);
        console.log("🚀 ~ file: index.js ~ line 33 ~ startTimer ~ timerid", timerid)
        function countdown() {
            if (timeLeft == 0) {
                clearTimeout(timerid);
                setDisbaleLink(false)
                setCount(0)
            } else {
                setCount(timeLeft)
                timeLeft--;
            }
        }
    };

    const setUserConatctNo = (authUser) => {
        if (authUser && authUser.mobiles && authUser.mobiles.length > 0 && authUser.mobiles[0].mobile) {
            let contactno = authUser.mobiles[0].mobile;
            //Hide email partially
            let PartiallyHidedContactNo =
                "*".repeat(contactno.length - 4) +
                contactno.substr(contactno.length - 4);
            setContactNo(PartiallyHidedContactNo)
        }
    }

    const setUserEmail = (authUser) => {
        if (authUser && authUser.emails && authUser.emails.length > 0 && authUser.emails[0].email) {
            let email = authUser.emails[0].email;
            //Hide email partially
            let len = Math.floor(email.substr(0, email.indexOf("@")).length / 2)
            let PartiallyHidedEmail = "*".repeat(len) + email.substr(len + 1);
            setEmail(PartiallyHidedEmail)
        }
    }
    const handleResendLink = () => {
        setDisbaleLink(true)
        let { method, url, baseURL } = resendOtpLink
        axios({ method, url, baseURL }).then(({ data }) => {
            startTimer()
        }).catch(err => startTimer())
    }
    const handleOtpSubmit = (e) => {
        e.preventDefault()
        props.form.validateFields((error, value) => {
            console.log(error, value);
            if (error) {
                return
            }
            setDisbaleBtn(true)

            axios({ ...verifyOtp, data: { ...value, extendCheck: false } }).then(({ data }) => {
                setDisbaleBtn(false)
                // startTimer()
                if (data.code === 'OK') {
                    props.setOtpVerified(SET_OTP_VERIFIED, true)
                    localStorage.setItem('otpVerified', JSON.stringify(true))
                    console.log("TCL: handleOtpSubmit -> value", value)
                    if (value.extendCheck) {
                        addUserData({ email: UtilService.getPrimaryValue(authUser.emails, "email") })
                    }
                    props.history.push({
                        pathname: getUserBaseRedirect(props.authUser)
                    })
                    props.form.resetFields()
                }
                else {
                    // props.userSignOut(SIGNOUT_USER_SUCCESS, () => {
                    //     props.history.push({
                    //         pathname: routes.login.path
                    //     })
                    // })
                    Toast.error(data.message)
                }
            }).catch(err => {
                // startTimer()
                setDisbaleBtn(false)
            })
        });
    }
    const handleUserLogout = () => {
        props.userSignOut(SIGNOUT_USER_SUCCESS);
    }
    return (
        <>
            <OtpPageUI form={props.form} timer={count}
                email={email}
                contactNo={contactNo}
                onOtpSubmit={handleOtpSubmit}
                disbaleLink={disbaleLink}
                onResentLink={handleResendLink}
                disbaleBtn={disbaleBtn}
                onUserLogout={handleUserLogout}
            />


        </>
    )
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth
    return {
        authUser
    }
}
export default connect(mapStateToProps, { userSignOut, setOtpVerified })(createForm()(OTP));