import React, { Component, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Search, Spin, Select, Option } from '../../../components/common';
import { Filters } from '../../../assets/images/resident-detail/index';
import axios from '../../../services/api/services/common';
import { getTodoList } from '../../../services/api/routes/pmr';
import SearchResidents from '../../../components/SearchResidents';
import HomeAreaFilter from '../../../components/HomeAreaFilter';
import { ViewTypeFilter } from '../../../components/Todo';
import { getLFName } from '../../../util/common';
import { displayPmrProcess } from '../../../util/todo';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import moment from 'moment';
import { TODO_CATEGORY, SUB_CATEGORY, STATUS } from '../../../constants/todo';
import { todoUpdate } from '../../../services/socket/routes/todo';

const ResidentList = (props) => {
  const { query, onsetActiveTodo, isPrimaryFilter, socket } = props;
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState({
    // ...query,
    page: 1,
    limit: 15,
  });
  const [todoList, setTodoList] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState();
  const [residents, setResidents] = useState([]);
  const [activeTodo, setActiveTodo] = useState(null);
  const [infyLoader, setInfyLoader] = useState(false);
  const mountRef = React.useRef(false);
  let scrollParentRef = null;

  useEffect(() => {
    //bcz of this hook api is calling 2 times
    if (mountRef.current) {
      let tempObj = {
        ...filter,
        ...query,
      };
      setFilter(tempObj);
    }
  }, [query]);

  useEffect(() => {
    if (mountRef.current) {
      if (filter.hasOwnProperty('orderNumber')) {
        const delayDebounceFn = setTimeout(() => {
          fetch();
        }, 600);
        return () => clearTimeout(delayDebounceFn);
      } else fetch();
    }
  }, [filter]);

  useEffect(() => {
    //need to give ref of detail
    if (!activeTodo) return;
    if (socket) {
      socket.on(todoUpdate, handleTodoUpdate);
      return () => {
        socket.off(todoUpdate);
      };
    }
  }, [activeTodo]);

  React.useEffect(() => {
    mountRef.current = true;
  }, []);

  const handleTodoUpdate = data => {
    if (data.length) {
      //Todo update in Medscheck container and PmrContainer(for Undo)
      let subCategory = data.filter(x => x.subCategory === SUB_CATEGORY.MED_REVIEW["MEDS_CHECK"] ||
        x.subCategory === SUB_CATEGORY.MED_REVIEW["PMR"])

      if (subCategory && activeTodo) {
        let todo = { ...activeTodo }
        let updatedTodo = data.filter(x => x.pmrId?._id === todo._id)
        console.log("SOCKET=>ResidentList -> updatedTodo", updatedTodo)
        let newTodoList = [...todoList]
        if (updatedTodo?.length && newTodoList.length) {
          let index = newTodoList.findIndex(x => x.todoDetail.toDoId === updatedTodo[0]._id)
          if (index !== -1) {
            //update entire object except latest key
            newTodoList[index].todoDetail = {
              ...newTodoList[index].todoDetail,
              status: updatedTodo[0].status,
              completedBy: updatedTodo[0].completedBy,
              completedAt: updatedTodo[0].completedAt,
            }
            newTodoList[index].latest = todo.latest
          }
          setTodoList(newTodoList)
          let setTodo = newTodoList[index] || todo
          setActiveTodo({ ...setTodo, isTodoUpdate: true })
          onsetActiveTodo({ ...setTodo, isTodoUpdate: true })

        }
      }
    }
  }

  const fetch = () => {
    // get todoList based on category and subcategory
    if (filter.page === 1) {
      setTodoList([])
      setLoader(true)
    }
    axios({ ...getTodoList, data: filter })
      .then((data) => {
        if (data.code === 'OK') {
          let lists = filter.page === 1 ? [] : [...todoList];
          lists = lists.concat(data.data.list);
          setTodoList(lists);
          setTotal(data.data.count);
          if (lists?.length > 0) handleTodoClick(data.data.list[0]);
          if (lists?.length === 0) handleTodoClick(null);
          if (data.data.list.length < filter.limit)
            setHasMore(false)
          else
            setHasMore(true)
        }
        setLoader(false);
        setInfyLoader(false)
      })
      .catch((err) => {
        setLoader(false);
        setInfyLoader(false)
      });
  };

  const handleInfiniteOnLoad = (page) => {
    setInfyLoader(false)
    setFilter({
      ...filter,
      page: page + 1
    })
  }

  const handleSearchRx = (e) => {
    let value = e.target.value;
    let obj = {
      ...filter,
      orderNumber: value,
    };
    setFilter(obj);
  };

  const handleSelectResident = (val) => {
    let obj = {
      ...filter,
      residentId: val?.length > 0 ? val : undefined,
    };
    setFilter(obj);
  };

  const handleTodoClick = (val) => {
    setActiveTodo(val);
    onsetActiveTodo(val);
  };
  const text = (latest) => (<span className='tooltip-desc'>
    <p className='desc-1'>PMR Current Status</p>
    <p className='desc-2'>
      {latest?.message || displayPmrProcess(latest, 'list')}
    </p>
  </span>
  );

  const getOverDue = (x) => {
    let date = x.pmrScheduleGroupId?.startDate;
    let subtractDays = x.dueDays;
    const dueDate = moment(date).subtract(subtractDays, 'days');
    // const dueDays = dueDate.diff(moment(), 'days');
    // const dueText = dueDays < 0 ? 'Overdue' : 'Due in';
    // return dueText + ' ' + Math.abs(dueDays) + ' days';
    const days = moment().diff(dueDate, 'days');
    if (days > 0)
      return `Overdue ${Math.abs(days)} ${Math.abs(days) === 1 ? 'day' : 'days'}`
    else if (days === 0)
      return `Due Today`
    else
      return `Due in ${Math.abs(days)} ${Math.abs(days) === 1 ? 'day' : 'days'}`
  };

  const handleHomeArea = (val) => {
    let tempFilter = {
      ...filter,
      homeAreaId: val ? val : undefined,
    };
    setFilter(tempFilter);
  };

  const handleViewType = (viewType) => {
    let tempFilter = {
      ...filter,
      viewType: viewType,
    };
    setFilter(tempFilter);
  };
  console.log(90, filter)
  return (
    <div className='prep_left_wrap'>
      <div className='stiky-box'>
        <form action=''>
          <div className='form_wrap'>
            <div className='components mb-12 wd100'>
              <HomeAreaFilter
                placeholder='Filter Homearea'
                onChange={handleHomeArea}
              />
            </div>
          </div>
          <div className='form_wrap'>
            <div className='components mb-12 wd100'>
              <ViewTypeFilter
                viewType={filter.viewType}
                isPrimaryFilter={isPrimaryFilter}
                onChangeListview={handleViewType}
              />
            </div>
          </div>
        </form>
      </div>

      <div className='name-day-list' ref={(ref) => (scrollParentRef = ref)}>
        {loader ? (
          <Spin spinning={loader} str='center' />
        ) : todoList?.length > 0 ? (
          <InfiniteScroll
            initialLoad={false}
            loadMore={handleInfiniteOnLoad}
            hasMore={hasMore && !loader && !infyLoader}
            useWindow={false}
            getScrollParent={() => scrollParentRef}
            threshold={20}
          >
            {todoList.map((x) => (
              <>
                <div
                  className={`overdue-block ${
                    x._id === activeTodo?._id ? ' active' : ''
                    }`}
                  onClick={() => handleTodoClick(x)}
                >
                  <div className='resi_img mr-17'>
                    {x.patientId.image ? (
                      <img src={x.patientId.image} />
                    ) : (
                        getLFName({ mergeLFName: x.patientId.mergeLFName })
                      )}
                  </div>
                  <div className='made-line'>
                    <span>{x.patientId.mergeLFName}</span>
                    <p>{getOverDue(x)}</p>
                  </div>
                  <Tooltip placement='top' overlay={text(x.latest)}>
                    <img
                      src={require('../../NursePrep/img/info.svg')}
                      className='info-left'
                    />
                  </Tooltip>
                </div>
              </>
            ))}
            {infyLoader ? <Spin spinning={infyLoader} str='center autoheight' /> : null}
          </InfiniteScroll>
        ) : (
              <p className='text-center'>No Data</p>
            )}
      </div>
    </div>

    // <div className="searchlist">
    //   <div className="form_wrap col-12 form_group with_filter" style={{ padding: '12px 20px 0', marginBottom: 0 }}>
    //     <SearchResidents placeholder="Search Resident" allowClear
    //       onSelectResident={handleSelectResident} />
    //     <Filters />
    //   </div>
    //   <div className="form_group">
    //     <Search placeholder='Search by Rx Order'
    //       onChange={handleSearchRx}
    //       allowClear={true} />
    //   </div>
    //   <div className="listing" ref={(ref) => scrollParentRef = ref}>
    //     {
    //       loader ?
    //         <Spin spinning={loader} str='center' />
    //         : todoList?.length > 0 ?
    //           <InfiniteScroll
    //             initialLoad={false}
    //             loadMore={handleInfiniteOnLoad}
    //             hasMore={hasMore && !loader}
    //             useWindow={false}
    //             getScrollParent={() => scrollParentRef}
    //           >
    //             {
    //               todoList.map(x => <>
    //                 <a href="#" className={`media ${x._id === activeTodo?._id ? " active" : ""}`} onClick={() => handleTodoClick(x)}>
    //                   {/* <a href="#" className="media offline"> */}
    //                   <div className="contact-profile">
    //                     {x.residentId.image ?
    //                       <img src={x.residentId.image} />
    //                       : getLFName({ mergeLFName: x.residentId.mergeLFName })}
    //                   </div>
    //                   <div className="media-body">
    //                     <h3 className="name">{x.residentId.mergeLFName}</h3>
    //                     <p className="desc">{x.orderNumber}</p>
    //                   </div>
    //                 </a>
    //               </>)
    //             }
    //           </InfiniteScroll>
    //           : <p className="text-center">No Data</p>
    //     }
    //   </div>
    // </div>
  );
};
export default ResidentList;
