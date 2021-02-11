import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import { GroupCall,Clarification,Attachments,PlusBtn } from '../../../../assets/images/resident-detail/index';
// import { ReactComponent as GroupCall } from '../../../../assets/images/resident-detail/group-call.svg';
// import { ReactComponent as Clarification } from '../../../../assets/images/resident-detail/clarification.svg';
// import { ReactComponent as Attachments } from '../../../../assets/images/resident-detail/attachments.svg';
// import { ReactComponent as AddResident } from '../../../../assets/images/resident-detail/add-resident.svg';

import { Notes } from '../../../../assets/images/pmr/index';
// import { ReactComponent as Notes } from '../../../../assets/images/pmr/notes.svg';
import Image from '../../../../components/common/Image';
class AfterCall extends Component {
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
            <div className="finish_visit_wrap">
                <div className="creation">
                    <p>Created By : Dr. Osvaldo Ardiles</p>
                    <p>Created At : 28th Aug, 2020 | 04:00 pm</p>
                </div>
                <div className="call_summary_form">
                    <form action="">
                        <div className="form_wrap">

                            <div className="components pl-0">
                                <select className="inputForm select" placeholder="">
                                    <option value="">
                                        Select Primary Reason
                                                            </option>
                                    <option value="">
                                        Reason 1
                                                            </option>
                                    <option value="">
                                        Reason 2
                                                            </option>
                                    <option value="">
                                        Reason 3
                                                            </option>
                                </select>
                            </div>
                            <div className="components">
                                <select className="inputForm select" placeholder="">
                                    <option value="">
                                        Select Billing Codes
                                                            </option>
                                    <option value="">
                                        Billing Code 1
                                                            </option>
                                    <option value="">
                                        Billing Code 2
                                                            </option>
                                    <option value="">
                                        Billing Code 3
                                                            </option>
                                </select>
                            </div>
                            <div className="components pl-0">
                                <select className="inputForm select" placeholder="">
                                    <option value="">
                                        Select Outcome Reason
                                                            </option>
                                    <option value="">
                                        Outcome Reason 1
                                                            </option>
                                    <option value="">
                                        Outcome Reason 2
                                                            </option>
                                    <option value="">
                                        Outcome Reason 3
                                                            </option>
                                </select>
                            </div>
                            <div className="components textarea pl-0 pr-0">
                                <textarea placeholder="Notes" className="inputForm"
                                    onChange={(e) => console.log(e)} />
                            </div>
                            <div className="add_attachment">
                                <div className="attach_file">
                                    <Attachments />
                                    <span>Attach</span>
                                </div>
                                <div className="add_order_xray">
                                    <div className="add_rx">
                                        <PlusBtn />
                                        <h4>Add Rx Order</h4>
                                    </div>
                                    <div className="add_rx">
                                        <PlusBtn />
                                        <h4>Add X-Ray</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer_btn">
                            <button class="prev-screen-btn gray-btn">CANCEL</button>
                            <button class="prev-screen-btn">FINISH VIRTUAL VISIT</button>
                        </div>
                    </form>
                </div>

            </div>

        </>)
    }
}
export default createForm()(AfterCall);