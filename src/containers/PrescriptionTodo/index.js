import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import TodoListContainer from './components/TodoListContainer'
import PrescriptionContainer from './components/PrescriptionContainer'

function Todo(props) {
  const [todo, setTodo] = useState(false);
  const [activeTodo, setActiveTodo] = useState(null);
  const [viewType, setViewType] = useState();
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
  //  const todoListContainerProps = React.useMemo(() => ({
  //   activeSubCategory: activeSubCategory,
  //   onChangeListview: (val) => setViewType(val),
  //   onsetActiveTodo: (val) => setActiveTodo(val),
  //   onSetActiveSubCategory: (val) => setActiveSubCategory(val)
  // }), [])
  console.log("00000000", activeTodo)
  return (
    <>
      <div className="container">
        <div className="todo_wrap">
          {(windowWidth < 1024) ? (todo ?
            <div className="responsive_ipad_wrap">
              <TodoListContainer todoListContainerProps={todoListContainerProps} />
            </div>
            : '') :
            <TodoListContainer todoListContainerProps={todoListContainerProps} />
          }
          <PrescriptionContainer activeTodo={activeTodo} viewType={viewType} />
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