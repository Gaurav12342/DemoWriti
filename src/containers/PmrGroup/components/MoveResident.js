import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Popup/index';
import Table from '../../../components/common/Table/index';
import { Select, Option } from '../../../components/common/index';
import {
  pmrGroupPaginate,
  getPmrGroupResidentList,
  moveResident,
} from '../../../services/api/routes/pmr';
import axios from '../../../services/api/config';
import { Toast } from '../../../components/common';
import { getUserNameWithDesignation } from '../../../util/common';

const _ = require('lodash');

const MoveResident = (props) => {
  const {
    onCloseModal,
    moveResidentVisible,
    title,
    okText,
    selectedPmrGroupId,
    residentId,
    onCloseAssignResidentModal,
  } = props;

  const [pmrGroups, setPmrGroups] = useState([]);
  const [residentLoader, setResidentLoader] = useState(false);
  const [pmrGroupLoader, setpmrGroupLoader] = useState(false);
  const [residentData, setResidentData] = useState([]);
  const [moveResidentloader, setMoveResidentLoader] = useState(false);

  const [residentTotal, setResidentTotal] = useState(0);
  const [dropDownValue, setDropDownValue] = useState('');

  useEffect(() => {
    if (selectedPmrGroupId) {
      fetchPMRGroup();
    }
  }, [selectedPmrGroupId]);

  const fetchPMRGroup = () => {
    setpmrGroupLoader(true);
    axios({
      ...pmrGroupPaginate,
      data: {
        query: { ne: [{ _id: selectedPmrGroupId }], find: { isActive: true } },
      },
    })
      .then((response) => {
        if (response.data?.code === 'OK') {
          setPmrGroups(response.data.data?.list);
          setpmrGroupLoader(false);
        } else {
          setpmrGroupLoader(false);
        }
      })
      .catch((err) => {
        setpmrGroupLoader(false);
      });
  };

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const handleChangePmrGorup = (value) => {
    setResidentLoader(true);
    setDropDownValue(value);
    let { method, url, baseURL } = getPmrGroupResidentList;
    axios({
      method,
      url,
      baseURL,
      data: { pmrGroupId: value, sortBy: { firstName: 'DESC' } },
    })
      .then((response) => {
        if (response.data?.code === 'OK') {
          let updatedList = modifiedList(response.data.data.list);
          setResidentData(updatedList);
          setResidentTotal(response.data.data.count);
          setResidentLoader(false);
        } else {
          setResidentLoader(false);
        }
      })
      .catch((err) => {
        setResidentLoader(false);
      });
  };

  const handleMove = () => {
    setMoveResidentLoader(true);
    let { method, url, baseURL } = moveResident;
    let obj = {
      fromPmrId: selectedPmrGroupId,
      toPmrId: dropDownValue,
      residentId: residentId,
    };
    axios({ method, url, baseURL, data: obj })
      .then((response) => {
        if (response.data?.code === 'OK') {
          setMoveResidentLoader(false);
          onCloseModal('ok');
          onCloseAssignResidentModal();
          Toast.success(response.data.message);
        }
      })
      .catch((error) => {
        setMoveResidentLoader(false);
        Toast.error(error);
      });
  };

  const getColumns = () => [
    {
      title: 'Resident',
      dataIndex: 'mergeLFName',
      render: (text, record) => <>{text ? text : '-'}</>,
    },
    {
      title: 'Room No',
      dataIndex: 'room',
      render: (text) => <span>{text ? text : '-'}</span>,
    },
    // {
    //   title: 'Home',
    //   dataIndex: 'home',
    //   render: (text) => (
    //     <span style={{ textTransform: 'capitalize' }}>{text ? text : '-'}</span>
    //   ),
    // },
    {
      title: 'Home Area',
      dataIndex: 'homeAreaId',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>
          {text?.name ? text.name : '-'}
        </span>
      ),
    },
    {
      title: 'Physician',
      dataIndex: 'physicianId',
      render: (text, record) => (
        <span style={{ textTransform: 'capitalize' }}>
          {text ? getUserNameWithDesignation(record.physicianId) : '-'}
        </span>
      ),
    },
    {
      title: 'HC#',
      dataIndex: 'hc',
      render: (text) => (
        <span style={{ textTransform: 'capitalize' }}>{text ? text : '-'}</span>
      ),
    },
  ];
  return (
    <>
      <Modal
        visible={moveResidentVisible}
        title={title}
        onOk={handleMove}
        okText={okText}
        onCancel={onCloseModal}
        onClose={onCloseModal}
        maskClosable={false}
        style={{ width: '70%' }}
        okButtonProps={{ loading: moveResidentloader }}
      >
        <div>
          <div className='form_row' style={{ marginTop: '2%' }}>
            <div className='form_group col-12'>
              <Select
                loading={pmrGroupLoader}
                placeholder='Select PMR Group'
                showSearch
                onChange={(event) => {
                  handleChangePmrGorup(event);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {_.map(pmrGroups, (data) => {
                  return (
                    <>
                      <Option value={data._id} key={data._id}>
                        {data.groupName}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className='page_head'>
            <h3
              style={{ fontSize: '18px', alignItems: 'center', width: '30%' }}
            >
              Resident
              <span
                className='r_no'
                style={{ marginTop: '1%', marginLeft: '2%', fontSize: '55%' }}
              >
                {residentTotal}
              </span>
            </h3>
          </div>
          <Table
            columns={getColumns()}
            datasource={residentData}
            loading={residentLoader}
            pagination={false}
          />
        </div>
      </Modal>
    </>
  );
};
export default MoveResident;
