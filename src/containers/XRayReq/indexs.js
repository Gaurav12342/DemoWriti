import React, { Component, useState, useEffect } from "react";
import axios from '../../services/api/config'
import { connect } from "react-redux";
import { getPatientDetail } from '../../services/api/routes/user'
import { xRayListing, requisitionRequest } from '../../services/api/routes/x_ray'
import { Toast } from '../../components/common/Toast'
import ResidentBasicDetail from './Components/residentBasicDetail'
import DisplayJson from './Components/DisplayDynamicJsonData'
import queryString from "query-string";
import { X_RAY_FORM_TYPE } from '../../constants/xray'
import UtilService, { isKeyExist } from '../../util/common'
import routes from "../../routes/constant";
import { toast } from "react-toastify";
const _ = require('lodash')

const size = 'large'

//static lines to change 80 query=
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onerror = function (err) {
        console.log('err', err)
    }
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function XRayReq(props) {
    const [residentData, setResidentData] = useState({})
    const [imagingDiagnosticInfo, setImagingDiagnosticInfo] = useState({})
    const [doctorId, setDoctorId] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [ultraSoundData, setUltraSoundData] = useState({})
    const [xRayData, setXRayData] = useState({})
    const [activeTab, setActiveTab] = useState(undefined)
    const [active, setActive] = useState({
        [X_RAY_FORM_TYPE.X_RAY]: false,
        [X_RAY_FORM_TYPE.MOBILE_ULTRASOUND]: false
    })
    const [X_Ray_Json, setX_Ray_Json] = useState(undefined)
    const [UltraSoundJson, setUltraSoundJson] = useState(undefined)
    const [formType, setFormType] = useState(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [editData, setEditData] = useState(undefined)
    const [residentAge, setResidentAge] = useState(0)
    const [notesCount, setNotesCount] = useState(0)

    useEffect(() => {
        const { authUser } = props
        if (authUser && authUser.imagingDiagnosticId && authUser.imagingDiagnosticId.imagingDiagnosticJSON) {
            let jsonPaths = authUser.imagingDiagnosticId.imagingDiagnosticJSON
            if (jsonPaths.xray) {
                readTextFile(jsonPaths.xray, function (text) {
                    let xrayJsonData = _.cloneDeep(JSON.parse(text))
                    modifyJsonData(xrayJsonData, 'setXRayData', 'setX_Ray_Json')
                });
            }
            if (jsonPaths.ultrasound) {
                readTextFile(jsonPaths.ultrasound, function (text) {
                    let ultraSoundJsonData = _.cloneDeep(JSON.parse(text))
                    modifyJsonData(ultraSoundJsonData, 'setUltraSoundData', 'setUltraSoundJson')
                });
            }
        }
        loadPage()
    }, [])

    useEffect(() => {
        if (isKeyExist(editData, ['residentId', 'id'])) {
            let residentId = editData.residentId.id
            if (residentId) {
                fetchResidentData(residentId)
            }
        }
    }, [editData])
    const loadPage = () => {
        // const query = queryString.parse(props.location.search)
        const query = {
            doctorId: "5ce3c5ce9e63335be089caa1",
            residentId: "5e4e207593faf942b37f82bc"
        }
        console.log("TCL: XRayReq -> loadPage -> query", query)
        if (query.residentId) {
            fetchResidentData(query.residentId)
        }
        if (query.doctorId) {
            setDoctorId(query.doctorId)
        }

        if (query.isEdit && query.requisitionId) {
            let tempType = undefined
            if (query.formType) {
                tempType = query.formType
            }
            setIsEdit(tempType)
            setFormType(tempType)
            setActiveTab(tempType)
            fetchRequisitionData(query.requisitionId)
        }
        if (!query.isEdit) {
            setActiveTab(X_RAY_FORM_TYPE.X_RAY.toString())
        }
        let { authUser } = props
        if (authUser && authUser.imagingDiagnosticId) {
            setImagingDiagnosticInfo(authUser.imagingDiagnosticId)
        }
    }
    const fetchRequisitionData = (requisitionId) => {
        let { method, url } = xRayListing
        axios({
            method, url, data: {
                id: requisitionId
            }
        }).then(({ data }) => {
            if (data.code === 'OK') {
                if (data.data.list.length && data.data.list[0]) {
                    setEditData(data.data.list[0])

                    if (data.data.list[0].notesCount) {
                        handleNotesCount(data.data.list[0].notesCount)
                    }

                    setDoctorId(data.data.list[0].physicianId.id)
                }
            }
        })
    }

    const handleNotesCount = (count) => {
        setNotesCount(count)
    }
    const handleActive = updatedActive => {
        setActive(updatedActive)
    }

    const handleLoading = (action) => {
        setLoading(action)
    }

    const fetchResidentData = (residentId) => {
        console.log("TCL: fetchResidentData -> residentId", residentId)
        let { method, url } = getPatientDetail
        url = url + "/" + residentId
        console.log("TCL: fetchResidentData -> url", url)
        axios({ method, url }).then(({ data }) => {
            if (data.code === 'OK') {
                let tempData = data.data
                if (tempData.addresses && tempData.addresses[0]) {
                    let address = tempData.addresses[0]
                    let tempStr = `${address.line1 || ' '},${address.line2 || ' '}`
                    tempStr = tempStr + `,${address.city || ' '},${address.province || ' '},${address.pincode || ' '}`
                    tempData.customAddress = tempStr
                }
                else {
                    tempData.customAddress = ' '
                }
                let namesAr = tempData.name.split(',')
                tempData.firstName = namesAr[0] || ' '
                tempData.lastName = namesAr[1] || ' '
                if (tempData.patientInfoId) {
                    tempData.roomNo = tempData.patientInfoId.nhRoom ? tempData.patientInfoId.nhRoom : ' '
                    tempData.customHc = tempData.patientInfoId.hc ? tempData.patientInfoId.hc : ' '
                    tempData.customVc = tempData.patientInfoId.vc ? tempData.patientInfoId.vc : ' '
                }
                let tempAge = UtilService.getAgeByDOB(tempData.dob)
                setResidentData(tempData)
                setResidentAge(tempAge)
            }
        })
    }
    const modifyJsonData = (jsonData, stateVar, jsonVaribaleName) => {
        let tempJsonData = _.cloneDeep(jsonData)
        let jsonGroupBy = {}
        tempJsonData.forEach(obj => {
            obj = isLeftRightBothOption(obj)
            if (jsonGroupBy[obj.bodyPartNo]) {
                jsonGroupBy[obj.bodyPartNo].push({ ...obj })
            }
            else {
                jsonGroupBy[obj.bodyPartNo] = [{ ...obj }]
            }
        })
        if (stateVar === 'setXRayData') {
            setXRayData(jsonGroupBy)
        }

        if (stateVar === "setUltraSoundData") {
            setUltraSoundData(jsonGroupBy)
        }
        if (jsonVaribaleName === "setX_Ray_Json") {
            setX_Ray_Json(_.cloneDeep(tempJsonData))
        }
        if (jsonVaribaleName === "setUltraSoundJson") {
            setUltraSoundJson(_.cloneDeep(tempJsonData))
        }
    }
    const isLeftRightBothOption = (obj) => {
        if (obj.optionItems && obj.optionItems.length > 0) {
            obj.optionItems.some(current => {
                if (current.viewType === 4) {
                    obj.isLRBOption = true
                    return true
                }
            })
        }
        return obj
    }
    const redirectToXrayListing = () => {
        props.history.push({
            pathname: routes.xRayList.path
        })
    }
    const handleTabChange = (tab) => {
        console.log('tab changed', tab)
        setActiveTab(tab)
    }

    const submitRequisitionRequest = (request) => {
        let { method, url } = requisitionRequest
        axios({ method, url, data: request }).then(({ data }) => {
            setLoading(false)
            if (data.code === 'OK') {
                Toast.success(data.message)
                redirectToXrayListing()
            }
        }).catch(err => {
            console.log("TCL: DisplayDynamicJsonData -> handleSubmit -> err ", err)
            setLoading(false)
        })
    }

    console.log('residentData', residentData)
    console.log('imagingDiagnosticInfo', imagingDiagnosticInfo)

    return (
        <div className="chat_wrap">
            <div className="chat-history">
                <p style={{ fontSize: '40px' }}>Hello</p>
            </div>
        </div>
        // <div>    
        //      <div className="gx-app-layout ant-layout ant-layout-has-sider residentScroller">

        //             <ResidentBasicDetail residentData={residentData}
        //                 imagingInfo={imagingDiagnosticInfo} />
        //             <div className="residentRightside">
        //                 <div className="residentTabs x-RayTab">
        //                     <Tabs onChange={ handleTabChange} activeKey={activeTab} >
        //                         <TabPane
        //                             tab="Mobile X-RAY"
        //                             disabled={isEdit && parseInt(formType) !== X_RAY_FORM_TYPE.X_RAY ? true : active[X_RAY_FORM_TYPE.MOBILE_ULTRASOUND] ? true : false}
        //                             key={X_RAY_FORM_TYPE.X_RAY}>
        //                             <DisplayJson
        //                                 authUser={authUser}
        //                                 residentData={residentData}
        //                                 jsonData={xRayData}
        //                                 imagingInfo={imagingDiagnosticInfo}
        //                                 setActive={ handleActive}
        //                                 residentName={residentData && residentData.name?residentData.name:''}
        //                                 residentAge={residentAge}
        //                                 size={size}
        //                                 doctorId={ state.doctorId}
        //                                 jsonType={X_RAY_FORM_TYPE.X_RAY}
        //                                 active={active}
        //                                 activeTab={ state.activeTab}
        //                                 editData={editData}
        //                                 isEdit={isEdit}
        //                                 setNotesCount={handleNotesCount}
        //                                 setLoading={handleLoading}
        //                                 X_Ray_Json={_.cloneDeep( state.X_Ray_Json)}
        //                                 onSubmit={submitRequisitionRequest}
        //                                 UltraSoundJson={_.cloneDeep( state.UltraSoundJson)}
        //                             />
        //                         </TabPane>
        //                         <TabPane
        //                             tab="Mobile UltraSound"
        //                             key={X_RAY_FORM_TYPE.MOBILE_ULTRASOUND}
        //                             disabled={isEdit && parseInt(formType) !== X_RAY_FORM_TYPE.MOBILE_ULTRASOUND ? true : active[X_RAY_FORM_TYPE.X_RAY] ? true : false}
        //                         >
        //                             <DisplayJson
        //                                 authUser={authUser}
        //                                 residentData={residentData}
        //                                 jsonData={ultraSoundData}
        //                                 residentName={residentData && residentData.name?residentData.name:''}
        //                                 residentAge={residentAge}
        //                                 imagingInfo={imagingDiagnosticInfo}
        //                                 setActive={ handleActive}
        //                                 active={active}
        //                                 setLoading={handleLoading}
        //                                 doctorId={ state.doctorId}
        //                                 setNotesCount={handleNotesCount}
        //                                 jsonType={X_RAY_FORM_TYPE.MOBILE_ULTRASOUND}
        //                                 activeTab={ state.activeTab}
        //                                 isEdit={isEdit}
        //                                 editData={editData}
        //                                 onSubmit={submitRequisitionRequest}
        //                                 UltraSoundJson={_.cloneDeep( state.UltraSoundJson)}
        //                                 X_Ray_Json={_.cloneDeep( state.X_Ray_Json)}
        //                             />
        //                         </TabPane>
        //                     </Tabs>
        //                 </div>
        //             </div>
        //         </div> 
        // </div >
    );
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
export default connect(mapStateToProps)(XRayReq);
