import React, { useState } from 'react'
import { Button, Search, Select, Option, DateRangePicker } from '../../../../components/common'
import DoctorFilter from '../../../../components/DoctorFilter'
import { dateFormat, currentDate } from '../../../../util/moment';
import moment from 'moment'
const todayDate = moment();
const initialDateRange = [todayDate, todayDate]
function Header(props) {
    const { onDoctorChange, onSearch, onDateChange, filter, onSearchRx } = props
    const [dateRangeValue, setDateRangeValue] = useState(initialDateRange)

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
        <div className="form_wrap form_group">
            <div className="components pl-0">
                <div className="ui input">
                    <DateRangePicker
                        placeholder="Select Date"
                        iconClassName="calendar icon"
                        value={dateRangeValue}
                        onChange={handleDateChange}
                        onClear={() => setDateRangeValue([])}
                        allowClear={true}
                    // clearClassName={'clearDateRangeIcon'}
                    />
                </div>
            </div>
            <div className="components">
                <DoctorFilter allowClear placeholder=" Select Physician" onChange={onDoctorChange} />
            </div>

            <div className="">
                <Search placeholder="Search by Rx Number"
                    onChange={onSearchRx} />
            </div>

        </div>


    )
}
export default Header