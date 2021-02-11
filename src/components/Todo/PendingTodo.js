import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from '../../assets/images/todo/index';
import { getTodoName } from '../../util/todo';
import { displayDateTime } from '../../util/moment';
import { TODO_TYPES } from '../../constants/prescription'

const PendingTodo = (props) => {
    const { todo, onFetchTodoDetail } = props
    const [pendingTodo, setPendingTodo] = useState(todo.otherPendingTodos || [1, 2, 3])

    return <div className='listing-bottom'>
        <div className='form-title'>
            <h5>Pending To Do - {getTodoName(TODO_TYPES, todo.subCategory || 15)}</h5>
        </div>
        <a className='top-cell pending-to-do'>
            <span style={{ color: '#609fae' }}>Rx Order <span className='count'>{pendingTodo.length}</span></span>
            <span>PMR</span>
            <span>E-Processing</span>
        </a>
        {
            pendingTodo.map(pt => {
                return <a className='pending-to-do' key={pt}>
                    {/* <span>{pt.prescribedFormId.orderNumber} -
                        {displayDateTime(pt.prescribedFormId.orderGeneratedAt)}
                        </span> */}
                    <span>Rx 123456 - 18th May 2020, 12:20 pm</span>
                    <View onClick={() => onFetchTodoDetail(pt.prescribedFormId.id, true)
                    } />
                </a>
            })
        }
    </div>

}
export default PendingTodo
PendingTodo.defaultProps = {
}
PendingTodo.propTypes = {
    todo: PropTypes.object,
    onFetchTodoDetail: PropTypes.func
}