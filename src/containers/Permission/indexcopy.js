/* eslint-disable indent */
import React, { Component } from 'react';
import Header from '../../components/Header';
import PageHead from './View/pageHead';
import Permissions from './View/permission';

class PermissionsClass extends Component {
    render() {
        console.log("TCL: Pmr")
        return (<>
            {/* <Header /> */}
            <div className="container">
                <div className="permission_wrap">
                    <PageHead />
                    <Permissions />
                </div>
            </div>
        </>);
    }
}
export default (PermissionsClass);