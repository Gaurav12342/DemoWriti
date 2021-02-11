import React, { Component, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Search, Spin, Select, Option } from '../../../components/common'
import { Filters } from '../../../assets/images/resident-detail/index';
import axios from '../../../services/api/services/common'
import { getTodoList as presTodo } from '../../../services/api/routes/prescriptionTodo';
import { getTodoList as pmrTodo } from '../../../services/api/routes/pmr';
import SearchResidents from '../../../components/SearchResidents'
import { getLFName } from '../../../util/common'

const ResidentList = props => {
  const { query, onsetActiveTodo, type } = props
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState({
    ...query,
    // "residentId": ["5fd08ab91d2f807dae615505", "5ce3debd9e63335be089caa9", "5fcdb947e6dcac6dd7f10315"],
    // "physicianId": ["5fc101220089781f3b221eaa", "5fca24d40cb2f70380bff79f"],
    "page": 1,
    "limit": 15
  });
  const [todoList, setTodoList] = useState([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState()
  const [residents, setResidents] = useState([]);
  const [activeTodo, setActiveTodo] = useState(null);
  const [infyLoader, setInfyLoader] = useState(false);
  const mountRef = React.useRef(false);
  let scrollParentRef = null

  useEffect(() => {
    if (mountRef.current) {
      let tempObj = {
        ...filter,
        ...query,
        "page": 1,
      }
      setFilter(tempObj)
    }
  }, [query])

  useEffect(() => {
    if (mountRef.current) {
      if (filter.hasOwnProperty('orderNumber')) {
        const delayDebounceFn = setTimeout(() => {
          fetch()
        }, 600)
        return () => clearTimeout(delayDebounceFn)
      } else
        fetch()
    }
  }, [filter]);

  React.useEffect(() => {
    // do not change sequence of this hook
    mountRef.current = true;
    fetch()
  }, [])
  const fetch = () => {
    // get todoList based on category and subcategory
    if (filter.page === 1) {
      setTodoList([])
      setLoader(true);
    }
    const apiData = type === 'medReview' ? pmrTodo : presTodo
    axios({ ...apiData, data: filter }).then(data => {
      if (data.code === 'OK') {
        let lists = filter.page === 1 ? [] : [...todoList]
        lists = lists.concat(data.data.list)
        setTodoList(lists)
        setTotal(data.data.count)
        if (lists?.length > 0 && filter.page === 1)
          handleTodoClick(data.data.list[0])
        if (lists?.length === 0)
          handleTodoClick(null)
        if (data.data.list.length < filter.limit)
          setHasMore(false)
        else
          setHasMore(true)
      }
      setLoader(false)
      setInfyLoader(false)
    }).catch(err => {
      setLoader(false)
      setInfyLoader(false)
    })
  }

  const handleInfiniteOnLoad = (page) => {
    setInfyLoader(true)
    setFilter({
      ...filter,
      page: page + 1
    })
  }

  const handleSearchRx = (e) => {
    let value = e.target.value
    let obj = {
      ...filter,
      orderNumber: value,
      "page": 1,
    }
    setFilter(obj)
  }

  const handleSelectResident = val => {
    let obj = {
      ...filter,
      residentId: val?.length > 0 ? val : undefined,
      "page": 1,
    }
    setFilter(obj)
  }

  const handleTodoClick = val => {
    setActiveTodo(val)
    onsetActiveTodo(val)
  }

  return (
    <div className="searchlist">
      <div className="form_wrap col-12 form_group with_filter" style={{ padding: '12px 20px 0', marginBottom: 0 }}>
        <SearchResidents placeholder="Search Resident" allowClear
          onSelectResident={handleSelectResident} />
        <Filters />
      </div>
      <div className="form_group search_box">
        <Search placeholder='Search by Rx Order'
          value={filter.orderNumber}
          onChange={handleSearchRx}
          allowClear={true} />
      </div>
      <div className="listing" ref={(ref) => scrollParentRef = ref}>
        {
          loader ?
            <Spin spinning={loader} str='center' />
            : todoList?.length > 0 ?
              <InfiniteScroll
                initialLoad={false}
                loadMore={handleInfiniteOnLoad}
                hasMore={hasMore && !loader && !infyLoader}
                useWindow={false}
                getScrollParent={() => scrollParentRef}
                threshold={20}
              >
                {
                  todoList.map((x, i) => {
                    const patientData = type === 'medReview' ? x?.patientId : x?.residentId;
                    const orderNumber = type === 'medReview' ? x?.pmrId : x?.orderNumber;

                    return <>
                      <a href="#" className={`media ${x._id === activeTodo?._id ? " active" : ""}`} onClick={() => handleTodoClick(x)}>
                        {/* <a href="#" className="media offline"> */}
                        <div className="contact-profile">
                          {patientData.image ?
                            <img src={patientData.image} />
                            : getLFName({ mergeLFName: patientData.mergeLFName })}
                        </div>
                        <div className="media-body">
                          <h3 className="name">{patientData.mergeLFName}</h3>
                          <p className="desc">{orderNumber}</p>
                        </div>
                      </a>
                    </>
                  })
                }
                {infyLoader ? <Spin spinning={infyLoader} str='center autoheight' /> : null}
              </InfiniteScroll>
              : <p className="text-center">No Data</p>
        }
      </div>
    </div>
  );

}
export default ResidentList;
