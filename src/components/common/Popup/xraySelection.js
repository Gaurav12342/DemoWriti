/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import { Check } from '../../../assets/images/todo/index';
import Dialog from 'rc-dialog';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import '../../../../node_modules/rc-datepicker/lib/style.css';

import {
  DatePicker,
  DatePickerInput,
} from 'rc-datepicker';
import Modal from "./index";

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
        title="Chest X-Ray - O'Laughlin, Crig (Room No 2056)"
        maskClosable={true}
        // customChildren={true}
        onCancel={this.handleCloseModal}
        onClose={this.handleCloseModal}
        footer={true}
        className="lock_popup xray_selection_popup"
        closable={false}

        btnClass="d-flex-end f-end footer-block"

      >

        <form >
          <div className="xray_type">

            <div className="form_wrap">
              <div className="components">
                <label for="pne" className="lg_check">
                  <input type="checkbox" id="pne" />
                  <span>Pneumonia
                <Check />
                  </span>

                </label>
              </div>
              <div className="components">
                <label for="con" className="lg_check">
                  <input type="checkbox" id="con" />
                  <span>Congestive Heart Failure
                <Check />
                  </span>

                </label>
              </div>
              <div className="components">
                <label for="tb" className="lg_check">
                  <input type="checkbox" id="tb" />
                  <span>TB
                <Check />
                  </span>

                </label>
              </div>
              <div className="components">
                <label for="ple" className="lg_check">
                  <input type="checkbox" id="ple" />
                  <span>Pleural Effusion
                <Check />
                  </span>

                </label>
              </div>
              <div className="components">
                <label for="mas" className="lg_check">
                  <input type="checkbox" id="mas" />
                  <span>Mass/NeoPlasm
                <Check />
                  </span>

                </label>
              </div>
              <div className="components textarea">
                <textarea placeholder="Other"></textarea>
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