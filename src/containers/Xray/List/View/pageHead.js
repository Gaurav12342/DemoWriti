import React, { Component } from 'react';
import '../../../../../node_modules/rc-datepicker/lib/style.css'
import Select, { Option } from '../../../../components/common/AutoComplete'
import Search from '../../../../components/common/Search'
import { dateFormat } from '../../../../util/moment'
import { DateRangePicker, Button } from '../../../../components/common/index'
import DoctorFilter from '../../../../components/DoctorFilter'
import AddXrayPopup from './AddImagingDiagn';
import { USER_TYPE } from '../../../../constants/User';

const moment = require('moment')

function Xrayhead(props) {
    const { onShowRequisitionModal, total, onResidentChange, imagingDiagnosticList, handleImagingFilter,
        onCancel, onDoctorChange, residentListing, isVisible, onRangePickerChange, authUser, filter, onSearch,
        form, onTypeChange, selectedType, onResidentSearch, onSubmit, dateRange } = props

    return (<>
        <div className="page_head">
            <h3>X-Ray - U/S Request List <span className="r_no">{total}</span></h3>
            <div className="form_wrap">
                <div className="form_group xray-page-head">
                    <DateRangePicker
                        placeholder="Start Date ~ End Date"
                        onChange={onRangePickerChange}
                        timePicker={false}
                        value={dateRange || []}
                        format={dateFormat}
                        showClear={true}
                    />
                </div>
                {/* <div className="form_group xray-page-head">
                    <Select
                        placeholder="Imaging and Diagnostic Filter"
                        allowClear={true}
                        style={{ width: '250px' }}
                        onChange={handleImagingFilter}>
                        {
                            imagingDiagnosticList.map(opt => {
                                return <Option value={opt._id} key={opt._id}>{opt.name}</Option>
                            })
                        }
                    </Select>
                </div> */}

                <div className="form_group xray-page-head">
                    <DoctorFilter
                        size={"200px"}
                        placeholder="Search by Physician"
                        authUser={authUser}
                        value={filter ? filter?.doctorId : undefined}
                        onDoctorChange={(val) => onDoctorChange(val, true)}
                    />
                </div>

                <div className="form_group xray-page-head">
                    <Search
                        style={{ width: "230px" }}
                        allowClear={true}
                        onSearch={onSearch}
                        placeholder="Search by Resident,Requisition No."
                    />
                </div>
                <div className="form_group xray-page-head">
                    <Button type="primary" size='lg' onClick={onShowRequisitionModal}>Add New</Button>
                </div>
            </div>
        </div>
        {
            isVisible ? <AddXrayPopup
                form={form}
                onResidentChange={onResidentChange}
                residentListing={residentListing}
                isVisible={isVisible}
                onCancel={onCancel}
                authUser={authUser}
                onDoctorChange={onDoctorChange}
                onTypeChange={onTypeChange}
                selectedType={selectedType}
                onSubmit={onSubmit}
                onResidentSearch={onResidentSearch}
            /> : null
        }
    </>)
}
export default Xrayhead;