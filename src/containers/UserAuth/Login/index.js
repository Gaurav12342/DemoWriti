import React, { useState, useEffect } from 'react'
import { createForm } from 'rc-form';
import { connect } from 'react-redux'
import axios from '../../../services/api/config'
import { login } from '../../../services/api/routes/auth'
import LoginUI from './login'
import { prepareUserData } from '../../../services/api/services/Auth'
import { encryptData } from '../../../util/Crypto'
import { setUserData, setToken, setDefaultPassword } from '../../../appRedux/actions/Auth'
import { getUserDetail, initDB } from '../../../util/DBService'
import routes from '../../../routes/constant'
import { getUserBaseRedirect, clearLocalStorage, displayCatchErrorMsg } from '../../../util/common';
import { SET_USER_TOKEN, SET_USER_DATA, SET_USER_DEFAULT_PASSWORD } from '../../../appRedux/ActionTypes';
import { Toast } from '../../../components/common/index'

const loginAttempStr = 'noOfLoginAttemps'
const diableTime = 10
function Login(props) {
    const [isDisableLogin, setIsDisable] = useState(false)
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        initDB()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.form.validateFields((error, value) => {
            if (error) {
                return
            }
            handleSignIn(value)
        });
    }

    const handleDefaultPassword = (user, data) => {
        let payloadData = {
            userId: user._id,
            defaultPassword: user.defaultPassword,
            token: "JWT " + data.data.token.jwt
        }
        try {
            props.setDefaultPassword(SET_USER_DEFAULT_PASSWORD, payloadData, function () {
                console.log('here')
                props.history.push({
                    pathname: routes.updateDefaultPassword.path
                })
            })
        } catch (err) {
            console.log("TCL: handleDefaultPassword -> err", err)
        }

    }

    const setRedirectPage = (user) => {

        if (user.excludeOTPVerification) {
            props.history.push({
                pathname: getUserBaseRedirect(user)
            })
        }
        else {
            props.history.push({
                pathname: routes.verifyOtp.path
            })
        }
    }

    const handleForgotPassword = (e) => {
        e.preventDefault()
        props.history.push({
            pathname: routes.forgotPassword.path
        })
    }
    const startTimer = () => {
        let timeLeft = diableTime;
        let timerid = setInterval(countdown, 1000);
        function countdown() {
            if (timeLeft == 0) {
                clearTimeout(timerid);
                setIsDisable(false)
                sessionStorage.setItem(loginAttempStr, '')
                setCount(0)
            } else {
                setCount(timeLeft)
                timeLeft--;
            }
        }
    };
    const canLogin = () => {
        let noOfLoginAttemps = parseInt(sessionStorage.getItem(loginAttempStr))
        if (noOfLoginAttemps) {
            if (noOfLoginAttemps < 2) {
                noOfLoginAttemps += 1
            }
            else {
                startTimer()
            }
        }
        else {
            noOfLoginAttemps = 1
        }
        sessionStorage.setItem(loginAttempStr, noOfLoginAttemps)
    }
    async function handleSignIn(value) {
        let userDetail = await getUserDetail({ email: value.email })
        let tempData = {
            username: value.email,
            password: value.password,
            excludeOTPVerification: userDetail.excludeOTPVerification
        }
        clearLocalStorage()
        setIsDisable(true)

        axios({ ...login, data: tempData }).then(({ data }) => {
            if (data.code == 'OK') {

                const user = prepareUserData(data.data.user)

                localStorage.setItem('token', JSON.stringify(data.data.token.jwt))
                localStorage.setItem('refreshToken', JSON.stringify(data.data.refreshToken.jwt))

                axios.defaults.headers.common["Authorization"] = "JWT " + data.data.token.jwt;

                props.setToken(data.data.token.jwt)
                localStorage.setItem('otpVerified', JSON.stringify(false))
                localStorage.setItem('excludeOTPVerification', JSON.stringify(user.excludeOTPVerification))
                if (user.defaultPassword) {
                    handleDefaultPassword(user, data)
                }
                else {
                    localStorage.setItem('user', encryptData(user))

                    if (user && user.homeId && user.homeId.homeIdentifier) {
                        localStorage.setItem('tenantId', user.homeId.homeIdentifier)
                        localStorage.setItem('homeId', user.homeId._id)

                        axios.defaults.headers.common['homeId'] = user.homeId._id
                    }
                }

                if (!user.defaultPassword) {
                    props.setUserData(SET_USER_DATA, user, function () {
                        setRedirectPage(user)
                    })
                }
            }
            props.form.resetFields()
            setIsDisable(false)
        }).catch(err => {
            if (err && err.response && err.response.status) {
                if (err.response.status === 403) {
                    canLogin()
                }
            }
            displayCatchErrorMsg(err)
            setIsDisable(false)
        })
    }

    const passwordVisible = () => {
        setShow(show => !show)
    }
    return (<LoginUI form={props.form} onSubmit={handleSubmit}
        onForgetPassword={handleForgotPassword}
        show={show}
        passwordVisible={passwordVisible}
        count={count}
        isDisableLogin={isDisableLogin} />)
}
const mapStateToProps = ({ auth, resident }) => {
    console.log("mapStateToProps -> resident", resident)
    const { authUser } = auth
    return {
        authUser
    }
}

export default connect(mapStateToProps, { setDefaultPassword, setToken, setUserData })(createForm()(Login));