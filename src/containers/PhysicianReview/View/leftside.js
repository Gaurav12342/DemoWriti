import React, { Component } from "react";
import Tooltip from 'rc-tooltip';
import { ReactComponent as Hide } from '../../../assets/images/resident-detail/chevron-double-left.svg';
import { ReactComponent as Filters } from '../../../assets/images/resident-detail/options-filters.svg';
import TogglePane from "../../ResidentDetail/View/togglePane";
import Image from '../../../components/common/Image';
import 'rc-tooltip/assets/bootstrap.css';
const text = <span className="tooltip-desc">
  <p className="desc-1">PMR Current Status</p>
  <p className="desc-2">Initated by Jane, Stacy (RPN)</p>
</span>;
class LeftSide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      hidePane: TogglePane.hidePane
    };

  }
  render() {
    return (
      <div className={this.state.hidePane ? 'residents_container no-border collapsed' : 'residents_container no-border'}>

        {this.state.hidePane &&
          <h4 className="pane_name">
            ALL RESIDENTS
                </h4>
        }
        <div className="hide_left" className={this.state.hidePane ? 'hide_left collapsed' : 'hide_left'}>
          <a className="collapse_pane collapsed" onClick={() => this.setState({ hidePane: !this.state.hidePane })}>
            <Hide />
          </a>
        </div>

        {(!this.state.showFilter && !this.state.hidePane) &&
          <div className="prep_left_wrap">
            <div className="stiky-box">

              <form action="">
                <div className="form_wrap d-flex">
                  <div className="compnents mb-12">
                    <select className="inputForm select" placeholder="">
                      <option value="">Filter Home Area</option>
                      <option value=""> Physician Review</option>
                      <option value="">Nurse Prep</option>
                      <option value="">To Do </option>
                    </select>
                  </div>

                </div>
                <div className="form_wrap">
                  <div className="compnents mb-12 wd100">
                    <select className="inputForm select" placeholder="">
                      <option value="">Pending </option>
                      <option value=""> Physician Review</option>
                      <option value="">Nurse Prep</option>
                      <option value="">To Do </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="name-day-list">
              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask1.png")} />
                </div>
                <div className="made-line">
                  <span>Hightower, Madeleine</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>
              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask2.png")} />
                </div>
                <div className="made-line">
                  <span>LaRoche, J. J.</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>

              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask1.png")} />
                </div>
                <div className="made-line">
                  <span>Van Pelt, Grace</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>
              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask2.png")} />
                </div>
                <div className="made-line">
                  <span>O'Laughlin, Craig</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>
              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask2.png")} />
                </div>
                <div className="made-line">
                  <span>Wayne, Rigsby</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>
              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask1.png")} />
                </div>
                <div className="made-line">
                  <span>Kimball, Cho</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>
              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask1.png")} />
                </div>
                <div className="made-line">
                  <span>Lisbon, Teresa</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>
              <div className="overdue-block">
                <div className="mr-17">
                  <img src={require("../../NursePrep/img/Mask2.png")} />
                </div>
                <div className="made-line">
                  <span>Wylie, Jason</span>
                  <p>Overdue 21 days</p>
                </div>
                <Tooltip
                  placement="top"
                  overlay={text}
                >
                  <img src={require("../../NursePrep/img/info.svg")} className="info-left" />
                </Tooltip>
              </div>
            </div>
          </div>

        }
      </div>
    );
  }
}
export default LeftSide;
