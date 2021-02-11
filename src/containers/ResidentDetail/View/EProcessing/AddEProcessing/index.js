import React, { useEffect, useState } from 'react';
import { createForm } from 'rc-form';
import { Spin, ErrorMsg, Select, Option, Button, TextArea, Toast, Confirm } from '../../../../../components/common'
import { ORDER_TYPE, RX_TYPE, STATUS, TYPE } from '../../../../../constants/prescription'
import { isDrOrNp } from '../../../../../util/common'
import { setTimeToZero } from '../../../../../util/moment'
import { upsertEProcessing } from '../../../../../services/api/routes/prescription';
import axios, { getSubMasters } from '../../../../../services/api/services/common';
import Upsert from './UpsertForm'
import _ from 'lodash'
import uuid from 'uuid'
import moment from 'moment'

const AddEprocessing = props => {
    const { form, residentDetail, authUser, onOk, onCancel, edit } = props
    const [okLoader, setOkLoader] = useState(false)
    const [subMasterLoader, setSubMasterLoader] = useState(false)
    const [documentTypes, setDocumentTypes] = useState([])

    useEffect(() => {
        setSubMasterLoader(true)
        getSubMasters('THIRD_PARTY_PRESCRIPTION_TYPE').then(res => {
            setSubMasterLoader(false)
            setDocumentTypes(res)
        }).catch(err => {
            setSubMasterLoader(false)
        })
    }, [])

    const handleSave = (params) => {
        setOkLoader(true)
        let request = {
            "attachments": params.attachments,
            "deviceId": uuid(),
            "isCancel": false,
            "isMedicalDirectiveAuthorized": params.isMedicalDirectiveAuthorized,
            "isVerbalOrder": isDrOrNp(authUser) ? false : true,
            "homeAreaId": residentDetail.homeAreaId?._id,
            "medStrip": false,
            "orderGeneratedAt": moment(params.orderGeneratedAt).toISOString(),
            "physicianId": isDrOrNp(authUser) ? authUser._id : params.physicianId,
            "residentId": residentDetail._id,
            "rxType": RX_TYPE.THIRD_PARTY,
            "status": STATUS.SUBMITTED,
            "thirdPartyPrescriptionType": params.thirdPartyPrescriptionType,
            "type": TYPE.THIRD_PARTY
        }
        if (edit) {
            request = {
                ...request,
                "status": STATUS.EDITED,
                "_id": edit._id,
                "uniqueId": edit.uniqueId
            }
        }
        axios({ ...upsertEProcessing, data: request }).then((data) => {
            if (data.code === 'OK') {
                Toast.success(data.message)
                onOk()
            }
            setOkLoader(false)
        }).catch(err => setOkLoader(false))
    }

    const handleCancel = () => {
        onCancel()
    }

    return <>
        <div className="on_going_call_wrap add_eprocessing">
            <Upsert {...props}
                okLoader={okLoader}
                subMasterLoader={subMasterLoader}
                documentTypes={documentTypes}
                onOk={handleSave}
                onCancel={handleCancel}
            />
        </div>
    </>
}
export default createForm()(AddEprocessing)