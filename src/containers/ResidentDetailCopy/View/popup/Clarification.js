/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component, useState } from 'react';
import Modal from "../../../../../src/components/common/Popup/index";
import { createForm, formShape } from 'rc-form';
import Image from '../../../../../src/components/common/Image';
import Tabs, { TabPane } from '../../../../../node_modules/rc-tabs';
import { Nurse, Physician, Group, POA } from '../../../../assets/images/popup';
class ClarificationPopup extends Component {

  constructor() {
    super();
    this.state = {
      show2Modal: true
    };

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //   handleOpenModal () {
  //     this.setState({ show2Modal: true });
  //   }


  handleCloseModal() {
    this.props.onClosed();
    // this.setState({ show2Modal: false });
  }
  render() {
    var callback = function (key) { };
    let errors;
    const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
    return (<>
      {/* start popup */}
      <Modal
        visible={this.props.visible}
        title="Clarification - O'Laughlin, Craig (Room No 2056) Rx Order 123456"
        maskClosable={true}
        // customChildren={true}
        onCancel={this.handleCloseModal}
        onClose={this.handleCloseModal}
        footer={true}
        okText="Clarify"
        btnClass="clari_footer"
        className="lock_popup clari_popup"
        closable={false}
      >
        <form action="">
          <div className="clarification_popup_wrap">
            <div className="d-flex emp_tab">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={<div className="poa-g">
                  <Nurse />
                  <p>Nurse</p>
                </div>} key="1">

                </TabPane>
                <TabPane tab={<div className="poa-g">
                  <Physician />
                  <p className="light-green-text">Physician</p>
                </div>} key="2">
                  <div className="form_wrap">

                    <div className="components search">
                      <input type="text" placeholder="Search by PMR Resident" className="inputForm"
                        onChange={(e) => console.log(e)} />
                    </div>

                  </div>
                  <div className="doc_list">
                    <div className="doc">
                      <Image image={require('../../../../assets/images/d1.png')} alt="image" />
                      <div className="doc_detail">
                        <h4>Dr. Lorem Ipsum</h4>
                        <p>Lorem Ipsum dummy text</p>
                      </div>
                    </div>
                    <div className="doc">
                      <Image image={require('../../../../assets/images/d2.png')} alt="image" />
                      <div className="doc_detail">
                        <h4>Dr. Ramoray Drake</h4>
                        <p>Lorem Ipsum dummy text</p>
                      </div>
                    </div>
                    <div className="doc">
                      <Image image={require('../../../../assets/images/d1.png')} alt="image" />
                      <div className="doc_detail">
                        <h4>Dr. Lorem Ipsum</h4>
                        <p>Lorem Ipsum dummy text</p>
                      </div>
                    </div>
                    <div className="doc">
                      <Image image={require('../../../../assets/images/d2.png')} alt="image" />
                      <div className="doc_detail">
                        <h4>Dr. Ramoray Drake</h4>
                        <p>Lorem Ipsum dummy text</p>
                      </div>
                    </div>
                    <div className="doc">
                      <Image image={require('../../../../assets/images/d1.png')} alt="image" />
                      <div className="doc_detail">
                        <h4>Dr. Lorem Ipsum</h4>
                        <p>Lorem Ipsum dummy text</p>
                      </div>
                    </div>
                    <div className="doc">
                      <Image image={require('../../../../assets/images/d2.png')} alt="image" />
                      <div className="doc_detail">
                        <h4>Dr. Ramoray Drake</h4>
                        <p>Lorem Ipsum dummy text</p>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab={<div className="poa-g">
                  <POA />
                  <p>POA</p>
                </div>} key="3">

                </TabPane>
                <TabPane tab={<div className="poa-g">
                  <Group />
                  <p>Group</p>
                </div>} key="4">

                </TabPane>
              </Tabs>




            </div>


          </div>
        </form>
      </Modal>
      {/* end popup */}
    </>);
  }

}
export default createForm()(ClarificationPopup);
