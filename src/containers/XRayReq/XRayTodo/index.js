import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from 'antd';
import queryString from "query-string";
import Residents from "../../Pmr/components/PMRResidents"
import XRayContainer from "./XRayContainer/XRayContainer"
import { DEVICE_VIEW, X_RAY_TODO_TYPES, USER_TYPE, TODO_STATUS } from "../../../constants/Common";
const _ = require("lodash");
class XRayTodo extends Component {
    query = null
    state = {
        size: 'large',
        visible: false,
        data: [],
        loading: false,
        todoListLoading: false,
        hasMore: true,
        defaultResident: '',
        defaultResidentId: '',
        filter: {
            page: 1,
            limit: 10,
            filter: {}
        },
        total: 0,
        defaultListView: DEVICE_VIEW["PENDING"],
        defaultToDoCategory: X_RAY_TODO_TYPES["X_RAY_RESULT"],
        todoList: [],
        todoListPageNo: 0,
        searchText: '',
        listLoading: false,
        todo: null
    }
    todoListLimit = 20;
    constructor(props) {
        super(props);
        let self = this
        self.props.socket.on("success", function (data) {
            if (data.flag) {
                console.log("SOCKET XRayTodoList", data)
                if (data.requestName === "xRayTodoList") {
                    let listData = self.state.todoList;
                    let defaultResidentId = '', defaultResident = null
                    defaultResidentId = self.state.defaultResidentId

                    if (data.data.list && _.size(data.data.list)) {
                        // concat records only on infinite load
                        listData = self.state.todoListPageNo === 1 ? data.data.list : listData.concat(data.data.list)
                    }

                    if (listData && _.size(listData)) {
                        if (self.state.todoListPageNo === 1) {
                            //fetch first record on frst time load
                            if (!defaultResidentId) {
                                defaultResident = _.first(listData);
                                defaultResidentId = defaultResident.xRayRequestId;
                            }
                        }
                        //if query has xRayRequestId then select for default resident todo
                        const query = queryString.parse(self.props.location.search);
                        if (query && query.xrayId)
                            defaultResident = listData.find(x => x.xRayRequestId === query.xrayId)
                    } else {

                    }
                    let hasMore = true;
                    if (_.size(data.data.list) < self.todoListLimit) {
                        hasMore = false;
                    }
                    self.setState({
                        todo: defaultResident,
                        hasMore: hasMore,
                        todoList: listData,
                        todoListLoading: false,
                        listLoading: false,
                        defaultResidentId: defaultResidentId || ''
                    });
                }

            }
        });
        this.props.socket.on("todoUpdate", function (data) {
            console.log("TCL: todoUpdate -> constructor -> data", data)
            if (data && data.todos && _.size(data.todos)) {
                let todo = _.first(data.todos)
                if (todo.xRayRequestId === self.state.defaultResidentId &&
                    todo.updatedBy !== self.props.authUser._id) {
                    self.handleTodoUpdate({
                        completedAt: todo.completedAt,
                        status: todo.status
                    })
                }
            }

        });
        this.props.socket.on("errors", function (data) {
            if (data.message.message) {
                message.error(data.message.message);
            }
        });
    }

    emitXRayTodoList = (options) => {
        let pageNo = 1;
        this.props.socket.emit("xRayTodoList", {
            searchText: this.state.searchText,
            pageNo: options ? options.pageNo : pageNo,
            limit: this.todoListLimit,
            type: this.state.defaultListView,
            category: this.state.defaultToDoCategory,
            homeAreaId: this.state.filter.filter.homeAreaId
        });
    }
    componentDidMount() {
        let self = this
        this.setState({ todoListLoading: true, listLoading: true })
        const query = queryString.parse(this.props.location.search);
        if (query && !_.isEmpty(query)) {
            if (query.todoSubCategory && query.viewType) {

                let filter = { ...this.state.filter }
                if (query.homeArea)
                    filter.filter.homeAreaId = query.homeArea

                self.setState({
                    defaultListView: parseInt(query.viewType),
                    defaultToDoCategory: parseInt(query.todoSubCategory),
                    searchText: query.patientName,
                    defaultResidentId: query.xrayId,
                    filter: filter,
                }, function () {
                    this.isMount = true //to mange view detail
                    self.handleListChange()
                });
            }
        }
        else this.handleListChange();
        document.body.classList.add('todo-detail')
        this.setPreviousPageFilter()

    }

