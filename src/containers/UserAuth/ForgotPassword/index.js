import React, { useState } from 'react'
import ForgotPassword from './ForgotPassword'
import { createForm } from 'rc-form';
import { forgotPassword } from '../../../services/api/routes/auth'
import axios from '../../../services/api/config'
import { Toast } from '../../../components/common/Toast';
import routes from '../../../routes/constant';
function ForgotPasswordMain(props) {
    const [btnload, setBtnLoading] = useState(false)
    const handleForgotPass = () => {
        const { validateFields } = props.form
        validateFields((error, values) => {
            if (error) {
                return
            }
            setBtnLoading(true)
            let data = { username: values.email }
            axios({ ...forgotPassword, data }).then(({ data }) => {
                console.log("TCL: handleForgotPass -> data", data)
                setBtnLoading(false)
                if (data.code === 'OK') {
                    props.history.push({
                        pathname: routes.login.path
                    })
                    Toast.success(data.message)
                    props.form.resetFields();
                }
            }).catch(err => setBtnLoading(false))
        })
    }
    return (<ForgotPassword
        loading={btnload}
        // onForgotPassSubmit={(e) => { e.preventDefault(); console.log('btnClicked') }}
        onForgotPassSubmit={handleForgotPass}
        form={props.form}
    />)
}

export default createForm('forgotPassword')(ForgotPasswordMain) 