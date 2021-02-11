import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import VirtualVisitPopup from '../View/popup/virtual-visit-popup';
import RequestVisitPopup from '../View/popup/request-visit-popup';
import VVRequestDetail from '../View/popup/v-v-request-detail';
import VVAttachment from '../View/popup/v-v-attachments-popup';
import { Filters, Edit, Clarification, Attachments, CancelVisit, GroupCall, OneOnOneCall, StartVisit, Help } from '../../../assets/images/resident-detail/index';
// import { ReactComponent as Filters } from '../../../assets/images/resident-detail/options-filters.svg';
// import { ReactComponent as Edit } from '../../../assets/images/resident-detail/edit.svg';
// import { ReactComponent as Clarification } from '../../../assets/images/resident-detail/clarification.svg';
// import { ReactComponent as Attachments } from '../../../assets/images/resident-detail/attachments.svg';
// import { ReactComponent as CancelVisit } from '../../../assets/images/resident-detail/cancel-visit.svg';
// import { ReactComponent as GroupCall } from '../../../assets/images/resident-detail/group-call.svg';
// import { ReactComponent as OneOnOneCall } from '../../../assets/images/resident-detail/one-on-one-call.svg';
// import { ReactComponent as StartVisit } from '../../../assets/images/resident-detail/start-visit.svg';
// import { ReactComponent as Help } from '../../../assets/images/resident-detail/help.svg';
import { Refresh, View, Notes, MoreDots } from '../../../assets/images/pmr/index';
// import { ReactComponent as Refresh } from '../../../assets/images/pmr/refresh.svg';
// import { ReactComponent as View } from '../../../assets/images/pmr/view.svg';
// import { ReactComponent as Notes } from '../../../assets/images/pmr/notes.svg';
// import { ReactComponent as MoreDots } from '../../../assets/images/pmr/more-dots.svg';
import { FirstPage, LastPage, Next, Prev } from '../../../assets/images/index';
// import { ReactComponent as FirstPage } from '../../../assets/images/first-page.svg';
// import { ReactComponent as LastPage } from '../../../assets/images/last-page.svg';
// import { ReactComponent as Next } from '../../../assets/images/next.svg';
// import { ReactComponent as Prev } from '../../../assets/images/previous.svg';

import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
    DatePicker,
    DatePickerInput,
} from "../../../../node_modules/rc-datepicker";
import Tooltip from "../../../../node_modules/rc-tooltip";
import "../../../../node_modules/rc-tooltip/assets/bootstrap.css";
import { TabPanel } from 'react-tabs';
import { tabData } from "../../../components/common/Tab/data";
import CommonTab from "../../../components/common/Tab";
import TogglePane from "./togglePane";


