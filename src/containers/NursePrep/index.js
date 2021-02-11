import React, { Component } from 'react';
import Header from '../../components/Header';
import LeftSide from './View/leftside';
import RightSide from './View/rightside';

class NursePrep extends Component {
  
  render() {
     
    return (<>
      {/* <Header /> */}
      <div className="container">
        <div className="prep_wrap">
          <LeftSide/>
          <RightSide/>
        </div>
      </div>
    </>);
  }
}
export default NursePrep;