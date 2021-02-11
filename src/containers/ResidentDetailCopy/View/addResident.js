import React, { Component } from "react";

import { Edit } from "../../../assets/images/resident-detail/index";
import { Reminder, Notes } from "../../../assets/images/pmr/index";
// import { ReactComponent as Reminder } from "../../../assets/images/pmr/reminder.svg";
// import { ReactComponent as Notes } from "../../../assets/images/pmr/notes.svg";
import { Cancel, Correct, PlusBtn } from "../../../assets/images/resident-detail/index";
// import { ReactComponent as Cancel } from "../../../assets/images/resident-detail/cancel.svg";
// import { ReactComponent as Correct } from "../../../assets/images/resident-detail/correct.svg";
// import { ReactComponent as Plus } from "../../../assets/images/resident-detail/add-resident.svg";
import SavePrescriptionPopup from "../../../components/common/Popup/savePrescription-popup";
class AddResident extends Component {
  // state = {

  //   savePrescriptionPopup: false
  // }
  /* start save prescription popup */
  state = {
    savePrescriptionPopupRef: false,
    onSavePrescriptionPopupClick: false,
  };

  modalActionFn = (key, action) => {
    this.setState({ [key]: action });
  };
  // savePrescriptionPopupRef = ({ handleOpenModal }) => {
  //   this.residentModal = handleOpenModal;
  // }
  // modalActionFn = (key, action) => {
  //   this.setState({ [key]: action })
  // }
  // onSavePrescriptionPopupClick = () => {
  //   this.residentModal();
  // }
  /* end save prescription resident popup */

  render() {
    return (
      <div class="add_resident">
        <div className="prep_right_wrap">
          <div className="box-inner-border">
            <div className="sub-box-border">
              <div className="d-flex-box">
                <h2>
                  Add Rx Order for - O'Laughlin, Craig (VO/TO By Mary Jane for
                  Dr. Osvaldo Ardiles)
                </h2>
                <h2>Rx 2007</h2>
              </div>
              <div className="d-flex">
                <div className="left-create-box">
                  <div className="text-left">
                    <span className="sub-text ">Type</span>
                    <div className="rx-btns drug-bts">
                      <div className="flex-block">
                        <a>
                          <button className="rout-btn">Routine</button>
                        </a>
                        <a>
                          <button>PRN</button>
                        </a>
                        <a>
                          <button>None Drug</button>
                        </a>
                        <a>
                          <button>Standing Order</button>
                        </a>
                        <a>
                          <button>Lab Work</button>
                        </a>
                        <a>
                          <button>Diet</button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-control">
                    <input type="checkbox" />
                    <span>Start with next med strips</span>
                  </div>
                  <div className="d-flex">
                    <div className="left-select">
                      <div className="">
                        <select name="area" id="area" class="inputForm">
                          <option value="Home">Dr. Ardiles Osvaldo</option>
                          <option value="Home1">Filter Home Area1</option>
                          <option value="Home2">Filter Home Area2</option>
                          <option value="Home3">Filter Home Area3</option>
                        </select>
                      </div>
                      <div className="">
                        <input type="text" placeholder="Search Medication" />
                      </div>
                      <div className="">
                        <select name="area" id="area" class="inputForm">
                          <option value="Home">Select LU Code</option>
                          <option value="Home1">Filter Home Area1</option>
                          <option value="Home2">Filter Home Area2</option>
                          <option value="Home3">Filter Home Area3</option>
                        </select>
                      </div>
                      <div className="">
                        <select name="area" id="area" class="inputForm">
                          <option value="Home">Directions</option>
                          <option value="Home1">Filter Home Area1</option>
                          <option value="Home2">Filter Home Area2</option>
                          <option value="Home3">Filter Home Area3</option>
                        </select>
                      </div>
                    </div>
                    <div className="right-textarea">
                      <div className="">
                        <select name="area" id="area" class="inputForm">
                          <option value="Home">Indication</option>
                          <option value="Home1">Filter Home Area1</option>
                          <option value="Home2">Filter Home Area2</option>
                          <option value="Home3">Filter Home Area3</option>
                        </select>
                        <textarea
                          placeholder="Progress Notes &#10;(will push to PCC/MED e-care)"
                          class="inputForm"
                        ></textarea>
                      </div>
                    </div>
                    <div class="right-textarea primary-notes">
                      <textarea
                        placeholder="Notes to Pharmacy"
                        class="inputForm"
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex j-space-between">
                    <div className="plus-icon">
                      <div className="d-flex mr-20">
                        <p className="green-bg-plus">
                          <PlusBtn />
                        </p>
                        <span className="green-text">Set Reminder</span>
                      </div>
                      <div className="d-flex">
                        <p className="green-bg-plus">
                          <PlusBtn />
                        </p>
                        <span className="green-text">Add to Favourites</span>
                      </div>
                    </div>

                    <div>
                      <button class="btn add-btn">ADD</button>
                    </div>
                  </div>
                </div>
                <div className="right-create-box">
                  <div className="bg-gray">
                    <div className="d-flex-center">
                      <span className="sub-text">Favourites</span>
                      <div className="search-box">
                        <input type="text" placeholder="Search" />
                      </div>
                    </div>
                  </div>
                  <div className="daysport">
                    <div className="daysportblock">
                      <input type="checkbox" id="checkbox01-01" name="demo01" />
                      <div className="day-block">
                        <label for="checkbox01-01">
                          Dysport Therapeutic, 500 UNIT, Powder for Solution
                        </label>
                        <p>Directions : Twice a day</p>
                        <p>Indication : Agitation</p>
                        <p>LU Code : 412</p>
                      </div>
                    </div>
                    <div className="daysportblock">
                      <input type="checkbox" id="checkbox01-01" name="demo01" />
                      <div className="day-block">
                        <label for="checkbox01-01">
                          Dysport Therapeutic, 500 UNIT, Powder for Solution
                        </label>
                        <p>Directions : Twice a day</p>
                        <p>Indication : Agitation</p>
                        <p>LU Code : 412</p>
                      </div>
                    </div>
                    <div className="small-text-btn">
                      <button class="btn small-add-btn">ADD</button>
                      <p class="">Maximum 3 per order</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* start */}
            <div className="patient_order_wrap medication_wrap">
              <div className="patient_order_head">
                <div className="p_head sr">Sr. No.</div>
                <div className="p_head md">Medication</div>
                <div className="p_head lu">LU Code</div>
                <div className="p_head dt">Directions</div>
                <div className="p_head in">Indications</div>
                <div className="p_head ac">Actions</div>
              </div>
              <div className="scroll_wrapper auto-height">
                <div className="patient_order_detail">
                  <div className="patient_order_content">
                    <div className="patient_order_d sr">
                      <span>01</span>
                    </div>
                    <div className="patient_order_d md">
                      <span>
                        Dysport Therapeutic, 500 UNIT, Powder for Solution
                      </span>
                    </div>
                    <div className="patient_order_d lu">
                      <span>42</span>
                    </div>
                    <div className="patient_order_d dt std_order">
                      <span className="o_status">Twice a day</span>
                    </div>
                    <div className="patient_order_d in submitted">
                      <span>Agitation</span>
                    </div>
                    <div className="patient_order_d ac">
                      <div className="actions">
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="todo tot read">05</span>
                        </a>
                        <a>
                          <Reminder />
                          <p>Reminders</p>
                          <span className="rem tot read">05</span>
                        </a>

