import React, { useEffect, useState } from 'react';
import Header from '../Version/components/Header';
import VersionUpsertForm from '../Version/components/VersionUpsertForm';
import Table from '../../../src/components/common/Table/index';
import { Edit, Cancel } from '../../../src/assets/images/resident-detail/index';
import { Toast } from '../../../src/components/common/Toast';
import ActiveDeactive from '../../../src/components/common/ActiveDeactive';
import HardUpdate from './components/HardUpdate';
import axios from '../../services/api/config';
import { VERSION_PLATFORM } from '../../../src/constants/common';
import Uploader, {
  FILE_TYPES,
  FILE_CATEGORY,
} from '../../../src/components/common/Upload/Uploader';
import { displayDateTime } from '../../../src/util/moment';
import {
  versionPaginate,
  versionDelete,
  versionUpsert,
  versionUpdate,
  versionActiveDeActive,
  versionHardUpdate,
} from '../../../src/services/api/routes/version';
import { fileUpload } from '../../../src/services/api/routes/common';
import ConfirmPopup from '../../../src/components/common/ConfirmPopup';
import { createForm } from 'rc-form';
const _ = require('lodash');

const Version = (props) => {
  const { form } = props;
  const { resetFields } = form;
  const [isVisible, setIsVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getSpecificRecord, setSpecificRecord] = useState('');
  const [uploadData, setUploadData] = useState('');
  const [filePath, setFilePath] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [radioValue, setRadioValue] = useState(VERSION_PLATFORM.ANDROID);
  const initialFilter = {
    // page: 1,
    // limit: 10,
    fields: [],
    find: {},
    sortBy: { createdAt: 'DESC' },
  };
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    if (uploadData) {
      uploadData &&
        uploadData.length &&
        uploadData.map((data) => {
          return setFilePath(data.path);
        });
    }
  }, [uploadData]);

  const hadleRadioValue = (e) => {
    if (e.target.checked) {
      setRadioValue(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    if (radioValue) {
      fetch();
    }
  }, [radioValue]);

  const fetch = () => {
    setLoading(true);
    axios({
      ...versionPaginate,
      data: { query: { ...filter } },
    })
      .then((response) => {
        if (response.data?.code == 'OK') {
          if (radioValue == VERSION_PLATFORM.ANDROID) {
            setData(response.data.data.list.android);
            setTotal(response.data.data.list.android.length);
            setLoading(false);
          } else if (radioValue == VERSION_PLATFORM.WINDOWS) {
            setData(response.data.data.list.windows);
            setTotal(response.data.data.list.windows.length);
            setLoading(false);
          } else if (radioValue == VERSION_PLATFORM.IPHONE) {
            setData(response.data.data.list.iphone);
            setTotal(response.data.data.list.iphone.length);
            setLoading(false);
          } else if (radioValue == VERSION_PLATFORM.HOME_BACKUP) {
            setData(response.data.data.list.homeBackup);
            setTotal(response.data.data.list.homeBackup.length);
            setLoading(false);
          } else if (radioValue == VERSION_PLATFORM.PRINT_EXE) {
            setData(response.data.data.list.printExe);
            setTotal(response.data.data.list.printExe.length);
            setLoading(false);
          } else {
            setData(response.data.data.list);
            setTotal(response.data.data.count);
            setLoading(false);
          }
          // setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
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
    fetch(tempData);
  };
  const handleHardUpdate = (record) => {
    let tempData = data.map((rec) => {
      if (rec._id === record._id) {
        return { ...rec, isHardUpdate: !rec.isHardUpdate };
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
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name.',
      dataIndex: 'name',
      render: (text, record) => <>{text ? text : ''}</>,
    },
    {
      title: 'Version',
      dataIndex: 'number',
      render: (text) => <span>{text ? text : ''}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>
          {text ? displayDateTime(text) : ' '}
        </span>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      render: (text, record) => (
        <span style={{ textTransform: 'capitalize' }}>
          <ActiveDeactive
            status={record.isActive}
            documentId={record._id}
            API={versionActiveDeActive}
            record={record}
            fieldName={record.isActive}
            onActiveDeactive={(record) => {
              handleActiveDeactive(record);
            }}
            extraRequest={{
              platform: radioValue,
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
      title: 'Update',
      dataIndex: 'isHardUpdate',
      render: (text, record) => (
        <span style={{ textTransform: 'capitalize' }}>
          <HardUpdate
            documentId={record._id}
            API={versionHardUpdate}
            record={record}
            isHardUpdate={record.isHardUpdate}
            onHardUpdate={(record) => {
              handleHardUpdate(record);
            }}
          />
        </span>
      ),
    },
    {
      title: 'Action',
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className='actions'>
            <a
              onClick={() => {
                handleEditModal(record);
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
  ];

  const handleUpsertModal = () => {
    resetFields();
    setIsVisible(true);
  };

  const handleCloseUpsertModal = () => {
    setIsVisible(false);
  };

  const handleEditModal = (data) => {
    setSpecificRecord(data);
    setEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditModal(false);
  };

  const handleDeletePopupOpen = (data) => {
    setSpecificRecord(data);
    setDeletePopup(true);
  };

  const handleDeletePopupClose = () => {
    setDeletePopup(false);
  };

  const handleSubmit = (values) => {
    if (getSpecificRecord._id) {
      let { method, url, baseURL } = versionUpdate;
      url = `${url}/${getSpecificRecord._id}`;
      axios({ method, url, baseURL, data: values })
        .then((response) => {
          if (response.data.code == 'OK') {
            setEditModal(false);
            Toast.success(response.data.message);
            fetch();
          }
        })
        .catch((error) => {
          setIsVisible(false);
          Toast.error(error);
        });
    } else {
      let { method, url, baseURL } = versionUpsert;
      axios({ method, url, baseURL, data: values })
        .then((response) => {
          if (response.data.code == 'OK') {
            setIsVisible(false);
            Toast.success(response.data.message);
            fetch();
          }
        })
        .catch((error) => {
          setIsVisible(false);
          Toast.error(error);
        });
    }
  };

  const handleDeleteRecord = (id) => {
    let { url, method, baseURL } = versionDelete;
    url = `${url}/${id}`;
    axios({ url, method, baseURL })
      .then((data) => {
        if (data.data.code == 'OK') {
          setDeletePopup(false);
          fetch();
          Toast.success(data.data.message);
        } else {
          Toast.error(data.data.message);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  return (
    <>
      <div className='pmr_wrap'>
        <div className='container'>
          <Header
            total={total}
            radioValue={radioValue}
            hadleRadioValue={hadleRadioValue}
            onAdd={handleUpsertModal}
          />
          <Table
            columns={getColumns()}
            datasource={data}
            loading={loading}
            pagination={false}
          />
        </div>
      </div>
      {isVisible ? (
        <VersionUpsertForm
          uploaderOpen={() => {
            setVisible(true);
          }}
          // value={getSpecificRecord}
          filePath={filePath}
          radioValue={radioValue}
          hadleRadioValue={hadleRadioValue}
          form={form}
          isVisible={isVisible}
          okText='Add'
          cancelText='Cancel'
          title='Add version'
          onOk={handleSubmit}
          onClose={handleCloseUpsertModal}
          onCancel={handleCloseUpsertModal}
        />
      ) : null}

      {editModal && (
        <VersionUpsertForm
          radioValue={radioValue}
          hadleRadioValue={hadleRadioValue}
          form={form}
          isVisible={editModal}
          onCancel={handleEditModalClose}
          onClose={handleEditModalClose}
          value={getSpecificRecord}
          filePath={filePath}
          onOk={handleSubmit}
          okText='Update'
          cancelText='Cancel'
          title='Edit Version'
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
          onClose={handleDeletePopupClose}
          onCancel={handleDeletePopupClose}
        />
      )}

      {visible && (
        <Uploader
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
          }}
          title='Upload EXE file'
          multiple={false}
          uploadUrl={{ ...fileUpload }}
          allowedTypes={[FILE_TYPES.EXE]}
          extraData={{
            isUploadToS3: true,
            category: [FILE_CATEGORY.EXE].join(','),
          }}
          maxSizeInMB={1000}
          onError={(err) => {
            setVisible(true);
          }}
          onSuccess={(uploaded) => {
            if (uploaded.code == 'OK') {
              setUploadData(uploaded.data);
              setVisible(false);
            }
          }}
        />
      )}
    </>
  );
};

export default createForm()(Version);
