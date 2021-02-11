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
        title="Toe(s) X-Ray - O'Laughlin, Craig (Room No 2056)"
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
                  <label for="big" className="lg_check">
                    <input type="checkbox" id="big" />
                    <span>Big/First
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="long" className="lg_check">
                    <input type="checkbox" id="long" />
                    <span>Long/Second
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="third" className="lg_check">
                    <input type="checkbox" id="third" />
                    <span>Third/Middle
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="fourth" className="lg_check">
                    <input type="checkbox" id="fourth" />
                    <span>Fourth/Ring
                    </span>
                  </label>
                </div>
                <div className="components">
                  <label for="fifth" className="lg_check">
                    <input type="checkbox" id="fifth" />
                    <span>Fifth/Pinky
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
                  <span>Osteomyelitis
                <Check />
                  </span>

                </label>
              </div>
              <div className="components">
                <label for="tb" className="lg_check">
                  <input type="checkbox" id="tb" />
                  <span>Osteoarthritis
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
                <span>Selected&nbsp;-&nbsp;</span>Fracture (Big/First), Osteomyelitis (Long/Second)
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