import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { View } from '../../assets/images/pmr/index';
import MasterHeader from '../../containers/Master/components/MasterHeader';
import MasterUpsertForm from './components/MasterUpsertForm';
import { Toast } from '../../../src/components/common/Toast';
import { masterUpsert } from '../../../src/services/api/routes/master';
import axios from '../../../src/services/api/config';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { Edit, Cancel } from '../../../src/assets/images/resident-detail/index';
import {
  masterPaginate,
  masterUpdate,
  masterDelete,
} from '../../../src/services/api/routes/master';
import { pharmacyPaginate } from '../../../src/services/api/routes/customer';
import ActiveDeactive from '../../../src/components/common/ActiveDeactive';
import Table from '../../../src/components/common/Table/index';
import ConfirmPopup from '../../../src/components/common/ConfirmPopup';
import { MASTER_MEDIUM } from '../../constants/MasterMedium';
import { USER_TYPE } from '../../constants/User';
const _ = require('lodash');

const Master = (props) => {
  const { form, auth } = props;
  const { authUser } = auth;
  const { resetFields } = form;
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [headerWidth, setHeaderWidth] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pharmacy, setPharmacy] = useState({});
  const [pharmacyLoading, setPharmacyLoading] = useState(true);
  const [upsertModal, setUpsertModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getSpecificRecord, setSpecificRecord] = useState('');
  const isAdmin = authUser?.type === USER_TYPE.ADMIN.SUPER || authUser?.type === USER_TYPE.ADMIN.GENERAL
  const isHomeAdmin = authUser && authUser.type === USER_TYPE.HOME.ADMIN;
  const isPharmacyAdmin =
    authUser && authUser.type === USER_TYPE.PHARMACY.ADMIN;
  let filterBy = {
    // homeId: authUser && isHomeAdmin ? authUser.homeId._id : undefined,
    // pharmacyId: authUser && isPharmacyAdmin ? authUser.homeId._id : undefined,
    masterForMedium: isHomeAdmin ? MASTER_MEDIUM.HOME : isPharmacyAdmin ? MASTER_MEDIUM.PHARMACY : undefined
  };
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    fields: [],
    populate: [{ homeId: null }, { pharmacyId: null }],
    sortBy: { createdAt: 'DESC' },
    find: { parentId: null, ...filterBy },
  });

  useEffect(() => {
    if (filter.hasOwnProperty('search') && filter.search['keyword']) {
      const delayDebounceFn = setTimeout(() => {
        fetch();
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    } else fetch();
  }, [filter]);

  const handleHomePharmacy = (e) => {
    setRadioValue(parseInt(e.target.value));
  };

  const modifiedList = (list) => {
    let modifiedList = list.map((current, index) => {
      return current;
    });
    return modifiedList;
  };

  const fetch = () => {
    setLoading(true);
    axios({ ...masterPaginate, data: { query: { ...filter } } })
      .then(({ data }) => {
        if (data.code === 'OK') {
          let updatedList = modifiedList(data.data.data);
          setData(updatedList);
          setTotal(data.data.count);
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
      tempFilter.page = pagination.current;
    } else {
      // tempFilter.filter = {
      //     type: tempFilter.filter.type
      // }
    }
    setFilter(tempFilter);
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size , page: 1}));
    }
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    let obj = {
      ...filter,
      page: 1,
      search: {
        keyword: value,
        keys: ['name', 'code'],
      },
    };
    setFilter(obj);
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

  const getColumns = () => {
    const columns = [
      {
        title: 'Sr.No',
        keyword: 'index',
        dataIndex: 'index',
        render: (text, record, index) =>
          (filter.page - 1) * filter.limit + (index + 1),
      },
      {
        title: 'Name.',
        dataIndex: 'name',
        render: (text, record) => <>{text ? text : ''}</>,
      },
      {
        title: 'Code',
        dataIndex: 'code',
        render: (text) => <span>{text ? text : ''}</span>,
      },
      {
        title: 'Source Medium',
        dataIndex: 'masterForMedium',
        render: (text, record) => (
          <span>
            {text
              ? Object.keys(MASTER_MEDIUM).map((x) =>
                MASTER_MEDIUM[x] === text ? `${x}` : ''
              )
              : ''}
          </span>
        ),
      },
      {
        title: 'Active',
        dataIndex: 'isActive',
        render: (text, record) => (
          <span style={{ textTransform: 'capitalize' }}>
            <ActiveDeactive
              isActive={record.isActive}
              status={record.isActive}
              documentId={record._id}
              API={masterUpdate}
              record={record}
              model='master'
              fieldName={record.isActive}
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
        title: 'Submaster',
        dataIndex: 'submaster',
        width: '120px',
        showRefresh: !isAdmin,
        render: (text, record) => (
          <div className='actions'>
            <a
              onClick={() => {
                props.history.push({ pathname: `/sub-master/${record._id}` });
              }}
            >
              <View />
              <p> View</p>
            </a>
          </div>
        ),
      },
      {
        title: 'Action',
        width: '120px',
        showRefresh: true,
        render: (text, record) => (
          <>
            <div className='actions'>
              <a
                onClick={() => {
                  handleEditModalOpen(record);
                }}
              >
                <Edit />
                <p>Edit</p>
              </a>
              <a
                onClick={() => {
                  handleDeletePopupOpen(record);
                }}
              >
                <Cancel />
                <p>Delete</p>
              </a>
            </div>
          </>
        ),
      },
    ]
    if (!isAdmin) {
      columns.pop()
    }
    return columns;
  }

  const handleUpsertModalOpen = () => {
    setUpsertModal(true);
    resetFields();
  };

  const handleUpsertModalClose = () => {
    setUpsertModal(false);
  };

  const handleSubmit = (value) => {
    if (getSpecificRecord && getSpecificRecord._id) {
      setBtnLoading(true);
      let { url, method, baseURL } = masterUpdate;
      url = `${url}/${getSpecificRecord._id}`;
      axios({ url, method, data: value, baseURL })
        .then((data) => {
          if (data.data.code == 'OK') {
            setEditModal(false);
            setBtnLoading(false);
            Toast.success(data.data.message);
            fetch();
          } else setBtnLoading(false);
        })
        .catch((error) => {
          setBtnLoading(false);
          Toast.error(error);
        });
    } else {
      setBtnLoading(true);
      let { url, method, baseURL } = masterUpsert;
      axios({ url, method, data: value, baseURL })
        .then((data) => {
          if (data.data.code == 'OK') {
            setUpsertModal(false);
            setBtnLoading(false);
            Toast.success(data.data.message);
            fetch();
          } else setBtnLoading(false);
        })
        .catch((error) => {
          setBtnLoading(false);
          Toast.error(error);
        });
    }
  };

  const handleEditModalOpen = (data) => {
    setSpecificRecord(data);
    setRadioValue(data.masterForMedium);
    setEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditModal(false);
    setSpecificRecord(null);
  };

  const handleDeletePopupOpen = (data) => {
    setSpecificRecord(data);
    setDeletePopup(true);
  };

  const handleDeletePopupClose = () => {
    setDeletePopup(false);
    setSpecificRecord(null);
  };

  const handleDeleteRecord = (id) => {
    setDeleteLoader(true);
    let { url, method, baseURL } = masterDelete;
    url = `${url}/${id}`;
    axios({ url, method, baseURL })
      .then((data) => {
        if (data.data?.code == 'OK') {
          setDeleteLoader(false);
          setDeletePopup(false);
          fetch();
          Toast.success(data.data.message);
        }
      })
      .catch((error) => {
        setDeleteLoader(false);
        Toast.error(error);
      });
  };



  return (
    <>
      <div className='pmr_wrap'>
        <div className='container'>
          <MasterHeader
            headerWidth={() => {
              setHeaderWidth(true);
            }}
            modalTitle='Master'
            data={data}
            form={form}
            length={total}
            onAdd={handleUpsertModalOpen}
            onSearch={handleSearch}
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
      {upsertModal && (
        <MasterUpsertForm
          visible={upsertModal}
          authUser={authUser}
          title='Add Master'
          okText='Add'
          phamracyLoader={pharmacyLoading}
          loading={btnLoading}
          cancelText='Cancel'
          onOk={handleSubmit}
          onCancel={handleUpsertModalClose}
          onClose={handleUpsertModalClose}
          maskClosable={true}
          pharmacy={pharmacy}
          home={authUser && authUser.homeList}
          onHomePharmacy={handleHomePharmacy}
          radioValue={radioValue}
        />
      )}
      {deletePopup && (
        <ConfirmPopup
          value={getSpecificRecord}
          visible={deletePopup}
          title={`Delete Note -  ${getSpecificRecord.name}`}
          description='Are you want to delete this record'
          onOk={() => {
            handleDeleteRecord(getSpecificRecord._id);
          }}
          okText='Yes'
          cancelText='Cancel'
          loading={deleteLoader}
          onClose={handleDeletePopupClose}
          onCancel={handleDeletePopupClose}
        />
      )}
      {editModal && (
        <MasterUpsertForm
          value={getSpecificRecord}
          form={form}
          authUser={authUser}
          loading={btnLoading}
          phamracyLoader={pharmacyLoading}
          visible={editModal}
          title='Edit Master'
          okText='Update'
          cancelText='Cancel'
          onCancel={handleEditModalClose}
          onClose={handleEditModalClose}
          maskClosable={true}
          onOk={handleSubmit}
          pharmacy={pharmacy}
          home={authUser && authUser.homeList}
          onHomePharmacy={handleHomePharmacy}
          radioValue={radioValue}
        />
      )}
    </>
  );
};
const mapStateToProps = (props) => {
  return props;
};
export default connect(mapStateToProps)(createForm()(withRouter(Master)));
