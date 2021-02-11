import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { createForm, formShape } from 'rc-form';
import {
  Filters,
  DetailsLess,
  VerbalOrder,
  Todo,
  Cancel,
  Clarification,
  Edit,
} from '../../../../assets/images/resident-detail/index';
import {
  Refresh,
  View,
  Notes,
  Reminder,
  MoreDots,
  Audit,
} from '../../../../assets/images/pmr/index';
import {
  FirstPage,
  LastPage,
  Next,
  Prev,
} from '../../../../assets/images/index';

import AddNotesPopup from '../../../../components/common/Popup/addnotes-popup';
import AuditPopup from '../../../../components/common/Popup/audit-popup';
import ViewNotesPopup from '../../../../components/common/Popup/viewnotes-popup';
import ClarificationPopup from '../popup/Clarification';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import { TabPanel } from 'react-tabs';
import { tabData, TAB_KEYS } from '../../../../components/common/Tab/data';
import CommonTab from '../../../../components/common/Tab';
import TogglePane from '../togglePane';
import { Spin, Toast, LightBox } from '../../../../components/common';
import Table from '../../../../components/common/Table/index';
import { Column_classNames } from '../../../../constants/Columns';
import Header from './Header';
import {
  getUserNameWithDesignation,
  capitalizeStr,
  isDrOrNp,
  canPerformAction,
} from '../../../../util/common';
import { displayDateTime } from '../../../../util/moment';
import {
  STATUS,
  ORDER_TYPE,
  STATUS_CLASSNAME,
  ORDER_TYPE_CLASSNAME,
  RX_TYPE,
  MODIFY_ACTION,
  TYPE,
} from '../../../../constants/prescription';
import { MODULE, ACTIONS } from '../../../../constants/subscription';
import axios, { getRxImage } from '../../../../services/api/services/common';
import { getAllRxOrders } from '../../../../services/api/routes/prescription';
import { setUserData } from '../../../../appRedux/actions/Auth';
import { actionContext } from '../UserResidentDetail';
import CancelRxModal from './CancelRxModal';
import AuthenticateModal from '../../../../components/AuthenticateModal';
import { updateOpenResident } from '../../../../appRedux/actions/Resident';
import NotesModal from '../../../../components/NotesPopup/List';
import ReminderModal from '../../../../components/ReminderPopup/List';
import {
  X_RAY_TODO_TYPES,
  TODO_CATEGORY,
  SUB_CATEGORY,
  DEVICE_VIEW,
} from '../../../../constants/todo';
import { getTodoRedirectUrl } from '../../../../util/todo'
const _ = require('lodash');

const NOTALLOWEDSTATUS = [STATUS.CANCELLED, STATUS.EDITED, STATUS.DISCARDED];

