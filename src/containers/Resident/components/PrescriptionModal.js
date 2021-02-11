import React, { useEffect, useState } from "react";
import { createForm } from "rc-form";
import { Toast } from '../../../components/common'
import Modal from '../../../components/common/Popup'
import { PrescriptionForm } from '../../../components/Prescription'
import axios from "../../../services/api/services/common";
import { UpsertSetting } from "../../../services/api/routes/customer";

const PrescModal = props => {

    const { visible, onCancel, edit, resident } = props

    const handleSave = async (request) => {
        // const {method,url}=UpsertSetting
        let res = await axios({ ...UpsertSetting, request })
        if (res) {
            if (res && res.code === 'Ok') {
                Toast.success(res.data.message)
                onCancel()
            } else
                Toast.error(res.data.message)
        }
    }

    return <>
        <Modal style={{ width: '800px' }}
            visible={visible} title={`${edit ? 'Update' : 'Add'} Rx Order for ${resident}`}
            onCancel={onCancel}
        >
            <PrescriptionForm
                edit={edit}
            />
        </Modal>
    </>
}

export default PrescModal