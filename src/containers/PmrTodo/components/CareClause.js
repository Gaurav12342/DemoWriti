import React from 'react'
import { Edit } from '../../../assets/images/resident-detail/index';
function CareClause({ detail }) {
  console.log('detail => ', detail)
  return (
    <>
      <div className="pro-title">
        <h3 className="">Care Clause</h3>
        {/* <a >
          <img src={require("../../NursePrep/img/edit.svg")} />
        </a> */}
      </div>
      <div className="resident-detail">
        <div className="inner-res-block">
          <div className="resident-desc-box wd100">
            <span className="main">The Continued Care Clause</span>
            <span className="sub">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs...</span>
          </div>
        </div>
        <div className="inner-res-block">
          <div className="resident-desc-box">
            <span className="main">Weight</span>
            <span className="sub">{detail?.patientId?.weight?.value || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Blood Pressure</span>
            <span className="sub">Lorem ipsum</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Pulse Rate</span>
            <span className="sub">-</span>
          </div>
        </div>
        <div className="inner-res-block">
          <div className="resident-desc-box">
            <span className="main">Phone No.</span>
            <span className="sub">{detail?.patientId?.phone || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Room No</span>
            <span className="sub">{detail?.patientId?.room || '-'}</span>
          </div>
          <div className="resident-desc-box">
            <span className="main">Bed</span>
            <span className="sub">{detail?.patientId?.bed || '-'}</span>
          </div>
        </div>
        <div className="inner-res-block">
          <div className="resident-desc-box wd100">
            <span className="main">Conditions</span>
            <span className="sub">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs...</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default CareClause;