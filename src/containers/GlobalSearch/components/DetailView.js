/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { MODULE } from '../../../constants/subscription';
import _ from 'lodash'
import { displayDateTime } from "../../../util/moment";
import { STATUS, SUB_CATEGORY, TODO_CATEGORY } from '../../../constants/todo';
import { Spin } from '../../../components/common';

const DetailView = (props) => {

  const { onInfiniteOnLoad, type, data, hasMore ,loader} = props
  console.log("🚀 ~ file: DetailView.js ~ line 12 ~ DetailView ~ data", data)


  const handleInfiniteOnLoad = (page) => {
    onInfiniteOnLoad(page)
  }

  return (<>
    <div className="ser-tbl" >
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={handleInfiniteOnLoad}
        hasMore={hasMore}
        // loader={loaddetailing ? <Spin spinning={loading} str='center autoheight' /> : null}
        useWindow={false}
      // getScrollParent={() => scrollParentRef}
      >

        {
             loader ?
             <Spin spinning={loader} str='center'></Spin>
             :
          type === MODULE.RESIDENT &&
          _.map(data, d => {
            return <div>
              <div className="d-flex data-row">
                <div className="left-data">
                  <h3><span>{d.mergeLFName}</span></h3>
                  <p>Type - Resident</p>
                </div>
                <div className="right-data">
                  <p>{d.homeAreaId?.name} </p>
                  <p>{displayDateTime(d.updatedAt)}</p>
                </div>
              </div>
            </div>
          })

        }
        {
          (type === MODULE.RX_ORDER || type === MODULE.X_RAY_US) &&
          _.map(data, d => {
            return <div>
              <div className="d-flex data-row">
                <div className="left-data">
                  <h3><span>{`${d.orderNumber}-${d.residentId?.mergeLFName}`}</span></h3>
                  <p>Type {type === MODULE.RX_ORDER ? "Rx_Order" : "X-Ray"}</p>

                </div>
                <div className="right-data">
                  <p>{d.residentId?.homeAreaId.name}</p>
                  <p>{displayDateTime(d.updatedAt)} </p>
                </div>
              </div>
            </div>
          })

        }
        {
          (type === MODULE.PMR) &&
          _.map(data, d => {
            return <div>
              <div className="d-flex data-row">
                <div className="left-data">
                  <h3><span>{`${d.pmrId}-${d.patientId?.mergeLFName}`}</span></h3>
                  <p>Type - PMR</p>
                </div>
                <div className="right-data">
                  <p>{d.patientId.homeAreaId?.name}</p>
                  <p>{displayDateTime(d.updatedAt)} </p>
                </div>
              </div>
            </div>
          })

        }
        {
          type === MODULE.TODO &&
          _.map(data, d => {
            if (d.category !== MODULE.RX_ORDER) {
              return <div>
                <div className="d-flex data-row">
                  <div className="left-data">
                    <h3><span>{`${_.invert(MODULE)[d.category]}-${_.invert(SUB_CATEGORY[_.invert(MODULE)[d.category]])[d.subCategory]}-${d.residentId?.mergeLFName}`}</span></h3>

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
                    <h3><span>{`${_.invert(MODULE)[d.category]}-${_.invert(SUB_CATEGORY["PRESCRIPTION"])[d.subCategory]}-${d.residentId?.mergeLFName}`}</span></h3>
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
      </InfiniteScroll>
    </div>
  </>);

}
export default DetailView;