import React, { Component } from "react";
import { createForm, formShape } from "rc-form";
import { UpdResidentDoc, Eprocessing, NewPrescription, VirtualVisit } from '../../../assets/images/resident-detail/index';

import { TabPanel } from "react-tabs";
import { tabData } from "../../../components/common/Tab/data";
import CommonTab from "../../../components/common/Tab";
import TogglePane from "./togglePane";
import OrderesTabData from "./orderesTab";
import PmrTab from "./pmrTab";
import XRayTab from "./xrayTab";
import NotesTab from "./notesTab";
import DigitalBinderTab from "./digitalBinderTab";
import VirtualVisitTabData from "./virtualVisitTab";
import OnGoingCall from "./virtualVisit/onGointVisit";
import AddResident from "./addResident";
import EProcessing from "./eProcessing";
import { CheckAction } from '../../../components/common/CheckAction'
import TodoTab from "./todoTab";
import OnGoingPopupCall from "./popup/v-v-request-detail";
import ArchiveTab from "./archiveTab";
import Timeline from "./timeline";
import NoData from "./noData";
import { MODULE, ACTIONS } from '../../../constants/subscription'
import AddEprocessing from "./add-eprocessing";
import Spin from "../../../components/common/Spin";
import virtualVisitTab from "./virtualVisitTab";
import { canPerformAction } from "../../../util/common";
class ResidentDetail extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      addEprocessing: false,
      isOnGoingCall: OnGoingPopupCall.OnGoingCall,
      isAddRxorderValid: false,
      isListDigitalValid: false
    };
    this.toggleBox = this.toggleBox.bind(this);
    this.eProcessing = this.eProcessing.bind(this);
  }
  componentDidMount() {
    const validationParams = {
      moduleId: MODULE.RX_ORDER,
      actiontoCheck: ACTIONS.ADD.CODE,
    }
    const digitalbinderParams = {
      moduleId: MODULE.DIGITAL_BINDER,
      actiontoCheck: ACTIONS.LIST.CODE
    }
    let isListDigitalValid = canPerformAction(digitalbinderParams)
    let isAddRxorderValid = canPerformAction(validationParams)

    this.setState({
      isListDigitalValid,
      isAddRxorderValid
    })
  }
  toggleBox() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }
  eProcessing() {
    const { addEprocessing } = this.state;
    this.setState({
      addEprocessing: !addEprocessing,
    });
  }
  static propTypes = {
    form: formShape,
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  };

  handleSubTabChange = () => {
    this.setState({ show: false })
  }

  render() {
    const { show } = this.state;
    const { addEprocessing, isAddRxorderValid, isListDigitalValid } = this.state;
    let errors;
    const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;

    return (
      <>
        <div className="residents_detail_container">
          <CommonTab data={tabData.tablist} image >
            <TabPanel className="resi_sub_tab">
              <CommonTab data={tabData.subTab} onSelect={() => this.handleSubTabChange()}>
                {this.state.show ? (
                  <AddResident />
                ) : (
                    <>
                      <TabPanel className="resi_treat"><NoData /></TabPanel>
                      {
                        isListDigitalValid ?
                          <TabPanel className="resi_treat">
                            <DigitalBinderTab />
                          </TabPanel>
                          : null
                      }

                      <TabPanel className="resi_treat">
                        <CommonTab data={tabData.resiTreat} count>
                          <TabPanel>
                            {/* <div className="spin_wrap overlay">
                              <Spin spinning={true}><span>Loading...</span></Spin>
                            </div> */}
                            <OrderesTabData />

                          </TabPanel>
                          {/* <TabPanel>
                            <PmrTab />
                          </TabPanel> */}
                          <TabPanel>
                            <NoData />
                          </TabPanel>
                          <TabPanel>
                            <EProcessing />
                          </TabPanel>
                          <TabPanel>
                            <TodoTab />
                          </TabPanel>
                          <TabPanel>

                            <VirtualVisitTabData />
                          </TabPanel>
                          <TabPanel>
                            <XRayTab />
                          </TabPanel>
                          <TabPanel>
                            <ArchiveTab />
                          </TabPanel>
                        </CommonTab>
                        {/* <AddEprocessing /> */}
                      </TabPanel>
                      <TabPanel className="resi_treat">
                        <Timeline />
                      </TabPanel>
                      <TabPanel className="resi_treat">
                        <NotesTab />
                      </TabPanel>

                      {/* <AddEprocessing /> 
                       <AddResident /> */}
                    </>
                  )}
              </CommonTab>

              <div className="resi_opt">
                <div
                  className={this.state.show ? "active" : ""}
                  onClick={this.toggleBox}>
                  {isAddRxorderValid ? < NewPrescription /> : null}
                </div>
                <div
                  className={this.state.addEprocessing ? "active" : ""}
                  onClick={this.eProcessing}
                >
                  <Eprocessing />
                </div>
                {/* <div>
                  <pmrTab />
                </div> */}
                <div>
                  <UpdResidentDoc />
                </div>
                <div>
                  <VirtualVisit />
                </div>
              </div>
            </TabPanel>
          </CommonTab>
        </div>
      </>
    );
  }
}
export default createForm()(ResidentDetail);
