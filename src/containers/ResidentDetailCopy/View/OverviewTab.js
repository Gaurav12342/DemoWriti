import React from 'react'
import Image from '../../../components/common/Image'
const Overview = () => {
  return (
    <div className='resident_overview'>
      <div className='overview_header'>
        <Image image={require('./../../../assets/images/user.jpg')} alt="image" />
        <div className='user_information'>
          <h4>O'Laughlin, Craig</h4>
          <div className="r_room">
            <span className='status'></span>
            <p>{'ACTIVE'}</p>
          </div>
        </div>
      </div>
      <div className='overview_content'>
        <div className='information_block'>
          <span className='label'>Date of Birth</span>
          <span className='value'>18th Mar, 1980 (40 Years)</span>
        </div>
      </div> 
    </div>
  )
}
export default Overview