/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Expand } from '../../../../assets/images/virtualvisit/index';
import Image from '../../../../components/common/Image';
class CallWindow extends Component {
  render() {

    return (<>
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
          <Expand />
        </div>
      </figure>

    </>);
  }
}
export default CallWindow;