import React from 'react'
import { Button, Search, Select, Option, DateTimePicker } from '../../../../components/common'
import DoctorFilter from '../../../../components/DoctorFilter'
import { dateFormat, currentDate } from '../../../../util/moment';

function Header(props) {
    const { onDoctorChange, onSearch } = props
    return (
        <div className="form_wrap form_group">
            <div className="components pl-0">
                <div className="ui input">
                    <DateTimePicker
                        timePicker={false}
                        displayFormat={dateFormat}
                        placeholder="Select Date"
                        iconClassName="calendar icon"
                    // value={currentDate(dateFormat)}
                    />
                </div>
            </div>
            <div className="components">
                <DoctorFilter placeholder=" Select Physician" onChange={onDoctorChange} />
            </div>

            <div className="">
                <Search placeholder="Search by PMR Resident"
                    onChange={(e) => console.log(e)} />
            </div>

        </div>


    )
}
export default Header