
import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Popup/index';
import {
    Input,
    Button,
    ErrorMsg,
} from '../../../components/common/index';
import { dateTimeFormat, displayDateTime } from '../../../util/moment';
import { head } from 'lodash';

const _ = require('lodash');

const DetailView = (props) => {
    const { isVisible, onClose, data } = props
    console.log("🚀 ~ file: DetailView.js ~ line 14 ~ DetailView ~ data", data)


    return (
        <>
            <Modal
                visible={isVisible}
                onCancel={onClose}

                cancelText='Close'
                isClose={true}
                maskClosable={true}
                width={1000}
            // okText={okText}
            // cancelText={cancelText}
            // okButtonProps={{ loading: loading }}
            >
                <div>
                    {
                        data ?
                            <div className="detail-view form_row">

                                <div>

                                    {/* {_.map(Object.keys(data), d => {
                                        if(typeof data[d] !== "object" && typeof data[d] !== "array"){
                                            <li>
                                                <label>{d}</label>:{data.d||''}
                                            </li>
                                        }
                                    })} */}
                                    <div>
                                        <label>URL</label> : {data.url || ''}
                                    </div>
                                    <div>
                                        <label>Requested Date</label> : {displayDateTime(data.createdAt) || ''}
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <label align="center">Request</label>{
                                            _.map(data.request, (r) => {
                                                return <>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <label>Method</label>:{r.method || ''}
                                                    </div>
                                                    <div>
                                                        <label>PatientId</label>:{r.qs?.patientId || '-'}
                                                    </div>
                                                    <div>
                                                        <label>pageSize</label>:{r.qs?.pageSize || '-'}
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                    <hr></hr>
                                    <div>

                                        <label align="center">Response</label>

                                        {
                                            _.map(data.response, (r) => {
                                                return <>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <label>Status</label>:{r.status || ''}
                                                    </div>
                                                    <div>
                                                        <label>Status Text</label>:{r.statusText || ''}
                                                    </div>

                                                    <div>
                                                        <label>PageSize</label>:{r.paging?.pageSize || ''}
                                                    </div>
                                                    <div>
                                                        <label>Has More</label>:{r.paging?.hasMore || '-'}
                                                    </div>
                                                    <div>
                                                        <label>Page</label>:{r.paging?.page || '-'}
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                    
                                    {data.response[0].data ? data.response[0].data.errors ?
                                        <div>
                                            <hr></hr>
                                            <div>
                                                <label>Code</label>:{data.response[0].data.errors[0].code}
                                            </div>
                                            <div>
                                                <label>Detail</label>:{data.response[0].data.errors[0].detail}
                                            </div>
                                            <div>
                                                <label>Id</label>:{data.response[0].data.errors[0].id}
                                            </div>
                                            <div>
                                                <label>Status</label>:{data.response[0].data.errors[0].status}
                                            </div>
                                            <div>
                                                <label>Title</label>:{data.response[0].data.errors[0].title}
                                            </div>
                                        </div>
                                        : null : null}

                                </div>


                            </div> : null
                    }
                </div>
            </Modal>
        </>
    );
}

export default DetailView