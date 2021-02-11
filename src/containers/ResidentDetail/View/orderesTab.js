import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import { Filters, DetailsLess, VerbalOrder, Todo, Cancel, Clarification, Edit } from '../../../assets/images/resident-detail/index';
import { Refresh, View, Notes, Reminder, MoreDots, Audit } from '../../../assets/images/pmr/index';
import { FirstPage, LastPage, Next, Prev } from '../../../assets/images/index';

import AddNotesPopup from '../../../components/common/Popup/addnotes-popup';
import AuditPopup from '../../../components/common/Popup/audit-popup';
import ViewNotesPopup from '../../../components/common/Popup/viewnotes-popup';
import ClarificationPopup from '../View/popup/Clarification';
import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
    DatePicker,
    DatePickerInput,
} from "../../../../node_modules/rc-datepicker";
import { TabPanel } from 'react-tabs';
import { tabData } from "../../../components/common/Tab/data";
import CommonTab from "../../../components/common/Tab";
import TogglePane from "./togglePane";
import Spin from "../../../components/common/Spin";

class OrderTab extends Component {
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
    state = {
        addNotesPopupRef: false,
        onAddNotesPopupClick: false,
        auditPopupRef: false,
        onAuditPopupClick: false,
        viewPopupRef: false,
        onViewPopupClick: false,
        clarificationRef: false
    }
    // state = {
    //     addNoteModal: false,
    //     viewNoteModal: false,
    //     auditModal: false
    // }

    /* start add notes popup */
    // addNotesPopupRef = ({ handleOpenModal }) => {
    //     this.addNotesModal = handleOpenModal;
    // }

    // onAddNotesPopupClick = () => {
    //     this.addNotesModal();
    // }
    /* end add notes popup */

    /* start audit popup */
    // auditPopupRef = ({ }) => {
    //     // this.auditModal = handleOpenModal;
    // }

    // onAuditPopupClick = () => {
    //     this.auditModal();
    // }
    /* end audit popup */

