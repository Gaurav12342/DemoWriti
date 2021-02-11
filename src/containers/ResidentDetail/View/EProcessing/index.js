import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {
  Filters,
  DetailsLess,
  VerbalOrder,
  Todo,
  Edit,
  Cancel,
  Clarification,
  Archive,
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
import { TAB_KEYS } from '../../../../components/common/Tab/data';
import CommonTab from '../../../../components/common/Tab';
import TogglePane from '../togglePane';
import { Spin, Toast, LightBox } from '../../../../components/common';
import Table from '../../../../components/common/Table/index';
import { Column_classNames } from '../../../../constants/Columns';
import {
  X_RAY_TODO_TYPES,
  TODO_CATEGORY,
  SUB_CATEGORY,
} from '../../../../constants/todo';
import Header from './Header';
import {
  capitalizeStr,
  isDrOrNp,
  canPerformAction,
  getUserNameWithDesignation,
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
import { updateOpenResident } from '../../../../appRedux/actions/Resident';
import ArchivePopup from '../../../../components/common/Popup/archive-popup';
import CancelRxModal from '../../../ResidentDetail/View/OrdersTab/CancelRxModal';
import NotesModal from '../../../../components/NotesPopup/List';
import ReminderModal from '../../../../components/ReminderPopup/List';

const _ = require('lodash');

const EProcessing = (props) => {
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
  const [visibleArchive, setVisibleArchive] = useState(false);
  const [detail, setDetail] = useState(null);
  const currentModalData = React.useRef();
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
            //match: { homeId: '5cd963ea1fd1603a09ae7f9f' }
          }
        ]
      },
      { prescriptionMedication: null },
      { thirdPartyPrescriptionType: ['name'] },
    ],
    sortBy: { orderGeneratedAt: 'DESC' },
    find: {
      residentId: currentResidentId,
      type: TYPE.THIRD_PARTY,
      //  rxType: RX_TYPE.THIRD_PARTY
    },
  });

  const [notesModal, setNotesModal] = useState(false);
  const [notesFilterOptions, setNotesFilterOptions] = useState({});
  const [reminderFilterOptions, setReminderFilterOptions] = useState({});
  const [reminderModal, setReminderModal] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);

  let statusFilters = [];
  Object.keys(STATUS).map((k) => {
    return statusFilters.push({ text: k, value: STATUS[k] });
  });

  const columns = [
    {
      title: 'Sr.No',
      classname: Column_classNames.sr,
      key: 'index',
      width: '4%',
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    // {
    //   title: 'Rx. No',
    //   dataIndex: 'orderNumber',
    //   classname: Column_classNames.ph,
    //   key: 'orderNumber',
    //   render: (text, record) => <span>{text}</span>,
    // },
    {
      title: 'Physician',
      dataIndex: 'physicianId',
      classname: Column_classNames.ph,
      key: 'physicianId',
      render: (text, record) => (
        <span>
          {text && text.mergeLFName ? getUserNameWithDesignation(text) : '-'}
        </span>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'orderGeneratedAt',
      classname: Column_classNames.dt,
      key: 'orderGeneratedAt',
      render: (text, record) => <span>{displayDateTime(text)}</span>,
    },
    {
      title: 'Document Type',
      dataIndex: 'thirdPartyPrescriptionType',
      classname: Column_classNames.ot,
      render: (text, record) => <>{text?.name || '-'}</>,
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      classname: Column_classNames.st,
      render: (text, record) => (
        <span>
          {Object.keys(STATUS).map((k) => {
            return STATUS[k] === text ? (
              <span className={'o_status ' + STATUS_CLASSNAME[text]}>{k}</span>
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
      className: Column_classNames.Actions,
      render: (text, record) => {
        return (
          <div className='actions'>
            {record?.attachments?.length > 0 ? (
              <a onClick={() => handleViewImages(true, record)}>
                <div className='ac_count'>
                  <View />
                </div>
                <p>View</p>
              </a>
            ) : null}

            <a onClick={() => createNotesModal(record)}>
              <div className='ac_count'>
                <Notes />
                {record.notesCount ? (
                  <span className='notes tot'>{record.notesCount}</span>
                ) : null}
              </div>
              <p>Notes</p>
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
            <div className='more'>
              <MoreDots />
              <div className='more_wrap'>
                {record.type === TYPE.THIRD_PARTY &&
                  record.status !== STATUS.DISCARDED &&
                  (isDrOrNp(authUser) || record.addedBy === authUser._id) &&
                  record.status !== STATUS.CANCELLED &&
                  canPerformAction({
                    moduleId: MODULE.E_PROCESSING,
                    actiontoCheck: ACTIONS.CANCEL.CODE,
                  }) ? (
                    <a onClick={() => handleCancelPresc(true, record)}>
                      <Cancel />
                      <span>Cancel</span>
                    </a>
                  ) : null}
                <a>
                  <Audit />
                  <span>Audit</span>
                </a>
                <a onClick={() => handleArchive(true, record)}>
                  <Archive />
                  <span>Archive</span>
                </a>
                <a>
                  <Clarification />
                  <span>Clarification</span>
                </a>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    //fetch data while tab is active,
    if (isTabActive) {
      if (filter.hasOwnProperty('search') && filter.search['keyword']) {
        const delayDebounceFn = setTimeout(() => {
          fetch();
        }, 600);
        return () => clearTimeout(delayDebounceFn);
      } else fetch();
    }
  }, [isTabActive, filter]);

  // useEffect(() => {
  //     // empty tab data on set filter
  //     updateOpenResident({ tabkey: TAB_KEYS.E_PROCESSING, response: null })
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
      // if (residentDetail[TAB_KEYS.E_PROCESSING]) {
      //     res = residentDetail.response
      // }
      // else
      res = await axios({ ...getAllRxOrders, data: { query: { ...filter } } });
      if (res) {
        if (res.code === 'OK') {
          setData(res.data.list);
          setCount(res.data.count);
          onFetchData({
            tabtitle: 'E-Processing',
            records: res.data.count,
            module: MODULE.E_PROCESSING,
          });
          // updateOpenResident({ tabkey: TAB_KEYS.E_PROCESSING, response: res })
        } else Toast.error(res.message);
      }
      setLoader(false);
    } catch {
      setLoader(false);
    }
  };

  const handleTableChange = (pagination, tfilter, sorter) => {
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
    }
    setFilter(tempFilter);
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };

  const onSearch = (e) => {
    let value = e.target.value;
    let obj = {
      ...filter,
      page: 1,
      search: {
        keyword: value,
        keys: ['orderNumber'],
      },
    };
    setFilter(obj);
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
    newFilter = {
      ...newFilter,
      page: 1,
      gte: [{ orderGeneratedAt: val[0] }],
      lte: [{ orderGeneratedAt: val[1] }],
    };
    setFilter(newFilter);
  };

  const handleSubmasterChange = (val) => {
    let newFilter = { ...filter };
    newFilter = {
      ...newFilter,
      page: 1,
      find: {
        ...newFilter.find,
        thirdPartyPrescriptionType: val,
      },
    };
    setFilter(newFilter);
  };

  const handleEditPresc = (visible, record, response) => {
    if (response) {
      let req = { ...detail, uniqueId: response.uniqueId };
      onEditRx(req);
    }
    setVisibleEdit(visible);
    setDetail(record);
  };

  const handleArchive = (visible, record, response) => {
    if (response) {
    }
    setVisibleArchive(visible);
    setDetail(record);
  };

  const handleCancelPresc = (visible, record, response) => {
    setVisibleCancel(visible);
    setDetail(record);
    if (response) {
      fetch();
      // updateOpenResident({ tabkey: TAB_KEYS.ORDERS, response: null })
    }
  };

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
          subCategory: SUB_CATEGORY.NOTES.GENERAL,
          category: TODO_CATEGORY.PRESCRIPTION,
        },
        populate: [{ addedBy: [] }],
      },
    };
    currentModalData.current = { ...record };
    setNotesFilterOptions(options);
    setNotesModal(true);
  };

  const createReminderModal = (record) => {
    let options = {
      query: {
        find: {
          prescriptionOrderId: record._id,
          subCategory: SUB_CATEGORY.NOTES.GENERAL,
          category: TODO_CATEGORY.PRESCRIPTION,
        },
        populate: [{ addedBy: [] }],
      },
    };
    currentModalData.current = { ...record };
    setReminderFilterOptions(options);
    setReminderModal(true);
  };

  const handleViewImages = (visible, record) => {
    if (visible) {
      // setImgLoader(true)
      getRxImage([record._id]).then(resp => {
        if (resp?.[0])
          record.attachments = resp[0].attachments
        record.attachments.map((x, i) => {
          x.caption = `${record.orderNumber}-${i + 1}`
          return x
        })
        setVisibleImage(visible);
        setDetail(record);

        // setImgLoader(false)
      }).catch(err => {
        // setImgLoader(false)
      })
    } else {
      setVisibleImage(visible);
      setDetail(record);
    }
  };

  const prepareAttachments = () => {
    let imageViewer = [];
    if (detail?.attachments?.length > 0) {
      imageViewer = _.map(detail.attachments, function (a) {
        a.src = a.path;
        return a;
      });
    }
    return { imageViewer };
  };
  const { imageViewer } = prepareAttachments();

  return (
    <div className='resi_treat_content_wrap'>
      <form action=''>
        <Header
          onDoctorChange={onDoctorChange}
          onSearch={onSearch}
          onDateChange={handleDateChange}
          onSubmasterChange={handleSubmasterChange}
        />
      </form>
      <div className='responsive_scroll_wrap'>
        <Table
          columns={columns}
          datasource={data}
          pagination={false}
          pagination={{
            current: filter.page,
            pageSize: filter.limit,
            total: count,
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChange,
          }}
          loading={loader}
          onChange={handleTableChange}
        />
      </div>

      {visibleArchive ? (
        <ArchivePopup
          visible={visibleArchive}
          detail={detail}
          residentDetail={residentDetail}
          onCancel={() => handleArchive(false, null)}
          onOK={(data) => handleArchive(false, null, data)}
        />
      ) : null}

      {visibleCancel ? (
        <CancelRxModal
          visible={visibleCancel}
          detail={detail}
          onOk={(data) => handleCancelPresc(false, null, data)}
          onCancel={() => handleCancelPresc(false, null)}
          rxType={MODULE.E_PROCESSING}
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

      {visibleImage && imageViewer.length > 0 ? (
        <LightBox
          visible={visibleImage}
          images={imageViewer}
          onCloseRequest={() => handleViewImages(false, null)}
          curImg={0}
        />
      ) : null}
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
export default connect(mapStateToProps, { updateOpenResident })(EProcessing);
