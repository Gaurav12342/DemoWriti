import React, { Component } from 'react';
import { Nodata } from '../../../assets/images/index';

class NoData extends Component {
  render() {
    return (
      <div className="nodata_wrap">
        <Nodata />
        <h3>No records found.</h3>
      </div>
    );
  }
}
export default NoData;
