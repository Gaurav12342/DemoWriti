/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { GroupCall,Clarification,Attachments } from '../../../../assets/images/resident-detail/index';
// import { ReactComponent as GroupCall } from '../../../../assets/images/resident-detail/group-call.svg';
// import { ReactComponent as Clarification } from '../../../../assets/images/resident-detail/clarification.svg';
// import { ReactComponent as Attachments } from '../../../../assets/images/resident-detail/attachments.svg';

import { Notes } from '../../../../assets/images/pmr/index';

import CallWindowBlock from './callWindow';
import AfterCallBlock from './afterCall';
import Image from '../../../../components/common/Image';
class OnGoingCall extends Component {
  render() {
    return (<>
      <div className="on_going_call_wrap">
        <div className="on_going_call_container">
          <div className="call_header">
            <h4>Virtual Visit (VV11234) Request Detail - O'Laughlin Craig (Room No 2056)</h4>
          </div>
          <div className="call_detail_wrap">
            <div className="call_detail_content">
              <div className="call_type">
                <GroupCall />
                <h4>Group Call on 22/08/2020, 12:00 pm to 1:00 pm</h4>
              </div>
              <div className="call_detail_blocks">
                <div className="call_detail">
                  <h5>Visit With</h5>
                  <p>Dr. Osvaldo Ardiles</p>
                </div>
                <div className="call_detail">
                  <h5>Requested By</h5>
                  <p>Kim Fischer</p>
                </div>
                <div className="call_detail">
                  <h5>Scheduled On</h5>
                  <p>25/04/2020, 04:00 pm</p>
                </div>
                <div className="call_detail">
                  <h5>Health Card No.</h5>
                  <p>123456</p>
                </div>
                <div className="call_detail">
                  <h5>Associated Document</h5>
                  <p><a className="attach_doc">Rx Order 123456</a></p>
                </div>
                <div className="call_detail">
                  <h5>Reason for Visit</h5>
                  <p>Lorem Ipsum</p>
                </div>
              </div>
              <div className="addi_call_info grey_border_bottom mb-20">
                <h5>Additional Details/More Info</h5>
                <p>Lorem Ipsum is just a dummy text. Lorem Ipsum is just a dummy text Dummy text goes here</p>
              </div>
              <div className="secondary_users grey_border_bottom mb-20">
                <h5>Secondary Users</h5>
                <ul>
                  <li>
                    <p>
                                            Van Pelt, Grace</p><p> Nurse : Kim Fischer
                    </p>
                  </li>
                  <li>
                    <p>
                                            Wylie, Jason</p><p> Lorem Ipsum Pharmacy
                    </p>
                  </li>
                  <li>
                    <p>
                                            Lisbon, Teresa
                    </p>
                  </li>
                </ul>
              </div>
              <div className="action_wrapper">
                <h5>Actions</h5>
                <div className="actions">
                  <a>
                    <Notes />
                    <p>Notes</p>
                    <span className="notes tot read">05</span>
                  </a>
                  <a>
                    <Notes />
                    <p>Add Notes</p>
                  </a>
                  <a>
                    <Attachments />
                    <p>Attachments</p>
                    <span className="notes tot read">05</span>
                  </a>
                  <a>
                    <Clarification />
                    <p>Clarification</p>
                  </a>
                </div>
              </div>



            </div>
            <CallWindowBlock />
            {/* 
                        add condition for after call 
                        
                        <AfterCallBlock /> 
                        
                        */}

          </div>
        </div>
      </div>

    </>);
  }
}
export default OnGoingCall;