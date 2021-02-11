import React, { useState, useEffect } from 'react';
import { createForm, formShape } from 'rc-form';
import { Filters, DetailsLess, VerbalOrder, Todo, Cancel, Clarification, Edit } from '../../../../assets/images/resident-detail/index';
import { Refresh, View, Notes, Reminder, MoreDots, Audit } from '../../../../assets/images/pmr/index';
import { FirstPage, LastPage, Next, Prev } from '../../../../assets/images/index';

import AddNotesPopup from '../../../../components/common/Popup/addnotes-popup';
import AuditPopup from '../../../../components/common/Popup/audit-popup';
import ViewNotesPopup from '../../../../components/common/Popup/viewnotes-popup';
import ClarificationPopup from '../popup/Clarification';
import {
    DatePicker,
    DatePickerInput,
} from "rc-datepicker";
import { TabPanel } from 'react-tabs';
import { tabData } from "../../../../components/common/Tab/data";
import CommonTab from "../../../../components/common/Tab";
import TogglePane from "../togglePane";
import { Spin, Toast } from "../../../../components/common";
import Table from "../../../../components/common/Table/index";
import { Column_classNames } from "../../../../constants/Columns";
import Header from './Header'
import { capitalizeStr } from '../../../../util/common'
import { STATUS } from '../../../../constants/prescription'
import axios from '../../../../services/api/services/common'
import { getAllRxOrders } from '../../../../services/api/routes/prescription'
import { setUserData } from '../../../../appRedux/actions/Auth';

const OrderTab = (props) => {
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    });

    const columns = [
        {
            title: "Sr.No",
            classname: Column_classNames.sr,
            key: "index",
            width: "4%",
            render: (text, record, index) =>
                (filter.page - 1) * filter.limit + (index + 1),
        },
        {
            title: "Physician",
            dataIndex: "doctorId",
            // width:'20%',
            classname: Column_classNames.ph,
            key: "doctorId",
            render: (text, record) => <span>{capitalizeStr(text)}</span>,
        },
        {
            title: "Date & Time",
            dataIndex: "orderGeneratedAt",
            // width:'15%',
            classname: Column_classNames.dt,
            key: "orderGeneratedAt",
            render: (text, record) => <span>{text}</span>,
        },
        // {
        //   title: "Home Area",
        //   dataIndex: "homeAreaId.name",
        //   // width:'7%',
        //   classname: Column_classNames.pmr,
        //   key: "homeAreaId.name",
        //   render: (text, record) => <span>{text}</span>,
        // },
        {
            title: "Order Type",
            dataIndex: "type",
            // width:'20%',
            classname: Column_classNames.ot,
            render: (text, record) => <span>{text}</span>,
            key: "type",
        },
        {
            title: "Status",
            // width:'10%',
            dataIndex: "status",
            classname: Column_classNames.st,
            render: (text, record) => (
                <span>
                    {Object.keys(STATUS).map((k) => {
                        return STATUS[k] === text ? k : null;
                    })}
                </span>
            ),
            filters: [
                { text: "Active", value: 1 },
                { text: "De-Active", value: 2 },
                { text: "InterMediate", value: 3 },
            ],
            onFilter: (value, record) => record.isActive === value,
        },
        {
            title: "Actions",
            showRefresh: true,
            className: Column_classNames.Actions,
            render: (text, record) => {
                return (
                    <div className="refresh">
                        <a>
                            <Refresh />
                        </a>
                        <a>
                            <DetailsLess />
                        </a>

                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        setLoader(true)
        let res = axios({ ...getAllRxOrders, data: filter })
        if (res) {
            if (res.code === 'OK') {
                setData(res.data)
            } else Toast.error(res.message)
        }
        setLoader(false)
    }

    const handleTableChange = (pagination, filter, sorter) => {
        if (pagination) {
            setFilter({
                page: pagination.current,
                limit: pagination.pageSize,
            });
        }
    };

    const onShowSizeChange = (size) => {
        if (size) {
            setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
        }
    };

    const onSearch = () => {

    }

    const onDoctorChange = () => {

    }

    return (

        <div className="resi_treat_content_wrap">
            {/* <Spin spinning={true} colorCode={"#609fae"} str={"overlay center"}></Spin> */}


            <form action="">
                <Header onDoctorChange={onDoctorChange} onSearch={onSearch} />
            </form>
            <div className="responsive_scroll_wrap">
                <Table
                    columns={columns}
                    datasource={data}
                    pagination={false}
                    // descColumn="description"
                    // showDescription={true}
                    pagination={{
                        pageSize: filter.limit,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        total: data.length,
                    }}
                    loading={loader}
                    onChange={handleTableChange}
                />
                {/* <div className="patient_order_wrap od_tab_temp">
                                  
            </div> */}
                <div className="pagination_wrap">
                    <div className="showing">
                        Showing 01 to 06 of 1000 entries
                                            </div>
                    <div className="pagination">
                        <a><FirstPage /></a>
                        <a><Prev /></a>
                        <a className="active_page">01</a>
                        <a>02</a>
                        <a>03</a>
                        <a>04</a>
                        <a>05</a>
                        <a><Next /></a>
                        <a><LastPage /></a>
                    </div>
                </div>


                {/* {this.state.addNotesPopupRef && <AddNotesPopup visible={this.state.addNotesPopupRef}
                onClosed={() => this.modalActionFn('addNotesPopupRef', false)}
            />}
            {this.state.auditPopupRef && <AuditPopup visible={this.state.auditPopupRef}
                onClosed={() => this.modalActionFn('auditPopupRef', false)}
            />}
            {this.state.viewPopupRef && <ViewNotesPopup visible={this.state.viewPopupRef}
                onClosed={() => this.modalActionFn('viewPopupRef', false)}
            />}
            {this.state.clarificationRef && <ClarificationPopup visible={this.state.clarificationRef}
                onClosed={() => this.modalActionFn('clarificationRef', false)}
            />} */}

                {/* <AddNotesPopup ref={(AddNotesPopup) => { this._modal = AddNotesPopup; }} /> */}
                {/* <AuditPopup ref={this.auditPopupRef} />
            <ViewNotesPopup ref={this.viewPopupRef} /> */}
            </div>
        </div>
    )


}

export default createForm()(OrderTab);