import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Table from '../../../../components/common/Table/index';
import axios from '../../../../services/api/config';
import { digitalBinderPaginate } from '../../../../services/api/routes/digitalBinder';

import { View, Notes, Reminder } from '../../../../assets/images/pmr/index';
import ViewNotesModal from './components/ViewNotesModal';
import { MODULE } from '../../../../constants/subscription';
import { createForm } from 'rc-form';
import { connect, useSelector } from 'react-redux';
const _ = require('lodash');
import Table from 'react-table';

const DATA_TYPE = {
  "RESIDENT_DOCUMENT": 1,
  "PRESCRIPTION": 2,
  "PMR": 3
}

const DigitalBinder = ({ form }) => {

  const { authUser, currentResidentId } = useSelector(state => ({
    authUser: state.auth.authUser,
    currentResidentId: state.resident.currentResidentId
  }))

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewNotesVisible, setViewNotesVisible] = useState(false);
  const [getSpecificDigitalBinder, setSpecificDigitalBinder] = useState('');
  
  const [filter, setFilter] = useState({
    query: {

    },
    RESIDENT_DOCUMENT: {
      populate: [
        {
          masterId: [],
        },
      ],
    },
    PMR: {
      populate: [
        {
          acknowledgedBy: [],
        },
      ],
    },
    PRESCRIPTION: {
      populate: [
        {
          thirdPartyPrescriptionType: [],
        },
      ],
    },
  });

  useEffect(() => {
    fetch();
  }, [filter]);

  const getColumns = () => [
    // {
    //   title: 'Sr.No',
    //   keyword: 'index',
    //   render: (text, record, index) =>
    //     (filter.page - 1) * filter.limit + (index + 1),
    // },
    {
      title: 'Type',
      dataIndex: '',
      render: (text, record) => {
        if (record.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
          return <p>Rx Order {record.orderNumber}</p>
        }
        if (record.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
          return <p>Resident Document {record.orderNumber}</p>
        }

      },
    },
    {
      title: 'Physician',
      dataIndex: 'doctorId',
      render: (text) => <span>{text ? text : ''}</span>,
      //   filters: [
      //     { text: 'Rx Order', value: 1 },
      //     { text: 'PMR', value: 2 },
      //     { text: 'Resident Document', value: 3 },
      //   ],
      //   onFilter: (value, record) => record.isActive === value,
    },
    {
      title: 'Date & Time',
      dataIndex: 'completionDate',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>{text ? text : ' '}</span>
      ),
    },
    {
      title: 'Staus',
      dataIndex: 'status',
      render: (text, record) => (
        <span style={{ textTransform: 'capitalize' }}></span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'OrderActionItems',
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className='actions'>
            <div>
              <View />
              <p>View</p>
            </div>
            <div
              onClick={() => {
                handleViewNoteModalVisible(record);
              }}
            >
              <Notes />
              <p>Notes</p>
            </div>
            <div>
              <Reminder />
              <p>Reminder</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  const handleTableChange = (pagination, tfilter, sorter) => {
    if (!pagination) return;
    let tempFilter = filter.query;
    // tempFilter = {
    //   ...tempFilter,
    //   page: pagination.current,
    //   limit: pagination.pageSize,
    // };
    if (tfilter && Object.keys(tfilter).length) {
      if (tfilter.isActive && tfilter.isActive.length) {
        tempFilter.find.isActive = tfilter.isActive;
      } else if (tempFilter.find.isActive) {
        delete tempFilter.find['isActive'];
      }
      // tempFilter.page = 1;
    } else {
      // tempFilter.filter = {
      //     type: tempFilter.filter.type
      // }
    }
    setFilter((filter) => {

      return {
        ...filter,
        query: {

          ...tempFilter
        }
      }
    });
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    let obj = {
      ...filter,
      pageNo: 1,
      search: {
        keyword: value,
        keys: ['residentDocId'],
      },
    };
    setFilter(obj);
  };

  const fetch = () => {
    setLoading(true);
    let { method, url, baseURL } = digitalBinderPaginate;
    axios({
      method,
      url,
      baseURL,
      data: {
        ...filter, ...{ query: { ...filter.query, find: { residentId: currentResidentId } } }
      },
    })
      .then((response) => {
        if (response && response.data.code == 'OK') {
          let dataArray = []


          console.log("🚀 ~ file: sindex.js ~ line 206 ~ .then ~ response.data.data", response.data.data)
          _.map(response.data.data, data => {
            console.log("🚀 ~ file: index.js ~ line 207 ~ .then ~ data", data)
            if (data['RESIDENT_DOCUMENT'] && data['RESIDENT_DOCUMENT'].data) {
              dataArray = _.concat(dataArray, _.map(data['RESIDENT_DOCUMENT'].data, d => { d.DATA_TYPE = DATA_TYPE.RESIDENT_DOCUMENT; return d }))
              console.log("🚀 ~ file: index.js ~ line 209 ~ .then ~ dataArray", dataArray)

            }
            if (data['PRESCRIPTION'] && data['PRESCRIPTION'].data) {
              dataArray = _.concat(dataArray, _.map(data['PRESCRIPTION'].data, d => { d.DATA_TYPE = DATA_TYPE.PRESCRIPTION; return d }))

            }
            if (data['PMR'] && data['PMR'].data) {
              dataArray = _.concat(dataArray, _.map(data['PMR'].data, d => { d.DATA_TYPE = DATA_TYPE.PMR; return d }))

            }
          })


          console.log("🚀 ~ file: index.js ~ line 204 ~ .then ~ data", dataArray)
          setData(dataArray);
          setTotal(response.data.data[0].RESIDENT_DOCUMENT.count);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleViewNoteModalVisible = (record) => {
    setSpecificDigitalBinder(record);
    setViewNotesVisible(true);
  };
  const handleViewNoteModalDisable = () => {
    setViewNotesVisible(false);
  };
  return (
    <>
      <div className='resi_treat_content_wrap virtual_visit pmr_tab xray_tab digital_tab'>
        <Header form={form} onSearch={handleSearch} />
        <Table
          columns={getColumns()}
          datasource={data}
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            current: 1,
            pageSize: 10000,
            total: 10000,
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChange,
          }}
        // pagination={false}
        />
      </div>

      {viewNotesVisible && (
        <ViewNotesModal
          form={form}
          //   notesLoading={viewNotesLoader}
          visible={viewNotesVisible}
          onClose={handleViewNoteModalDisable}
          onOpen={handleViewNoteModalVisible}
          title='View Notes'
          //   data={viewNotesData}
          residentId={getSpecificDigitalBinder?.residentId}
        />
      )}
    </>
  );
};

export default createForm()(DigitalBinder)