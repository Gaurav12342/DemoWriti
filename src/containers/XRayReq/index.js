import React, { Component } from "react";
import { Tabs } from "antd";
import axios from "util/Api";
import "../Resident/Resident.css";
import { connect } from "react-redux";
import "../Resident/todo-dashboard.css";
import { getPatientDetail, xRayListing } from '../../services/ApiRoutes'
import ResidentBasicDetail from './Components/residentBasicDetail'
import DisplayJson from './Components/DisplayDynamicJsonData'
import queryString from "query-string";
import { X_RAY_FORM_TYPE } from './../../constants/Common'
import UtilService, { displayCatchErrorMsg } from '../../services/util'
import './style.css'
const _ = require('lodash')

const { TabPane } = Tabs;

const size = 'large'
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

class XRayReq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            residentData: {},
            residentName: '',
            residentAge: 0,
            imagingDiagnosticInfo: {},
            imagingDiagnosticId: '',
            doctorId: undefined,
            loading: true,
            ultraSoundData: {},
            xRayData: {},
            activeTab: undefined,
            active: {
                [X_RAY_FORM_TYPE.X_RAY]: false,
                [X_RAY_FORM_TYPE.MOBILE_ULTRASOUND]: false
            }
        };
    }
    componentWillUnmount() {
        document.body.classList.remove("resident-detail");
    }
    componentDidMount() {
        const { authUser } = this.props
        if (authUser && authUser.imagingDiagnosticId && authUser.imagingDiagnosticId.imagingDiagnosticJSON) {
            let jsonPaths = authUser.imagingDiagnosticId.imagingDiagnosticJSON
            let self = this
            if (jsonPaths.xray) {
                readTextFile(jsonPaths.xray, function (text) {
                    let xrayJsonData = _.cloneDeep(JSON.parse(text))
                    self.modifyJsonData(xrayJsonData, 'xRayData', 'X_Ray_Json')
                });
            }
            if (jsonPaths.ultrasound) {
                readTextFile(jsonPaths.ultrasound, function (text) {
                    let ultraSoundJsonData = _.cloneDeep(JSON.parse(text))
                    self.modifyJsonData(ultraSoundJsonData, 'ultraSoundData', 'UltraSoundJson')
                });
            }
        }
        document.body.classList.add("resident-detail");
        this.loadPage()
    }
    loadPage = () => {
        // this.modifyJsonData(X_Ray_Json, 'xRayData')
        // this.modifyJsonData(UltraSoundJson, 'ultraSoundData')
        const query = queryString.parse(this.props.location.search)
        console.log("TCL: XRayReq -> loadPage -> query", query)
        if (query.residentId) {
            this.fetchResidentData(query.residentId)
        }
        if (query.doctorId) {
            this.setState({
                doctorId: query.doctorId
            })
        }

        if (query.isEdit && query.requisitionId) {
            let tempType = undefined
            if (query.formType) {
                tempType = query.formType
            }
            this.setState({
                isEdit: true,
                formType: tempType,
                activeTab: tempType
            })
            this.fetchRequisitionData(query.requisitionId)
        }
        if (!query.isEdit) {
            this.setState({
                activeTab: X_RAY_FORM_TYPE.X_RAY.toString()
            }, () => console.log('active', this.state.activeTab))
        }
        let { authUser } = this.props
        if (authUser && authUser.imagingDiagnosticId) {
            this.setState({
                imagingDiagnosticInfo: authUser.imagingDiagnosticId
            })
        }
    }
    fetchRequisitionData = (requisitionId) => {
        let { method, url } = xRayListing
        axios({
            method, url, data: {
                id: requisitionId
            }
        }).then(({ data }) => {
            if (data.code === 'OK') {
                if (data.data.list.length && data.data.list[0]) {
                    this.setState({
                        editData: data.data.list[0],
                        doctorId: data.data.list[0].physicianId.id
                    }, () => {
                        let residentId = this.state.editData.residentId.id
                        this.fetchResidentData(residentId)
                    })
                }
            }
            else {
                displayCatchErrorMsg(data.message)
            }
        }).catch(err => {
            displayCatchErrorMsg(err)
        })
    }

    handleActive = updatedActive => {
        this.setState({
            active: updatedActive
        })
    }
    fetchResidentData = (residentId) => {
        let { method, url } = getPatientDetail
        url = url + "/" + residentId
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
                this.setState({
                    residentData: tempData,
                    residentName: tempData.name,
                    residentAge: tempAge
                })
            }
            else {
                displayCatchErrorMsg(data.message)
            }
        }).catch(err => {
            displayCatchErrorMsg(err)
        })
    }
    modifyJsonData = (jsonData, stateVar, jsonVaribaleName) => {
        let tempJsonData = _.cloneDeep(jsonData)
        let jsonGroupBy = {}
        tempJsonData.forEach(obj => {
            obj = this.isLeftRightBothOption(obj)
            if (jsonGroupBy[obj.bodyPartNo]) {
                jsonGroupBy[obj.bodyPartNo].push({ ...obj })
            }
            else {
                jsonGroupBy[obj.bodyPartNo] = [{ ...obj }]
            }
        })
        this.setState({
            [stateVar]: jsonGroupBy,
            [jsonVaribaleName]: _.cloneDeep(tempJsonData)
        }, () => console.log('updated ', stateVar, jsonGroupBy))
    }
    isLeftRightBothOption = (obj) => {
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
    redirectToXrayListing = () => {
        this.props.history.push({
            pathname: '/wa/x-ray-req-list'
        })
    }
    handleTabChange = (tab) => {
        console.log('tab changed', tab)
        this.setState({
            activeTab: tab
        })
    }
    render() {
        const { size, xRayData, ultraSoundData, imagingDiagnosticInfo, residentData, editData, formType, activeTab, residentName, residentAge, isEdit, active } = this.state;
        const { authUser } = this.props
        return (
            <div>
                <div className="gx-app-layout ant-layout ant-layout-has-sider residentScroller">

                    <ResidentBasicDetail residentData={residentData}
                        imagingInfo={imagingDiagnosticInfo} />
                    <div className="residentRightside">
                        <div className="residentTabs x-RayTab">
                            <Tabs onChange={this.handleTabChange} activeKey={activeTab} >
                                <TabPane
                                    tab="Mobile X-RAY"
                                    disabled={isEdit && parseInt(formType) !== X_RAY_FORM_TYPE.X_RAY ? true : active[X_RAY_FORM_TYPE.MOBILE_ULTRASOUND] ? true : false}
                                    key={X_RAY_FORM_TYPE.X_RAY}>
                                    <DisplayJson
                                        authUser={authUser}
                                        residentData={residentData}
                                        jsonData={xRayData}
                                        imagingInfo={imagingDiagnosticInfo}
                                        setActive={this.handleActive}
                                        residentName={residentName}
                                        residentAge={residentAge}
                                        size={size}
                                        doctorId={this.state.doctorId}
                                        jsonType={X_RAY_FORM_TYPE.X_RAY}
                                        activeTab={this.state.activeTab}
                                        editData={editData}
                                        isEdit={isEdit}
                                        redirectToListing={this.redirectToXrayListing}
                                        X_Ray_Json={_.cloneDeep(this.state.X_Ray_Json)}
                                        UltraSoundJson={_.cloneDeep(this.state.UltraSoundJson)}
                                    />
                                </TabPane>
                                <TabPane
                                    tab="Mobile UltraSound"
                                    key={X_RAY_FORM_TYPE.MOBILE_ULTRASOUND}
                                    disabled={isEdit && parseInt(formType) !== X_RAY_FORM_TYPE.MOBILE_ULTRASOUND ? true : active[X_RAY_FORM_TYPE.X_RAY] ? true : false}
                                >
                                    <DisplayJson
                                        authUser={authUser}
                                        residentData={residentData}
                                        jsonData={ultraSoundData}
                                        residentName={residentName}
                                        residentAge={residentAge}
                                        imagingInfo={imagingDiagnosticInfo}
                                        setActive={this.handleActive}
                                        doctorId={this.state.doctorId}
                                        jsonType={X_RAY_FORM_TYPE.MOBILE_ULTRASOUND}
                                        activeTab={this.state.activeTab}
                                        isEdit={isEdit}
                                        editData={editData}
                                        UltraSoundJson={_.cloneDeep(this.state.UltraSoundJson)}
                                        X_Ray_Json={_.cloneDeep(this.state.X_Ray_Json)}
                                        redirectToListing={this.redirectToXrayListing}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
export default connect(mapStateToProps)(XRayReq);
