import React, { Component, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PmrContainer from './components/PmrContainer'
import ResidentList from './components/ResidentList'
import { getDeviceView } from '../../util/todo'
import queryString from "query-string";
import { TODO_CATEGORY, SUB_CATEGORY, MAP_TODOS } from '../../constants/todo';
import { DEVICE_VIEW } from '../../constants/prescription'
import { NoData } from '../../components/common';
import _ from 'lodash'

function PmrTodo(props) {
  const { authUser, location, onsetActiveTodo, socket } = props

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [todo, setTodo] = useState(false);
  const [activeTodo, setActiveTodo] = useState(null);
  const [query, setQuery] = useState(null)
  const [isPrimaryFilter, setIsPrimaryFilter] = useState(false);
  const todoRef = useRef(false)

  useEffect(() => {
    let queryObj = queryString.parse(location.search);
    if (_.isEmpty(queryObj))
      return
    queryObj = {
      ...queryObj,
      category: TODO_CATEGORY.MED_REVIEW,
      subCategory: parseInt(queryObj.subCategory),
      viewType: parseInt(queryObj.viewType),
    }
    let obj = getDeviceView(queryObj, authUser)
    queryObj.viewType = obj.viewType
    setIsPrimaryFilter(obj.deviceView)
    setQuery(queryObj)
  }, [])


  const handleResize = (e) => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])

  const handleToDo = () => {
    setTodo(!todo);
  }

  const handleSetActiveTodo = (val) => {
    console.log("handleSetActiveTodo -> val", val)
    if (val?.isTodoUpdate) {
      todoRef.current = true
    }
    setActiveTodo(val)
  }

  const listProps = {
    query: query, onsetActiveTodo: handleSetActiveTodo, isPrimaryFilter: isPrimaryFilter, socket
  }

  return (
    <>
      <div className="container">
        <div className="todo_wrap">
          {(windowWidth < 1024) ? (todo ?
            <div className="responsive_ipad_wrap">
              <ResidentList {...listProps} />
            </div>
            : '') :
            <ResidentList {...listProps} />
          }
          {
            activeTodo ?
              <PmrContainer activeTodo={activeTodo} query={query} todoRef={todoRef}
                onTodoRef={() => todoRef.current = false} />
              : <div className='prep_right_wrap'><NoData /></div>
          }
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
  const { authUser, socket } = auth
  return {
    authUser, socket
  }
}
export default withRouter(connect(mapStateToProps)(PmrTodo));