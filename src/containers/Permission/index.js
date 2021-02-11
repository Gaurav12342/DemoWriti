import React, { Component } from 'react';
import { connect } from 'react-redux'
import PermissionSidebar from '../SubscriptionUpsert/components/SideBar';
import PermissionContainer from './components/PermissionContainer';
import axios from '../../services/api/services/common'
import { getAll, remove } from '../../services/api/routes/permission'
import { sortArrayDesc } from '../../util/common'
import { Toast } from '../../components/common';
import { USER_TYPE, isPharmacyUser } from '../../constants/User';

let delayDebounceFn
class RolePermissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleAdd: false,
            listLoader: false,
            loading: false,
            hasMore: true,
            edit: false,
            detail: null,
            listData: [],
            count: 0,
            filter: {
                page: 1,
                limit: 15,
                fields: ['isActive', '_id', 'name', 'groupPermissions', 'createdAt'],
                sortBy: { createdAt: -1 },
                find: {
                    homeId: props.authUser.type === USER_TYPE.HOME.ADMIN ? props.authUser.homeId?._id : undefined,
                    pharmacyId: props.authUser.type === USER_TYPE.PHARMACY.ADMIN ? props.authUser.pharmacyId?._id : undefined,
                }
            },
            curDetail: null
        };
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = async () => {
        this.setState({ listLoader: this.state.filter.page === 1 ? true : false })
        const data = { query: { ...this.state.filter } }
        try {
            let res = await axios({ ...getAll, data })
            if (res) {
                if (res.code === 'OK') {
                    let listData = this.state.filter.page === 1 ? [] : [...this.state.listData]
                    listData = listData.concat(res.data.data)
                    this.setState({
                        hasMore: listData.length === res.data.count ? false : true,
                        loading: false,
                        count: res.data.count,
                        listData: listData,
                        detail: listData.length > 0 ? listData[0] : null
                    })
                } else
                    Toast.error(res.message)
            }
            this.setState({ listLoader: false })
        } catch{
            this.setState({ listLoader: false, loading: false })
        }
    }

    handleInfiniteLoad = () => {
        let tempArr = [...this.state.listData]
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
        }, () => this.fetch())
    }

    handleSearch = (value) => {
        if (delayDebounceFn) {
            clearTimeout(delayDebounceFn)
            delayDebounceFn = null
        }
        delayDebounceFn = setTimeout(() => {
            this.setState({
                filter: {
                    ...this.state.filter,
                    search: {
                        keyword: value,
                        keys: ['name'],
                    }
                }
            }, () => this.fetch())
        }, 600)
    }

    handleAdd = () => {
        this.setState({ curDetail: { ...this.state.detail } })
        this.setState({ visibleAdd: true, detail: null })
    }

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    handleEdit = (detail) => {
        this.setState({ curDetail: { ...detail } })
        this.setState({ edit: true, visibleAdd: true, detail })
    }
    handleDelete = async (data) => {
        this.setState({ listLoader: true })
        const { method, url, baseURL } = remove
        let res = await axios({ baseURL, method, url: url + data._id })
        if (res && res.code === 'OK') {
            Toast.success(res.message)
            let listData = [...this.state.listData]
            let index = listData.findIndex(x => x._id === data._id)
            if (index >= 0)
                listData.splice(index, 1)
            this.setState({ listData: listData })
            if (this.state.detail && (this.state.detail._id && this.state.detail._id !== data._id)) {
                //stay as it is while delete
            } else {
                this.setState({
                    detail: listData.length > 0 ? listData[0] : null
                })
            }
        } else if (res) {
            Toast.error(res.message)
        }
        this.setState({ listLoader: false })
    }
    handleSelect = (detail) => {
        this.setState({ visibleAdd: false, edit: false, detail })
    }
    handleCancel = (str, params) => {
        let newDetail = null
        if (str === 'add') {
            newDetail = this.state.listData[0]
        } else if (this.state.curDetail) {
            newDetail = {
                ...this.state.curDetail,
                name: params ? params.name : this.state.curDetail.name
            }
        }
        this.setState({
            visibleAdd: false, edit: false,
            detail: newDetail
        })
    }

    handleUpdate = (params) => {
        let edit = false
        let listData = [...this.state.listData]
        let index = listData.findIndex(x => x._id === params._id)
        if (index >= 0) {
            //edit
            edit = true
            listData[index] = params
        } else
            listData.push(params)
        listData = sortArrayDesc(listData, 'createdAt')
        this.setState({ listData: listData })
        this.handleCancel(edit ? 'edit' : 'add', edit ? params : null)
    }

    render() {
        const { visibleAdd, edit, detail, listData, listLoader, hasMore, loading } = this.state
        const { authUser } = this.props
        return (<>
            <div className="container">
                <div className="addpermission_wrap">
                    <PermissionSidebar isRole={true}
                        onAdd={this.handleAdd} listData={listData}
                        onEdit={this.handleEdit} onDelete={this.handleDelete}
                        onSelect={this.handleSelect}
                        onSearch={this.handleSearch}
                        onInfiniteOnLoad={this.handleInfiniteLoad} hasMore={hasMore} loading={loading}
                        edit={edit} detail={detail} listLoader={listLoader} />
                    <PermissionContainer visibleAdd={visibleAdd} onAdd={this.handleUpdate}
                        edit={edit} onCancel={this.handleCancel} detail={detail}
                        authUser={authUser} />
                </div>
            </div>
        </>);
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth
    return {
        authUser
    }
}
export default connect(mapStateToProps)(RolePermissions);;