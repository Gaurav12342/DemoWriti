import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import axios from '../../services/api/services/common'
import { getTodoCounts } from '../../services/api/routes/todoDashboard'
import { todoDashboardUpdate } from '../../services/socket/routes/todo'
import { TODO_CATEGORY } from '../../constants/todo'
import _ from 'lodash'
import { isModuleAccessible, canPerformAction } from '../../util/common'
import { MODULE, ACTIONS } from '../../constants/subscription'
import { getMappedTodoKey } from '../../util/todo'

const Todo = (props) => {
    const { socket, authUser } = props
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        fetch();
    }, [filter]);

    useEffect(() => {
        if (socket)
            socket.on(todoDashboardUpdate, handleDashboardUpdate)
    }, [dashboardData])

    const fetch = () => {
        setLoading(true);
        axios({ ...getTodoCounts, data: filter }).then((data) => {
            if (data.code === 'OK') {
                filterData(data.data)
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    };

    const handleDashboardUpdate = (data) => {
        console.log("handleDashboardUpdate data => ", data)
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

    const filterData = async (data) => {
        let tempData = [...data]

        // tempData = await Promise.all(tempData.map(async x => {
        //     if (isModuleAccessible(x.todoCategory)) {
        //         x.data = await Promise.all(x.data.map(block => {
        //             let key = getMappedTodoKey(block.type)
        //             console.log("filterData -> key", key)
        //             if (canPerformAction({
        //                 moduleId: x.todoCategory,
        //                 subModuleId: x.subModule,
        //                 actiontoCheck: ACTIONS[key].CODE
        //             })) {
        //                 return block
        //             }

        //         }))
        //         return x
        //     }
        // }))
        setDashboardData(tempData)
        console.log("filterData -> tempData", tempData)
        return tempData
    }

    const handleHomeAreaChange = (val) => {
        let tempFilter = {
            homeAreaId: val ? [val] : undefined
        }
        setFilter(tempFilter)
    }

    return <>
        <Dashboard dashboardData={dashboardData}
            authUser={authUser}
            loading={loading}
            onHomeAreaChange={handleHomeAreaChange}
            {...props}
        />
    </>
}

const mapStateToProps = ({ auth }) => {
    const { authUser, socket } = auth
    return {
        authUser,
        socket
    }
}
export default connect(mapStateToProps)(Todo)