/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';

class AuditPopup extends Component {

  constructor() {
    super();
    this.state = {
      auditModal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //   handleOpenModal () {
  //     this.setState({ auditModal: true });
  //   }

  //   handleCloseModal () {
  //     this.setState({ auditModal: false });
  //   }
  handleCloseModal() {
    this.setState({ addNotesModal: false });
  }
  render() {

    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        onClose={this.props.onClosed}

        className="logout_popup add_notes_warp audit_warper"
      >
        <div className="popup-content-log">
          <h3 className="name_head">
                        Audit Log for #Rx 123456
            <span>O'Laughlin, Craig (Room No 2056)</span>
          </h3>
          <div className="bb"></div>


          <form action="">
            <div className="form_wrap mb-10">
              <div className="components">
                <input type="date" className="inputForm datePick"
                  onChange={(e) => console.log(e)} />
              </div>
            </div>
          </form>

          <div className="d-flex mb-10">
            <form action="">
              <div className="form_wrap">
                <div className="components">
                  <select className="inputForm select" placeholder="">
                    <option value="">Track Type </option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
              </div>
            </form>
            <form action="">
              <div className="form_wrap">
                <div className="components">
                  <select className="inputForm select" placeholder="">
                    <option value="">Device </option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="d-flex mb-20">
            <form action="">
              <div className="form_wrap">
                <div className="components">
                  <select className="inputForm select" placeholder="">
                    <option value="">To Do </option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
              </div>
            </form>
            <form action="">
              <div className="form_wrap">
                <div className="components">
                  <select className="inputForm select" placeholder="">
                    <option value="">To Do Status </option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="pl-6">
            <span className="order-head">COE (Computerised Order Entry)</span>
            <div className="scroll-bar">
              <div className="track-block">
                <p>06th June, 2020 | 09:53 am</p>
                <div className="d-flex">
                  <div className="left-type">
                    <span>Status </span>
                    <span> Updated By</span>
                    <span>Track Type</span>
                  </div>
                  <div className="right-type">
                    <span>: Submitted </span>
                    <span> : Fischer, Kim </span>
                    <span> : Prescription</span>
                  </div>
                </div>
              </div>
              <div className="track-block">
                <p>06th June, 2020 | 09:53 am</p>
                <div className="d-flex">
                  <div className="left-type">
                    <span>Status </span>
                    <span> Co-Signed By </span>
                    <span> Track Type </span>
                    <span> To Do  </span>
                    <span> To Do Status  </span>
                    <span>Device </span>
                  </div>
                  <div className="right-type">
                    <span>: Submitted </span>
                    <span>: Fischer, Kim</span>
                    <span>: To Do  </span>
                    <span>: Verbal Order </span>
                    <span>: Completed  </span>
                    <span> : Android Tablet1 </span>
                  </div>
                </div>
              </div>
              <div className="track-block">
                <p>06th June, 2020 | 09:53 am</p>
                <div className="d-flex">
                  <div className="left-type">
                    <span>Status </span>
                    <span> Co-Signed By </span>
                    <span> Co-Signed By </span>
                    <span> Track Type  </span>
                    <span>To Do Status </span>
                    <span> Device </span>

                  </div>
                  <div className="right-type">
                    <span>: Submitted </span>
                    <span>: Fischer, Kim</span>
                    <span>: To Do  </span>
                    <span>: Verbal Order </span>
                    <span>: Completed  </span>
                    <span> : Android Tablet1 </span>
                  </div>
                </div>
              </div>
              <div className="track-block">
                <p>06th June, 2020 | 09:53 am</p>
                <div className="d-flex">
                  <div className="left-type">
                    <span>Status </span>
                    <span> Updated By</span>
                    <span>Track Type</span>
                  </div>
                  <div className="right-type">
                    <span>: Submitted </span>
                    <span> : Fischer, Kim </span>
                    <span> : Prescription</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <button className="close-btn" onClick={() => this.props.onClosed()}>
          <img src={require('../../../assets/images/popup/close.svg')} />
        </button>

      </Dialog>
      {/* end popup */}
    </>);
  }
}
export default AuditPopup;