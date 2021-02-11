import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from '../../../../services/api/config';
import { archivePaginate } from '../../../../services/api/routes/archive';

import { View, Notes, Reminder } from '../../../../assets/images/pmr/index';
// import ViewNotesModal from './components/ViewNotesModal';
import { MODULE } from '../../../../constants/subscription';
import { createForm } from 'rc-form';
import { useSelector } from 'react-redux';
import Table from './../DigitalBinder/Table';
import { displayDateTime } from '../../../../util/moment';
import { getUserNameWithDesignation } from '../../../../util/common';
import { PMR_STATUS } from '../../../../constants/pmr';
import { STATUS as PRESCRIPTION_STATUS } from '../../../../constants/prescription';
import NotesModal from '../../../../components/NotesPopup/List';
import ReminderModal from '../../../../components/ReminderPopup/List';
import {
  X_RAY_TODO_TYPES,
  TODO_CATEGORY,
  SUB_CATEGORY,
  DEVICE_VIEW,
} from '../../../../constants/todo';

const _ = require('lodash');

const DATA_TYPE = {
  "RESIDENT_DOCUMENT": 1,
  "PRESCRIPTION": 2,
  "PMR": 3
}

const lower = (val = '') => (typeof val === 'string' && val.toLowerCase()) || val

const DigitalBinder = ({ form, onFetchData, isTabActive }) => {

  const { authUser, currentResidentId } = useSelector(state => ({
    authUser: state.auth.authUser,
    currentResidentId: state.resident.currentResidentId
  }))

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewNotesVisible, setViewNotesVisible] = useState(false);
  const [getSpecificDigitalBinder, setSpecificDigitalBinder] = useState('');
  const [notesFilterOptions, setNotesFilterOptions] = useState({});
  const [tableData, setTableData] = useState([])
  const tableRef = React.useRef();
  const allData = React.useRef([]);
  const currentModalData = React.useRef();

  const [filter, setFilter] = useState({
    query: {

    },
    "RESIDENT_DOCUMENT": {
      "populate": [{
        "residentId": ["mergeLFName", "status"]
      }, {
        "masterId": ["_id", "name"]
      }, {
        "deleteReason": []
      }]
    },
    "PRESCRIPTION": {
      "populate": [{
        "residentId": ["mergeLFName", "status"]
      }, {
        "homeAreaId": ["name", "stlCode"]
      }, {
        "addedBy": [
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
          }
        ]
      }, {
        "physicianId": [
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
            ]
          }
        ]
      }, {
        "prescriptionMedication": []
      }, {
        "verbalOrderBy": ["mergeLFName"]
      }]
    },
    "PMR": {
      "populate": [{
        "physicianId": [
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
            ]
          }
        ]
      }]
    }
  });

  useEffect(() => {
    if (!isTabActive)
      return
    fetch();
  }, [isTabActive, filter]);

  const columns = React.useMemo(() => ([
    {
      Header: 'Sr. No.',
      Cell: ({ row }) => row.index + 1
    },
    {
      Header: 'Type',
      accessor: 'orderNumber',
      Cell: ({ cell: { value }, row: { original } }) => {
        if (original.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
          return (
            <>
              <p>Rx Order</p>
              <p style={{ color: '#609fae' }} >{value}</p>
            </>
          )
        }
        if (original.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
          return (
            <>
              <p>Resident Document</p>
              <p style={{ color: '#609fae' }} >{original.masterId.name}</p>
            </>
          )
        }
        if (original.DATA_TYPE === DATA_TYPE.PMR) {
          return (
            <>
              <p>PMR</p>
              <p style={{ color: '#609fae' }} >{original.pmrId}</p>
            </>
          )
        }
      }
    },
    {
      Header: 'Archive by',
      accessor: 'physicianId.mergeLFName',
      Cell: ({ cell: { value }, row: { original } }) => (
        <>
          {original.physicianId && getUserNameWithDesignation(original.physicianId) || "-"}
        </>
      )
    },
    {
      Header: 'Date & Time',
      accessor: 'createdAt',
      Cell: ({ cell: { value } }) => (
        <span style={{ textTransform: 'capitalize' }}>{displayDateTime(value)}</span>
      ),
    },
    {
      Header: 'Staus',
      accessor: 'status',
      Cell: ({ row: { original } }) => {
        const status = original.status;
        if (original.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
          return <p>{_.invert(PRESCRIPTION_STATUS)[status]}</p>
        }
        if (original.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
          return <p>-</p>
        }
        if (original.DATA_TYPE === DATA_TYPE.PMR) {
          return <p>{_.invert(PMR_STATUS)[status]}</p>
        }
      },
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ cell: { value }, row: { original } }) => (
        <div className='actions'>
          <div
            onClick={() => createNotesModal(original)}
          >
            <Notes />
            {original.notesCount?.length > 0 ?
              <span className="todo tot read">{original.notesCount.length}</span>
              : null}
            <p>Notes</p>
          </div>
        </div>
      ),
      disableGlobalFilter: true,
      hasRefresh: true
    },
  ]), []);

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };

  const fetch = () => {
    setLoading(true);
    let { method, url, baseURL } = archivePaginate;
    axios({
      method,
      url,
      baseURL,
      data: {
        ...filter,
        ...{ query: { ...filter.query, find: { residentId: currentResidentId } } }
      },
    }).then(response => {
      if (response && response.data.code == 'OK') {

        let dataArray = []
        _.map(response.data.data, data => {
          if (data['RESIDENT_DOCUMENT'] && data['RESIDENT_DOCUMENT'].data) {
            dataArray = _.concat(dataArray, _.map(data['RESIDENT_DOCUMENT'].data, d => {
              d.DATA_TYPE = DATA_TYPE.RESIDENT_DOCUMENT;
              return d
            }))
          }
          if (data['PRESCRIPTION'] && data['PRESCRIPTION'].data) {
            dataArray = _.concat(dataArray, _.map(data['PRESCRIPTION'].data, d => {
              d.DATA_TYPE = DATA_TYPE.PRESCRIPTION;
              return d
            }))
          }
          if (data['PMR'] && data['PMR'].data) {
            dataArray = _.concat(dataArray, _.map(data['PMR'].data, d => {
              d.DATA_TYPE = DATA_TYPE.PMR;
              return d
            }))
          }
        })
        allData.current = [...dataArray];
        onFetchData({
          tabtitle: 'Archive',
          records: dataArray.length,
          module: MODULE.ARCHIVED_DATA
        })
        handleFilter('');

      }
    }).catch((error) => {
      setLoading(false);
      console.log(error);
    });
  };

  const handleFilter = (searchVal = '') => {
    const preFilteredData = [...allData.current];
    if (searchVal.trim() === '') {
      setData(preFilteredData)
      setTotal(preFilteredData.length);
    } else {
      searchVal = searchVal.trim();
      const filteredData = preFilteredData.filter(row => {
        let status = row.status, matchedStatus = '', archiveType = '', createdAt = '';

        if (row.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
          matchedStatus = _.invert(PRESCRIPTION_STATUS)[status];
          archiveType = row.orderNumber;
          createdAt = row.orderGeneratedAt;
        }
        if (row.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
          matchedStatus = '-';
          archiveType = row.masterId?.name;
          createdAt = row.createdAt;
        }
        if (row.DATA_TYPE === DATA_TYPE.PMR) {
          matchedStatus = _.invert(PMR_STATUS)[status];
          archiveType = row.pmrId;
          createdAt = row.createdAt;
        }
        // const isPhysicianMatch = lower(row.physicianId?.mergeLFName).includes(lower(searchVal));
        const isDateMatch = displayDateTime(createdAt).includes(lower(searchVal));
        const isStatus = lower(matchedStatus).includes(searchVal);
        const isArchiveType = lower(archiveType).includes(searchVal);
        return isArchiveType || isDateMatch || isStatus;
      })
      setData(filteredData);
    }
    setLoading(false);
  }

  const handleViewNoteModalVisible = (record) => {
    setSpecificDigitalBinder(record);
    setViewNotesVisible(true);
  };

  const handleViewNoteModalDisable = () => {
    setViewNotesVisible(false);
  };

  const createNotesModal = (record) => {
    let filterData = {
      residentDocumentId:
        record?.DATA_TYPE == DATA_TYPE.RESIDENT_DOCUMENT
          ? record._id
          : undefined,
      prescriptionOrderId:
        record?.DATA_TYPE == DATA_TYPE.PRESCRIPTION ? record._id : undefined,
      pmrId: record?.DATA_TYPE == DATA_TYPE.PMR ? record._id : undefined,
    };
    let options = {
      query: {
        find: { ...filterData, subCategory: SUB_CATEGORY.NOTES.GENERAL },
        populate: [{ addedBy: [] }],
      },
    };
    currentModalData.current = { ...record };
    setNotesFilterOptions(options);
    setViewNotesVisible(true);
  };

  const visibleNotesModal = (visible, record, str, noteCount) => {
    setViewNotesVisible(visible);
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
          onCancel={(data, options) => visibleNotesModal(false, null, data, options)}
          isOnlyView={true}
          modalTitle={`View Note - ${currentModalData.current.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT
            ? currentModalData.current.residentDocId
            : currentModalData.current.orderNumber
            }`}
          xRayNumber={
            currentModalData.current.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT
              ? currentModalData.current.residentDocId
              : currentModalData.current.orderNumber
          }
        />
      )}
    </div>
  );
};

export default createForm()(DigitalBinder)