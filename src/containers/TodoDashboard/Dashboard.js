import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { TODO_ICONS, TODO_CATEGORY, SUB_CATEGORY } from '../../constants/todo'
import { getIcons } from '../../util/todo'
import { isDrOrNp } from '../../util/common'
import routes from '../../routes/constant'
import HomeAreaFilter from '../../components/HomeAreaFilter'
import { Spin, NoData } from '../../components/common'

const getRedirectUrl = (row, block, doctorId) => {

    let pathname;
    let searchUrl, propsFil;
    if (row.todoCategory === TODO_CATEGORY.PRESCRIPTION) {
        pathname = routes.todo.path;
        searchUrl = `?category=${row.todoCategory}&subCategory=${block.type}&viewType=1`;
        if (block.type === SUB_CATEGORY.PRESCRIPTION.VERBAL_ORDER && doctorId) {
            searchUrl = `${searchUrl}&doctorId=${doctorId}`
        }
    } else if (row.todoCategory === TODO_CATEGORY.MED_REVIEW) {
        if (block.type === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 ||
            block.type === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2 ||
            block.type === SUB_CATEGORY.MED_REVIEW.PMR) {
            pathname = routes.pmrTodo.path;
            // }
            // else
            //     pathname = routes.medReviewTodo.path;
            searchUrl = `?category=${TODO_CATEGORY.MED_REVIEW}&subCategory=${block.type}&viewType=1`;
            if (block.type === SUB_CATEGORY.PRESCRIPTION.VERBAL_ORDER && doctorId) {
                searchUrl = `${searchUrl}&doctorId=${doctorId}`
            }
        }
        else {
            pathname = routes.medReviewTodo.path;
            propsFil = {
                category: TODO_CATEGORY.MED_REVIEW,
                subCategory: block.type,
                viewType: 1,
            }
        }
    }
    return { pathname: pathname, search: searchUrl, propsFil: propsFil }
}

const Dashboard = (props) => {

    const { dashboardData, authUser, filter, loading, onHomeAreaChange } = props
    let doctorId = isDrOrNp(authUser) ? authUser._id : null

    const redirectTo = (row, block) => {
        const redirectUrl = getRedirectUrl(row, block, doctorId)
        props.history.push({
            pathname: redirectUrl.pathname, search: redirectUrl.search,
            state: { propsFil: { ...filter, ...redirectUrl.propsFil } }
        })
    }

    return <>
        <div className="dashboard_wrapper">
            <div className="container">
                <div className="page_head">
                    <h3>Dashboard</h3>
                    <div className="form_group">
                        <HomeAreaFilter onChange={onHomeAreaChange} />
                    </div>
                </div>
                {
                    loading ?
                        <Spin spinning={loading} str='center' />
                        : dashboardData.length === 0 ?
                            <NoData />
                            : dashboardData.map(row => {
                                return <>
                                    <div className="dashboard_block">
                                        <h4>{row.label}<span>{row.count}</span></h4>
                                        <div className="block_container">
                                            {
                                                row.data.map(block => {
                                                    return <div className="block_content"
                                                        onClick={() => redirectTo(row, block)}>
                                                        <p className="b_t">
                                                            {block.label}
                                                        </p>
                                                        <h1>{block.value}</h1>
                                                        <img src={getIcons(block.type)} />
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </>
                            })
                }
            </div>
        </div>
    </>
}

export default Dashboard