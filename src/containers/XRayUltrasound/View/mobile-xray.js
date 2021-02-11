import React, { Component } from "react";
import { Correct } from "../../../assets/images/resident-detail/index";
import Tooltip from "../../../../node_modules/rc-tooltip";
import "../../../../node_modules/rc-tooltip/assets/bootstrap.css";
import ToesPopup from '../../../components/common/Popup/toesPopup';
import BodyPart from '../../Xray/View/BodyPart'
class XRayDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toesPopup: false,
    };
  } 
  modalActionFn = (key, action) => {
    this.setState({ [key]: action })
  }

  render() {
    return (
      <div className="xray-details">
        <div className="details-table">
          <div class="main-title">
            <h4>
              Mobile Ultrasound&nbsp;-&nbsp;O'Laughlin Craig (Room No 2056 )
              18th May 2020, 12:20 pm
            </h4>
          </div>

          {/* {
            Object.keys(jsonData).length > 0 ?
              Object.keys(jsonData).map(bodyPart => {
                return <BodyPart name={bodyPart} data={jsonData[bodyPart]} />
              }) : null
          } */}
          <div className="xray-details-list option">
            <div className="left-detail">
              <span>Abdomen</span>
            </div>
            <div className="right-details">
              <div className="listing">
                <label className="listing-wrapper active" onClick={() => this.modalActionFn('toesPopup', true)}>
                  <span>
                    Abdomen
                    <Correct />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="xray-details-list">
            <div className="left-detail">
              <span>Pelvis</span>
            </div>
            <div className="right-details">
              <div className="listing">
                <ul className="xray-options ml-0">
                  <li>
                    <Tooltip
                      placement="right"
                      trigger={["hover"]}
                      overlayClassName="pelvis-tooltip"
                      overlay={
                        <div>
                          <p>
                            Patient will need to drink 32oz (approximately 1
                            litre) prior to the technologist's arrival.
                          </p>
                          <p>
                            Technologist will call and advise of the time to
                            have the patient start drinking.
                          </p>
                          <p>
                            The patient should be instructed not to void until
                            the exam is completed (understandably, at times this
                            may be difficult)
                          </p>
                        </div>
                      }>
                      <label className="options-listing-wrapper">
                        <span>Pelvis</span>
                      </label>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="xray-details-list option">
            <div className="left-detail">
              <span>Scrotum/Groin</span>
            </div>
            <div className="right-details">
              <div className="listing">
                <label className="listing-wrapper">
                  <span>
                    Scrotum
                    <Correct />
                  </span>
                </label>
                <label className="listing-wrapper">
                  <span>
                    Groin (Hernia)
                    <Correct />
                  </span>
                </label>
              </div>
            </div>
          </div>
         
         
          <div className="xray-details-list option">
            <div className="left-detail">
              <span>Neck/Face</span>
            </div>
            <div className="right-details">
              <div className="listing">
                <label className="listing-wrapper">
                  <span>
                    Thyroid
                    <Correct />
                  </span>
                </label>
                <label className="listing-wrapper active">
                  <span>
                    Neck
                    <Correct />
                  </span>
                </label>
                <label className="listing-wrapper active">
                  <span>
                    Salivary Gland
                    <Correct />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="xray-details-list option-listing">
            <div className="left-detail">
              <span>Vascular</span>
            </div>
            <div className="right-details">
              <div className="listing">
                <div className="xray-title">
                  <label className="listing-wrapper">
                    <input type="radio" name="chest-xray" id="chest1" />
                    <span>
                      Venous Arms
                      <Correct />
                    </span>
                  </label>
                </div>
                <ul className="xray-options active">
                  <li>
                    <label className="options-listing-wrapper">
                      <span>Venous Legs</span>
                    </label>
                  </li>
                  <li>
                    <label className="options-listing-wrapper">
                      <input type="radio" name="Venous" id="left" checked />
                      <span>
                        Left
                        <Correct />
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="options-listing-wrapper">
                      <input type="radio" name="Venous" id="right" />
                      <span>
                        Right
                        <Correct />
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="options-listing-wrapper">
                      <input type="radio" name="Venous" id="both" />
                      <span>
                        Both
                        <Correct />
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="listing">
                <div className="xray-title">
                  <label className="listing-wrapper">
                    <input type="radio" name="chest-xray" id="chest1" />
                    <span>
                      Arterial Arms
                      <Correct />
                    </span>
                  </label>
                </div>
                <ul className="xray-options active">
                  <li>
                    <label className="options-listing-wrapper">
                      <span>Arterial Legs</span>
                    </label>
                  </li>
                  <li>
                    <label className="options-listing-wrapper">
                      <input type="radio" name="Arterial" id="left" />
                      <span>
                        Left
                        <Correct />
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="options-listing-wrapper">
                      <input type="radio" name="Arterial" id="right" />
                      <span>
                        Right
                        <Correct />
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="options-listing-wrapper">
                      <input type="radio" name="Arterial" id="both" checked />
                      <span>
                        Both
                        <Correct />
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="xray-details-list option">
            <div className="left-detail">
              <span>Lump/Mass</span>
            </div>
            <div className="right-details">
              <div className="listing">
                <label className="listing-wrapper">
                  <span>
                    Lump/Mass
                    <Correct />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="xray-details-list option">
            <div className="left-detail">
              <span>Other</span>
            </div>
            <div className="right-details">
              <div className="listing">
                <label className="listing-wrapper">
                  <span>
                    Other
                    <Correct />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-part">
          <div className="d-flex">
            <label>
              <span>Selected&nbsp;-&nbsp;</span>Abdomen, Neck, Salivary Gland,
              Venous Legs, Arterial Legs
            </label>
            <div className="d-flex-end">
              <div className="save-graft">
                <a href="">Clear all</a>
              </div>
              <button class="prev-screen-btn">Review</button>
              <button class="prev-screen-btn">Submit</button>
            </div>
          </div>
        </div>
        {this.state.toesPopup && <ToesPopup visible={this.state.toesPopup}
          onClosed={() => this.modalActionFn('toesPopup', false)}
        />}
      </div>
    );
  }
}

export default XRayDetail;
