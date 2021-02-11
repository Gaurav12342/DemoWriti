import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Popup/index';
import Table from '../../../components/common/Table/index';
import { Button } from '../../../components/common/index';
import MoveResident from './MoveResident';
import { getPmrGroupResidentList } from '../../../services/api/routes/pmr';
import { canPerformAction, getUserNameWithDesignation } from '../../../util/common';
import { MODULE, SUB_MODULE, ACTIONS } from '../../../constants/subscription';
import axios from '../../../services/api/config';

const AssignHomeModal = (porps) => {
  const { visible, onClose, title, selectedPmrGroupId } = porps;
  const [moveResidentVisible, setMoveResidentVisible] = useState(false);

  const [assignResidentData, setAssignResidentData] = useState([]);
  const [total, setTotal] = useState(0);
  const [residentLoader, setResidentLoader] = useState(false);
  const [residentToMove, setResidentToMove] = useState(null);
  const moveRef = React.useRef(false)

  const handleVisibleResidentModal = (record) => {
    setResidentToMove(record);
    setMoveResidentVisible(true);
  };
  const handleDisableResidentModal = (str) => {
    if (str === 'ok')
      moveRef.current = true;
    setMoveResidentVisible(false);
  };

  useEffect(() => {
    if (selectedPmrGroupId) {
      fetchAssignedResident();
    }
  }, [selectedPmrGroupId]);

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const fetchAssignedResident = () => {
    setResidentLoader(true);
    let { method, url, baseURL } = getPmrGroupResidentList;
    axios({
      method,
      url,
      baseURL,
      data: { pmrGroupId: selectedPmrGroupId, sortBy: { firstName: 'DESC' } },
    })
      .then((response) => {
        if (response.data.code === 'OK') {
          let updatedList = modifiedList(response.data.data.list);
          setAssignResidentData(updatedList);
          setTotal(response.data.data.count);
          setResidentLoader(false);
        } else {
          setResidentLoader(false);
        }
      })
      .catch((err) => {
        setResidentLoader(false);
      });
  };

  const getColumns = () => [
    {
      title: 'Sr.No',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
    },
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
    {
      title: 'Action',
      render: (text, record) => (
        <>
          <div className='actions'>
            {/* {
              canPerformAction({
                moduleId: MODULE.PMR,
                subModuleId: SUB_MODULE.PMR_GROUP,
                actiontoCheck: ACTIONS.MOVE.CODE
              }) ? */}
            <a>
              <Button
                onClick={() => {
                  handleVisibleResidentModal(record);
                }}
                size='sm'
              >
                Move
              </Button>
            </a>
            {/* : null} */}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        title={title}
        footer=''
        onCancel={() => onClose(moveRef.current)}
        onClose={() => onClose(moveRef.current)}
        maskClosable={false}
        style={{ width: '50%' }}
      >
        <Table
          columns={getColumns()}
          datasource={assignResidentData}
          loading={residentLoader}
          pagination={false}
        />
      </Modal>
      {moveResidentVisible && (
        <MoveResident
          title='Move Resident'
          okText='Move'
          total={total}
          onVisibleModal={handleVisibleResidentModal}
          onCloseModal={handleDisableResidentModal}
          onCloseAssignResidentModal={() => onClose(moveRef.current)}
          moveResidentVisible={moveResidentVisible}
          selectedPmrGroupId={selectedPmrGroupId}
          residents={residentToMove}
          residentId={residentToMove?._id}
        />
      )}
    </>
  );
};

export default AssignHomeModal;
