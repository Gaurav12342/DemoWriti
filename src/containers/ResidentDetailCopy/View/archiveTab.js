import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';

import { Filters, DetailsLess, VerbalOrder, Cancel, Edit, Todo, Clarification } from '../../../assets/images/resident-detail/index';
// import { ReactComponent as DetailsLess } from '../../../assets/images/resident-detail/details-less.svg';
// import { ReactComponent as VerbalOrder } from '../../../assets/images/resident-detail/verbal-order.svg';
// import { ReactComponent as Cancel } from '../../../assets/images/resident-detail/cancel.svg';
// import { ReactComponent as Edit } from '../../../assets/images/resident-detail/edit.svg';
// import { ReactComponent as Todo } from '../../../assets/images/resident-detail/todo.svg';
// import { ReactComponent as Clarification } from '../../../assets/images/resident-detail/clarification.svg';

import { Refresh, View, Notes, Reminder, MoreDots, Audit } from '../../../assets/images/pmr/index';
// import { ReactComponent as View } from '../../../assets/images/pmr/view.svg';
// import { ReactComponent as Notes } from '../../../assets/images/pmr/notes.svg';
// import { ReactComponent as Reminder } from '../../../assets/images/pmr/reminder.svg';
// import { ReactComponent as MoreDots } from '../../../assets/images/pmr/more-dots.svg';
// import { ReactComponent as Audit } from '../../../assets/images/pmr/audit.svg';

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
import { TabPanel } from 'react-tabs';
import { tabData } from "../../../components/common/Tab/data";
import CommonTab from "../../../components/common/Tab";
import TogglePane from "./togglePane";


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

            <div className="resi_treat_content_wrap archive_tab">
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
                            <input type="text" placeholder="Search by Physician" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>
                        <div className="components search">
                            <input type="text" placeholder="Search by Name" className="inputForm"
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
                                Sr. No.
                                                    </div>
                            <div className="p_head tp">
                                Type
                                                    </div>
                            <div className="p_head ar">
                                Archive By
                                                    </div>
                            <div className="p_head dt">
                                Date & Time
                        </div>
                            <div className="p_head rs">
                                Reason
                                                    <Filters />
                            </div>
                            <div className="p_head ac">
                                Actions
                        <div className="refresh">
                                    <a>
                                        <Refresh />
                                    </a>


                                </div>
                            </div>
                        </div>
                            {/*archive start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>01</span>
                                    </div>
                                    <div className="patient_order_d tp">
                                        <span>Rx Orders</span>
                                        <a>Rx 123456</a>
                                    </div>
                                    <div className="patient_order_d ar">
                                        <span>Dr. Ardiles, Osvaldo</span>
                                    </div>
                                    <div className="patient_order_d dt">
                                        <span>01st May 2020</span>
                                        <span>09:53 am</span>
                                    </div>

                                    <div className="patient_order_d rs">
                                        <span>
                                            Lorem Ipsum is a dummy text. Lorem Ipsum
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                {/* <span className="notes tot">05</span> */}
                                            </a>

                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                                {/* <span className="todo tot">05</span> */}
                                            </a>
                                            <a>
                                                <Clarification />
                                                <p>Clarification</p>
                                                {/* <span className="rem tot">05</span> */}
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
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*archive end*/}
                            {/*archive start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>02</span>
                                    </div>
                                    <div className="patient_order_d tp">
                                        <span>PMR</span>
                                        <a>123456</a>
                                    </div>
                                    <div className="patient_order_d ar">
                                        <span>-</span>
                                    </div>
                                    <div className="patient_order_d dt">
                                        <span>01st May 2020</span>
                                        <span>09:53 am</span>
                                    </div>

                                    <div className="patient_order_d rs">
                                        <span>
                                            Lorem Ipsum is a dummy text. Lorem Ipsum
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                {/* <span className="notes tot">05</span> */}
                                            </a>

                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                                {/* <span className="todo tot">05</span> */}
                                            </a>
                                            <a>
                                                <Clarification />
                                                <p>Clarification</p>
                                                {/* <span className="rem tot">05</span> */}
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
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*archive end*/}
                            {/*archive start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>03</span>
                                    </div>
                                    <div className="patient_order_d tp">
                                        <span>Rx Orders</span>
                                        <a>Rx 123456</a>
                                    </div>
                                    <div className="patient_order_d ar">
                                        <span>Dr. Ardiles, Osvaldo</span>
                                    </div>
                                    <div className="patient_order_d dt">
                                        <span>01st May 2020</span>
                                        <span>09:53 am</span>
                                    </div>

                                    <div className="patient_order_d rs">
                                        <span>
                                            Lorem Ipsum is a dummy text. Lorem Ipsum
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                {/* <span className="notes tot">05</span> */}
                                            </a>

                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                                {/* <span className="todo tot">05</span> */}
                                            </a>
                                            <a>
                                                <Clarification />
                                                <p>Clarification</p>
                                                {/* <span className="rem tot">05</span> */}
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
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*archive end*/}
                            {/*archive start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>04</span>
                                    </div>
                                    <div className="patient_order_d tp">
                                        <span>Rx Orders</span>
                                        <a>Rx 123456</a>
                                    </div>
                                    <div className="patient_order_d ar">
                                        <span>Dr. Ardiles, Osvaldo</span>
                                    </div>
                                    <div className="patient_order_d dt">
                                        <span>01st May 2020</span>
                                        <span>09:53 am</span>
                                    </div>

                                    <div className="patient_order_d rs">
                                        <span>
                                            Lorem Ipsum is a dummy text. Lorem Ipsum
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                {/* <span className="notes tot">05</span> */}
                                            </a>

                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                                {/* <span className="todo tot">05</span> */}
                                            </a>
                                            <a>
                                                <Clarification />
                                                <p>Clarification</p>
                                                {/* <span className="rem tot">05</span> */}
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
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*archive end*/}
                            {/*archive start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>05</span>
                                    </div>
                                    <div className="patient_order_d tp">
                                        <span>Resident document</span>
                                        <a>End of life orders</a>
                                    </div>
                                    <div className="patient_order_d ar">
                                        <span>-</span>
                                    </div>
                                    <div className="patient_order_d dt">
                                        <span>01st May 2020</span>
                                        <span>09:53 am</span>
                                    </div>

                                    <div className="patient_order_d rs">
                                        <span>
                                            Lorem Ipsum is a dummy text. Lorem Ipsum
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                {/* <span className="notes tot">05</span> */}
                                            </a>

                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                                {/* <span className="todo tot">05</span> */}
                                            </a>
                                            <a>
                                                <Clarification />
                                                <p>Clarification</p>
                                                {/* <span className="rem tot">05</span> */}
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
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*archive end*/}
                            {/*archive start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>06</span>
                                    </div>
                                    <div className="patient_order_d tp">
                                        <span>Rx Orders</span>
                                        <a>Rx 123456</a>
                                    </div>
                                    <div className="patient_order_d ar">
                                        <span>Dr. Ardiles, Osvaldo</span>
                                    </div>
                                    <div className="patient_order_d dt">
                                        <span>01st May 2020</span>
                                        <span>09:53 am</span>
                                    </div>

                                    <div className="patient_order_d rs">
                                        <span>
                                            Lorem Ipsum is a dummy text. Lorem Ipsum
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                {/* <span className="notes tot">05</span> */}
                                            </a>

                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                                {/* <span className="todo tot">05</span> */}
                                            </a>
                                            <a>
                                                <Clarification />
                                                <p>Clarification</p>
                                                {/* <span className="rem tot">05</span> */}
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
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*archive end*/}
                            {/*archive start*/}
                            <div className="patient_order_detail">
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>07</span>
                                    </div>
                                    <div className="patient_order_d tp">
                                        <span>Rx Orders</span>
                                        <a>Rx 123456</a>
                                    </div>
                                    <div className="patient_order_d ar">
                                        <span>Dr. Ardiles, Osvaldo</span>
                                    </div>
                                    <div className="patient_order_d dt">
                                        <span>01st May 2020</span>
                                        <span>09:53 am</span>
                                    </div>

                                    <div className="patient_order_d rs">
                                        <span>
                                            Lorem Ipsum is a dummy text. Lorem Ipsum
                                                            </span>
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                {/* <span className="notes tot">05</span> */}
                                            </a>

                                            <a>
                                                <Audit />
                                                <p>Audit</p>
                                                {/* <span className="todo tot">05</span> */}
                                            </a>
                                            <a>
                                                <Clarification />
                                                <p>Clarification</p>
                                                {/* <span className="rem tot">05</span> */}
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
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*archive end*/}



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


            </div>
        </>)
    }
}
export default createForm()(OrderTab);