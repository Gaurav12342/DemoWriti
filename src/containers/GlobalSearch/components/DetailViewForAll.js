/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { MODULE } from '../../../constants/subscription';
import _ from 'lodash'
import { displayDateTime } from "../../../util/moment";
import { STATUS, SUB_CATEGORY, TODO_CATEGORY } from '../../../constants/todo';
import { TabConst } from '../../../components/common/Popup/GlobalSearch';
import { Spin } from '../../../components/common';

const DetailViewForAll = (props) => {

    const { data, loader } = props


    // const handleInfiniteOnLoad = (page) => {
    //     onInfiniteOnLoad(page)
    // }

    return (<>
        <div className="ser-tbl" >
            {

                loader ?
                    <Spin spinning={loader} str='center'></Spin>
                    :
                    <div >
                        {
                            _.map(Object.keys(data), key => {
                                console.log("🚀 ~ file: DetailViewForAll.js ~ line 32 ~ _.map ~ key", key)
                                let type = TabConst[key]?.Value
                                console.log("🚀 ~ file: DetailViewForAll.js ~ line 34 ~ _.map ~ type", type)
                                return <div>
                                    {
                                        (type === MODULE.RESIDENT && _.size(data[key].list) > 0) &&
                                        <div>
                                            <p align="center">Resident</p>
                                            {
                                                _.map(data[key].list, d => {
                                                    return <div>
                                                        <div className="d-flex data-row">
                                                            <div className="left-data">
                                                                <h3><span>{d.mergeLFName}</span></h3>
                                                                <p>Type - Resident</p>
                                                            </div>
                                                            <div className="right-data">
                                                                <p>{d.homeAreaId.name} </p>
                                                                <p>{displayDateTime(d.updatedAt)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        ((type === MODULE.RX_ORDER || type === MODULE.X_RAY_US) && _.size(data[key].list) > 0) &&
                                        <div>
                                            <p align="center">{type === MODULE.RX_ORDER ? "Rx_Order" : "X-Ray"}</p>
                                            {

                                                _.map(data[key].list, d => {

                                                    return <div>
                                                        <div className="d-flex data-row">
                                                            <div className="left-data">
                                                                <h3><span>{`${d?.orderNumber} -${d?.residentId?.mergeLFName} `}</span></h3>
                                                                <p>Type {type === MODULE.RX_ORDER ? "Rx_Order" : "X-Ray"}</p>
                                                            </div>
                                                            <div className="right-data">
                                                                <p>{d?.residentId?.homeAreaId?.name}</p>
                                                                <p>{displayDateTime(d?.updatedAt)} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        (type === MODULE.PMR && _.size(data[key].list) > 0) &&
                                        <div>
                                            <p align="center">PMR</p>
                                            {
                                                _.map(data[key].list, d => {
                                                    return <div>
                                                        <div className="d-flex data-row">
                                                            <div className="left-data">
                                                                <h3><span>{`${d.pmrId} -${d.patientId.mergeLFName} `}</span></h3>
                                                                <p>Type - PMR</p>
                                                            </div>
                                                            <div className="right-data">
                                                                <p>{d.patientId.homeAreaId.name}</p>
                                                                <p>{displayDateTime(d.updatedAt)} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                        </div>

                                    }
                                    {
                                        (type === MODULE.TODO && _.size(data[key].list) > 0) &&
                                        <div>
                                            <p align="center">TODO</p>
                                            {
                                                _.map(data[key].list, d => {

                                                    if (d.category !== MODULE.RX_ORDER) {
                                                        return <div>
                                                            <div className="d-flex data-row">
                                                                <div className="left-data">
                                                                    <h3><span>{`${_.invert(MODULE)[d.category]} -${_.invert(SUB_CATEGORY[_.invert(MODULE)[d.category]])[d.subCategory]} -${d.residentId?.mergeLFName} `}</span></h3>

                                                                    <p>Type - TODO</p>
                                                                </div>
                                                                <div className="right-data">
                                                                    <p><label>Status:</label>{_.invert(STATUS)[d.status]}</p>
                                                                    <p>{d.residentId?.homeAreaId.name}</p>
                                                                    <p>{displayDateTime(d.updatedAt)} </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    else {
                                                        return <div>
                                                            <div className="d-flex data-row">
                                                                <div className="left-data">
                                                                    <h3><span>{`${_.invert(MODULE)[d.category]} -${_.invert(SUB_CATEGORY["PRESCRIPTION"])[d.subCategory]} -${d.residentId?.mergeLFName} `}</span></h3>
                                                                    <p>Type - TODO</p>
                                                                </div>
                                                                <div className="right-data">
                                                                    <p><label>Status:</label>{_.invert(STATUS)[d.status]}</p>
                                                                    <p>{d.residentId?.homeAreaId.name}</p>
                                                                    <p>{displayDateTime(d.updatedAt)} </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            })
                        }

                        {/* </InfiniteScroll> */}
                    </div>
            }
        </div>
    </>);

}
export default DetailViewForAll;