                        <a>
                          <Edit />
                          <p>Edit Rx</p>
                        </a>
                        <a>
                          <Cancel />
                          <p>Cancel Rx</p>
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
                    <div className="patient_order_d md">
                      <span>
                        Dysport Therapeutic, 500 UNIT, Powder for Solution
                      </span>
                    </div>
                    <div className="patient_order_d lu">
                      <span>42</span>
                    </div>
                    <div className="patient_order_d dt std_order">
                      <span className="o_status">Twice a day</span>
                    </div>
                    <div className="patient_order_d in submitted">
                      <span>Agitation</span>
                    </div>
                    <div className="patient_order_d ac">
                      <div className="actions">
                        <a>
                          <Notes />
                          <p>Notes</p>
                          <span className="todo tot read">05</span>
                        </a>
                        <a>
                          <Reminder />
                          <p>Reminders</p>
                          <span className="rem tot read">05</span>
                        </a>

                        <a>
                          <Edit />
                          <p>Edit Rx</p>
                        </a>
                        <a>
                          <Cancel />
                          <p>Cancel Rx</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex-end">
            <div className="save-graft">
              <a href="">Save as Draft</a>
              <Correct />
            </div>
            <button class="prev-screen-btn gray-btn">CANCEL</button>
            <button
              class="prev-screen-btn"
              onClick={() =>
                this.modalActionFn("savePrescriptionPopupRef", true)
              }
            >
              SAVE
            </button>

            {this.state.savePrescriptionPopupRef && (
              <SavePrescriptionPopup
                visible={this.state.savePrescriptionPopupRef}
                onClosed={() =>
                  this.modalActionFn("savePrescriptionPopupRef", false)
                }
              />
            )}
          </div>
        </div>
        {/* <SavePrescriptionPopup ref={this.savePrescriptionPopupRef} /> */}
      </div>
    );
  }
}

export default AddResident;
