import React, { useState, useEffect } from 'react'
import ResetPassword from './ResetPassword'
import { createForm } from 'rc-form';
import { resetPassword } from '../../../services/api/routes/auth'
import { clearLocalStorage } from '../../../util/common'
import queryString from 'query-string'
import axios from '../../../services/api/config'
import routes from '../../../routes/constant';
function ResetPasswordMain(props) {
    const [resetId, setResetId] = useState()
    const [resetLoading, setResetLoading] = useState(false)
    const { form } = props
    useEffect(() => {
        if (props.location && props.location.pathname) {
            let resetId = props.location.pathname.substr(props.location.pathname.lastIndexOf('/') + 1)
            setResetId(resetId)
        }
    }, [])
    const handleReset = () => {
        form.validateFields((error, value) => {
            if (error) {
                return
            }
            if (value.newPassword === value.password) {
                setResetLoading(true)
                axios({
                    ...resetPassword, data: {
                        newPassword: value.newPassword,
                        token: resetId
                    }
                }).then(({ data }) => {
                    setResetLoading(false)
                    if (data.code === 'OK') {
                        clearLocalStorage()
                        props.history.push({
                            pathname: routes.login.path
                        });
                    }
                }).catch(err => {
                    setResetLoading(false)
                })
            }
        })
    }
    const handleUserLogout = () => {
        clearLocalStorage()
    }

    return (<ResetPassword
        onReset={handleReset}
        loading={resetLoading}
        onUserLogout={handleUserLogout}
        form={form}
    />)
}

export default createForm('ResetPasswordMain')(ResetPasswordMain) 