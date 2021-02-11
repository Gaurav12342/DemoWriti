import React, { Component } from 'react';
import Header from '../../components/Header';
import AddPmrDetail from './View/add-pmr-detail';
import LeftSide from '../NursePrep/View/leftside';

class AddPmr extends Component {
  render() {
    console.log('AddPmr')
    return (<>
      <div className="container">
        <div className="prep_wrap">
          <LeftSide />
          <AddPmrDetail />
        </div>
      </div>
    </>);
  }
}
export default AddPmr;