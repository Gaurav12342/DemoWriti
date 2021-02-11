import React, { Component } from 'react';
import { Modal, Select, Form, Button } from 'antd'
import DoctorFilter from '../../../../components/Filter/DoctorFilter'
import { displayCatchErrorMsg, isDrOrNp } from '../../../../services/util'
import { searchResident } from '../../../../services/ApiRoutes'
import axios from "util/Api";
const Option = Select.Option
let residentTimeout
class AddRequisitionModal extends Component {

    state = {
        residentListing: []
    }
    fetchResident = (filter) => {
        if (residentTimeout) {
            clearTimeout(residentTimeout)
            residentTimeout = null
        }
        residentTimeout = setTimeout(() => {
            let { method, url } = searchResident
            axios({ method, url, data: { ...filter } }).then(({ data }) => {
                if (data.code === 'OK') {
                    this.setState({
                        residentListing: data.data.list
                    })
                }
                else {
                    displayCatchErrorMsg(data.message)
                }
            }).catch(err => {
                displayCatchErrorMsg(err)
            })
        }, 300)
    }
    onResidentSearch = name => {
        if (name) {
            let filter = {
                page: 1,
                limit: 30,
                filter: {},
                sort: 'name ASC',
                select: ["name"],
                search: {
                    keys: ['name'],
                    keyword: name
                }
            }
            this.fetchResident(filter)
        }
        else {
            this.props.form.setFieldsValue({
                "residentId": undefined
            })
        }
    }
    handleDoctorChange = (val) => {
        this.props.form.setFieldsValue({
            doctorId: val
        })
    }
    handleOk = () => {
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (err) {
                return
            }
            console.log('this.props', this.props)
            let tempdoctorId = isDrOrNp(this.props.authUser) ? this.props.authUser._id : values.doctorId
            let info = {
                doctorId: tempdoctorId,
                residentId: values.residentId
            }
            this.props.onCancel(true, info)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isVisible, onCancel, authUser } = this.props
        return (
            <Modal maskClosable={false}
                width={650}
                className=""
                visible={isVisible}
                onOk={this.handleOk}
                onCancel={onCancel}
                title="Add X-Ray - U/S Request"
                footer={[
                    <>
                        <Button type="primary" onClick={this.handleOk}>Continue </Button>
                    </>
                ]}
            >
                <div className="">
                    <Form layout="vertical">
                        <Form.Item>
                            {/* <Form.Item label="Resident"
                                style={{ width: '100%', display: 'inline-block' }}>
                                <Select defaultValue="1">
                                    <Option value="1">New York No. 1 Lake Park (135)	</Option>
                                    <Option value="2">New York No. 1 Lake Park	(131)</Option>
                                    <Option value="3">New York No. 1 Lake Park	(130)</Option>
                                </Select>
                            </Form.Item>  */}
                            <Form.Item label="Resident"
                                style={{ width: '100%', display: 'inline-block' }}>
                                {getFieldDecorator('residentId', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please Search and Select Resident'
                                        }
                                    ],
                                })(
                                    <Select
                                        showSearch
                                        allowClear={true}
                                        showArrow={false}
                                        filterOption={false}
                                        placeholder="Search Resident"
                                        onSearch={this.onResidentSearch}
                                        onChange={this.onResidentChange}
                                        notFoundContent={null} >
                                        {
                                            this.state.residentListing.length > 0 ?
                                                this.state.residentListing.map(resident => {
                                                    return <Option value={resident.id} >
                                                        <span style={{ display: 'inline !important' }}> <p>{resident.name}
                                                            {resident.patientInfoId && resident.patientInfoId.hc ? `  (${resident.patientInfoId.hc})` : null}
                                                            {resident.patientInfoId && resident.patientInfoId.homeAreaId
                                                                && resident.patientInfoId.homeAreaId.name ? `  (${resident.patientInfoId.homeAreaId.name})` : null}</p>
                                                        </span>
                                                    </Option>
                                                }) : null
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            {
                                isDrOrNp(authUser) ? null : <Form.Item className="pmrOrder" label="Physician/Nurse Practitioner" >
                                    {getFieldDecorator('doctorId', {
                                        rules: [{
                                            required: isDrOrNp(authUser) ? false : true,
                                            message: 'Select Physician/Nurse Practitioner'
                                        }],
                                    })(
                                        <DoctorFilter
                                            allowClear={false}
                                            size={600}
                                            placeholder="Select Physician/Nurse Practitioner"
                                            loginUser={authUser}
                                            onDoctorChange={handlePhysicianChange}
                                        />
                                    )}
                                </Form.Item>
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }
}

const wrappedAddRequisitionModal = Form.create()(AddRequisitionModal)
export default wrappedAddRequisitionModal;