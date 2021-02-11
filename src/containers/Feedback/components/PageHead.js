import React, { useState, useEffect } from 'react';
import { Button, DateRangePicker } from '../../../components/common/index';
import { dateTimeFormat, dateTimeFormat_AM_PM } from '../../../util/moment';
import { canPerformAction } from '../../../util/common';

const PageHead = (props) => {
  const {
    total,
    onSync,
    syncLoader,
    onUpsertButtonClick,
    onDateChange,
    defaultDate,
    onAddParams,
  } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className='page_head'>
        <h3 style={{ fontSize: '25px', alignItems: 'center', width: '30%' }}>
          {' '}
          Feedback{' '}
          <span
            className='r_no'
            style={{ marginTop: '1%', marginLeft: '2%', fontSize: '55%' }}
          >
            {total}
          </span>
        </h3>

        <div className='form_wrap'>
          <div
            className='form_group'
            style={{ marginBottom: 0, marginRight: 20 }}
          >
            <DateRangePicker
              placeholder='Select Date'
              iconClassName='calendar icon'
              value={defaultDate}
              timePicker={true}
              format={dateTimeFormat}
              onChange={onDateChange}
              showSecond={false}
            />
          </div>
          {canPerformAction(onAddParams) ? (
            <Button
              type='primary'
              size='lg'
              onClick={onUpsertButtonClick}
              loading={syncLoader}
            >
              Add
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PageHead;