    /* start view notes popup */
    // viewPopupRef = ({ }) => {
    //     // this.viewModal = handleOpenModal;
    // }

    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
    }

    // onViewPopupClick = () => {
    //     this.viewModal();
    // }
    /* end view notes popup */

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

            <div className="resi_treat_content_wrap">
                {/* <Spin spinning={true} colorCode={"#609fae"} str={"overlay center"}></Spin> */}


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
                            <input type="text" placeholder="Search by PMR Resident" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>

                    </div>
                </form>
                <div className="responsive_scroll_wrap">
                    <div className="patient_order_wrap od_tab_temp">
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
                            <div className="p_head dt">
                                <div className="p_head_container">
                                    <span>Date & Time</span>
                                </div>

                            </div>
                            <div className="p_head ot">
                                <div className="p_head_container">
                                    <span>Order Type</span>
                                    <Filters />
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
                                        <a>
                                            <DetailsLess />
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="scroll_wrapper"> */}
                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>01</span>
                                </div>
                                <div className="patient_order_d ph">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>25th Apr 2020 | 09:53 am</span>
                                </div>
                                <div className="patient_order_d ot ">
                                    <div className="ot_container">
                                        <VerbalOrder />
                                        <span className="o_status std_order">
                                            Standing Order
                                                            </span>
                                    </div>
                                </div>
                                <div className="patient_order_d st ">
                                    <span className="o_status submitted">
                                        Submitted
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('viewPopupRef', true)}>
                                            <View />
                                            <p>View</p>
                                        </a>
                                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                                        <a onClick={() => this.modalActionFn('addNotesPopupRef', true)}>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot">05</span>
                                        </a>
                                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                                        <a>
                                            <Todo />
                                            <p>To Do</p>
                                            <span className="todo tot read">05</span>
                                        </a>
                                        <a>
                                            <Reminder />
                                            <p>Reminder</p>
                                            <span className="rem tot read">05</span>
                                        </a>
                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
                                                    <Edit />
                                                    <span>Edit</span>
                                                </a>
                                                <a>
                                                    <Cancel />
                                                    <span>Cancel</span>
                                                </a>
                                                <a onClick={() => this.modalActionFn('clarificationRef', true)}>
                                                    <Clarification />
                                                    <span>Clarification</span>
                                                </a>
                                                <a onClick={() => this.modalActionFn('auditPopupRef', true)}>
                                                    <Audit />
                                                    <span>Audit</span>
                                                </a>
                                                {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="patient_order_desc">
                                <div className="p_desc">
                                    <h4>Orders</h4>
                                    <ol>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                    </ol>
                                </div>
                                <div className="p_desc">
                                    <h4>Direction</h4>
                                    <ol>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                    </ol>
                                </div>
                            </div>

                        </div>

                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>02</span>
                                </div>
                                <div className="patient_order_d ph">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>25th Apr 2020 | 09:53 am</span>
                                </div>
                                <div className="patient_order_d ot ">
                                    <div className="ot_container">

                                        <span className="o_status prn">
                                            PRN
                                                            </span>
                                    </div>
                                </div>
                                <div className="patient_order_d st ">
                                    <span className="o_status in_process">
                                        In Process
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a>
                                            <View />
                                            <p>View</p>
                                        </a>
                                        <a onClick={() => this.modalActionFn('addNotesPopupRef', true)}>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot read">05</span>
                                        </a>

                                        <a>
                                            <Todo />
                                            <p>To Do</p>
                                            <span className="todo tot read">05</span>
                                        </a>
                                        <a>
                                            <Reminder />
                                            <p>Reminder</p>
                                            <span className="rem tot read">05</span>
                                        </a>
                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
                                                    <Edit />
                                                    <span>Edit</span>
                                                </a>
                                                <a>
                                                    <Cancel />
                                                    <span>Cancel</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Clarification</span>
                                                </a>
                                                <a onClick={() => this.modalActionFn('auditPopupRef', true)}>
                                                    <Audit />
                                                    <span>Audit</span>
                                                </a>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="patient_order_desc">
                                <div className="p_desc">
                                    <h4>Orders</h4>
                                    <ol>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>

                                    </ol>
                                </div>
                                <div className="p_desc">
                                    <h4>Direction</h4>
                                    <ol>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>

                                    </ol>
                                </div>
                            </div>

                        </div>


                        <div className="patient_order_detail">
                            <div className="patient_order_content">
                                <div className="patient_order_d sr">
                                    <span>03</span>
                                </div>
                                <div className="patient_order_d ph">
                                    <span>Dr. Ardiles, Osvaldo</span>
                                </div>
                                <div className="patient_order_d dt">
                                    <span>25th Apr 2020 | 09:53 am</span>
                                </div>
                                <div className="patient_order_d ot ">
                                    <div className="ot_container">
                                        <VerbalOrder className="non_drug" />
                                        <span className="o_status non_drug">
                                            Non Drug
                                                            </span>
                                    </div>
                                </div>
                                <div className="patient_order_d st ">
                                    <span className="o_status edited">
                                        edited
                                                            </span>
                                </div>
                                <div className="patient_order_d ac">
                                    <div className="actions">
                                        <a onClick={() => this.modalActionFn('viewPopupRef', true)}>
                                            <View />
                                            <p>View</p>
                                        </a>
                                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                                        <a onClick={() => this.modalActionFn('addNotesPopupRef', true)}>
                                            <Notes />
                                            <p>Notes</p>
                                            <span className="notes tot">05</span>
                                        </a>
                                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                                        <a>
                                            <Todo />
                                            <p>To Do</p>
                                            <span className="todo tot read">05</span>
                                        </a>
                                        <a>
                                            <Reminder />
                                            <p>Reminder</p>
                                            <span className="rem tot read">05</span>
                                        </a>
                                        <a className="more">
                                            <MoreDots />
                                            <div className="more_wrap">
                                                <a>
                                                    <Edit />
                                                    <span>Edit</span>
                                                </a>
                                                <a>
                                                    <Cancel />
                                                    <span>Cancel</span>
                                                </a>
                                                <a>
                                                    <Clarification />
                                                    <span>Clarification</span>
                                                </a>
                                                <a onClick={() => this.modalActionFn('auditPopupRef', true)}>
                                                    <Audit />
                                                    <span>Audit</span>
                                                </a>
                                                {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="patient_order_desc">
                                <div className="p_desc">
                                    <h4>Orders</h4>
                                    <ol>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                    </ol>
                                </div>
                                <div className="p_desc">
                                    <h4>Direction</h4>
                                    <ol>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                        <li>
                                            5 teaspoon baking soda in six ounces water. Swish and then spit out, three lorem ipsum is a dummy text. Lorem ipsum is a dummy text.
                                                                </li>
                                    </ol>
                                </div>
                            </div>

                        </div>
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


                {this.state.addNotesPopupRef && <AddNotesPopup visible={this.state.addNotesPopupRef}
                    onClosed={() => this.modalActionFn('addNotesPopupRef', false)}
                />}
                {this.state.auditPopupRef && <AuditPopup visible={this.state.auditPopupRef}
                    onClosed={() => this.modalActionFn('auditPopupRef', false)}
                />}
                {this.state.viewPopupRef && <ViewNotesPopup visible={this.state.viewPopupRef}
                    onClosed={() => this.modalActionFn('viewPopupRef', false)}
                />}
                {this.state.clarificationRef && <ClarificationPopup visible={this.state.clarificationRef}
                    onClosed={() => this.modalActionFn('clarificationRef', false)}
                />}

                {/* <AddNotesPopup ref={(AddNotesPopup) => { this._modal = AddNotesPopup; }} /> */}
                {/* <AuditPopup ref={this.auditPopupRef} />
                <ViewNotesPopup ref={this.viewPopupRef} /> */}
            </div>
        </>)
    }
}
export default createForm()(OrderTab);