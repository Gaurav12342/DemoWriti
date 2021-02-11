// import React, { Component } from "react";
// import "../style.css"
// import {
//     Tag,
//     Button,
//     Divider,
//     Card,
//     Input,
//     Icon,
//     Tooltip,
//     Select,
//     Table, Badge, DatePicker, message, Modal, Avatar
// } from 'antd';
// import axios from "util/Api";
// import AddRequisitionModal from '../List/Components/AddRequisitionModal'
// import { Route, Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { IMAGING_DIAGNOSTIC_STATUS, CLIENTELE_TYPE, X_RAY_TODO_TYPES, TODO_CATEGORY, IMAGING_RESULT_STATUS } from '../../../constants/Common'
// import { xRayListing, customerPaginate, requisitionRequest } from '../../../services/ApiRoutes'
// import UtilService, { displayCatchErrorMsg, dateOnlyFormat, selectedBodyParts, getUserNameWithDesignation } from '../../../services/util'
// import DetailViewSTL from './../List/Components/DetailViewStl'
// import NotesModal from '../../../components/NotesModal'
// import '../../admissionReadmission/index.css'
// import CascaderFilter from '../../../components/custom/CascaderFilter'
// const _ = require('lodash')
// const moment = require('moment')

// const { Search } = Input;
// const Option = Select.Option
// const { RangePicker } = DatePicker

// class XRayReqList extends Component {
//     state = {
//         loading: false,
//         isVisibleAddModal: false,
//         yes: true,
//         loading: false,
//         homeAreaId: undefined,
//         isVisibleDetailView: false,
//         btnLoading: false,
//         filter: {
//             page: 1,
//             limit: 10,
//             filter: {}
//         },
//         data: [],
//         notesFilterOptions: {},
//         notesModal: false,
//         total: 0,
//         imagingDiagnosticList: [],
//         imagingDetail: null,
//         showConfirmModal: false
//     };
//     componentDidMount() {
//         this.fetch()
//         this.fetchImagingDiagnosticList()
//     }
//     fetchImagingDiagnosticList = () => {
//         let { method, url } = customerPaginate
//         let filter = {
//             filter: {
//                 type: CLIENTELE_TYPE.IMAGING_DIAGNOSTIC
//             }
//         }
//         axios({ method, url, data: filter }).then(({ data }) => {
//             if (data.code === 'OK') {
//                 this.setState({
//                     imagingDiagnosticList: data.data.list
//                 })
//             }
//             else {
//                 displayCatchErrorMsg(data.message)
//             }
//         }).catch(err => {
//             displayCatchErrorMsg(err)
//         })

//     }
//     modifiedList = list => {
//         let parentObj = {}
//         let modifiedList = list.map(current => {
//             return selectedBodyParts(current)
//         })
//         return modifiedList
//     }
//     fetch = () => {
//         let { method, url } = xRayListing
//         this.setState({
//             loading: true
//         })
//         axios({ method, url, data: this.state.filter }).then(({ data }) => {
//             if (data.code === 'OK') {
//                 let updatedList = this.modifiedList(data.data.list)
//                 this.setState({
//                     data: data.data.list,
//                     loading: false,
//                     total: data.data.count
//                 })
//             }
//             else {
//                 this.setState({
//                     loading: false
//                 })
//                 displayCatchErrorMsg(data.message)
//             }
//         }).catch(err => {
//             this.setState({
//                 loading: false
//             })
//             displayCatchErrorMsg(err)
//         })
//     }
//     handleChange = (pagination, filter, sorter) => {
//         this.setState({
//             filter: {
//                 ...this.state.filter,
//                 page: pagination.current,
//                 limit: pagination.pageSize
//             }
//         }, () => this.fetch())

