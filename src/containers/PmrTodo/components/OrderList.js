import React, { Component, useEffect, useState, useMemo } from 'react';
import { displayDateTime } from '../../../util/moment'
import { Input, Search, Spin, Toast, ConfirmPopup } from '../../../components/common/index';
import DiscontActionModal from '../../../components/common/Popup/action-popup';
import { SUB_CATEGORY, STATUS } from '../../../constants/todo';
import PmrOrder from './PmrOrder'
import _ from 'lodash'
import { isDrOrderView, isNrAck, isUndoAck, getOrdersLength } from '../../../util/pmr'
import { PMR_ORDER, KROLL_ORDER_STATUS } from '../../../constants/pmr'
import moment from 'moment'
import { displayPmrProcess } from '../../../util/todo';
function getCheckedDC(order) {
    // To get Discont order for D/C & New , D/C Edit 
    let cloned = []
    cloned = order.clonedOrders.filter(x => x.cloneFrom)
    // if cloned then take status of cloned order
    let status = cloned.length ? cloned[0].status : order.status
    return status
}

const lower = (val = '') => val.trim().toLowerCase();

const TableHeader = ({ query, authUser }) => {

    return <> {
        isDrOrderView(query.subCategory, authUser) ?
            <div className="flex-block bb head-ack" >
                <div className="rate-box RPN-block">
                    <span className="order-d-text">Order</span>
                </div>
                <div className="ack-block pt-10"><span>Cont.</span></div>
                <div className="ack-block pt-10"><span>D/C</span></div>
                <div className="ack-block pt-10"><span>Hold</span></div>
            </div > :
            <div className="flex-block bb bt head-ack">
                <div className="rate-box RPN-block"><span className="order-d-text">Order</span>
                </div>
                <div className="ack-block pt-10"><span>Ack</span></div>
                <div className="ack-block pt-10"><span>Edit</span></div>
            </div>
    }
    </>
}

