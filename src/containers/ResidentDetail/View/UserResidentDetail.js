import React, {
  useState,
  memo,
  useCallback,
  useEffect,
  createContext,
} from 'react';
import { useSelector } from 'react-redux';
import { TabPanel } from 'react-tabs';
import { tabData, TAB_KEYS } from '../../../components/common/Tab/data';
import PersistentTabs from '../../../components/common/Tab/PersistentTabs';
import OrdersTab from './OrdersTab';
import PmrTab from './PmrTab/index';
import XRayTab from './xrayTab';
import NotesTab from './NotesTab/index';
// import DigitalBinderTab from "./digitalBinderTab";
import DigitalBinder from '../View/DigitalBinder/index';
import VirtualVisitTabData from './virtualVisitTab';
import AddResident from './addResident';
import EProcessing from './EProcessing/index';
import AddEProcessing from './EProcessing/AddEProcessing';
// import EProcessing from "./eProcessing";
import TodoTab from './todoTab';
import ArchiveTab from './ArchiveTab/index';
import Timeline from './timeline';
import NoData from './noData';
import OverviewTab from './OverviewTab';
import {
  UpdResidentDoc,
  Eprocessing,
  NewPrescription,
  VirtualVisit,
} from '../../../assets/images/resident-detail/index';
import { PrescriptionForm } from '../../../components/Prescription';
import { isModuleAccessible, canPerformAction } from '../../../util/common';
import { MODULE, ACTIONS } from '../../../constants/subscription';
import { updateOpenResident } from '../../../appRedux/actions/Resident';
import Tooltip from 'rc-tooltip';

