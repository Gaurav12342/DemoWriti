import React, { Component, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Todolist from './View/Todolist'
import SearchList from './View/searchlist';
import TodoDetail from './View/tododetail';
import { connect } from 'react-redux'

function Todo(props) {
  const [todo, setTodo] = useState(false);
  const [Window_width, checkWidth] = useState(window.innerWidth);
  const handleResize = (e) => {
    this.setState({ Window_width: window.innerWidth });
  };
  const componentDidMount = () => {
    window.addEventListener("resize", this.handleResize);
  }

  const componentWillUnMount = () => {
    window.addEventListener("resize", this.handleResize);
  }
  const handleToDo = () => {
    setTodo(!todo);
  }
  console.log(Window_width);

  return (
    <>
      <Header {...props} />
      <div className="container">
        <div className="todo_wrap">
          {/* <div className="todo_btn">
            <span onClick={handleToDo} >To Dos</span>
            <span>Residents</span>
          </div> */}
          {/* {todo && */}
          {(Window_width < 1024) ? (todo ?
            <div className="responsive_ipad_wrap">
              <Todolist />
              <SearchList />
            </div>
            : ''
          )
            :
            <>
              <Todolist />
              <SearchList />
            </>}

          <TodoDetail />
        </div>
        <div className={`chat_toggle todo ` + (todo ? 'open' : '')} onClick={handleToDo}>
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
// export default Todo
