import React, { memo } from 'react';
import { MoreDots } from '../../../assets/images/pmr/index';
import Image from '../../../components/common/Image';
import { openResident } from './../../../appRedux/actions/Resident'
import userImage from '../../../assets/images/user.jpg'

const ResidentBlock = ({ user, isOpened = false }) => {
  const { _id, mergeLFName, room, image, isActive } = user;

  const handleClick = () => {
    openResident({ _id, mergeLFName })
  }

  return (
    <div onClick={handleClick} className={`resi_person ${isOpened && 'opened'}`}>
      <div className={`person_name ${isActive ? 'active' : 'inactive'}`}>
        <Image image={image || userImage} alt="image" />
        <div>
          <h4>{mergeLFName}</h4>
          <div className="r_room">
            <span className={`status ${isActive ? 'active' : 'inactive'}`}></span>
            <p>{isActive ? 'ACTIVE' : 'DE-ACTIVE'} | Room : {room}</p>
          </div>
        </div>

      </div>
      <div className="more">
        <MoreDots />
      </div>
    </div>
  )
}
export default memo(ResidentBlock);