export const actionContext = createContext([]);
const UserResidentDetail = ({ userName, residentDetail }) => {
  // add residentSetail as context provider
  const authUser = useSelector((state) => state.auth.authUser);
  const [show, setShow] = useState(false);
  const [addEprocessing, setAddEprocessing] = useState(false);
  const [residentActions, setResidentActions] = useState([]);
  const [activeActionTab, setActiveActionTab] = useState();
  const [activeParentTab, setActiveParentTab] = useState();
  const [activeIndex, setActiveIndex] = useState({
    parent: 0,
    actions: 0,
  });
  const [parentTab, setParentTab] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    let newTabs = { ...tabData };
    newTabs.subTab = newTabs.subTab.filter((x) => {
      //filter permissions here
      let isAccessible = true;
      if (!x.excludeRolePerm) {
        isAccessible = (isModuleAccessible(x.module) &&
          canPerformAction({
            moduleId: x.module,
            actiontoCheck: ACTIONS.LIST.CODE,
          }));
      }
      if (isAccessible) return x;
    });

    newTabs.resiTreat = newTabs.resiTreat.filter((x) => {
      //filter permissions here
      let isAccessible = true;
      if (!x.excludeRolePerm) {
        isAccessible = (isModuleAccessible(x.module) &&
          canPerformAction({
            moduleId: x.module,
            actiontoCheck: ACTIONS.LIST.CODE,
          }));
      }
      if (isAccessible) return x;
    });

    setParentTab(newTabs.subTab);
    setResidentActions(newTabs.resiTreat);
  }, []);

  const toggleBox = () => {
    handleToggleBoxes(TAB_KEYS.ORDERS);
    if (orderDetail) setOrderDetail(null);
    setShow((s) => !s);
  };

  const eProcessing = () => {
    handleToggleBoxes(TAB_KEYS.E_PROCESSING);
    setAddEprocessing((e) => !e);
  };

  const handleToggleBoxes = (tabkey) => {
    // handles another opened toggle boxes. at a time only 1 togglebox can be open
    if (tabkey !== TAB_KEYS.E_PROCESSING && addEprocessing) eProcessing();
    if (tabkey !== TAB_KEYS.ORDERS && show) toggleBox();
  };

  const renderParentHeader = useCallback((params) => {
    getParentHeader(params);
    const { item, isActive, index } = params;
    return (
      <div className='resi_d'>
        <h3>{item.tabtitle}</h3>
      </div>
    );
  }, []);

  const renderTabTitle = ({ item }) => {
    return (
      <>
        <div className='resi_d'>
          <h3>{item.tabtitle}</h3>
        </div>
        <div className='c_records'>{item.records}</div>
      </>
    );
  };

  const getHeader = ({ item, isActive }) => {
    if (!isActive) return;
    // setActiveActionTab(item.module)
  };
  const getParentHeader = ({ item, isActive }) => {
    if (!isActive) return;
    // setActiveParentTab(item.module)
  };

  const renderActionsHeader = useCallback((item) => {
    getHeader(item);
    return <>{renderTabTitle(item)}</>;
  }, []);

  const handleFetchData = (opt) => {
    let newActions = [...residentActions];
    let index = newActions.findIndex((x) => x.module === opt.module);
    if (index > -1) {
      newActions[index] = { ...newActions[index], ...opt };
      setResidentActions(newActions);
    }
  };

  const handleSelectActions = (tabIndex) => {
    //   console.log("UserResidentDetail -> tabIndex", tabIndex)
    //   setActiveActionTab(tabIndex)
  };
  const handleSelectSecondTab = (tabIndex) => {
    //   console.log("handleSelectSecondTab -> tabIndex", tabIndex)
    //   // setActiveActionTab(tabIndex)
  };

  const handleSavePresc = () => {
    toggleBox();
    let parentIndex = parentTab.findIndex((x) => x.module === 'ACTIONS');
    let actionIndex = residentActions.findIndex(
      (x) => x.module === MODULE.RX_ORDER
    );
    setActiveIndex({
      parent: parentIndex,
      actions: actionIndex,
    });
    // updateOpenResident({ tabkey: TAB_KEYS.ORDERS, response: null })
  };

  const handleSaveEProcessing = () => {
    eProcessing();
    let parentIndex = parentTab.findIndex((x) => x.module === 'ACTIONS');
    let actionIndex = residentActions.findIndex(
      (x) => x.module === MODULE.E_PROCESSING
    );
    setActiveIndex({
      parent: parentIndex,
      actions: actionIndex,
    });
  };

  const handleEditRx = (detail) => {
    toggleBox();
    setOrderDetail(detail);
  };

  return (
    <>
      <PersistentTabs
        wrapperClass='resi_treat'
        key={userName + '2nd'}
        data={parentTab}
        renderHeader={renderParentHeader}
        canSwitchTab={!show && !addEprocessing} //add flag here of toggle icons
        onSelect={handleSelectSecondTab}
        activeTabIndex={activeIndex.parent}
      >
        {show ? (
          <PrescriptionForm
            residentDetail={residentDetail}
            authUser={authUser}
            edit={orderDetail}
            onCancel={toggleBox}
            onOk={handleSavePresc}
          />
        ) : addEprocessing ? (
          <AddEProcessing
            residentDetail={residentDetail}
            authUser={authUser}
            // edit={orderDetail}
            onCancel={eProcessing}
            onOk={handleSaveEProcessing}
          />
        ) : (
              <>
                <OverviewTab
                  tabKey={TAB_KEYS.OVERVIEW}
                  residentDetail={residentDetail}
                />
                <DigitalBinder
                  residentDetail={residentDetail}
                  tabKey={TAB_KEYS.DIGITAL_BINDER}
                  onEditRx={handleEditRx}
                // onFetchData={handleFetchData}
                />
                {/* <DigitalBinderTab tabKey={TAB_KEYS.DIGITAL_BINDER} /> */}
                <PersistentTabs
                  key={userName + '3rd'}
                  data={residentActions}
                  renderHeader={renderActionsHeader}
                  onSelect={handleSelectActions}
                  activeTabIndex={activeIndex.actions}
                  tabKey={TAB_KEYS.ACTIONS}
                >
                  <OrdersTab
                    tabKey={TAB_KEYS.ORDERS}
                    onFetchData={handleFetchData}
                    residentActions={residentActions}
                    onEditRx={handleEditRx}
                    residentDetail={residentDetail}
                  />
                  <PmrTab tabKey={TAB_KEYS.PMR} onFetchData={handleFetchData} />
                  <NoData />
                  <EProcessing
                    tabKey={TAB_KEYS.E_PROCESSING}
                    onFetchData={handleFetchData}
                    onEditRx={handleEditRx}
                    residentDetail={residentDetail}
                  />
                  <TodoTab tabKey={TAB_KEYS.TODO} onFetchData={handleFetchData} />
                  <VirtualVisitTabData
                    tabKey={TAB_KEYS.VIRTUAL_VISIT}
                    onFetchData={handleFetchData}
                  />
                  <XRayTab tabKey={TAB_KEYS.X_RAY} onFetchData={handleFetchData} />
                  <ArchiveTab
                    tabKey={TAB_KEYS.ARCHIVE}
                    onFetchData={handleFetchData}
                  />
                </PersistentTabs>
                <Timeline tabKey={TAB_KEYS.TIMELINE} />
                <NotesTab tabKey={TAB_KEYS.NOTES} />
              </>
            )}
      </PersistentTabs>
      <div className='resi_opt'>
        {isModuleAccessible(MODULE.RX_ORDER) &&
          canPerformAction({
            moduleId: MODULE.RX_ORDER,
            actiontoCheck: ACTIONS.ADD.CODE || ACTIONS.EDIT.CODE,
          }) ? (
            <div className={show ? 'active' : ''} onClick={toggleBox}>
              <Tooltip
                placement="bottom"
                overlay={
                  <div>
                    <b>New Prescription</b>
                  </div>
                }
              >

                <NewPrescription />
              </Tooltip>
            </div>
          ) : null}
        {isModuleAccessible(MODULE.E_PROCESSING) &&
          canPerformAction({
            moduleId: MODULE.E_PROCESSING,
            actiontoCheck: ACTIONS.ADD.CODE || ACTIONS.EDIT.CODE,
          }) ? (
            <div className={addEprocessing ? 'active' : ''} onClick={eProcessing}>
              <Tooltip
                placement="bottom"
                overlay={
                  <div>
                    <b>E Processing</b>
                  </div>
                }
              >
                <Eprocessing />
              </Tooltip>
            </div>
          ) : null}

        {/* <div>
                  <pmrTab />
                </div> */}
        {isModuleAccessible(MODULE.RESIDENT_DOCUMENT) &&
          canPerformAction({
            moduleId: MODULE.RESIDENT_DOCUMENT,
            actiontoCheck: ACTIONS.UPLOAD.CODE,
          }) ? (
            <div>
              <UpdResidentDoc />
            </div>
          ) : null}
        {isModuleAccessible(MODULE.VIRTUAL_VISIT) &&
          canPerformAction({
            moduleId: MODULE.VIRTUAL_VISIT,
            actiontoCheck: ACTIONS.ADD.CODE || ACTIONS.EDIT.CODE,
          }) ? (
            <div>
              <Tooltip
                placement="bottom"
                overlay={
                  <div>
                    <b>Virtual Visit</b>
                  </div>
                }
              >

                <VirtualVisit />
              </Tooltip>
            </div>
          ) : null}
      </div>
    </>
  );
};
export default memo(UserResidentDetail);
