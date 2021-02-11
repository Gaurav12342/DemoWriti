import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { TodoSubCategory, ViewTypeFilter } from '../../../components/Todo';
import { getTodoCounts } from '../../../services/api/routes/todoDashboard';
import ResidentList from './ResidentList';
import axios from '../../../services/api/services/common'
import { todoDashboardUpdate } from '../../../services/socket/routes/todo'
import queryString from "query-string";
import { TODO_CATEGORY, SUB_CATEGORY, MAP_TODOS } from '../../../constants/todo';
import { DEVICE_VIEW } from '../../../constants/prescription'
import { isDrOrNp } from '../../../util/common'
import { getDeviceView } from '../../../util/todo'
import _ from 'lodash'

const TodoListContainer = props => {
    const { socket, authUser, location, todoListContainerProps } = props;
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
        category: TODO_CATEGORY.PRESCRIPTION
    });

    useEffect(() => {
        const location = props.location;
        let queryObj = queryString.parse(location.search);
        queryObj = {
            ...queryObj,
            category: parseInt(queryObj.category),
            subCategory: parseInt(queryObj.subCategory),
            viewType: parseInt(queryObj.viewType),
        }
        let obj = getDeviceView(queryObj, authUser)
        queryObj.viewType = obj.viewType
        setIsPrimaryFilter(obj.deviceView)
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
        console.log("handleDashboardUpdate data => ", data)
        if (filter && filter.homeAreaId?.length > 0)
            return
        let tempData = [...dashboardData]
        tempData.map(todo => {
            let updatedTodo = data.data.find(y => y.type === todo.type)
            if (updatedTodo)
                todo.value = updatedTodo.value
            return todo
        })
        setDashboardData(tempData);
    }

    const fetch = () => {
        // get dashboard count
        setLoading(true);
        axios({ ...getTodoCounts, data: filter }).then((data) => {
            if (data.code === 'OK') {
                setDashboardData(data.data[0].data)
                setDashboardCount(data.data[0].count)
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    };


    const handleTodoCat = (todo) => {
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
                    />
                    <ResidentList query={query} onsetActiveTodo={onsetActiveTodo} />
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