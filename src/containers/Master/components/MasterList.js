import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { withRouter, Link } from 'react-router-dom';
import { masterPaginate } from '../../../services/api/routes/master';
import axios from '../../../services/api/config';
import { Search, Toast } from '../../../components/common/index';
import { USER_TYPE } from '../../../constants/User';
import { MASTER_MEDIUM } from '../../../constants/MasterMedium';

const MasterList = (props) => {
  const { onSelect, authUser } = props
  const [data, setData] = useState([]);
  const isHomeAdmin = authUser && authUser.type === USER_TYPE.HOME.ADMIN
  const isPharmacyAdmin = authUser && authUser.type === USER_TYPE.PHARMACY.ADMIN
  let filterBy = {
    masterForMedium: isHomeAdmin ? MASTER_MEDIUM.HOME : isPharmacyAdmin ? MASTER_MEDIUM.PHARMACY : undefined
  }
  const [filter, setFilter] = useState({
    page: 1,
    fields: [],
    populate: [{ "homeId": null }, { "pharmacyId": null }],
    sortBy: { createdAt: 'DESC' },
    find: { parentId: null, ...filterBy }
  });

  useEffect(() => {
    if (filter.hasOwnProperty('search') && filter.search['keyword']) {
      const delayDebounceFn = setTimeout(() => {
        fetch();
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    } else fetch();
  }, [filter]);

  const handleSearch = (event) => {
    let value = event.target.value;
    let obj = {
      ...filter,
      page: 1,
      search: {
        keyword: value,
        keys: ['name', 'code'],
      },
    };
    setFilter(obj);
  };
  const modifiedList = (list) => {
    let modifiedList = list.map((current, index) => {
      return current;
    });
    return modifiedList;
  };

  const fetch = () => {
    axios({ ...masterPaginate, data: { query: { ...filter } } })
      .then(({ data }) => {
        if (data.code === 'OK') {
          let updatedList = modifiedList(data.data.data);
          let detail = updatedList.find(x => x._id === props.match.params.id)
          if (detail)
            onSelect(detail)
          setData(updatedList);
        }
      })
      .catch((err) => {

      });
  };

  function getSourceMedium(masterDetail) {
    return masterDetail?.masterForMedium === MASTER_MEDIUM.PHARMACY ? '(Pharmacy)' :
      masterDetail?.masterForMedium === MASTER_MEDIUM.HOME ? '(Home)' : ''
  }

  return (
    <>
      <div className='master residents_container'>
        {/* <div className='resi_person_wrap'> */}
        <div className='resi_person_wrap masterlist-header'>
          <h3
            style={{
              marginLeft: '4%'
            }}
          >
            Master
          </h3>
          <div className='form_group' style={{ margin: '4%' }}>
            <Search
              allowClear={true}
              onChange={handleSearch}
              placeholder='Name / Code'
            />
          </div>
          <div className='resi_person_wrap' style={{

          }}>
            <InfiniteScroll initialLoad={true}>
              {data &&
                data.map((data) => {
                  return (
                    <>
                      <Link
                        style={{ color: '#FFFFFF', textDecoration: 'none' }}
                        to={`/sub-master/${data._id}`}
                      >
                        {data._id === props.match.params.id ? (
                          <div
                            className='resi_person opened'
                            style={{ backgroundColor: '#609FAE' }}
                          >
                            <div className='person_name active'>
                              <div className="full_width">
                                <div className='r_room'>
                                  <h4>{data.name}{getSourceMedium(data)}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <div className='resi_person' onClick={() => onSelect(data)}>
                              <div className='person_name inactive'>
                                <div className="full_width">
                                  <div className='r_room'>
                                    <h4>{data.name}{getSourceMedium(data)}</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </Link>
                    </>
                  );
                })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(MasterList);
