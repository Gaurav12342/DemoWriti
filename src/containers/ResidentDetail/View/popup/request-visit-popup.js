import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
import { createForm, formShape } from 'rc-form';
import '../../../../../node_modules/rc-datepicker/lib/style.css';
import {
    DatePicker,
    DatePickerInput,
} from "../../../../../node_modules/rc-datepicker";
class RequestVisitPopup extends Component {

    constructor() {
        super();
        this.state = {
            show1Modal: false
        };

        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    // handleOpenModal() {
    //     this.setState({ show1Modal: true });
    // }

    handleCloseModal() {
        this.setState({ show1Modal: false });
    }


    render() {

        return (<>
            {/* start popup */}

            <Dialog visible={this.props.visible}
                onClose={this.props.onClosed}
                className="virtual-visit-wrap request-wrap"
            >
                <div className="popup-content p-lr">
                    <h2>Request Virtual Visit (VV11567) for O'Laughlin, Craig (Room No 2056)</h2>

                    <div class="d-flex">

                        <div class="left-create-box left-req-box">
                            <form>
                                <div className="form_wrap f-wrap">
                                    <div class="d-flex mb-20">
                                        <div class="task-detail mr-20">Created By : Nurse Patrick Jane </div>
                                        <div class="task-detail">Created At : 26th May, 2020 | 04:00 pm</div>
                                    </div>
                                    <div class="text-left">
                                        <span class="sub-text">Type of Virtual Visit</span>
                                        <div class="rx-btns drug-bts">
                                            <div class="flex-block">
                                                <a><button class="rout-btn">General</button></a>
                                                <a><button>Care Conference</button></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex mb-12">
                                    <div className="components pl-0">
                                        <div className="ui input">
                                            <DatePickerInput
                                                displayFormat="DD/MM/YYYY"
                                                returnFormat="YYYY-MM-DD"
                                                className="my-react-component mr-10"
                                                defaultValue={this.state.yesterday}
                                                showOnInputClick
                                                placeholder="Date"
                                                locale="de"
                                                iconClassName="calendar icon"
                                            />
                                        </div>
                                    </div>
                                        {/* <div className="components mr-10">
                                            <input type="date" className="inputForm datePick"
                                                onChange={(e) => console.log(e)} />
                                        </div> */}
                                        <div className="components d-flex">
                                            <div className="custom-time">
                                                <label>From</label>
                                                <select name="00:00 am">
                                                    <option value="00:00">00:00 am</option>
                                                    <option value="00:30">12.30 pm</option>
                                                </select>
                                            </div>
                                            <div className="custom-time">
                                                <label>To</label>
                                                <select name="00:00 am">
                                                    <option value="00:00">00:00 am</option>
                                                    <option value="00:30">12.30 pm</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="components wd47 d-flex">
                                            <div className="custom-time">
                                                <label>From</label>
                                                <select name="00:00 am">
                                                    <option value="00:00">00:00 am</option>
                                                    <option value="00:30">12.30 pm</option>
                                                </select>
                                            </div>
                                            <div className="custom-time">
                                                <label>To</label>
                                                <select name="00:00 am">
                                                    <option value="00:00">00:00 am</option>
                                                    <option value="00:30">12.30 pm</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex mb-12">
                                        <div className="components mr-10">
                                            <select className="inputForm select" placeholder="">
                                                <option value="">Visit With</option>
                                                <option value=""> Physician Review</option>
                                                <option value="">Nurse Prep</option>
                                                <option value="">To Do</option>
                                            </select>
                                        </div>
                                        <div className="components">
                                            <select className="inputForm select" placeholder="">
                                                <option value="">Reason for Visit</option>
                                                <option value="">Physician Review</option>
                                                <option value="">Nurse Prep</option>
                                                <option value="">To Do</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="right-textarea components textarea">
                                        <textarea placeholder="Additional Details for Virtual Visit/Care Conference" className="inputForm"></textarea>
                                    </div>
                                    <div class="d-flex j-space-between mb-20 wd100">
                                        <div class="image-upload d-flex">
                                            <label for="file-input">
                                                <img class="" src={require("../../View/popup/img/attach.svg")} />
                                            </label>
                                            <span class="green-text">Attach</span>
                                            <input id="file-input" type="file"/>
                                        </div>
                                        <div class="d-flex">
                                            <p class="green-bg-plus"><img src={require("../../View/popup/img/plus.svg")} /></p>
                                            <span class="green-text">Add Associated Document</span>
                                        </div>
                                    </div>
                                    <div class="text-left">
                                        <span class="sub-text">Add Secondary Users</span>
                                    </div>
                                    <div className="d-flex b-b1 wd100">
                                        <div className="poa-g">
                                            <img src={require("../../View/popup/img/All-Users.svg")} />
                                            <p>All Users</p>
                                        </div>
                                        <div className="poa-g">
                                            <img src={require("../../View/popup/img/Nurse.svg")} />
                                            <p>Nurse</p>
                                        </div>
                                        <div className="poa-g">
                                            <img src={require("../../View/popup/img/Physician.svg")} />
                                            <p className="light-green-text">Physician</p>
                                        </div>
                                        <div className="poa-g">
                                            <img src={require("../../View/popup/img/POA.svg")} />
                                            <p>POA</p>
                                        </div>
                                        <div className="poa-g">
                                            <img src={require("../../View/popup/img/Group.svg")} />
                                            <p>Group</p>
                                        </div>
                                    </div>
                                    <div className="components search mb-20 wd100">
                                        <input type="text" placeholder="Search by Rx No." className="inputForm"
                                            onChange={(e) => console.log(e)} />
                                    </div>
                                    <div className="d-flex">
                                        <div className="mr-10">
                                            <div className="d-flex">
                                                <p className="van-desc">Van Pelt, Grace </p>
                                                <img src={require("../../View/popup/img/Remove.svg")} />
                                            </div>
                                            <div className="d-flex">
                                                <p className="van-desc">Van Pelt, Grace </p>
                                                <img src={require("../../View/popup/img/Remove.svg")} />
                                            </div>
                                            <div className="d-flex">
                                                <p className="van-desc">Van Pelt, Grace </p>
                                                <img src={require("../../View/popup/img/Remove.svg")} />
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="d-flex">
                                                <p className="van-desc">Van Pelt, Grace </p>
                                                <img src={require("../../View/popup/img/Remove.svg")} />
                                            </div>
                                            <div className="d-flex">
                                                <p className="van-desc">Van Pelt, Grace </p>
                                                <img src={require("../../View/popup/img/Remove.svg")} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="right-create-box right-req-box">
                            <h3 className="read-text">Please read and acknowledge your virtual visit request</h3>
                            <p>Give 2 tablet by mouth three times a day for (to be specified by physician) lorem ipsum is a dummy text. Lorem ipsum is a dummy text. </p>
                            <p>Swish and then spit out, three lorem ipsum is a dummy text. 5 teaspoon baking soda in six ounces water.</p>
                            <ul className="list-item">
                                <li>Lorem Ipsum </li>
                                <li>Lorem Ipsum </li>
                                <li>Lorem Ipsum </li>
                                <li>Lorem Ipsum </li>
                                <li>Lorem Ipsum </li>
                                <li>Lorem Ipsum </li>
                            </ul>
                            <div className="knw-box">
                                <div className="click-sh">
                                    <img src={require("../../View/popup/img/info.svg")} />
                                    <p className="mt-0">By clicking on Schedule, I acknowledge lorem ipsum is a dummy text. Lorem ipsum is a dummy text. Lorem ipsum. Lorem ipsum is a dummy text. Lorem ipsum is a dummy text.</p>
                                </div>
                                <div className="d-flex-end">
                                    <button className="prev-screen-btn gray-btn sh-btn" onClick={() => this.props.onClosed()}>CANCEL</button>
                                    <button class="prev-screen-btn sh-btn">SCHEDULE</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* <button className="close-btn" onClick={this.handleCloseModal}>
                            <img src={require("../../View/popup/img/close.svg")}/>
                        </button> */}

            </Dialog>

            {/* end popup */}
        </>)
    }
}
export default RequestVisitPopup;