import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../services/api/services/common';
import { getPmrDetail } from '../../../services/api/routes/pmr';
import {
    PatientInfoBar,
    TodoActions,
    PendingTodo,
} from '../../../components/Todo';
import { Spin, LightBox, Toast, Dialog as Modal, NoData } from '../../../components/common';
import { isDrOrNp } from '../../../util/common';
import { displayDate, displayTime, displayDateTime } from '../../../util/moment';
import _ from 'lodash';
import {
    pmrPermissionUpdate,
    pmrOrderUpdate,
    pmrAllOrderUpdate
} from '../../../services/socket/routes/todo';
import { TODO_CATEGORY, STATUS, SUB_CATEGORY } from '../../../constants/todo';
import { USER_TYPE } from '../../../constants/User';
import { PMR_ORDER, KROLL_ORDER_TYPE } from '../../../constants/pmr';
import Header from './Header';
import Footer from './Footer';
import OrderList from './OrderList';
import {
    isDrOrderView,
    getOrdersLength,
    isCautionAlertNotes,
} from '../../../util/pmr';
import NurseBlock from '../../NursePrep/View/NurseBlock';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import CareClauseEditPopup from '../../../components/common/Popup/careclauseEdit-popup';
import CareClause from './CareClause';
import ResidentProfile from './ResidentProfile';
import AddNewPMRModal from './AddNewPMR';
import {
    ackNurse,
    ackDoctor,
    performTodo,
    nurseAllAck
} from '../../../services/api/routes/pmr';
import NotesModal from '../../../components/NotesPopup/List';
import moment from 'moment'

