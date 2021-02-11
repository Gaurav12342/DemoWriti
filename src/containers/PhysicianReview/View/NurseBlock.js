import React, { Component } from 'react'
import ActionPopup from '../../../components/common/Popup/action-popup';

class NurseBlock extends Component {
    state = {
        actionPopupRef: false,
        onActionPopupClick: false,
    }
    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
    }
    // constructor () {
    //     super();
    //     this.state = {
    //       showModal: false
    //     };

    //     // this.handleOpenModal = this.handleOpenModal.bind(this);
    //     // this.handleCloseModal = this.handleCloseModal.bind(this);
    //   }

    // //   handleOpenModal () {
    // //     this.setState({ showModal: true });
    // //   }

    //   handleCloseModal () {
    //     this.setState({ showModal: false });
    //   }
    render() {
        return (<>
            <div className="right-Nurse-prep">
                <div className="pro-title">
                    <h3>Nurse Prep is initiated by Jane, Stacy (RPN)</h3>
                    <div className="flex-block">
                        <p className="green-bg mr-8">
                            <img src={require("../../NursePrep/img/plus.svg")} />
                        </p>
                        <span>Add New</span>
                    </div>
                </div>

                <div className="flex-block bb head-ack">
                    <div className="rate-box-1 RPN-block"><span className="order-d-text">Order</span></div>
                    <div className="ack-block pt-10"><span>Cont.</span></div>
                    <div className="ack-block pt-10"><span onClick={() => this.modalActionFn('actionPopupRef', true)}>D/C</span></div>
                    {/* start popup */}
                    {/* <div>
                            <Dialog 
                                visible={this.state.visible}
                                 onClose={this.state.onClosed}
                                className="custom-model-wrap"
                                >
                                    <div className="popup-content">
                                        <h2>Actions</h2>
                                    </div>
                                    <div className="">
                                            <div className="action-notes-d-c">
                                                <div className="d-c-icon">
                                                    <img src={require("../../NursePrep/img/d-c.svg")}/>
                                                    <span>D/C</span>
                                                </div>
                                                <div className="d-c-icon">
                                                    <img src={require("../../NursePrep/img/hold1.svg")}/>
                                                    <span>Hold</span>
                                                </div>
                                                <div className="d-c-icon">
                                                    <img src={require("../../NursePrep/img/edit.svg")}/>
                                                    <span>Edit</span>
                                                </div>
                                                <div className="d-c-icon">
                                                    <img src={require("../../NursePrep/img/d-c-create-new.svg")}/>
                                                    <span>D/C & Create New</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="close-btn" onClick={this.handleCloseModal}>
                                            <img src={require("../../NursePrep/img/close.svg")}/>
                                        </button>
                            </Dialog>
                        </div> */}

                    {/* end popup */}
                    <div className="ack-block pt-10"><span>Hold</span></div>
                </div>

                <div className="scroll-block">
                    {/* start white section */}
                    <div className="flex-block">
                        <div className="resident-detail rate-box-1">
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main line-through">Order</span>
                                    <span className="sub line-through">+Calcium carbonate 500gm CPL<p className="order-tag red-tag">Changed</p></span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main line-through">Rx no</span>
                                    <span className="sub line-through">3453</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main line-through">Din</span>
                                    <span className="sub line-through">1234</span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main line-through">Equiv. to</span>
                                    <span className="sub line-through">+Calcium carbonate</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main line-through">Last Fill</span>
                                    <span className="sub line-through">NA</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main line-through">Exp</span>
                                    <span className="sub line-through">NA</span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main line-through">Source</span>
                                    <span className="sub line-through">Korla, lorem ispum</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main line-through">LU code</span>
                                    <span className="sub line-through">NA</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main line-through">Indication</span>
                                    <span className="sub line-through">NA</span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main line-through">Direction</span>
                                    <span className="sub line-through">As Dedication lorem ispum text lorem ispum lorem text</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main line-through">Order Type</span>
                                    <span className="sub line-through">NA</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main"></span>
                                    <span className="sub"></span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">

                                </div>
                                <div className="resident-desc-box w-d-25">

                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="sub"><p className="order-tag red-tag">Discontinue</p></span>
                                </div>
                            </div>
                            <div className="inner-res-block bb mb-0 pb-20 align-center">
                                <div className="resident-desc-box wd24 p-relative">
                                    <img src={require("../../NursePrep/img/red-small-info.svg")} className="cusion-phy" />
                                    <span className="cusion-info">Cusion come here. Cusion come here. Cusion come here. </span>
                                </div>
                                <div className="resident-desc-box wd24">
                                    <div className="d-flex align-center">
                                        <img src={require("../../NursePrep/img/reminder.svg")} className="mr-5" />
                                        <span className="reminder-info">Set reminder </span>
                                    </div>
                                </div>
                                <div className="resident-desc-box wd24">
                                    <div className="p-relative align-item-center">
                                        <p className="note-numb">05</p>
                                        <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                        <span className="reminder-info">Notes </span>
                                    </div>
                                </div>
                                <div className="d-flex align-center">
                                    <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                    <span className="reminder-info">Add Notes </span>
                                </div>
                            </div>

                        </div>

                        <div className="ack-block">

                        </div>
                        <div className="ack-block">

                        </div>
                        <div className="ack-block">

                        </div>
                    </div>
                    {/* end*/}

                    {/* start white section */}
                    <div className="">
                        <div className="flex-block bb">
                            <div className="resident-detail rate-box-1">
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Order</span>
                                        <span className="sub">+Calcium carbonate 500gm CPL<p className="order-tag pink-tag">New Edit</p></span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">RX No</span>
                                        <span className="sub">123456</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">DIN</span>
                                        <span className="sub">123456</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Equiv. to</span>
                                        <span className="sub">+Calcium carbonate</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Last Fill</span>
                                        <span className="sub">NA</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Exp</span>
                                        <span className="sub">NA</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Source</span>
                                        <span className="sub">Korla, lorem ispum</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">LU code</span>
                                        <span className="sub">NA</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Indication</span>
                                        <span className="sub">NA</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Direction</span>
                                        <span className="sub">As Dedication lorem ispum text lorem ispum lorem text</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Order Type</span>
                                        <span className="sub">NA</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main"></span>
                                        <span className="sub"></span>
                                    </div>
                                </div>
                                <div className="inner-res-block align-center">
                                    <div className="resident-desc-box wd24 d-flex align-center">
                                        <div className="flex-block"><p className="green-bg mr-5">
                                            <img src={require("../../NursePrep/img/plus.svg")} /></p>
                                            <span>Add Causion</span>
                                        </div>
                                    </div>
                                    <div className="resident-desc-box wd24">
                                        <div className="d-flex align-center">
                                            <img src={require("../../NursePrep/img/reminder.svg")} className="mr-5" />
                                            <span className="reminder-info">Set reminder </span>
                                        </div>
                                    </div>
                                    <div className="resident-desc-box wd24">
                                        <div className="p-relative align-item-center">
                                            <p className="note-numb">05</p>
                                            <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                            <span className="reminder-info">Notes </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-center">
                                        <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                        <span className="reminder-info">Add Notes </span>
                                    </div>
                                </div>
                            </div>

                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox4" />
                                    <label for="checkbox4"></label>
                                </div>
                            </div>
                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox5" />
                                    <label for="checkbox5"></label>
                                </div>
                            </div>
                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox6" />
                                    <label for="checkbox6"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end */}

                    {/* start gray */}
                    <div className="bg-gray">
                        <div className="flex-block bb">
                            <div className="resident-detail rate-box-1">
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Order</span>
                                        <span className="sub">+Calcium carbonate 500gm CPL<p className="order-tag pink-tag">New Edit</p></span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">RX No</span>
                                        <span className="sub">1234656</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">DIN</span>
                                        <span className="sub">123456</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Equiv. to</span>
                                        <span className="sub">+Calcium carbonate</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Last Fill</span>
                                        <span className="sub">NA</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Exp</span>
                                        <span className="sub">NA</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Source</span>
                                        <span className="sub">Korla, lorem ispum</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">LU code</span>
                                        <span className="sub">NA</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Indication</span>
                                        <span className="sub">NA</span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">

                                    </div>
                                    <div className="resident-desc-box w-d-25">

                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="sub"><p className="order-tag blue-tag">Hold</p></span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Direction</span>
                                        <span className="sub">As Dedication lorem ispum text lorem ispum lorem text</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Order Type</span>
                                        <span className="sub">NA</span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main"></span>
                                        <span className="sub"></span>
                                    </div>
                                </div>
                                <div className="inner-res-block">
                                    <div className="resident-desc-box wd24  d-flex align-center">
                                        <div class="flex-block"><p class="green-bg mr-5">
                                            <img src={require("../../NursePrep/img/plus.svg")} /></p>
                                            <span>Add Causion</span>
                                        </div>
                                    </div>
                                    <div className="resident-desc-box wd24 d-flex align-center">
                                        <img src={require("../../NursePrep/img/reminder.svg")} className="mr-5" />
                                        <span className="reminder-info">Set reminder </span>
                                    </div>
                                    <div className="resident-desc-box wd24 d-flex align-center">
                                        <div className="p-relative align-item-center">
                                            <p className="note-numb">05</p>
                                            <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                            <span className="reminder-info">Notes </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-center">
                                        <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                        <span className="reminder-info">Add Notes </span>
                                    </div>
                                </div>
                            </div>

                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox11" />
                                    <label for="checkbox11"></label>
                                </div>
                            </div>
                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox7" />
                                    <label for="checkbox7"></label>
                                </div>
                            </div>
                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox8" />
                                    <label for="checkbox8"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end gray */}

                    {/* start white */}
                    <div className="flex-block">
                        <div className="resident-detail rate-box-1">
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main">Order</span>
                                    <span className="sub">+Calcium carbonate 500gm CPL<p className="order-tag red-tag">Changed</p></span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">Rx no</span>
                                    <span className="sub">3453</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">Din</span>
                                    <span className="sub">1234</span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main">Equiv. to</span>
                                    <span className="sub">+Calcium carbonate</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">Last Fill</span>
                                    <span className="sub">NA</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">Exp</span>
                                    <span className="sub">NA</span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main">Source</span>
                                    <span className="sub">Korla, lorem ispum</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">LU code</span>
                                    <span className="sub">NA</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">Indication</span>
                                    <span className="sub">NA</span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main">Direction</span>
                                    <span className="sub">As Dedication lorem ispum text lorem ispum lorem text</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">Order Type</span>
                                    <span className="sub">NA</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main"></span>
                                    <span className="sub"></span>
                                </div>
                            </div>
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">

                                </div>
                                <div className="resident-desc-box w-d-25">

                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="sub"><p className="order-tag red-tag">Discontinue</p></span>
                                </div>
                            </div>
                            <div className="inner-res-block mb-0 pb-15 align-center">
                                <div className="resident-desc-box wd24 p-relative">
                                    <img src={require("../../NursePrep/img/red-small-info.svg")} className="cusion-phy" />
                                    <span className="cusion-info">Cusion come here. </span>
                                </div>
                                <div className="resident-desc-box wd24">
                                    <div className="d-flex align-center">
                                        <img src={require("../../NursePrep/img/reminder.svg")} className="mr-5" />
                                        <span className="reminder-info">Set reminder </span>
                                    </div>
                                </div>
                                <div className="resident-desc-box wd24">
                                    <div className="p-relative align-item-center">
                                        <p className="note-numb">05</p>
                                        <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                        <span className="reminder-info">Notes </span>
                                    </div>
                                </div>
                                <div className="d-flex align-center">
                                    <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                    <span className="reminder-info">Add Notes </span>
                                </div>
                            </div>

                        </div>

                        <div className="ack-block">
                            <div class="round">
                                <input type="checkbox" id="checkbox1" />
                                <label for="checkbox1"></label>
                            </div>
                        </div>
                        <div className="ack-block">
                            <div class="round">
                                <input type="checkbox" id="checkbox2" />
                                <label for="checkbox2"></label>
                            </div>
                        </div>
                        <div className="ack-block">
                            <div class="round">
                                <input type="checkbox" id="checkbox3" />
                                <label for="checkbox3"></label>
                            </div>
                        </div>
                    </div>
                    {/* end white */}
                </div>
                {this.state.actionPopupRef && <ActionPopup visible={this.state.actionPopupRef}
                    onClosed={() => this.modalActionFn('actionPopupRef', false)}
                />}

            </div>
        </>)
    }
}
export default NurseBlock;