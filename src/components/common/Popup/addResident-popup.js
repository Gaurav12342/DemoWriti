/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
  DatePicker,
  DatePickerInput,
} from '../../../../node_modules/rc-datepicker';
const text = <span className="tooltip-desc d-flex">
  <span className="left-contry">
    <p className="desc-c"> Alberta</p>
    <p className="desc-c">BC </p>
    <p className="desc-c">Manitoba</p>
    <p className="desc-c">PEI </p>
    <p className="desc-c">Nova Scotia  </p>
    <p className="desc-c">New Brunswick </p>
    <p className="desc-c">Quebec </p>
    <p className="desc-c">Ontario </p>
    <p className="desc-c">Red Card  </p>
    <p className="desc-c">Saskatchewan </p>
    <p className="desc-c">NWT </p>
    <p className="desc-c">Yukon </p>
    <p className="desc-c">Nunavut </p>
  </span>

  <span className="right-con">
    <p className="desc-2d"> : 00000-0000</p>
    <p className="desc-2d">: 0000 000 000 </p>
    <p className="desc-2d">: 000 000 000 </p>
    <p className="desc-2d">: 00000000 </p>
    <p className="desc-2d">: 0000 000 000  </p>
    <p className="desc-2">: 000-000-000 </p>
    <p className="desc-2d">: 0000 0000  </p>
    <p className="desc-2">: 0000-000-000-AA </p>
    <p className="desc-2d">: 0000 000 000  </p>
    <p className="desc-2d">: 000 000 000   </p>
    <p className="desc-2d">: A0000000 </p>
    <p className="desc-2d">: 000-000-000 </p>
    <p className="desc-2d">: 000000000 </p>
  </span>
</span>;

class AddResidentPopup extends Component {

  constructor() {
    super();
    this.state = {
      residentModal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //   handleOpenModal () {
  //     this.setState({ residentModal: true });
  //   }

  handleCloseModal() {
    this.setState({ residentModal: false });
  }
  render() {

    return (<>
      {/* start popup */}
      <Dialog
        visible={this.props.visible}
        onClose={this.props.onClosed}

        className="logout_popup audit_warper resident_wrap add_R_p"
      >
        <div className="popup-content-log">
          <h3 className="name_head">
                        Add Resident
          </h3>
          <div className="bb"></div>
          <p className="small-text mb-20">*Required Fields</p>

          <div className="d-flex">
            <form action="">
              <div className="form_wrap mb-10">
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="First Name*"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="Last Name*"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components wd25">
                  {/* <input type="date" className="inputForm datePick"
                                        onChange={(e) => console.log(e)} /> */}
                  <div className="ui input">
                    <DatePickerInput
                      displayFormat="DD/MM/YYYY"
                      returnFormat="YYYY-MM-DD"
                      className="my-react-component mr-10"
                      defaultValue={this.state.yesterday}
                      showOnInputClick
                      placeholder="Date of Birth*"
                      locale="de"
                      iconClassName="calendar icon"
                    />
                  </div>
                </div>
                <div className="components wd25">
                  <select className="inputForm select" placeholder="">
                    <option value="">Gender</option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="d-flex">
            <form action="">
              <div className="form_wrap mb-10">
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="Room No*"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="Bed*"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components wd25">
                  <select className="inputForm select" placeholder="">
                    <option value="">Primary Physician*</option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
                <div className="components wd25">
                  <select className="inputForm select" placeholder="">
                    <option value="">Home Area</option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="d-flex">
            <form action="">
              <div className="form_wrap mb-10">
                <div className="components">
                  <input type="tex" className="inputForm" placeholder="Height"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components">
                  <input type="tex" className="inputForm" placeholder="Weight"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components">
                  <input type="tex" className="inputForm" placeholder="Address"
                    onChange={(e) => console.log(e)} />
                </div>
              </div>
            </form>
          </div>

          <div className="d-flex mb-30">
            <form action="">
              <div className="form_wrap mb-10">
                <div className="components">
                  <input type="tex" className="inputForm" placeholder="Health Card No*"
                    onChange={(e) => console.log(e)} />
                </div>
                <Tooltip 
                  placement="top"
                  overlay={text}
                >
                  <img src={require('../../../assets/images/popup/about.svg')} />
                </Tooltip>
              </div>
            </form>
          </div>

          <div className="bb mb-20"></div>

          <div className="mdm-text mb-20"> P.O.A Details</div>

          <div className="d-flex mb-30">
            <form action="">
              <div className="form_wrap mb-10">
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="First Name"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="Last Name"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="Phone"
                    onChange={(e) => console.log(e)} />
                </div>
                <div className="components wd25">
                  <input type="tex" className="inputForm" placeholder="Email"
                    onChange={(e) => console.log(e)} />
                </div>
              </div>
            </form>
          </div>

          <div className="d-flex flex-end">
            <button className='screen-btn gray-btn' onClick={() => this.props.onClosed()}>CANCEL</button>
            <button className='screen-btn'>ADD RESIDENT</button>
          </div>

        </div>


      </Dialog>
      {/* end popup */}
    </>);
  }
}
export default AddResidentPopup;