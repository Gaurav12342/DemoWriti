import React, { Component } from 'react';
import Header from '../../components/Header';
import Virtualhead from '../VirtualVisitRequest/View/pageHead';
import VisitList from './View/visitList';
import '../../styles/scss/VirtualVisitRequest/style.scss';

class VirtualVisitRequest extends Component {
  render() {
    return (    
      <>
        {/* <Header /> */}
        <div className="container">
          <div className="virtualvisit_wrap">
            <Virtualhead />
            <VisitList />
          </div>
        </div>
      </>
    );
  }
}
export default VirtualVisitRequest;
