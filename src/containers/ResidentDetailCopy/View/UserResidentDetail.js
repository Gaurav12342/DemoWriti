import React, { useState, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { TabPanel } from "react-tabs";
import { tabData } from "../../../components/common/Tab/data";
import PersistentTabs from "../../../components/common/Tab/PersistentTabs";
import OrderesTabData from "./OrdersTab";
import PmrTab from "./pmrTab";
import XRayTab from "./xrayTab";
import NotesTab from "./notesTab";
import DigitalBinderTab from "./digitalBinderTab";
import VirtualVisitTabData from "./virtualVisitTab";
import AddResident from "./addResident";
import EProcessing from "./eProcessing";
import TodoTab from "./todoTab";
import ArchiveTab from "./archiveTab";
import Timeline from "./timeline";
import NoData from "./noData";
import OverviewTab from './OverviewTab'
import { UpdResidentDoc, Eprocessing, NewPrescription, VirtualVisit } from '../../../assets/images/resident-detail/index';
import { PrescriptionForm } from "../../../components/Prescription";
import { isModuleAccessible } from "../../../util/common";
import { MODULE } from "../../../constants/subscription";
import Tooltip from 'rc-tooltip';

const UserResidentDetail = ({ userName, residentDetail }) => {
  const authUser = useSelector(state => state.auth.authUser);
  const [show, setShow] = useState(false);
  const [addEprocessing, setAddEprocessing] = useState(false);

  const toggleBox = () => {
    setShow(s => !s)
  }

  const eProcessing = () => {
    setAddEprocessing(e => !e)
  }

  const renderParentHeader = useCallback(({ item }) => (
    <div className="resi_d">
      {
        item.module ? isModuleAccessible(item.module) ? <h3>{item.tabtitle}</h3> : null : <h3>{item.tabtitle}</h3>
      }
    </div>
  ), [])

  const renderTabTitle = (item) => (
    <>
      <div className="resi_d">
        <h3>{item.tabtitle}</h3>
      </div>
      <div className="c_records">{item.records}</div>
    </>
  )
  const renderActionsHeader = useCallback(({ item }) => (
    <>
      {
        item.module ? isModuleAccessible(item.module) ? renderTabTitle(item) : null : renderTabTitle(item)
      }
    </>
  ), [])

  return (
    <>

      <PersistentTabs
        wrapperClass='resi_treat'
        key={userName + '2nd'} data={tabData.subTab}
        renderHeader={renderParentHeader}
        canSwitchTab={!show}
      >
        {show ?
          <PrescriptionForm residentDetail={residentDetail} authUser={authUser}
            onCancel={toggleBox} />
          :
          <>
            <OverviewTab />
            <DigitalBinderTab />

            <PersistentTabs
              key={userName + '3rd'}
              data={tabData.resiTreat}
              renderHeader={renderActionsHeader}
            >
              <OrderesTabData />
              <PmrTab />
              <NoData />
              <EProcessing />
              <TodoTab />
              <VirtualVisitTabData />
              <XRayTab />
              <ArchiveTab />
            </PersistentTabs>
            <Timeline />
            <NotesTab />
          </>
        }
      </PersistentTabs>
      <div className="resi_opt">
       <div
            className={show ? "active" : ""}
            onClick={toggleBox}
          >

            <NewPrescription />
          </div>
       
        <div
          className={addEprocessing ? "active" : ""}
          onClick={eProcessing}
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
    </>
  )
}
export default memo(UserResidentDetail)