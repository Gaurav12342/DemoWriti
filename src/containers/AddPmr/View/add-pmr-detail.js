import React, { Component } from 'react';

import { Edit, Cancel } from '../../../assets/images/resident-detail/index';
// import { ReactComponent as Edit } from '../../../assets/images/resident-detail/edit.svg';
// import { ReactComponent as Cancel } from '../../../assets/images/resident-detail/cancel.svg';

import { Reminder, Notes } from '../../../assets/images/pmr/index';
// import { ReactComponent as Reminder } from '../../../assets/images/pmr/reminder.svg';
// import { ReactComponent as Notes } from '../../../assets/images/pmr/notes.svg';

import SavePrescriptionPopup from '../../../components/common/Popup/savePrescription-popup';
class AddPmrDetail extends Component {
    state = {
        savePrescriptionPopupRef: false,
        onSavePrescriptionPopupClick: false,
      }
    
      modalActionFn = (key, action) => {
          this.setState({ [key]: action })
      }

    render() {
        return (<>
           <div className="prep_right_wrap">
                <div className="box-inner-border">
                    <div className="prev-sc">
                        <img src={require("../../AddPmr/img/return.svg")}/>
                        <h3>BACK TO PREVIOUS SCREEN</h3>
                    </div>
                    <div className="sub-box-border">
                        <div className="d-flex-box">
                            <h2>Add PMR - O'Laughlin, Craig (Room No 2056)</h2>
                            <h2>Rx 2007</h2>
                        </div>
                        <div className="d-flex">
                            <div className="left-create-box">
                                <div className="d-flex mb-20">
                                    <div className="task-detail mr-20">Created By : Nurse Patrick Jane</div>
                                    <div className="task-detail">Created At : 26th May, 2020 | 09:53 am</div>
                                </div> 
                                <div className="text-left">
                                    <span className="sub-text ">Type</span>
                                        <div className="rx-btns drug-bts">
                                            <div className="flex-block">
                                                <a><button className="rout-btn">Routine</button></a>
                                                <a><button>PNR</button></a>
                                                <a><button>None Drug</button></a>
                                                <a><button>Standing Order</button></a>
                                                <a><button>Lab Work</button></a>
                                                <a><button>Diet</button></a>
                                            </div>
                                        </div>
                                </div>
                                <div className="d-flex mb-30">
                                    <div className="left-select">
                                        <form action="">
                                            <div className="form_wrap mb-8">
                                                <div className="components search wd100">
                                                    <input type="text" placeholder="Search Medication" className="inputForm"
                                                        onChange={(e) => console.log(e)} />
                                                </div>
                                            </div>
                                        </form>

                                        <form action="">
                                            <div className="form_wrap">
                                                <div className="components wd100">
                                                    <select className="inputForm select" placeholder="">
                                                        <option value="">Type of Document</option>
                                                        <option value="">Physician Review </option>
                                                        <option value="">Nurse Prep </option>
                                                        <option value="">To Do  </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>

                                        <form action="">
                                            <div className="form_wrap">
                                                <div className="components wd100">
                                                    <select className="inputForm select" placeholder="">
                                                        <option value="">Type of Document</option>
                                                        <option value="">Physician Review </option>
                                                        <option value="">Nurse Prep </option>
                                                        <option value="">To Do  </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>


                                        <form action="">
                                            <div className="form_wrap">
                                                <div className="components wd100">
                                                    <select className="inputForm select" placeholder="">
                                                        <option value="">Type of Document</option>
                                                        <option value="">Physician Review </option>
                                                        <option value="">Nurse Prep </option>
                                                        <option value="">To Do  </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                      
                                    </div>
                                    <div className="right-textarea">
                                        <textarea placeholder="Directions"></textarea>
                                        <textarea placeholder="Notes"></textarea>
                                    </div>
                                </div>
                                <div className="d-flex j-space-between">
                                <div className="plus-icon">
                                    <div className="d-flex mr-20">
                                        <p className="green-bg-plus">
                                            <img src={require("../../NursePrep/img/plus.svg")}/>
                                        </p>
                                        <span className="green-text">Set Reminder</span>
                                    </div>
                                    <div className="d-flex">
                                        <p className="green-bg-plus">
                                            <img src={require("../../NursePrep/img/plus.svg")}/>
                                        </p>
                                        <span className="green-text">Add to Favourites</span>
                                    </div>
                                </div>
                                   
                                    <div><button class="btn add-btn">ADD</button></div>
                                </div>
                                
                            </div>
                            <div className="right-create-box">
                            <div className="bg-gray">
                                <div className="d-flex-center">
                                    <span className="sub-text">Favourites</span>
                                    <div className="search-box">
                                        <input type="text" placeholder="Search"/>
                                        <a> <img className="search-icon" src={require("../../AddPmr/img/search.svg")}/></a>
                                    </div>
                                </div>
                            </div>
                            <div className="daysport">
                                <div className="">
                                    <label for="ptd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="ptd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Dysport Therapeutic, 500 UNIT, Powder for Solution</span>
                                    </label>
                                    <div className="day-block">
                                        <p>Directions : Twice a day</p>
                                        <p>Indication : Agitation</p>
                                        <p>LU Code : 412</p>
                                    </div>
                                </div>

                                <div className="">
                                    <label for="dy" className="filter_check">
                                        <input type="checkbox" name="dy" id="dy" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Dysport Therapeutic, 500 UNIT, Powder for Solution</span>
                                    </label>
                                    <div className="day-block">
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
                                                    <div className="p_head sr">
                                                        Sr. No.
                                                    </div>
                                                    <div className="p_head md">
                                                    Medication
                                                    </div>
                                                    <div className="p_head lu">
                                                    LU Code
                                                    </div>
                                                    <div className="p_head dt">
                                                    Directions
                                                    
                                                    </div>
                                                    <div className="p_head in">
                                                    Indications
                                                    
                                                    </div>
                                                    <div className="p_head ac">
                                                        Actions
                                                        
                                                    </div>
                                                </div>
                                                <div className="scroll_wrapper auto-height">

                                                    <div className="patient_order_detail">
                                                        <div className="patient_order_content">
                                                            <div className="patient_order_d sr">
                                                                <span>01</span>
                                                            </div>
                                                            <div className="patient_order_d md">
                                                                <span className="d-block">Dysport Therapeutic, 500 UNIT, </span>
                                                                <span>Powder for Solution</span>
                                                            </div>
                                                            <div className="patient_order_d lu">
                                                                <span>412</span>
                                                            </div>
                                                            <div className="patient_order_d dt std_order">
                                                                
                                                                <span className="o_status">
                                                                Twice a day
                                                                </span>
                                                            </div>
                                                            <div className="patient_order_d in submitted">
                                                                <span>
                                                                Agitation
                                                                </span>
                                                            </div>
                                                            <div className="patient_order_d ac">
                                                                <div className="actions">
                                                                <a>
                                                                        <Notes />
                                                                        <p>Notes</p>
                                                                        <span className="todo tot green-bg">05</span>
                                                                    </a>
                                                                    <a>
                                                                        <Reminder />
                                                                        <p>Reminder</p>
                                                                        <span className="rem tot green-bg">05</span>
                                                                    </a>
                                                                    
                                                                    <a>
                                                                        <Edit />
                                                                        <p> Edit PMR</p>
                                                                    </a>
                                                                    <a>
                                                                        <Cancel />
                                                                        <p>Cancel PMR</p>
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
                                                            <span className="d-block">Dysport Therapeutic, 500 UNIT, </span>
                                                                <span>Powder for Solution</span>
                                                            </div>
                                                            <div className="patient_order_d lu">
                                                                <span>412</span>
                                                            </div>
                                                            <div className="patient_order_d dt std_order">
                                                                
                                                                <span className="o_status">
                                                                Twice a day
                                                                </span>
                                                            </div>
                                                            <div className="patient_order_d in submitted">
                                                                <span>
                                                                Agitation
                                                                </span>
                                                            </div>
                                                            <div className="patient_order_d ac">
                                                                <div className="actions">
                                                                <a>
                                                                        <Notes />
                                                                        <p>Notes</p>
                                                                        <span className="todo tot green-bg">05</span>
                                                                    </a>
                                                                    <a>
                                                                        <Reminder />
                                                                        <p>Reminder</p>
                                                                        <span className="rem tot green-bg">05</span>
                                                                    </a>
                                                                    
                                                                    <a>
                                                                        <Edit />
                                                                        <p>Edit PMR</p>
                                                                    </a>
                                                                    <a>
                                                                        <Cancel />
                                                                        <p>Cancel PMR</p>
                                                                    </a>

                                                                    
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        

                                                    </div>


                                                </div>

                                            </div>
                    {/* end */}
                </div>
                <div className="d-flex-end">
                    <button class="prev-screen-btn gray-btn">CANCEL</button>
                    <button class="prev-screen-btn" onClick={() => this.modalActionFn('savePrescriptionPopupRef', true)}>SAVE</button>
                </div>
           </div>
           {this.state.savePrescriptionPopupRef && <SavePrescriptionPopup visible={this.state.savePrescriptionPopupRef}
              onClosed={() => this.modalActionFn('savePrescriptionPopupRef', false)}
            />}
                
        </>)
    }
}
export default AddPmrDetail;