import React from 'react'
import ResetPassword from './ResetPassword'
import { createForm } from 'rc-form'
function ResetPasswordMain(props) {
    const { onCancel, onSubmit, form, onResetSetPassword, visible } = props

    const handleSubmit = () => {
        form.validateFields((error, value) => {
            if (error) {
                return error
            }
            if (value.newPassword === value.confirm){
                onResetSetPassword(value.newPassword)
            }
        })
    }
    return <ResetPassword
        visible={visible}
        form={form}
        onCancel={onCancel}
        onOk={handleSubmit}
    />
}
export default createForm("ResetPassword")(ResetPasswordMain)