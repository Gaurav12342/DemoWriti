import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import PersistentTabs from "../../../components/common/Tab/PersistentTabs";
import UserResidentDetail from "./UserResidentDetail";
import Image from '../../../components/common/Image';
import { Cancel } from '../../../assets/images/resident-detail/index';
import { closeResident } from '../../../appRedux/actions/Resident'

const ResidentDetail = () => {
  const openedResidents = useSelector(state => state.resident.openedResidents);
  const currentResidentId = useSelector(state => state.resident.currentResidentId);

  const residentList = useMemo(() => Object.values(openedResidents), [openedResidents])
  const activeTabIndex = useMemo(() => residentList.findIndex(r => r._id == currentResidentId), [currentResidentId])

  const handleCloseResident = useCallback((id) => {
    closeResident({ id })
  }, [])

  const renderHeader = useCallback(({ item, isActive }) => (
    <>
      <div className="resi_d">
        {isActive && <Image image={require('../../../assets/images/user.jpg')} />}
        <h3>{item.mergeLFName}</h3>
      </div>
      {isActive &&
        <div className="resi_c" onClick={() => handleCloseResident(item._id)}>
          <Cancel />
        </div>}
    </>
  ), [])

  return (
    <div className="residents_detail_container">
      <PersistentTabs
        key={'1st'}
        data={residentList}
        activeTabIndex={activeTabIndex}
        titleKey='mergeLFName'
        renderHeader={renderHeader}
        wrapperClass={'resi_sub_tab'}
      >
        {
          residentList.map(d => (
            <UserResidentDetail residentDetail={d} key={d.mergeLFName} userName={d.mergeLFName} />
          ))
        }
      </PersistentTabs>

    </div>
  )
}

export default ResidentDetail
