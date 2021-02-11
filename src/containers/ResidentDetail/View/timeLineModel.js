
import { da } from 'date-fns/locale';
import React, { useState, useEffect, useRef } from 'react';
import { Table } from '../../../components/common';
import moment from 'moment'
import Modal from '../../../components/common/Popup/index';
import { MODULE } from '../../../constants/subscription';


const TimelineModel = (props) => {

    const { visible, title, onCancel, onClose, maskClosable, onOk, data ,handleTimelineView} = props
    const columns = [
        {
            title: "Type",
            // dataIndex: "Type",
            
            render: (text, record) => {
                let name =""
                if (record.module === MODULE.PMR) {
                    name ="Pmr"
                    
                }
                else if (record.module === MODULE.RX_ORDER) {
                    name = "Prescription"
                }
                else if (record.module === MODULE.X_RAY_US) {
                    name = "X-Ray"
                }
                else if (record.module === MODULE.RESIDENT_DOCUMENT) {
                    name = "Resident-Document"
                }
                else if (record.module === MODULE.E_PROCESSING) {
                    name = "E-Processing"
                }   
               return <a onClick={()=>handleTimelineView(record)}>{name}</a>
            }
        },
        {
            title: "OrderNumber",
            dataIndex: "title",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text || "-"}</span>
            )
        }]
    return (<>
        <Modal
            visible={visible}
            title={moment(data[0].updatedAt).format('MM-DD-YYYY')}
            onCancel={onCancel}
            onClose={onClose}
            maskClosable={maskClosable}
            onOk={onOk}
            footer={null}
            style={{ width: '40%' }}
        >
            <div>
                <Table
                    datasource={data}
                    columns={columns}
                    pagination={false}
                />

            </div>
        </Modal>
    </>
    )
}
export default TimelineModel