import React from 'react';
import { Option } from 'rc-select'
import 'rc-tooltip/assets/bootstrap.css';
import { ErrorMsg } from '../../../../components/common/index'
import AutoComplete from '../../../../components/common/AutoComplete'
import '../../../../../node_modules/rc-datepicker/lib/style.css'
import DoctorFilter from '../../../../components/DoctorFilter'
import Modal from '../../../../components/common/Popup/index'
import { X_RAY_FORM_TYPE } from '../../../../constants/xray';
import { isDrOrNp } from '../../../../util/common'
import { USER_TYPE } from '../../../../constants/User';
const ImagingType = {
    "Mobile X-Ray": X_RAY_FORM_TYPE.X_RAY,
    "Mobile Ultrasound": X_RAY_FORM_TYPE.MOBILE_ULTRASOUND
}

function AddImagingDiagnostic(props) {
    const { onResidentChange, onResidentSearch, residentListing, isVisible, selectedType,
        onDoctorChange, authUser, title, onCancel, onSubmit, form, onTypeChange } = props
    let errors
    const { getFieldDecorator, getFieldError } = form
    let x = residentListing.length > 0 ?
        residentListing.map(resident => {
            return <Option value={resident.id} >
                <span style={{ display: 'inline !important' }}> <p>{resident.name}
                    {resident.patientInfoId && resident.patientInfoId.hc ? `  (${resident.patientInfoId.hc})` : null}
                    {resident.patientInfoId && resident.patientInfoId.homeAreaId
                        && resident.patientInfoId.homeAreaId.name ? `  (${resident.patientInfoId.homeAreaId.name})` : null}</p>
                </span>
            </Option>
        }) : null

    return (<Modal
        visible={isVisible}
        width={800}
        title="Add X-Ray - U/S Request"
        onCancel={onCancel}
        onClose={onCancel}
        footer={true}
        onOk={onSubmit}
        closable={false}
        okText="continue" >
        <div className="form_row add-imaging">
            <div className="form_group col-12 required">
                <label>Type<span>*</span></label>
                <div className="filter_section">
                    <div className="filter_value">
                        {
                            Object.keys(ImagingType).map((k, i) => <label key={`${k}${i}`} for={k} className="filter_switch" onClick={() => onTypeChange(ImagingType[k])}>
                                <input type="radio" name="xtype"
                                    id={ImagingType[k]}
                                    checked={selectedType === ImagingType[k] ? true : false} />
                                <span>{k}</span>
                            </label>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="form_row add-imaging">
            <div className="form_group col-6 required">
                <label>Resident<span>*</span></label>
                {
                    getFieldDecorator('residentId', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Search and Select Resident'
                            }
                        ],
                    })(<AutoComplete
                        showSearch
                        allowClear={true}
                        showArrow={false}
                        filterOption={false}
                        placeholder="Search Resident"
                        onSearch={onResidentSearch}
                        notFoundContent={null}
                    >
                        {
                            residentListing.length > 0 ?
                                residentListing.map(resident => {
                                    return <Option value={resident._id} >
                                        <span style={{ display: 'inline !important' }}> <p>{resident.firstName} , {resident.lastName}
                                            {"  "}
                                            {resident && resident.hc ? `(${resident.hc})` : ''}{"  "}
                                            {resident && resident.homeAreaId && resident.homeAreaId.name ? `(${resident.homeAreaId.name})` : ''}</p>
                                        </span>
                                    </Option>
                                }) : null
                        }
                    </AutoComplete>)
                }
                {(errors = getFieldError('residentId')) ? <ErrorMsg errors={errors} /> : null}
            </div>
            {
                authUser?.type !== USER_TYPE.HOME.PHYSICIAN &&
                <div className="form_group col-6 required">
                    <label>Physician/Nurse Practitioner<span>*</span></label>
                    {
                        getFieldDecorator('doctorId', {
                            rules: [{
                                required: isDrOrNp(authUser) ? false : true,
                                message: 'Select Physician/Nurse Practitioner'
                            }],
                        })(<DoctorFilter
                            allowClear={false}
                            // size={300}
                            placeholder="Select Physician/Nurse Practitioner"
                            authUser={authUser}
                            onDoctorChange={onDoctorChange}
                        />
                        )
                    }
                    {(errors = getFieldError('doctorId')) ? <ErrorMsg errors={errors} /> : null}
        </div>
            }
        </div>
    </Modal >)
}
export default AddImagingDiagnostic;