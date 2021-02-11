import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import VirtualVisitPopup from '../View/popup/virtual-visit-popup';
import RequestVisitPopup from '../View/popup/request-visit-popup';
import VVRequestDetail from '../View/popup/v-v-request-detail';
import VVAttachment from '../View/popup/v-v-attachments-popup';
import { Refresh, View, Notes, MoreDots, Audit, Reminder } from '../../../assets/images/pmr/index';
import { FirstPage, LastPage, Next, Prev } from '../../../assets/images/index';
import { Filters, Edit, Clarification, Attachments, CancelVisit, GroupCall, Help, OneOnOneCall, StartVisit, Print, Download } from '../../../assets/images/resident-detail/index';

import { isModuleAccessible, canPerformAction } from "../../../util/common";
import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
    DatePicker,
    DatePickerInput,
} from "../../../../node_modules/rc-datepicker";
import { TabPanel } from 'react-tabs';
import { tabData } from "../../../components/common/Tab/data";
import CommonTab from "../../../components/common/Tab";
import TogglePane from "./togglePane";

class DigitalBinderTab extends Component {
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
            {
                isModuleAccessible(9) ?
                    <div className="resi_treat_content_wrap virtual_visit pmr_tab xray_tab digital_tab">
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
                                    <input type="text" placeholder="Search By Physician" className="inputForm"
                                        onChange={(e) => console.log(e)} />
                                </div>

                                <div className="components">
                                    <select className="inputForm select" placeholder="">
                                        <option value="">
                                            Search by Rx No.
                                                          </option>
                                        <option value="">
                                            RX1234
                                                          </option>
                                        <option value="">
                                            RX1234
                                                          </option>
                                        <option value="">
                                            RX1234
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
                                    <div className="p_head ph">
                                        <div className="p_head_container">
                                            <span>Type</span>
                                            <Filters />
                                        </div>
                                    </div>


                                    <div className="p_head pr">
                                        <div className="p_head_container">
                                            <span>
                                                Physician
                              </span>
                                        </div>
                                    </div>
                                    <div className="p_head dd">
                                        <div className="p_head_container">
                                            <span>Date & Time</span>
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
                                            <span>Rx Order - 123456</span>
                                        </div>

                                        <div className="patient_order_d pr">
                                            <span>
                                                Dr. Osvaldo Ardiles
                                  </span>
                                        </div>
                                        <div className="patient_order_d dd">
                                            <span>
                                                01st May 2020 | 09:53 am
                                                          </span>

                                        </div>
                                        {/* <Tags>Submitted</Tags> */}
                                        <div className="patient_order_d st ">
                                            <span className="o_status submitted">
                                                Submitted
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
                                                    <Edit />
                                                    <p>Edit</p>
                                                </a>


                                                <a className="more">
                                                    <MoreDots />
                                                    <div className="more_wrap">
                                                        <a>
                                                            <CancelVisit />
                                                            <span>Cancel Rx</span>
                                                        </a>
                                                        <a>
                                                            <Audit />
                                                            <span>Audit</span>
                                                        </a>
                                                        <a>
                                                            <Print />
                                                            <span>Archive</span>
                                                        </a>
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
                                            <span>Rx Order - 123456</span>
                                        </div>

                                        <div className="patient_order_d pr">
                                            <span>
                                                Dr. Osvaldo Ardiles
                                  </span>
                                        </div>
                                        <div className="patient_order_d dd">
                                            <span>
                                                01st May 2020 | 09:53 am
                                                          </span>

                                        </div>
                                        <div className="patient_order_d st submitted">
                                            <span className="ph-r-t pink-color">
                                                Edited
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
                                                    <Edit />
                                                    <p>Edit</p>
                                                </a>


                                                <a className="more">
                                                    <MoreDots />
                                                    <div className="more_wrap">
                                                        <a>
                                                            <CancelVisit />
                                                            <span>Cancel Rx</span>
                                                        </a>
                                                        <a>
                                                            <Audit />
                                                            <span>Audit</span>
                                                        </a>
                                                        <a>
                                                            <Print />
                                                            <span>Archive</span>
                                                        </a>
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
                                            <span>Rx Order - 123456</span>
                                        </div>

                                        <div className="patient_order_d pr">
                                            <span>
                                                Dr. Osvaldo Ardiles
                                  </span>
                                        </div>
                                        <div className="patient_order_d dd">
                                            <span>
                                                01st May 2020 | 09:53 am
                                                          </span>

                                        </div>
                                        <div className="patient_order_d st ">
                                            <span className="o_status submitted">
                                                Submitted
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
                                                    <Edit />
                                                    <p>Edit</p>
                                                </a>


                                                <a className="more">
                                                    <MoreDots />
                                                    <div className="more_wrap">
                                                        <a>
                                                            <CancelVisit />
                                                            <span>Cancel Rx</span>
                                                        </a>
                                                        <a>
                                                            <Audit />
                                                            <span>Audit</span>
                                                        </a>
                                                        <a>
                                                            <Print />
                                                            <span>Archive</span>
                                                        </a>
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
                                            <span>Rx Order - 123456</span>
                                        </div>

                                        <div className="patient_order_d pr">
                                            <span>
                                                Dr. Osvaldo Ardiles
                                  </span>
                                        </div>
                                        <div className="patient_order_d dd">
                                            <span>
                                                01st May 2020 | 09:53 am
                                                          </span>

                                        </div>
                                        <div className="patient_order_d st submitted">
                                            <span className="ph-r-t pink-color">
                                                Edited
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
                                                    <Edit />
                                                    <p>Edit</p>
                                                </a>


                                                <a className="more">
                                                    <MoreDots />
                                                    <div className="more_wrap">
                                                        <a>
                                                            <CancelVisit />
                                                            <span>Cancel Rx</span>
                                                        </a>
                                                        <a>
                                                            <Audit />
                                                            <span>Audit</span>
                                                        </a>
                                                        <a>
                                                            <Print />
                                                            <span>Archive</span>
                                                        </a>
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
                                            <span>Rx Order - 123456</span>
                                        </div>

                                        <div className="patient_order_d pr">
                                            <span>
                                                Dr. Osvaldo Ardiles
                                  </span>
                                        </div>
                                        <div className="patient_order_d dd">
                                            <span>
                                                01st May 2020 | 09:53 am
                                                          </span>

                                        </div>
                                        <div className="patient_order_d st ">
                                            <span className="o_status submitted">
                                                Submitted
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
                                                    <Edit />
                                                    <p>Edit</p>
                                                </a>


                                                <a className="more">
                                                    <MoreDots />
                                                    <div className="more_wrap">
                                                        <a>
                                                            <CancelVisit />
                                                            <span>Cancel Rx</span>
                                                        </a>
                                                        <a>
                                                            <Audit />
                                                            <span>Audit</span>
                                                        </a>
                                                        <a>
                                                            <Print />
                                                            <span>Archive</span>
                                                        </a>
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
                                            <span>Rx Order - 123456</span>
                                        </div>

                                        <div className="patient_order_d pr">
                                            <span>
                                                Dr. Osvaldo Ardiles
                                  </span>
                                        </div>
                                        <div className="patient_order_d dd">
                                            <span>
                                                01st May 2020 | 09:53 am
                                                          </span>

                                        </div>
                                        <div className="patient_order_d st ">
                                            <span className="o_status submitted">
                                                Submitted
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
                                                    <Edit />
                                                    <p>Edit</p>
                                                </a>


                                                <a className="more">
                                                    <MoreDots />
                                                    <div className="more_wrap">
                                                        <a>
                                                            <CancelVisit />
                                                            <span>Cancel Rx</span>
                                                        </a>
                                                        <a>
                                                            <Audit />
                                                            <span>Audit</span>
                                                        </a>
                                                        <a>
                                                            <Print />
                                                            <span>Archive</span>
                                                        </a>
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
                                            <span>07</span>
                                        </div>
                                        <div className="patient_order_d ph">
                                            <span>Rx Order - 123456</span>
                                        </div>

                                        <div className="patient_order_d pr">
                                            <span>
                                                Dr. Osvaldo Ardiles
                                  </span>
                                        </div>
                                        <div className="patient_order_d dd">
                                            <span>
                                                01st May 2020 | 09:53 am
                                                          </span>

                                        </div>
                                        <div className="patient_order_d st ">
                                            <span className="o_status submitted">
                                                Submitted
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
                                                    <Edit />
                                                    <p>Edit</p>
                                                </a>


                                                <a className="more">
                                                    <MoreDots />
                                                    <div className="more_wrap">
                                                        <a>
                                                            <CancelVisit />
                                                            <span>Cancel Rx</span>
                                                        </a>
                                                        <a>
                                                            <Audit />
                                                            <span>Audit</span>
                                                        </a>
                                                        <a>
                                                            <Print />
                                                            <span>Archive</span>
                                                        </a>
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

                        {this.state.requestPopupRef && <RequestVisitPopup visible={this.state.requestPopupRef}
                            onClosed={() => this.modalActionFn('requestPopupRef', false)}
                        />}
                        {this.state.requestDetailPopupRef && <VVRequestDetail visible={this.state.requestDetailPopupRef}
                            onClosed={() => this.modalActionFn('requestDetailPopupRef', false)}
                        />}
                        {this.state.requestAttachmentPopupRef && <VVAttachment visible={this.state.requestAttachmentPopupRef}
                            onClosed={() => this.modalActionFn('requestAttachmentPopupRef', false)}
                        />}

                        {/* <RequestVisitPopup ref={this.requestPopupRef}/>
              <VVRequestDetail ref={this.requestDetailPopupRef}/>
              <VVAttachment ref={this.requestAttachmentPopupRef}/> */}
                    </div>

                    : null
            }
        </>)
    }
}
export default createForm()(DigitalBinderTab);