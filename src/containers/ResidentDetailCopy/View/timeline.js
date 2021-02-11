import React, { Component, setState } from 'react';
import { createForm, formShape } from 'rc-form';
import {
    DatePicker,
    DatePickerInput,
} from "../../../../node_modules/rc-datepicker";
import { Filters } from '../../../assets/images/resident-detail/index';


class OrderTab extends Component {
    constructor(props) {
        super(props);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate());
        this.state = {
            yesterday,
            value: null,
            showFilter: false,
        };
    }
    static propTypes = {
        form: formShape,
    };
    handleFilter = () => {
        const showFilter = this.state.showFilter
        this.setState({ showFilter: !showFilter })
    }
    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        let errors;
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
        return (<>

            <div className="timeline_wrap">
                <div className="head">
                    <h4>O'Laughlin, Craig (Room No 2056) - COE (Computerised Order Entry)</h4>
                    <Filters onClick={this.handleFilter} />
                </div>
                <div className="timeline_container">
                    <div className="timeline_data">

                        <h3 className="date">15th May 2020</h3>
                        <div className="outer_scroll_wrap">
                            <div className="timeline_time_data_wrap">
                                {/* row start */}
                                <div className="timeline_time_data_row">
                                    <div className="time">
                                        <span>8 am</span>
                                    </div>
                                    <div className="timeline_time_data_container">
                                        <div className="timeline_time_data title">
                                            <span>Status</span>
                                            <span>Co-Signed By</span>
                                            <span>Track Type</span>
                                            <span>To Do</span>
                                            <span>To Do Status</span>
                                            <span>Device</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                    </div>

                                </div>
                                {/* row end */}
                                {/* row start */}
                                <div className="timeline_time_data_row">
                                    <div className="time">
                                        <span>9 am</span>
                                    </div>
                                    <div className="timeline_time_data_container">
                                        <div className="timeline_time_data title">
                                            <span>Status</span>
                                            <span>Co-Signed By</span>
                                            <span>Track Type</span>
                                            <span>To Do</span>
                                            <span>To Do Status</span>
                                            <span>Device</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                    </div>
                                </div>
                                {/* row end */}
                                {/* row start */}
                                <div className="timeline_time_data_row">
                                    <div className="time">
                                        <span>10 am</span>
                                    </div>
                                    <div className="timeline_time_data_container">
                                        <div className="timeline_time_data title">
                                            <span>Status</span>
                                            <span>Co-Signed By</span>
                                            <span>Track Type</span>
                                            <span>To Do</span>
                                            <span>To Do Status</span>
                                            <span>Device</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                    </div>


                                </div>
                                {/* row end */}
                                {/* row start */}
                                <div className="timeline_time_data_row">

                                    <div className="timeline_time_data_container">
                                        <div className="timeline_time_data title">
                                            <span>Status</span>
                                            <span>Co-Signed By</span>
                                            <span>Track Type</span>
                                            <span>To Do</span>
                                            <span>To Do Status</span>
                                            <span>Device</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>

                                    </div>

                                </div>
                                {/* row end */}
                                {/* row start */}
                                <div className="timeline_time_data_row">
                                    <div className="time">
                                        <span>11 am</span>
                                    </div>
                                    <div className="timeline_time_data_container">
                                        <div className="timeline_time_data title">
                                            <span>Status</span>
                                            <span>Co-Signed By</span>
                                            <span>Track Type</span>
                                            <span>To Do</span>
                                            <span>To Do Status</span>
                                            <span>Device</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                    </div>

                                </div>
                                {/* row end */}
                                {/* row start */}
                                <div className="timeline_time_data_row">
                                    <div className="time">
                                        <span>12 pm</span>
                                    </div>
                                    <div className="timeline_time_data_container">
                                        <div className="timeline_time_data title">
                                            <span>Status</span>
                                            <span>Co-Signed By</span>
                                            <span>Track Type</span>
                                            <span>To Do</span>
                                            <span>To Do Status</span>
                                            <span>Device</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>Prescription</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                        <div className="timeline_time_data">
                                            <span>Submitted</span>
                                            <span>Fischer, Kim</span>
                                            <span>To Do</span>
                                            <span>Verbal Order</span>
                                            <span>Completed</span>
                                            <span>Android Tablet1</span>
                                        </div>
                                    </div>
                                </div>
                                {/* row end */}
                            </div>
                        </div>
                    </div>
                    {
                        this.state.showFilter &&
                        <div className="timeline_filter">
                            <form>
                                <div className='form_wrap flex-wrap'>
                                    <div className="components mb-20">
                                        {getFieldDecorator('physician', {
                                            rules: [{
                                                required: true, type: 'physician',
                                                message: 'Select Physician',
                                            }],
                                        })(
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
                                        )}
                                        {(errors = getFieldError('physician')) ? errors.join(',') : null}
                                    </div>
                                    <div className="components mb-20">
                                        <div className="filter_wrap track_type">
                                            <div className="filter_section ">
                                                <h4 className="filter_head">
                                                    Track Type
                                    </h4>
                                                <div className="filter_value pt_0">
                                                    <label for="td" className="filter_check">
                                                        <input type="checkbox" name="vvs" id="td" />
                                                        <span className="checkbox"></span>
                                                        <span className="lbl">To-Do</span>
                                                    </label>
                                                    <label for="prs" className="filter_check">
                                                        <input type="checkbox" name="ptd" id="prs" />
                                                        <span className="checkbox"></span>
                                                        <span className="lbl">Prescription</span>
                                                    </label>
                                                    <label for="d1" className="filter_check">
                                                        <input type="checkbox" name="ptd" id="d1" />
                                                        <span className="checkbox"></span>
                                                        <span className="lbl">Dummy Text</span>
                                                    </label>
                                                    <label for="d2" className="filter_check">
                                                        <input type="checkbox" name="ptd" id="d2" />
                                                        <span className="checkbox"></span>
                                                        <span className="lbl">Lorem Ipsum</span>
                                                    </label>
                                                    <label for="d3" className="filter_check">
                                                        <input type="checkbox" name="ptd" id="d3" />
                                                        <span className="checkbox"></span>
                                                        <span className="lbl">Dummy Text</span>
                                                    </label>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="components mb-20">
                                        {getFieldDecorator('physician', {
                                            rules: [{
                                                required: true, type: 'physician',
                                                message: 'Select Physician',
                                            }],
                                        })(
                                            <select className="inputForm select" placeholder="">
                                                <option value="">
                                                    Device
                                                            </option>
                                                <option value="">
                                                    Device 1
                                                            </option>
                                                <option value="">
                                                    Device 2
                                                            </option>
                                                <option value="">
                                                    Device 3
                                                            </option>
                                            </select>
                                        )}
                                        {(errors = getFieldError('physician')) ? errors.join(',') : null}
                                    </div>
                                    <div className="components mb-20">
                                        {getFieldDecorator('physician', {
                                            rules: [{
                                                required: true, type: 'physician',
                                                message: 'Select Physician',
                                            }],
                                        })(
                                            <select className="inputForm select" placeholder="">
                                                <option value="">
                                                    To Do
                                                            </option>
                                                <option value="">
                                                    To Do 1
                                                            </option>
                                                <option value="">
                                                    To Do 2
                                                            </option>
                                                <option value="">
                                                    To Do 3
                                                            </option>
                                            </select>
                                        )}
                                        {(errors = getFieldError('physician')) ? errors.join(',') : null}
                                    </div>
                                    <div className="components">
                                        {getFieldDecorator('physician', {
                                            rules: [{
                                                required: true, type: 'physician',
                                                message: 'Select Physician',
                                            }],
                                        })(
                                            <select className="inputForm select" placeholder="">
                                                <option value="">
                                                    To Do Status
                                                            </option>
                                                <option value="">
                                                    To Do Status 1
                                                            </option>
                                                <option value="">
                                                    To Do Status 2
                                                            </option>
                                                <option value="">
                                                    To Do Status 3
                                                            </option>
                                            </select>
                                        )}
                                        {(errors = getFieldError('physician')) ? errors.join(',') : null}
                                    </div>
                                </div>
                            </form>
                        </div>
                    }


                </div>
            </div>
        </>)
    }
}
export default createForm()(OrderTab);