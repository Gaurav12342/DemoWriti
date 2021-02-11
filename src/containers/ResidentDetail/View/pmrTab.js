import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import VirtualVisitPopup from '../View/popup/virtual-visit-popup';
import RequestVisitPopup from '../View/popup/request-visit-popup';
import VVRequestDetail from '../View/popup/v-v-request-detail';
import VVAttachment from '../View/popup/v-v-attachments-popup';
import { Filters, Edit, Attachments, Clarification, CancelVisit, GroupCall, OneOnOneCall, StartVisit, Help } from '../../../assets/images/resident-detail/index';
import { Refresh, View, Notes, Reminder, MoreDots, Audit } from '../../../assets/images/pmr/index';
import { FirstPage, LastPage, Next, Prev } from '../../../assets/images/index';

import '../../../../node_modules/rc-datepicker/lib/style.css';
import { DatePickerInput } from "../../../../node_modules/rc-datepicker";

class pmrTab extends Component {

    constructor(props) {
        super(props);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate());
        this.state = {
            yesterday,
            value: null,
        };
    }
    resetState = () => this.setState({ value: null });

    render() {
        return (
            <>

                <div className="resi_treat_content_wrap virtual_visit pmr_tab">
                
                    <div className="responsive_scroll_wrap">
                        <div className="patient_order_wrap">
                            <div className="patient_order_head">
                                <div className="p_head sr">
                                    <div className="p_head_container">
                                        <span>Sr. No.</span>
                                    </div>
                                </div>
                                <div className="p_head ph">
                                    <div className="p_head_container">
                                        <span>Physician</span>
                                    </div>
                                </div>
                                <div className="p_head pno">
                                    <div className="p_head_container">
                                        <span>PMR No</span>
                                    </div>
                                </div>
                                <div className="p_head pr">
                                    <div className="p_head_container">
                                        <span>PMR Range</span>
                                    </div>
                                </div>
                                <div className="p_head dd">
                                    <div className="p_head_container">
                                        <span>Due Date</span>
                                    </div>
                                </div>
                                <div className="p_head phr">
                                    <div className="p_head_container">
                                        <span>Phm Review</span>
                                    </div>
                                </div>

                                <div className="p_head st">
                                    <div className="p_head_container">
                                        <span>Status</span>
                                        <Filters />
                                    </div>
                                </div>
                                <div className="p_head ac">
                                    <div className="p_head_container j-space-between">
                                        <span>Actions</span>
                                        <div className="refresh">
                                            <a>
                                                <Refresh />
                                            </a>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="scroll_wrapper"> */}
                            {/* visit start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>01</span>
                                    </div>
                                    <div className="patient_order_d ph">
                                        <span>Dr. Osvaldo Ardiles</span>
                                    </div>
                                    <div className="patient_order_d pno">
                                        <span>PMR 123456</span>
                                    </div>
                                    <div className="patient_order_d pr">
                                        <span>
                                            From 01st May 2020
                                                            </span>
                                        <span>
                                            to 31st Jul 2020
                                                            </span>
                                    </div>
                                    <div className="patient_order_d dd">
                                        <span>
                                            23rd Apr 2020
                                                            </span>
                                        <span>
                                            Due in 5 Days
                                                            </span>
                                    </div>
                                    <div className="patient_order_d phr light-green-text">
                                        <a>View</a>
                                    </div>
                                    <div className="patient_order_d st submitted">
                                        <span className="ph-r-t blue-color ">
                                            Physician Review
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Reminder />
                                                <p>Reminder</p>
                                                <span className="rem tot green-bg">05</span>
                                            </a>
                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                            </a>


                                            <a className="more">
                                                <MoreDots />
                                                <div className="more_wrap">

                                                    <a>
                                                        <Clarification />
                                                        <span>Clarification</span>
                                                    </a>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* visit end*/}


                            {/* visit start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>02</span>
                                    </div>
                                    <div className="patient_order_d ph">
                                        <span>Dr. Osvaldo Ardiles</span>
                                    </div>
                                    <div className="patient_order_d pno">
                                        <span>PMR 123456</span>
                                    </div>
                                    <div className="patient_order_d pr">
                                        <span>
                                            From 01st May 2020
                                                            </span>
                                        <span>
                                            to 31st Jul 2020
                                                            </span>
                                    </div>
                                    <div className="patient_order_d dd">
                                        <span className="color-red">
                                            23rd Apr 2020
                                                            </span>
                                        <span className="color-red">
                                            Due in 5 Days
                                                            </span>
                                    </div>
                                    <div className="patient_order_d phr">
                                        <a>-</a>
                                    </div>
                                    <div className="patient_order_d st submitted">
                                        <span className="ph-r-t pink-color">
                                            Nurse Prep
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Reminder />
                                                <p>Reminder</p>
                                                <span className="rem tot green-bg">05</span>
                                            </a>
                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                            </a>


                                            <a className="more">
                                                <MoreDots />
                                                <div className="more_wrap">
                                                    <a>
                                                        <Clarification />
                                                        <span>Clarification</span>
                                                    </a>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* visit end*/}

                            {/* visit start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>03</span>
                                    </div>
                                    <div className="patient_order_d ph">
                                        <span>Dr. Osvaldo Ardiles</span>
                                    </div>
                                    <div className="patient_order_d pno">
                                        <span>PMR 123456</span>
                                    </div>
                                    <div className="patient_order_d pr">
                                        <span>
                                            From 01st May 2020
                                                            </span>
                                        <span>
                                            to 31st Jul 2020
                                                            </span>
                                    </div>
                                    <div className="patient_order_d dd">
                                        <span>
                                            23rd Apr 2020
                                                            </span>
                                        <span>
                                            Due in 5 Days
                                                            </span>
                                    </div>
                                    <div className="patient_order_d phr light-green-text">
                                        <a>View</a>
                                    </div>
                                    <div className="patient_order_d st submitted">
                                        <span className="ph-r-t pink-color">
                                            Nurse Prep
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Reminder />
                                                <p>Reminder</p>
                                                <span className="rem tot green-bg">05</span>
                                            </a>
                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                            </a>


                                            <a className="more">
                                                <MoreDots />
                                                <div className="more_wrap">
                                                    <a>
                                                        <Clarification />
                                                        <span>Clarification</span>
                                                    </a>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* visit end*/}


                            {/* visit start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>04</span>
                                    </div>
                                    <div className="patient_order_d ph">
                                        <span>Dr. Osvaldo Ardiles</span>
                                    </div>
                                    <div className="patient_order_d pno">
                                        <span>PMR 123456</span>
                                    </div>
                                    <div className="patient_order_d pr">
                                        <span>
                                            From 01st May 2020
                                                            </span>
                                        <span>
                                            to 31st Jul 2020
                                                            </span>
                                    </div>
                                    <div className="patient_order_d dd">
                                        <span className="color-red">
                                            23rd Apr 2020
                                                            </span>
                                        <span className="color-red">
                                            Due in 5 Days
                                                            </span>
                                    </div>
                                    <div className="patient_order_d phr light-green-text">
                                        <a>View</a>
                                    </div>
                                    <div className="patient_order_d st">
                                        <span className="ph-r-t o_status submitted">
                                            To Do
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Reminder />
                                                <p>Reminder</p>
                                                <span className="rem tot green-bg">05</span>
                                            </a>
                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                            </a>


                                            <a className="more">
                                                <MoreDots />
                                                <div className="more_wrap">
                                                    <a>
                                                        <Clarification />
                                                        <span>Clarification</span>
                                                    </a>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* visit end*/}


                            {/* visit start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>05</span>
                                    </div>
                                    <div className="patient_order_d ph">
                                        <span>Dr. Osvaldo Ardiles</span>
                                    </div>
                                    <div className="patient_order_d pno">
                                        <span>PMR 123456</span>
                                    </div>
                                    <div className="patient_order_d pr">
                                        <span>
                                            From 01st May 2020
                                                            </span>
                                        <span>
                                            to 31st Jul 2020
                                                            </span>
                                    </div>
                                    <div className="patient_order_d dd">
                                        <span>
                                            23rd Apr 2020
                                                            </span>
                                        <span>
                                            Due in 5 Days
                                                            </span>
                                    </div>
                                    <div className="patient_order_d phr">
                                        <a>-</a>
                                    </div>
                                    <div className="patient_order_d st submitted">
                                        <span className="ph-r-t blue-color">
                                            Physician Review
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Reminder />
                                                <p>Reminder</p>
                                                <span className="rem tot green-bg">05</span>
                                            </a>
                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                            </a>


                                            <a className="more">
                                                <MoreDots />
                                                <div className="more_wrap">

                                                    <a>
                                                        <Clarification />
                                                        <span>Clarification</span>
                                                    </a>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* visit end*/}

                            {/* visit start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>06</span>
                                    </div>
                                    <div className="patient_order_d ph">
                                        <span>Dr. Osvaldo Ardiles</span>
                                    </div>
                                    <div className="patient_order_d pno">
                                        <span>PMR 123456</span>
                                    </div>
                                    <div className="patient_order_d pr">
                                        <span>
                                            From 01st May 2020
                                                            </span>
                                        <span>
                                            to 31st Jul 2020
                                                            </span>
                                    </div>
                                    <div className="patient_order_d dd">
                                        <span>
                                            23rd Apr 2020
                                                            </span>
                                        <span>
                                            Due in 5 Days
                                                            </span>
                                    </div>
                                    <div className="patient_order_d phr">
                                        <a>-</a>
                                    </div>
                                    <div className="patient_order_d st">
                                        <span className="ph-r-t o_status submitted">
                                            To Do
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Reminder />
                                                <p>Reminder</p>
                                                <span className="rem tot green-bg">05</span>
                                            </a>
                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                            </a>


                                            <a className="more">
                                                <MoreDots />
                                                <div className="more_wrap">

                                                    <a>
                                                        <Clarification />
                                                        <span>Clarification</span>
                                                    </a>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* visit end*/}




                            {/* </div> */}

                        </div>
                    </div>
                    <div className="pagination_wrap">
                        <div className="showing">
                            Showing 01 to 06 of 1000 entries
                                                </div>
                        <div className="pagination">
                            <a><FirstPage /></a>
                            <a><Prev /></a>
                            <a className="active_page">01</a>
                            <a>02</a>
                            <a>03</a>
                            <a>04</a>
                            <a>05</a>
                            <a><Next /></a>
                            <a><LastPage /></a>
                        </div>
                    </div>

                    {this.state.virtualVisitPopupRef && <VirtualVisitPopup visible={this.state.virtualVisitPopupRef}
                        onClosed={() => this.modalActionFn('virtualVisitPopupRef', false)}
                    />}
                    {this.state.requestPopupRef && <RequestVisitPopup visible={this.state.requestPopupRef}
                        onClosed={() => this.modalActionFn('requestPopupRef', false)}
                    />}
                    {this.state.requestDetailPopupRef && <VVRequestDetail visible={this.state.requestDetailPopupRef}
                        onClosed={() => this.modalActionFn('requestDetailPopupRef', false)}
                    />}
                    {this.state.requestAttachmentPopupRef && <VVAttachment visible={this.state.requestAttachmentPopupRef}
                        onClosed={() => this.modalActionFn('requestAttachmentPopupRef', false)}
                    />}

                    {/* <VirtualVisitPopup ref={this.virtualVisitPopupRef}/>
                <RequestVisitPopup ref={this.requestPopupRef}/>
                <VVRequestDetail ref={this.requestDetailPopupRef}/>
                <VVAttachment ref={this.requestAttachmentPopupRef}/> */}
                </div>
            </>)
    }
}
export default createForm()(pmrTab);