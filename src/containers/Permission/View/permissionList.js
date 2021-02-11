/* eslint-disable indent */
import React, { Component } from 'react';
import { PlusBtn } from '../../../assets/images/resident-detail/index';

class PermissionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandRow: false,
            expandSubRow: false,
        };

        this.handleExpandMain = this.handleExpandMain.bind(this);
        this.handleExpandSub = this.handleExpandSub.bind(this);
    }
    handleExpandMain = () => {
        const expandRow = this.state.expandRow;
        this.setState({ expandRow: !expandRow })
    };
    handleExpandSub = () => {
        const expandSubRow = this.state.expandSubRow;
        this.setState({ expandSubRow: !expandSubRow })
    };
    render() {

        return (<>
            <div className="permissions_list_wrap">
                <div className="permission_filter">
                    <label for="allp" className="filter_check">
                        <input type="checkbox" name="vvs" id="allp" />
                        <span className="checkbox"></span>
                        <span className="lbl">All</span>
                    </label>
                    <label for="sgl" className="filter_check">
                        <input type="checkbox" name="ptd" id="sgl" />
                        <span className="checkbox"></span>
                        <span className="lbl">Single Stone</span>
                    </label>
                    <label for="pcl" className="filter_check">
                        <input type="checkbox" name="ptd" id="pcl" />
                        <span className="checkbox"></span>
                        <span className="lbl">Parcel Diamonds</span>
                    </label>
                    <label for="rg" className="filter_check">
                        <input type="checkbox" name="ptd" id="rg" />
                        <span className="checkbox"></span>
                        <span className="lbl">Rough</span>
                    </label>
                    <label for="jw" className="filter_check">
                        <input type="checkbox" name="ptd" id="jw" />
                        <span className="checkbox"></span>
                        <span className="lbl">Jewellery</span>
                    </label>
                    <label for="anc" className="filter_check">
                        <input type="checkbox" name="ptd" id="anc" />
                        <span className="checkbox"></span>
                        <span className="lbl">Analytics</span>
                    </label>
                </div>

                <div className={`permission_group ` + (this.state.expandRow ? 'collapsed' : '')} >
                    <div className="permission_group_head" onClick={this.handleExpandMain}>
                        <h4>Single Stone</h4>
                        <div className="apply_permission_container">
                            <label for="all" className="filter_check">
                                <input type="checkbox" name="vvs" id="all" />
                                <span className="checkbox"></span>
                                <span className="lbl">All</span>
                            </label>
                            <label for="view" className="filter_check">
                                <input type="checkbox" name="ptd" id="view" />
                                <span className="checkbox"></span>
                                <span className="lbl">View</span>
                            </label>
                            <label for="upd" className="filter_check">
                                <input type="checkbox" name="ptd" id="upd" />
                                <span className="checkbox"></span>
                                <span className="lbl">Update</span>
                            </label>
                            <label for="del" className="filter_check">
                                <input type="checkbox" name="ptd" id="del" />
                                <span className="checkbox"></span>
                                <span className="lbl">Delete</span>
                            </label>
                            <label for="dwn" className="filter_check">
                                <input type="checkbox" name="ptd" id="dwn" />
                                <span className="checkbox"></span>
                                <span className="lbl">Download</span>
                            </label>

                        </div>
                    </div>
                    <div className="permission_group_row">
                        <div className="row_group">
                            <div onClick={this.handleExpandSub} className={`title ` + (this.state.expandSubRow ? 'rotate' : '')}>
                                <PlusBtn />
                                <h4>Search</h4>
                            </div>
                            <div className="apply_permission_container">
                                <label for="all" className="filter_check">
                                    <input type="checkbox" name="vvs" id="all" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">All</span>
                                </label>
                                <label for="view" className="filter_check">
                                    <input type="checkbox" name="ptd" id="view" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">View</span>
                                </label>
                                <label for="upd" className="filter_check">
                                    <input type="checkbox" name="ptd" id="upd" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Update</span>
                                </label>
                                <label for="del" className="filter_check">
                                    <input type="checkbox" name="ptd" id="del" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Delete</span>
                                </label>
                                <label for="dwn" className="filter_check">
                                    <input type="checkbox" name="ptd" id="dwn" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Download</span>
                                </label>
                            </div>
                        </div>
                        <div className={`row_group_content ` + (this.state.expandSubRow ? 'expand' : '')}>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Quick Search</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Match Pair</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Calibrated</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Upcoming</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="permission_group_row">
                        <div className="row_group">
                            <div onClick={this.handleExpandSub} className={`title ` + (this.state.expandSubRow ? 'rotate' : '')}>
                                <PlusBtn />
                                <h4>Collections</h4>
                            </div>
                            <div className="apply_permission_container">
                                <label for="all" className="filter_check">
                                    <input type="checkbox" name="vvs" id="all" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">All</span>
                                </label>
                                <label for="view" className="filter_check">
                                    <input type="checkbox" name="ptd" id="view" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">View</span>
                                </label>
                                <label for="upd" className="filter_check">
                                    <input type="checkbox" name="ptd" id="upd" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Update</span>
                                </label>
                                <label for="del" className="filter_check">
                                    <input type="checkbox" name="ptd" id="del" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Delete</span>
                                </label>
                                <label for="dwn" className="filter_check">
                                    <input type="checkbox" name="ptd" id="dwn" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Download</span>
                                </label>
                            </div>
                        </div>
                        <div className={`row_group_content ` + (this.state.expandSubRow ? 'expand' : '')}>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Saved Search</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Demand</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <div className={`permission_group ` + (this.state.expandRow ? 'collapsed' : '')} >
                    <div className="permission_group_head" onClick={this.handleExpandMain}>
                        <h4>Parcel Diamonds</h4>
                        <div className="apply_permission_container">
                            <label for="all" className="filter_check">
                                <input type="checkbox" name="vvs" id="all" />
                                <span className="checkbox"></span>
                                <span className="lbl">All</span>
                            </label>
                            <label for="view" className="filter_check">
                                <input type="checkbox" name="ptd" id="view" />
                                <span className="checkbox"></span>
                                <span className="lbl">View</span>
                            </label>
                            <label for="upd" className="filter_check">
                                <input type="checkbox" name="ptd" id="upd" />
                                <span className="checkbox"></span>
                                <span className="lbl">Update</span>
                            </label>
                            <label for="del" className="filter_check">
                                <input type="checkbox" name="ptd" id="del" />
                                <span className="checkbox"></span>
                                <span className="lbl">Delete</span>
                            </label>
                            <label for="dwn" className="filter_check">
                                <input type="checkbox" name="ptd" id="dwn" />
                                <span className="checkbox"></span>
                                <span className="lbl">Download</span>
                            </label>

                        </div>
                    </div>
                    <div className="permission_group_row">
                        <div className="row_group">
                            <div onClick={this.handleExpandSub} className={`title ` + (this.state.expandSubRow ? 'rotate' : '')}>
                                <PlusBtn />
                                <h4>Search</h4>
                            </div>
                            <div className="apply_permission_container">
                                <label for="all" className="filter_check">
                                    <input type="checkbox" name="vvs" id="all" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">All</span>
                                </label>
                                <label for="view" className="filter_check">
                                    <input type="checkbox" name="ptd" id="view" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">View</span>
                                </label>
                                <label for="upd" className="filter_check">
                                    <input type="checkbox" name="ptd" id="upd" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Update</span>
                                </label>
                                <label for="del" className="filter_check">
                                    <input type="checkbox" name="ptd" id="del" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Delete</span>
                                </label>
                                <label for="dwn" className="filter_check">
                                    <input type="checkbox" name="ptd" id="dwn" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Download</span>
                                </label>
                            </div>
                        </div>
                        <div className={`row_group_content ` + (this.state.expandSubRow ? 'expand' : '')}>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Quick Search</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Match Pair</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Calibrated</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Upcoming</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="permission_group_row">
                        <div className="row_group">
                            <div onClick={this.handleExpandSub} className={`title ` + (this.state.expandSubRow ? 'rotate' : '')}>
                                <PlusBtn />
                                <h4>Collections</h4>
                            </div>
                            <div className="apply_permission_container">
                                <label for="all" className="filter_check">
                                    <input type="checkbox" name="vvs" id="all" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">All</span>
                                </label>
                                <label for="view" className="filter_check">
                                    <input type="checkbox" name="ptd" id="view" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">View</span>
                                </label>
                                <label for="upd" className="filter_check">
                                    <input type="checkbox" name="ptd" id="upd" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Update</span>
                                </label>
                                <label for="del" className="filter_check">
                                    <input type="checkbox" name="ptd" id="del" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Delete</span>
                                </label>
                                <label for="dwn" className="filter_check">
                                    <input type="checkbox" name="ptd" id="dwn" />
                                    <span className="checkbox"></span>
                                    <span className="lbl">Download</span>
                                </label>
                            </div>
                        </div>
                        <div className={`row_group_content ` + (this.state.expandSubRow ? 'expand' : '')}>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Saved Search</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row_group">
                                <div className="title">
                                    <h5>Demand</h5>
                                </div>
                                <div className="apply_permission_container">
                                    <label for="all" className="filter_check">
                                        <input type="checkbox" name="vvs" id="all" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">All</span>
                                    </label>
                                    <label for="view" className="filter_check">
                                        <input type="checkbox" name="ptd" id="view" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">View</span>
                                    </label>
                                    <label for="upd" className="filter_check">
                                        <input type="checkbox" name="ptd" id="upd" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Update</span>
                                    </label>
                                    <label for="del" className="filter_check">
                                        <input type="checkbox" name="ptd" id="del" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Delete</span>
                                    </label>
                                    <label for="dwn" className="filter_check">
                                        <input type="checkbox" name="ptd" id="dwn" />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Download</span>
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>


            </div>
        </>);
    }
}
export default (PermissionsList);