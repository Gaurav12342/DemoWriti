import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MasterHeader from '../components/MasterHeader';
import MasterList from '../components/MasterList';
import MasterUpsertForm from '../components/MasterUpsertForm';
import axios from '../../../services/api/config';
import { Toast } from '../../../components/common/Toast';
import { createForm } from 'rc-form';
import {
  masterPaginate,
  masterUpsert,
  masterDelete,
  masterUpdate,
  getSpecificMaster,
} from '../../../services/api/routes/master';
import { pharmacyPaginate } from '../../../services/api/routes/customer';
import { Edit, Cancel } from '../../../assets/images/resident-detail/index';
import ActiveDeactive from '../../../components/common/ActiveDeactive';
import Table from '../../../components/common/Table/index';
import ConfirmPopup from '../../../components/common/ConfirmPopup';
import { MASTER_MEDIUM } from '../../../constants/MasterMedium';
import { USER_TYPE } from '../../../constants/User';
import { MODULE, ACTIONS } from '../../../constants/subscription';
import { canPerformAction } from '../../../util/common';
const _ = require('lodash');

const SubMaster = (props) => {
  const { form, auth } = props;
  const { authUser } = auth;
  const { resetFields } = form;
  const [headerWidth, setHeaderWidth] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteLoading, setDeleteBtnLoading] = useState(false);
  const [radioValue, setRadioValue] = useState(undefined);
  const [pharmacy, setPharmacy] = useState([]);
  const [UpsertModal, setUpsertModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getSpecificRecord, setSpecificRecord] = useState('');
  const [getSpecificMasterName, setSpecificMasterName] = useState('');
  const [masterDetail, setMasterDetail] = useState('');
  const [mediumLists, setMediumLists] = useState([]);
  const isHomeAdmin = authUser && authUser.type === USER_TYPE.HOME.ADMIN;
  const isPharmacyAdmin =
    authUser && authUser.type === USER_TYPE.PHARMACY.ADMIN;
  let filterBy = {
    homeId: isHomeAdmin ? authUser.homeId._id : undefined,
    pharmacyId: isPharmacyAdmin ? authUser.pharmacyId?._id : undefined,
  };
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    fields: [],
    find: { ...filterBy },
    populate: [{ homeId: null }, { pharmacyId: null }],
    sortBy: { createdAt: 'DESC' },
  });
  const homes = authUser?.homeList || []
  const isAdmin = authUser?.type === USER_TYPE.ADMIN.SUPER || authUser?.type === USER_TYPE.ADMIN.GENERAL

  useEffect(() => {
    if (props.match.params.id) {
      if (filter.hasOwnProperty('search') && filter.search['keyword']) {
        const delayDebounceFn = setTimeout(() => {
          fetch();
        }, 600);
        return () => clearTimeout(delayDebounceFn);
      } else fetch();
    }
  }, [filter, props.match.params.id]);

  useEffect(() => {
    if (props.match.params.id) {
      getSpecificMasterRecord();
    }
  }, [props.match.params.id]);

  useEffect(() => {
    fetchPharmacy();
  }, []);

  useEffect(() => {
    let tempFilter = { ...filter }
    if (masterDetail?.masterForMedium === MASTER_MEDIUM.PHARMACY)
      setMediumLists(pharmacy)
    else if (masterDetail?.masterForMedium === MASTER_MEDIUM.HOME)
      setMediumLists(homes)
    setRadioValue(masterDetail.masterForMedium)
    // setFilter(tempFilter)
  }, [masterDetail])

  const handleHomePharmacy = (e) => {
    setRadioValue(parseInt(e.target.value));
  };

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const fetchPharmacy = () => {
    let { method, url, baseURL } = pharmacyPaginate;
    axios({ method, url, baseURL, data: { query: { find: { isActive: true } } } })
      .then((response) => {
        if (response.data.code == 'OK') {
          setPharmacy(response.data.data.data);
        } else {
          Toast.error(response.data.message);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };
  const fetch = () => {
    setLoading(true);
    axios({
      ...masterPaginate,
      data: {
        query: {
          ...filter,
          find: {
            ...filter.find,
            parentId: props.match.params?.id,
          },
        },
      },
    })
      .then((data) => {
        if (data.data.code === 'OK') {
          if (props.match.params.id) {
            let updatedList = data.data.data.data;
            setData(updatedList);
            setTotal(data.data.data.count);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        Toast.error(err);
        setLoading(false);
      });
  };

  const getSpecificMasterRecord = () => {
    let { method, url, baseURL } = getSpecificMaster;
    url = `${url}/${props.match.params.id}`;
    axios({ method, url, baseURL })
      .then((response) => {
        if (response.data.code === 'OK') {
          setSpecificMasterName(response.data.data.name);
        }
      })
      .catch((err) => {
        Toast.error(err);
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
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
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

  const getColumns = () => [
    {
      title: 'Sr.No',
      keyword: 'index',
      dataIndex: 'index',
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <>{text ? text : ''}</>,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      render: (text) => <span>{text ? text : ''}</span>,
    },
    {
      title: 'Home/Pharmacy',
      dataIndex: 'masterForMedium',
      render: (text, record) => (
        <span>
          {text
            ? Object.keys(MASTER_MEDIUM).map((x) =>
              MASTER_MEDIUM[x] === text
                ? `${
                text === MASTER_MEDIUM.HOME && record.homeId
                  ? record.homeId.name
                  : text === MASTER_MEDIUM.PHARMACY && record.pharmacyId
                    ? record.pharmacyId.name
                    : text === MASTER_MEDIUM.GENERAL ? '-' : ''
                }` : ''
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
            API={masterUpdate}
            documentId={record._id}
            record={record}
            model='submaster'
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
      title: 'Action',
      width: '120px',
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className='actions'>
            {
              canPerformAction({
                moduleId: MODULE.MASTER,
                actiontoCheck: ACTIONS.EDIT.CODE,
              }) ?
                <a
                  onClick={() => {
                    handleEditModalOpen(record);
                  }}
                >
                  <Edit />
                  <p>Edit</p>
                </a>
                : null
            }
            {
              canPerformAction({
                moduleId: MODULE.MASTER,
                actiontoCheck: ACTIONS.DELETE.CODE,
              }) ?
                <a
                  onClick={() => {
                    handleDeletePopupOpen(record);
                  }}
                >
                  <Cancel />
                  <p>Delete</p>
                </a>
                : null
            }
          </div>
        </>
      ),
    },
  ];

  const handleUpsertModalOpen = () => {
    setUpsertModal(true);
    resetFields();
  };

  const handleUpsertModalClose = () => {
    setUpsertModal(false);
  };

  const handleSubmit = (value) => {
    setBtnLoading(true);
    if (getSpecificRecord) {
      let { method, url, baseURL } = masterUpdate;
      url = `${url}/${getSpecificRecord._id}`;
      let obj = {
        ...value,
        parentId: props.match.params.id,
      };
      axios({ method, url, data: obj, baseURL })
        .then((response) => {
          if (response.data.code == 'OK') {
            setBtnLoading(false);
            setEditModal(false);
            Toast.success(response.data.message);
            fetch();
          }
        })
        .catch((error) => {
          setBtnLoading(false);
          Toast.err(error);
        });
    } else {
      setBtnLoading(true);
      let { method, url, baseURL } = masterUpsert;
      let obj = {
        ...value,
        parentId: props.match.params.id,
      };
      axios({ method, url, data: obj, baseURL })
        .then((response) => {
          if (response.data.code == 'OK') {
            setBtnLoading(false);
            setUpsertModal(false);
            Toast.success(response.data.message);
            fetch();
          }
        })
        .catch((error) => {
          setBtnLoading(false);
          Toast.error(error);
        });
    }
  };
  
  

  const handleEditModalOpen = (data) => {
    setSpecificRecord(data);
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
    setDeleteBtnLoading(true);
    let { url, method, baseURL } = masterDelete;
    url = `${url}/${id}`;
    axios({ url, method, baseURL })
      .then((data) => {
        if (data.data.code == 'OK') {
          setDeleteBtnLoading(false);
          setDeletePopup(false);
          Toast.success(data.data.message);
          fetch();
        }
      })
      .catch((error) => {
        setDeleteBtnLoading(false);
        Toast.error(error);
      });
  };

  const handleSelect = (detail) => {
    // setFilter({
    //   ...filter,
    //   find: {
    //     parentId: props.match.params?.id,
    //   },
    // });

    setMasterDetail(detail);
  };

  const handleChangeMedium = (val) => {
    let tempFilter = { ...filter }
    tempFilter.find = {
      ...tempFilter.find,
      homeId: radioValue === MASTER_MEDIUM.HOME ? val : undefined,
      pharmacyId: radioValue === MASTER_MEDIUM.PHARMACY ? val : undefined,
    }
    setFilter(tempFilter)
  }

  return (
    <>
      <div className='pmr_wrap'>
        <div className='container'>
          <div className='residents_detail_container'>
            <MasterHeader
              headerWidth={() => {
                setHeaderWidth(false);
              }}
              modalTitle='Sub Master'
              form={form}
              masterName={getSpecificMasterName}
              onAdd={handleUpsertModalOpen}
              length={total}
              onSearch={handleSearch}
              masterDetail={masterDetail}
              mediumLists={mediumLists}
              onChangeMedium={handleChangeMedium}
              isAdmin={isAdmin}
            />
            <MasterList
              id={props.match.params.id}
              onSelect={handleSelect}
              authUser={authUser}
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
      </div>

      {UpsertModal && (
        <MasterUpsertForm
          form={form}
          loading={btnLoading}
          visible={UpsertModal}
          title='Add Sub Master'
          authUser={authUser}
          okText='Add'
          cancelText='Cancel'
          onOk={handleSubmit}
          onCancel={handleUpsertModalClose}
          onClose={handleUpsertModalClose}
          maskClosable={true}
          pharmacy={pharmacy}
          home={authUser && authUser.homeList}
          onHomePharmacy={handleHomePharmacy}
          radioValue={radioValue}
          masterDetail={masterDetail}
          isAdmin={isAdmin}
          masterParentId={props.match.params.id}
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
          loading={deleteLoading}
          onClose={handleDeletePopupClose}
          onCancel={handleDeletePopupClose}
        />
      )}

      {editModal && (
        <MasterUpsertForm
          value={getSpecificRecord}
          authUser={authUser}
          form={form}
          loading={btnLoading}
          visible={editModal}
          title='Edit Sub Master'
          okText='Update'
          cancelText='Cancel'
          onCancel={handleEditModalClose}
          onClose={handleEditModalClose}
          maskClosable={true}
          onOk={handleSubmit}
          home={authUser && authUser.homeList}
          onHomePharmacy={handleHomePharmacy}
          radioValue={radioValue}
          masterDetail={masterDetail}
          isAdmin={isAdmin}
          pharmacy={pharmacy}
          masterParentId={props.match.params.id}
        />
      )}
    </>
  );
};

const mapStateToProps = (props) => {
  return props;
};
export default connect(mapStateToProps)(createForm()(withRouter(SubMaster)));
