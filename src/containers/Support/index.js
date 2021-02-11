import React, { useState, useEffect } from 'react';
import { Toast, Button, LightBox } from '../../../src/components/common/index';
import { View } from "../../../src/assets/images/pmr/index";
import { connect } from 'react-redux';
import { Info } from '../../../src/assets/images/popup';
import Dialog from 'rc-dialog';
import Table from '../../../src/components/common/Table/index';
import ConnectWritiForm from './components/ConnectWritiForm';
import { Cancel } from '../../../src/assets/images/resident-detail/index';
import RequestFeatureForm from './components/RequestFeatureForm';
import BugsForm from './components/BugsForm';
import {
  supportUpsert,
  supportPaginate,
  supportDelete,
  supportUpdate,
} from '../../../src/services/api/routes/supportFeedback';
import { masterPaginate } from '../../../src/services/api/routes/master';
import { SUPPORT_TYPE, URGENCY } from '../../constants/supportFeedback';
import { DEVICE_TYPE } from '../../constants/common';
import { USER_TYPE } from '../../constants/User';
import axios from '../../../src/services/api/config';
import Uploader, {
  FILE_CATEGORY,
  FILE_TYPES,
} from '../../../src/components/common/Upload/Uploader';
import { fileUpload } from '../../../src/services/api/routes/common';
import Header from './components/Header';
import { createForm } from 'rc-form';
import { canPerformAction } from '../../../src/util/common';
import { MODULE, ACTIONS } from '../../../src/constants/subscription';
import ConfirmPopup from '../../../src/components/common/ConfirmPopup';
import moment from 'moment';
import { find } from 'lodash';
const _ = require('lodash');

