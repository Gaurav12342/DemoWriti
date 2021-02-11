import React, { Component } from 'react'
import NurseBlock from '../View/NurseBlock';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import CareClauseEditPopup from '../../../components/common/Popup/careclauseEdit-popup';



class RightSide extends Component {

    /* start care clause edit popup */
    state = {
        carePopupRef: false,
        onCareclausePopupClick: false,
    }

    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
    }
    // carePopupRef = ({handleOpenModal}) => {
    //     this.careModal = handleOpenModal;
    //   }

    //   onCareclausePopupClick = () => {
    //    this.careModal();
    //   }

    /* end  care clause edit popup */

    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }
    render() {
        return (<>
            <div className="prep_right_wrap">
                <div className="box-border">
                    <h2 className="main-title-bar">PMR 123456 O'Laughlin Craig (Room No 2056) 18th May 2020, 12:20 pm</h2>

                    <div className="pmr-row">
                        <div className="access-view">
                            <form action="">
                                <div className="form_wrap mr-10">
                                    <div className="components selwd145">
                                        <select className="inputForm select" placeholder="">
                                            <option value="">PMR Range </option>
                                            <option value=""> Physician Review</option>
                                            <option value="">Nurse Prep</option>
                                            <option value="">To Do </option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                            <div className="">
                                <img src={require("../../NursePrep/img/small-info.svg")} className="prev-c mr-5" />
                                <p className="prev-c">
                                    Previous PMR can be
                                <span>accessible for view only.</span></p>
                            </div>
                        </div>

                        <h3>PMR Range - 01st May 2020 to 31st Jul 2020</h3>
                        <button onClick={this.handleOpenModal} className="btn Click-here">SAVE</button>
                        {/* start popup */}

                        <ReactModal
                            isOpen={this.state.showModal}
                            contentLabel="onRequestClose Example"
                            onRequestClose={this.handleCloseModal}
                            className="custom-model-wrap pmr-not-popup"
                        >
                            <div className="popup-content">
                                <h2>PMR Notes - O'Laughlin, Craig (Room No 2056)</h2>
                                <div className="laug-block">
                                    <div className="task-detail">Added By : Nurse Patrick Jane</div>
                                    <div className="task-detail">Created At : 26th May, 2020 | 09:53 am</div>
                                </div>
                                <div className="laug-block">
                                    <div className="task-detail">Type : General</div>
                                </div>
                                <div className="notes">
                                    <span className="sub-text">Notes</span>
                                    <p className="description-text">Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text. Lorem Ipsum is dummy Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text</p>
                                </div>
                            </div>
                            <div className="">
                                <div className="action-notes">
                                    <div className="sub-text">Actions</div>
                                    <div className="craig-icon">
                                        <img src={require("../../NursePrep/img/edit.svg")} />
                                        <span>Edit Note</span>
                                    </div>
                                    <div className="craig-icon">
                                        <img src={require("../../NursePrep/img/add-notes.svg")} />
                                        <span>Delete Note</span>
                                    </div>
                                    <div className="craig-icon">
                                        <img src={require("../../NursePrep/img/conversation.svg")} />
                                        <span>Clarification</span>
                                    </div>
                                </div>
                            </div>
                            <button className="close-btn" onClick={this.handleCloseModal}>
                                <img src={require("../../NursePrep/img/close.svg")} />
                            </button>
                        </ReactModal>

                        {/* end popup */}
                    </div>
                    <div className="resident-row">
                        <div className="left-resident-pro">
                            <div className="pro-title">
                                <h3 className="">Resident Profile</h3>
                            </div>
                            <div className="resident-detail">
                                <div className="inner-res-block">
                                    <div className="resident-desc-box">
                                        <span className="main">Physician</span>
                                        <span className="sub">Dr. Osvaldo Ardiles</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">License</span>
                                        <span className="sub">123456</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">ODB</span>
                                        <span className="sub">123456</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box">
                                        <span className="main">Gender</span>
                                        <span className="sub">Male</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Date of Birth</span>
                                        <span className="sub">19th Jul. 1948</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Age</span>
                                        <span className="sub">71 years</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box">
                                        <span className="main">Phone No.</span>
                                        <span className="sub">123456789</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Room No</span>
                                        <span className="sub">2056</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Bed</span>
                                        <span className="sub">123456</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pro-title">
                                <h3 className="">Care Clause</h3>
                                <a onClick={() => this.modalActionFn('carePopupRef', true)}>
                                    <img src={require("../../NursePrep/img/edit.svg")} />
                                </a>
                            </div>
                            <div className="resident-detail">
                                <div className="inner-res-block">
                                    <div className="resident-desc-box wd100">
                                        <span className="main">The Continued Care Clause</span>
                                        <span className="sub">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs...</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box">
                                        <span className="main">Weight</span>
                                        <span className="sub">Lorem ipsum</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Blood Pressure</span>
                                        <span className="sub">Lorem ipsum</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Pulse Rate</span>
                                        <span className="sub">-</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box">
                                        <span className="main">Phone No.</span>
                                        <span className="sub">123456789</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Room No</span>
                                        <span className="sub">2056</span>
                                    </div>
                                    <div className="resident-desc-box">
                                        <span className="main">Bed</span>
                                        <span className="sub">123456</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box wd100">
                                        <span className="main">Conditions</span>
                                        <span className="sub">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NurseBlock />
                    </div>
                </div>
                <div className="">
                    <div className="rx-btns">
                        <div className="flex-block">
                            <a><button>Rx Order</button></a>
                            <a><button>Pandding To Do's</button></a>
                            <a><button>PMR Order Notes</button></a>
                            <div className="p-relative">
                                <a className="note-count">
                                    <p className="">03</p>
                                    <img src={require("../../NursePrep/img/notes.svg")} className="mr-5" />
                                    <span className="notes-part">Notes</span>
                                </a>
                                <a className="note-count">
                                    <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                    <span className="notes-part">Add Notes</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <a className="order-com">Order Complete 51 of 51 - 100%</a>
                        </div>

                    </div>
                </div>
                {/* <CareClauseEditPopup ref={this.carePopupRef}/> */}
                {this.state.carePopupRef && <CareClauseEditPopup visible={this.state.carePopupRef}
                    onClosed={() => this.modalActionFn('carePopupRef', false)}
                />}

            </div>

        </>)
    }
}
export default RightSide;