import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDoubleLeft, Filters, PlusBtn } from '../../../assets/images/resident-detail/index';
import ResidentBlock from './ResidentBlock';
import ResidentListFilter from './ResidentListFilter';
import { getResidents } from '../../../services/api/routes/resident'
import axios from '../../../services/api/services/common'
import { Toast, Spin, Search } from '../../../components/common';
import InfiniteScroll from 'react-infinite-scroller';

const residentData = Array(12).fill('').map((v, i) =>
    ({
        name: `User ${i + 1}`,
        image: require('../../../assets/images/user.jpg'),
        meta: 'ACTIVE | Room : 2056',
        isActive: i !== 2,
        id: `RBlock${i}`
    })
)

const CollapsedBar = ({ toggleCollapsedBar }) => {
    return (
        <div className={`residents_container collapsed`}>
            <div className="search_resi form">
                <div className="hide_pane">
                    <a className={`collapse_pane collapsed`} onClick={toggleCollapsedBar}>
                        <ChevronDoubleLeft />
                    </a>
                </div>
            </div>
            <h4 className="pane_name"> ALL RESIDENTS </h4>
        </div>
    )
}

const Residents = (props) => {
    const openedResidents = useSelector(state => state.resident.openedResidents)
    const [showFilter, setShowFilter] = useState(false);
    const [showSidePane, setShowSidePane] = useState(true);
    const [loader, setLoader] = useState(false);
    const [count, setCount] = useState(0);
    const [residentData, setResidentData] = useState([]);
    const [filter, setFilter] = useState({
        pageNo: 1,
        limit: 15,
        select: [],
        sort: { createdAt: -1 },
        where: {}
    });

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        setLoader(true)
        let res = await axios({ ...getResidents, data: { ...filter } })
        if (res) {
            if (res.code === 'OK') {
                setResidentData(res.data.data)
            } else
                Toast.error(res.message)
        }
        setLoader(false)
    }

    const onSearch = (e) => {
        console.log("onSearch -> e", e)

    }

    return (
        <>
            {
                !showSidePane ?
                    <CollapsedBar toggleCollapsedBar={() => setShowSidePane(true)} />
                    :
                    <div className='residents_container'>

                        <div className="search_resi form">
                            <form>
                                <div className="form_group">
                                    <Search style={{ width: '100%' }}
                                        placeholder='Search Resident'
                                        onChange={onSearch}
                                    />
                                </div>
                            </form>
                            <div className="hide_pane">
                                <a
                                    className={`show_filter ${showFilter && 'showed'}`}
                                    onClick={() => setShowFilter(s => !s)}
                                >
                                    <Filters />
                                </a>
                                <a
                                    className='collapse_pane'
                                    onClick={() => setShowSidePane(s => !s)}>
                                    <ChevronDoubleLeft />
                                </a>
                            </div>
                        </div>

                        {
                            !showFilter ?
                                <>
                                    <div className="resi_person_wrap">
                                        {
                                            residentData.map((user, i) => (
                                                <ResidentBlock
                                                    isOpened={!!openedResidents[user.id]}
                                                    user={user}
                                                    key={user._id}
                                                />
                                            ))
                                        }
                                    </div>
                                    <div className="add_resident">
                                        <PlusBtn />
                                        <h3>Add Resident</h3>
                                    </div>
                                </>
                                :
                                <ResidentListFilter />
                        }
                    </div>
            }

        </>
    )
}

export default Residents