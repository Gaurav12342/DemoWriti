/* eslint-disable indent */
import React, { Component } from 'react';
import Header from '../../components/Header';

class Layout extends Component {
    render() {
        return (<>
            <div className="container">
                <div className="pmr_wrap">
                    {this.props.children}
                </div>
            </div>
        </>);
    }
}

export default (Layout);