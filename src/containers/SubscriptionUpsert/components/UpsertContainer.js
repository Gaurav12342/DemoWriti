import React, { useState, useEffect } from 'react';
import AddSubscription from './AddSubscription'
import PermissionList from './PermissionList'
import axios from '../../../services/api/services/common'
import { insert, get, update } from '../../../services/api/routes/subscription'
import { PERMISSION_ACCESS_TYPE, TODOS } from '../../../constants/subscription'
import { Spin, Toast } from '../../../components/common'
import PERMISSIONS from '../../../constants/roleBaseAccessPermission'
const _ = require('lodash')

const Container = props => {
    const { visibleAdd, onAdd, edit, onCancel, detail } = props
    const [loader, setLoader] = useState(false)
    const [saveLoader, setSaveLoader] = useState(false)
    const [response, setResponse] = useState(null)
    const [groupPermissions, setGroupPermissions] = useState([])

    useEffect(() => {
        if ((visibleAdd) && !edit) {
            fetchJson()
        }
    }, [edit, visibleAdd])

    useEffect(() => {
        if (detail) {
            fetch()
        }
    }, [detail])

    const prepareGroupPermissions = (listData) => {
        listData.forEach(x => {
            x.isSelect = typeof x.isSelect === 'boolean' ? x.isSelect : false
            x.permissionAccesstype = x.isSelect ? x.permissionAccesstype || PERMISSION_ACCESS_TYPE['DATA'] : 0
            if (x.subModules && x.subModules.length) {
                x.subModules.forEach(y => {
                    y.isSelect = typeof y.isSelect === 'boolean' ? y.isSelect : false
                    y.permissionAccesstype = y.isSelect ? y.permissionAccesstype || PERMISSION_ACCESS_TYPE['DATA'] : 0
                    // if (y.permissionAccesstype === PERMISSION_ACCESS_TYPE.DATA &&
                    //     TODOS.includes(y.subModule)) {
                    //show Todos
                    if (y.actions && y.actions.length) {
                        y.actions.forEach(act => {
                            act.label = act.name || act.label
                            act.isSelect = typeof act.isSelect === 'boolean' ? act.isSelect : false
                            delete act.name
                        })
                    }
                    // }
                })
            }
        })
        return listData
    }

    const fetchJson = () => {
        let newData = prepareGroupPermissions(PERMISSIONS)
        setResponse({ groupPermissions: _.cloneDeep(newData) })
        setGroupPermissions(_.cloneDeep(newData))
    }

    const fetch = async () => {
        setLoader(true)
        const { method, url, baseURL } = get
        let res = await axios({ baseURL, method, url: url + detail._id, params: { populate: true } })
        if (res) {
            if (res.code === 'OK') {
                res.data.groupPermissions = prepareGroupPermissions(res.data.groupPermissions)
                setResponse({ ...res.data })
                setGroupPermissions(_.cloneDeep(res.data.groupPermissions))
            }
        }
        setLoader(false)
    }

    const handleSave = async (params) => {
        setSaveLoader(true)
        let groups = []
        groupPermissions.forEach((mod, i) => {
            // if (mod.isSelect) {
            if (mod.actions && mod.actions.length) {
                mod.actions.forEach((x) => {
                    x.name = x.label
                    x.isSelect = x.isSelect || false
                    delete x.label
                    return x
                })
            }
            let obj = {
                'module': mod.module,
                'moduleName': mod.moduleName,
                'actions': mod.actions || [],
                'sequence': i + 1,
                'permissionAccesstype': mod.permissionAccesstype,
                'isSelect': mod.isSelect,
                "subModules": []
            }
            if (edit) {
                obj['_id'] = mod['_id']
                obj.isActive = mod.isActive
                obj.subscriptionId = mod.subscriptionId
            }
            if (mod.subModules && mod.subModules.length) {
                mod.subModules.forEach(sub => {
                    // if (sub.isSelect) {
                    if (sub.actions && sub.actions.length) {
                        sub.actions.map((x) => {
                            x.name = x.label
                            x.isSelect = x.isSelect || false
                            delete x.label
                            return x
                        })
                    }
                    let subObj = {
                        "subModule": sub.subModule,
                        "subModuleName": sub.subModuleName,
                        'permissionAccesstype': sub.permissionAccesstype,
                        'isSelect': sub.isSelect,
                        'actions': sub.actions || [],
                    }
                    if (edit) {
                        subObj.isActive = sub.isActive
                    }
                    obj.subModules.push(subObj)
                    // }
                })
            }
            groups.push(obj)
            // }
        })
        let { method, url, baseURL } = edit ? update : insert
        const data = {
            ...params,
            groupPermissions: groups
        }
        if (edit) {
            url = url + detail._id
        }
        let res = await axios({ method, url, data, baseURL })
        if (res && res.code === 'OK') {
            Toast.success(res.message)
            setGroupPermissions(res.data.groupPermissions)
            onAdd(res.data.subscriptionGroup)
        }
        setSaveLoader(false)
    }

    const handlePermission = opt => {
        let newGroupPermissions = [...groupPermissions]
        newGroupPermissions.forEach(x => {
            if (x.module === opt.data.module) {
                x.permissionAccesstype = opt.type
                if (x.permissionAccesstype && !x.isSelect)
                    x.isSelect = true
            } else if (x.module === opt.module) {
                //submodule
                if (x.subModules && x.subModules.length) {
                    x.subModules.forEach(y => {
                        if (y.subModule === opt.data.subModule) {
                            y.permissionAccesstype = opt.type
                            if (y.permissionAccesstype && !y.isSelect)
                                y.isSelect = true

                            if (y.permissionAccesstype === PERMISSION_ACCESS_TYPE.DATA &&
                                TODOS.includes(y.subModule)) {
                                //show all Todos on check DATA
                                y.actions.forEach(act => {
                                    act.isSelect = true
                                })
                            }
                        } else if (y.subModule === opt.subModule) {
                            if (y.permissionAccesstype === PERMISSION_ACCESS_TYPE.DATA &&
                                TODOS.includes(y.subModule)) {
                                //show all Todos on check DATA
                                y.actions.forEach(act => {
                                    if (act.code === opt.data.code) {
                                        act.isSelect = !act.isSelect
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
        setGroupPermissions(newGroupPermissions)
    }
    const handleSelection = opt => {
        let newGroupPermissions = [...groupPermissions]
        newGroupPermissions.forEach(x => {
            if (x.module === opt.module) {
                if (x.subModules && x.subModules.length) {
                    //submodule
                    x.subModules.forEach(y => {
                        if (y.subModule === opt.data.subModule) {
                            y.isSelect = !y.isSelect
                            let type = y.isSelect ? PERMISSION_ACCESS_TYPE['DATA'] : 0
                            y.permissionAccesstype = type
                        }
                    })
                }
            }
            else if (x.module === opt.data.module) {
                x.isSelect = !x.isSelect
                let type = x.isSelect ? PERMISSION_ACCESS_TYPE['DATA'] : 0
                x.permissionAccesstype = type
                if (!type) {
                    if (x.subModules && x.subModules.length) {
                        //deselct submodule
                        x.subModules.forEach(y => {
                            y.isSelect = false
                            let type = y.isSelect ? PERMISSION_ACCESS_TYPE['DATA'] : 0
                            y.permissionAccesstype = type
                        })
                    }
                }
            }
        })
        setGroupPermissions(newGroupPermissions)
    }

    const handleCancel = () => {
        setGroupPermissions(response.groupPermissions)
        onCancel()
    }

    const handleSortEnd = (mod) => {
        let newGroupPermissions = [...groupPermissions]
        newGroupPermissions.map(x => {
            if (x.module === mod.module)
                return mod
            else return x
        })
        setGroupPermissions(newGroupPermissions)
    }

    return (<>
        {
            loader ? <div className='permission_part_nodata'><Spin spinning={loader} str='center' /></div>
                :
                <div className='permission_part'>
                    {/* {visibleAdd ? detail ? */}
                    {visibleAdd ?
                        <AddSubscription onSave={handleSave} onCancel={handleCancel}
                            loading={saveLoader} edit={edit} detail={detail} />
                        : <div className='permission_label'>
                            <h4>{
                                groupPermissions && groupPermissions.length > 0 ?
                                    ((detail && detail.name) || 'Subscription') : ''
                            }</h4>
                        </div>
                    }
                    <div className='permission_tab_wrap'>
                        {
                            groupPermissions && groupPermissions.length > 0 ?
                                <PermissionList listData={groupPermissions}
                                    saveLoader={saveLoader}
                                    onSetPermission={handlePermission}
                                    onSelection={handleSelection}
                                    detail={detail}
                                    visibleAdd={visibleAdd}
                                    onSortEnd={handleSortEnd}
                                />
                                : <div className="permissions_list_wrap text-center">
                                    <strong> No subscription found. Please Add Subscription.</strong>
                                </div>
                        }
                    </div>
                </div>

        }
    </>);
}
export default Container;