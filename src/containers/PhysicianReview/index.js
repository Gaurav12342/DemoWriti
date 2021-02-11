import React, { Component } from 'react';
import Header from '../../components/Header';
import LeftSide from './View/leftside';
import RightSide from './View/rightside';
// import Residents from '../ResidentDetail/View/residentDetail';

class PhysicianReview extends Component {
  render() {
    console.log("TCL: PhysicianReview")
    return (<>
      {/* <Header /> */}
      <div className="container">
        <div className="prep_wrap">
          <LeftSide />
          <RightSide />
        </div>
      </div>
    </>);
  }
}
export default PhysicianReview;