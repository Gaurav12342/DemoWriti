import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, message } from 'antd';
import { Card, Icon } from 'antd';
import axios from 'util/Api';
import Header from "./Header";
import Footer from "./Footer";
import { X_RAY_TODO_TYPES, TODO_STATUS, TODO_CATEGORY } from '../../../../constants/Common'
import moment from "moment"
import CircularProgress from "../../../../components/CircularProgress/index";
import { displayCatchErrorMsg, selectedBodyParts } from '../../../../services/util'
import { viewXRay, performXRayTodo } from '../../../../services/ApiRoutes'
import NotesModal from "./../../../../components/NotesModal"
import STLRequest from '../../List/Components/STLRequest'
import STLResponse from '../../List/Components/STLResponse'
import ResidentDetail from "../../../VirtualVisit/VirtualDetail/components/ResidentDetail";
const _ = require("lodash");

const XRayContainer = props => {
    let { defaultResidentId, todo, onTodoUpdate } = props
    let [viewNotesPopup, setViewNotesPopup] = useState(false)
    let [detail, setDetail] = useState(null)
    let [loading, setLoading] = useState(false)
    let [notesModal, setNotesModal] = useState(false)
    let [notesOptions, setNotesOptions] = useState(null)

    useEffect(() => {
        fetch()
        setViewNotesPopup(true)
    }, [defaultResidentId])

    useEffect(() => {
    }, [todo])

    useEffect(() => {
        if (viewNotesPopup && detail && detail.notesCount > 0 && defaultResidentId === detail.id) {
            viewNotes(true)
            setViewNotesPopup(false)
        }
    }, [detail, viewNotesPopup]);

    fetch = (params) => {
        //fetch x-ray detail
        setLoading(true)
        let { method, url } = viewXRay
        axios({ method, url: url + defaultResidentId }).then(({ data }) => {
            if (data.code === 'OK') {
                data.data.residentId.patientInfoId = data.data.residentInfoId
                data.data = selectedBodyParts(data.data)
                setDetail(data.data)
            } else {
                message.error(data.message)
            }
            setLoading(false)
        }).catch((error) => {
            displayCatchErrorMsg(error)
            setLoading(false)
        });
    }

    const viewNotes = (visible, str) => {
        if (visible) {
            if (defaultResidentId === detail.id) {
                let options = {
                    xRayRequestId: detail.id,
                    category: TODO_CATEGORY.X_RAY,
                    subCategory: X_RAY_TODO_TYPES.GENERAL,
                    todoId: detail.id,
                }
                setNotesOptions(options)
            }
        } else {
            setNotesOptions(null)
            setViewNotesPopup(false)
        }
        setNotesModal(visible)
    }

    const onAddNotes = () => {
        setDetail({ ...detail, notesCount: detail.notesCount + 1 })
    }

    const handlePerformToDo = () => {
        let self = this
        setLoading(true)
        let { method, url } = performXRayTodo
        let request = {
            todoType: X_RAY_TODO_TYPES["X_RAY_RESULT"],
            xRayRequestId: detail.id,
            date: moment().format('MM/DD/YYYY'),
            time: moment().format('HH:mm'),
            undo: todo && todo.status === TODO_STATUS["COMPLETED"] ? true : false,
            notApplicable: false
        }
        axios({ method, url, data: request }).then(({ data }) => {
            if (data.code === 'OK') {
                message.success(data.message)
                let options = {
                    completedAt: data.data.completedAt,
                    status: data.data.status
                }
                onTodoUpdate(options)
                fetch()
            } else {
                message.error(data.message)
                setLoading(false)
            }
        }).catch((error) => {
            displayCatchErrorMsg(error)
            setLoading(false)
        });
    }

    return (<React.Fragment>
        {loading ? (<div className="gx-loader-view">
            <CircularProgress spin={true} />
        </div>) : detail && (
            <main className="gx-layout-content ant-layout-content">
                {detail &&
                    <Header detail={detail} todo={todo}
                        performToDo={handlePerformToDo}
                    ></Header>}
                <Row gutter={2}>
                    <Col span={12}>
                        <div className="PatientDetails"
                            style={{ height: 'calc(100vh - 130px)', overflowY: 'auto' }}>
                            <Card type="inner" className="DetailCards"
                                title={(<>
                                    <div style={{ float: 'left' }}>Request</div>
                                    <div style={{ float: 'right', color: '#fa5a5c', display: 'flex', alignItems: 'center', textDecoration: 'underline' }}>
                                        <a onClick={() => viewNotes(true)}><Icon type="file-text" />{detail.notesCount} Notes</a>
                                    </div>
                                </>)}>
                                <STLRequest data={detail} />
                            </Card>
                            <ResidentDetail detail={detail} isXRay={true}
                            ></ResidentDetail>
                        </div>
                    </Col>

                    <Col span={12} className="PatientDetails"
                        style={{ height: 'calc(100vh - 130px)', overflowY: 'auto' }}>
                        <Card type="inner" title="Result" className="DetailCards">
                            <STLResponse data={detail} />
                        </Card>
                    </Col>

                </Row>

                {/* <Footer detail={detail} > </Footer> */}

                {
                    notesModal ? <NotesModal
                        isUpsertList={true}
                        // viewNotesPopup={this.viewNotesPopup}
                        visible={notesModal}
                        filterOptions={notesOptions}
                        onDelete={null}
                        onAddNotes={() => onAddNotes()}
                        onOk={() => viewNotes(false, "ok")}
                        onCancel={() => viewNotes(false, "cancel")}
                    /> : null
                }
            </main>
        )
        }

    </React.Fragment>
    )
}
const mapStateToProps = ({ auth, commonData, virtualVisit }) => {
    const { authUser } = auth;
    return { authUser, virtualVisit, socket: commonData.socket, }
};
export default connect(mapStateToProps)(XRayContainer);