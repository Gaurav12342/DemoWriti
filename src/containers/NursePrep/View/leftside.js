import React, { Component } from "react";
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
const text = <span className="tooltip-desc">
                <p className="desc-1">PMR Current Status</p> 
                <p className="desc-2">Initated by Jane, Stacy (RPN)</p>
            </span>;
class LeftSide extends Component {
  render() {
    return (
      <>
        <div className="prep_left_wrap">
          <div className="stiky-box">
          <form action="">
              <div className="form_wrap">
                  <div className="components mb-12 wd100">
                      <select className="inputForm select" placeholder="">
                          <option value="">Filter Home Area</option>
                          <option value=""> Physician Review</option>
                          <option value="">Nurse Prep</option>
                          <option value="">To Do </option>
                      </select>
                  </div>
              </div>
              <div className="form_wrap">
                  <div className="components mb-12 wd100">
                      <select className="inputForm select" placeholder="">
                          <option value="">Pending </option>
                          <option value=""> Physician Review</option>
                          <option value="">Nurse Prep</option>
                          <option value="">To Do </option>
                      </select>
                  </div>
              </div>
          </form>
            {/* <div className="select-list mb-12">
              <select name="area" id="area">
                <option value="Home">Filter Home Area</option>
                <option value="Home1">Filter Home Area1</option>
                <option value="Home2">Filter Home Area2</option>
                <option value="Home3">Filter Home Area3</option>
              </select>
            </div> */}
            {/* <div className="select-list mb-30">
              <select name="Pending" id="Pending">
                <option value="Pending">Pending</option>
                <option value="Pending1">Pending1</option>
                <option value="Pending2">Pending2 </option>
                <option value="Pending3">Pending3 </option>
              </select>
            </div> */}
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
                    <img src={require("../../NursePrep/img/info.svg")}  className="info-left"/>
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
                    <img src={require("../../NursePrep/img/info.svg")} className="info-left"/>
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
                    <img src={require("../../NursePrep/img/info.svg")} className="info-left"/>
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
                    <img src={require("../../NursePrep/img/info.svg")} className="info-left"/>
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
                    <img src={require("../../NursePrep/img/info.svg")} className="info-left"/>
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
                    <img src={require("../../NursePrep/img/info.svg")} className="info-left"/>
                </Tooltip>
            </div>
            <div className="overdue-block">
              <div className="mr-17">
                <img src={require("../../NursePrep/img/Mask1.png")}/>
              </div>
              <div className="made-line">
                <span>Lisbon, Teresa</span>
                <p>Overdue 21 days</p>
              </div>
              <Tooltip
                    placement="top"
                    overlay={text}
                >
                    <img src={require("../../NursePrep/img/info.svg")} className="info-left"/>
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
                    <img src={require("../../NursePrep/img/info.svg")} className="info-left"/>
                </Tooltip>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default LeftSide;
