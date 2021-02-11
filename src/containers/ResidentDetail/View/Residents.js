import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { ChevronDoubleLeft, Filters, PlusBtn } from '../../../assets/images/resident-detail/index';
import ResidentBlock from './ResidentBlock';
import ResidentListFilter from './ResidentListFilter';
import { getResidents } from '../../../services/api/routes/resident'
import axios from '../../../services/api/services/common'
import { Toast, Spin, Search } from '../../../components/common';
import AddResidentPopup from './AddResident/index';
import { MoreDots } from '../../../assets/images/pmr/index';
import Image from '../../../components/common/Image';
import TogglePane from "./togglePane";
import { canPerformAction } from '../../../util/common'
import { ACTIONS, MODULE } from '../../../constants/subscription';
import { STATUS } from '../../../constants/resident';
import InfiniteScroll from 'react-infinite-scroller';
import { openResident } from '../../../appRedux/actions/Resident'

const initFilter = {
    page: 1,
    limit: 15,
    fields: [],
    sortBy: { mergeLFName: 'ASC' },
    find: { status: STATUS.ACTIVE },
    populate: [{ 'homeAreaId': ['name'] }, {
        'physicianId': [
            "mergeLFName",
            "type",
            {
                "assignedCustomer": [
                    "isActive",
                    "homeId",
                    {
                        "designationId": [
                            "name",
                            "code",
                            "parentId"
                        ]
                    }
                ],
                // match: { homeId: '5cd963ea1fd1603a09ae7f9f' }
            }
        ]
    },]
}

const Residents = (props) => {
    const openedResidents = useSelector(state => state.resident.openedResidents)
    const [showFilter, setShowFilter] = useState(false);
    const [hidePane, setHidePane] = useState(false);
    const [loader, setLoader] = useState(false);
    const [infyLoader, setInfyLoader] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [count, setCount] = useState(0);
    const [residentData, setResidentData] = useState([]);
    const [filter, setFilter] = useState(initFilter);
    const [showAddResident, setShowAddResident] = useState(false);
    const [isAddResidentValidated, setIsAddResidentValidated] = useState(false);
    const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
    const addResidentParams = {
        moduleId: MODULE.RESIDENT,
        actiontoCheck: ACTIONS.ADD.CODE,
    }

    const handleResize = () => {
        if (WindowWidth > 1023) {
            setHidePane(false)
        }
        else {
            setHidePane(true)
        }
    }

    useEffect(() => {
        window.addEventListener("load", handleResize);
    }, [])

    useEffect(() => {
        if (filter.hasOwnProperty('search') && filter.search['keyword']) {
            const delayDebounceFn = setTimeout(() => {
                fetch()
            }, 600)
            return () => clearTimeout(delayDebounceFn)
        } else
            fetch()
    }, [filter])

    const fetch = async () => {
        if (filter.page === 1) {
            setResidentData([])
            setLoader(true)
        }

        try {
            let res = await axios({ ...getResidents, data: { 'query': { ...filter } } })
            if (res) {
                if (res.code === 'OK') {
                    let listData = filter.page === 1 ? [] : [...residentData]
                    listData = listData.concat(res.data.data)
                    setResidentData(listData)
                    setCount(res.data.count)
                    if (res.data.data.length < filter.limit)
                        setHasMore(false)
                    else
                        setHasMore(true)
                    if (listData.length > 0 && openedResidents && Object.keys(openedResidents).length === 0) {
                        let user = listData[0]
                        openResident(user)
                    }
                    // if (filter.page === 1) {
                    //     document.getElementsByClassName('resi_person_wrap')[0].scrollTo(0, 0)
                    // }
                } else
                    Toast.error(res.message)
            }
            setLoader(false)
            setInfyLoader(false)
        }
        catch{
            setLoader(false)
            setInfyLoader(false)
        }
    }

    const handleInfiniteLoad = (page) => {
        setInfyLoader(true)
        setFilter({
            ...filter,
            page: page + 1
        })
    }

    const onSearch = (e) => {
        console.log("onSearch -> e", e)
        let value = e.target.value
        let obj = {
            ...filter,
            page: 1,
            search: {
                keyword: value,
                keys: ['mergeLFName'],
            }
        }
        setFilter(obj)
    }

    const applyFilter = (filterObj) => {
        setFilter({ ...filterObj, page: 1, })
        setShowFilter(false)
    }

    const handleAddResident = (action) => {
        setShowAddResident(action)
    }

    const handleAddedResident = (isAdded) => {
        if (isAdded) {
            fetch()
        }
    }
    return (<>
        <div className={hidePane ? 'residents_container collapsed' : 'residents_container'}>
            <div className="search_resi form">
                {
                    !hidePane &&
                    <form>
                        <div className="form_group">
                            <Search style={{ width: '100%' }}
                                placeholder='Search Resident'
                                onChange={onSearch}
                                allowClear={true}
                            />
                        </div>
                    </form>
                }
                <div className="hide_pane">
                    {
                        !hidePane &&
                        <a
                            className={`show_filter ${showFilter && 'showed'}`}
                            onClick={() => setShowFilter(s => !s)}
                        >
                            <Filters />
                        </a>
                    }
                    <a className={hidePane ? 'collapse_pane collapsed' : 'collapse_pane'}
                        onClick={() => setHidePane(!hidePane)}>
                        <ChevronDoubleLeft />
                    </a>
                </div>
            </div>

            {hidePane &&
                <h4 className="pane_name">
                    ALL RESIDENTS
                        </h4>
            }
            {!hidePane ? <>
                {!showFilter ?
                    <div className="resi_person_wrap">
                        {loader ?
                            <Spin spinning={loader} str='center' />
                            : null}
                        {
                            residentData && residentData.length > 0 ?
                                <InfiniteScroll
                                    initialLoad={false}
                                    loadMore={handleInfiniteLoad}
                                    hasMore={hasMore && !loader && !infyLoader}
                                    threshold={20}
                                    useWindow={false}
                                >
                                    {
                                        residentData.map((user, i) => (
                                            <ResidentBlock i={i}
                                                isOpened={!!openedResidents[user._id]}
                                                user={user}
                                                key={user._id}
                                            />
                                        ))
                                    }
                                    {infyLoader ? <Spin spinning={infyLoader} str='center autoheight' /> : null}
                                </InfiniteScroll>
                                : <p className="text-center">No Data</p>
                        }
                    </div>
                    : null
                }
                < ResidentListFilter showFilter={showFilter} filter={filter} initFilter={initFilter}
                    onChangeFilter={applyFilter} />
            </> : null}
            {(!hidePane && !showFilter) && <>
                {
                    canPerformAction(addResidentParams) ? <div className="add_resident" onClick={() => handleAddResident(true)}>
                        <PlusBtn />
                        <h3>Add Resident</h3>
                    </div> : null
                }
            </>
            }
            {
                showAddResident ? <AddResidentPopup
                    homeId={props.homeId}
                    authUser={props.authUser}
                    isVisible={showAddResident}
                    onAddedResident={handleAddedResident}
                    onCancel={() => handleAddResident(false)}
                /> : null
            }
        </div>
    </>)

}

const mapStateToProps = ({ auth }) => {
    const { authUser, homeId } = auth;
    return { authUser, homeId };
};
export default connect(mapStateToProps)(Residents) 