    setPreviousPageFilter = () => {
        if (this.props.location && this.props.location.state && this.props.location.state.propsFil) {
            let pageFilter = this.props.location.state.propsFil
            if (Object.keys(pageFilter).length > 0) {
                this.setState({
                    pageFilter
                })
            }
        }
        this.props.history.listen((location, action) => {
            if (action === 'POP') {
                this.props.history.state = {
                    pageFilter: this.state.pageFilter
                }
            }
        })
    }
    componentWillUnmount() {
        document.body.classList.remove('todo-detail')
    }

    handleListChange = (e, type, searchText) => {
        let self = this;
        let pageNo = 1;
        let obj = {
            todoList: [],
            todoListLoading: true,
            filterDrawervisible: false,
            todoListPageNo: pageNo,
            defaultResidentId: '' // to show first record while changing list view 
        };
        if (this.isMount) {
            //to mange view pmr detail...specific pmr detail and resident will be selected here
            delete obj.defaultResidentId
            this.isMount = false
        }

        if (type) {
            if (type === "viewType") {
                this.setState(
                    _.extend(obj, {
                        defaultListView: e
                    }), this.emitXRayTodoList);
            } else if (type === "todoType") {
                this.setState(
                    _.extend({
                        defaultToDoCategory: e
                    }), this.emitXRayTodoList);
            }
        } else {
            this.setState(obj, this.emitXRayTodoList);
        }
    };

    handleInfiniteOnLoad = () => {
        let options = {
            pageNo: this.state.todoListPageNo + 1
        }
        this.setState({
            todoListLoading: true,
            todoListPageNo: this.state.todoListPageNo + 1
        }, () => this.emitXRayTodoList(options));
    };

    handleOnClick = (xRayRequestId, id, todo) => {
        this.setState({
            defaultResidentId: xRayRequestId,
            todo: todo
        });
    }

    handleHomeAreaFilter = (val) => {
        this.setState(state => {
            state.listLoading = true
            state.filter.filter.homeAreaId = val;
            return state;
        }, this.handleListChange)
    }

    handleChangeListView = val => {
        this.setState({
            defaultListView: val, listLoading: true
        }, () => { this.handleListChange(); });
    }

    handleTodoUpdate = options => {
        let todo = {
            ...this.state.todo,
            ...options
        }
        this.setState({ todo })
    }


    render() {
        const { size } = this.state;

        return (
            <div>
                <div className="gx-app-layout ant-layout ant-layout-has-sider">
                    <aside className="gx-app-sidebar  null ant-layout-sider ant-layout-sider-lite">
                        <div className="ant-layout-sider-children">
                            {
                                <Residents isXRayDetail={true}
                                    pmrResidents={this.state.todoList}
                                    handleInfiniteOnLoad={this.handleInfiniteOnLoad.bind(this)}
                                    loading={this.state.todoListLoading}
                                    hasMore={this.state.hasMore}
                                    handleOnClick={this.handleOnClick}
                                    defaultResidentId={this.state.defaultResidentId}
                                    loginUser={this.props.authUser}
                                    onHomeAreaFilter={this.handleHomeAreaFilter}
                                    defaultListView={this.state.defaultListView}
                                    onChangeListview={this.handleChangeListView}
                                    listLoading={this.state.listLoading}
                                    defaultValue={this.state.filter.filter.homeAreaId}
                                />}
                        </div>
                    </aside>

                    <div className="ant-layout prescription-detail-layout">
                        {this.state.defaultResidentId && this.state.todo &&
                            <XRayContainer
                                defaultResidentId={this.state.defaultResidentId}
                                defaultToDoCategory={this.state.defaultToDoCategory}
                                todo={this.state.todo}
                                onTodoUpdate={this.handleTodoUpdate}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, commonData }) => {
    const { authUser } = auth;
    console.log("{ auth, commonData }", { auth, commonData })
    return { authUser, socket: commonData.socket }
};
export default connect(mapStateToProps)(XRayTodo);