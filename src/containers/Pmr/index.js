/* eslint-disable indent */
import React, { Component } from 'react';
import Header from '../../components/Header';
import PageHead from './View/pageHead';
import PmrList from './View/pmrList';

class Pmr extends Component {
    render() {
        console.log("TCL: Pmr")
        return (<>
            {/* <Header /> */}
            <div className="container">
                <div className="pmr_wrap">
                    <PageHead />
                    <PmrList />
                </div>
            </div>
        </>);
    }
}
export default (Pmr);