import React, { Component } from "react";
import { createForm, formShape } from "rc-form";
import { Filters, DetailsLess, VerbalOrder, Todo, Edit, Cancel, Clarification, Archive } from "../../../assets/images/resident-detail/index";
// import { ReactComponent as Filters } from "../../../assets/images/resident-detail/options-filters.svg";
// import { ReactComponent as DetailsLess } from "../../../assets/images/resident-detail/details-less.svg";
// import { ReactComponent as VerbalOrder } from "../../../assets/images/resident-detail/verbal-order.svg";
// import { ReactComponent as Todo } from "../../../assets/images/resident-detail/todo.svg";
// import { ReactComponent as Edit } from "../../../assets/images/resident-detail/edit.svg";
// import { ReactComponent as Cancel } from "../../../assets/images/resident-detail/cancel.svg";
// import { ReactComponent as Clarification } from "../../../assets/images/resident-detail/clarification.svg";
// import { ReactComponent as Archive } from "../../../assets/images/resident-detail/archieve.svg";
import { Refresh, View, Notes, Reminder, MoreDots, Audit } from "../../../assets/images/pmr/index";
// import { ReactComponent as Refresh } from "../../../assets/images/pmr/refresh.svg";
// import { ReactComponent as View } from "../../../assets/images/pmr/view.svg";
// import { ReactComponent as Notes } from "../../../assets/images/pmr/notes.svg";
// import { ReactComponent as Reminder } from "../../../assets/images/pmr/reminder.svg";
// import { ReactComponent as MoreDots } from "../../../assets/images/pmr/more-dots.svg";
// import { ReactComponent as Audit } from "../../../assets/images/pmr/audit.svg";
import { FirstPage, LastPage, Next, Prev } from "../../../assets/images/index";
// import { ReactComponent as FirstPage } from "../../../assets/images/first-page.svg";
// import { ReactComponent as LastPage } from "../../../assets/images/last-page.svg";
// import { ReactComponent as Next } from "../../../assets/images/next.svg";
// import { ReactComponent as Prev } from "../../../assets/images/previous.svg";

import "../../../../node_modules/rc-datepicker/lib/style.css";
import ArchivePopup from '../../../components/common/Popup/archive-popup';
import {
  DatePicker,
  DatePickerInput,
} from "../../../../node_modules/rc-datepicker";


import { TabPanel } from "react-tabs";
import { tabData } from "../../../components/common/Tab/data";
import CommonTab from "../../../components/common/Tab";
import TogglePane from "./togglePane";

class EProcessing extends Component {
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
  static propTypes = {
    form: formShape,
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  };

  /* start archive popup */
  state = {
    archivePopupRef: false,
    onArchivePopupClick: false,
  }

  modalActionFn = (key, action) => {
    this.setState({ [key]: action })
  }
  //  archivePopupRef = ({handleOpenModal}) => {
  //   this.archiveModal = handleOpenModal;
  //   }

  //   onArchivePopupClick = () => {
  //   this.archiveModal();
  //   }
  /* end archive popup */

