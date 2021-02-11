import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';


class VirtualVisitPopup extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        };

        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    // handleOpenModal() {
    //     this.setState({ showModal: true });
    // }

    handleCloseModal() {
        this.setState({ showModal: false });
    }
    render() {

        return (<>
            {/* start popup */}

            <Dialog visible={this.props.visible}
                onClose={this.props.onClosed}
                className="virtual-visit-wrap"
            >
                <div className="popup-content">
                    <h2>Virtual Visit (VV11234) Request Detail - O'Laughlin, Craig (Room No 2056)</h2>
                    <div className="d-flex call-text">
                        <img src={require("../../View/popup/img/group-call.svg")} />
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
                            <span className="task-detail-p d-block">Scheduled On</span>
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
                                                <img src={require("../../View/popup/img/info.svg")} />
                            </span>
                        </div>
                    </div>

                    <div class="d-flex pb-20 mb-17 more-info-bb">
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
                        <span className="sub-text pb-17">Secondary Users</span>
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

                </div>
                <div className="action-notes align-center">
                    <div className="sub-text mb-0">Actions</div>
                    <div className="craig-icon">
                        <img src={require("../../View/popup/img/edit-p.svg")} />
                        <span>Edit</span>
                    </div>
                    <div className="craig-icon">
                        <img src={require("../../View/popup/img/video-camera.svg")} />
                        <span>Start Visit</span>
                    </div>
                    <div className="craig-icon">
                        <img src={require("../../View/popup/img/cancel-visit.svg")} />
                        <span>Cancel Visit</span>
                    </div>
                    <div className="craig-icon">
                        <p className="pp-num">03</p>
                        <img src={require("../../View/popup/img/notes.svg")} />
                        <span>Notes</span>
                    </div>
                    <div className="craig-icon">
                        <img src={require("../../View/popup/img/add-notes.svg")} />
                        <span>Add Notes</span>
                    </div>
                    <div className="craig-icon">
                        <p className="pp-num">03</p>
                        <img src={require("../../View/popup/img/attach.svg")} />
                        <span>Attachments</span>
                    </div>
                    <div className="craig-icon">
                        <img src={require("../../View/popup/img/conversation.svg")} />
                        <span>Clarification</span>
                    </div>
                </div>


                <button className="close-btn" onClick={() => this.props.onClosed()}>
                    <img src={require("../../View/popup/img/close.svg")} />
                </button>

            </Dialog>

            {/* end popup */}
        </>)
    }
}
export default VirtualVisitPopup;