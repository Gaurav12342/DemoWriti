/* eslint-disable semi */
import React, { Component } from 'react';
import Header from '../../components/Header';
import Residents from './View/Residents';
// import ResidentsDetail from './View/ResidentDetail1';
// import ResidentsDetail from '../ResidentDetailCopy/View/ResidentDetail';
import ResidentsDetail from '../../containers/ResidentDetail/View/ResidentDetail';


class ResidentDetail extends Component {
  render() {
    return (<>
      {/* {/* <Header /> */}
      <div className="container">
        <div className="resident_wrapper">
          <Residents />
          <ResidentsDetail />
        </div>
      </div>
    </>)
  }
}
export default (ResidentDetail);
