import React, { useEffect, useState } from "react";
import { createForm } from "rc-form";
import Modal from '../../../../components/common/Popup'
import { Toast } from '../../../../components/common'
import { USER_TYPE } from '../../../../constants/User'
import Setting from './SettingForm'
import axios from "../../../../services/api/services/common";
import { editUser } from "../../../../services/api/routes/user";

const SettingModal = props => {
    const [loader, setLoader] = useState(false)
    const { form, detail, visible, homeId, authUser, onCancel } = props
    console.log("🚀 ~ file: SettingModal.js ~ line 13 ~ detail", detail)
    const pharmacyId = authUser.type === USER_TYPE.PHARMACY.ADMIN ? authUser.pharmacyId._id : undefined

    useEffect(() => {
        if (visible && detail && detail.homeId && detail.homeId.subscriptionRoleGroup && form) {
            if (!form.getFieldValue('subscriptionRoleGroup'))
                form.setFieldsValue({
                    subscriptionRoleGroup: detail.homeId.subscriptionRoleGroup._id
                })
        }
    }, [detail, visible, form])

    const handleSave = async () => {
        form.validateFields(async (err, values) => {
            if (err)
                return
            setLoader(true)
            let req = {
                ...values,
                homeId: homeId || undefined,
                pharmacyId: pharmacyId,
            }
            let { url } = editUser
            url = url + detail._id;
            let res = await axios({ ...editUser, url, data: req })
            if (res) {
                if (res && res.code === 'OK') {
                    Toast.success(res.message)
                    onCancel(res.data)
                } else
                    Toast.error(res.message)
            }
            setLoader(false)
        })
    }

    return <>
        <Modal
            visible={visible} title={`Assign Role Permission  For ${detail.mergeLFName}`}
            onOk={handleSave}
            onCancel={onCancel}
            okText='Save'
            okButtonProps={{ loading: loader }}
        >
            <div className="form_row">
                <Setting form={form} col='col-12' authUser={authUser} />
            </div>
        </Modal>
    </>
}

export default createForm()(SettingModal)