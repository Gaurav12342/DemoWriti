import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import axios from '../../../../services/api/config';
import { pmrList } from '../../../../services/api/routes/pmr';
import moment from 'moment';
import { View, Notes, Reminder } from '../../../../assets/images/pmr/index';
// import ViewNotesModal from './components/ViewNotesModal';
import { MODULE } from '../../../../constants/subscription';
import { createForm } from 'rc-form';
import { useSelector } from 'react-redux';
import Table from './../DigitalBinder/Table';
import { displayDate } from '../../../../util/moment';
import { PMR_STATUS } from '../../../../constants/pmr';
import { STATUS as PRESCRIPTION_STATUS } from '../../../../constants/prescription';
import { getTodoRedirectUrl } from '../../../../util/todo';
import {
  TODO_CATEGORY,
  SUB_CATEGORY,
  DEVICE_VIEW,
} from '../../../../constants/todo';
import { Todo } from '../../../../assets/images/resident-detail/index';
import NotesModal from '../../../../components/NotesPopup/List';
import { getUserNameWithDesignation } from '../../../../util/common';
const _ = require('lodash');

const DATA_TYPE = {
  RESIDENT_DOCUMENT: 1,
  PRESCRIPTION: 2,
  PMR: 3,
};

const lower = (val = '') =>
  (typeof val === 'string' && val.toLowerCase()) || val;

const getOverDue = (date, subtractDays) => {
  const dueDate = moment(date).subtract(subtractDays, 'days');
  const dueDays = dueDate.diff(moment(), 'days');
  const dueText = dueDays < 0 ? 'Overdue' : 'Due in';
  return {
    dueDays,
    dueDate: dueDate.format('Do MMM YYYY'),
    remainingDay: dueText + ' ' + Math.abs(dueDays) + ' days',
  };
};

