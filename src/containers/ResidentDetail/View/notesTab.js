import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import VirtualVisitPopup from './popup/virtual-visit-popup';
import RequestVisitPopup from './popup/request-visit-popup';
import VVRequestDetail from './popup/v-v-request-detail';
import VVAttachment from './popup/v-v-attachments-popup';
import EditNotesPopup from '../../../components/common/Popup/editnotes-popup';
import DeleteNotesPopup from '../../../components/common/Popup/deletenotes-popup';
import { Filters, DetailsMore, DelNotes, Clarification, Attachments, GroupCall, Edit, CancelVisit, Help, OneOnOneCall, StartVisit } from '../../../assets/images/resident-detail/index';
import { Refresh, View, Notes, MoreDots, Audit, Reminder } from '../../../assets/images/pmr/index';
import { FirstPage, LastPage, Next, Prev } from '../../../assets/images/index';

import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
    DatePicker,
    DatePickerInput,
} from "../../../../node_modules/rc-datepicker";
import { TabPanel } from 'react-tabs';
import { tabData } from "../../../components/common/Tab/data";
import CommonTab from "../../../components/common/Tab";
import TogglePane from "./togglePane";


class NotesTab extends Component {
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

    /* start request popup */
    state = {
        requestPopupRef: false,
        onRequestPopupClick: false,
    }
    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
    }
    // requestPopupRef = ({handleOpenModal}) => {
    //     this.show1Modal = handleOpenModal;
    //   }

    //   onRequestPopupClick = () => {
    //    this.show1Modal();
    //   }
    /* end request popup */

    /* start vv-request popup */
    state = {
        requestDetailPopupRef: false,
        onRequestVisitPopupClick: false,
    }
    // requestDetailPopupRef = ({handleOpenModal}) => {
    //     this.show2Modal = handleOpenModal;
    //   }

    //   onRequestVisitPopupClick = () => {
    //    this.show2Modal();
    //   }
    /* end vv-request popup */

    /* start vv-attachment popup */
    state = {
        requestAttachmentPopupRef: false,
        onRequestAttachPopupClick: false,
    }
    // requestAttachmentPopupRef = ({handleOpenModal}) => {
    //     this.show3Modal = handleOpenModal;
    //   }

    //   onRequestAttachPopupClick = () => {
    //    this.show3Modal();
    //   }
    /* end vv-attachment popup */

    /* start edit notes popup */
    state = {
        editPopupRef: false,
        onEditNotesPopupClick: false,
    }
    //  editPopupRef = ({handleOpenModal}) => {
    //     this.editNotesModal = handleOpenModal;
    //   }

    //   onEditNotesPopupClick = () => {
    //    this.editNotesModal();
    //   }
    /* end edit notes popup */

    /* start delete notes popup */
    state = {
        deletePopupRef: false,
        onDeleteNotesPopupClick: false,
    }
    //  deletePopupRef = ({handleOpenModal}) => {
    //     this.deleteModal = handleOpenModal;
    //   }

    //   onDeleteNotesPopupClick = () => {
    //    this.deleteModal();
    //   }
    /* end delete notes popup */


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

            <div className="resi_treat_content_wrap virtual_visit xray_tab notes_tab">
                <form action="">
                    <div className="form_wrap">
                        <div className="components">
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
                        <div className="components search">
                            <input type="text" placeholder="Created By" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>

                        <div className="components">
                            <select className="inputForm select" placeholder="">
                                <option value="">
                                    Note Type
                                                            </option>
                                <option value="">
                                    Note Type 1
                                                            </option>
                                <option value="">
                                    Note Type 2
                                                            </option>
                                <option value="">
                                    Note Type 3
                                                            </option>
                            </select>
                        </div>
                        <div className="components">
                            <select className="inputForm select" placeholder="">
                                <option value="">
                                    Type of Document
                                                            </option>
                                <option value="">
                                    Type of Document 1
                                                            </option>
                                <option value="">
                                    Type of Document 2
                                                            </option>
                                <option value="">
                                    Type of Document 2
                                                            </option>
                            </select>
                        </div>
                        <div className="components">
                            <select className="inputForm select" placeholder="">
                                <option value="">
                                    Priority
                                                            </option>
                                <option value="">
                                    High
                                                            </option>
                                <option value="">
                                    Normal
                                                            </option>

                            </select>
                        </div>



                    </div>
                </form>
                <div className="responsive_scroll_wrap">
                    <div className="patient_order_wrap">
                        <div className="patient_order_head">
                            <div className="p_head sr">
                                <div className="p_head_container">
                                    <span>Sr. No.</span>
                                </div>
                            </div>
                            <div className="p_head ad">
                                <div className="p_head_container">
                                    <span>Associated Doc.</span>
                                </div>
                            </div>
                            <div className="p_head cb">
                                <div className="p_head_container">
                                    <span> Created By</span>
                                </div>
                            </div>
                            <div className="p_head dt">
                                <div className="p_head_container">
                                    <span>Date & Time</span>
                                </div>
                            </div>
                            <div className="p_head no">
                                <div className="p_head_container">
                                    <span>Note</span>
                                </div>
                            </div>
                            <div className="p_head nt">
                                <div className="p_head_container">
                                    <span>Note Type</span>
                                </div>
                            </div>

                            <div className="p_head st">
                                <div className="p_head_container">
                                    <span>Priority</span>
                                    <Filters />
                                </div>
                            </div>
                            <div className="p_head ac">
                                <div className="p_head_container j-space-between">
                                    <span> Actions</span>
                                    <div className="refresh">
                                        <a>
                                            <Refresh />
                                        </a>
                                        <a>
                                            <DetailsMore />
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
                                    <span className="pcc-tg">CLINICAL</span>
                                </div>
                                <div className="patient_order_d ad">
                                    <span>Rx Orders </span>
                                    <span className="light-green-text">Rx 123456</span>
                                </div>
                                <div className="patient_order_d cb">
                                    <span>Nurse Patrick Jane</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>
                                        01st May 2020
                                                            </span>
                                    <span>
                                        09:53 am
                                                            </span>
                                </div>
                                <div className="patient_order_d no">
                                    <span>
                                        Lorem Ipsum is a dummy text Lorem
                                                            </span>
                                    <span>
                                        Ipsum is a dummy text. Lorem Ips...
                                                            </span>
                                </div>
                                <div className="patient_order_d nt">
                                    <a>Note Type 1</a>
                                </div>
                                <div className="patient_order_d st submitted">
                                    <span className="ph-r-t red-color">
                                        High
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('deletePopupRef', true)}>
                                            <DelNotes />
                                            <p>Delete Note</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('editPopupRef', true)}>
                                            <Clarification />
                                            <p>Clarification</p>
                                        </a>


                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
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
                        {/* visit end*/}

                        {/* visit start*/}
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>02</span>
                                    <span className="pcc-tg">PCC</span>
                                </div>
                                <div className="patient_order_d ad">
                                    <span>PMR</span>
                                    <span className="light-green-text"> 123456</span>
                                </div>
                                <div className="patient_order_d cb">
                                    <span>Nurse Patrick Jane</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>
                                        01st May 2020
                                                            </span>
                                    <span>
                                        09:53 am
                                                            </span>
                                </div>
                                <div className="patient_order_d no">
                                    <span>
                                        Lorem Ipsum is a dummy text Lorem
                                                            </span>
                                    <span>
                                        Ipsum is a dummy text. Lorem Ips...
                                                            </span>
                                </div>
                                <div className="patient_order_d nt">
                                    <a>Note Type 1</a>
                                </div>
                                <div className="patient_order_d st submitted">
                                    <span className="ph-r-t blue-color">
                                        Normal
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('deletePopupRef', true)}>
                                            <Notes />
                                            <p>Delete Note</p>
                                        </a>
                                        <a>
                                            <Clarification />
                                            <p>Clarification</p>
                                        </a>


                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
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
                        {/* visit end*/}

                        {/* visit start*/}
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>03</span>
                                </div>
                                <div className="patient_order_d ad">
                                    <span>Resident Document </span>
                                    <span className="light-green-text">End of life orders</span>
                                </div>
                                <div className="patient_order_d cb">
                                    <span>Nurse Patrick Jane</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>
                                        01st May 2020
                                                            </span>
                                    <span>
                                        09:53 am
                                                            </span>
                                </div>
                                <div className="patient_order_d no">
                                    <span>
                                        Lorem Ipsum is a dummy text Lorem
                                                            </span>
                                    <span>
                                        Ipsum is a dummy text. Lorem Ips...
                                                            </span>
                                </div>
                                <div className="patient_order_d nt">
                                    <a>Note Type 1</a>
                                </div>
                                <div className="patient_order_d st submitted">
                                    <span className="ph-r-t blue-color">
                                        Normal
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('deletePopupRef', true)}>
                                            <Notes />
                                            <p>Delete Note</p>
                                        </a>
                                        <a>
                                            <Clarification />
                                            <p>Clarification</p>
                                        </a>


                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
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
                        {/* visit end*/}

                        {/* visit start*/}
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>04</span>
                                </div>
                                <div className="patient_order_d ad">
                                    <span>PMR </span>
                                    <span className="light-green-text"> 123456</span>
                                </div>
                                <div className="patient_order_d cb">
                                    <span>Nurse Patrick Jane</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>
                                        01st May 2020
                                                            </span>
                                    <span>
                                        09:53 am
                                                            </span>
                                </div>
                                <div className="patient_order_d no">
                                    <span>
                                        Lorem Ipsum is a dummy text Lorem
                                                            </span>
                                    <span>
                                        Ipsum is a dummy text. Lorem Ips...
                                                            </span>
                                </div>
                                <div className="patient_order_d nt">
                                    <a>Note Type 1</a>
                                </div>
                                <div className="patient_order_d st submitted">
                                    <span className="ph-r-t blue-color">
                                        Normal
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('deletePopupRef', true)}>
                                            <Notes />
                                            <p>Delete Note</p>
                                        </a>
                                        <a>
                                            <Clarification />
                                            <p>Clarification</p>
                                        </a>


                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
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
                        {/* visit end*/}

                        {/* visit start*/}
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>05</span>
                                </div>
                                <div className="patient_order_d ad">
                                    <span>Resident Document  </span>
                                    <span className="light-green-text">End of life orders</span>
                                </div>
                                <div className="patient_order_d cb">
                                    <span>Nurse Patrick Jane</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>
                                        01st May 2020
                                                            </span>
                                    <span>
                                        09:53 am
                                                            </span>
                                </div>
                                <div className="patient_order_d no">
                                    <span>
                                        Lorem Ipsum is a dummy text Lorem
                                                            </span>
                                    <span>
                                        Ipsum is a dummy text. Lorem Ips...
                                                            </span>
                                </div>
                                <div className="patient_order_d nt">
                                    <a>Note Type 1</a>
                                </div>
                                <div className="patient_order_d st submitted">
                                    <span className="ph-r-t blue-color">
                                        Normal
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('deletePopupRef', true)}>
                                            <Notes />
                                            <p>Delete Note</p>
                                        </a>
                                        <a>
                                            <Clarification />
                                            <p>Clarification</p>
                                        </a>


                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
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
                        {/* visit end*/}

                        {/* visit start*/}
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>06</span>
                                </div>
                                <div className="patient_order_d ad">
                                    <span>PMR </span>
                                    <span className="light-green-text">123456</span>
                                </div>
                                <div className="patient_order_d cb">
                                    <span>Nurse Patrick Jane</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>
                                        01st May 2020
                                                            </span>
                                    <span>
                                        09:53 am
                                                            </span>
                                </div>
                                <div className="patient_order_d no">
                                    <span>
                                        Lorem Ipsum is a dummy text Lorem
                                                            </span>
                                    <span>
                                        Ipsum is a dummy text. Lorem Ips...
                                                            </span>
                                </div>
                                <div className="patient_order_d nt">
                                    <a>Note Type 1</a>
                                </div>
                                <div className="patient_order_d st submitted">
                                    <span className="ph-r-t blue-color">
                                        Normal
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('virtualVisitPopupRef', true)}>

                                            <Edit />
                                            <p>Edit</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('deletePopupRef', true)}>
                                            <Notes />
                                            <p>Delete Note</p>
                                        </a>
                                        <a>
                                            <Clarification />
                                            <p>Clarification</p>
                                        </a>


                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
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


                {this.state.requestPopupRef && <RequestVisitPopup visible={this.state.requestPopupRef}
                    onClosed={() => this.modalActionFn('requestPopupRef', false)}
                />}
                {this.state.editPopupRef && <EditNotesPopup visible={this.state.editPopupRef}
                    onClosed={() => this.modalActionFn('editPopupRef', false)}
                />}
                {this.state.deletePopupRef && <DeleteNotesPopup visible={this.state.deletePopupRef}
                    onClosed={() => this.modalActionFn('deletePopupRef', false)}
                />}
                {this.state.requestDetailPopupRef && <VVRequestDetail visible={this.state.requestDetailPopupRef}
                    onClosed={() => this.modalActionFn('requestDetailPopupRef', false)}
                />}
                {this.state.requestAttachmentPopupRef && <VVAttachment visible={this.state.requestAttachmentPopupRef}
                    onClosed={() => this.modalActionFn('requestAttachmentPopupRef', false)}
                />}


                {/* <RequestVisitPopup ref={this.requestPopupRef}/>
                <VVRequestDetail ref={this.requestDetailPopupRef}/>
                <VVAttachment ref={this.requestAttachmentPopupRef}/>
                <EditNotesPopup ref={this.editPopupRef}/>
                <DeleteNotesPopup ref={this.deletePopupRef}/> */}
            </div>
        </>)
    }
}
export default createForm()(NotesTab);