//     }
//     showRequisitionModal = () => {
//         this.setState({
//             isVisibleAddModal: true
//         })
//     }
//     closeRequisitionModal = (redirect, info) => {
//         if (redirect && info && info.doctorId && info.residentId) {
//             this.props.history.push({
//                 pathname: '/wa/x-ray-req',
//                 search: `?doctorId=${info.doctorId}&residentId=${info.residentId}`
//             })
//         }

//         this.setState({
//             isVisibleAddModal: false
//         })
//     }

//     handleUnitChange = (val) => {
//         console.log("TCL: handleUnitChange -> val", val)
//         let tempFilter = this.state.filter.filter
//         tempFilter.homeAreaId = val
//         this.setState({
//             filter: {
//                 ...this.state.filter,
//                 filter: tempFilter
//             }
//         }, () => this.fetch())
//     }
//     handleSearch = val => {
//         let tempFilter = _.cloneDeep(this.state.filter)
//         if (val) {
//             tempFilter.search = {
//                 keys: ['name', 'orderNumber'],
//                 keyword: val
//             }
//         }
//         else if (tempFilter.hasOwnProperty('search')) {
//             delete tempFilter["search"]
//         }
//         this.setState({
//             filter: {
//                 ...tempFilter,
//                 page: 1,
//                 limit: 10
//             }
//         }, () => this.fetch())
//     }
//     showDetailView = (status, data) => {
//         if (data && Object.keys(data).length) {
//             let title = ''
//             title = `${data.residentId.name}`
//             title = data.residentInfoId.nhRoom ? `${title}(Room No:${data.residentInfoId.nhRoom})` : title
//             data.title = title
//             let requestNo = data.orderNumber + "(" + UtilService.displayDateByFormat(data.createdAt) + ")"
//             data.requestNo = requestNo
//         }
//         this.setState({
//             isVisibleDetailView: status,
//             imagingDetail: data
//         })
//     }
//     handleRangePickerChange = dateRange => {

