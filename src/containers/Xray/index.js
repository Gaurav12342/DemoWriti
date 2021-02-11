import React, { useState, useEffect } from 'react';
import PageHead from './List/View/pageHead'
import Table from '../../components/common/Table/index'
import { createForm } from 'rc-form';
import { View, Notes, MoreDots, Download, Print, Reminder } from '../../assets/images/pmr/index';
import { Edit, Cancel, VerbalOrder } from '../../assets/images/resident-detail/index'
import axios from '../../services/api/config';
import { connect } from "react-redux";
import { IMAGING_DIAGNOSTIC_STATUS, X_RAY_FORM_TYPE } from '../../constants/xray'
import { X_RAY_TODO_TYPES, TODO_CATEGORY } from '../../constants/todo'
import { requisitionRequest, xRayListing, getXrayPDF } from '../../services/api/routes/x_ray'
import { getResidents } from '../../services/api/routes/resident'
import { imagingDiagnosticsPaginate } from '../../services/api/routes/customer'
import NotesModal from '../../components/NotesPopup/List';
import ReminderModal from '../../components/ReminderPopup/List';
import routes from '../../routes/constant'
import UtilService, { selectedBodyParts, isDrOrNp, capitalizeStr, getUserNameWithDesignation } from '../../util/common'
import { displayDateTime, displayDate } from '../../util/moment'
import ConfirmPopup from '../../components/common/ConfirmPopup'
import DetailViewSTL from './List/DetailViewStl'
import { Toast, Button } from '../../components/common'
import Modal from '../../components/common/Popup/index'
import { STATUS } from '../../constants/resident';
const moment = require('moment')
const _ = require('lodash')
const status = {
    Submitted: 1
}
let residentTimeout
let statusFilters = []
Object.keys(IMAGING_DIAGNOSTIC_STATUS).map(k => {
    return statusFilters.push({ text: k, value: IMAGING_DIAGNOSTIC_STATUS[k] })
})
function Xraylist(props) {
    const { authUser, form } = props;
    const [loading, setLoading] = useState(false)
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false)
    const [homeAreaId, setHomeAreaId] = useState(undefined)
    const [isVisibleDetailView, setIsVisibleDetailView] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [residentListing, setResidentListing] = useState([])
    const [deleteRec, setDeleteRec] = useState(undefined)
    const [showCancelPopup, setShowCancelPopup] = useState(false)
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
        find: {}
    })
    const [data, setData] = useState([])
    const [dateRange, setDateRange] = useState([])
    const [notesFilterOptions, setNotesFilterOptions] = useState({})
    const [notesModal, setNotesModal] = useState(false)
    const [reminderFilterOptions, setReminderFilterOptions] = useState({})
    const [reminderModal, setReminderModal] = useState(false)
    const [total, setTotal] = useState(0)
    const [imagingDiagnosticList, setImagingDiagnosticList] = useState([])
    const [imagingDetail, setImagingDetail] = useState(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [editRec, setEditRec] = useState(undefined)
    const [imagingType, setImagingType] = useState(X_RAY_FORM_TYPE.X_RAY)
    const [downloadButton, setDownloadButton] = useState(false)
    const currentModalData = React.useRef({})

    const submit = () => {
        props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }

    useEffect(() => {
        fetch()
    }, [filter, filter.filter])

    useEffect(() => {
        fetchImagingDiagnosticList()
    }, [])

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
    }, [data])


    const fetchImagingDiagnosticList = () => {
        axios({ ...imagingDiagnosticsPaginate }).then(({ data }) => {
            if (data.code === 'OK') {
                setImagingDiagnosticList(data.data.data)
            }
        })

    }
    const modifiedList = list => {
        let modifiedList = list.map(current => {
            return selectedBodyParts(current)
        })
        return modifiedList
    }
    const fetch = () => {
        let dataReq = {
            query: {
                ...filter,
                find: { ...filter.filter },
                populate: [
                    { selectedBodyParts: [] },
                    { residentId: [] },
                    { homeAreaId: ['name'] },
                    { requestedBy: [] },
                    {
                        physicianId: [
                            "mergeLFName",
                            "type",
                            {
                                "assignedCustomer": [
                                    "isActive",
                                    "homeId",
                                    {
                                        "designationId": [
                                            "name",
                                            "code",
                                            "parentId"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
        setLoading(true)
        axios({ ...xRayListing, method: 'POST', data: dataReq }).then(({ data }) => {
            if (data.code === 'OK') {
                let updatedList = modifiedList(data.data.list)
                setData(updatedList)
                setTotal(data.data.count)
                setLoading(false)
            }
            else {
                setLoading(false)
            }
        }).catch(err => {
            setLoading(false)
        })
    }
    const handleTableChange = (pagination, tfilter, sorter) => {
        let tempFilter = filter
        tempFilter = {
            ...tempFilter,
            page: pagination.current,
            limit: pagination.pageSize
        }
        if (tfilter) {
            if (tfilter.status && tfilter.status.length) {
                if (!tempFilter.filter) {
                    tempFilter['filter'] = { status: {} }
                }
                tempFilter.filter.status = tfilter.status
            }
            else if (tempFilter?.filter?.status) {
                delete tempFilter.filter["status"]
            }
        }
        setFilter(tempFilter)
    }
    const showRequisitionModal = () => {
        setIsVisibleAddModal(true)
    }
    const closeRequisitionModal = (redirect, info) => {
        setIsVisibleAddModal(false)
        if (redirect && info && info.doctorId && info.residentId) {
            props.history.push({
                pathname: routes.xRayRequest.path,
                search: `?doctorId=${info.doctorId}&residentId=${info.residentId}&formType=${info.type}`
            })
        }
    }
    const handleUnitChange = (val) => {
        let tempFilter = filter.filter
        tempFilter.homeAreaId = val
        setFilter(tempFilter)
    }
    const handleSearch = val => {
        let tempFilter = _.cloneDeep(filter)
        if (val) {
            tempFilter.search = {
                keys: ['name', 'orderNumber'],
                keyword: val
            }
        }
        else if (tempFilter.hasOwnProperty('search')) {
            delete tempFilter["search"]
        }
        tempFilter.page = 1
        tempFilter.limit = 10
        setFilter(tempFilter)
    }
    const showDetailView = (status, data) => {
        if (data && Object.keys(data).length) {
            let title = ''
            title = `${data.residentId.mergeLFName}`
            title = data.residentInfoId.nhRoom ? `${title}(Room No:${data.residentInfoId.nhRoom})` : title
            data.title = title
            let requestNo = data.orderNumber + "(" + displayDate(data.createdAt) + ")"
            data.requestNo = requestNo
        }
        setImagingDetail(data)
        setIsVisibleDetailView(status)
    }
    const handleRangePickerChange = dateRange => {
        let tempQuery = { ...filter }
        if (dateRange.length > 0) {
            tempQuery = {
                ...tempQuery,
                between_eq: [{
                    createdAt: [
                        moment(dateRange[0]).startOf('day').toISOString(),
                        moment(dateRange[1]).endOf('day').toISOString()
                    ]
                }]
            }
            setDateRange(dateRange)
        }
        else {
            delete tempQuery['createdAt']
            setDateRange([])
        }
        setFilter({ ...filter, page: 1, ...tempQuery })
    }
    const handleImagingFilter = val => {
        let tempFilter = _.cloneDeep(filter)
        if (val) {
            tempFilter.page = 1
            tempFilter.filter = {
                ...tempFilter.filter,
                imagingAndDiagnosticId: val
            }
        }
        else if (tempFilter.filter.hasOwnProperty('imagingAndDiagnosticId')) {
            delete tempFilter.filter["imagingAndDiagnosticId"]
        }
        setFilter(tempFilter)
    }
    const handleConfirm = rec => {
        console.log("TCL: handleConfirm", rec)
        setShowConfirmModal(true)
        setEditRec(rec)
    }
    const closeConfirmModal = () => {
        setShowConfirmModal(false)
        setEditRec(null)
    }
    const handleEdit = (rec) => {
        let editData = editRec
        let id = editData._id
        let type = editData.formType;
        console.log("editData => ", editData)
        props.history.push({
            pathname: routes.xRayRequest.path,
            search: `?isEdit=true&requisitionId=${id}&formType=${type}`
        })
    }
    const createNotesModal = record => {
        let options =
        {
            "query": {
                "find": { "xrayId": record._id },
                "populate": [
                    { addedBy: [] }
                ]
            }
        }
        currentModalData.current = { ...record }
        setNotesFilterOptions(options)
        setNotesModal(true)
    };
    const createReminderModal = record => {
        let options =
        {
            "query": {
                "find": { "xRayId": record._id },
                "populate": [
                    { addedBy: [] }
                ]
            }
        }
        currentModalData.current = { ...record }
        setReminderFilterOptions(options)
        setReminderModal(true)
    };
    const confirmCancel = rec => {
        setShowCancelPopup(true)
        setDeleteRec(rec)
    }
    const visibleNotesModal = (visible, record, str, noteCount = undefined) => {
        setNotesModal(visible)
        setNotesFilterOptions({});
        if (noteCount != undefined) {
            setData(oldData => {
                return oldData.map(d => {
                    if (d._id === currentModalData.current._id) {
                        d['notesCount'] = noteCount;
                        return d;
                    }
                    return d;
                })
            })
        }
        if (!visible && str !== 'cancel')
            fetch()
    }
    const visibleReminderModal = (visible, record, str, reminderCount = undefined) => {
        setReminderModal(visible)
        setReminderFilterOptions({});
        if (reminderCount != undefined) {
            setData(oldData => {
                return oldData.map(d => {
                    if (d._id === currentModalData.current._id) {
                        d['reminderCount'] = reminderCount;
                        return d;
                    }
                    return d;
                })
            })
        }
        if (!visible && str !== 'cancel')
            fetch()
    }
    const handleDelete = () => {
        let rec = deleteRec
        let data
        if (rec && rec._id) {
            data = _.cloneDeep(rec)
        }
        else {
            data = _.cloneDeep(editRec)
        }
        data.id = rec._id
        data.residentId = rec.residentId._id;
        data.homeAreaId = rec.homeAreaId._id;
        data.physicianId = rec.physicianId._id;
        data.status = IMAGING_DIAGNOSTIC_STATUS.CANCELLED
        data.isCancel = true
        data.requestedBy = data.requestedBy._id;
        setBtnLoading(true)
        axios({ ...requisitionRequest, data }).then(({ data }) => {
            if (data.code === 'OK') {
                closeDelete(true)
                Toast.success(data.message)
                setShowCancelPopup(false)
            }
            else {
                closeDelete(false)
            }
        }).catch(err => {
            setBtnLoading(false)
        })
    }
    const closeDelete = (shouldFetch) => {
        setShowConfirmModal(false)
        setEditRec(null)
        setBtnLoading(false)
        if (shouldFetch) {
            fetch()
        }
    }
    const downLoadXrayPdf = (id) => {
        setDownloadButton(true)
        axios({ ...getXrayPDF, data: { xrayid: id } })
            .then(data => {
                if (data.statusText === "OK") {
                    let a = document.createElement('a');
                    a.download = "x-ray-result.pdf";
                    a.href = data.data.data[0].path
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setDownloadButton(false)
                }
                else {
                    Toast.error('Something went wrong ')
                    setDownloadButton(false)
                }

            }).catch(error => {
                setDownloadButton(false)
            })
    }
    const getColumns = () => [
        {
            title: 'Sr.No',
            keyword: 'index',
            dataIndex: 'index',
            render: (text, record, index) => ((filter.page - 1) * filter.limit) + (index + 1)
        },
        {
            title: 'Requisition No.',
            dataIndex: 'orderNumber',
            // style:{display:'inline'},
            render: (text, record) => (<>{text + '  ' || ''}
                {record.isVerbalOrder ? <VerbalOrder className="non_drug" /> : null}
            </>),
        },
        {
            title: 'Resident',
            dataIndex: 'residentId',
            render: text => (<span>{text && text.mergeLFName ? text.mergeLFName : ''}</span>),

        },
        {
            title: 'Room No',
            dataIndex: 'residentId',
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text && text.room ? text.room : ' '}</span>
            )
        },
        {
            title: "Request By",
            dataIndex: "requestedBy",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text && text.mergeFLName ? text.mergeFLName : ' '}</span>
            )
        },
        {
            title: 'Home Area',
            dataIndex: 'homeAreaId',
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text && text.name ? text.name : ' '}</span>
            )
        },
        {
            title: 'Physician',
            dataIndex: 'physicianId',
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text ? getUserNameWithDesignation(text) : ' '}</span>
            )
        },
        {
            title: 'HC#',
            dataIndex: 'residentId',
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text && text.hc || ' '}</span>
            )
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text ? displayDateTime(text) : ''}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text) => (<>{
                Object.keys(IMAGING_DIAGNOSTIC_STATUS).map(k => {
                    if (IMAGING_DIAGNOSTIC_STATUS[k] == text) {
                        return <span className="o_status submitted">{capitalizeStr(k)}</span>
                    }
                })

            }</>),
            filters: statusFilters,
            onFilter: (value, record) => {
                return record.status === value;
            }

        },
        {
            title: 'Action',
            render: (text, record) => {
                const hasEditPermission = [IMAGING_DIAGNOSTIC_STATUS.SUBMITTED, IMAGING_DIAGNOSTIC_STATUS.SENT].includes(record.status) && [record.requestedBy._id, record.physicianId._id].includes(authUser._id);
                const hasCancelPermission = record.status !== IMAGING_DIAGNOSTIC_STATUS.CANCELLED && [record.requestedBy._id, record.physicianId._id].includes(authUser._id)
                return (
                    <div className="actions">
                        <div>
                            <View onClick={() => showDetailView(true, record)} />
                            <p>View</p>
                        </div>
                        <div onClick={createNotesModal.bind(this, record)}>
                            <Notes />
                            <p>Notes</p>
                            <span className="notes tot">{record.notesCount}</span>
                        </div>
                        <div onClick={createReminderModal.bind(this, record)}>
                            <Reminder />
                            <p>Reminder</p>
                            <span className="notes tot">{record.reminderCount}</span>
                        </div>
                        {
                            record.status === IMAGING_DIAGNOSTIC_STATUS.COMPLETED ?
                                <div onClick={downloadButton ? null : () => downLoadXrayPdf(record.id)}>
                                    <Download />
                                    <p>Download</p>
                                </div> : null
                        }
                        <div>
                            <Print />
                            <p>Print</p>
                        </div>
                        {
                            (hasCancelPermission || hasEditPermission) &&
                            <div className="more">
                                <MoreDots />

                                <div className="more_wrap">
                                    {
                                        hasEditPermission &&
                                        <a onClick={() => handleConfirm(record, true)}>
                                            <Edit />
                                            <span>Edit</span>
                                        </a>
                                    }
                                    {
                                        hasCancelPermission &&
                                        <a onClick={() => confirmCancel(record)}>
                                            <Cancel />
                                            <span>Cancel</span>
                                        </a>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                )
            }
        }
    ]
    const onShowSizeChange = (current, size) => {
        let tempFilter = _.cloneDeep(filter)
        tempFilter.limit = size
        tempFilter.page = 1
        setFilter(tempFilter)
    };
    const fetchResident = (filter) => {
        if (residentTimeout) {
            clearTimeout(residentTimeout)
            residentTimeout = null
        }
        residentTimeout = setTimeout(() => {
            axios({ ...getResidents, data: { ...filter } }).then(({ data }) => {
                console.log('data', data)
                if (data.code === 'OK') {
                    if (data.data.data) {
                        setResidentListing(data.data.data)
                    }
                }
            })
        }, 300)
    }
    const onResidentSearch = name => {
        if (name) {
            console.log('name')
            let filter = {
                query: {
                    find: { status: STATUS.ACTIVE },
                    search: {
                        keyword: name,
                        keys: ["firstName", "lastName"]
                    },
                    populate: [
                        {
                            homeAreaId: ["name"]
                        }
                    ]
                }
            }
            fetchResident(filter)
        }
        else {
            form.setFieldsValue({
                "residentId": undefined
            })
        }
    }
    const handleDoctorChange = (val, forState) => {
        if (forState === true) {
            let tempFilter = filter
            tempFilter.filter.doctorId = val
            setFilter({
                ...filter, filter: {
                    ...filter.filter,
                    doctorId: val
                }
            })
        }
        else {
            form.setFieldsValue({
                doctorId: val
            })
        }

    }
    const handleSubmit = () => {
        const { validateFields } = form
        validateFields((err, values) => {
            if (err) {
                console.log('err')
                return
            }
            let tempdoctorId = isDrOrNp(authUser) ? authUser._id : values.doctorId
            let info = {
                doctorId: tempdoctorId,
                residentId: values.residentId,
                type: imagingType
            }
            closeRequisitionModal(true, info)
        })
    }

    return (<>
        <div className="container">
            <div className="xray_wrap">
                <PageHead
                    form={props.form}
                    imagingDiagnosticList={imagingDiagnosticList}
                    handleImagingFilter={handleImagingFilter}
                    total={total}
                    isVisible={isVisibleAddModal}
                    onClose={closeRequisitionModal}
                    onShowRequisitionModal={showRequisitionModal}
                    onRangePickerChange={handleRangePickerChange}
                    onDoctorChange={handleDoctorChange}
                    filter={filter}
                    onSearch={handleSearch}
                    onSubmit={handleSubmit}
                    authUser={authUser}
                    residentListing={residentListing}
                    onTypeChange={(type) => setImagingType(type)}
                    selectedType={imagingType}
                    onResidentSearch={onResidentSearch}
                    onCancel={closeRequisitionModal}
                    dateRange={dateRange}
                />
                <Table
                    columns={getColumns()}
                    datasource={data}
                    loading={loading}
                    // showResult={true}
                    // resultCol="result1"
                    onChange={handleTableChange}
                    pagination={{
                        current: filter.page,
                        pageSize: filter.limit,
                        total: total
                    }}
                />
                {
                    showConfirmModal &&
                    <Modal
                        title={<strong>Confirm Action</strong>}
                        visible={showConfirmModal}
                        onCancel={closeConfirmModal}
                        footer={[
                            <Button className='screen-btn gray-btn' onClick={handleEdit} type="primary">Edit</Button>,
                            <Button className='screen-btn' htmlType="submit" loading={btnLoading} onClick={handleDelete}>Delete</Button>
                        ]}
                    >
                        <h4>Would you like to edit or delete this requistition ?</h4>
                    </Modal>
                }
                {
                    showCancelPopup ?
                        <ConfirmPopup
                            title={`Are you sure you want to Cancel this Requisition?`}
                            okText='Yes'
                            visible={showCancelPopup}
                            okType='primary'
                            cancelText='No'
                            onCancel={() => {
                                setShowCancelPopup(false)
                                setDeleteRec(null)
                            }}
                            onOk={handleDelete}
                        /> : null
                }
                {
                    isVisibleDetailView &&
                    <DetailViewSTL
                        isVisible={isVisibleDetailView}
                        onCancel={showDetailView}
                        data={imagingDetail}
                    />
                }
                {
                    notesModal && (
                        <NotesModal
                            visible={notesModal}
                            filterOptions={notesFilterOptions}
                            onCancel={noteCount => visibleNotesModal(false, null, 'cancel', noteCount)}
                            onOk={() => visibleNotesModal(false)}
                            isUpsertList={true}
                            modalTitle={`View Note - ${currentModalData.current.orderNumber}`}
                            xRayNumber={currentModalData.current.orderNumber}
                            addData={{
                                residentId: currentModalData.current.residentId._id,
                                xrayId: currentModalData.current._id,
                                category: TODO_CATEGORY.X_RAY
                            }}
                        />
                    )
                }
                {
                    reminderModal && (
                        <ReminderModal
                            visible={reminderModal}
                            filterOptions={reminderFilterOptions}
                            onCancel={reminderCount => visibleReminderModal(false, null, 'cancel', reminderCount)}
                            onOk={() => visibleReminderModal(false)}
                            isUpsertList={true}
                            modalTitle={`View Reminder - ${currentModalData.current.orderNumber}`}
                            xRayNumber={currentModalData.current.orderNumber}
                            addData={{
                                residentId: currentModalData.current.residentId._id,
                                xRayId: currentModalData.current._id,
                                category: TODO_CATEGORY.X_RAY
                            }}
                        />
                    )
                }
            </div>
        </div>
    </>)
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth
    return {
        authUser
    }
}
export default connect(mapStateToProps)(createForm()(Xraylist));
