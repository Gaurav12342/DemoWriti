/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import { Check } from '../../../assets/images/todo/index';
import { Cancel, Clarification } from '../../../assets/images/resident-detail/index';
import { Notes } from '../../../assets/images/pmr/index';
import { AddNotes } from '../../../assets/images/popup/index';
import Dialog from 'rc-dialog';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import '../../../../node_modules/rc-datepicker/lib/style.css';

import {
  DatePicker,
  DatePickerInput,
} from 'rc-datepicker';
import Modal from "./index";

class XrayReviewPopup extends Component {

  constructor() {
    super();
    this.state = {
      reviewPopup: false
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
        title="X-Ray Request - O'Laughlin, Craig (Room No 2056)"
        maskClosable={true}
        // customChildren={true}
        onCancel={this.handleCloseModal}
        onClose={this.handleCloseModal}
        footer={false}
        className="lock_popup xray_selection_popup xray_review"
        closable={false}

        btnClass="d-flex-end f-end footer-block"

      >

        <form >
          <div className="created_by">
            <span>Created By : Nurse Patrick Jane</span>
            <span>Created At : 26th May, 2020 | 09:53 am</span>
          </div>
          <div className="xray_list_wrap">
            <div className="xray_list">
              <div className="xray_name">
                <span>Chest</span>
                <Cancel />
              </div>
              <div className="xray_detail">
                <p>Pneumonia, Pleural Effusion</p>
              </div>
            </div>
            <div className="xray_list">
              <div className="xray_name">
                <span>Femur</span>
                <Cancel />
              </div>
              <div className="xray_detail">
                <h4>Left</h4>
                <p>Metastasis/Erosion, Post Operative, Lorem Ipsum Dummy Text</p>
              </div>
            </div>
            <div className="xray_list multi">
              <div className="xray_name">
                <span>Toes</span>
                <Cancel />
              </div>
              <div className="xray_part_wrap">
                <div className="xray_detail">
                  <div className="part_title">
                    <h4>Left</h4>
                    <Cancel />
                  </div>
                  <p>Fracture, Lorem Ipsum dummy text</p>
                </div>
                <div className="xray_detail">
                  <div className="part_title">
                    <h4>Long/Second</h4>
                    <Cancel />
                  </div>
                  <p>Osteomyelitis</p>
                </div>
                <div className="xray_detail">
                  <div className="part_title">
                    <h4>Third/Middle</h4>
                    <Cancel />
                  </div>
                  <p>Fracture, Lorem Ipsum dummy text</p>
                </div>
                <div className="xray_detail">
                  <div className="part_title">
                    <h4>Fifth/Pinky</h4>
                    <Cancel />
                  </div>
                  <p>Fracture, Lorem Ipsum dummy text</p>
                </div>
              </div>
            </div>
            <div className="xray_list">
              <div className="xray_name">
                <span>Wrist</span>
                <Cancel />
              </div>
              <div className="xray_detail">
                <h4>Both</h4>
                <p>Lorem Ipsum Dummy Text</p>
              </div>
            </div>
          </div>
          <div className="form_wrap">
            <div className="components textarea">
              <div className="label">
                <span>Reason for Examination (Clinical Information)</span>
                <span><Check /> Is this examination urgent?</span>
              </div>
              <textarea></textarea>
            </div>
          </div>
        </form>
        <div className="modal_footer">
          <div className="actions_wrap">
            <h4>Actions</h4>
            <div className="actions">

              <a >
                <Notes />
                <p>Notes</p>
                <span className="notes tot">05</span>
              </a>
              {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                                            onClosed={() => this.modalActionFn('addNoteModal', false)}
                                        />} */}

              <a>
                <AddNotes />
                <p>Add Note</p>
              </a>
              <a>
                <Clarification />
                <p>Clarification</p>
              </a>

            </div>
          </div>
          <div className="modal_actions">
            <button className="btn btn-primary grey-btn" onClick={this.handleCloseModal}>Cancel</button>
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </Modal>
      {/* end popup */}
    </>);
  }
}
export default XrayReviewPopup;