class VirtualVisitTab extends Component {

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
    /* start virtual-visit popup */
    state = {
        virtualVisitPopupRef: false,
        onVirtualVisitPopupClick: false,
    }
    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
    }
    // virtualVisitPopupRef = ({ handleOpenModal }) => {
    //     this.showModal = handleOpenModal;
    // }

    // onVirtualVisitPopupClick = () => {
    //     this.showModal();
    // }
    /* end virtual-visit popup */

    /* start request popup */
    state = {
        requestPopupRef: false,
        onRequestPopupClick: false,
    }
    // requestPopupRef = ({ handleOpenModal }) => {
    //     this.show1Modal = handleOpenModal;
    // }

    // onRequestPopupClick = () => {
    //     this.show1Modal();
    // }
    /* end request popup */

    /* start vv-request popup */
    state = {
        requestDetailPopupRef: false,
        onRequestVisitPopupClick: false,
    }
    // requestDetailPopupRef = ({ handleOpenModal }) => {
    //     this.show2Modal = handleOpenModal;
    // }

    // onRequestVisitPopupClick = () => {
    //     this.show2Modal();
    // }
    /* end vv-request popup */

    /* start vv-attachment popup */
    state = {
        requestAttachmentPopupRef: false,
        onRequestAttachPopupClick: false,
    }
    // requestAttachmentPopupRef = ({ handleOpenModal }) => {
    //     this.show3Modal = handleOpenModal;
    // }

    // onRequestAttachPopupClick = () => {
    //     this.show3Modal();
    // }
    /* end vv-attachment popup */


    static propTypes = {
        form: formShape,
    };

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        let errors;
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
        return (<>

            <div className="resi_treat_content_wrap virtual_visit">
                <form action="">
                    <div className="form_wrap">
                        <div className="components pl-0">
                            <div className="ui input">
                                <DatePickerInput
                                    displayFormat="DD/MM/YYYY"
                                    returnFormat="YYYY-MM-DD"
                                    className="my-react-component"
                                    defaultValue={this.state.yesterday}
                                    showOnInputClick
                                    placeholder="placeholder"
                                    locale="de"
                                    iconClassName="calendar icon"
                                />
                            </div>
                        </div>
                        <div className="components">
                            <select className="inputForm select" placeholder="">
                                <option value="">
                                    Select Physician
                                                            </option>
                                <option value="">
                                    Physician Review
                                                            </option>
                                <option value="">
                                    Nurse Prep
                                                            </option>
                                <option value="">
                                    To Do
                                                            </option>
                            </select>
                        </div>

                        <div className="components search">
                            <input type="text" placeholder="Search by Rx No." className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>
                        <div className="components">
                            <input type="text" placeholder="Billing Codes" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>
                        <div className="components">
                            <input type="text" placeholder="Outcome Reason" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>
                        <div className="components">
                            <input type="text" placeholder="Primary Reason" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>

                    </div>
                </form>
                {/* <div className="responsive_scroll_wrap">
                    <div className="patient_order_wrap">
                        <div className="patient_order_head">
                            <div className="p_head sr">
                                <div className="p_head_container">
                                    <span>Sr. No.</span>
                                </div>
                            </div>
                            <div className="p_head vw">
                                <div className="p_head_container">
                                    <span>Visit With</span>
                                </div>
                            </div>
                            <div className="p_head rq">
                                <div className="p_head_container">
                                    <span>Requested By</span>
                                </div>
                            </div>
                            <div className="p_head sh">
                                <div className="p_head_container">
                                    <span>Scheduled On</span>
                                </div>
                            </div>
                            <div className="p_head vd">
                                <div className="p_head_container">
                                    <span>Visit Date & Time</span>
                                </div>
                            </div>

                            <div className="p_head st">
                                <div className="p_head_container">
                                    <span>
                                        Status</span>
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
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>01</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status">
                                        Upcoming
                                                            </span>
                                    <GroupCall />

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestPopupRef', true)}>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>02</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status">
                                        Cancelled
                                                            </span>
                                    <OneOnOneCall />

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestPopupRef', true)}>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>03</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status with_help rejected">
                                        Rejected
                                        <Tooltip overlay="Physician not available" placement="top">
                                            <Help />
                                        </Tooltip>


                                    </span>
                                    <div className="with_help reschdule">
                                        <OneOnOneCall />
                                        <a onClick={() => this.modalActionFn('requestPopupRef', true)}>
                                            Reschedule</a>
                                    </div>

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestPopupRef', true)}>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>04</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status with_help completed">
                                        Completed
                                                                </span>

                                    <GroupCall />


                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestPopupRef', true)}>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>05</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status">
                                        Pending Authorization
                                                            </span>
                                    <GroupCall />

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestPopupRef', true)}>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>05</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status">
                                        Pending Authorization
                                                            </span>
                                    <GroupCall />

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>05</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status">
                                        Pending Authorization
                                                            </span>
                                    <GroupCall />

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>05</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status">
                                        Pending Authorization
                                                            </span>
                                    <GroupCall />

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>05</span>
                                </div>
                                <div className="patient_order_d vw">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d rq">
                                    <span>Kim Fischer</span>
                                </div>
                                <div className="patient_order_d sh">
                                    <span>
                                        25th Apr 2020
                                                            </span>
                                    <span>
                                        04:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d vd std_order">
                                    <span>
                                        22nd Aug 2020
                                                            </span>
                                    <span>
                                        12:00 pm to 1:00 pm
                                                            </span>
                                </div>
                                <div className="patient_order_d st call_type">

                                    <span className="o_status">
                                        Pending Authorization
                                                            </span>
                                    <GroupCall />

                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>
                                            <View />
                                            <p>View Details</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('requestDetailPopupRef', true)}>
                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a>
                                            <StartVisit />
                                            <p>Start Visit</p>
                                        </a>
                                        <a>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>



                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a onClick={() => this.modalActionFn('requestAttachmentPopupRef', true)}>
                                                    <Attachments />
                                                    <span>Attachments <span className="nos">05</span></span>
                                                </a>
                                                <a>
                                                    <CancelVisit />
                                                    <span>Cancel Visit</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Chat</span>
                                                </a>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>
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
                />} */}


                {/* <VirtualVisitPopup ref={this.virtualVisitPopupRef} />
                <RequestVisitPopup ref={this.requestPopupRef} />
                <VVRequestDetail ref={this.requestDetailPopupRef} />
                <VVAttachment ref={this.requestAttachmentPopupRef} /> */}
            </div>
        </>)
    }
}
export default createForm()(VirtualVisitTab);