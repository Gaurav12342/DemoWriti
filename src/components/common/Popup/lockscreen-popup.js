/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';

class LockScreenPopup extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // handleOpenModal () {
  //   this.setState({ showModal: true });
  // }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {

    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        onClose={this.props.onClosed}
        className="lock_popup"
        maskClosable={false}
      >
        <div className="popup-content">
          <div className="user_name_img">
            <img src={require('../../../assets/images/popup/user.jpg')} />
          </div>
          <h3 className="name_head">Last Name, First Name</h3>
          <span className="des_head">Designation</span>
          <div className="bb"></div>
          <p className="activity_head">LAST ACTIVE ON : 09:53 am</p>
          <div className="screen_input">
            <input
              type="text"
              placeholder="Enter Password"
              className="inputForm"
            />
          </div>
          <div>
            <button className="screen-btn gray-btn">LOG OUT</button>
            <button className="screen-btn" onClick={() => this.props.onClosed()} >CONTINUE</button>
          </div>

        </div>

      </Dialog>
      {/* end popup */}
    </>);
  }
}
export default LockScreenPopup;