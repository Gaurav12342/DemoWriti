import React, { Component } from 'react';
import ReactModal from 'react-modal';
import OnGoingCallPopup from '../../View/popup/ongoingcall-popup';

class VVRequestDetail extends Component {

    /* start ongoing call popup */
    state = {
        OnGoingCallPopupRef: false,
        onGoingCallPopupClick: false,
    }
    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
    }
    // OnGoingCallPopupRef = ({handleOpenModal}) => {
    //     this.show4Modal = handleOpenModal;
    //     this.onGoingCall = false;
    //   }
     
    //   onGoingCallPopupClick = () => {
    //     this.onGoingCall=false;
    //    this.show4Modal();
       
    //   }
    /* end ongoing call popup */
 
    constructor () {
        super();
        this.state = {
          show2Modal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }
      
      handleOpenModal () {
        this.setState({ show2Modal: true });
      }
      
      handleCloseModal () {
        this.setState({ show2Modal: false });
      }
    render() {
       
        return (<>
             {/* start popup */}
                       
                            <ReactModal 
                                isOpen={this.state.show2Modal}
                                contentLabel="onRequestClose Example"
                                onRequestClose={this.handleCloseModal}
                                className="virtual-visit-wrap"
                                >
                                    <div className="popup-content">
                                        <h2>Virtual Visit Request Detail - O'Laughlin, Craig (Room No 2056)</h2>
                                        <div className="d-flex call-text">
                                            <img src={require("../../View/popup/img/group-call.svg")}/>
                                            <span>Group Call on 22/08/2020, 12:00 pm to 1:00 pm</span>
                                        </div>

                                        <div class="d-flex mb-20">
                                            <div className="virtual-block">
                                                <span className="task-detail-p d-block">Visit With</span>
                                                <span className="sub-text-p">Dr. Osvaldo Ardiles</span>
                                            </div>
                                            <div className="virtual-block">
                                                <span className="task-detail-p d-block">Requested By</span>
                                                <span className="sub-text-p">Kim Fischer</span>
                                            </div>
                                            <div className="virtual-block">
                                                <span className="task-detail-p d-block">Schedule</span>
                                                <a class="sh-popup">Schedule</a>
                                                <span className="sub-text-p">25/04/2020, 04:00 pm</span>
                                            </div>
                                            <div className="virtual-block">
                                                <span className="task-detail-p d-block">Health Card No.</span>
                                                <span className="sub-text-p">123456</span>
                                            </div>
                                        </div>

                                        <div class="d-flex mb-20">
                                            <div className="virtual-block">
                                                <span className="task-detail-p d-block">Reason for Visit</span>
                                                <span className="sub-text-p visit-with">DLorem Ipsum</span>
                                            </div>
                                            <div className="virtual-block">
                                                <span className="task-detail-p d-block">Status</span>
                                                <span className="sub-text-p visit-with">Upcoming</span>
                                            </div>
                                            <div className="virtual-block3">
                                                <span className="task-detail-p d-block">Billing Codes</span>
                                                <span className="sub-text-p visit-with">B203A: Direct-To-Patient Video Visit
                                                <img src={require("../../View/popup/img/info.svg")}/>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="d-flex  more-info-bb bb-0">
                                            <div className="virtual-block">
                                                <span className="task-detail-p d-block">Associated Document</span>
                                                <span className="sub-text-p v-color-green visit-with">Rx Order 123456</span>
                                            </div>
                                            <div className="virtual-block3">
                                                <span className="task-detail-p d-block">Additional Details/More Info</span>
                                                <span className="sub-text-p visit-with    ">Lorem Ipsum is just a dummy text. Lorem Ipsum is just a dummy text Dummy text goes here</span>
                                            </div>
                                        </div>

                                        <div className="s-user-block">
                                            <span className="sub-text pb-15">Secondary Users</span>
                                            <div className="d-flex mb-20">
                                                <div className="grace-place">
                                                    <span className="sub-text-p d-block mb-7">Van Pelt, Grace </span>
                                                    <span className="sub-text-p d-block">Nurse : Kim Fischer</span>
                                                </div>
                                                <div className="grace-place">
                                                    <span className="sub-text-p d-block">Wylie, Jason  </span>
                                                    <span className="sub-text-p">Lorem Ipsum Pharmacy</span>
                                                </div>
                                                <div className="grace-place">
                                                    <span className="sub-text-p visit-with d-block">Lisbon, Teresa  </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="right-textarea wd100">
                                                <textarea placeholder="Reject Reason (Will only appear after the Reject button is clicked)"></textarea>
                                            </div>
                                            <div className="d-flex-end f-end mb-20">
                                                <button className="prev-screen-btn gray-btn sh-btn">REJECT</button>
                                                <button className="prev-screen-btn sh-btn" onClick={() => this.modalActionFn('OnGoingCallPopupRef', true)}>ACCEPT</button>
                                            </div>
                                        </div>

                                    </div>
                                   
                                    <button className="close-btn" onClick={this.handleCloseModal}>
                                        <img src={require("../../View/popup/img/close.svg")}/>
                                    </button>
                                    
                            </ReactModal>
                            {/* <OnGoingCallPopup ref={this.OnGoingCallPopupRef}/> */}
                           
                            {this.state.OnGoingCallPopupRef && <OnGoingCallPopup visible={this.state.OnGoingCallPopupRef}
                                onClosed={() => this.modalActionFn('OnGoingCallPopupRef', false)}
                             />}
                        
                        {/* end popup */}
        </>)
    }
}
export default VVRequestDetail;