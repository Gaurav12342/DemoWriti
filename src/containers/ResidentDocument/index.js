import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/common/Table/index';
import axios from '../../services/api/config';
import { Link } from 'react-router-dom';
import {
  listResidentDocuments,
  createResidentDocument,
  deleteResidentDocument,
} from '../../services/api/routes/residentDocument';
import { masterPaginate } from '../../services/api/routes/master';
import { View, Notes } from '../../assets/images/pmr/index';
import { Edit } from '../../assets/images/popup/index';
import { Trash } from '../../assets/images/resident-detail/index';
import AddResidentDocument from './AddResidentDocument';
import { getResidents } from '../../services/api/routes/resident';
import { displayDateTime } from '../../util/moment';
import { createForm } from 'rc-form';
import PageHead from './PageHead';
import { displayCatchErrorMsg, isInvalidTokenError } from '../../util/common';
import DeleteResidentDocModal from './DeleteResidentDoc';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Toast } from '../../components/common/index';
import { USER_TYPE } from '../../constants/User';
import { STATUS } from '../../constants/resident';
import { MODULE, SUB_MODULE, ACTIONS } from '../../constants/subscription';
import { canPerformAction } from '../../util/common';
const moment = require('moment');
let residentTimeout;
function ResidentDocumentMain(props) {
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    sortBy: { createdAt: 'DESC' },
    find: {},
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addDocLoading, setAddDocLoading] = useState(false);
  const [documentFilter, setDocumentFilter] = useState(undefined);
  const [data, setData] = useState([]);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [recordTypeList, setRecordTypeList] = useState([]);
  const [residentListing, setResidentListing] = useState([]);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [documentDate, setDocumentDate] = useState(undefined);
  const [editDelRec, setEditDelRec] = useState(undefined);
  const [isDeleteDoc, setIsDeleteDoc] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [reasonList, setReasonList] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [currImg, setCurrImg] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [residentDocumentPathList, setResidentDocumentPathList] = useState([]);
  const { authUser, form } = props;

  useEffect(() => {
    fetchresidentDocumentType();
  }, []);

  useEffect(() => {
    if (filter.hasOwnProperty('search') && filter.search['keyword']) {
      const delayDebounceFn = setTimeout(() => {
        fetch();
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    } else fetch();
  }, [filter]);

  const fetchresidentDocumentType = () => {
    let data = {
      query: {
        find: {
          isActive: true,
          parentId: null,
          code: 'RESIDENT_DOCUMENT_TYPE',
        },
        populate: [
          {
            subMaster: [],
            match: { isActive: true },
          },
        ],
        select:
          'parentId code name isActive description slug _id updatedAt createdAt',
      },
    };
    axios({ ...masterPaginate, data }).then(({ data }) => {
      if (data.code === 'OK') {
        if (data.data.data.length > 0) {
          if (
            data.data.data[0].subMaster &&
            data.data.data[0].subMaster.length
          ) {
            let filter = [];
            let uniqueVal = [];
            data.data.data[0].subMaster.forEach((obj) => {
              let str = obj.name.replace(/_/g, ' ');
              if (!uniqueVal.includes(str)) {
                uniqueVal.push(str);
                filter.push({ text: str, value: obj._id });
              }
            });
            setDocumentFilter(filter);
          }
        }
      }
    });
  };
  const fetchrDeleteReasonList = () => {
    let data = {
      query: {
        find: {
          isActive: true,
          parentId: null,
          code: 'RESIDENT_DOCUMENT_CANCELLATION_REASON',
        },
        populate: [
          {
            subMaster: [],
            match: { isActive: true },
          },
        ],
        select:
          'parentId code name isActive description slug _id updatedAt createdAt',
      },
    };
    axios({ ...masterPaginate, data }).then(({ data }) => {
      if (data.code === 'OK') {
        if (data.data.data.length > 0) {
          if (
            data.data.data[0].subMaster &&
            data.data.data[0].subMaster.length
          ) {
            setReasonList(data.data.data[0].subMaster);
          }
        }
      }
    });
  };
  const fetchResident = (filter) => {
    if (residentTimeout) {
      clearTimeout(residentTimeout);
      residentTimeout = null;
    }
    residentTimeout = setTimeout(() => {
      axios({ ...getResidents, data: { ...filter } })
        .then(({ data }) => {
          if (data.code === 'OK') {
            if (data.data.data) {
              setResidentListing(data.data.data);
            }
          } else {
            displayCatchErrorMsg(data.message);
          }
        })
        .catch((err) => {
          displayCatchErrorMsg(err);
        });
    }, 300);
  };
  const onResidentSearch = (name) => {
    if (name) {
      let filter = {
        query: {
          // page:1,
          // limit:10,
          find: { status: STATUS.ACTIVE },
          search: {
            keyword: name,
            keys: ['firstName', 'lastName'],
          },
          populate: [
            {
              homeAreaId: ['name'],
            },
          ],
        },
      };
      fetchResident(filter);
    } else {
      form.setFieldsValue({
        residentId: undefined,
      });
    }
  };

  const constructImageList = (records) => {
    let assembledImagesList = [];
    let updatedRecords = records.map((obj) => {
      if (obj.documents && obj.documents.length > 0) {
        if (assembledImagesList.length === 0) {
          obj.attachmentIndex = 0;
        } else if (assembledImagesList.length > 0) {
          obj.attachmentIndex = assembledImagesList.length;
        }
        let imageData = obj.documents[obj.documents.length - 1];
        let temp = { ...obj };
        temp.src = imageData.path;
        temp.caption = `${obj.residentDocId}-1` || null;
        temp.residentName =
          obj.residentId && obj.residentId.lastName
            ? `${obj.residentId.lastName} , ${obj.residentId.firstName}`
            : '';
        assembledImagesList.push(temp);
      }
      return obj;
    });
    return { assembledImagesList, updatedRecords };
  };
  const handleSearch = (e) => {
    if (e.target.value) {
      setFilter({
        ...filter,
        page: 1,
        limit: 10,
        search: {
          keyword: e.target.value,
          keys: [
            'residentDocId',
            'residentId.firstName',
            'residentId.lastName',
          ],
        },
      });
    } else {
      if (filter.search) {
        let tempFilter = filter;
        delete tempFilter['search'];
        setFilter({ ...tempFilter, page: 1, limit: 10 });
      }
    }
  };
  const fetch = () => {
    setLoading(true);
    axios({
      ...listResidentDocuments,
      data: {
        query: {
          ...filter,
          find: {
            isDelete: false,
            ...filter.find,
          },
          populate: [
            {
              masterId: ['name'],
            },
            {
              residentId: ['firstName', 'lastName'],
            },
            {
              homeAreaId: ['name'],
            },
          ],
        },
      },
    })
      .then(({ data }) => {
        setLoading(false);
        if (data.code === 'OK') {
          if (data.data.data && data.data.data.length) {
            let { assembledImagesList, updatedRecords } = constructImageList(
              data.data.data
            );
            setData(updatedRecords);
            // assembledImagesList.map((data)=>{

            //     setImagesData(data)
            // })
            setImagesData(assembledImagesList);
          } else {
            setData(data.data.data);
            setImagesData([]);
          }
          setTotal(data.data.count);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const openViewer = (record) => {
    setViewerIsOpen(true);
    setCurrImg(record.attachmentIndex);
    setEditDelRec(record);
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
      title: 'Doc. No',
      dataIndex: 'residentDocId',
    },
    {
      title: 'Resident',
      dataIndex: 'residentId',
      render: (text, record) => (
        <span>
          {record.patientId && record.patientId.id ? (
            <Link
              to={`/wa/resident/${record.patientId.id}`}
              style={{ textDecoration: 'none' }}
            >
              <span
                className='resident-document-name'
                style={{ textTransform: 'capitalize' }}
              >

                {text
                  ? `${text.lastName || ''}, ${text.firstName || ''}`
                  : '-'}
              </span>
            </Link>
          ) : (
              <span style={{ textTransform: 'capitalize' }}>
                {' '}
                {text ? `${text.lastName || ''}, ${text.firstName || ''}` : '-'}
              </span>
            )}
        </span>
      ),
    },
    {
      title: 'Home Area',
      dataIndex: 'homeAreaId',
      render: (text, record) => (
        <span>{text && text.name ? text.name : null}</span>
      ),
    },
    {
      title: 'Document Type',
      dataIndex: 'masterId',
      filters: documentFilter,
      onFilter: (value, record) => {
        return record.masterId._id === value;
      },
      render: (text, record) => (
        <span className='dcTypeTag'>
          {text && text.name ? (
            <span className='o_status submitted'>{text.name}</span>
          ) : null}
        </span>
      ),
    },
    {
      title: 'Date/Time',
      dataIndex: 'documents',
      render: (text) => (
        <span>
          {text && text.length && displayDateTime(text[0].documentDate)}
        </span>
      ),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className='actions'>
          <div onClick={() => openViewer(record)}>
            <View />
            <p>Info</p>
          </div>
          {/* <div>
                        <Notes />
                        <p>Notes</p>
                    </div> */}
          {/* <div onClick={() => handleAddEdit(true, true, record)}>
                        <Edit />
                        <p>Edit</p>
                    </div> */}
          {[
            USER_TYPE.ADMIN.SUPER,
            USER_TYPE.ADMIN.GENERAL,
            USER_TYPE.PHARMACY.ADMIN,
            USER_TYPE.HOME.ADMIN,
          ].indexOf(authUser.type) >= 0 ? (
              <div onClick={() => handleDocDeleteModal(true, record)}>
                <Trash />
                <p>Delete</p>
              </div>
            ) : null}
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination, tfilter, sorter) => {
    let tempFilter = filter;
    tempFilter = {
      ...tempFilter,
      page: pagination.current,
      limit: pagination.pageSize,
    };
    if (tfilter && Object.keys(tfilter).length) {
      Object.keys(tfilter).map((k) => {
        if (tfilter[k] && tfilter[k].length > 0) {
          tempFilter.find = {
            ...tempFilter.find,
            [k]: tfilter[k],
          };
        } else {
          delete tempFilter['find'][k];
        }
      });
    } else {
      delete tempFilter['find']['masterId'];
    }
    setFilter(tempFilter);
  };
  const handleAddEdit = (action, isEditOp, record) => {
    setAddDocumentModal(action);
    if (action === false) {
      setResidentDocumentPathList([]);
      if (isEdit) {
        setIsEdit(false);
        setEditDelRec(undefined);
      }
    }
    if (isEditOp && isEditOp === true) {
      let tempList = record.documents.map((obj) => {
        obj.name = obj.path;
        obj.status = true;
        return obj;
      });
      setResidentDocumentPathList(tempList);
      setIsEdit(isEditOp);
    }
    if (record && record._id) {
      if (record?.residentId?.lastName) {
        onResidentSearch(record.residentId.lastName);
      }
      setEditDelRec(record);
    }
    form.resetFields();
  };
  const handleSubmit = () => {
    setAddDocLoading(true);
    form.validateFields((error, value) => {
      if (error) {
        setAddDocLoading(false);
        return;
      }
      if (residentDocumentPathList.length === 0) {
        Toast.error('Please Upload Document ');
        return;
      }

      let tempDate = moment(value.documentDate).toISOString();

      let tempDocList = residentDocumentPathList.map((obj) => {
        obj.documentDate = tempDate;
        return obj;
      });
      let valueData;

      residentListing &&
        residentListing.map((data) => {
          return data._id === value.residentId ? (valueData = data) : null;
        });
      let request = {
        ...value,
        documents: [...tempDocList],
        homeAreaId: valueData.homeAreaId._id,
      };
      if (isEdit) {
        request = {
          ...editDelRec,
          ...request,
        };
      }
      axios({ ...createResidentDocument, data: { ...request } })
        .then(({ data }) => {
          setAddDocLoading(false);
          setAddDocumentModal(false);
          setResidentDocumentPathList([]);
          if (isEdit) {
            setIsEdit(false);
            setEditDelRec(undefined);
          }
          if (data.code === 'OK') {
            fetch();
          } else {
            displayCatchErrorMsg(data.message);
          }
        })
        .catch((err) => {
          displayCatchErrorMsg(err);
          setAddDocLoading(false);
          if (isInvalidTokenError(err)) {
            setAddDocumentModal(false);
          }
        });
    });
  };
  const handleUploadAction = (action) => {
    setIsUploadVisible(action);
  };

  const handleUploader = (action, uploadedData) => {
    handleUploadAction(action);
    if (uploadedData && uploadedData.data && uploadedData.data.length) {
      let list = uploadedData.data.map((obj) => {
        if (obj.path && obj.status) {
          let temp = {
            path: obj.path,
            sequence: residentDocumentPathList.length - 1,
            uploadedBy: authUser._id,
          };
          return temp;
        }
      });
      setResidentDocumentPathList([...residentDocumentPathList, ...list]);
    }
  };
  const handleDatePickerChange = (date) => {
    // setDocumentDate(date)
    form.setFieldsValue({ documentDate: date });
  };
  const handleDocumentDelete = (request) => {
    setBtnLoading(true);
    if (editDelRec && editDelRec._id) {
      request._id = editDelRec._id;
    } else {
      return;
    }
    axios({ ...deleteResidentDocument, data: { ...request } })
      .then(({ data }) => {
        if (data.code === 'OK') {
          setBtnLoading(false);
          fetch();
          setIsDeleteDoc(false);
          setEditDelRec(undefined);
          form.resetFields();
        }
      })
      .catch((err) => setBtnLoading(false));
  };
  const handleDocDeleteModal = (action, record) => {
    setIsDeleteDoc(action);
    if (action && reasonList.length === 0) {
      fetchrDeleteReasonList();
    }
    if (record && record._id) {
      setEditDelRec(record);
    }
  };
  const handleDateChange = (dateRange) => {
    let tempFilter = filter;
    if (dateRange) {
      tempFilter = {
        ...filter,
        gte: [
          {
            'documents.documentDate':
              moment(dateRange[0]).format('YYYY-MM-DDT00:00:00.000') + 'Z',
          },
        ],
        lte: [
          {
            'documents.documentDate':
              moment(dateRange[1]).format('YYYY-MM-DDT23:59:59.000') + 'Z',
          },
        ],
        // "gte": [{ "documents.documentDate": moment(dateRange[0]).startOf('day').toISOString() }],
        // "lte": [{ "documents.documentDate": moment(dateRange[1]).endOf('day').toISOString() }]
      };
      tempFilter.dateRange = dateRange;
    } else if (tempFilter.gte && tempFilter.lte) {
      delete tempFilter['gte'];
      delete tempFilter['lte'];
      if (tempFilter.dateRange) {
        delete tempFilter['dateRange'];
      }
    }
    setFilter({ ...tempFilter });
  };

  const checkAddAction = canPerformAction({
    moduleId: MODULE.RESIDENT_DOCUMENT,
    // subModuleId: SUB_MODULE.PMR_GROUP,
    actiontoCheck: ACTIONS.ADD.CODE
  })

  return (
    <div className='pmr_wrap'>
      <div className='container'>
        <PageHead
          total={total}
          onSearch={handleSearch}
          onAdd={handleAddEdit}
          loginUser={authUser}
          filter={filter}
          onDateChange={handleDateChange}
          documentDate={documentDate}
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
          }}
        />
        {addDocumentModal ? (
          <AddResidentDocument
            isEdit={isEdit}
            visible={addDocumentModal}
            residentListing={residentListing}
            onResidentSearch={onResidentSearch}
            isUploadVisible={isUploadVisible}
            onSubmit={handleSubmit}
            documentList={residentDocumentPathList}
            onDatePickerChange={handleDatePickerChange}
            documentDate={documentDate}
            onCancel={handleAddEdit}
            loading={addDocLoading}
            form={form}
            recordTypeList={documentFilter}
            // onUploadAction={handleUploadAction}
            onUploadAction={handleUploader}
            editRecord={editDelRec}
          />
        ) : null}
        {isDeleteDoc ? (
          <DeleteResidentDocModal
            visible={isDeleteDoc}
            onCancel={handleDocDeleteModal}
            reasonList={reasonList}
            record={editDelRec}
            loading={btnLoading}
            onDocumentDelete={handleDocumentDelete}
          />
        ) : null}
        {viewerIsOpen ? (
          <>
            <Lightbox
              mainSrc={imagesData[currImg].src}
              imageTitle={
                <div>
                  <div style={{ float: 'left' }}>
                    <span style={{ marginRight: '10px' }}>
                      {imagesData[currImg].residentName || ' '}
                    </span>
                    {imagesData[currImg].masterId
                      ? `${'   |   '}${imagesData[currImg].masterId.name}`
                      : null}
                  </div>
                  {imagesData[currImg].notesCount &&
                    imagesData[currImg].notesCount > 0 ?
                    <div style={{ marginLeft: '10px', cursor: 'pointer', float: 'right' }}
                      onClick={() => this.visibleNotesModal(true, imagesData[currImg], 'imageViewer')}>
                      {" | "}{imagesData[currImg].notesCount}
                      {"  "}Note(s) </div> : null
                  }
                </div>
              }
              nextSrc={imagesData[(currImg + 1) % imagesData.length].src}
              prevSrc={
                imagesData[
                  (currImg + imagesData.length - 1) % imagesData.length
                ].src
              }
              onCloseRequest={() => setViewerIsOpen(false)}
              onMovePrevRequest={() =>
                setCurrImg(
                  (currImg) =>
                    (currImg + imagesData.length - 1) % imagesData.length
                )
              }
              onMoveNextRequest={() =>
                setCurrImg((currImg) => (currImg + 1) % imagesData.length)
              }
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
const mapStateToProps = ({ auth }) => {
  const { authUser, homeId } = auth;
  return {
    authUser,
    homeId,
  };
};
export default connect(mapStateToProps)(createForm()(ResidentDocumentMain));