//         let tempFilter = { ...this.state.filter.filter }
//         if (dateRange.length > 0) {
//             tempFilter = {
//                 ...tempFilter,
//                 'createdAt': {
//                     ">=": moment(dateRange[0]).startOf('day').toISOString(),
//                     "<=": moment(dateRange[1]).endOf('day').toISOString()
//                 }
//             }
//         }
//         else {
//             delete tempFilter['createdAt']
//         }
//         this.setState({
//             filter: {
//                 ...this.state.filter,
//                 page: 1,
//                 filter: { ...tempFilter }
//             }
//         }, () => this.fetch())
//     }
//     handleImagingFilter = val => {
//         let tempFilter = _.cloneDeep(this.state.filter)
//         if (val) {
//             tempFilter.page = 1
//             tempFilter.filter = {
//                 ...tempFilter.filter,
//                 imagingAndDiagnosticId: val
//             }
//         }
//         else if (tempFilter.filter.hasOwnProperty('imagingAndDiagnosticId')) {
//             delete tempFilter.filter["imagingAndDiagnosticId"]
//         }
//         this.setState({
//             filter: tempFilter
//         }, () => this.fetch())
//     }
//     handleConfirm = rec => {
//         this.setState({
//             showConfirmModal: true,
//             editRec: rec
//         })
//     }
//     closeConfirmModal = () => {
//         console.log("TCL: closeConfirmModal -> closeConfirmModal")
//         this.setState({
//             showConfirmModal: false,
//             editRec: null
//         })
//     }
//     handleEdit = (rec) => {
//         let editData = this.state.editRec
//         let id = editData.id
//         let type = editData.formType
//         this.props.history.push({
//             pathname: '/wa/x-ray-req',
//             search: `?isEdit=true&requisitionId=${id}&formType=${type}`
//         })
//     }
//     createNotesModal = record => {
//         let options = {
//             xRayRequestId: record.id,
//             todoId: record.id,
//             category: TODO_CATEGORY.X_RAY,
//             subCategory: X_RAY_TODO_TYPES.GENERAL,
//         };
//         this.setState({ notesFilterOptions: options, notesModal: true });
//     };
//     handleCancel = () => {
//         this.setState({
//             notesModal: false,
//             notesFilterOptions: {}
//         });
//     };
//     onNoteDelete = todoId => {
//         // let todoList = this.state.data;
//         // todoList = _.map(todoList, function (td) {
//         //     return todoId === td.id
//         //         ? _.extend(td, { notesCount: td.notesCount })
//         //         : td;
//         // });
//         // this.setState({
//         //     data: _.extend(this.state.data, { todoList })
//         // });
//     };
//     confirmCancel = rec => {
//         Modal.confirm({
//             title: `Are you sure you want to Cancel this Requisition?`,
//             okText: 'Yes',
//             okType: 'primary',
//             cancelText: 'No',
//             onOk: () => this.handleDelete(rec)
//         });
//     }
//     visibleNotesModal = (visible, record, str) => {
//         this.setState({
//             notesModal: visible, notesFilterOptions: {}
//         })
//         if (!visible && str !== 'cancel')
//             this.fetch()
//     }
//     handleDelete = rec => {
//         let data
//         if (rec && rec.id) {
//             data = _.cloneDeep(rec)
//         }
//         else {
//             data = _.cloneDeep(this.state.editRec)
//         }
//         let { method, url } = requisitionRequest
//         data.status = IMAGING_DIAGNOSTIC_STATUS.CANCELLED
//         data.isCancel = true
//         this.setState({
//             btnLoading: true
//         })
//         axios({ method, url, data }).then(({ data }) => {
//             if (data.code === 'OK') {
//                 this.closeDelete(true)
//                 message.success(data.message)
//             }
//             else {
//                 this.closeDelete(false)
//                 displayCatchErrorMsg(data)
//             }
//         }).catch(err => {
//             this.setState({
//                 btnLoading: false
//             })
//             displayCatchErrorMsg(err)
//         })
//     }
//     closeDelete = (shouldFetch) => {
//         this.setState({
//             showConfirmModal: false,
//             editRec: null,
//             btnLoading: false
//         }, () => {
//             if (shouldFetch) {
//                 this.fetch()
//             }
//         })
//     }
//     getColumns = () => [
//         {
//             title: 'Sr.No',
//             keyword: 'index',
//             dataIndex: 'index',
//             render: (text, record, index) => ((this.state.filter.page - 1) * this.state.filter.limit) + (index + 1)
//         },
//         {
//             title: 'Requisition No.',
//             dataIndex: 'orderNumber',
//             width: '12%',
//             render: (text, record) => (<span>{text + '  ' || ''}
//                 {record.isVerbalOrder ? (
//                     <Avatar size="small" style={{ color: "#ffffff", backgroundColor: "#117FFA" }}>
//                         VO
//                     </Avatar>
//                 ) : null}
//             </span>),
//         },
//         {
//             title: 'Resident',
//             dataIndex: 'residentId',
//             width: '15%',
//             render: text => (<span>{text && text.name ? text.name : ''}</span>),

//         },
//         {
//             title: 'Room No',
//             dataIndex: 'residentInfoId',
//             render: text => (
//                 <span style={{ textTransform: "capitalize" }}>{text && text.nhRoom ? text.nhRoom : ' '}</span>
//             )
//         },
//         {
//             title: "Request By",
//             dataIndex: "requestedBy",
//             render: text => (
//                 <span style={{ textTransform: "capitalize" }}>{getUserNameWithDesignation(text)}</span>
//             )
//         },
//         {
//             title: 'Home Area',
//             dataIndex: 'homeAreaId',
//             render: text => (
//                 <span style={{ textTransform: "capitalize" }}>{text && text.name ? text.name : ' '}</span>
//             )
//         },
//         {
//             title: 'Physician',
//             dataIndex: 'physicianId',
//             render: text => (
//                 <span style={{ textTransform: "capitalize" }}>{getUserNameWithDesignation(text)}</span>
//             )
//         },
//         {
//             title: 'HC#',
//             render: (text, record) => (
//                 <span style={{ textTransform: "capitalize" }}>{record && record.residentInfoId && record.residentInfoId.hc ? record.residentInfoId.hc : ' '}</span>
//             )
//         },
//         {
//             title: 'Date',
//             dataIndex: 'createdAt',
//             render: text => (
//                 <span style={{ textTransform: "capitalize" }}>{text ? UtilService.displayDateTime(text) : ''}</span>
//             )
//         },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             render: (text) => (<span>{
//                 Object.keys(IMAGING_DIAGNOSTIC_STATUS).map(k => {
//                     if (IMAGING_DIAGNOSTIC_STATUS[k] == text) {
//                         return <Tag className="statusTags">{k}</Tag>
//                     }
//                 })

