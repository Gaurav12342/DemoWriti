import React, { useEffect, useState } from 'react';
import UpsertModal from './components/Upsert';
import Header from './components/Header';
import Table from '../../components/common/Table/index';
import ActiveDeactive from '../../components/common/ActiveDeactive';
import axios from '../../services/api/config';
import { Edit } from '../../assets/images/resident-detail/index';
import { AddFriend } from '../../assets/images/virtualvisit/index';
import { pmrGroupPaginate } from '../../services/api/routes/pmr';
import { Toast } from '../../components/common';
import { displayDate } from '../../util/moment';
import { PMR_SCHEDULE_GROUP_FREQUENCY } from '../../constants/pmr';
import { updatePmrGroup } from '../../services/api/routes/pmr';
import AssignHomeModal from './components/AssignHomeModal';
import Modal from '../../components/common/Popup/index';
import ReactTableScroll from 'rc-table-s';
import { canPerformAction } from '../../util/common';
import { MODULE, SUB_MODULE, ACTIONS } from '../../constants/subscription';
const _ = require('lodash');

const PmrGroup = (props) => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [assignHomeVisible, setAssignResidentVisible] = useState(false);
  const [pmrDetails, setPmrDetails] = useState('');
  const [selectedPmrGroupId, setSelectedPmrGroupId] = useState('');
  const [loading, setLoading] = useState(false);
  const [residentLoader, setResidentLoader] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    sortBy: { createdAt: 'DESC' },
    find: {},
  });
  const [data, setData] = useState([]);

  const [total, setTotal] = useState(0);

  const checkAddAction = canPerformAction({
    moduleId: MODULE.PMR,
    subModuleId: SUB_MODULE.PMR_GROUP,
    actiontoCheck: ACTIONS.ADD.CODE
  })

  useEffect(() => {
    if (filter.hasOwnProperty('search') && filter.search['keyword']) {
      const delayDebounceFn = setTimeout(() => {
        fetch();
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    } else fetch();
  }, [filter]);

  const visibleUpsert = () => {
    setVisible(true);
  };
  const closeUpsert = () => {
    setVisible(false);
  };

  const visibleEditModal = (record) => {
    setEditVisible(true);
    setPmrDetails(record);
  };

  const closeEditModal = () => {
    setEditVisible(false);
  };

  const handleAssignResident = (record) => {
    setSelectedPmrGroupId(record?._id);
    setAssignResidentVisible(true);
  };
  const closeAssignHomeModal = (isMoved) => {
    setAssignResidentVisible(false);
    if (isMoved)
      fetch()
  };

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const fetch = () => {
    setLoading(true);

    axios({ ...pmrGroupPaginate, data: { query: { ...filter } } })
      .then((response) => {
        if (response.data.code === 'OK') {
          let updatedList = modifiedList(response.data.data.list);
          setData(updatedList);
          setTotal(response.data.data.count);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleTableChange = (pagination, tfilter, sorter) => {
    if (!pagination) return;
    let tempFilter = filter;
    tempFilter = {
      ...tempFilter,
      page: pagination.current,
      limit: pagination.pageSize,
    };
    if (tfilter && Object.keys(tfilter).length) {
      if (tfilter.isActive && tfilter.isActive.length) {
        tempFilter.find.isActive = tfilter.isActive;
      } else if (tempFilter.find.isActive) {
        delete tempFilter.find['isActive'];
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

  const handleActiveDeactive = (record) => {
    let tempData = data.map((rec) => {
      if (rec._id === record._id) {
        return { ...rec, isActive: !rec.isActive };
      } else {
        return rec;
      }
    });
    setData(tempData);
  };

  const getColumns = () => [
    {
      title: 'Sr.No',
      keyword: 'index',
      dataIndex: 'index',
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      render: (text, record) => <>{text ? text : '-'}</>,
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      render: (text) => (
        <span>
          {text
            ? _.findKey(
              PMR_SCHEDULE_GROUP_FREQUENCY,
              _.partial(_.isEqual, text)
            ).replace(/_/g, ' ')
            : '-'}
        </span>
      ),
    },
    {
      title: 'Next PMR',
      dataIndex: 'startDate',
      render: (text, record) => (
        <div>
          <div>{record?.startDate ? displayDate(record.startDate) : '-'}</div>
          <div>{record?.endDate ? displayDate(record.endDate) : '-'}</div>
        </div>
      ),
    },
    {
      title: 'Running PMR',
      dataIndex: 'lastPMR',
      render: (text, record) => (
        <div>
          <div>
            {record.lastPMR?.endDate
              ? displayDate(record.lastPMR.endDate)
              : '-'}
          </div>
          <div>
            {record.lastPMR?.startDate
              ? displayDate(record.lastPMR.startDate)
              : '-'}
          </div>
        </div>
      ),
    },
    {
      title: 'Push Days',
      dataIndex: 'pushDays',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>{text ? text : '-'}</span>
      ),
    },
    {
      title: 'Due Days',
      dataIndex: 'dueDays',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>{text ? text : '-'}</span>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      render: (text, record) => (
        <span style={{ textTransform: 'capitalize' }}>
          <ActiveDeactive
            documentId={record._id}
            record={record}
            isActive={record.isActive}
            API={updatePmrGroup}
            onActiveDeactive={(record) => {
              handleActiveDeactive(record);
            }}
          />
        </span>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'De-active', value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: 'Action',
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className='actions'>
            {/* {
              canPerformAction({
                moduleId: MODULE.PMR,
                subModuleId: SUB_MODULE.PMR_GROUP,
                actiontoCheck: ACTIONS.EDIT.CODE
              }) ? */}
            <div
              onClick={() => {
                visibleEditModal(record);
              }}
            >
              <Edit />
              <p>Edit</p>
            </div>
            {/* : null
            } */}
            <div
              onClick={() => {
                handleAssignResident(record);
              }}
            >
              <AddFriend />
              <p>Assigned resident</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  const handleSearch = (e) => {
    let value = e.target.value;
    let obj = {
      ...filter,
      page: 1,
      search: {
        keyword: value,
        keys: ['groupName'],
      },
    };
    setFilter(obj);
  };

  return (
    <>
      <div className='pmr_wrap'>
        <div className='container'>
          <Header
            total={total}
            onSearch={handleSearch}
            onVisible={visibleUpsert}
            checkAddAction={checkAddAction}
          />
          <Table
            columns={getColumns()}
            datasource={data}
            loading={loading}
            onChange={handleTableChange}
            pagination={{
              current: filter.page,
              pageSize: filter.limit,
              total: total,
              showSizeChanger: true,
              onShowSizeChange: onShowSizeChange,
            }}
          />
        </div>
      </div>

      {visible ? (
        <UpsertModal onOk={fetch} visible={visible} onCancel={closeUpsert} />
      ) : null}

      {editVisible ? (
        <UpsertModal
          onOk={fetch}
          data={pmrDetails}
          visible={editVisible}
          onCancel={closeEditModal}
        />
      ) : null}

      {assignHomeVisible && (
        <AssignHomeModal
          title='Assigned Residents'
          loading={residentLoader}
          selectedPmrGroupId={selectedPmrGroupId}
          onClose={closeAssignHomeModal}
          visible={assignHomeVisible}
        />
      )}
    </>
  );
};
export default PmrGroup;
