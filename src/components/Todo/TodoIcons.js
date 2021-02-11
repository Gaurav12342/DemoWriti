import React from 'react';

const TodoIcons = ({ todoIcons, todoSubCategory }) => {
    const todo = todoIcons[todoSubCategory]
    return <>
        {todo ? React.createElement(todo.component, { className: todo.className || '' }) : null}
    </>
}
export default TodoIcons