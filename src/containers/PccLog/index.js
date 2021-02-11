import React, { useState, useEffect } from 'react';
import PageHead from './components/PageHead';
import FilterForPcc from './components/FilterForPcc'
import { createForm } from 'rc-form';
import { dateTimeFormat, displayDateTime } from '../../util/moment';
import axios from '../../services/api/services/common';
import { Info } from '../../../src/assets/images/popup/index'
import {
    pccLogs
} from '../../services/api/routes/pcc';
import Table from '../../components/common/Table/index';
import { Toast, Spin } from '../../components/common';
import DetailView from './components/DetailView'
import { PCC_LOGS_STATUS_TEXT_TYPE } from '../../constants/common';

const moment = require('moment')
const _ = require('lodash');

const fromd = moment().subtract(15, 'days')
const tod = moment()

const color = {
    SUCESS: 'green',
    ERROR: 'red'
}
const PccLog = (props) => {
    const { form } = props;
    const { validateFields } = form;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [defaultDate, setDefaultDate] = useState([fromd, tod]);
    const [data, setData] = useState();
    const [count, setCount] = useState(0)
    const [viewDetailModal, setViewDetailModal] = useState(false)
    const [detailViewData, setDetailViewData] = useState({})
    const [radioData, setRadioData] = useState("ALL");
    const [apiFilter, setApiFilter] = useState({
        page: 1,
        limit: 10,
        lte: [{ createdAt: tod }],
        gte: [{ createdAt: fromd }],
        fields: [],
        find: {},
        sort: { createdAt: "DESC" }
    })
    useEffect(() => {
        fetch();
    }, [apiFilter]);

    const handleTableChange = (pagination, tfilter, sorter) => {
        let tempFilter = {
            ...apiFilter,
            page: pagination.current,
            limit: pagination.pageSize,
        };
        setApiFilter(tempFilter);
    };
    const onShowSizeChange = (size) => {
        if (size) {
            setApiFilter((prevFilter) => ({ ...prevFilter, page: 1, limit: size }));
        }
    };

    const fetch = async () => {

        let res = await axios({ ...pccLogs, data: { query: apiFilter } })
        if (res) {
            if (res.code === 'OK') {
                setData(res.data.data)
                setCount(res.data.count)
            } else {
                Toast.error(res.message)
            }
        }
        setLoading(false);
        // filter.find && filter.find.facId ? setDetailLoader(false) : setLoading(false);
    };


    const onOpenModal = () => {
        console.log("VISIBLE")
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false)
    }

    const handleSave = (obj) => {
        console.log("handle save called", obj)
        let tempApiFilter = {}
        if (obj && obj.type === PCC_LOGS_STATUS_TEXT_TYPE.ALL) {
            tempApiFilter = {
                ...apiFilter,
                find: {},
                search: {
                    keys: ["request.url"],
                    keyword: obj.url,
                },
                page: 1,
                limit: 10
            }
        }
        else {
            tempApiFilter = {
                ...apiFilter,
                find: {
                    "response.statusText": obj.type
                },
                search: {
                    keys: ["request.url"],
                    keyword: obj.url,
                },
                page: 1,
                limit: 10
            }
        }

        setApiFilter({
            ...apiFilter,
            ...tempApiFilter
        })
        setVisible(false)
    }


    const onDetailViewClose = () => {
        setViewDetailModal(false)
    }


    const onDateChange = (dateRange) => {

        setDefaultDate(dateRange)
        setApiFilter(exFilter => {
            return {
                ...exFilter,
                gte: [{ createdAt: dateRange[0] }],
                lte: [{ createdAt: dateRange[1] }],
                page: 1,
                limit: 10
            }
        })

    }
    const getColumns = () => [
        {
            title: 'Sr.No',
            keyword: 'index',
            dataIndex: 'index',
            render: (text, record, index) =>
                (apiFilter.page - 1) * apiFilter.limit + (index + 1),
        },
        {
            title: "URL",
            dataIndex: "url",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text || "-"}</span>
            )
        },
        {
            title: "Requested Date",
            dataIndex: "createdAt",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{displayDateTime(text) || "-"}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "response",
            render: text => (
                <span
                    style={{ color: text[0].statusText === "SUCCESS" ? color.SUCESS : color.ERROR }}
                >{text[0].statusText}</span>
            )
        },
        {
            title: 'Info',
            render: (text, record) => (
                <div className="actions">
                    {
                        <Info
                            style={{
                                marginTop: '-7px',
                                marginRight: '45px',
                                cursor: 'pointer',
                                width: '20px',
                                height: '20px',

                            }}
                            onClick={() => setViewDetailModal(() => {
                                setDetailViewData(record)
                                return true
                            })}
                        />
                    }

                </div>
            ),
        },
    ];

    return (

        <>
            <div className='pmr_wrap'>
                <div className='container'>
                    <PageHead total={count} onOpenModal={onOpenModal} onDateChange={onDateChange}
                        defaultDate={defaultDate}
                    />

                    {visible && (
                        <FilterForPcc
                            isVisible={visible}
                            // uploaderOpen={() => {
                            //     setVisible(true);
                            // }}
                            // filePath={filePath}
                            // radioValue={radioValue}
                            // hadleRadioValue={hadleRadioValue}
                            form={form}
                            okText="Add"
                            cancelText="Cancel"
                            title="Add Version"
                            onSave={handleSave}
                            onClose={onClose}
                            onCancel={onClose}
                            setRadioData={setRadioData}
                            radioData={radioData}
                        />
                    )}

                    {viewDetailModal && (
                        <DetailView
                            isVisible={viewDetailModal}
                            // uploaderOpen={() => {
                            //     setVisible(true);
                            // }}
                            // filePath={filePath}
                            // radioValue={radioValue}
                            // hadleRadioValue={hadleRadioValue}
                            data={detailViewData}
                            title="Details"

                            onClose={onDetailViewClose}

                        />
                    )}

                    <Table
                        columns={getColumns()}
                        datasource={data}
                        loading={loading}
                        onChange={handleTableChange}
                        pagination={{
                            current: apiFilter.page,
                            pageSize: apiFilter.limit,
                            total: count,
                            showSizeChanger: true,
                            onShowSizeChange: onShowSizeChange,
                        }}
                    />
                </div>
            </div>
            {/* {
                visibleMap ?
                    <MappingModal
                        visible={visibleMap}
                        onCancel={() => handleMapping(false, null)}
                        onOk={() => handleMapping(false, null, 'ok')}
                        detail={record}
                        authUser={authUser}
                    />
                    : null
            }
            {
                visibleDetail ?
                    <DetailViewModal
                        visible={visibleDetail}
                        onCancel={() => handleDetailView(false, null)}
                        detail={record}
                        authUser={authUser}
                    /> : null
            } */}
        </>
    )

}

export default createForm()(PccLog) 