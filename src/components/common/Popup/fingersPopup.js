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
        title="Finger(s) X-Ray - O'Laughlin, Craig (Room No 2056)"
        maskClosable={true}
        // customChildren={true}
        onCancel={this.handleCloseModal}
        onClose={this.handleCloseModal}
        footer={true}
        className="lock_popup xray_selection_popup toes_popup"
        closable={false}
        btnClass="d-flex-end f-end footer-block"

      >

        <form >
          <div className="xray_type">

            <div className="form_wrap">
              <div className="inline_check">
                <div className="components">
                  <label for="all" className="lg_check">
                    <input type="checkbox" id="all" />
                    <span>All
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="thumb" className="lg_check">
                    <input type="checkbox" id="thumb" />
                    <span>Thumb
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="index" className="lg_check">
                    <input type="checkbox" id="index" />
                    <span>Index
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="middle" className="lg_check">
                    <input type="checkbox" id="middle" />
                    <span>Middle
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="ring" className="lg_check">
                    <input type="checkbox" id="ring" />
                    <span>Ring
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="pinkie" className="lg_check">
                    <input type="checkbox" id="pinkie" />
                    <span>Pinkie
                    </span>
                  </label>
                </div>
              </div>
              <div className="components">
                <label for="pne" className="lg_check">
                  <input type="checkbox" id="pne" />
                  <span>Fracture
                <Check />
                  </span>

                </label>
              </div>
              <div className="components">
                <label for="con" className="lg_check">
                  <input type="checkbox" id="con" />
                  <span>Osteoarthritis
                <Check />
                  </span>

                </label>
              </div>
              <div className="components">
                <label for="tb" className="lg_check">
                  <input type="checkbox" id="tb" />
                  <span>Rheumatoid Arthritis
                <Check />
                  </span>

                </label>
              </div>


              <div className="components textarea">
                <textarea placeholder="Other"></textarea>
              </div>



            </div>


          </div>
          <div className="bottom-part">
            <div className="d-flex">
              <label>
                <span>Selected&nbsp;-&nbsp;</span>Osteoarthritis (All)
            </label>

            </div>
          </div>
        </form>
      </Modal>
      {/* end popup */}
    </>);
  }
}
export default AddResidentPopup;