//             }</span>),

//         },
//         {
//             title: 'Action',
//             render: (record) => (
//                 <>
//                     {/* <span>Yes</span> */}
//                     <Divider type="vertical" />
//                     <span
//                         style={{ color: "#0000ff" }}>
//                         <Icon
//                             onClick={() => this.showDetailView(true, record)}
//                             className="colorFirst" type="eye" theme="filled" />
//                     </span>
//                     <Divider type="vertical" />
//                     <span style={{ color: "#0000ff" }}>
//                         <Tooltip title="View Notes" onClick={this.createNotesModal.bind(this, record)}>
//                             <Badge overflowCount={1000000} style={{ backgroundColor: "#117FFA" }} count={record.notesCount}>
//                                 {" "}
//                                 <Icon className="colorFirst" type="file" theme="filled" />
//                             </Badge>

//                         </Tooltip>
//                     </span>
//                     {
//                         record.status !== IMAGING_DIAGNOSTIC_STATUS.CANCELLED && [record.requestedBy.id, record.physicianId.id].includes(this.props.auth.authUser._id) && <>
//                             <Divider type="vertical" />
//                             <Tooltip title="Cancel">
//                                 <Icon type="delete" style={{ color: 'blue' }} theme="filled" onClick={() => this.confirmCancel(record)} />
//                             </Tooltip>
//                         </>
//                     }
//                     {
//                         [IMAGING_DIAGNOSTIC_STATUS.SUBMITTED, IMAGING_DIAGNOSTIC_STATUS.SENT].includes(record.status) && [record.requestedBy.id, record.physicianId.id].includes(this.props.auth.authUser._id) && <> <Divider type="vertical" />
//                             <Tooltip title="Edit">
//                                 <Icon type="edit" style={{ color: 'blue' }} theme="filled" onClick={() => this.handleConfirm(record, true)} />
//                             </Tooltip></>
//                     }
//                     < Divider type="vertical" />
//                     <Tooltip title="Download">
//                         <Link to="/">
//                             <Icon className="colorFirst" type="download" />
//                         </Link>
//                     </Tooltip>
//                     <Divider type="vertical" />
//                     <Tooltip title="Print">
//                         <img src={require("../svg/print.svg")} alt="" />
//                     </Tooltip>
//                 </>
//             )
//         }
//     ]
//     onShowSizeChange = (current, size) => {
//         let tempFilter = _.cloneDeep(this.state.filter)
//         tempFilter.limit = size
//         this.setState({
//             filter: tempFilter
//         });
//     };
//     render() {
//         const { auth } = this.props
//         const { authUser } = auth
//         const { isVisibleAddModal, data, imagingDetail, imagingDiagnosticList, btnLoading, isVisibleDetailView, showConfirmModal } = this.state
//         return (
//             <div>
//                 <div className="pmrListMain">
//                     <Card type="inner" className="DetailCards">
//                         <div className="pageHeading">
//                             <h1>X-Ray - U/S Request List
//                                     <Badge
//                                     count={this.state.total}
//                                     style={{ backgroundColor: "#000000" }}
//                                 />
//                             </h1>
//                             <div className="add-withsearchFilter">
//                                 <Button type="primary" icon="plus" onClick={this.showRequisitionModal}>
//                                     Add New
//                                 </Button>
//                             </div>
//                         </div>
//                         <div className="pageHeading">
//                             <div></div>
//                             <div className="add-withsearchFilter" style={{ float: 'right' }}>

