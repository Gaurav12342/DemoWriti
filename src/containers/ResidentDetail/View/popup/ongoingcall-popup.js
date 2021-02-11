/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import OnGoingCall from '../virtualVisit/onGointVisit';
import { Expand,AddFriend } from '../../../../assets/images/virtualvisit/index';
// import { ReactComponent as Expand } from '../../../../assets/images/virtualvisit/expand.svg';
// import { ReactComponent as AddFriend } from '../../../../assets/images/virtualvisit/add-friend.svg';

import Image from '../../../../components/common/Image';
import Dialog from 'rc-dialog';
class OnGoingCallPopup extends Component {

  constructor() {
    super();
    this.state = {
      show2Modal: false
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //   handleOpenModal () {
  //     this.setState({ show2Modal: true });
  //   }

  handleCloseModal() {
    this.setState({ show2Modal: false });
  }
  render() {

    return (<>
      {/* start popup */}
      <Dialog visible={this.props.visible}
        onClose={this.props.onClosed}
        className="virtual-visit-wrap call-popup-wrap"
      >
        <div className="popup-content">
          {/* <OnGoingCall />  */}
          <figure>
            <Image image={require('../../../../assets/images/virtualvisit/5055.png')} alt="image" />
            <div className="call_window_bottom">
              <div className="user_group">
                <div className="user_in">
                  <Image image={require('../../../../assets/images/virtualvisit/no-profile-pic.svg')} alt="image" />
                  <p>Van Pelt, Grace</p>
                </div>
                <div className="user_in">
                  <Image image={require('../../../../assets/images/virtualvisit/no-profile-pic.svg')} alt="image" />
                  <p>Wylie, Jason</p>
                </div>
                <div className="user_in">
                  <Image image={require('../../../../assets/images/virtualvisit/no-profile-pic.svg')} alt="image" />
                  <p>Lisbon, Teresa</p>
                </div>
                <div className="user_in">
                  <Image image={require('../../../../assets/images/virtualvisit/no-profile-pic.svg')} alt="image" />
                  <p>Lorem Ipsum Pharmacy</p>
                </div>
                <div className="user_in">
                  <Image image={require('../../../../assets/images/virtualvisit/no-profile-pic.svg')} alt="image" />
                  <p>Nurse Kim Fischer</p>
                </div>
                <div className="user_in">
                  <Image image={require('../../../../assets/images/virtualvisit/no-profile-pic.svg')} alt="image" />
                  <p>Nurse Kim Fischer</p>
                </div>
              </div>

            </div>
            <div className="expand_btn">
              {/* <Image image={require("../../../../images/virtualvisit/add-friend.svg")} alt="" className="add-call-btn"/> */}

              <AddFriend />                                        <Expand />
            </div>
          </figure>
        </div>
      </Dialog>
      {/* end popup */}
    </>);
  }
}
export default OnGoingCallPopup;
