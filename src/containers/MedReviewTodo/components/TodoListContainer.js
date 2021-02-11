import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { TodoSubCategory, ViewTypeFilter } from '../../../components/Todo';
import { getTodoCounts } from '../../../services/api/routes/todoDashboard';
import ResidentList from './../../PrescriptionTodo/components/ResidentList';
import axios from '../../../services/api/services/common'
import { todoDashboardUpdate } from '../../../services/socket/routes/todo'
import queryString from "query-string";
import { TODO_CATEGORY, SUB_CATEGORY, MAP_TODOS } from '../../../constants/todo';
import { DEVICE_VIEW } from '../../../constants/prescription'
import { isDrOrNp } from '../../../util/common'
import { getDeviceView } from '../../../util/todo'
import _ from 'lodash'
const { PMR, NURSE_REVIEW_1, NURSE_REVIEW_2 } = SUB_CATEGORY.MED_REVIEW;
const TodoListContainer = props => {
    const { socket, authUser, viewType, todoListContainerProps, category, subCategory } = props;
    const { activeSubCategory,
        onChangeListview,
        onsetActiveTodo,
        onSetActiveSubCategory } = todoListContainerProps;

    const [query, setQuery] = useState(null)
    const [loading, setLoading] = useState(false);
    const [isPrimaryFilter, setIsPrimaryFilter] = useState(false);
    const [dashboardData, setDashboardData] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const [dashboardCount, setDashboardCount] = useState(0);
    const [filter, setFilter] = useState({
        category: TODO_CATEGORY.MED_REVIEW
    });

    useEffect(() => {
        const location = props.location;
        let queryObj = queryString.parse(location.search);
        queryObj = {
            ...queryObj,
            category: parseInt(category),
            subCategory: parseInt(subCategory),
            viewType: parseInt(viewType),
        }
        let obj = getDeviceView(queryObj, authUser)
        queryObj.viewType = obj?.viewType
        setIsPrimaryFilter(obj?.deviceView)
        handleSetQuery(queryObj)
    }, [])

    useEffect(() => {
        // get dashboard count
        fetch();
    }, [filter]);

    useEffect(() => {
        if (query && dashboardData?.length > 0) {
            let activeSubcat = dashboardData.find(x => x.type === query.subCategory)
            if (activeSubcat)
                onSetActiveSubCategory(activeSubcat)
        }
    }, [query, dashboardData])

    useEffect(() => {
        //update dashboard count
        if (socket) {
            socket.on(todoDashboardUpdate, handleDashboardUpdate)
            return () => {
                socket.off(todoDashboardUpdate);
            };
        }
    }, [dashboardData])

    const handleSetQuery = (queryObj) => {
        if (queryObj) {
            setQuery(queryObj)
        }
    }

    const handleDashboardUpdate = (data) => {
        if (filter && filter.homeAreaId?.length > 0)
            return
        let tempData = [...dashboardData]
        tempData.map(x => {
            if (x.todoCategory === data.todoCategory) {
                x.data = x.data.map(todo => {
                    let updatedTodo = data.data.find(y => y.type === todo.type)
                    if (updatedTodo)
                        todo.value = updatedTodo.value
                    return todo
                })
            }
            x.count = _.map(x.data, "value").reduce((a, b) => a + b, 0)
            return x
        })
        setDashboardData(tempData);
    }

    const fetch = () => {
        // get dashboard count
        setLoading(true);
        axios({ ...getTodoCounts, data: filter }).then((data) => {
            if (data.code === 'OK') {
                const dashData = data.data[0].data || [];
                const filtered = dashData.filter(d => ![PMR, NURSE_REVIEW_1, NURSE_REVIEW_2].includes(d.type))
                setDashboardData(filtered)
                setDashboardCount(data.data[0].count)
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    };


    const handleTodoCat = (todo) => {
        console.log('todo => ', todo)
        let queryObj = {
            ...query,
            subCategory: todo.type,
        }
        let obj = getDeviceView(queryObj, authUser)
        queryObj.viewType = obj.viewType
        setIsPrimaryFilter(obj.deviceView)
        setQuery(queryObj)
        onSetActiveSubCategory(todo)
    }

    const handleViewType = (viewType) => {
        let queryObj = {
            ...query,
            viewType: viewType,
        }
        setQuery(queryObj)
        onChangeListview(viewType)
    }

    const handleHomeAreaChange = (val) => {
        let tempFilter = {
            ...filter,
            homeAreaId: val ? [val] : undefined
        }
        setFilter(tempFilter)
    }

    return <>
        {
            query ?
                <>
                    <TodoSubCategory
                        todos={dashboardData}
                        dashboardCount={dashboardCount}
                        loading={loading}
                        onSetActiveSubCategory={handleTodoCat}
                        onHomeAreaChange={handleHomeAreaChange}
                        onChangeListview={handleViewType}
                        activeSubCategory={activeSubCategory}
                        query={query}
                        isPrimaryFilter={isPrimaryFilter}
                        {...{ category, subCategory }}
                    />
                    <ResidentList type={'medReview'} query={query} onsetActiveTodo={onsetActiveTodo} {...{ category, subCategory }} />
                </>
                : null
        }
    </>

}
const mapStateToProps = ({ auth }) => {
    const { authUser, socket } = auth
    return {
        authUser, socket
    }
}
export default withRouter(connect(mapStateToProps)(TodoListContainer));