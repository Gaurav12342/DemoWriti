/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
class ViewNotesPopup extends Component {

  constructor() {
    super();
    this.state = {
      viewNotesModal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleCloseModal() {
    this.setState({ viewNotesModal: false });
  }
  //   handleOpenModal () {
  //     this.setState({ viewModal: true });
  //   }

  //   handleCloseModal () {
  //     this.setState({ viewModal: false });
  //   }
  render() {

    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        onClose={this.props.onClosed}

        className="logout_popup add_notes_warp view_notes_wrap"
      >
        <div className="popup-content-log">
          <h3 className="name_head">View Note - O'Laughlin, Craig (Room No 2056)</h3>
          <div className="bb"></div>
          <div className="d-flex ptrik-notes">
            <span>Created By : Nurse Patrick Jane</span>
            <span>Created At : 26th May, 2020 | 09:53 am</span>
          </div>

          <div className="d-flex mb-20">
            <div className="pr-lock">
              <span className="mdm-text">Priority</span>
              <span className="hight-text">High</span>
            </div>
            <div className="pr-lock">
              <span className="mdm-text">Associated Document</span>
              <span className="rx-text">Rx123456</span>
            </div>
            <div className="pr-lock">
              <span className="mdm-text">Type</span>
              <span className="ss-text">Laboratory Note</span>
            </div>
          </div>

          <div className="">
            <span className="ss-text">Note</span>
            <p className="p-desc-text">Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text. Lorem Ipsum is dummy Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text</p>
          </div>
        </div>

        <div className="gray-block">
          <div className="d-flex">
            <span className="mdm-text mr-20">Actions</span>
            <div className="d-flex align-center mr-20">
              <img src={require('../../../assets/images/popup/edit.svg')} className="imgwd" />
              <span className="small-text">Edit Note</span>
            </div>
            <div className="d-flex align-center mr-20">
              <img src={require('../../../assets/images/popup/add-notes.svg')} className="imgwd" />
              <span className="small-text">Delete Note</span>
            </div>
            <div className="d-flex align-center mr-20">
              <img src={require('../../../assets/images/popup/conversation.svg')} className="imgwd" />
              <span className="small-text">Clarification</span>
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
export default ViewNotesPopup;