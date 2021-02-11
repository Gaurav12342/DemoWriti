import React, { useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PersistentTabs from '../../../components/common/Tab/PersistentTabs';
import UserResidentDetail from './UserResidentDetail';
import Image from '../../../components/common/Image';
import { Cancel } from '../../../assets/images/resident-detail/index';
import {
  closeResident,
  openResident,
} from '../../../appRedux/actions/Resident';
import { getLFName } from '../../../util/common';

const ResidentDetail = () => {
  const openedResidents = useSelector(
    (state) => state.resident.openedResidents
  );
  const currentResidentId = useSelector(
    (state) => state.resident.currentResidentId
  );

  const residentList = useMemo(
    () => (openedResidents ? Object.values(openedResidents) : []),
    [openedResidents]
  );
  const activeTabIndex = useMemo(
    () =>
      residentList
        ? residentList.findIndex((r) => r._id == currentResidentId)
        : undefined,
    [currentResidentId]
  );

  const handleCloseResident = useCallback((e, id) => {
    e.stopPropagation();
    closeResident({ id });
  }, []);

  const handleChangeTab = (index) => {
    if (openedResidents && Object.keys(openedResidents)) {
      let resi = null;
      resi = residentList[index];
      if (resi) openResident(resi);
    }
  };

  const renderHeader = useCallback(
    ({ item, isActive }) => (
      (
        <>
          <div className='resi_d'>
            {isActive && item?.image ? (
              <img src={item.image} alt='image' />
            ) : (
              getLFName(item)
            )}
            <h3>{item.mergeLFName}</h3>
          </div>
          {isActive && (
            <div
              className='resi_c'
              onClick={(e) => handleCloseResident(e, item._id)}
            >
              <Cancel />
            </div>
          )}
        </>
      )
    ),
    []
  );

  return (
    <div className='residents_detail_container'>
      <PersistentTabs
        key={'1st'}
        data={residentList}
        activeTabIndex={activeTabIndex}
        titleKey='mergeLFName'
        renderHeader={renderHeader}
        wrapperClass={'resi_sub_tab'}
        onSelect={handleChangeTab}
      >
        {residentList.map((d) => (
          <UserResidentDetail
            residentDetail={d}
            key={d.mergeLFName}
            userName={d.mergeLFName}
          />
        ))}
      </PersistentTabs>
    </div>
  );
};

export default ResidentDetail;
