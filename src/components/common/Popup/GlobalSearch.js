import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'rc-dialog';
import RxOrder from './RxOrderModalTab';
import ResidentTab from '../../../containers/GlobalSearch/components/DetailView';
import PmrTab from './PmrModalTab';
import { Input, Search } from '../../../components/common/index';
import { MODULE } from '../../../constants/subscription';
import _ from 'lodash'
import createForm from 'rc-form/lib/createForm';
import Button from '../Button';
import axios from '../../../services/api/services/common';
import {
    SerachPaginate
} from '../../../services/api/routes/globalSearch';
import { Toast } from '../../common';
import DetailView from '../../../containers/GlobalSearch/components/DetailView';
import DetailViewForAll from '../../../containers/GlobalSearch/components/DetailViewForAll';

export const TabConst = {
    All: {
        Name: "All",
        Value: "",
    },
    RESIDENT: {
        Name: "Resident",
        Value: MODULE.RESIDENT,
        Response_Key: "RESIDENT"
    },
    PMR: {
        Name: "PMR",
        Value: MODULE.PMR,
        Response_Key: "PMR"

    },
    PRESCRIPTION_ORDER: {
        Name: "Rx Order",
        Value: MODULE.RX_ORDER,
        Response_Key: "PRESCRIPTION_ORDER"

    },
    // DigitalBinder: {
    //     Name: "Digital Binder",
    //     Value: MODULE.DIGITAL_BINDER,
    //     Response_Key: ""

    // },
    // VirtualVisit: {
    //     Name: "Virtual Visit",
    //     Value: MODULE.VIRTUAL_VISIT,
    //     Response_Key: ""

    // },
    // E_Processing: {
    //     Name: "E-Processing",
    //     Value: MODULE.E_PROCESSING,
    //     Response_Key: ""

    // },
    TODO: {
        Name: "To-Do",
        Value: MODULE.TODO,
        Response_Key: "TODO"

    },
    // AdmissionReadmission: {
    //     Name: "Admissio/Re-Admission",
    //     Value: MODULE.ADMISSION_READMISSION,
    //     Response_Key: "PRESCRIPTION_ORDER"

    // },
    X_RAY_US: {
        Name: "X-Ray",
        Value: MODULE.X_RAY_US,
        Response_Key: "X_RAY_US"

    },
}
class SearchPopup extends Component {

    constructor() {
        super();
        this.state = {
            dataForAll: [],
            module: TabConst.RESIDENT.Value,
            hasMore: true,
            data: [],
            count: 0,
            loader: false,
            filter: {
                page: 1,
                limit: 5
            }
        };


    }


    handleCloseModal() {
        this.setState({ searchModal: false });

    }
    modalActionFn = (val) => {
        this.setState({
            module: val,
            data: [],
            dataForAll: [],
            count: 0,
            filter: {
                ...this.state.filter,
                page: 1,
            }
        }, () => {
            if (this.state.filter?.search?.keyword) {
                this.searchGlobal()
            }
        })
    };
    onChange = (e) => {
        this.setState({
            data: [],
            count: 0,
            filter: {
                ...this.state.filter,
                search: {
                    keyword: e.target.value
                },
                page: 1,
            }
        })
    }
    handleSearchButton = (value) => {
        this.setState({
            data: [],
            count: 0,
            filter: {
                ...this.state.filter,
                page: 1,
                search: {
                    keyword: value
                },
            }
        }, () => this.searchGlobal())
    }
    searchGlobal = async () => {
        this.setState({
            loader: true
        })
        let res = await axios({ ...SerachPaginate, data: { query: this.state.filter, module: this.state.module } })
        if (res) {
            if (res.code === 'OK') {
                if (this.state.module !== TabConst.All.Value) {
                    let Response_Key = _.filter(Object.keys(TabConst), k => {
                        if (TabConst[k]["Value"] === this.state.module) {
                            return k
                        }
                    })
                    Response_Key = TabConst[Response_Key[0]]["Response_Key"]
                    this.setState({
                        data: _.concat(this.state.data, res.data[Response_Key].list),
                        count: res.data[Response_Key].count,
                        hasMore: res.data[Response_Key].list.length === res.data[Response_Key].count ? false : true,
                    })
                }
                else {

                    console.log("🚀 ~ file: GlobalSearch.js ~ line 159 ~ SearchPopup ~ searchGlobal= ~ res.data", res.data)
                    this.setState({
                        dataForAll: res.data
                    })
                }
            } else {
                Toast.error(res.message)
            }
        }
        this.setState({
            loader: false
        })
    }
    onInfiniteOnLoad = (val) => {

        let tempArr = [...this.state.data]
        if (tempArr.length === this.state.count) {
            this.setState({ hasMore: false })
            return
        }
        this.setState({
            loading: true,
            filter: {
                ...this.state.filter,
                page: this.state.filter.page + 1
            }
        }, () => this.searchGlobal())
    }
    render() {

        const { form } = this.props
        const { validateFields } = form
        return (<>
            {


                <Dialog visible={this.props.visible}
                    onClose={this.props.onClosed}
                    className="search_popup_wrap"
                >

                    <div className="popup-search-con ">
                        <div className="with-search-component">
                            <div className='form_group search-box' style={{ marginRight: '2%' }}>
                                <Search
                                    allowClear={true}
                                    // form = {form}
                                    placeholder='Search'
                                    style={{ width: '250px' }}
                                    onChange={this.onChange}
                                    onSearch={(data) => { this.handleSearchButton(data) }}
                                />
                                {/* <Button onClick={this.handleSearchButton}>Search</Button> */}
                            </div>
                        </div>


                        <div className="rx-btns drug-bts">
                            {
                                _.map(TabConst, tab => {
                                    return <a onClick={() => this.modalActionFn(tab.Value)} ><button className={(this.state.module === tab.Value) ? 'r-o-btn' : ''}>{tab.Name} </button></a>
                                })
                            }

                        </div>

                        {
                            this.state.module !== TabConst.All.Value ?
                                (<DetailView loader={this.state.loader} hasMore={this.state.hasMore} data={this.state.data} onInfiniteOnLoad={this.onInfiniteOnLoad} type={this.state.module} />)
                                :
                                <DetailViewForAll loader={this.state.loader} data={this.state.dataForAll} />
                        }


                    </div>

                    <button className="close-btn" onClick={() => this.props.onClosed()}>
                        <img alt="#" src={require('../../../assets/images/popup/close.svg')} />
                    </button>
                </Dialog>


            }

        </>)
    }
}
export default createForm()(SearchPopup) 