import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
    DatePicker,
    DatePickerInput,
} from "rc-datepicker";
import AddXrayPopup from '../../../components/common/Popup/xraySelection';

class Xrayhead extends Component {
    constructor(props) {
        super(props);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate());
        this.state = {
            yesterday,
            value: null,
            addXrayPopup: false,
        };
    }
    resetState = () => this.setState({ value: null });
    static propTypes = {
        form: formShape,
    };
    modalActionFn = (key, action) => {
        this.setState({ [key]: action })
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

            <div className="page_head">
                <h3>X-Ray Request <span className="r_no">100</span></h3>
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
                                    Imaging and Diagnostic Filter
                                        </option>
                                <option value="">
                                    Imaging and Diagnostic Filter 1
                                        </option>
                                <option value="">
                                    Imaging and Diagnostic Filter 2
                                        </option>
                                <option value="">
                                    Imaging and Diagnostic Filter 3
                                        </option>
                            </select>
                        </div>

                        <div className="components search">
                            <input type="text" placeholder="Search by Physician" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>
                        <div className="components search">
                            <input type="text" placeholder="Search by Resident" className="inputForm"
                                onChange={(e) => console.log(e)} />
                        </div>
                        <div className="components search">
                            <button type="button" className="btn btn-primary" onClick={() => this.modalActionFn('addXrayPopup', true)}>Add New</button>
                        </div>

                    </div>
                </form>
            </div>
            {this.state.addXrayPopup && <AddXrayPopup visible={this.state.addXrayPopup}
                onClosed={() => this.modalActionFn('addXrayPopup', false)}
            />}
        </>)
    }
}
export default createForm()(Xrayhead);