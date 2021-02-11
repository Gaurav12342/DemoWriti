import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../services/api/services/common'
import { getPrescriptionDetail, performTodo, getPmrDetail } from '../../../services/api/routes/pmr'
import { PatientInfoBar, TodoActions, PendingTodo } from '../../../components/Todo';
import { Spin, LightBox, Select, Option } from '../../../components/common'
import { getPath } from '../../../util/todo'
import _ from 'lodash'
import { prescriptionFormCheck, todoUpdate, prescriptionUpdate } from '../../../services/socket/routes/todo';

import { TODO_CATEGORY, STATUS, SUB_CATEGORY } from '../../../constants/todo';
import { TYPE } from '../../../constants/prescription'
import { PMR_ORDER_LABEL, PMR_ORDER_COLOR, PMR_ORDER } from '../../../constants/pmr';
import { displayDate } from '../../../util/moment';
import NoData from '../../ResidentDetail/View/noData';
import PmrOrder from '../../PmrTodo/components/PmrOrder';
const ORDER_STATUS = PMR_ORDER.STATUS;
const PrescriptionContainer = props => {

    const { activeTodo, socket, authUser, query } = props
    const [loader, setLoader] = useState(false)
    const [visibleViewer, setVisibleViewer] = useState(false)
    const [actionLoader, setActionLoader] = useState(false)
    const [detail, setDetail] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [orderList, setOrderList] = useState([]);
    const orderListRef = React.useRef([])

    useEffect(() => {
        if (activeTodo)
            fetch()
        else
            setDetail(null)
    }, [activeTodo])

    useEffect(() => {
        //need to give ref of detail
        if (!detail || !activeTodo)
            return
        if (socket) {
            socket.on(todoUpdate, handleTodoUpdate)
            return () => {
                socket.off(todoUpdate);
            };
        }
    }, [detail, activeTodo])

    const handleTodoUpdate = (data) => {
        console.log("SOCKET handleTodoUpdate -> data", data)
        let length = _.size(data)
        if (data && data.length && detail) {
            if (length === 1) {
                //to update detail of active todo only (broadcast purpose)
                let todo = _.first(data)
                if (activeTodo._id === todo.pmr?._id) {
                    // let allowed = false
                    // allowed = todo.participants.find(x => {
                    //     return x.userId === self.props.authUser.id && x.active
                    // })
                    // todo.allowed = !!allowed

                    setDetail(oldDetail => {
                        let newDetail = { ...oldDetail }
                        let todoList = [...oldDetail.todos];
                        let todoIds = _.map(todoList, "_id")
                        if (_.includes(todoIds, todo._id)) {
                            if (!todo.isActive) {
                                let i = todoList.findIndex(x => x._id === todo._id)
                                todoList.splice(i, 1)
                            } else {
                                afterPerformTodo(todo)
                                return
                            }
                        } else if (todo.isActive)
                            todoList.push(todo);
                        newDetail.todos = todoList
                        return newDetail
                    })

                }
            }
        }
    }

    const fetch = () => {
        //fetch todo detail
        if (actionLoader)
            setActionLoader(false)
        setLoader(true)
        const req = {
            "isOrderList": true,
            "query": {
                "fields": [],
                "populate": [
                    {
                        "homeAreaId": [
                            "name"
                        ]
                    }
                ]
            }
        };
        const { method, baseURL } = getPmrDetail
        let url = getPmrDetail.url + activeTodo?._id
        axios({ method, url, baseURL, data: req }).then(data => {
            console.log("fetch -> data", data)
            if (data.code === 'OK') {
                let newOrderList = filterOrders(data.data)
                data.data.orderList = newOrderList
                orderListRef.current = data.data.orderList || [];
                setDetail(data.data);
                setOrderList(data.data.orderList)
            }
            setLoader(false)
        }).catch(err => {
            setLoader(false)
        })
    }

    const filterOrders = (pmrDetail) => {
        let cloned = [], tempOriginal = [], newOrders = [...pmrDetail.orderList];
        newOrders.map(order => {
            if (order.cloneFrom) {
                cloned.push(order)
            } else {
                tempOriginal.push(order)
            }
        })
        cloned = _.groupBy(cloned, 'cloneFrom');

        if (pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1) {
            let assig = [], notAssig = []
            assig = tempOriginal.filter(x => x.nurseAcknowStatus1)
            notAssig = tempOriginal.filter(x => !x.nurseAcknowStatus1)
            tempOriginal = notAssig.concat(assig)
        } else if (pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2) {
            let assig = [], notAssig = []
            assig = tempOriginal.filter(x => x.nurseAcknowStatus2)
            notAssig = tempOriginal.filter(x => !x.nurseAcknowStatus2)
            tempOriginal = notAssig.concat(assig)
        } else if (pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.PMR) {
            let assig = [], notAssig = []
            assig = tempOriginal.filter(x => {
                let status = cloned[x._id] ? cloned[x._id][0].status : x.status
                return status === PMR_ORDER.STATUS["CONTINUE"] ||
                    status === PMR_ORDER.STATUS["HOLD"] || status === PMR_ORDER.STATUS["DISCONTINUE"]
            })
            notAssig = tempOriginal.filter(x => !assig.includes(x));
            tempOriginal = notAssig.concat(assig)
        }

        tempOriginal = tempOriginal.map(order => {
            let clonedOrders = [], clonedOrderObj = null
            order.isClonedExist = cloned[order._id] ? true : false
            clonedOrders.push(order)
            if (cloned[order._id]) {
                //order.isClonedExist = true
                clonedOrderObj = cloned[order._id][0]
                clonedOrders = clonedOrders.concat(cloned[order._id])

            }
            order.clonedOrders = clonedOrders;
            return order
        });
        return tempOriginal
    }

    const handleViewPresc = (visible) => {
        setVisibleViewer(visible)
    }

    const handlePerformTodo = (request) => {
        setActionLoader(true)
        axios({ ...performTodo, data: request }).then(data => {
            if (data.code === 'OK') {
                afterPerformTodo(data.data)
            }
            setActionLoader(false)
        }).catch(err => {
            setActionLoader(false)
        })
    }

    const afterPerformTodo = (todo) => {
        //to update detail of active todo only
        // let allowed = false
        // allowed = todo.participants.find(x => {
        //     return x.userId === self.props.authUser.id && x.active
        // })
        // todo.allowed = !!allowed
        let newDetail = { ...detail }
        newDetail.todos = _.map(detail.todos, function (td) {
            return todo._id === td._id
                ? {
                    ...td,
                    status: todo.status,
                    completedAt: todo.completedAt,
                    completedBy: todo.completedBy,
                    notesCount: todo.notesCount,
                }
                : td;
        });
        setDetail(newDetail)
    }

    const handlePrescribedFormUpdate = data => {
        console.log("SOCKET PrescribedFormUpdate", data)
        if (data._id === activeTodo._id) {
            setDetail(oldDetail => {
                let newDetail = { ...oldDetail }
                newDetail.attachments = data.attachments
                newDetail.inProcess = data.inProcess
                return newDetail
            })
        }
    }

    const handleOrderStatusChange = (status = '') => {
        let filteredOrders = [...orderListRef.current]
        if (status !== '') {
            filteredOrders = filteredOrders.filter(order => order.status == status);
        }
        setStatusFilter(status);
        setOrderList(filteredOrders)
    }

    return <>
        <div className="tododetails ">
            {
                loader ? <Spin spinning={loader} str="center" /> :
                    detail ?
                        <>
                            <PatientInfoBar patient={detail.patientId} orderNumber={detail.orderNumber} />
                            <div className="todo-listing">
                                <div className=" listingOverflow" style={{ width: '49.4%' }}>
                                    <div style={{ width: '100%', marginBottom: 15 }}>
                                        <Select
                                            value={statusFilter}
                                            onChange={handleOrderStatusChange}
                                            allowClear
                                        >
                                            <Option value={''} > All </Option>
                                            {Object.keys(ORDER_STATUS)
                                                .filter(x => x === 'HOLD' || x === 'DISCONTINUE' || x === 'CONTINUE')
                                                .map(v => (
                                                    <Option
                                                        key={ORDER_STATUS[v]}
                                                        value={ORDER_STATUS[v]}
                                                    >
                                                        {v.replace(/_/g, " ")}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </div>
                                    <div className="form" style={{ width: '100%', overflowY: 'auto' }}>
                                        <div className='prep_right_wrap' style={{ marginLeft: 0, width: '100%', padding: 0 }}>

                                            {
                                                orderList.length > 0 ?
                                                    orderList?.map(order => {
                                                        return <div className='resident-row'>
                                                            <div className="right-Nurse-prep resident-detail rate-box"
                                                                style={{ width: '100%', borderBottom: '1px solid #d4d4d4' }}>
                                                                {
                                                                    order.clonedOrders.map((corder, orderIndex) => {
                                                                        return <PmrOrder
                                                                            key={corder._id}
                                                                            pmrOrder={corder}
                                                                            detail={detail}
                                                                            query={{}}
                                                                            authUser={authUser}
                                                                            viewNotes={true}
                                                                            isMedTodo={true}
                                                                        />
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        // let pmrLabel = { label: '', color: '' }
                                                        // if (pmrOrder.label) {

                                                        //     pmrLabel.color = pmrOrder.label === PMR_ORDER_LABEL.CHANGED
                                                        //         ? PMR_ORDER_COLOR.TAG.CHANGED
                                                        //         : pmrOrder.label === PMR_ORDER_LABEL.NEW
                                                        //             ? PMR_ORDER_COLOR.TAG.NEW
                                                        //             : pmrOrder.label === PMR_ORDER_LABEL.NEW_EDIT
                                                        //                 ? PMR_ORDER_COLOR.TAG.NEW_EDIT
                                                        //                 : ""
                                                        // }

                                                        // Object.keys(PMR_ORDER_LABEL).map(label => {
                                                        //     return PMR_ORDER_LABEL[label] === pmrOrder.label
                                                        //         ? pmrLabel.label = label.replace(/_/g, " ")
                                                        //         : "";
                                                        // })
                                                        // return (
                                                        //     <div className='resident-row'>
                                                        //         <div className='resident-detail rate-box' style={{ width: '100%', borderBottom: '1px solid #d4d4d4' }}>
                                                        //             <div className="inner-res-block d-flex">
                                                        //                 <div className="resident-desc-box w-d-50">
                                                        //                     <span className="main">Order</span>
                                                        //                     <span className="sub">
                                                        //                         {pmrOrder.drug?.name}
                                                        //                         <p className="order-tag red-new-tag">{pmrLabel.label}</p></span>
                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">
                                                        //                     <span className="main">Rx No</span>
                                                        //                     <span className="sub">   {pmrOrder.krollRxNo || pmrOrder.orderNumber}</span>
                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">
                                                        //                     <span className="main">DIN</span>
                                                        //                     <span className="sub">{pmrOrder.din || "NA"}</span>
                                                        //                 </div>
                                                        //             </div>
                                                        //             <div className="inner-res-block d-flex">
                                                        //                 <div className="resident-desc-box w-d-50">
                                                        //                     <span className="main">Equiv. to</span>
                                                        //                     <span className="sub">{pmrOrder.drug?.equivTo}</span>
                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">
                                                        //                     <span className="main">Last Fill</span>
                                                        //                     <span className="sub">{pmrOrder.lastFillDate &&
                                                        //                         pmrOrder.krollStatus !== "RxStatus_Unfill"
                                                        //                         ? displayDate(pmrOrder.lastFillDate)
                                                        //                         : " NA "}</span>
                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">
                                                        //                     <span className="main">Exp</span>
                                                        //                     <span className="sub">  {pmrOrder.luCode?.[0]?.expiryDateString || 'NA'}</span>
                                                        //                 </div>
                                                        //             </div>
                                                        //             <div className="inner-res-block d-flex">
                                                        //                 <div className="resident-desc-box w-d-50">
                                                        //                     <span className="main">Source</span>
                                                        //                     <span className="sub">{pmrOrder.source}</span>
                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">
                                                        //                     <span className="main">LU code</span>
                                                        //                     <span className="sub">NA</span>
                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">
                                                        //                     <span className="main">Indication</span>
                                                        //                     <span className="sub">{pmrOrder.indication || '-'}</span>
                                                        //                 </div>
                                                        //             </div>
                                                        //             <div className="inner-res-block d-flex">
                                                        //                 <div className="resident-desc-box w-d-50">
                                                        //                     <span className="main">Direction</span>
                                                        //                     <span className="sub">
                                                        //                         {pmrOrder.sig || pmrOrder.direction}
                                                        //                     </span>
                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">

                                                        //                 </div>
                                                        //                 <div className="resident-desc-box w-d-25">
                                                        //                     <span className="main"></span>
                                                        //                     <span className="sub"></span>
                                                        //                 </div>
                                                        //             </div>
                                                        //         </div>
                                                        //     </div>
                                                        // )
                                                    })
                                                    :
                                                    <NoData />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='listing-right'>
                                    <TodoActions
                                        category={TODO_CATEGORY.MED_REVIEW}
                                        todoList={detail.todos}
                                        loading={actionLoader}
                                        onPerformTodo={handlePerformTodo}
                                        authUser={authUser}
                                        detail={detail}
                                    />
                                </div>
                            </div></>
                        : null
            }
        </div >
    </>

}
const mapStateToProps = ({ auth }) => {
    const { authUser, socket } = auth;
    return { authUser, socket };
};
export default withRouter(connect(mapStateToProps)(PrescriptionContainer));