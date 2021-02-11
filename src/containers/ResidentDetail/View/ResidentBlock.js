import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { MoreDots } from '../../../assets/images/pmr/index';
import Image from '../../../components/common/Image';
import { openResident } from './../../../appRedux/actions/Resident';
import userImage from '../../../assets/images/user.jpg';
import { STATUS } from '../../../constants/resident';
import { getLFName } from '../../../util/common';

const ResidentBlock = ({ user, isOpened = false }) => {
  const { _id, mergeLFName, room, image } = user;
  const currentResidentId = useSelector(
    (state) => state.resident.currentResidentId
  );

  const handleClick = () => {
    openResident(user);
  };
  const isActive = STATUS.ACTIVE === user.status;

  return (
    <div
      onClick={handleClick}
      className={`resi_person ${
        isOpened && currentResidentId === user._id ? 'opened' : ''
      }`}
    >
      <div className={`person_name ${isActive ? 'active' : 'inactive'}`}>
        {image ? <img src={image} alt='image' /> : getLFName(user)}
        <div>
          <h4>{mergeLFName}</h4>
          <div className='r_room'>
            <span
              className={`status ${isActive ? 'active' : 'inactive'}`}
            ></span>
            <p>
              {isActive ? 'ACTIVE' : 'DE-ACTIVE'} | Room : {room}
            </p>
          </div>
        </div>
      </div>
      <div className='more'>
        <MoreDots />
      </div>
    </div>
  );
};
export default memo(ResidentBlock);
