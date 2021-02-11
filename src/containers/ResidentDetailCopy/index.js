/* eslint-disable semi */
import React, { Component } from 'react';
import Header from '../../components/Header';
import Residents from './View/residents';
import ResidentsDetail from './View/ResidentDetail';


class ResidentDetail extends Component {
  render() {
    return (<>
      {/* {/* <Header /> */} */}
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
