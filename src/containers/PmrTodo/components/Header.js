import React, { useMemo, useEffect, useState } from 'react';
import { displayDOB, displayTime } from '../../../util/moment';
import { Button, Select, Option } from '../../../components/common';
import { displayDate } from '../../../util/moment';
import Modal from '../../../components/common/Popup';
import PDFViewer from 'pdf-viewer-reactjs';
import { MODULE, ACTIONS } from '../../../constants/subscription';
import {
  canPerformAction,
  isModuleAccessible,
} from '../../../util/common';

const Header = (props) => {
  const {
    detail,
    onPerformTodo,
    pmrRange,
    attachmentArr,
    visible,
    prevPMR,
    prevPmrVal,
    onPrevPMRChange,
    isEditMode
  } = props;
  const { pmrId, patientId } = detail;
  const [pmrHistioryVisble, setPmrHistoryVisible] = useState(false);
  const [curPmr, setCurPmr] = useState(prevPMR);
  const [prevLoading, setPrevLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [prevPmrValData, setPrevPmrValData] = useState(prevPmrVal);
  const [curIndex, setCurIndex] = useState(0);
  //   const [attachment, setAttachment] = useState(null);
  //   const [visibleView, setVisibleViwer] = useState(visible);

  const canPerformTodo = useMemo(() => {
    const performTodoParams = {
      moduleId: MODULE.TODO,
      actiontoCheck: isEditMode ? ACTIONS.UNDO.CODE : ACTIONS.YES_NA.CODE,
    };
    if (isModuleAccessible(MODULE.TODO) && canPerformAction(performTodoParams)) {
      return true
    }
  }, [isEditMode])

  const handleHistoryModal = (visible) => {
    setPmrHistoryVisible(visible);
    setPrevPmrValData(visible);
    onPrevPMRChange(visible);
  };

  const navigation = (val) => {
    const attachmentArr = [...attachmentArr];
    let curPmr = { ...curPmr };
    // let index = attachmentArr.findIndex(x => x.id === curPmr.id)
    let index = curPmr.index;
    if (val === 'prev') {
      setPrevLoading(true);
      if (index > 0) {
        index--;
        curPmr = attachmentArr[index];
      }
    } else {
      setNextLoading(true);
      if (index <= attachmentArr.length - 1) {
        index++;
        curPmr = attachmentArr[index];
      }
    }

    setCurIndex(index);
    setCurPmr(curPmr);
    setPrevLoading(false);
    setNextLoading(false);
  };

  return (
    <>
      <h2 className='main-title-bar'>
        {pmrId} {patientId?.mergeLFName} (Room No {patientId?.room}){' '}
        {displayDOB(patientId?.dob)}
      </h2>

      <div className='pmr-row'>
        <div className='access-view'>
          <form action=''>
            {/* <div className='form_wrap mr-10'>
              <Select
                name='frequency'
                mode='single'
                // value={
                //   pmrRange && pmrRange.length
                //     ? this.state.prevPmrVal
                //     : undefined
                // }
                onChange={() => {
                  handleHistoryModal(true);
                }}
                // onChange={(value) => dateFrequencyChanges(value, 'frequency')}
                placeholder='Select PMR Range'
              >
                {/* {pmrRange &&
                  pmrRange.map((x) => {
                    return (
                      <Option value={x.id}>
                        {displayDate(x.pmrScheduleDate.startDate) +
                          ' - ' +
                          displayDate(x.pmrScheduleDate.endDate)}
                      </Option>
                    );
                  })} */}
            {/* {detail &&
                  detail.pmrScheduleDate &&
                  detail.pmrScheduleDate.map((data) => {
                    return (
                      <Option>{`${displayDate(data.startDate)} - ${displayDate(
                        data.endDate
                      )}`}</Option>
                    );
                  })} */}
            {/* </Select>
            </div> */}
          </form>
          <div className=''>
            <img
              src={require('../../NursePrep/img/small-info.svg')}
              className='prev-c mr-5'
            />
            <p className='prev-c'>
              Previous PMR can be
              <span>accessible for view only.</span>
            </p>
          </div>
        </div>

        <h3>{`PMR Range - ${displayDate(detail.pmrScheduleDate.startDate)} - ${displayDate(
          detail.pmrScheduleDate.endDate
        )}`}</h3>
        {
          canPerformTodo ?
            <Button
              type='primary'
              className='btn Click-here'
              disabled={(isEditMode) ? false : !detail.isSave}
              onClick={onPerformTodo}
            >
              {isEditMode ? 'Edit' : 'Save'}
            </Button> : null
        }
      </div>

      {pmrHistioryVisble && (
        <Modal
          visible={pmrHistioryVisble}
          title={`Privious PMR History`}
          maskClosable={true}
          onCancel={() => {
            handleHistoryModal(false);
          }}
          style={{ width: '60%' }}
          footer={[
            <>
              <Button
                loading={prevLoading}
                // onClick={() => navigation('prev')}
                // disabled={curPmr.index <= 0}
                type='primary'
                onClick={() => {
                  handleHistoryModal(false);
                }}
                size='lg'
                style={{ 'margin-right': '65%' }}
              >
                {' '}
                Prev
              </Button>

              <Button
                loading={nextLoading}
                // onClick={() => navigation('next')}
                // disabled={curPmr.index === attachmentArr.length - 1}
                type='primary'
                size='lg'
                onClick={() => {
                  handleHistoryModal(false);
                }}
              >
                Next
              </Button>
            </>,
          ]}
        >
          {/* {curPmr.pmrId} */}
          {/* {(curPmr && (
            <PDFViewer
              document={{ url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf' }}
            />
          )) ||
            ''} */}
          <div className="pmr_history">
            <PDFViewer
              document={{ url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf' }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