const OrderList = props => {
    const { detail, setAddModalVisible, orderListLoader, isEditMode, activeTodo,
        onAddOrder, onEditOrder, onNurseAck, onDrAck, query, authUser, onUpdateOrder, onAllNurseAck, handleOrderRef } = props;

    const originalRef = React.useRef([])
    const [search, setSearch] = useState('')
    const [original, setOriginal] = useState([])
    const [visibleDCOrder, setVisibleDCOrder] = useState(false)
    const [orderStatus, setOrderStatus] = useState(0)
    const [curOrder, setCurOrder] = useState(null)
    const [confirmMsg, setConfirmMsg] = useState('')
    const isAllAck = useMemo(() => getOrdersLength(detail.orderList) === detail.completedOrder)

    useEffect(() => {

        if (detail.orderList) {
            let orderList = _.cloneDeep(detail.orderList)
            let cloned = [], tempOriginal = [];
            orderList.map(order => {
                if (order.cloneFrom) {
                    cloned.push(order)
                } else {
                    tempOriginal.push(order)
                    // console.log("original", original)
                }
            })
            cloned = _.groupBy(cloned, 'cloneFrom');

            if (detail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1) {
                let assig = [], notAssig = []
                assig = tempOriginal.filter(x => x.nurseAcknowStatus1)
                notAssig = tempOriginal.filter(x => !x.nurseAcknowStatus1)
                tempOriginal = notAssig.concat(assig)
            } else if (detail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2) {
                let assig = [], notAssig = []
                assig = tempOriginal.filter(x => x.nurseAcknowStatus2)
                notAssig = tempOriginal.filter(x => !x.nurseAcknowStatus2)
                tempOriginal = notAssig.concat(assig)
            } else if (detail.subCategory === SUB_CATEGORY.MED_REVIEW.PMR) {
                let assig = [], notAssig = []
                assig = tempOriginal.filter(x => {
                    let status = cloned[x._id] ? cloned[x._id][0].status : x.status
                    return status === PMR_ORDER.STATUS["CONTINUE"] ||
                        status === PMR_ORDER.STATUS["HOLD"] || status === PMR_ORDER.STATUS["DISCONTINUE"]
                })
                notAssig = tempOriginal.filter(x => !assig.includes(x));
                tempOriginal = notAssig.concat(assig)
            }

            tempOriginal.map(order => {
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
            originalRef.current = [...tempOriginal];
            setOriginal(tempOriginal)
        }

    }, [detail])

    const handleNurseAck = (e, params) => {
        if (!showDivDisable(e))
            return
        const { order } = params
        let type = params.type
        if (type === 'EDIT BY NURSE') {
            onEditOrder(params)
            return
        }
        type = isUndoAck({
            order, detail, defaultToDoCategory: query.subCategory
        }) ? 'UNDO BY NURSE' : 'ACK BY NURSE'

        let request = {
            "pmrOrderId": order._id,
        }

        if (type === 'ACK BY NURSE') {
            request.nurseAcknowStatus = true
            console.log("handleNurseAck -> request", request)
            onNurseAck(request)
        } else if (type === 'UNDO BY NURSE') {
            request.nurseAcknowStatus = false
            onNurseAck(request)
        }
    }

    const handleSearch = e => {
        const searchTerm = lower(e.target.value);
        const originalData = [...originalRef.current];
        const filtered = originalData.filter(data => {
            return lower(data?.drug?.name).includes(searchTerm.trim())
        });
        setOriginal([...filtered]);
    }
    const handleDrAck = (e, params) => {
        if (!showDivDisable(e))
            return
        let { order } = params
        let newOrderStatus = Number(e.target.value)
        let prevent = preventOrderUpdate(order, newOrderStatus)
        if (prevent)
            return

        setOrderStatus(newOrderStatus)
        if (newOrderStatus === PMR_ORDER.STATUS.CONTINUE &&
            order.krollOrderStatus !== KROLL_ORDER_STATUS.SUSPENDED) {
            // Continue order
            updateOrderStatus(newOrderStatus, order)

        }
        else if (newOrderStatus === PMR_ORDER.STATUS.CONTINUE &&
            order.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED) {
            // Continue order & Suspended
            handleVisibleDC(true, order)
            setOrderStatus(newOrderStatus)
        }
        else if (newOrderStatus === PMR_ORDER.STATUS.DISCONTINUE) {
            handleVisibleDC(true, order)
        }
        else if (newOrderStatus === PMR_ORDER.STATUS.HOLD &&
            order.krollOrderStatus !== KROLL_ORDER_STATUS.SUSPENDED) {
            // Hold order
            updateOrderStatus(newOrderStatus, order)

        } else if (newOrderStatus === PMR_ORDER.STATUS.HOLD &&
            order.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED) {

            // Hold order && suspended
            handleVisibleDC(true, order)
            setOrderStatus(newOrderStatus)
        }
    }

    const handleVisibleDC = (visible, ordreObj, subact, date) => {
        //handle discontinue actions
        setVisibleDCOrder(visible)
        setCurOrder(ordreObj)
        if (subact) {
            if (subact === PMR_ORDER.STATUS.CONTINUE)
                updateOrderStatus(PMR_ORDER.STATUS.CONTINUE, curOrder)
            else if (subact === 'SUSPEND')
                updateOrderStatus('SUSPEND', curOrder)
            else if (subact === PMR_ORDER.STATUS.HOLD)
                updateOrderStatus(PMR_ORDER.STATUS.HOLD, curOrder, date)
            else if (subact === 'DC')
                updateOrderStatus(PMR_ORDER.STATUS.DISCONTINUE, curOrder)
            else if (subact === 'EDIT')
                onEditOrder({ type: PMR_ORDER.STATUS.DISCONTINUE, order: curOrder })
            else if (subact === 'DC_NEW')
                onEditOrder({ type: PMR_ORDER.STATUS.DISCONTINUE, order: curOrder, isdcNew: true })
        }
    }

    const updateOrderStatus = (status, order, date) => {
        setCheckedDc(status, order) // to set radio value
        //prepare request for doctor ack
        let request = {
            "pmrOrderId": order._id,
            "docStatusUpdate": status,
            "status": status
        }
        if (order.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED) {

            if (status === PMR_ORDER.STATUS.CONTINUE &&
                order.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED) {
                // Continue order
                request = {
                    ...request,
                    "docStatusUpdate": PMR_ORDER.STATUS.CONTINUE,
                    "status": PMR_ORDER.STATUS.CONTINUE,
                }
            }
            else if (status === 'SUSPEND' &&
                order.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED) {
                // Continue to Suspend order
                request = {
                    ...request,
                    "docStatusUpdate": PMR_ORDER.STATUS.HOLD,
                    "status": PMR_ORDER.STATUS.HOLD,
                }
            }
            else if (status === PMR_ORDER.STATUS.HOLD && date &&
                order.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED) {
                //    Hold Order Until Date
                // this.setState({ visibleOrderStatus: '' })
                request = {
                    ...request,
                    "docStatusUpdate": status,
                    "status": PMR_ORDER.STATUS.HOLD,
                    "holdUntil": moment(date).toISOString()
                }
            }
            else if (status === PMR_ORDER.STATUS.HOLD &&
                order.krollOrderStatus === KROLL_ORDER_STATUS.SUSPENDED) {
                //    Hold Order 
                request = {
                    ...request,
                    "docStatusUpdate": status,
                    "status": PMR_ORDER.STATUS.HOLD,
                }
            }
            else if (status === PMR_ORDER.STATUS.DISCONTINUE) {
                request = {
                    ...request,
                    "subActionType": PMR_ORDER.SUB_ACTION.DISCONTINUE,
                    "status": PMR_ORDER.STATUS.DISCONTINUE,
                }
            }
        }
        handleVisibleDC(false)
        onDrAck(request)
    }

    const setCheckedDc = (e, order) => {
        let tempOrig = [...original]
        tempOrig.map(x => {
            if (x._id === order._id) {
                x.clonedOrders = x.clonedOrders.map(cx => {
                    if (cx._id === order._id) {
                        cx.status = e
                    }
                    return cx
                })
            }
            return x
        })
        setOriginal(tempOrig)
    }

    const preventOrderUpdate = (order, status) => {
        let cloned = []
        cloned = order.clonedOrders.filter(x => x.cloneFrom)
        if (cloned.length)
            order = cloned[0] //getting cloned orders

        //Prevent for already ack order with the same status
        if (status === order.status)
            return true
        else
            return false
    }

    const showDivDisable = (e) => {
        if (!detail.isDiv) {
            // if (!this.onNotesClick) {
            e.preventDefault()
            // Don't show message on 'Notes'
            Toast.warn("You do not have the permission to update the PMR order status");
            return false
            // }
        } else return true
    }

    const handleNurseAllAck = () => {
        setConfirmMsg(`Are you sure you want to proceed without changes?`)
    }

    return <>
        <div className="right-Nurse-prep w100">
            <div className="pro-title">
                <h3>{detail.pmrStatusUpdate?.latest?.message ||
                    displayPmrProcess(detail.pmrStatusUpdate?.latest)}
                    {
                        activeTodo?.todoDetail?.status === STATUS["UNDO"]
                            && detail.editExpireTime ?
                            ` can be edit until ${displayDateTime(detail.editExpireTime)}` : ''
                    }
                </h3>
                <div style={!detail.isDiv ? { pointerEvents: 'none', opacity: '0.5' } : { cursor: 'pointer' }} className="flex-block" onClick={() => setAddModalVisible(true)}>
                    <p className="green-bg mr-8">
                        <img src={require("../../NursePrep/img/plus.svg")} />
                    </p>
                    <span>Add New</span>
                </div>
            </div>
            <div className="med_ack">
                <div className='form_group search-box mb-0'>
                    <Search
                        allowClear={true}
                        placeholder='Medication'
                        style={{ width: '165px' }}
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                {
                    !isDrOrderView(query.subCategory, authUser) ?
                        <div className="ack-block" onClick={handleNurseAllAck}
                            style={(!detail.isDiv || orderListLoader || isAllAck) ? { pointerEvents: 'none', opacity: '0.5' } : null}
                        >
                            <div class="round" >
                                <input type="checkbox" id="checkbox2"
                                    checked={isAllAck} />
                                <label for="checkbox2"></label>
                            </div>
                            <span>Acknowledge all orders</span>
                        </div> : null
                }


            </div>

            <TableHeader query={query} authUser={authUser} />

            <div className="scroll-block" style={!detail.isDiv ? { opacity: '0.5' } : {}}>
                {/* start white section */}
                {
                    orderListLoader ?
                        <Spin str="center" spinning={orderListLoader} />
                        : original.map(order => {
                            return <div className="flex-block bb">
                                <div className="resident-detail rate-box">
                                    {
                                        order.clonedOrders.map((corder, orderIndex) => {
                                            return <PmrOrder
                                                key={corder._id}
                                                pmrOrder={corder}
                                                detail={detail}
                                                query={query}
                                                authUser={authUser}
                                                onUpdateOrder={onUpdateOrder}
                                                handleOrderRef={handleOrderRef}
                                            />

                                        })
                                    }
                                </div>
                                {
                                    isDrOrderView(query.subCategory, authUser) ?
                                        <>
                                            <div className="ack-block">
                                                <div className="round"
                                                    onClick={(e) => handleDrAck(e, { order: order })}
                                                >
                                                    <input type="checkbox" id={"cont" + order._id}
                                                        value={PMR_ORDER.STATUS.CONTINUE}
                                                        checked={getCheckedDC(order) === PMR_ORDER.STATUS.CONTINUE}
                                                    />
                                                    <label for={"cont" + order._id}></label>
                                                </div>
                                            </div>
                                            <div className="ack-block">
                                                <div className="round"
                                                    onClick={(e) => handleDrAck(e, { order: order })}
                                                >
                                                    <input type="checkbox" id={"dc" + order._id}
                                                        value={PMR_ORDER.STATUS.DISCONTINUE}
                                                        checked={getCheckedDC(order) === PMR_ORDER.STATUS.DISCONTINUE}
                                                    />
                                                    <label for={"dc" + order._id}></label>
                                                </div>
                                            </div>
                                            <div className="ack-block">
                                                <div className="round"
                                                    onClick={(e) => handleDrAck(e, { order: order })}                                                >
                                                    <input id={"hold" + order._id} type="checkbox"
                                                        value={PMR_ORDER.STATUS.HOLD}
                                                        checked={getCheckedDC(order) === PMR_ORDER.STATUS.HOLD ? true : false}
                                                    />
                                                    <label for={"hold" + order._id}></label>
                                                </div>
                                            </div>
                                        </>
                                        : <>
                                            <div className="ack-block">
                                                <div className="round"
                                                    onClick={(e) => handleNurseAck(e, { order: order })}>
                                                    <input type="checkbox" id="checkbox1"
                                                        checked={isNrAck(detail, order, query.subCategory)} />
                                                    <label for="checkbox1"></label>
                                                </div>
                                            </div>
                                            <div className="ack-block">
                                                {
                                                    !isNrAck(detail, order, query.subCategory) &&
                                                    <div className="round"
                                                        onClick={(e) => handleNurseAck(e, { type: 'EDIT BY NURSE', order: order })}>
                                                        <input type="checkbox" />
                                                        <label ></label>
                                                    </div>
                                                }
                                            </div>
                                        </>
                                }

                            </div>
                        })
                }
            </div>
        </div>
        {
            visibleDCOrder ?
                <DiscontActionModal
                    visible={visibleDCOrder}
                    onCancel={(subact, date) => handleVisibleDC(false, null, subact, date)}
                    onUpdateOrderStatus={updateOrderStatus}
                    order={curOrder}
                    orderStatus={orderStatus}
                />
                : null
        }
        {
            confirmMsg ?
                <ConfirmPopup
                    title={confirmMsg}
                    okText='Yes'
                    visible={!!confirmMsg}
                    onCancel={() => {
                        setConfirmMsg('')
                    }}
                    onOk={() => {
                        setConfirmMsg('')
                        onAllNurseAck()
                    }}
                /> : null
        }
    </>
}

export default OrderList