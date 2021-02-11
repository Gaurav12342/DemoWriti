import React, { useEffect } from "react";
import { createForm } from "rc-form";
import Modal from '../../../../components/common/Popup'
import { Toast } from '../../../../components/common'
import Setting from './SettingForm'
import axios from "../../../../services/api/services/common";
import { UpsertSetting, pharmacyUpdate } from "../../../../services/api/routes/customer";
import { USER_TYPE } from "../../../../constants/User";
import { CLIENTELE_TYPE } from "../../../../constants/Customer";

const SettingModal = props => {

    const { form, detail, visible, onCancel, queryData, authUser } = props

    useEffect(() => {
        if (visible && detail && detail.assignedSubscriptionGroupId && form) {
            if (!form.getFieldValue('assignedSubscriptionGroupId'))
                form.setFieldsValue({ assignedSubscriptionGroupId: detail.assignedSubscriptionGroupId })
        }
    }, [detail, visible, form])

    const handleSave = async () => {
        form.validateFields(async (err, values) => {
            if (err)
                return
            let req = {
                ...values,
            }, url, res
            if (queryData === CLIENTELE_TYPE.PHARMACY) {
                url = pharmacyUpdate.url + '/' + detail._id
                res = await axios({ ...pharmacyUpdate, url, data: req })
            } else {
                url = UpsertSetting.url + detail._id
                res = await axios({ ...UpsertSetting, url, data: req })
            }
            if (res) {
                if (res && res.code === 'OK') {
                    Toast.success(res.message)
                    onCancel(res.data)
                } else
                    Toast.error(res.message)
            }
        })
    }

    return <>
        <Modal style={{ width: '600px' }}
            visible={visible}
            title={`Update ${queryData === CLIENTELE_TYPE.PHARMACY ? 'Pharmacy' : 'Home'} Setting`}
            footer={null}
            onCancel={onCancel}
        >
            <Setting form={form} queryData={queryData} col='col-12'
                isModal={true}
                onSave={handleSave}
                onCancel={onCancel} />
        </Modal>
    </>
}

export default createForm()(SettingModal)