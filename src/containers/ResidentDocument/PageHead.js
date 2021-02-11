import React from 'react'
import { Button, Search, DateRangePicker } from '../../components/common/index'
import { dateFormat, dateTimeFormat } from '../../util/moment'
import { canPerformAction } from '../../../src/util/common';
const moment = require('moment')
let todayDate = moment()
let nextDate = moment().add(1, 'day')
function Header(props) {

    const { total, onSearch, onAdd, onDateChange, filter, checkAddAction } = props

    let filter1 = filter && filter.dateRange ? [filter.dateRange[0], filter.dateRange[1]] : []

    return (<div className="page_head">
        <h3>
            {" "}Resident Document <span className="r_no">{total}</span>
        </h3>
        <div className="form_wrap">
            <div className="form_group">
                <DateRangePicker
                    placeholder="Select Date"
                    iconClassName="calendar icon"
                    value={filter1}
                    onChange={onDateChange}
                />

            </div>
            <div className="form_group">
                <Search placeholder="Search by Doc No"
                    allowClear={true}
                    onChange={onSearch}
                    value={filter?.search?.keyword}
                    className="inputForm"
                />
            </div>
            {checkAddAction ?
                <div className="form_group">
                    <Button type="primary" size='lg' onClick={() => onAdd(true)}>
                        Add Resident Document
                </Button>
                </div>
                : null}
        </div>
    </div>)
}
export default Header