  render() {
    let errors;
    const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
    return (
      <>
        <div className="resi_treat_content_wrap e-processing">
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
              <div className="components search">
                <input type="text" placeholder="Search By Rx No." className="inputForm"
                  onChange={(e) => console.log(e)} />
              </div>
              <div className="components search">
                <input type="text" placeholder="Search By Physician" className="inputForm"
                  onChange={(e) => console.log(e)} />
              </div>

              <div className="components">
                <select className="inputForm select" placeholder="">
                  <option value="">
                    Type of Document
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
                    <span>Documemnt Type</span>
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
                {/* row start */}
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

                        <span>
                          3rd Party Prescription
                                                            </span>
                      </div>
                    </div>
                    <div className="patient_order_d st ">
                      <span className="o_status uploaded">
                        Uploaded
                                                            </span>
                    </div>
                    <div className="patient_order_d ac">
                      <div className="actions">
                        <a>
                          <View />
                          <p>View</p>
                        </a>
                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="notes tot">05</span>
                        </a>
                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                        <a>
                          <Reminder />
                          <p>Reminder</p>
                          <span className="rem tot read">05</span>
                        </a>
                        <a>
                          <Edit />
                          <p>Edit</p>
                        </a>
                        <a className="more">
                          <MoreDots />
                          <div className="more_wrap">
                            <a >
                              <Audit />
                              <span>Audit</span>
                            </a>
                            <a onClick={() => this.modalActionFn('archivePopupRef', true)}>
                              <Archive />
                              <span>Archive</span>
                            </a>

                            <a>
                              <Clarification />
                              <span>Clarification</span>
                            </a>

                            {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
                {/* row end */}
                {/* row start */}
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

                        <span>
                          Lab Work
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
                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="notes tot">05</span>
                        </a>
                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                        <a>
                          <Reminder />
                          <p>Reminder</p>
                          <span className="rem tot read">05</span>
                        </a>
                        <a>
                          <Edit />
                          <p>Edit</p>
                        </a>
                        <a className="more">
                          <MoreDots />
                          <div className="more_wrap">
                            <a >
                              <Audit />
                              <span>Audit</span>
                            </a>
                            <a onClick={() => this.modalActionFn('archivePopupRef', true)}>
                              <Archive />
                              <span>Archive</span>
                            </a>

                            <a>
                              <Clarification />
                              <span>Clarification</span>
                            </a>

                            {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
                {/* row end */}
                {/* row start */}
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

                        <span>
                          Order Sets
                                                            </span>
                      </div>
                    </div>
                    <div className="patient_order_d st ">
                      <span className="o_status submitted">
                        Completed
                                                            </span>
                    </div>
                    <div className="patient_order_d ac">
                      <div className="actions">
                        <a>
                          <View />
                          <p>View</p>
                        </a>
                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="notes tot">05</span>
                        </a>
                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                        <a>
                          <Reminder />
                          <p>Reminder</p>
                          <span className="rem tot read">05</span>
                        </a>
                        <a>
                          <Edit />
                          <p>Edit</p>
                        </a>
                        <a className="more">
                          <MoreDots />
                          <div className="more_wrap">
                            <a >
                              <Audit />
                              <span>Audit</span>
                            </a>
                            <a onClick={() => this.modalActionFn('archivePopupRef', true)}>
                              <Archive />
                              <span>Archive</span>
                            </a>

                            <a>
                              <Clarification />
                              <span>Clarification</span>
                            </a>

                            {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
                {/* row end */}
                {/* row start */}
                <div className="patient_order_detail">
                  <div className="patient_order_content">
                    <div className="patient_order_d sr">
                      <span>04</span>
                    </div>
                    <div className="patient_order_d ph">
                      <span>Dr. Ardiles, Osvaldo</span>
                    </div>
                    <div className="patient_order_d dt">
                      <span>25th Apr 2020 | 09:53 am</span>
                    </div>
                    <div className="patient_order_d ot ">
                      <div className="ot_container">

                        <span>
                          3rd Party Prescription
                                                            </span>
                      </div>
                    </div>
                    <div className="patient_order_d st ">
                      <span className="o_status uploaded">
                        Uploaded
                                                            </span>
                    </div>
                    <div className="patient_order_d ac">
                      <div className="actions">
                        <a>
                          <View />
                          <p>View</p>
                        </a>
                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="notes tot">05</span>
                        </a>
                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                        <a>
                          <Reminder />
                          <p>Reminder</p>
                          <span className="rem tot read">05</span>
                        </a>
                        <a>
                          <Edit />
                          <p>Edit</p>
                        </a>
                        <a className="more">
                          <MoreDots />
                          <div className="more_wrap">
                            <a >
                              <Audit />
                              <span>Audit</span>
                            </a>
                            <a onClick={() => this.modalActionFn('archivePopupRef', true)}>
                              <Archive />
                              <span>Archive</span>
                            </a>

                            <a>
                              <Clarification />
                              <span>Clarification</span>
                            </a>

                            {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
                {/* row end */}
                {/* row start */}
                <div className="patient_order_detail">
                  <div className="patient_order_content">
                    <div className="patient_order_d sr">
                      <span>05</span>
                    </div>
                    <div className="patient_order_d ph">
                      <span>Dr. Ardiles, Osvaldo</span>
                    </div>
                    <div className="patient_order_d dt">
                      <span>25th Apr 2020 | 09:53 am</span>
                    </div>
                    <div className="patient_order_d ot ">
                      <div className="ot_container">

                        <span>
                          3rd Party Prescription
                                                            </span>
                      </div>
                    </div>
                    <div className="patient_order_d st ">
                      <span className="o_status uploaded">
                        Uploaded
                                                            </span>
                    </div>
                    <div className="patient_order_d ac">
                      <div className="actions">
                        <a>
                          <View />
                          <p>View</p>
                        </a>
                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="notes tot">05</span>
                        </a>
                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                        <a>
                          <Reminder />
                          <p>Reminder</p>
                          <span className="rem tot read">05</span>
                        </a>
                        <a>
                          <Edit />
                          <p>Edit</p>
                        </a>
                        <a className="more">
                          <MoreDots />
                          <div className="more_wrap">
                            <a >
                              <Audit />
                              <span>Audit</span>
                            </a>
                            <a onClick={() => this.modalActionFn('archivePopupRef', true)}>
                              <Archive />
                              <span>Archive</span>
                            </a>

                            <a>
                              <Clarification />
                              <span>Clarification</span>
                            </a>

                            {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
                {/* row end */}
                {/* row start */}
                <div className="patient_order_detail">
                  <div className="patient_order_content">
                    <div className="patient_order_d sr">
                      <span>06</span>
                    </div>
                    <div className="patient_order_d ph">
                      <span>Dr. Ardiles, Osvaldo</span>
                    </div>
                    <div className="patient_order_d dt">
                      <span>25th Apr 2020 | 09:53 am</span>
                    </div>
                    <div className="patient_order_d ot ">
                      <div className="ot_container">

                        <span>
                          3rd Party Prescription
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
                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="notes tot">05</span>
                        </a>
                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                        <a>
                          <Reminder />
                          <p>Reminder</p>
                          <span className="rem tot read">05</span>
                        </a>
                        <a>
                          <Edit />
                          <p>Edit</p>
                        </a>
                        <a className="more">
                          <MoreDots />
                          <div className="more_wrap">
                            <a >
                              <Audit />
                              <span>Audit</span>
                            </a>
                            <a onClick={() => this.modalActionFn('archivePopupRef', true)}>
                              <Archive />
                              <span>Archive</span>
                            </a>

                            <a>
                              <Clarification />
                              <span>Clarification</span>
                            </a>

                            {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
                {/* row end */}
                {/* row start */}
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

                        <span>
                          3rd Party Prescription
                                                            </span>
                      </div>
                    </div>
                    <div className="patient_order_d st ">
                      <span className="o_status uploaded">
                        Uploaded
                                                            </span>
                    </div>
                    <div className="patient_order_d ac">
                      <div className="actions">
                        <a>
                          <View />
                          <p>View</p>
                        </a>
                        {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                                            onClosed={() => this.modalActionFn('viewNoteModal', false)}
                                        />} */}
                        {/* <a onClick={this.onAddNotesPopupClick}> */}
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="notes tot">05</span>
                        </a>
                        {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

                        <a>
                          <Reminder />
                          <p>Reminder</p>
                          <span className="rem tot read">05</span>
                        </a>
                        <a>
                          <Edit />
                          <p>Edit</p>
                        </a>
                        <a className="more">
                          <MoreDots />
                          <div className="more_wrap">
                            <a >
                              <Audit />
                              <span>Audit</span>
                            </a>
                            <a onClick={() => this.modalActionFn('archivePopupRef', true)}>
                              <Archive />
                              <span>Archive</span>
                            </a>

                            <a>
                              <Clarification />
                              <span>Clarification</span>
                            </a>

                            {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                                    onClosed={() => this.modalActionFn('auditModal', false)}
                                                />} */}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
                {/* row end */}

            </div>
          </div>
          <div className="pagination_wrap">
            <div className="showing">Showing 01 to 06 of 1000 entries</div>
            <div className="pagination">
              <a>
                <FirstPage />
              </a>
              <a>
                <Prev />
              </a>
              <a className="active_page">01</a>
              <a>02</a>
              <a>03</a>
              <a>04</a>
              <a>05</a>
              <a>
                <Next />
              </a>
              <a>
                <LastPage />
              </a>
            </div>
          </div>
          {/* <ArchivePopup ref={this.archivePopupRef}/> */}
          {this.state.archivePopupRef && <ArchivePopup visible={this.state.archivePopupRef}
            onClosed={() => this.modalActionFn('archivePopupRef', false)}
          />}
        </div>
      </>
    );
  }
}
export default createForm()(EProcessing);
