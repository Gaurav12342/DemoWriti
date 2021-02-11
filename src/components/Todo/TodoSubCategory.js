import React, { useState } from 'react';
import { TodoList, ViewTypeFilter } from './index'
import HomeAreaFilter from '../HomeAreaFilter'

const TodoSubCategory = props => {
    const { loading, todos, homeAreaId, query, onHomeAreaChange, onChangeListview, isPrimaryFilter } = props

    return <>
        <div className="todolist">
            <div className="select">
                <HomeAreaFilter
                    placeholder='Filter Homearea'
                    onChange={onHomeAreaChange}
                />
            </div>
            <div className="select">
                <ViewTypeFilter viewType={query.viewType}
                    isPrimaryFilter={isPrimaryFilter}
                    onChangeListview={onChangeListview} />
            </div>
            <TodoList {...props} />
        </div>
    </>
}
export default TodoSubCategory