import React from 'react'
import { GENDER_TYPE } from '../../../constants/common'
import { displayDate, displayDOB } from '../../../util/moment'
import { getUserNameWithDesignation } from '../../../util/common'
import moment from 'moment'
function ResidentProfile(props) {

  const { detail } = props
  const { pmrId, patientId } = detail

  return (
    <>
      <div className="pro-title">
        <h3 className="">Resident Profile</h3>
      </div>
      <div className="resident-detail">
        <div className="inner-res-block">
          <div className="resident-desc-box">
            <span className="main">Physician</span>
            <span className="sub">{patientId?.physicianId ? getUserNameWithDesignation(patientId.physicianId) : '-' || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">License</span>
            <span className="sub">{patientId?.physicianId?.licenceNo || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">ODB</span>
            <span className="sub">{patientId?.hc || '-'}</span>
          </div>
        </div>
        <div className="inner-res-block">
          <div className="resident-desc-box">
            <span className="main">Gender</span>
            <span className="sub">{GENDER_TYPE[patientId?.gender] || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Date of Birth</span>
            <span className="sub">{displayDate(patientId?.dob)}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Age</span>
            <span className="sub">{moment(patientId?.dob, "MM/DD/YYYY").fromNow()}</span>
          </div>
        </div>
        <div className="inner-res-block">
          <div className="resident-desc-box">
            <span className="main">Phone No.</span>
            <span className="sub">{patientId?.phone || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Room No</span>
            <span className="sub">{patientId?.room || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Bed</span>
            <span className="sub">{patientId?.bed || '-'}</span>
          </div>
        </div>
      </div>

    </>
  )
}
export default ResidentProfile;