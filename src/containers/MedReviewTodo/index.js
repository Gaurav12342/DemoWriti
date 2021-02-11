import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import TodoListContainer from './components/TodoListContainer'
import PrescriptionContainer from './components/PrescriptionContainer'

function Todo({ location }) {
  const { category, subCategory, viewType: paramViewType } = location.state?.propsFil || {};

  const [todo, setTodo] = useState(false);
  const [activeTodo, setActiveTodo] = useState(null);
  const [viewType, setViewType] = useState(paramViewType);
  const [activeSubCategory, setActiveSubCategory] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = (e) => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])

  const handleToDo = () => {
    setTodo(!todo);
  }

  const todoListContainerProps = {
    activeSubCategory: activeSubCategory,
    onChangeListview: (val) => setViewType(val),
    onsetActiveTodo: (val) => setActiveTodo(val),
    onSetActiveSubCategory: (val) => setActiveSubCategory(val)
  }
  return (
    <>
      <div className="container">
        <div className="todo_wrap">
          {(windowWidth < 1024) ? (todo ?
            <div className="responsive_ipad_wrap">
              <TodoListContainer todoListContainerProps={todoListContainerProps} {...{ category, subCategory, viewType }} />
            </div>
            : '') :
            <TodoListContainer todoListContainerProps={todoListContainerProps} {...{ category, subCategory, viewType }} />
          }
          <PrescriptionContainer activeTodo={activeTodo} viewType={viewType} {...{ category, subCategory, viewType }} />
        </div>
        <div className={`chat_toggle todo ` + (todo ? 'open' : '')}
          onClick={handleToDo}>
          <p>
            To Dos &nbsp; & &nbsp; Residents
        </p>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth
  return {
    authUser
  }
}
export default connect(mapStateToProps)(Todo);