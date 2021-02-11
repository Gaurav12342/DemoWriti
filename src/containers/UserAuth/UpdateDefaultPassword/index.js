import React, { useState } from 'react'
import { createForm } from 'rc-form'
import UpdateDefaultPassword from './UpdateDefaultPassword'
import { updateDefaultPassword } from '../../../services/api/routes/auth'
import { clearLocalStorage, userLogout } from '../../../util/common'
import { setDefaultPassword } from '../../../appRedux/actions/Auth'
import axios from '../../../services/api/config'
import { SET_USER_DEFAULT_PASSWORD } from '../../../appRedux/ActionTypes'
import { connect } from 'react-redux'
import routes from '../../../routes/constant'

const initialShowPassState={
    currentPass:false,
    password:false,
    newPass:false
}

function DefaultPassword(props) {
    const [disbaleBtn, setDisbaleBtn] = useState(false)
    const [showPassword, setShowPassword] = useState(initialShowPassState)
    const { form } = props

    const handleReset = () => {
        form.validateFields((error, value) => {
            if (error) {
                return
            }
            if ((value.currentPassword !== value.password) && (value.newPassword === value.password)) {
                setDisbaleBtn(true)
                axios({ ...updateDefaultPassword, data: { ...value } }).then(({ data }) => {
                // console.log("TCL: handleReset -> data", data)
                // debugger
                if (data.code === 'OK') {
                    console.log('logout here')
                    userLogout()
                    props.history.push({
                        pathName: routes.login.path,
                    });
                }
                setDisbaleBtn(false)
            }).catch(err => setDisbaleBtn(false))
            }
        })
    }
    const handleBackLogin = () => {
        clearLocalStorage()
        props.setDefaultPassword(SET_USER_DEFAULT_PASSWORD, null, function () {
            props.history.push({
                pathname: routes.login.path
            })
        })
    }
    const handleHideShowPassChange=(label)=>{
        setShowPassword({
            ...showPassword,
            [label]:!showPassword[label]            
        })
        
    }
    
    return <UpdateDefaultPassword
        form={form}
        btnLoading={disbaleBtn}
        onReset={handleReset}
        showPassword={showPassword}
        onBackLogin={handleBackLogin}
        hideshowpasschange={handleHideShowPassChange}
    />
}
export default connect(null, { setDefaultPassword })(createForm('DefaultPassword')(DefaultPassword)) 