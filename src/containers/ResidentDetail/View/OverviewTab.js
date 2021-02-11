import React from "react";
import Image from "../../../components/common/Image";
import { GENDER_TYPE } from "../../../constants/common";
import { getLFName, getUserNameWithDesignation } from "../../../util/common";
import { displayDOB } from "../../../util/moment";
import _, { add } from "lodash";
const Overview = ({ residentDetail }) => {
  const { mergeLFName, isActive } = residentDetail;
  const GENDER_TYPE_LOCAL = _.invert(GENDER_TYPE);

  const getAdddress = (addresses) => {
    const primaryAddress = _.find(addresses, { isPrimary: true });
    let address = "-";
    if (primaryAddress) {
      address = "";
      if (primaryAddress.line1) {
        address = address + primaryAddress.line1 + ", ";
      }
      if (primaryAddress.line2) {
        address = address + primaryAddress.line2 + ", ";
      }

      if (primaryAddress.city) {
        address = address + primaryAddress.city + ", ";
      }
      if (primaryAddress.province) {
        address = address + primaryAddress.province + ", ";
      }
      if (primaryAddress.pincode) {
        address = address + primaryAddress.pincode;
      }
    }
    return address;
  };
  return (
    <div className="resident_overview">
      <div className="overview_header">
        {residentDetail?.image ? (
          <img src={residentDetail.image} alt="Image" />
        ) : (
            getLFName(residentDetail, true)
          )}
        {/* <Image
          image={require('./../../../assets/images/user.jpg')}
          alt='image'
        /> */}

        <div className="user_information">
          <div style={{ float: "left" }}>
            <h4>{mergeLFName}</h4>
            <div className="r_room">
              <span className="status"></span>
              <p>{isActive ? "ACTIVE" : "DE-ACTIVE"}</p>
            </div>
          </div>
          {/* <span style={{ marginLeft: "10px", marginTop: "6px", display: 'inline-block' }}>ODB: {residentDetail.hc - residentDetail.vc}</span> */}
        </div>
      </div>

      <div className="overview_content">
        <div className="form_row">
          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Home Area</strong></span>
              <span className="value">
                {residentDetail && residentDetail.homeAreaId
                  ? residentDetail.homeAreaId.name
                  : "-"}
              </span>
            </div>
          </div>

          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Room</strong></span>
              <span className="value">
                {" "}
                {residentDetail && residentDetail.room
                  ? residentDetail.room
                  : "-"}
              </span>
            </div>
          </div>

          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Bed</strong></span>
              <span className="value">
                {" "}
                {residentDetail && residentDetail.bed
                  ? residentDetail.bed
                  : "-"}
              </span>
            </div>
          </div>
          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Physician</strong></span>
              <span className="value">
                {" "}
                {residentDetail && residentDetail.physicianId
                  ? getUserNameWithDesignation(residentDetail.physicianId)
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="form_row">
          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Date of Birth</strong></span>
              <span className="value">{`${displayDOB(
                residentDetail?.dob
              )}`}</span>
              {/* <span className='value'>`{18th Mar, 1980 (40 Years)}`</span> */}
            </div>
          </div>

          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Gender</strong></span>
              <span className="value">
                {residentDetail.gender == GENDER_TYPE_LOCAL.Male
                  ? "Male"
                  : residentDetail.gender == GENDER_TYPE_LOCAL.Female
                    ? "Female"
                    : "Unspecified"}
              </span>
              {/* <span className='value'>`{18th Mar, 1980 (40 Years)}`</span> */}
            </div>
          </div>
          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Address</strong></span>
              <span className="value">
                {getAdddress(residentDetail.addresses)}
              </span>
              {/* <span className='value'>`{18th Mar, 1980 (40 Years)}`</span> */}
            </div>
          </div>
        </div>
        <div className="form_row">
          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Height</strong></span>
              <span className="value">
                {" "}
                {residentDetail && residentDetail.height
                  ? residentDetail.height.value + " Cm"
                  : "-"}
              </span>
            </div>
          </div>

          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Allergies</strong></span>
              <span className="value">
                {" "}
                {residentDetail && residentDetail.allergyStr
                  ? residentDetail.allergyStr
                  : "-"}
              </span>
            </div>
          </div>

          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Medical Conditions</strong></span>
              <span className="value">
                {" "}
                {residentDetail && residentDetail.medicalConditionStr
                  ? residentDetail.medicalConditionStr
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="form_row">
          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>Weight</strong></span>
              <span className="value">
                {" "}
                {residentDetail && residentDetail.weight
                  ? residentDetail.weight.value + " Kg"
                  : "-"}
              </span>
            </div>
          </div>

          <div className="form_group col-3">
            <div className="information_block">
              <span className="label"><strong>ODB</strong></span>
              <span className="value">
                {/* {residentDetail?.hc ? residentDetail.hc : residentDetail?.hc && residentDetail?.vc ? `${residentDetail.hc} - ${residentDetail.vc}` : '-'} */}
                {residentDetail?.hc && residentDetail?.vc ? `${residentDetail.hc} - ${residentDetail.vc}` : residentDetail?.hc || residentDetail?.vc ? residentDetail.hc || residentDetail.vc : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;
