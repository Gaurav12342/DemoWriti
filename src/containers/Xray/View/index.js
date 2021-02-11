import React, { Component, useState, useEffect } from "react";
import XRayDetail from './mobile-xray.js';
import MobileXRaySidebar from './sidebar.js';
import axios from '../../../services/api/config'
import { createForm } from 'rc-form'
import { connect } from "react-redux";
import { getPatientDetail } from '../../../services/api/routes/user'
import { xRayListing, requisitionRequest } from '../../../services/api/routes/x_ray'
import { Toast } from '../../../components/common/Toast'
import queryString from "query-string";
import { X_RAY_FORM_TYPE } from '../../../constants/xray'
import X_Ray_Json from '../JSON FIle/xRay.json'
import UltraSoundJson from '../JSON FIle/Ultrasound'
import UtilService, { isKeyExist } from '../../../util/common'
import { getAgeByDOB } from '../../../util/moment'
import routes from "../../../routes/constant";

const _ = require('lodash')

function readTextFile(file, callback) {

  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  rawFile.onerror = function (err) {
    console.log('err', err);
    callback(null);
  }
  rawFile.onreadystatechange = function () {
    console.log('rawFile => ', rawFile)
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
    callback(null);
  }
  rawFile.send(null);
}
function MobileXRay(props) {

  const { authUser } = props
  const [residentData, setResidentData] = useState({})
  const [imagingDiagnosticInfo, setImagingDiagnosticInfo] = useState({})
  const [doctorId, setDoctorId] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [jsonData, setJsonData] = useState({})
  const [activeTab, setActiveTab] = useState(undefined)
  const [imagingJson, setImagingJson] = useState(undefined)
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState(undefined)
  const [residentAge, setResidentAge] = useState(0)
  const [notesCount, setNotesCount] = useState(0)


  useEffect(() => {
    loadPage()
  }, [])

  useEffect(() => {
    console.log('editData => ', editData)
    if (!!editData && !!editData.residentId) {
      let residentId = editData.residentId
      if (residentId) {
        fetchResidentData(residentId)
      }
    }
  }, [editData])

  useEffect(() => {
    if (loading) {
      setLoading(false)
    }
  }, [loading])

  const loadPage = () => {

    setLoading(true)
    const query = queryString.parse(props.location.search)
    const queryType = query.type || query.formType
    if (queryType) {
      let tempType = parseInt(queryType)
      fetchImagingData(tempType)
    }

    if (query.residentId) {
      fetchResidentData(query.residentId)
    }
    if (query.doctorId) {
      setDoctorId(query.doctorId)
    }

    if (query.isEdit && query.requisitionId) {
      let tempType = undefined
      if (queryType) {
        tempType = parseInt(queryType)
        fetchImagingData(tempType)
      }
      setIsEdit(true)

      fetchRequisitionData(query.requisitionId)
    }
    // if (!query.isEdit) {
    //   setActiveTab(X_RAY_FORM_TYPE.X_RAY.toString())
    // }
    setActiveTab(queryType)
    if (authUser && authUser.homeId.imagingAndDiagnosticId) {
      setImagingDiagnosticInfo(authUser.homeId.imagingAndDiagnosticId)
    }
  }
  const fetchImagingData = (type) => {
    if (authUser &&
      authUser.homeId.imagingAndDiagnosticId &&
      authUser.homeId.imagingAndDiagnosticId.imagingDiagnosticJSON) {
      let jsonPaths = authUser.homeId.imagingAndDiagnosticId.imagingDiagnosticJSON;

      if (type === X_RAY_FORM_TYPE.X_RAY) {
        if (jsonPaths.xray) {
          readTextFile(jsonPaths.xray, function (text) {
            if (text) {
              let xrayJsonData = _.cloneDeep(JSON.parse(text))
              modifyJsonData(xrayJsonData)
            } else {
              modifyJsonData(X_Ray_Json)
            }
          });
        }
      }
      if (type === X_RAY_FORM_TYPE.MOBILE_ULTRASOUND) {
        if (jsonPaths.ultrasound) {
          readTextFile(jsonPaths.ultrasound, function (text) {
            if (text) {
              let ultraSoundJsonData = _.cloneDeep(JSON.parse(text))
              modifyJsonData(ultraSoundJsonData)
            } else {
              modifyJsonData(UltraSoundJson)
            }
          });
        }
      }
    }
  }
  const fetchRequisitionData = (requisitionId) => {
    axios({
      ...xRayListing, data: {
        id: requisitionId,
        query: {
          find: {
            _id: requisitionId
          },
          populate: [{ selectedBodyParts: [] }, { notes: [] }]
        }
      }
    }).then(({ data }) => {
      if (data.code === 'OK') {
        if (data.data.list.length && data.data.list[0]) {
          setEditData(data.data.list[0])

          if (data.data.list[0].notesCount) {
            handleNotesCount(data.data.list[0].notesCount)
          }

          setDoctorId(data.data.list[0].physicianId)
        }
      }
    })
  }
  const handleNotesCount = (count) => {
    setNotesCount(count)
  }
  const handleLoading = (action) => {
    setLoading(action)
  }
  const fetchResidentData = (residentId) => {
    let { method, url, baseURL } = getPatientDetail
    url = url + "/" + residentId
    axios({ method, url, baseURL }).then(({ data }) => {
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
        tempData.roomNo = tempData.room || ' '
        tempData.customHc = tempData.hc || ' '
        tempData.customVc = tempData.vc || ' '
        let tempAge = 0
        if (tempData.dob.length > 0) {
          tempAge = getAgeByDOB(tempData.dob)
        }
        setResidentData(tempData)
        setResidentAge(tempAge)
      }
    })
  }
  const modifyJsonData = (jsonData) => {

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

    setJsonData(jsonGroupBy)
    setImagingJson(tempJsonData)
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
    return props.history.push({
      pathname: routes.xRayList.path
    })
  }
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const submitRequisitionRequest = async (data) => {
    setBtnLoading(true);
    console.log('data => ',data)
    axios({
      ...requisitionRequest, data,
      // headers: {
      //   Authorization: "JWT " + JSON.parse(localStorage.getItem('token')),
      //   homeIdentifier: authUser.homeId.homeIdentifier,
      //   devicetype: 1
      // }
    }).then(data => {
      if (data.statusText === 'OK') {
        Toast.success(data.data.message)
        redirectToXrayListing()
      }
    }).catch(err => {
      console.log("err => ", err)
    }).finally(() => {
      setBtnLoading(false);
    })

  }
  return (
    <div className="xray-wrap">
      <MobileXRaySidebar
        imagingInfo={imagingDiagnosticInfo}
        residentData={residentData}
      />
      <XRayDetail
        btnLoading={btnLoading}
        loading={loading}
        jsonData={jsonData}
        imagingJson={imagingJson}
        isEdit={isEdit}
        roomNo={residentData.room || ''}
        residentAge={residentAge}
        residentName={residentData && residentData.lastName ? `${residentData.lastName},${residentData.firstName}` : ''}
        activeTab={activeTab}
        authUser={authUser}
        residentData={residentData}
        editDatas={editData}
        imagingInfo={imagingDiagnosticInfo}
        setNotesCount={setNotesCount}
        doctorId={doctorId}
        setBtnLoading={setBtnLoading}
        notesCount={notesCount}
        redirectToXrayListing={redirectToXrayListing}
        onSubmit={submitRequisitionRequest}
      />
    </div>
  );

}
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth
  return {
    authUser
  }
}
export default connect(mapStateToProps)(createForm()(MobileXRay));
