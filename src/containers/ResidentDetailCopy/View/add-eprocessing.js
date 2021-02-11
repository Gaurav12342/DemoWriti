import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import { PlusBtn } from '../../../assets/images/resident-detail/index';

import { Close,Next,Prev } from '../../../assets/images/index';

import Image from '../../../components/common/Image';
class OnGoingCall extends Component {
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
            <div className="on_going_call_wrap add_eprocessing">
                <div className="on_going_call_container">
                    <div className="call_header">
                        <h4>Add E-Processing for O'Laughlin Craig</h4>
                        <p>Created By : Nurse Patrick Jane, Created At : 26th May, 2020 | 04:00 pm</p>
                    </div>
                    <div className="call_detail_wrap">
                        <div className="call_detail_content">
                            <form>
                                <div className="form_wrap flex-wrap">
                                    <div className="doc_type filter_wrap">
                                        <div className="filter_section">
                                            <h4 className="filter_head">
                                                Document Type
                                    </h4>
                                            <div className="filter_value">
                                                <label for="os" className="filter_switch">
                                                    <input type="radio" name="doc" id="os" />
                                                    <span>Order Sets</span>
                                                </label>
                                                <label for="pp" className="filter_switch">
                                                    <input type="radio" name="doc" id="pp" />
                                                    <span>3rd Party Prescription</span>
                                                </label>
                                                <label for="lw" className="filter_switch">
                                                    <input type="radio" name="doc" id="lw" />
                                                    <span>Lab Work</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex authorized">
                                        <div className="components pl-0">
                                            {getFieldDecorator('physician', {
                                                rules: [{
                                                    required: true, type: 'physician',
                                                    message: 'Select Physician',
                                                }],
                                            })(
                                                <select className="inputForm select" placeholder="">
                                                    <option value="">
                                                        Dr. Osvaldo Ardiles
                                                            </option>
                                                    <option value="">
                                                        Dr. Osvaldo Ardiles
                                                            </option>
                                                    <option value="">
                                                        Dr. Osvaldo Ardiles
                                                            </option>
                                                    <option value="">
                                                        Dr. Osvaldo Ardiles
                                                            </option>
                                                </select>
                                            )}
                                            {(errors = getFieldError('physician')) ? errors.join(',') : null}
                                        </div>
                                        <div className="components filter_value">
                                            {getFieldDecorator('autho', {
                                                rules: [{
                                                    required: false, type: 'autho'

                                                }],
                                            })(
                                                <label for="vvs" className="filter_check">
                                                    <input type="checkbox" name="vvs" id="vvs" />
                                                    <span className="checkbox"></span>
                                                    <span className="lbl">Authorized by medical directive</span>
                                                </label>
                                            )}

                                        </div>
                                    </div>
                                    <div className="upd_sec_wrap">
                                        <div className="upd_sec ">
                                            <PlusBtn />
                                            <span>Upload Images</span>
                                        </div>
                                        <div className="upd_sec ">
                                            <PlusBtn />
                                            <span>Add Notes</span>
                                        </div>
                                        <div className="upd_sec ">
                                            <PlusBtn />
                                            <span>Set Reminder</span>
                                        </div>
                                    </div>
                                    <div className="upl_files_wrap">
                                        <div className="upd_file">
                                            <span>Image1.jpeg</span>
                                            <Close />
                                        </div>
                                        <div className="upd_file">
                                            <span>Image2.jpeg</span>
                                            <Close />
                                        </div>
                                    </div>

                                    <div className="footer_btn">
                                        <button class="prev-screen-btn gray-btn">CANCEL</button>
                                        <button class="prev-screen-btn">SAVE</button>
                                    </div>
                                </div>


                            </form>









                        </div>
                        <div className="uploaded_image_viewer_wrap">
                            <div className="uploaded_image_viewer_container">

                                <div className="head">
                                    <h5>Image1</h5>
                                    <a>
                                        ZOOM IN
                                 </a>
                                </div>
                                <figure>
                                    <Image image={require('../../../assets/images/resident-detail/xray.png')} alt="image" />
                                </figure>
                                <div className="pagination_wrap">
                                    <div className="pagination">
                                        <a><Prev /></a>
                                        <a className="active_page">01</a>
                                        <a>02</a>
                                        <a>03</a>
                                        <a>04</a>
                                        <a>05</a>
                                        <a><Next /></a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>)
    }
}
export default createForm()(OnGoingCall);