import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
    DatePicker,
    DatePickerInput,
} from "../../../../node_modules/rc-datepicker";
class Pmrhead extends Component {
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

            <div className="page_head">
                <h3>Physician Medication Reviews <span className="r_no">100</span></h3>
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
                        <div className="components">
                            <select className="inputForm select" placeholder="">
                                <option value="">
                                    Filter By Status
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
                        <div className="components">
                            <select className="inputForm select" placeholder="">
                                <option value="">
                                    Filter By Home Area
                                        </option>
                                <option value="">
                                    Primary
                                        </option>
                            </select>
                        </div>
                        <div className="components search">
                            <input type="text" placeholder="Search by PMR Resident" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>

                    </div>
                </form>
            </div>

        </>)
    }
}
export default createForm()(Pmrhead);