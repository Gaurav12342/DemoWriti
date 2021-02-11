import React, { Component } from "react";
import {
  Address,
  Birthdate,
  Gender,
  HealthCard,
  VersionCode,
} from "../../../assets/images/xray/index";
import { GENDER_TYPE } from '../../../constants/common'
import Spin from 'rc-spinner'
import { displayDOB } from '../../../util/moment'


function MobileXRaySidebar(props) {

  const { residentData, imagingInfo } = props

  return (
    <div className="xray-sidebar">

      <>
        <div className="listing">
          {Object.keys(residentData).length ?
            <>
              <div className="media gray-bg">
                <div className="contact-profile">
                  <img
                    src={require("../../../assets/images/xray/avtar.png")}
                    alt="avtar"
                  />
                </div>
                <div className="media-body">
                  <h3 className="name">{residentData.firstName || ' '}, {residentData.lastName || ' '}</h3>
                  <p className="desc">
                    <span className="status">
                      {residentData && residentData.isActive ? <><span className="green"></span>Active&nbsp;&#124;&nbsp;</> : null}
                    </span>
                    Room:{residentData && residentData.roomNo ? residentData.roomNo : ' '}
                  </p>
                </div>
              </div>
              <div className="address-details">
                <div className="media">
                  <div className="contact-profile">
                    <div className="icon">
                      <Address />
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="name">Address</h3>
                    <p className="desc">
                      {residentData && residentData.customAddress ? residentData.customAddress : ' '}
                    </p>
                  </div>
                </div>
                <div className="media">
                  <div className="contact-profile">
                    <div className="icon">
                      <Birthdate />
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="name">Birth Date &amp; Age</h3>
                    <p className="desc">{residentData && residentData.dob ?
                      displayDOB(residentData.dob) : ''}</p>
                  </div>
                </div>
                <div className="media">
                  <div className="contact-profile">
                    <div className="icon">
                      <Gender />
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="name">Gender</h3>
                    <p className="desc">{residentData && residentData.gender ?
                      GENDER_TYPE[residentData.gender] : ' '
                    }</p>
                  </div>
                </div>
                <div className="media">
                  <div className="contact-profile">
                    <div className="icon">
                      <HealthCard />
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="name">Health Card Num</h3>
                    <p className="desc">{residentData && residentData.customHc ? residentData.customHc : ' '}</p>
                  </div>
                </div>
                <div className="media">
                  <div className="contact-profile">
                    <div className="icon">
                      <VersionCode />
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="name">Version Code</h3>
                    <p className="desc">{residentData && residentData.customVc ? residentData.customVc : ' '}</p>
                  </div>
                </div>
              </div></>
            : <div className="spinner" >
              <div className="spin">
                <Spin color='#309ed1' height={40} ></Spin>
              </div>
            </div>
          }
        </div>
        {
          Object.keys(imagingInfo).length ?
            <div className="company-details">
              <div className="image">
                {
                  imagingInfo && imagingInfo.image && imagingInfo.image.length > 0 ? <img src={imagingInfo.image} alt="" /> :
                    <img src='#' alt="" />
                }
              </div>
              <div className="details-body">
                <h3 className="name">Company Name</h3>
                <p className="desc">{imagingInfo && imagingInfo.website ? imagingInfo.website : '-'}</p>
              </div>
              <div className="details-body">
                <h3 className="name">Toll Free Fax Number</h3>
                <p className="desc">{imagingInfo && imagingInfo.faxes && imagingInfo.faxes.length > 0 ?
                  imagingInfo.faxes[0].fax : '-'}</p>
              </div>
              <div className="details-body">
                <h3 className="name">Toll Free Number</h3>
                <p className="desc">{imagingInfo && imagingInfo.phone ? imagingInfo.phone : '-'}</p>
              </div>
            </div> : null
        }
      </>
    </div>
  );

}

export default MobileXRaySidebar;