//                                 <Select
//                                     placeholder="Imaging and Diagnostic Filter"
//                                     allowClear={true}
//                                     style={{ width: '250px', marginRight: '10px' }}
//                                     onChange={this.handleImagingFilter}
//                                 >
//                                     {
//                                         imagingDiagnosticList.map(opt => {
//                                             return <Option value={opt.id} key={opt.id}>{opt.name}</Option>
//                                         })
//                                     }
//                                 </Select>
//                                 <RangePicker
//                                     style={{ width: "300px", marginRight: '10px' }}
//                                     onChange={this.handleRangePickerChange}
//                                     format={dateOnlyFormat}
//                                 />
//                                 <CascaderFilter
//                                     filterVal={this.state.filter.filter["homeAreaId"]}
//                                     loginUser={authUser}
//                                     filterChange={this.handleUnitChange}
//                                     isNotPushAllKey={true}
//                                     style={{ width: '250px', marginRight: '10px' }}
//                                 />
//                                 <Search
//                                     allowClear={true}
//                                     placeholder="Search by Resident,Requisition No."
//                                     onSearch={this.handleSearch}
//                                     style={{ width: 240, marginRight: '8px' }}
//                                 />
//                             </div>
//                         </div>
//                         <Table
//                             loading={this.state.loading}
//                             columns={this.getColumns()}
//                             dataSource={data}
//                             dataSource={this.state.data}
//                             pagination={{
//                                 current: this.state.filter.page,
//                                 pageSize: this.state.filter.limit,
//                                 total: this.state.total,
//                                 showSizeChanger: true,
//                                 onShowSizeChange: this.onShowSizeChange
//                             }}
//                             onChange={this.handleChange}
//                             rowKey={e => e.id}
//                         />

//                     </Card>
//                 </div>
//                 {
//                     isVisibleAddModal && <AddRequisitionModal
//                         key="requisitionalModal"
//                         isVisible={isVisibleAddModal}
//                         authUser={this.props.auth.authUser}
//                         onCancel={this.closeRequisitionModal}
//                     />
//                 }
//                 {
//                     isVisibleDetailView &&
//                     <DetailViewSTL
//                         isVisible={isVisibleDetailView}
//                         onCancel={this.showDetailView}
//                         data={imagingDetail}
//                     />
//                 }
//                 {
//                     showConfirmModal &&
//                     <Modal
//                         title={<strong>Confirm Action</strong>}
//                         visible={showConfirmModal}
//                         onCancel={this.closeConfirmModal}
//                         footer={[
//                             <Button onClick={this.handleEdit} type="primary">Edit</Button>,
//                             <Button htmlType="submit" loading={btnLoading} onClick={this.handleDelete}>Delete</Button>
//                         ]}
//                     >
//                         <h4>Would you like to edit or delete this requistition ?</h4>
//                     </Modal>
//                 }
//                 {
//                     this.state.notesModal && (
//                         <NotesModal
//                             visible={this.state.notesModal}
//                             onDelete={this.onNoteDelete.bind(this)}
//                             filterOptions={this.state.notesFilterOptions}
//                             onCancel={() => this.visibleNotesModal(false, null, 'cancel')}
//                             onOk={() => this.visibleNotesModal(false)}
//                             isUpsertList={true}
//                         />
//                     )
//                 }
//             </div >
//         );
//     }
// }
// const mapStateToProps = function (props) {
//     return props;
// };
// export default connect(mapStateToProps)(XRayReqList);