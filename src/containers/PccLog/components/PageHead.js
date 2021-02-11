import React, { useState, useEffect } from 'react';
import {
  Button, DateRangePicker,
} from '../../../components/common/index';
import { dateTimeFormat, dateTimeFormat_AM_PM } from '../../../util/moment';

const PageHead = (props) => {
  const { total, onSync, syncLoader, onOpenModal, onDateChange, defaultDate } = props;
  const [isVisible, setIsVisible] = useState(false);


  return (
    <>
      <div className='page_head'>
        <h3 style={{ fontSize: '25px', alignItems: 'center', width: '30%' }}>
          {' '}
          PointClickCare-Logs{' '}
          <span
            className='r_no'
            style={{ marginTop: '1%', marginLeft: '2%', fontSize: '55%' }}
          >
            {total}
          </span>
        </h3>
        {/* <div className="form_wrap">
          
        </div> */}
        {/* <DateRangePicker
          placeholder="Select Date"
          iconClassName="calendar icon"
          value={defaultDate}
          format={dateTimeFormat}
          timePicker={true}
          onChange={onDateChange} /> */}
        <div className='form_wrap'>
          <div className="form_group" style={{ marginBottom: 0 }}>
            <DateRangePicker
              placeholder="Select Date"
              iconClassName="calendar icon"
              value={defaultDate}
              timePicker={true}
              format={dateTimeFormat}
              onChange={onDateChange}
              allowClear={true}
            // clearClassName={'clearDateRangeIcon'}
            />
          </div>
          <div className='components'>
            <Button type='primary' size='lg' onClick={onOpenModal} loading={syncLoader}>
              Filter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default (PageHead);