const DigitalBinder = ({ form, onFetchData, isTabActive }) => {
  const { authUser, currentResidentId } = useSelector((state) => ({
    authUser: state.auth.authUser,
    currentResidentId: state.resident.currentResidentId,
  }));

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewNotesVisible, setViewNotesVisible] = useState(false);
  const [getSpecificDigitalBinder, setSpecificDigitalBinder] = useState('');
  const tableRef = React.useRef();
  const allData = React.useRef([]);
  const [notesFilterOptions, setNotesFilterOptions] = useState({});
  const currentModalData = React.useRef();

  const [filter, setFilter] = useState({
    query: {
      populate: [
        {
          acknowledgedBy: [],
        },
        {
          homeAreaId: ['name'],
        },
        {
          addedBy: [],
        },
        {
          pmrScheduleGroupId: [],
        },
      ],
    },
  });

  useEffect(() => {
    if (isTabActive) fetch();
  }, [filter, isTabActive]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Physician',
        accessor: 'physicianId',
        Cell: ({ cell: { value }, row: { original } }) => {
          return value ? getUserNameWithDesignation(original.physicianId) : '-';
        },
      },
      {
        Header: 'PMR No.',
        accessor: 'pmrId',
        Cell: ({ cell: { value } }) => <>{value || '-'}</>,
      },
      {
        Header: 'PMR Range',
        accessor: 'pmrScheduleDate',
        Cell: ({ cell: { value } }) => {
          const { startDate, endDate } = value;
          return (
            <>
              <p>
                <b>From : </b>
                {displayDate(startDate)}
              </p>
              <p>
                <b>To : </b>
                {displayDate(endDate)}
              </p>
            </>
          );
        },
      },
      {
        Header: 'Due Date',
        accessor: 'pmrScheduleGroupId',
        Cell: ({ cell: { value } }) => {
          const { dueDate, remainingDay, dueDays } = getOverDue(
            value.startDate,
            value.dueDays
          );
          // const dueDate = moment(value.startDate).subtract(value.dueDays, 'days');
          // const dueDays = dueDate.diff(moment(), 'days');
          // const dueText = dueDays < 0 ? 'Overdue' : 'Due in';
          return (
            <>
              <p style={{ color: dueDays <= 0 ? '#ff7885' : 'auto' }}>
                {dueDate}
              </p>
              <p style={{ color: dueDays <= 0 ? '#ff7885' : 'auto' }}>
                {remainingDay}
              </p>
            </>
          );
        },
      },
      {
        Header: 'Phm Review',
        accessor: 'docMedCheckApproveAck',
        Cell: ({ row: { original } }) => {
          return '-';
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => {
          return _.invert(PMR_STATUS)[value];
        },
      },
      {
        Header: 'Action',
        accessor: '_id',
        Cell: ({ row: { original } }) => {
          const redirectUrl = handlePendingTodo(original);
          return (
            <div className='actions'>
              <div
                onClick={() => createNotesModal(original)} >
                <Notes />
                {original?.notesCount ? (
                  <span className='notes tot'>{original.notesCount}</span>
                ) : null}
                <p>Notes</p>
              </div>
              <a
                target='_blank'
                href={redirectUrl}
                style={{ textDecoration: 'none' }}
              >
                <div className='ac_count'>
                  <Todo />
                  {original?.pendingTodoCount ? (
                    <span className='todo tot read'>
                      {original.pendingTodoCount}
                    </span>
                  ) : null}
                </div>
                <p>To Do</p>
              </a>
            </div>
          );
        },
        disableGlobalFilter: true,
        hasRefresh: true,
      },
    ],
    []
  );

  const fetch = () => {
    setLoading(true);
    let { method, url, baseURL } = pmrList;
    axios({
      method,
      url,
      baseURL,
      data: {
        ...filter,
        ...{
          query: { ...filter.query, find: { patientId: currentResidentId } },
        },
      },
    })
      .then((response) => {
        if (response && response.data.code == 'OK') {
          let dataArray = response.data.data.list;

          allData.current = [...dataArray];
          onFetchData({
            tabtitle: 'PMR',
            records: dataArray.length,
            module: MODULE.PMR,
          });
          handleFilter('');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleFilter = (searchVal = '') => {
    const preFilteredData = [...allData.current];
    if (searchVal.trim() === '') {
      setData(preFilteredData);
      setTotal(preFilteredData.length);
    } else {
      searchVal = searchVal.trim();
      const filteredData = preFilteredData.filter((row) => {
        let status = _.invert(PMR_STATUS)[row.status];
        let { startDate, endDate } = row.pmrScheduleDate;
        let scheduleDate = displayDate(startDate) + displayDate(endDate);
        const { dueDate, remainingDay } = getOverDue(
          row.pmrScheduleGroupId.startDate,
          row.dueDays
        );

        const isPhysicianMatch = lower(row.physicianId?.mergeLFName).includes(
          lower(searchVal)
        );
        const isPmrIdMatch = lower(row.pmrId).includes(lower(searchVal));
        const scheduleDateMatch = lower(scheduleDate).includes(
          lower(searchVal)
        );
        const overdueMatch = lower(dueDate + remainingDay).includes(
          lower(searchVal)
        );
        const statusMatch = lower(status).includes(searchVal);
        console.log('dueDate + remainingDay => ', dueDate + remainingDay);
        return (
          isPhysicianMatch ||
          isPmrIdMatch ||
          scheduleDateMatch ||
          overdueMatch ||
          statusMatch
        );
      });
      setData(filteredData);
    }
    setLoading(false);
  };

  const visibleNotesModal = (visible, record, str, noteCount) => {
    setViewNotesVisible(visible);
    setNotesFilterOptions({});
    if (noteCount != undefined) {
      setData((oldData) => {
        return oldData.map((d) => {
          if (d._id === currentModalData.current._id) {
            d['notesCount'] = noteCount;
            return d;
          }
          return d;
        });
      });
    }
    if (!visible && str !== 'cancel') {
      fetch();
    }
  };

  const createNotesModal = (record) => {
    let options = {
      query: {
        find: {
          pmrId: record._id,
          category: TODO_CATEGORY.MED_REVIEW,
          subCategory: SUB_CATEGORY.NOTES.GENERAL,
        },
        populate: [{ addedBy: [] }],
      },
    };
    currentModalData.current = { ...record };
    setNotesFilterOptions(options);
    setViewNotesVisible(true);
  };

  const handlePendingTodo = (record) => {
    if (!record.pendingTodoCount) return;
    let url = getTodoRedirectUrl({
      todoCategory: TODO_CATEGORY.MED_REVIEW,
      subCategory:
        record.pendingTodo?.[record.pendingTodo.length - 1].subCategory,
      viewType: DEVICE_VIEW.PENDING,
      orderNumber: record.orderNumber,
    });
    return url;
  };

  return (
    <div className='resi_treat_content_wrap virtual_visit pmr_tab xray_tab digital_tab'>
      <Header form={form} onSearch={handleFilter} />
      <Table
        columns={columns}
        data={data}
        isLoading={loading}
        onTableRefresh={fetch}
        ref={tableRef}
      />

      {viewNotesVisible && (
        <NotesModal
          visible={viewNotesVisible}
          filterOptions={notesFilterOptions}
          onCancel={(data) => visibleNotesModal(false, null, 'cancel', data)}
          onOk={() => visibleNotesModal(false)}
          isUpsertList={true}
          modalTitle={`View Note - ${currentModalData.current.pmrId}`}
          xRayNumber={currentModalData.current.pmrId}
          addData={{
            residentId: currentModalData.current.patientId?._id,
            pmrId: currentModalData.current._id,
            category: TODO_CATEGORY.MED_REVIEW,
            subCategory: SUB_CATEGORY.NOTES.GENERAL,
          }}
        />
      )}
    </div>
  );
};

export default createForm()(DigitalBinder);
