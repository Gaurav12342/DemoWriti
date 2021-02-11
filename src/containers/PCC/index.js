import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import PageHead from './components/PageHead';
import axios from '../../services/api/services/common';
import { displayDateTime } from '../../util/moment';
import { View } from '../../assets/images/pmr/index';
import { Transfer } from '../../assets/images';
import {
    getPccList,
    syncPcc
} from '../../services/api/routes/pcc';
import Table from '../../components/common/Table/index';
import { Toast, Spin } from '../../components/common';
import MappingModal from './components/MappingModal'
import DetailViewModal from './components/DetailModal'
const _ = require('lodash');

const EHR_MAPPED_AS = {
    OLD: 1,
    CREATED_NEW: 2
}

const Pcc = (props) => {
    const authUser = useSelector(state => state.auth.authUser)
    const [loading, setLoading] = useState(false);
    const [detailLoader, setDetailLoader] = useState(false);
    const [syncLoader, setSyncLoader] = useState(false);
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
        fields: [],
        find: {},
        populate: [{ mappedWith: [] }]
    });
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [visibleMap, setVisibleMap] = useState(false);
    const [record, setRecord] = useState(null);
    const [visibleDetail, setVisibleDetail] = useState(false);

    useEffect(() => {
        fetch();
    }, [filter]);

    const fetch = async () => {
        if (filter.find && filter.find.facId)
            setDetailLoader(true)
        else setLoading(true);
        let res = await axios({ ...getPccList, data: { query: filter } })
        if (res) {
            if (res.code === 'OK') {
                if (filter.find && filter.find.facId) {
                    let homeData = null, homeAreaData = []
                    res.data.data.map(obj => {
                        if (obj.floorId === null) {
                            homeData = obj
                        }
                        else {
                            homeAreaData.push(obj)
                        }
                    })
                    setRecord({ homeData, homeAreaData })
                    setVisibleDetail(true)
                } else {
                    setData(res.data.data);
                    setTotal(res.data.count);
                }
            } else {
                Toast.error(res.message)
            }
        }
        setLoading(false);
        filter.find && filter.find.facId ? setDetailLoader(false) : setLoading(false);
    };

    const handleSync = () => {
        setSyncLoader(true);
        axios({ ...syncPcc })
            .then((data) => {
                if (data.code === 'OK') {
                    Toast.success(data.message)
                    setSyncLoader(false);
                } else {
                    setSyncLoader(false);
                    Toast.error(data.message)
                }
            })
            .catch((err) => {
                setSyncLoader(false);
                Toast.error(data.message)
            });
    };
    const handleTableChange = (pagination, filter, sorter) => {
        let tempFilter = {
            ...filter,
            page: pagination.current,
            limit: pagination.pageSize,
        };
        setFilter(tempFilter);
    };

    const onShowSizeChange = (size) => {
        if (size) {
            setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
        }
    };


    const getColumns = () => [
        {
            title: 'Sr.No',
            keyword: 'index',
            dataIndex: 'index',
            render: (text, record, index) =>
                (filter.page - 1) * filter.limit + (index + 1),
        },
        {
            title: "Facility Name",
            dataIndex: "facilityName",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text || "-"}</span>
            )
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text || "-"}</span>
            )
        },
        {
            title: "Facility Id",
            dataIndex: "facId",
            render: text => (
                <span style={{ textTransform: "capitalize" }}>{text || "-"}</span>
            )
        },
        {
            title: "Activation Date",
            dataIndex: "mappedOn",
            render: (text, record) => (
                <span>
                    <span>{text ? displayDateTime(text) : '-'}</span>
                    <span>{record.mappedAs ? EHR_MAPPED_AS.CREATED_NEW === record.mappedAs ? '  New Added' :
                        EHR_MAPPED_AS.OLD ? ` - Mapped With ${record.mappedWith ? record.mappedWith.name : ''} ` : '' : ''}</span>
                </span>
            )
        },
        {
            title: 'Action',
            showRefresh: true,
            render: (text, record) => (
                <div className="actions">
                    {
                        detailLoader ?
                            <div>
                                <Spin spinning={true} />
                            </div> :
                            <div onClick={() => handleDetailView(true, record)}>
                                <View />
                                <p>View</p>
                            </div>
                    }
                    <div onClick={() => handleMapping(true, record)}>
                        <Transfer />
                        <p>Mapping</p>
                    </div>
                </div>
            ),
        },
    ];

    const handleMapping = (visible, record, str) => {
        setVisibleMap(visible);
        setRecord(record);
        if (str === 'ok')
            fetch()
    };

    const handleDetailView = (visible, record) => {
        if (visible) {
            setFilter({
                ...filter,
                find: {
                    ...filter.find,
                    facId: record.facId
                }
            })
        } else {
            let obj = { ...filter }
            delete obj.find.facId
            setFilter(obj)
            setRecord(record)
            setVisibleDetail(visible)
        }
    }

    return (
        <>
            <div className='pmr_wrap'>
                <div className='container'>
                    <PageHead total={total} onSync={handleSync} syncLoader={syncLoader} />
                    <Table
                        columns={getColumns()}
                        datasource={data}
                        loading={loading}
                        onChange={handleTableChange}
                        pagination={{
                            current: filter.page,
                            pageSize: filter.limit,
                            total: total,
                            showSizeChanger: true,
                            onShowSizeChange: onShowSizeChange,
                        }}
                    />
                </div>
            </div>
            {
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
            }
        </>
    );
};

export default Pcc;
