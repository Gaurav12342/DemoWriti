import React from 'react'
import Modal from '../../../components/common/Popup/index'
import { USER_TYPE } from '../../../constants/User'
import { Button } from '../../../components/common'
function DetailView(props) {
    const { visible, onCancel, data, onUnassignUser } = props
    console.log('props',props);
    return <Modal
        visible={visible}
        onCancel={onCancel}
        title={`Detail for ${data.mergeLFName}`}
        onClose={onCancel}
        maskClosable={false}
        onOk={onCancel}
        style={{ width: "50%" }}
        footer={false}
    // className="user-detail-view"
    >{
            <div>
                <ul className="user-detail-view">
                    <li > <b><label>Name : </label></b>{data.mergeLFName}</li>
                    <li> <b><label>UserName : </label></b>{data.username}</li>
                    <li> <b><label>SeriesNo: </label></b>{data.seriesNo}</li>
                    <li> <b><label>Email : </label></b>{data.emails && data.emails.length ? data.emails[0].email : ' '}</li>
                    <li> <b><label>Mobile : </label></b>{data.mobiles && data.mobiles.length ? data.mobiles[0].mobile : ' '}</li>
                    <li> <b><label>Active : </label></b>{data.isActive?'Active': "De-Active"}</li>
                    <li> <b><label>Type : </label></b>{
                        Object.keys(USER_TYPE).map(k => {
                            return Object.keys(USER_TYPE[k]).map(sk => {
                                return USER_TYPE[k][sk] === data.type ? sk : null
                            })
                        })
                    }</li>
                    {
                        [USER_TYPE.HOME.NURSE, USER_TYPE.HOME.PHYSICIAN].indexOf(data.type) >= 0 ?
                            <>
                                <li> <b><label>Licence No : </label></b>{data.licenceNo || '- '}</li>
                                <li> <b><label>Ohip No : </label></b>{data.ohipNo || ' -'}</li>
                            </> : null
                    }
                    {
                        [USER_TYPE.HOME.NURSE, USER_TYPE.HOME.PHYSICIAN, USER_TYPE.HOME.TECH,
                        USER_TYPE.HOME.OTHER, USER_TYPE.HOME.ADMIN].indexOf(data.type) >= 0 ?
                            <li> <b><label>Home : </label></b>{data.homeId ? data.homeId.name : ' - '}</li> : null
                    }
                    {
                        USER_TYPE.HOME.ADMIN === data.type ?
                            <>
                                <li> <b><label>Pharmacy : </label></b>{data.pharmacyId ? data.pharmacyId.name : ' - '}</li>
                                <li> <b><label>Organization : </label></b>{data.orgId ? data.orgId.name : ' - '}</li>
                            </> : null
                    }
                    {
                        [USER_TYPE.HOME.NURSE, USER_TYPE.HOME.PHYSICIAN, USER_TYPE.HOME.TECH,
                        USER_TYPE.HOME.OTHER, USER_TYPE.HOME.ADMIN].indexOf(data.type) >= 0 ?
                            <li><b>Un Assign User from  </b>
                                {data.homeId && data.homeId.name ? data.homeId.name : null}
                                <label className="view-btn"> <Button onClick={() => onUnassignUser(data)}>Un Assign</Button></label>
                            </li> : null
                    }
                </ul>
            </div>
        }</Modal>
}
export default DetailView