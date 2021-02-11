// import React, { Component } from 'react';
// import { ReactComponent as RoomNo } from "../svg/roomNo.svg";
// import { ReactComponent as Gender } from "../svg/gender.svg";
// import { ReactComponent as Health } from "../svg/health.svg";
// import UtilService from '../../../services/util'
// import { GENDER_TYPE } from '../../../constants/Common'
// import { Avatar, Spin } from 'antd'

// class residentBasicDetail extends Component {

//     render() {
//         const { residentData, imagingInfo } = this.props
//         return (
//             <div className="residentDetailView">
//                 {
//                     Object.keys(residentData).length ?
//                         <>
//                             <div className="residentDetailCard">
//                                 <div className="contactCard">
//                                     <Avatar
//                                         style={{ backgroundColor: "#87d068" }}
//                                         size={40}
//                                         icon="user"
//                                     />
//                                     <div className="contactNameandDetail">
//                                         <h5>{residentData && residentData.name ? residentData.name : ''}</h5>
//                                         <div className="text-muted">{
//                                             residentData && residentData.dob ?
//                                                 UtilService.displayDOB(residentData.dob) : ''
//                                         }</div>
//                                     </div>
//                                 </div>
//                                 {/* <hr /> */}
//                                 <div className="contactCard">
//                                     <ul className="residentBasicInfo">
//                                         <li>
//                                             <i className="icon icon-location gx-fs-xlxl gx-text-themeTwo"></i>
//                                             <div className="gx-media-body">
//                                                 <h6 className="gx-mb-1 gx-text-grey">Address</h6>
//                                                 <p className="gx-mb-0">{residentData && residentData.customAddress ? residentData.customAddress : ' '}</p>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <i>
//                                                 <RoomNo />
//                                             </i>
//                                             <div className="gx-media-body">
//                                                 <h6 className="gx-mb-1 gx-text-grey">Room No</h6>
//                                                 <p className="gx-mb-0">{residentData && residentData.roomNo ? residentData.roomNo : ' '}</p>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <i className="icon icon-avatar gx-fs-xlxl gx-text-themeFour"></i>
//                                             <div className="gx-media-body">
//                                                 <h6 className="gx-mb-1 gx-text-grey">Patient's Last Name</h6>
//                                                 <p className="gx-mb-0">{residentData.lastName || ' '}</p>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <i className="icon icon-avatar gx-fs-xlxl gx-text-themeTwo"></i>
//                                             <div className="gx-media-body">
//                                                 <h6 className="gx-mb-1 gx-text-grey">Patient's First Name</h6>
//                                                 <p className="gx-mb-0">{residentData.firstName || ' '}</p>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <i>
//                                                 <Gender />
//                                             </i>
//                                             <div className="gx-media-body">
//                                                 <h6 className="gx-mb-1 gx-text-grey">Gender</h6>
//                                                 <p className="gx-mb-0">{residentData && residentData.gender ?
//                                                     GENDER_TYPE[residentData.gender] : ' '
//                                                 }</p>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <i>
//                                                 <Health />
//                                             </i>
//                                             <div className="gx-media-body">
//                                                 <h6 className="gx-mb-1 gx-text-grey">Health Number</h6>
//                                                 <p className="gx-mb-0">{residentData && residentData.customHc ? residentData.customHc : ' '}</p>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <i className="icon icon-avatar gx-fs-xlxl gx-text-themeThree"></i>
//                                             <div className="gx-media-body">
//                                                 <h6 className="gx-mb-1 gx-text-grey">Version Code</h6>
//                                                 <p className="gx-mb-0">{residentData && residentData.customVc ? residentData.customVc : ' '}</p>
//                                             </div>
//                                         </li>

//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="residentDetailCard">
//                                 <div className="contactCard">
//                                     <div>
//                                         <div className="gx-d-flex gx-align-items-center">
//                                             <div className="" style={{ width: "45%", marginRight: "5%" }}>
//                                                 {
//                                                     imagingInfo && imagingInfo.image && imagingInfo.image.length > 0 ? <img src={imagingInfo.image} alt="" /> :
//                                                         <img src={require("../svg/logo.png")} alt="" />
//                                                 }

//                                             </div>
//                                             <div className="" style={{ width: "60%" }}>
//                                                 <div className="gx-media-body gx-mb-2">
//                                                     <h6 className="gx-mb-1 gx-text-grey">Toll Free Tel:</h6>
//                                                     <p className="gx-mb-0">{imagingInfo && imagingInfo.phone ? imagingInfo.phone : '-'} </p>
//                                                 </div>
//                                                 <div className="gx-media-body">
//                                                     <h6 className="gx-mb-1 gx-text-grey">Toll Free Fax: </h6>
//                                                     <p className="gx-mb-0">{imagingInfo && imagingInfo.faxes && imagingInfo.faxes.length > 0 ?
//                                                         imagingInfo.faxes[0].fax : '-'} </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="gx-media-body">
//                                             <h6 className="gx-mb-1 gx-text-grey">Website: </h6>
//                                             <p className="gx-mb-0">{imagingInfo && imagingInfo.website ? imagingInfo.website : '-'}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div></>
//                         : <div style={{ textAlign: 'center', marginTop: '200px' }}><Spin /></div>
//                 }

//                 {/* </Spin> */}

//             </div>

//         );
//     }
// }

// export default residentBasicDetail;