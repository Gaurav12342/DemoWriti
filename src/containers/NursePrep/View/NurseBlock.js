import React, { Component } from 'react'
import Dialog from 'rc-dialog';
import { Input, Search } from '../../../components/common/index';
import { isDrOrderView } from '../../../util/pmr';

class NurseBlock extends Component {
    render() {
        return (<>
            <div className="right-Nurse-prep">
                <div className="pro-title">
                    <h3>Nurse Prep is initiated by Jane, Stacy (RPN)</h3>
                    <div className="flex-block" onClick={() => this.props.setAddModalVisible(true)}>
                        <p className="green-bg mr-8">
                            <img src={require("../../NursePrep/img/plus.svg")} />
                        </p>
                        <span>Add New</span>
                    </div>
                </div>
                <div className="med_ack">
                    <div className='form_group search-box mb-0'>
                        <Search
                            allowClear={true}
                            // form = {form}
                            placeholder='Medication'
                            style={{ width: '165px' }}
                        />
                    </div>
                    {
                        isDrOrderView() ?
                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox2" />
                                    <label for="checkbox2"></label>
                                </div>
                                <span>Continue all orders</span>
                            </div> :
                            <div className="ack-block">
                                <div class="round">
                                    <input type="checkbox" id="checkbox2" />
                                    <label for="checkbox2"></label>
                                </div>
                                <span>Acknowledge all orders</span>
                            </div>
                    }


                </div>

                <div className="flex-block bb bt head-ack">
                    <div className="rate-box RPN-block"><span className="order-d-text">Order</span></div>
                    <div className="ack-block pt-10"><span>Ack</span></div>
                    <div className="ack-block pt-10"><span>Edit</span></div>
                </div>

                <div className="scroll-block">
                    {/* start white section */}
                    <div className="flex-block bb">
                        <div className="resident-detail rate-box">
                            <div className="inner-res-block">
                                <div className="resident-desc-box w-d-50">
                                    <span className="main">Order</span>
                                    <span className="sub">+Calcium carbonate 500gm CPL<p className="order-tag">Suspended</p></span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">Rx No</span>
                                    <span className="sub">123456</span>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <span className="main">DIN</span>
                                    <span className="sub">1323456</span>
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
                                <div className="resident-desc-box w-d-50 p-relative height-block">
                                    <img src={require("../../NursePrep/img/red-small-info.svg")} className="cc-text mr-5" />
                                    <span className="cusion-info">Cusion comes here. Cusion comes here. Cusion comes here. </span>
                                </div>
                                <div className="resident-desc-box d-f-e w-d-25">
                                    <div className="d-flex align-center">
                                        <img src={require("../../NursePrep/img/reminder.svg")} className="mr-5" />
                                        <span className="reminder-info">Set reminder </span>
                                    </div>
                                </div>
                                <div className="resident-desc-box w-d-25">
                                    <div className="p-relative mb-12 align-item-center">
                                        <p className="note-numb">05</p>
                                        <img src={require("../../NursePrep/img/notes.svg")} className="mr-5" />
                                        <span className="reminder-info">Notes </span>
                                    </div>
                                    <div className="d-flex align-center">
                                        <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                        <span className="reminder-info">Add Notes </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="ack-block">
                            <div className="pt-10"><img src={require("../../NursePrep/img/tick.svg")}/></div>
                        </div> */}
                        <div className="ack-block">
                            <div className="round"><input type="checkbox" id="checkbox1" />
                                <label for="checkbox1"></label>
                            </div>
                        </div>
                        <div className="ack-block">

                        </div>
                    </div>
                    {/* end*/}

                    {/* gray section */}

                    <div className="bg-gray">
                        <div className="flex-block">
                            <div className="resident-detail rate-box">
                                <div className="inner-res-block">
                                    <div className="resident-desc-box w-d-50">
                                        <span className="main">Order</span>
                                        <span className="sub">+Calcium carbonate 500gm CPL<p className="order-tag red-new-tag">New</p></span>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <span className="main">Rx No</span>
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
                                <div className="inner-res-block">
                                    <div className="resident-desc-box d-f-e w-d-50">
                                        <div className="flex-block"><p className="green-bg mr-5">
                                            <img src={require("../../NursePrep/img/plus.svg")} /></p>
                                            <span>Add Causion</span>
                                        </div>
                                    </div>
                                    <div className="resident-desc-box d-f-e w-d-25">
                                        <div className="d-flex align-center">
                                            <img src={require("../../NursePrep/img/reminder.svg")} className="mr-5" />
                                            <span className="reminder-info">Set reminder </span>
                                        </div>
                                    </div>
                                    <div className="resident-desc-box w-d-25">
                                        <div className="p-relative mb-12 align-item-center">
                                            <p className="note-numb">05</p>
                                            <img src={require("../../NursePrep/img/notes.svg")} className="mr-5" />
                                            <span className="reminder-info">Notes </span>
                                        </div>
                                        <div className="d-flex align-center">
                                            <img src={require("../../NursePrep/img/add-notes.svg")} className="mr-5" />
                                            <span className="reminder-info">Add Notes </span>
                                        </div>
                                    </div>
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
                    </div>
                    {/* end */}
                </div>

            </div>
        </>)
    }
}
export default NurseBlock;