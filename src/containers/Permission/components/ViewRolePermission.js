import React, { useEffect, useState } from "react";
import Modal from '../../../components/common/Popup'
import { get } from '../../../services/api/routes/permission'
import PermissionList from './PermissionList'
import axios from '../../../services/api/services/common'
import { Spin } from '../../../components/common'

const _ = require('lodash')
const View = (props) => {
    const { id, onCancel } = props
    const [loader, setLoader] = useState(false)
    const [name, setName] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        fetch()
    }, [id])

    const fetch = async () => {
        setLoader(true)
        const { method, url, baseURL } = get
        let res = await axios({ baseURL, method, url: url + id, params: { populate: true } })
        if (res) {
            if (res.code === 'OK') {
                setName(res.data.name)
                setData(_.cloneDeep(res.data.roleAccessPermissions))
            }
        }
        setLoader(false)
    }

    return <>
        <Modal style={{ width: '800px' }}
            visible={true} title={`Role - ${name}`}
            footer={null}
            onCancel={onCancel}
        >
            {
                loader ?
                    <Spin spinning={loader} str='center'></Spin>
                    : <PermissionList listData={data} isView={true} />
            }
        </Modal>
    </>
}
export default View