const OrderTab = (props) => {
  const {
    onFetchData,
    residentActions,
    isTabActive,
    currentResidentId,
    authUser,
    onEditRx,
    editDetail,
    residentDetail,
  } = props;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);
  const [imgLoader, setImgLoader] = useState(false);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    populate: [
      {
        physicianId: [
          "mergeLFName",
          "type",
          {
            "assignedCustomer": [
              "isActive",
              "homeId",
              {
                "designationId": [
                  "name",
                  "code",
                  "parentId"
                ]
              }
            ],
            // match: { homeId: '5cd963ea1fd1603a09ae7f9f' }
          }
        ]
      },
      { prescriptionMedication: [{ "notes": [] }], match: { isDelete: false } },
      { notes: [{ addedBy: [] }] }
    ],
    sortBy: { orderGeneratedAt: 'DESC' },
    find: {
      residentId: currentResidentId,
      type: [TYPE.COE, TYPE.FTT],
    },
  });

  const [notesModal, setNotesModal] = useState(false);
  const [medicationNotesModal, setMedicationNotesModal] = useState(false);
  const [notesFilterOptions, setNotesFilterOptions] = useState({});
  const [reminderFilterOptions, setReminderFilterOptions] = useState({});
  const [reminderModal, setReminderModal] = useState(false);
  const currentModalData = React.useRef();

  let statusFilters = [];
  Object.keys(STATUS).map((k) => {
    return statusFilters.push({ text: k, value: STATUS[k] });
  });

  const columns = [
    {
      title: 'Sr.No',
      // classname: Column_classNames.sr,
      key: 'index',
      width: '5%',
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    {
      title: 'Rx. No',
      dataIndex: 'orderNumber',
      width: '20%',
      // classname: Column_classNames.ph,
      key: 'orderNumber',
      render: (text, record) => (
        <div style={{ display: 'flex' }}>
          {Object.keys(ORDER_TYPE).map((type) => {
            return ORDER_TYPE[type] == record?.status ? (
              <div className='ot_container' key={ORDER_TYPE[type]}>
                {record.isVerbalOrder ? (
                  <VerbalOrder
                    className={ORDER_TYPE_CLASSNAME[record?.status]}
                  />
                ) : null}
              </div>
            ) : null;
          })}{' '}
          {text}
          {record.isUrgent ? (
            <div>
              <span className={'urgent'}> Urgent </span>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Physician',
      dataIndex: 'physicianId',
      width: '15%',
      // classname: Column_classNames.ph,
      key: 'physicianId',
      render: (text, record) => (
        <span>
          {text?.mergeLFName ? getUserNameWithDesignation(text, true) : ''}
        </span>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'orderGeneratedAt',
      width: '10%',
      // classname: Column_classNames.dt,
      key: 'orderGeneratedAt',
      render: (text, record) => <span>{displayDateTime(text)}</span>,
    },
    {
      title: 'Status',
      width: '15%',
      dataIndex: 'status',
      // classname: Column_classNames.st,
      render: (text, record) => (
        <span>
          {Object.keys(STATUS).map((k) => {
            return STATUS[k] === text ? (
              <span key={k} className={'o_status ' + STATUS_CLASSNAME[text]}>{k}</span>
            ) : null;
          })}
        </span>
      ),
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      showRefresh: true,
      width: '25%',
      // className: Column_classNames.Actions,
      render: (text, record) => {

        const redirectUrl = handlePendingTodo(record)

        return (
          <div className='actions'>
            {
              // imgLoader ?
              //   <Spin spinning={imgLoader} className="center"></Spin>
              //   :
              record.attachments.length > 0 ? (
                <a onClick={() => handleViewImages(true, record)}>
                  <div className='ac_count'>
                    <View />
                  </div>
                  <p>View</p>
                </a>
              ) : null}
            {/* {this.state.viewNoteModal && <ViewNotesPopup visible={this.state.viewNoteModal}
                        onClosed={() => this.modalActionFn('viewNoteModal', false)}
                    />} */}
            {/* <a onClick={this.onAddNotesPopupClick}> */}
            <a onClick={() => createNotesModal(record)}>
              <div className='ac_count'>
                <Notes />
                {record.notesCount ? (
                  <span className='notes tot'>{record.notesCount}</span>
                ) : null}
              </div>
              <p>Notes</p>
            </a>
            {/* {this.state.addNoteModal && <AddNotesPopup visible={this.state.addNoteModal}
                        onClosed={() => this.modalActionFn('addNoteModal', false)}
                    />} */}

            <a target="_blank" href={redirectUrl} style={{ textDecoration: 'none' }}>
              <div className='ac_count'>
                <Todo />
                {record.pendingTodoCount ?
                  <span className='todo tot read'>{record.pendingTodoCount}</span>
                  : null}
              </div>
              <p>To Do</p>
            </a>
            <a
              onClick={() => {
                createReminderModal(record);
              }}
            >
              <div className='ac_count'>
                <Reminder />
                {record.reminderCount ? (
                  <span className='rem tot read'>{record.reminderCount}</span>
                ) : null}
              </div>
              <p>Reminder</p>
            </a>
            <a className='more'>
              <MoreDots />
              <div className='more_wrap'>
                {record.rxType === RX_TYPE.PRESCRIPTION &&
                  record.type === TYPE.COE &&
                  (record.physicianId?._id === authUser._id ||
                    record.addedBy === authUser._id) &&
                  (record.status === STATUS.SUBMITTED ||
                    record.status === STATUS.DRAFT) &&
                  canPerformAction({
                    moduleId: MODULE.RX_ORDER,
                    actiontoCheck: ACTIONS.EDIT.CODE,
                  }) ? (
                    <a onClick={() => handleEditPresc(true, record)}>
                      <Edit />
                      <span>Edit</span>
                    </a>
                  ) : null}
                {record.rxType === RX_TYPE.PRESCRIPTION &&
                  record.status !== STATUS.DISCARDED &&
                  (isDrOrNp(authUser) || record.addedBy === authUser._id) &&
                  record.status !== STATUS.CANCELLED &&
                  canPerformAction({
                    moduleId: MODULE.RX_ORDER,
                    actiontoCheck: ACTIONS.CANCEL.CODE,
                  }) ? (
                    <a onClick={() => handleCancelPresc(true, record)}>
                      <Cancel />
                      <span>Cancel</span>
                    </a>
                  ) : null}
                <a onClick={() => this.modalActionFn('clarificationRef', true)}>
                  <Clarification />
                  <span>Clarification</span>
                </a>
                <a onClick={() => this.modalActionFn('auditPopupRef', true)}>
                  <Audit />
                  <span>Audit</span>
                </a>
                {/* {this.state.auditModal && <AuditPopup visible={this.state.auditModal}
                                onClosed={() => this.modalActionFn('auditModal', false)}
                            />} */}
              </div>
            </a>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    //fetch data while tab is active,
    if (isTabActive) fetch();
  }, [isTabActive, filter]);

  // useEffect(() => {
  //     // empty tab data on set filter
  //     updateOpenResident({ tabkey: TAB_KEYS.ORDERS, response: null })
  // }, [filter])

  // useEffect(() => {
  //     // once tab data is updated in redux then call fetch as filter is set
  //     if (isTabActive)
  //         fetch()
  // }, [residentDetail])

  const fetch = async () => {
    setLoader(true);
    try {
      let res;
      // if (residentDetail[TAB_KEYS.ORDERS]) {
      //     res = residentDetail.response
      // }
      // else
      res = await axios({ ...getAllRxOrders, data: { query: { ...filter } } });
      if (res) {
        if (res.code === 'OK') {
          res.data.list = res.data.list.map((obj, i) => {
            obj.Orders = _.map(obj.prescriptionMedication, 'medicineFullName');
            obj.Direction = _.map(obj.prescriptionMedication, 'direction');
            obj.Indication = _.map(obj.prescriptionMedication, 'indication');
            obj.Actions = []
            _.map(obj.prescriptionMedication, (med) => {
              let actObj = {
                notes: med.notes?.length > 0 ? med.notes : []
                // key: 'notes',
                // value: med.notes?.length > 0 ? med.notes : []
              }
              obj.Actions.push(actObj)
            });
            return obj;
          });
          setData(res.data.list);
          setCount(res.data.count);
          onFetchData({
            tabtitle: 'Orders',
            records: res.data.count,
            module: MODULE.RX_ORDER,
          });
          // updateOpenResident({ tabkey: TAB_KEYS.ORDERS, response: res })
        } else Toast.error(res.message);
      }
      setLoader(false);
    } catch {
      setLoader(false);
    }
  };

  const handleTableChange = (pagination, tfilter, sorter) => {
    console.log("handleTableChange -> pagination, tfilter, sorter", pagination, tfilter, sorter)
    // if (!pagination){} return
    let tempFilter = { ...filter };
    if (pagination) {
      tempFilter = {
        ...tempFilter,
        page: pagination.current,
        limit: pagination.pageSize,
      };
    }
    if (tfilter && Object.keys(tfilter).length) {
      if (tfilter.status && tfilter.status.length) {
        tempFilter.find.status = tfilter.status;
      } else if (tempFilter.find.status) {
        delete tempFilter.find['status'];
      }
      tempFilter.page = 1;
    } else {
      // tempFilter.filter = {
      //     type: tempFilter.filter.type
      // }
    }
    setFilter(tempFilter);
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };

  const onSearch = () => { };

  const onSearchRx = (e) => {
    const value = e.target.value;
    let newFilter = { ...filter };
    newFilter = {
      ...newFilter,
      page: 1,
      search: {
        keyword: value,
        keys: ['orderNumber'],
      },
    };
    setFilter(newFilter);
  };

  const onDoctorChange = (val) => {
    let newFilter = { ...filter };
    newFilter = {
      ...newFilter,
      page: 1,
      find: {
        ...newFilter.find,
        physicianId: val,
      },
    };
    setFilter(newFilter);
  };

  const handleDateChange = (val) => {
    let newFilter = { ...filter };
    // console.log(val)
    newFilter = {
      ...newFilter,
      page: 1,
      gte: [{ orderGeneratedAt: val[0] }],
      lte: [{ orderGeneratedAt: val[1] }],
    };
    setFilter(newFilter);
  };

  const handleCancelPresc = (visible, record, response) => {
    setVisibleCancel(visible);
    setDetail(record);
    if (response) {
      fetch();
      // updateOpenResident({ tabkey: TAB_KEYS.ORDERS, response: null })
    }
  };

  const handleEditPresc = (visible, record, response) => {
    // onEditRx(record)
    if (response) {
      let req = { ...detail, uniqueId: response.uniqueId };
      onEditRx(req);
    }
    setVisibleEdit(visible);
    setDetail(record);
  };

  const handleViewImages = (visible, record) => {
    if (visible) {
      setImgLoader(true)
      getRxImage([record._id]).then(resp => {
        if (resp?.[0])
          record.attachments = resp[0].attachments
        record.attachments.map((x, i) => {
          x.caption = `${record.orderNumber}-${i + 1}`
          return x
        })
        setVisibleImage(visible);
        setDetail(record);

        setImgLoader(false)
      }).catch(err => { setImgLoader(false) })
    } else {
      setVisibleImage(visible);
      setDetail(record);
    }
  };

  const prepareAttachments = () => {
    let imageViewer = [];
    if (detail?.attachments?.length > 0) {
      imageViewer = _.reverse(_.map(detail.attachments, function (a) {
        a.src = a.path;
        return a;
      }));
    }
    return { imageViewer };
  };
  const { imageViewer } = prepareAttachments();

  const visibleNotesModal = (visible, record, str, noteCount) => {
    setNotesModal(visible);
    setNotesFilterOptions({});
    if (noteCount != undefined) {
      setData(oldData => {
        return oldData.map(d => {
          if (d._id === currentModalData.current._id) {
            d['notesCount'] = noteCount;
            return d;
          }
          return d;
        })
      })
    }
    if (!visible && str !== "cancel") {
      fetch();
    }
  };

  const visibleReminderModal = (visible, record, str, reminderCount) => {
    setReminderModal(visible);
    setReminderFilterOptions({});
    if (reminderCount != undefined) {
      setData(oldData => {
        return oldData.map(d => {
          if (d._id === currentModalData.current._id) {
            d['reminderCount'] = reminderCount;
            return d;
          }
          return d;
        })
      })
    }
    if (!visible && str !== "cancel") fetch();
  };

  const createNotesModal = (record) => {
    let options = {
      query: {
        find: {
          prescriptionOrderId: record._id,
          category: TODO_CATEGORY.PRESCRIPTION,
          subCategory: SUB_CATEGORY.NOTES.GENERAL,
        },
        populate: [{ addedBy: [] }],
      },
    };
    currentModalData.current = { ...record };
    setNotesFilterOptions(options);
    setNotesModal(true);
  };

  const visibleMedicationNotesModal = (record) => {
    console.log("visibleMedicationNotesModal -> record", record)
    let options = {
      query: {
        find: {
          prescriptionMedicationId: record.prescriptionMedicationId,
          category: TODO_CATEGORY.PRESCRIPTION,
          subCategory: SUB_CATEGORY.NOTES.GENERAL,
        },
        populate: [{ addedBy: [] }],
      },
    };
    currentModalData.current = { ...record };
    setNotesFilterOptions(options);
    setMedicationNotesModal(true);
  };

  const createReminderModal = (record) => {
    let options = {
      query: {
        find: {
          prescriptionOrderId: record._id,
          category: TODO_CATEGORY.PRESCRIPTION,
          subCategory: SUB_CATEGORY.NOTES.GENERAL,
        },
        populate: [{ addedBy: [] }],
      },
    };
    currentModalData.current = { ...record };
    setReminderFilterOptions(options);
    setReminderModal(true);
  };

  const handlePendingTodo = record => {
    if (!record.pendingTodoCount)
      return
    let url = getTodoRedirectUrl({
      todoCategory: TODO_CATEGORY.PRESCRIPTION,
      subCategory: record.pendingTodo?.[record.pendingTodo.length - 1].subCategory,
      viewType: DEVICE_VIEW.PENDING,
      orderNumber: record.orderNumber
    })
    return url
  }

  const renderSubTable = (row, record) => {
    console.log("renderSubTable -> text, record", row, record)

    return (
      <div className='actions'>
        <a
          onClick={() => visibleMedicationNotesModal(row)}
        >
          <div className='ac_count'>
            <Notes />
            {row?.notes?.length > 0 ? (
              <span className='notes tot'>{row.notes.length}</span>
            ) : null}
          </div>
          <p>Notes</p>
        </a> </div>
    );
  }

  return (
    <div className='resi_treat_content_wrap'>
      {/* <Spin spinning={true} colorCode={"#609fae"} str={"overlay center"}></Spin> */}

      <form action=''>
        <Header
          onDoctorChange={onDoctorChange}
          onSearch={onSearch}
          onSearchRx={onSearchRx}
          onDateChange={handleDateChange}
        />
      </form>
      <div className='responsive_scroll_wrap'>
        <Table
          columns={columns}
          datasource={data}
          pagination={false}
          showResult={true}
          resultCol={[
            // { width: '43%', key: 'Orders' },
            { width: '53%', key: 'Orders' },
            { width: '15%', key: 'Direction' },
            { width: '27%', key: 'Indication' },
            // { width: '10%', key: 'Actions' }
          ]}
          setStylesToColumn={false}
          pagination={{
            current: filter.page,
            pageSize: filter.limit,
            total: count,
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChange,
          }}
          loading={loader}
          onChange={handleTableChange}
        // renderSubTable={renderSubTable}
        />

        {visibleCancel ? (
          <CancelRxModal
            visible={visibleCancel}
            detail={detail}
            onOk={(data) => handleCancelPresc(false, null, data)}
            onCancel={() => handleCancelPresc(false, null)}
          />
        ) : null}
        {visibleEdit ? (
          <AuthenticateModal
            visible={visibleEdit}
            loading={loader}
            title={`Authetication For Update - ${detail.orderNumber}`}
            maskClosable={false}
            request={{
              prescriptionId: detail._id,
              action: MODIFY_ACTION.EDIT,
            }}
            onOk={(data) => handleEditPresc(false, null, data)}
            onCancel={() => handleEditPresc(false, null)}
          />
        ) : null}
        {/* loading={loader}
            title={`Authetication For Update - ${detail.orderNumber}`}
            maskClosable={false}
            request={{
              prescriptionId: detail._id,
              action: MODIFY_ACTION.CANCEL,
            }}
            onOk={(data) => handleEditPresc(false, null, data)}
            onCancel={() => handleEditPresc(false, null)}
          />
        ) : null} */}
        {visibleImage && imageViewer.length > 0 ? (
          <LightBox
            visible={visibleImage}
            images={imageViewer}
            onCloseRequest={() => handleViewImages(false, null)}
            curImg={0}
            imageTitle={{ caption: true }}
          />
        ) : null}

        {notesModal && (
          <NotesModal
            visible={notesModal}
            filterOptions={notesFilterOptions}
            onCancel={data => visibleNotesModal(false, null, 'cancel', data)}
            onOk={() => visibleNotesModal(false)}
            isUpsertList={true}
            modalTitle={`View Note - ${currentModalData.current.orderNumber}`}
            xRayNumber={currentModalData.current.orderNumber}
            addData={{
              residentId: currentModalData.current.residentId,
              prescriptionOrderId: currentModalData.current._id,
              category: TODO_CATEGORY.PRESCRIPTION,
              subCategory: SUB_CATEGORY.NOTES.GENERAL,
            }}
          />
        )}

        {medicationNotesModal && (
          <NotesModal
            defaultNotes={currentModalData.current.notes}
            visible={medicationNotesModal}
            filterOptions={notesFilterOptions}
            onCancel={data => visibleMedicationNotesModal(false, null, data)}
            isUpsertList={true}
          // modalTitle={`View Note - ${currentModalData.current.orderNumber}`}
          // xRayNumber={currentModalData.current.orderNumber}
          // addData={{
          //   residentId: currentModalData.current.residentId,
          //   prescriptionOrderId: currentModalData.current._id,
          //   category: TODO_CATEGORY.PRESCRIPTION,
          //   subCategory: SUB_CATEGORY.NOTES.GENERAL,
          // }}
          />
        )}

        {reminderModal && (
          <ReminderModal
            visible={reminderModal}
            filterOptions={reminderFilterOptions}
            onCancel={data => visibleReminderModal(false, null, 'cancel', data)}
            onOk={() => visibleReminderModal(false)}
            isUpsertList={true}
            modalTitle={`View Reminder - ${currentModalData.current.orderNumber}`}
            xRayNumber={currentModalData.current.orderNumber}
            addData={{
              residentId: currentModalData.current.residentId,
              prescriptionOrderId: currentModalData.current._id,
              category: TODO_CATEGORY.PRESCRIPTION,
              subCategory: SUB_CATEGORY.NOTES.GENERAL,
            }}
          />
        )}
        {/* <div className="patient_order_wrap od_tab_temp">
                                  
            </div> */}
        {/* <div className="pagination_wrap">
                    <div className="showing">
                        Showing 01 to 06 of 1000 entries
                                            </div>
                    <div className="pagination">
                        <a><FirstPage /></a>
                        <a><Prev /></a>
                        <a className="active_page">01</a>
                        <a>02</a>
                        <a>03</a>
                        <a>04</a>
                        <a>05</a>
                        <a><Next /></a>
                        <a><LastPage /></a>
                    </div>
                </div> */}

        {/* {this.state.addNotesPopupRef && <AddNotesPopup visible={this.state.addNotesPopupRef}
                onClosed={() => this.modalActionFn('addNotesPopupRef', false)}
            />}
            {this.state.auditPopupRef && <AuditPopup visible={this.state.auditPopupRef}
                onClosed={() => this.modalActionFn('auditPopupRef', false)}
            />}
            {this.state.viewPopupRef && <ViewNotesPopup visible={this.state.viewPopupRef}
                onClosed={() => this.modalActionFn('viewPopupRef', false)}
            />}
            {this.state.clarificationRef && <ClarificationPopup visible={this.state.clarificationRef}
                onClosed={() => this.modalActionFn('clarificationRef', false)}
            />} */}

        {/* <AddNotesPopup ref={(AddNotesPopup) => { this._modal = AddNotesPopup; }} /> */}
        {/* <AuditPopup ref={this.auditPopupRef} />
            <ViewNotesPopup ref={this.viewPopupRef} /> */}
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth, resident }) => {
  const { authUser } = auth;
  const { currentResidentId } = resident;
  return {
    authUser,
    currentResidentId,
  };
};
export default connect(mapStateToProps, { updateOpenResident })(
  createForm()(OrderTab)
);
