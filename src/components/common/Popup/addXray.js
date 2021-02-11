/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import '../../../../node_modules/rc-datepicker/lib/style.css';
import {
  DatePicker,
  DatePickerInput,
} from 'rc-datepicker';
import Modal from "../../../../src/components/common/Popup/index";

class AddResidentPopup extends Component {

  constructor() {
    super();
    this.state = {
      residentModal: false
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);

  }

  handleCloseModal() {
    this.props.onClosed();
  }
  render() {

    return (<>
      {/* start popup */}
      <Modal
        visible={this.props.visible}
        title="Add X-Ray Request - O'Laughlin, Crig (Room No 2056)"
        maskClosable={true}
        // customChildren={true}
        onCancel={this.handleCloseModal}
        onClose={this.handleCloseModal}
        footer={true}
        className="lock_popup addxray-popup"
        closable={false}
        okText="continue"
        btnClass="d-flex-end f-end footer-block"

      >
        <div className="xray_crete">
          <p>Created By : Nurse Patrick Jane</p>
          <p>Created At : 26th May, 2020 | 09:53 am</p>
        </div>
        <form >
          <div className="xray_type">
            <div className="filter_section">
              <h4 className="filter_head">
                Type
                        </h4>
              <div className="filter_value">
                <label for="x" className="filter_switch mb-md-10">
                  <input type="radio" name="xtype" id="x" checked />
                  <span>Mobile X-Ray</span>
                </label>
                <label for="ul" className="filter_switch">
                  <input type="radio" name="xtype" id="ul" />
                  <span>Mobile Ultrasound</span>
                </label>
              </div>
            </div>
            <div className="form_wrap">

              <div className="components">
                <select className="inputForm select" placeholder="">
                  <option value="">
                    Resident
                                        </option>
                  <option value="">
                    Hightower, Madeleine
                                        </option>
                  <option value="">
                    Hightower, Madeleine
                                        </option>
                  <option value="">
                    Hightower, Madeleine
                                        </option>
                </select>
              </div>
              <div className="components">
                <select className="inputForm select" placeholder="">
                  <option value="">
                    Nurse/Practitioner
                                        </option>
                  <option value="">
                    Fisher, Kim
                                        </option>
                  <option value="">
                    Fisher, Kim
                                        </option>
                  <option value="">
                    Fisher, Kim
                                        </option>
                </select>
              </div>



            </div>


          </div>
        </form>
      </Modal>
      {/* end popup */}
    </>);
  }
}
export default AddResidentPopup;