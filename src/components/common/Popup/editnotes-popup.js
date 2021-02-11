/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
class EditNotesPopup extends Component {

  constructor() {
    super();
    this.state = {
      editNotesModal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // handleOpenModal() {
  //     this.setState({ editNotesModal: true });
  // }

  handleCloseModal() {
    this.setState({ editNotesModal: false });
  }
  render() {

    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        onClose={this.props.onClosed}
        className="logout_popup edit_warp"
      >
        <div className="popup-content-log">
          <h3 className="name_head">Edit Note - O'Laughlin, Craig (Room No 2056)</h3>
          <div className="bb"></div>
          <div className="d-flex ptrik-notes">
            <span>Created By : Nurse Patrick Jane</span>
            <span>Created At : 26th May, 2020 | 09:53 am</span>
          </div>

          <div className="d-flex j-space-between">
            <form action="">
              <div className="form_wrap">
                <div className="components">
                  <select className="inputForm select" placeholder="">
                    <option value="">Laboratory Note </option>
                    <option value=""> Physician Review</option>
                    <option value="">Nurse Prep</option>
                    <option value="">To Do </option>
                  </select>
                </div>
              </div>
            </form>
            <div className="alert-box">
              <span>Alert</span>
              <div className="filter_value d-flex">
                <label htmlFor="vvs" className="filter_check">
                  <input type="checkbox" name="vvs" id="vvs" />
                  <span className="checkbox"></span>
                  <span className="lbl">Yes</span>
                </label>
                <label htmlFor="ptd" className="filter_check">
                  <input type="checkbox" name="ptd" id="ptd" />
                  <span className="checkbox"></span>
                  <span className="lbl">No</span>
                </label>
              </div>
                                
              {/* <div className="yes-box">
                                <div class="center">
                                    <label class="label">
                                    <input type="checkbox" name="checkbox" class="checkbox checkboxTwo"/>
                                    <div class="checkDiv checkDivTwo">
                                        <div class="lineOne"></div>
                                        <div class="lineTwo"></div>
                                    </div>
                                    </label>
                                </div>
                            </div> */}
                            
              {/* <div className="ack-block">
                                <input type="checkbox" id="yes1" name="yes1" value="yes" />
                                <label for="yes1"> Yes</label>
                            </div>
                            <div className="ack-block">
                                <input type="checkbox" id="no2" name="no2" value="no" />
                                <label for="no1"> No</label>
                            </div> */}
            </div>

          </div>


          <div className="additional-textarea">
            <textarea placeholder="Lorem Ipsum is a 
                                dummy text Lorem Ipsum is a dummy text. 
                                Lorem Ipsum is a dummy text. Lorem Ipsum 
                                is a dummy text"></textarea>
          </div>

          <div className="d-flex bottom-doc">
            <img src={require('../../../assets/images/popup/info.svg')} />
            <span className="">Associated with Document </span>
            <span className="color-green">Rx 2007</span>
            <img src={require('../../../assets/images/popup/math-plus.svg')} />
          </div>

          <div className="d-flex reminder-part j-space-between">
            <div className="d-flex j-space-between">
              <div className="plus-icon">
                <div className="d-flex mr-20">
                  <p className="green-bg-plus">
                    <img src={require('../../../assets/images/popup/plus.svg')} />
                  </p>
                  <span className="green-text">Set Reminder</span>
                </div>
                <div className="d-flex">
                  <p className="green-bg-plus">
                    <img src={require('../../../assets/images/popup/plus.svg')} />
                  </p>
                  <span className="green-text">Add Associated Document</span>
                </div>
              </div>
            </div>
            <div className="d-flex-end f-end">
              <button className="prev-screen-btn gray-btn sh-btn" onClick={() => this.props.onClose()}>CANCEL</button>
              <button className="prev-screen-btn sh-btn">SAVE</button>
            </div>
          </div>


        </div>



      </Dialog>
      {/* end popup */}
    </>);
  }
}
export default EditNotesPopup;