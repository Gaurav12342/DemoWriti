import React, { Component, useState, useEffect } from "react";
import axios from '../../../services/api/services/common';
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { IMAGING_DIAGNOSTIC_STATUS } from '../../../constants/xray'
import { CLIENTELE_TYPE } from '../../../constants/common'
import { X_RAY_TODO_TYPES, TODO_CATEGORY } from '../../../constants/todo'
import { requisitionRequest, xRayListing } from '../../../services/api/routes/x_ray'
import { customerPaginate } from '../../../services/api/routes/customer'
import ConfirmPopup from '../../../components/common/ConfirmPopup'
import { displayDate } from '../../../util/moment'
import { Toast } from '../../../components/common'
import DetailViewSTL from './../List/Components/DetailViewStl'
import NotesModal from '../../../components/NotesModal'
import '../../admissionReadmission/index.css'
// import CascaderFilter from '../../../components/custom/CascaderFilter'
import routes from "../../../routes/constant";
const _ = require('lodash')
const moment = require('moment')

const { Search } = Input;
const Option = Select.Option
const { RangePicker } = DatePicker
function XRayReqList(props) {
    const { authUser } = props
    const [loading, setLaoding] = useState(false)
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false)
    const [homeAreaId, setHomeAreaId] = useState(undefined)
    const [isVisibleDetailView, setIsVisibleDetailView] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
        filter: {}
    })
    const [data, setData] = useState([])
    const [notesFilterOptions, setNotesFilterOptions] = useState({})
    const [notesModal, setNotesModal] = useState(false)
    const [total, setTotal] = useState(0)
    const [imagingDiagnosticList, setImagingDiagnosticList] = useState([])
    const [imagingDetail, setImagingDetail] = useState(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [editRec, setEditRec] = useState(undefined)

    useEffect(() => {
        fetch()
        fetchImagingDiagnosticList()
    }, [])

    useEffect(() => {
        if (loading) {
            setLaoding(false)
        }
    }, [data])

    useEffect(() => {
        fetch()
    }, [filter])

    const fetchImagingDiagnosticList = () => {
        let filter = {
            filter: {
                type: CLIENTELE_TYPE.IMAGING_DIAGNOSTIC
            }
        }
        axios({ ...customerPaginate, data: filter }).then(({ data }) => {
            if (data.code === 'OK') {
                setImagingDiagnosticList(data.data.list)
            }
        })

    }
    const modifiedList = list => {
        let parentObj = {}
        let modifiedList = list.map(current => {
            return selectedBodyParts(current)
        })
        return modifiedList
    }
    const fetch = () => {
        setLaoding(true)
        axios({ ...xRayListing, data: filter }).then(({ data }) => {
            if (data.code === 'OK') {
                let updatedList = modifiedList(data.data.list)
                setState({
                    data: data.data.list,
                    loading: false,
                    total: data.data.count
                })
            }
            else {
                setLaoding(false)
            }
        }).catch(err => {
            setLaoding(false)
        })
    }
    const handleChange = (pagination, filter, sorter) => {
        let tempFilter = {
            ...filter, page: pagination.current,
            limit: pagination.pageSize
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
                search: `?doctorId=${info.doctorId}&residentId=${info.residentId}`
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
            title = `${data.residentId.name}`
            title = data.residentInfoId.nhRoom ? `${title}(Room No:${data.residentInfoId.nhRoom})` : title
            data.title = title
            let requestNo = data.orderNumber + "(" + UtilService.displayDateByFormat(data.createdAt) + ")"
            data.requestNo = requestNo
        }
        setImagingDetail(data)
        setIsVisibleDetailView(status)
    }
    const handleRangePickerChange = dateRange => {

        let tempFilter = { ...filter.filter }
        if (dateRange.length > 0) {
            tempFilter = {
                ...tempFilter,
                'createdAt': {
                    ">=": moment(dateRange[0]).startOf('day').toISOString(),
                    "<=": moment(dateRange[1]).endOf('day').toISOString()
                }
            }
        }
        else {
            delete tempFilter['createdAt']
        }
        setFilter({ ...filter, page: 1, filter: { ...tempFilter } })
    }
    const handleImagingFilter = val => {
        let tempFilter = _.cloneDeep(filter)
        if (val) {
            tempFilter.page = 1
            tempFilter.filter = {
                ...tempFilter.filter,
                imagingDiagnosticId: val
            }
        }
        else if (tempFilter.filter.hasOwnProperty('imagingDiagnosticId')) {
            delete tempFilter.filter["imagingDiagnosticId"]
        }
        setFilter(tempFilter)
    }
    const handleConfirm = rec => {
        setShowConfirmModal(true)
        setEditRec(rec)
    }
    const closeConfirmModal = () => {
        setShowConfirmModal(false)
        setEditRec(null)
    }
    const handleEdit = (rec) => {
        let editData = editRec
        let id = editData.id
        let type = editData.formType
        props.history.push({
            pathname: routes.xRayRequest.path,
            search: `?isEdit=true&requisitionId=${id}&formType=${type}`
        })
    }
    const createNotesModal = record => {
        let options = {
            xRayRequestId: record.id,
            todoId: record.id,
            category: TODO_CATEGORY.X_RAY,
            subCategory: X_RAY_TODO_TYPES.GENERAL,
        };
        setNotesFilterOptions(options)
        setNotesModal(true)
    };
    const handleCancel = () => {
        setNotesFilterOptions({})
        setNotesModal(false)
    };
    const confirmCancel = rec => {
        return <ConfirmPopup
            title={`Are you sure you want to Cancel this Requisition?`}
            okText='Yes'
            okType='primary'
            cancelText='No'
            onOk={handleDelete}
        />
    }
    const visibleNotesModal = (visible, record, str) => {
        setNotesModal(visible)
        setNotesFilterOptions({})
        if (!visible && str !== 'cancel')
            fetch()
    }
    const handleDelete = rec => {
        let data
        if (rec && rec.id) {
            data = _.cloneDeep(rec)
        }
        else {
            data = _.cloneDeep(editRec)
        }
        data.status = IMAGING_DIAGNOSTIC_STATUS.CANCELLED
        data.isCancel = true
        setBtnLoading(true)
        axios({ ...requisitionRequest, data }).then(({ data }) => {
            if (data.code === 'OK') {
                closeDelete(true)
                Toast.success(data.message)
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
        setEditRec(nul)
        setBtnLoading(false)
        if (shouldFetch) {
            fetch()
        }
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
            width: '12%',
            render: (text, record) => (<span>{text + '  ' || ''}
                {record.isVerbalOrder ? (
                    <Avatar size="small" style={{ color: "#ffffff", backgroundColor: "#117FFA" }}>
                        VO
                    </Avatar>
                ) : null}
            </span>),
        },
        {
            title: 'Resident',
            dataIndex: 'residentId',
            width: '15%',
            render: text => (<span>{text && text.name ? text.name : ''}</span>),

        },
        {
            title: 'Room No',
            dataIndex: 'residentInfoId',
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text && text.nhRoom ? text.nhRoom : ' '}</span>
            )
        },
        {
            title: "Request By",
            dataIndex: "requestedBy",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text && text.name ? text.name : ' '}</span>
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
                <span style={{ textTransform: "capitalize" }}>{text && text.name ? text.name : ' '}</span>
            )
        },
        {
            title: 'HC#',
            render: (text, record) => (
                <span style={{ textTransform: "capitalize" }}>{record && record.residentInfoId && record.residentInfoId.hc ? record.residentInfoId.hc : ' '}</span>
            )
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text ? UtilService.displayDateTime(text) : ''}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text) => (<span>{
                Object.keys(IMAGING_DIAGNOSTIC_STATUS).map(k => {
                    if (IMAGING_DIAGNOSTIC_STATUS[k] == text) {
                        return <Tag className="statusTags">{k}</Tag>
                    }
                })

            }</span>),

        },
        {
            title: 'Action',
            render: (record) => (
                <>
                    {/* <span>Yes</span> */}
                    <Divider type="vertical" />
                    <span
                        style={{ color: "#0000ff" }}>
                        <Icon
                            onClick={() => showDetailView(true, record)}
                            className="colorFirst" type="eye" theme="filled" />
                    </span>
                    <Divider type="vertical" />
                    <span style={{ color: "#0000ff" }}>
                        <Tooltip title="View Notes" onClick={createNotesModal.bind(this, record)}>
                            <Badge overflowCount={1000000} style={{ backgroundColor: "#117FFA" }} count={record.notesCount}>
                                {" "}
                                <Icon className="colorFirst" type="file" theme="filled" />
                            </Badge>

                        </Tooltip>
                    </span>
                    {
                        record.status !== IMAGING_DIAGNOSTIC_STATUS.CANCELLED && [record.requestedBy.id, record.physicianId.id].includes(props.authUser._id) && <>
                            <Divider type="vertical" />
                            <Tooltip title="Cancel">
                                <Icon type="delete" style={{ color: 'blue' }} theme="filled" onClick={() => confirmCancel(record)} />
                            </Tooltip>
                        </>
                    }
                    {
                        [IMAGING_DIAGNOSTIC_STATUS.SUBMITTED, IMAGING_DIAGNOSTIC_STATUS.SENT].includes(record.status) && [record.requestedBy.id, record.physicianId.id].includes(props.authUser._id) && <> <Divider type="vertical" />
                            <Tooltip title="Edit">
                                <Icon type="edit" style={{ color: 'blue' }} theme="filled" onClick={() => handleConfirm(record, true)} />
                            </Tooltip></>
                    }
                    < Divider type="vertical" />
                    <Tooltip title="Download">
                        <Link to="/">
                            <Icon className="colorFirst" type="download" />
                        </Link>
                    </Tooltip>
                    <Divider type="vertical" />
                    <Tooltip title="Print">
                        <img src={require("../svg/print.svg")} alt="" />
                    </Tooltip>
                </>
            )
        }
    ]
    const onShowSizeChange = (current, size) => {
        let tempFilter = _.cloneDeep(filter)
        tempFilter.limit = size
        tempFilter.page = 1
        setFilter(tempFilter)
    };
    return (
        // <div>
        //     <div className="pmrListMain">
        //         <Card type="inner" className="DetailCards">
        //             <div className="pageHeading">
        //                 <h1>X-Ray - U/S Request List
        //                         <Badge
        //                         count={total}
        //                         style={{ backgroundColor: "#000000" }}
        //                     />
        //                 </h1>
        //                 <div className="add-withsearchFilter">
        //                     <Button type="primary" icon="plus" onClick={showRequisitionModal}>
        //                         Add New
        //                     </Button>
        //                 </div>
        //             </div>
        //             <div className="pageHeading">
        //                 <div></div>
        //                 <div className="add-withsearchFilter" style={{ float: 'right' }}>

        //                     <Select
        //                         placeholder="Imaging and Diagnostic Filter"
        //                         allowClear={true}
        //                         style={{ width: '250px', marginRight: '10px' }}
        //                         onChange={handleImagingFilter}
        //                     >
        //                         {
        //                             imagingDiagnosticList.map(opt => {
        //                                 return <Option value={opt.id} key={opt.id}>{opt.name}</Option>
        //                             })
        //                         }
        //                     </Select>
        //                     <RangePicker
        //                         style={{ width: "300px", marginRight: '10px' }}
        //                         onChange={handleRangePickerChange}
        //                         format={displayDate}
        //                     />
        //                     <CascaderFilter
        //                         filterVal={filter.filter["homeAreaId"]}
        //                         loginUser={authUser}
        //                         filterChange={handleUnitChange}
        //                         isNotPushAllKey={true}
        //                         style={{ width: '250px', marginRight: '10px' }}
        //                     />
        //                     <Search
        //                         allowClear={true}
        //                         placeholder="Search by Resident,Requisition No."
        //                         onSearch={handleSearch}
        //                         style={{ width: 240, marginRight: '8px' }}
        //                     />
        //                 </div>
        //             </div>
        //             <Table
        //                 loading={loading}
        //                 columns={getColumns()}
        //                 dataSource={data}
        //                 dataSource={data}
        //                 pagination={{
        //                     current: filter.page,
        //                     pageSize: filter.limit,
        //                     total: total,
        //                     showSizeChanger: true,
        //                     onShowSizeChange: onShowSizeChange
        //                 }}
        //                 onChange={handleChange}
        //                 rowKey={e => e.id}
        //             />

        //         </Card>
        //     </div>
        //     {
        //         isVisibleAddModal && <AddRequisitionModal
        //             key="requisitionalModal"
        //             isVisible={isVisibleAddModal}
        //             authUser={props.auth.authUser}
        //             onCancel={closeRequisitionModal}
        //         />
        //     }
        //     {
        //         isVisibleDetailView &&
        //         <DetailViewSTL
        //             isVisible={isVisibleDetailView}
        //             onCancel={showDetailView}
        //             data={imagingDetail}
        //         />
        //     }
        //     {
        //         showConfirmModal &&
        //         <Modal
        //             title={<strong>Confirm Action</strong>}
        //             visible={showConfirmModal}
        //             onCancel={closeConfirmModal}
        //             footer={[
        //                 <Button onClick={handleEdit} type="primary">Edit</Button>,
        //                 <Button htmlType="submit" loading={btnLoading} onClick={handleDelete}>Delete</Button>
        //             ]}
        //         >
        //             <h4>Would you like to edit or delete this requistition ?</h4>
        //         </Modal>
        //     }
        //     {
        //         notesModal && (
        //             <NotesModal
        //                 visible={notesModal}
        //                 onDelete={onNoteDelete.bind(this)}
        //                 filterOptions={notesFilterOptions}
        //                 onCancel={() => visibleNotesModal(false, null, 'cancel')}
        //                 onOk={() => visibleNotesModal(false)}
        //                 isUpsertList={true}
        //             />
        //         )
        //     }
        // </div >
        <></>
    );

}
const mapStateToProps = function (props) {
    return props;
};
export default connect(mapStateToProps)(XRayReqList);