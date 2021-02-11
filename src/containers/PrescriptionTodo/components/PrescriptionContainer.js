import React, { Component, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios, { getRxImage } from '../../../services/api/services/common'
import { getPrescriptionDetail, performTodo } from '../../../services/api/routes/prescriptionTodo'
import { PatientInfoBar, TodoActions, PendingTodo } from '../../../components/Todo';
import { Spin, LightBox, NoData } from '../../../components/common'
import { getPath } from '../../../util/todo'
import _ from 'lodash'
import { prescriptionFormCheck, todoUpdate, prescriptionUpdate } from '../../../services/socket/routes/todo'
import { TODO_CATEGORY, STATUS } from '../../../constants/todo';
import { TYPE } from '../../../constants/prescription'
import Medication from './Medications'
import { Refresh1 } from '../../../assets/images/pmr/index';

const PrescriptionContainer = props => {

    const { activeTodo, socket, authUser } = props
    const [loader, setLoader] = useState(false)
    const [visibleViewer, setVisibleViewer] = useState(false)
    const [actionLoader, setActionLoader] = useState(false)
    const [detail, setDetail] = useState(null)
    const [imageLoader, setImageLoader] = useState(false)

    useEffect(() => {
        if (activeTodo)
            fetch()
        else
            setDetail(null)
    }, [activeTodo])

    // useEffect(() => {
    //     prepareAttachments()
    // }, [detail])

    useEffect(() => {
        //need to give ref of detail
        if (!detail || !activeTodo)
            return
        if (socket) {
            socket.on(todoUpdate, handleTodoUpdate)
            // socket.on(prescriptionFormCheck, afterPerformTodo)
            socket.on(prescriptionUpdate, handlePrescribedFormUpdate)
            return () => {
                socket.off(todoUpdate);
                socket.off(prescriptionUpdate);
            };
        }
    }, [detail, activeTodo])

    const prepareAttachments = useMemo(() => {
        let imageViewer = [], path = null;
        if (detail?.attachments?.length > 0) {
            path = detail.attachments.find(x => x.sequence === Math.max(..._.map(detail.attachments, 'sequence'))).path
            imageViewer = _.reverse(_.map(detail.attachments, function (a) {
                a.src = a.path
                return a
            }));
        }
        return { imageViewer, path }
    }, [detail])
    const { imageViewer, path } = prepareAttachments

    const handleTodoUpdate = (data) => {
        console.log("SOCKET handleTodoUpdate -> data", data)
        if (!activeTodo || !data || !detail)
            return
        // if (typeof data === 'object') {
        //     // to update after todo actions are performed
        //     let todo = { ...data }
        //     if (activeTodo._id === todo._id) {
        //         afterPerformTodo(todo)
        //         return
        //     }
        // }
        let length = _.size(data)
        if (data && data.length) {
            if (length === 1) {
                // After prescription create and delete
                //to update detail of active todo only (broadcast purpose)
                let todo = _.first(data)
                if (activeTodo?._id === todo.prescriptionId?._id) {
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
                            // if (todo.status === STATUS["CANCELLED"]) {
                            if (!todo.isActive) {
                                //delete todo
                                let i = todoList.findIndex(x => x._id === todo._id)
                                todoList.splice(i, 1)
                            } else {
                                //update
                                afterPerformTodo(todo)
                                return
                            }
                        } else if (todo.isActive) {
                            // } else if (todo.status !== STATUS["CANCELLED"]) {
                            //add todo (second check)
                            todoList.push(todo);
                        }
                        newDetail.todos = todoList
                        newDetail.inProcess = todo.prescriptionId.inProcess;
                        return newDetail
                    })

                }
            } else {
                // prescription cancellation
                setDetail(oldDetail => {
                    let newDetail = { ...oldDetail }
                    let todoList = [...oldDetail.todos];
                    todoList.map(todo => {
                        if (todo.prescriptionId?._id === activeTodo?._id) {
                            if (todo.status === STATUS["CANCELLED"]) {
                                let i = todoList.findIndex(x => x.id === todo._id)
                                todoList.splice(i, 1)
                            }
                        }
                    })
                    newDetail.todos = todoList
                    return newDetail
                })
            }
        }
    }

    const fetch = () => {
        //fetch todo detail
        if (actionLoader)
            setActionLoader(false)
        setLoader(true)
        const req = { prescriptionId: activeTodo?._id }
        axios({ ...getPrescriptionDetail, data: req }).then(data => {
            if (data.code === 'OK') {
                if (data.data.attachments?.length > 0 && (data.data.type === TYPE.FTT
                    || data.data.type === TYPE.THIRD_PARTY)) {
                    getRxImage([data.data._id]).then(res => {
                        if (res?.[0])
                            data.data.attachments = res[0].attachments
                        setDetail(data.data)
                    }).catch(err => { })
                } else
                    setDetail(data.data)
            }
            setLoader(false)
        }).catch(err => {
            setLoader(false)
        })
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
        newDetail.inProcess = todo.prescriptionId.inProcess
        setDetail(newDetail)
    }

    const handlePrescribedFormUpdate = data => {
        console.log("SOCKET PrescribedFormUpdate", data)
        if (data?._id === activeTodo?._id && detail) {
            setDetail(oldDetail => {
                let newDetail = { ...oldDetail }
                newDetail.attachments = data.attachments
                newDetail.inProcess = data.inProcess
                return newDetail
            })
        }
    }

    const handleRefreshPresc = () => {
        setImageLoader(true)
        let tempDetail = { ...detail }
        if (tempDetail.attachments?.length > 0 && tempDetail.type === TYPE.FTT) {
            getRxImage([tempDetail._id]).then(res => {
                if (res?.[0])
                    tempDetail.attachments = res[0].attachments
                setDetail(tempDetail)
                setImageLoader(false)
            }).catch(err => {
                console.log(err)
                setImageLoader(false)
            })
        }
    }

    return <>
        <div className="tododetails ">
            {
                loader ? <Spin spinning={loader} str="center" /> :
                    detail ?
                        <>
                            <PatientInfoBar patient={detail.residentId || {}} orderNumber={detail.orderNumber} />
                            < div className="todo-listing">
                                <div className="form ">
                                    {
                                        detail.inProcess && detail.type === TYPE.FTT ?
                                            <div className="img_process_tag">Prescription Image Processing</div>
                                            : null
                                    }
                                    {
                                        detail.type === TYPE.COE ?
                                            <Medication detail={detail} />
                                            : <>
                                                <div className="form-title">
                                                    <h5>
                                                        {`View ${detail.type === TYPE.THIRD_PARTY ? 'E-Processing' : 'Prescription'} - ${detail.orderNumber}`}
                                                        {!detail.inProcess && detail.type === TYPE.FTT ?
                                                            <span className="refresh" onClick={handleRefreshPresc}> <a> <Refresh1 /></a></span>
                                                            : null}
                                                    </h5>
                                                    <span className="zoom-in" onClick={() => handleViewPresc(true)}>zoom in</span>
                                                </div>

                                                <div className="pres_img">
                                                    {imageLoader ?
                                                        <Spin spinning={imageLoader} str="center" />
                                                        : path ? <img src={path} alt="prescription" lazy />
                                                            : null
                                                    }
                                                    {/* <img src={require('../../../assets/images/todo/form.png')} alt="prescription" /> */}
                                                </div>
                                            </>
                                    }
                                </div>
                                <div className='listing-right'>
                                    <TodoActions
                                        category={TODO_CATEGORY.PRESCRIPTION}
                                        todoList={detail.todos}
                                        loading={actionLoader}
                                        onPerformTodo={handlePerformTodo}
                                        authUser={authUser}
                                        detail={detail}
                                    />
                                </div>
                            </div></>
                        : <NoData />
            }
        </div >
        {visibleViewer && imageViewer.length > 0 ?
            <LightBox visible={visibleViewer}
                images={imageViewer}
                onCloseRequest={() => handleViewPresc(false)}
                curImg={0} />
            : null
        }
    </>


}
const mapStateToProps = ({ auth }) => {
    const { authUser, socket } = auth;
    return { authUser, socket };
};
export default withRouter(connect(mapStateToProps)(PrescriptionContainer));