const PmrContainer = (props) => {
    const { activeTodo, socket, authUser, query, todoRef, onTodoRef } = props;
    const allOrderRef = React.useRef({})
    const [loader, setLoader] = useState(false);
    const [visibleViewer, setVisibleViewer] = useState(false);
    const [actionLoader, setActionLoader] = useState(false);
    const [orderListLoader, setOrderListLoader] = useState(false);
    const [detail, setDetail] = useState();
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState(0);
    const activePmrId = activeTodo?._id || '';
    const orderData = React.useRef(null);
    const [pmrRange, setPmrRange] = useState([]);
    const [attachmentArr, setAttachmentArr] = useState([]);
    const [visiblePrevPMR, setVisiblePrevPMR] = useState(false);
    const [standingOrder, setStandingOrder] = useState(false);
    const [prevPmrValData, setPrevPmrValData] = useState('prevPmrVal');
    const [curIndex, setCurIndex] = useState(0);
    const [attachment, setAttachment] = useState(null);
    const [visibleView, setVisibleViwer] = useState('visible');
    const [notesModal, setNotesModal] = useState(false);
    const [notesFilterOptions, setNotesFilterOptions] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const defaultToDoCategory = query.subCategory;
    const [isUpsertButtonUI, setIsUpsertButtonUI] = useState(false);
    const [editModeModal, setEditModeModal] = useState('');
    const mountRef = React.useRef(false);
    const performRef = React.useRef(false);
    const pmrOrderNoteRef = React.useRef(false);

    useEffect(() => {
        console.log("PmrContainer -> activeTodo", activeTodo)
        if (todoRef?.current) {
            //to avoid api call on update active todo
            onTodoRef()
            return
        }
        if (activeTodo) {
            fetch('mount');
            mountRef.current = true;
        } else {
            setDetail(null)
        }
    }, [activeTodo]);

    useEffect(() => {
        if (detail && activeTodo) {
            if (getEditMode(detail))
                afterFetchPmr(detail)
        }
    }, [detail, activeTodo]);

    useEffect(() => {
        //while mount
        if (mountRef.current && detail) {
            afterFetchPmr(detail, 'mount')
            mountRef.current = false
        }
    }, [detail]);

    useEffect(() => {
        //need to give ref of detail
        if (!detail || !activeTodo) return;
        if (socket) {
            socket.on(pmrOrderUpdate, handleOrderUpdate);
            socket.on(pmrAllOrderUpdate, (data) => {
                console.log("SOCKET -> pmrAllOrderUpdate data", data)
                if (data?.length > 0 && detail) {
                    const pmrId = data[0][_.first(_.keys(data[0]))].pmrId
                    if (pmrId === detail._id)
                        handleAllOrderUpdate(data)
                }
            });
            socket.on(pmrPermissionUpdate, handlePermissionUpdate);
            return () => {
                socket.off(pmrPermissionUpdate);
                socket.off(pmrOrderUpdate);
                socket.off(pmrAllOrderUpdate);
            };
        }
    }, [detail, activeTodo]);

    const handlePermissionUpdate = (res) => {
        // self.setState({ pmrDetailFlag: false })
        if (res.pmrId === detail?._id) {
            // let pmrDetail = _.cloneDeep(detail);
            // pmrDetail.isDiv = res.isDiv;
            // pmrDetail.isSave = res.isSave;
            // pmrDetail.subCategory = res.subCategory;
            // pmrDetail.completedOrder = res.completedOrder;
            // pmrDetail = setAccessPermission(pmrDetail);
            // setDetail(pmrDetail);
            setDetail(oldDetail => {
                let pmrDetail = { ...oldDetail };
                pmrDetail.isDiv = res.isDiv;
                pmrDetail.isSave = res.isSave;
                pmrDetail.subCategory = res.subCategory;
                pmrDetail.completedOrder = res.completedOrder;
                pmrDetail = setAccessPermission(pmrDetail);
                return pmrDetail
            });
        }
    };

    const setAccessPermission = (pmrDetail) => {
        if (
            authUser.type === USER_TYPE.HOME.NURSE &&
            ((defaultToDoCategory !== SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 &&
                defaultToDoCategory !== SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2) ||
                defaultToDoCategory !== pmrDetail.subCategory)
        ) {
            pmrDetail.isDiv = false;
            pmrDetail.isSave = false;

            if (
                defaultToDoCategory === SUB_CATEGORY.MED_REVIEW.PMR &&
                (pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 ||
                    pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2)
            ) {
                //NR1,NR2 not completed and category PMR then show completed order to 0
                pmrDetail.completedOrder = 0;
            } else if (
                defaultToDoCategory !== SUB_CATEGORY.MED_REVIEW.PMR &&
                (pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 ||
                    pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2 ||
                    pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.PMR)
            ) {
                //NR1,NR2 not completed and category not PMR then show completed order to 'all'
                pmrDetail.completedOrder = getOrdersLength(pmrDetail.orderList);
            }
        }

        if (
            authUser.type === USER_TYPE.HOME.PHYSICIAN &&
            defaultToDoCategory !== SUB_CATEGORY.MED_REVIEW.PMR
        ) {
            //NR1,NR2 not completed then show completed order to 0
            pmrDetail.completedOrder = getOrdersLength(pmrDetail.orderList);
        }

        if (
            isCautionAlertNotes(pmrDetail, defaultToDoCategory) &&
            !pmrDetail.isDiv
        ) {
            // PMR caution notes permission
            //set this condition always last
            // pmrDetail.isDiv = true;
        }

        return pmrDetail;
    };

    const fetch = (params) => {
        //fetch todo detail
        setLoader(true);
        const { method, baseURL } = getPmrDetail;
        let url = getPmrDetail.url + activePmrId;
        axios({
            method,
            url,
            baseURL,
            data: {
                isOrderList: true,
                query: {
                    fields: [],
                    populate: [
                        {
                            homeAreaId: ['name'],
                        },
                    ],
                },
            },
        })
            .then((data) => {
                if (data.code === 'OK') {
                    if (data.data._id !== activePmrId)
                        return
                    data.data = setAccessPermission(data.data)
                    setDetail(data.data);
                    setOrderListLoader(false)
                    // fetchPreviousPmr();
                    // if (isEditMode)
                    //     afterFetchPmr(data.data, params)
                }
                setLoader(false);
            })
            .catch((err) => {
                setLoader(false);
            });
    };

    const afterFetchPmr = (pmrDetail) => {
        if (pmrDetail?.notesCount && pmrDetail.notesCount > 0 && !performRef.current)
            createNotesModal()
        if (isDrOrNp(authUser)
            && pmrDetail.editExpireTime && pmrDetail.isDiv
            && ((activeTodo?.todoDetail?.status === STATUS["UNDO"] || isEditMode))
        ) {
            setEditModeModal(pmrDetail.editExpireTime)
        }
        if (performRef.current)
            performRef.current = false
    }

    const getEditMode = (pmrDetail) => {
        if (defaultToDoCategory === SUB_CATEGORY.MED_REVIEW["PMR"] &&
            pmrDetail.checkType === SUB_CATEGORY.MED_REVIEW["PMR"] &&
            activeTodo?.todoDetail?.status === STATUS["COMPLETED"] &&
            isDrOrNp(authUser) && authUser._id === activeTodo?.todoDetail?.completedBy?._id
        ) {
            //Edit Mode
            if (pmrDetail.editExpireTime >= moment().toISOString()) {
                setIsEditMode(true)
                return true
            } else {
                setIsEditMode(false)
                return false
            }
        }
        else {
            setIsEditMode(false)
            return false
        }
    }

    const handleViewPresc = (visible) => {
        setVisibleViewer(visible);
    };

    const afterPerformTodo = (todo) => {
        //to update detail of active todo only
        // let allowed = false
        // allowed = todo.participants.find(x => {
        //     return x.userId === authUser.id && x.active
        // })
        // todo.allowed = !!allowed
        setDetail((oldDetail) => {
            let newDetail = { ...oldDetail };
            newDetail.todos = _.map(oldDetail.todos, function (td) {
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
            newDetail.inProcess = todo.prescriptionId.inProcess;
            return newDetail;
        });
    };

    const handlePrescribedFormUpdate = (data) => {
        console.log('SOCKET PrescribedFormUpdate', data);
        if (data._id === activeTodo._id) {
            setDetail((oldDetail) => {
                let newDetail = { ...oldDetail };
                newDetail.attachment = data.attachment;
                newDetail.inProcess = data.inProcess;
                return newDetail;
            });
        }
    };

    const handleNurseAck = (request) => {
        console.log('handleNurseAck request => ', request);
        request.pmrId = detail._id;
        request.subCategory = detail.subCategory;
        console.log('handleNurseAck -> orderStatus', orderStatus, order);
        if (orderStatus === 'EDIT BY NURSE') {
            request.pmrOrderId = order._id;
            request.isEdit = true;
            let newOrder = null;
            if (order?.clonedOrders.length > 1) {
                let childOrder = order.clonedOrders[1];
                if (childOrder) newOrder = { ...childOrder };
            } else newOrder = { ...order };
            request = {
                ...request,
                rxNum: newOrder.krollRxNo || newOrder.orderNumber,
                source: newOrder.source,
            };
        }
        setOrderListLoader(true);
        const { method, url, baseURL } = ackNurse;
        axios({ method, url, baseURL, data: request })
            .then((data) => {
                if (data.code === 'OK') {
                    handleOrderUpdate(data.data);
                    setOrder(null);
                    setAddModalVisible(false);
                    orderData.current = null;
                    Toast.success(data.message);
                    if (orderStatus === 'EDIT BY NURSE') {
                        setTimeout(() => {
                            const currentEl = allOrderRef.current[order._id];
                            const rect = ReactDOM.findDOMNode(currentEl).getBoundingClientRect();
                            document.getElementsByClassName('scroll-block')[0].scrollTo(rect.top, rect.top - 350)
                        }, 1500);
                    }
                }
                setOrderListLoader(false);
            })
            .catch((err) => {
                setOrderListLoader(false);
            });
    };

    const handleEditOrder = (params) => {
        if (params.isdcNew) {
            setOrderStatus(params.type)
            setOrder(params.order)
        } else {
            orderData.current = params.order;
            if (params.order) {
                setOrderStatus(params.type)
                if (params.order.krollOrderType === KROLL_ORDER_TYPE.PMR) {
                    setOrder(params.order)
                    // setAddModalVisible(true);
                    setStandingOrder(false)
                } else if (params.order.krollOrderType === KROLL_ORDER_TYPE.STANDING) {
                    // Edit KROLL STANDING ORDER
                    setOrder(params.order)
                    setStandingOrder(true)
                }
            } else {
                setOrderStatus(0)
            }
        }
        setAddModalVisible(true);
    };

    const handleOrderUpdate = (res) => {
        if (!res || !detail) return;
        // self.setState({ pmrDetailFlag: false })
        if (res.pmrId === detail._id) {
            let orderList = [...detail.orderList];
            let orderIndex;
            if (res.cloneUpdated) {
                orderIndex = orderList.findIndex((x) => x._id === res.cloneUpdated._id);
                orderList[orderIndex] = res.cloneUpdated;
            }
            if (res.updated) {
                orderIndex = orderList.findIndex((x) => x._id === res.updated._id);
                orderList[orderIndex] = res.updated;
            }
            if (res.newOrder) {
                //    To avoid duplication of new order
                let orderIndexNew;
                orderIndexNew = orderList.findIndex((x) => x._id === res.newOrder._id);
                if (orderIndexNew >= 0) orderList[orderIndexNew] = res.newOrder;
                else orderList.unshift(res.newOrder);
            }
            setOrderStatus(0);
            setOrder(null);
            setDetail(oldDetail => ({ ...oldDetail, orderList }));
            setOrderListLoader(false);
        }
    };

    const handleAddOrder = (data) => {
        console.log('handleAddOrder -> data', data);
        handleOrderUpdate(data);
    };

    const handlePerformToDo = () => {
        setLoader(true);
        let request = {
            todoType: detail.subCategory,
            pmrId: detail._id,
            date: displayDate(Date.now()),
            time: displayTime(Date.now()),
            undo: isEditMode,
            notApplicable: false,
        };
        axios({ ...performTodo, data: request })
            .then((data) => {
                if (data.code === 'OK') {
                    Toast.success(data.message);
                    fetch();
                    performRef.current = true
                    // self.fetchPmrDetail(this.state.pmrDetail.isEditMode ? { type: "undo" } : {})
                } else {
                    Toast.error(data.message);
                }
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
            });
    };

    const handleDrAck = (request) => {
        setOrderListLoader(true);
        // this.setState({ orderListLoading: true, pmrDetailFlag: false })
        if (orderStatus === PMR_ORDER.STATUS.DISCONTINUE) {
            let newOrder = null;
            if (order?.clonedOrders.length > 1) {
                let childOrder = order.clonedOrders[1];
                if (childOrder) newOrder = { ...childOrder };
            } else newOrder = { ...order };
            request = {
                ...request,
                pmrOrderId: order._id,
                docStatusUpdate: orderStatus,
                status: orderStatus,
                subActionType: orderData?.current
                    ? PMR_ORDER.SUB_ACTION.EDIT
                    : PMR_ORDER.SUB_ACTION.DISCONTINUE_AND_CREATE_NEW,
                rxNum: newOrder.krollRxNo || newOrder.orderNumber,
                source: newOrder.source,
            };
        }
        request.pmrId = detail._id;
        request.subCategory = detail.subCategory;
        axios({ ...ackDoctor, data: request })
            .then((data) => {
                if (data.code === 'OK') {
                    Toast.success(data.message);
                    handleOrderUpdate(data.data);
                    setOrder(null);
                    setAddModalVisible(false);
                    orderData.current = null;
                    if (request.subActionType === PMR_ORDER.SUB_ACTION.EDIT) {
                        setTimeout(() => {
                            const currentEl = allOrderRef.current[order._id];
                            const rect = ReactDOM.findDOMNode(currentEl).getBoundingClientRect();
                            document.getElementsByClassName('scroll-block')[0].scrollTo(rect.top, rect.top - 350)
                        }, 1500);
                    }
                } else {
                    Toast.error(data.message);
                }
                setOrderListLoader(false);
            })
            .catch((error) => {
                setOrderListLoader(false);
            });
    };

    const fetchPreviousPmr = () => {
        let request = {
            patientId: detail.patientId._id,
        };
        axios
            .post(`admin/pmr/previous-pmr`, request)
            .then(({ data }) => {
                if (data.code === 'OK') {
                    // data.data[1] = {
                    //     attachments: [
                    //         {
                    //             path: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
                    //             printed: false,
                    //             revision: false
                    //         }
                    //     ],
                    //     id: "5df064603cfa2b3dedc07425",
                    //     pmrId: "001532",
                    //     pmrScheduleDate: { startDate: "2019-11-14T18:30:00.000Z", endDate: "2020-11-15T18:29:59.999Z" }
                    // }
                    setPmrRange(data.data);
                } else {
                    setPmrRange([]);
                }
            })
            .catch((error) => {
                console.log('Error:', error.message);
                setPmrRange([]);
            });
    };

    const handlePrevPMR = (val) => {
        if (val !== detail.id) {
            let pmrRangeData = [...pmrRange];
            pmrRangeData = pmrRangeData.filter((x) => x.id !== detail.id);
            let prevPMR = {};
            let attachmentArr = [];
            if (pmrRange.length) {
                // prevPMR = pmrRange.find(x => x.id === val)
                pmrRange.map((x, index) => {
                    if (x.attachments && x.attachments.length) {
                        let obj = {
                            id: x.id,
                            pmrId: x.pmrId,
                            path: x.attachments[0].path,
                            index: index,
                        };
                        attachmentArr.push(obj);
                    }
                });

                prevPMR = attachmentArr.find((x) => x.id === val);
            }
            if (attachmentArr.length) {
                setAttachmentArr(attachmentArr);
                setVisiblePrevPMR(true);

                // this.setState({
                //   attachmentArr: attachmentArr,
                //   prevPMR: prevPMR,
                //   visiblePrevPMR: true,
                // });
            }
        }
    };

    const visibleNotesModal = (visible, record, str, data) => {
        //notes modal close
        setNotesModal(visible);
        if (!visible && !pmrOrderNoteRef.current) {
            //do not update notes count for pmr orders
            setNotesFilterOptions({});
            if (isUpsertButtonUI) {
                let tempDetail = { ...detail }
                tempDetail.notesCount = data
                setDetail(tempDetail)
            }
        }
        if (pmrOrderNoteRef.current)
            pmrOrderNoteRef.current = false
    };
    const createNotesModal = (str) => {
        //view notes modal
        if (str === 'upsert')
            setIsUpsertButtonUI(true);
        let mergeNotesIds = [];
        if (str === 'order') {
            pmrOrderNoteRef.current = true
            _.map(detail?.orderList, (dd) => {
                mergeNotesIds.push(dd._id);
            });
        }

        let options = {
            query: {
                find: {
                    pmrId: str === 'order' ? undefined : detail?._id,
                    category: TODO_CATEGORY.MED_REVIEW,
                    residentId: detail?.patientId._id,
                    subCategory: str === 'order' ? undefined : SUB_CATEGORY.NOTES.GENERAL,
                    pmrOrderId: str === 'order' ? mergeNotesIds : undefined,
                },
                populate: [{ addedBy: [] }],
            },
        };
        setNotesFilterOptions(options);
        setNotesModal(true);
    };

    const handleUpdateOrder = (key, orderData) => {
        let pmrDetail = { ...detail }
        let index = pmrDetail.orderList.findIndex(x => x._id === orderData.orderId)
        if (index >= 0) {
            pmrDetail.orderList[index][key] = orderData.data
            setDetail(pmrDetail)
        }
    }

    const handleAllOrderUpdate = (orders) => {
        let orderList = [...detail.orderList], orderIndex
        orders.map((res, i) => {

            if (res.cloneUpdated) {
                orderIndex = orderList.findIndex((x) => x._id === res.cloneUpdated._id);
                orderList[orderIndex] = res.cloneUpdated;
            }
            if (res.updated) {
                orderIndex = orderList.findIndex((x) => x._id === res.updated._id);
                orderList[orderIndex] = res.updated;
            }
            if (res.newOrder) {
                //    To avoid duplication of new order
                let orderIndexNew;
                orderIndexNew = orderList.findIndex((x) => x._id === res.newOrder._id);
                if (orderIndexNew >= 0) orderList[orderIndexNew] = res.newOrder;
                else orderList.unshift(res.newOrder);
            }
        })
        setDetail(oldDetail => {
            return ({ ...oldDetail, orderList })
        });
        setOrderListLoader(false);
    }

    const handleAllNurseAck = () => {
        setOrderListLoader(true);
        let request = {
            "subCategory": detail.subCategory,
            "pmrId": detail._id,
            "nurseAcknowStatus": true
        }
        axios({ ...nurseAllAck, data: request }).then(data => {
            if (data.code === 'OK') {
                Toast.success(data.message);
                if (data.data?.length > 0) {
                    handleAllOrderUpdate(data.data)
                }
            } else {
                Toast.error(data.message);
            }
            setOrderListLoader(false);
        }).catch(err => {
            console.log("handleAllNurseAck -> err", err)
            setOrderListLoader(false);
        })
    }

    const handleOrderRef = (orderId, orderRef) => {
        allOrderRef.current = {
            ...allOrderRef.current,
            [orderId]: orderRef
        }
    }

    return (
        <>
            <div className='prep_right_wrap'>
                {loader ? (
                    <Spin spinning={loader} str='center' />
                ) : detail ? (
                    <>
                        <div className='box-border bb0'>
                            <Header
                                detail={detail} isEditMode={isEditMode}
                                onPrevPMRChange={handlePrevPMR}
                                prevPmrVal={setPrevPmrValData}
                                attachmentArr={attachmentArr}
                                onPerformTodo={handlePerformToDo}
                                activeTodo={activeTodo}
                            />
                            <div className='resident-row'>
                                <div className='left-resident-pro'>
                                    <ResidentProfile detail={detail} />
                                    <CareClause detail={detail} />
                                </div>
                                <OrderList
                                    detail={detail} isEditMode={isEditMode}
                                    orderListLoader={orderListLoader}
                                    setAddModalVisible={setAddModalVisible}
                                    onNurseAck={handleNurseAck}
                                    onDrAck={handleDrAck}
                                    onEditOrder={handleEditOrder}
                                    onAddOrder={handleEditOrder}
                                    onUpdateOrder={handleUpdateOrder}
                                    // onAddOrder={handleAddOrder}
                                    handleOrderRef={handleOrderRef}
                                    query={query}
                                    authUser={authUser}
                                    onAllNurseAck={handleAllNurseAck}
                                    activeTodo={activeTodo}
                                />
                            </div>
                        </div>
                        <div className=''>
                            <Footer onCreateNotesModal={createNotesModal} detail={detail} />
                        </div>
                    </>
                ) : <NoData />}
            </div>

            {!!addModalVisible && (
                <AddNewPMRModal
                    visible={addModalVisible}
                    onClose={() => {
                        orderData.current = null;
                        setAddModalVisible(false);
                        setStandingOrder(false)
                        setOrderStatus(0)
                    }}
                    detail={detail}
                    orderData={orderData.current}
                    onNurseAck={handleNurseAck}
                    onDrAck={handleDrAck}
                    onAddOrder={handleAddOrder}
                    standingOrder={standingOrder}
                    authUser={authUser}
                    orderStatus={orderStatus}
                />
            )}

            {notesModal && (
                <NotesModal
                    visible={notesModal}
                    filterOptions={notesFilterOptions}
                    onCancel={(data) => visibleNotesModal(false, null, 'cancel', data)}
                    // onOk={() => visibleNotesModal(false)}
                    isUpsertList={isUpsertButtonUI}
                    modalTitle={`View Note - ${detail?.pmrId}`}
                    xRayNumber={detail?.pmrId}
                    addData={{
                        residentId: detail?.patientId._id,
                        pmrId: detail?._id,
                        category: TODO_CATEGORY.MED_REVIEW,
                        subCategory: SUB_CATEGORY.NOTES.GENERAL
                    }}
                />
            )}

            {
                !!editModeModal ?
                    <Modal visible={!!editModeModal}
                        footer={null} style={{ width: '400px' }}
                        onCancel={() => setEditModeModal('')}>
                        <div style={{ marginTop: '25px' }}>
                            PMR is in edit mode and can be edit until {displayDateTime(editModeModal)}
                        </div>
                    </Modal> : null
            }
        </>
    );
};
const mapStateToProps = ({ auth }) => {
    const { authUser, socket } = auth;
    return { authUser, socket };
};
export default withRouter(connect(mapStateToProps)(PmrContainer));
