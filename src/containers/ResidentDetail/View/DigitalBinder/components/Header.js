import React, { useState } from 'react';
import {
  Search,
  Select,
  Option,
  DateTimePicker,
  DateRangePicker
} from '../../../../../components/common/index';
import DoctorFilter from '../../../../../components/DoctorFilter'
import moment from 'moment'
const todayDate = moment();
const initialDateRange = [todayDate, todayDate]

const Header = (props) => {
  const { form, onSearching, onDateChange } = props;
  const { getFieldDecorator, validateFields, getFieldError } = form;
  const [searchVal, setSearchVal] = React.useState('');
  const [dateRangeValue, setDateRangeValue] = useState(initialDateRange)
  // console.log('dateRangeValue', dateRangeValue);
  React.useEffect(() => {
    onSearching(searchVal)
    onSearching(searchVal)
    // onDateChange(searchVal)
  }, [searchVal])


  const handleDateChange = (e) => {
    setDateRangeValue([...e])
    if (e && e.length > 0) {
      e[0] = moment(e[0]).startOf('day')
        .toISOString()

      e[1] = moment(e[1]).endOf('day')
        .toISOString()
    } else {
      e = []
    }
    onDateChange(e)
  }

  return (
    <>
      <div className="form_wrap form_group">
        <div className="components pl-0">
          <div className="ui input">
            <DateRangePicker
              placeholder="Select Date"
              iconClassName="calendar icon"
              value={dateRangeValue}
              allowClear={true}
              onChange={handleDateChange}
              onClear={() => setDateRangeValue([])}
              // clearClassName={'clearDateRangeIcon'}
            />
          </div>
        </div>
        <div className="">
          <DoctorFilter placeholder=" Select Physician"
            onChange={(value) => { setSearchVal(value) }}
            allowClear
          />
        </div>

        <div className="">
          <Search placeholder="Search by Order Number"
            onChange={e => setSearchVal(e.target.value)}
            allowClear
          />
        </div>

      </div>

      {/* <div className='page_head'>
        <div style={{ display: 'flex' }}>
          <div className='form_group' style={{ marginRight: '1%' }}>
            <DateRangePicker
              placeholder="Select Date"
              iconClassName="calendar icon"
              // value={dateRangeValue}
              // onChange={handleDateChange}
              // onClear={() => setDateRangeValue([])}
              // clearClassName={'clearDateRangeIcon'}
            />
            <DoctorFilter allowClear placeholder=" Select Physician" 
            // onChange={onDoctorChange} 
/>
            <Search
              value={searchVal}
              allowClear={true}
              onChange={e => setSearchVal(e.target.value)}
              placeholder='Search by Order Number'
              style={{ width: '250px' }}
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Header;