const Support = (props) => {
  const { form, authUser } = props;

  const [radioValue, setRadioValue] = useState(SUPPORT_TYPE.CONNECT_WITH_WRITI);
  const [visibleImage, setVisibleImage] = useState(false);
  const [detail, setDetail] = useState([]);

  const isAdmin =
    authUser &&
    (authUser.type === USER_TYPE.ADMIN.SUPER ||
      authUser.type === USER_TYPE.ADMIN.GENERAL);

  const initialFilter = {
    page: 1,
    limit: 10,
    fields: [],
    sortBy: { createdAt: 'DESC' },
    find: {},
    populate: [
      {
        addedBy: ['firstName', 'lastName', 'mergeLFName'],
      },
      {
        category: ['name'],
      },
    ],
  };

  const [filter, setFilter] = useState(() => {
    if (!isAdmin) {
      _.assignIn(initialFilter.find, { addedBy: authUser._id });
    }
    return initialFilter;
  });

  const { resetFields } = form;
  const [visible, setVisible] = useState(false);
  const [attechmentVisible, setattechmentVisible] = useState(false);
  const [attechment, setAttechment] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [supportData, setSupportData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [openConnectModal, setOpenConnectModal] = useState(true);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openBugModal, setOpenBugModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [getMasterName, setMasterName] = useState();
  const [getRecord, setRecord] = useState('');
  const [supportType, setSupportType] = useState(
    SUPPORT_TYPE.CONNECT_WITH_WRITI
  );

  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');


  const checkAddAction = canPerformAction({
    moduleId: MODULE.SUPPORT,
    actiontoCheck: ACTIONS.ADD.CODE
  })

  useEffect(() => {
    fetchMaster();
  }, []);

  useEffect(() => {
    fetch();
  }, [filter, radioValue]);

  useEffect(() => {
    if (attechment) {
      handleUpdate();
    }
  }, [attechment]);

  const handleUpdate = () => {
    if (supportData?._id) {
      let { url, method, baseURL } = supportUpdate;
      url = `${url}/${supportData._id}`;
      let imgData;
      _.map(attechment, (img) => {
        imgData = img?.path
      })

      let obj = {
        attachments: [{ path: imgData }],
      };
      axios({ url, method, baseURL, data: obj })
        .then((response) => {
          if (response?.data.code == 'OK') {
            Toast.success(response.data.message);
            fetch();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleSupportModalOpen = () => {
    setVisible(true);
  };

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const fetch = () => {
    setLoading(true);
    let { method, url, baseURL } = supportPaginate;
    axios({
      method,
      url,
      baseURL,
      data: {
        query: {
          ...filter,
          find: {
            ...filter.find,
            type: radioValue,
          },
        },
      },
    })
      .then((response) => {
        if (response && response.data.code == 'OK') {
          let updatedList = modifiedList(response.data.data.data);
          setData(updatedList);
          setTotal(response.data.data.count);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
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

  const fetchMaster = () => {
    let { method, url, baseURL } = masterPaginate;
    axios({ url, method, baseURL })
      .then((response) => {
        if (response.data.code == 'OK') {
          setMasterName(response.data.data.data);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const handleAttechmentVisible = (record) => {
    if (record?._id && record?.attachments.length) {
      setFileData(record?.attachments);
    } else {
      setFileData(null);
    }
    setattechmentVisible(true);
    setSupportData(record);
  };

  const handleOpenConnectModal = () => {
    setOpenRequestModal(false);
    setOpenBugModal(false);
    setOpenConnectModal(true);
  };

  const handleOpenRequestModal = () => {
    setOpenConnectModal(false);
    setOpenBugModal(false);
    setOpenRequestModal(true);
  };

  const handleOpenBugModal = () => {
    setOpenConnectModal(false);
    setOpenRequestModal(false);
    setOpenBugModal(true);
  };

  const handleConnectSubmit = (value) => {
    setBtnLoading(true);
    let { method, url, baseURL } = supportUpsert;
    axios({ method, url, data: value, baseURL })
      .then((data) => {
        if (data && data.data.code == 'OK') {
          setBtnLoading(false);
          resetFields();
          setVisible(false);
          Toast.success(data.data.message);
          fetch();
        }
      })
      .catch((error) => {
        setBtnLoading(false);
        Toast.error(error);
      });
  };

  const handleRequestSubmit = (value) => {
    setBtnLoading(true);
    let { method, url, baseURL } = supportUpsert;
    axios({ method, url, data: value, baseURL })
      .then((data) => {
        if (data && data.data.code == 'OK') {
          setBtnLoading(false);
          resetFields();
          setVisible(false);
          Toast.success(data.data.message);
          fetch();
        }
      })
      .catch((error) => {
        setBtnLoading(false);
        Toast.error(error);
      });
  };

  const handleBugSubmit = (value) => {
    setBtnLoading(true);
    let { method, url, baseURL } = supportUpsert;
    axios({ method, url, data: value, baseURL })
      .then((data) => {
        if (data && data.data.code == 'OK') {
          setBtnLoading(false);
          resetFields();
          setVisible(false);
          Toast.success(data.data.message);
          fetch();
        }
      })
      .catch((error) => {
        setBtnLoading(false);
        Toast.error(error);
      });
  };

  const handleSubmit = (value) => {
    setSupportType(value);
    if (value === SUPPORT_TYPE['CONNECT_WITH_WRITI']) {
      return handleOpenConnectModal();
    } else if (value === SUPPORT_TYPE['REQUEST_A_FEATURE']) {
      return handleOpenRequestModal();
    } else if (value === SUPPORT_TYPE['SUBMIT_A_BUG']) {
      return handleOpenBugModal();
    }
  };

  // const handleUpdate = () => {
  //   const { url, method, baseURL } = supportUpdate;
  //   url = `${url}/${supportData._id}`;
  //   let obj = {
  //     attachments: data.path,
  //   };

  //   axios({ url, method, baseURL, data: obj })
  //     .then((response) => {
  //       console.log('response', response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  let deleteParams = {
    moduleId: MODULE.SUPPORT,
    actiontoCheck: ACTIONS.DELETE.CODE,
  };
  let tableListParams = {
    moduleId: MODULE.SUPPORT,
    actiontoCheck: ACTIONS.LIST.CODE,
  };

  const handleRadioValue = (event) => {
    setLoading(true);
    setRadioValue(parseInt(event.target.value));
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
      title: radioValue === SUPPORT_TYPE.REQUEST_A_FEATURE ? 'Title' : '',
      dataIndex: radioValue === SUPPORT_TYPE.REQUEST_A_FEATURE ? 'title' : '',
      render: (text, record) => (
        <>
          {text
            ? radioValue === SUPPORT_TYPE.REQUEST_A_FEATURE
              ? text
              : ''
            : ''}
        </>
      ),
    },
    {
      title: radioValue === SUPPORT_TYPE.REQUEST_A_FEATURE ? 'Category' : '',
      dataIndex:
        radioValue === SUPPORT_TYPE.REQUEST_A_FEATURE ? 'category' : '',
      render: (text, record) => <>{text ? text.name : ''}</>,
    },
    {
      title: 'Query',
      dataIndex: 'query',
      render: (text, record) => <>{text ? text : ' - '}</>,
    },
    {
      title: radioValue == SUPPORT_TYPE.SUBMIT_A_BUG ? 'Platform' : '',
      dataIndex: radioValue == SUPPORT_TYPE.SUBMIT_A_BUG ? 'platform' : '',
      render: (text, record) => (
        <>
          {text
            ? Object.keys(DEVICE_TYPE).map((device) => {
              return DEVICE_TYPE[device] === text ? device : '';
            })
            : ''}
        </>
      ),
    },
    {
      title:
        radioValue == SUPPORT_TYPE.CONNECT_WITH_WRITI ||
          radioValue == SUPPORT_TYPE.SUBMIT_A_BUG
          ? 'Urgency'
          : '',
      dataIndex:
        radioValue == SUPPORT_TYPE.CONNECT_WITH_WRITI ||
          radioValue == SUPPORT_TYPE.SUBMIT_A_BUG
          ? 'urgency'
          : '',
      render: (text) =>
        text
          ? Object.keys(URGENCY).map((urgency) => {
            return (
              <span style={{ color: text == URGENCY.HIGH ? 'Red' : 'Black' }}>
                {URGENCY[urgency] === text ? urgency : ''}
              </span>
            );
          })
          : '',
    },
    {
      title:
        radioValue == SUPPORT_TYPE.CONNECT_WITH_WRITI ||
          radioValue == SUPPORT_TYPE.REQUEST_A_FEATURE
          ? 'RequestBy'
          : '',
      dataIndex:
        radioValue == SUPPORT_TYPE.CONNECT_WITH_WRITI ||
          radioValue == SUPPORT_TYPE.REQUEST_A_FEATURE
          ? 'addedBy'
          : '',
      render: (text) => (
        <span>{text ? `${text.lastName},${text.firstName}` : ''}</span>
      ),
    },
    {
      title:
        radioValue == SUPPORT_TYPE.CONNECT_WITH_WRITI ||
          radioValue == SUPPORT_TYPE.REQUEST_A_FEATURE
          ? 'Date'
          : '',
      dataIndex:
        radioValue == SUPPORT_TYPE.CONNECT_WITH_WRITI ||
          radioValue == SUPPORT_TYPE.REQUEST_A_FEATURE
          ? 'createdAt'
          : '',
      render: (text) => (
        <span>{text ? moment(text).format('MM/DD/YYYY, HH:mm') : ''}</span>
      ),
    },
    {
      title:
        radioValue == SUPPORT_TYPE.REQUEST_A_FEATURE ? 'View Attechment' : '',
      dataIndex:
        radioValue == SUPPORT_TYPE.REQUEST_A_FEATURE ? 'attachments' : '',
      render: (record, text) =>
        radioValue == SUPPORT_TYPE.REQUEST_A_FEATURE ? (
          <>
            <span
              onClick={() => {
                handleAttechmentVisible(text);
              }}
            >
              <Info
                style={{
                  marginTop: '-7px',
                  marginRight: '45px',
                  cursor: 'pointer',
                  width: '20px',
                  height: '20px',
                }}
              />
            </span>

          </>
        ) : null,
    },

    {
      title: 'Action',
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className='actions'>
            {/* <a
              onClick={() => {
                setVisible(true);
                setRecord(record);
              }}
            >
              <Edit />
              <p>Edit</p>
            </a> */}
            {canPerformAction(deleteParams) ? (
              <a
                onClick={() => {
                  setDeleteModal(true);
                  setRecord(record);
                }}
              >
                <Cancel />
                <p>Delete</p>
              </a>
            ) : null}
            {record && record.attachments && _.size(record.attachments) > 0 ?
              <span onClick={() => { handleViewImages(true, record) }}>
                <View style={{ cursor: 'pointer', }} />
              </span>
              : null}
          </div>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    let { method, url, baseURL } = supportDelete;
    url = `${url}/${id}`;
    axios({ method, url, baseURL })
      .then((response) => {
        setDeleteModal(false);
        fetch();
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const handleViewImages = (action, record) => {
    setVisibleImage(action);
    if (record?.attachments) {
      _.map(record?.attachments, (img) => {
        img.caption = `${record.title}`;
        img.src = img?.path
      })
      setDetail(record?.attachments);
    }
  }

  return (
    <>
      <div className='pmr_wrap'>
        <div className='container'>
          <Header
            total={total}
            onRadioValue={radioValue}
            onVisible={handleSupportModalOpen}
            onHandleRadioValue={handleRadioValue}
            onCheckAddAction={checkAddAction}
          />
          <Table
            columns={canPerformAction(tableListParams) ? getColumns() : null}
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

      {visible && (
        <Dialog
          visible={visible}
          maskClosable={false}
          onClose={() => {
            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
          }}
          style={{ width: '50%' }}
          className='search_popup_wrap'
        >
          <div className='popup-search-con'>
            <h2 className='name_head text-left' style={{ color: '#000000' }}>
              Support
            </h2>

            <div className='rx-btns drug-bts' style={{ marginBottom: '3%' }}>
              {Object.keys(SUPPORT_TYPE).map((name, index) => {
                return (
                  <>
                    <a>
                      <Button
                        className={
                          supportType === SUPPORT_TYPE[name] ? 'r-o-btn' : null
                        }
                        onClick={() => {
                          handleSubmit(SUPPORT_TYPE[name]);
                        }}
                      >
                        {name.replace(/_/g, ' ')}
                      </Button>
                    </a>
                  </>
                );
              })}
            </div>

            {openConnectModal && (
              <ConnectWritiForm
                // editRecord={getRecord ? getRecord : null}
                supportType={supportType}
                onSubmit={handleConnectSubmit}
                handleCancel={() => {
                  resetFields();
                  setVisible(false);
                }}
                form={form}
                loading={btnLoading}
              />
            )}
            {openRequestModal && (
              <RequestFeatureForm
                masterData={getMasterName}
                supportType={supportType}
                handleCancel={() => {
                  resetFields();
                  setVisible(false);
                }}
                handleSubmit={handleRequestSubmit}
                form={form}
                loading={btnLoading}
              />
            )}
            {openBugModal && (
              <BugsForm
                authUser={authUser}
                supportType={supportType}
                handleCancel={() => {
                  resetFields();
                  setVisible(false);
                }}
                handleSubmit={handleBugSubmit}
                form={form}
                loading={btnLoading}
              />
            )}
          </div>

          <button
            className='close-btn'
            onClick={() => {
              setVisible(false);
            }}
          >
            <img
              alt='#'
              src={require('../../../src/assets/images/popup/close.svg')}
            />
          </button>
        </Dialog>
      )}

      {deleteModal && (
        <ConfirmPopup
          value={getRecord}
          visible={deleteModal}
          title={`Delete Note -  ${getRecord.query}`}
          description='Are you want to delete this record'
          onOk={() => {
            handleDelete(getRecord && getRecord._id);
          }}
          okText='Yes'
          cancelText='Cancel'
          onClose={() => {
            setDeleteModal(false);
          }}
          onCancel={() => {
            setDeleteModal(false);
          }}
        />
      )}

      {attechmentVisible && (
        <Uploader
          visible={attechmentVisible}
          onRequestClose={() => setattechmentVisible(false)}
          multiple={true}
          title='View Attechment'
          // defaultList={fileData?.map((data) => {
          //   return data?.path;
          // })}
          uploadUrl={{ ...fileUpload }}
          allowedTypes={FILE_TYPES.IMAGE}
          extraData={{
            isUploadToS3: true,
            category: [FILE_CATEGORY.IMAGE].join(','),
          }}
          maxSizeInMB={1}
          onError={(err) => {
            Toast.error(err);
          }}
          onSuccess={(uploaded) => {
            if (uploaded?.code === 'OK') {
              setAttechment(uploaded.data);
              setattechmentVisible(false);
            }
          }}
        />
      )}

      {visibleImage &&
        <LightBox
          visible={visibleImage}
          images={detail}
          onCloseRequest={() => handleViewImages(false)}
          curImg={0}
          imageTitle={{ caption: true }}
        />}
    </>
  );
};
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(createForm()(Support));
