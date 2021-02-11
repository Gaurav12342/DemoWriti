import React, { useState, useEffect } from 'react';
import AddSubscription from '../../SubscriptionUpsert/components/AddSubscription'
import PermissionList from './PermissionList'
import axios from '../../../services/api/services/common'
import { insert, get, update } from '../../../services/api/routes/permission'
import { PERMISSION_ACCESS_TYPE } from '../../../constants/subscription'
import { Spin, Toast } from '../../../components/common'
import PERMISSIONS from '../../../constants/roleBaseAccessPermission'
import { isModuleAccessible, canPerformAction } from '../../../util/common'
import { decryptData } from '../../../util/Crypto';
import { USER_TYPE } from '../../../constants/User';
const _ = require('lodash')

const Container = props => {
    const { visibleAdd, onAdd, edit, onCancel, detail, authUser } = props
    const [loader, setLoader] = useState(false)
    const [saveLoader, setSaveLoader] = useState(false)
    const [response, setResponse] = useState(null)
    const [permissions, setPermissions] = useState([])
    const [isAll, setIsAll] = useState(false)

    const mappedModule = decryptData(localStorage.getItem('mappedModulePermissions'))
    let mappedSubModule = decryptData(localStorage.getItem('mappedSubModulePermissions'))
    console.log("mappedModule", mappedModule, mappedSubModule)

    useEffect(() => {
        console.log("--------------------------")
        if ((visibleAdd) && !edit) {
            fetchJson()
        }
    }, [edit, visibleAdd])

    useEffect(() => {
        if (detail) {
            fetch()
        }
    }, [detail])

    const prepareData = (listData) => {
        listData.forEach(x => {
            x.isSelect = x.isSelect
            if (x.actions && x.actions.length) {
                x.actions.forEach(act => {
                    act.isSelect = act.isSelect || false
                    if (act.name) {
                        act.label = act.name
                        delete act.name
                    }
                })
            }
            if (x.subModules && x.subModules.length) {
                x.subModules = x.subModules.filter(y => {
                    let params = {
                        moduleId: x.module,
                        subModuleId: y.subModule,
                    }
                    if (checkSubModulesFilter(y)) {
                        y.isSelect = y.isSelect
                        if (y.actions && y.actions.length) {
                            y.actions.forEach(act => {
                                act.isSelect = act.isSelect || false
                                if (act.name) {
                                    act.label = act.name
                                    delete act.name
                                }
                            })
                        }
                        return y
                    }
                })

            }
        })
        listData = filterRoles(listData)
        return listData
    }

    const filterRoles = (array) => {
        // filter roles according to assigned home
        if (mappedModule)
            return array.filter(x => mappedModule[x.module] === PERMISSION_ACCESS_TYPE['DATA'])
        else return []
        // else return array
    }

    const filterSubModuleRoles = (array) => {
        // filter roles according to assigned home
        if (mappedSubModule)
            return array.filter(x => mappedSubModule[x.subModule] === PERMISSION_ACCESS_TYPE['DATA'])
        else return []
    }

    const checkSubModulesFilter = (x) => {
        // submodule accessible or not
        if (mappedSubModule) {
            return mappedSubModule[x.subModule] === PERMISSION_ACCESS_TYPE['DATA']
        }
        else return false
    }

    const fetchJson = () => {
        let newData = _.cloneDeep(PERMISSIONS)
        newData = prepareData(newData)
        setResponse({ permissions: _.cloneDeep(newData) })
        setPermissions(_.cloneDeep(newData))
    }

    const fetch = async () => {
        setLoader(true)
        const { method, url, baseURL } = get
        let res = await axios({ baseURL, method, url: url + detail._id, params: { populate: true } })
        if (res) {
            if (res.code === 'OK') {
                setResponse({ ...res.data })
                res.data.roleAccessPermissions = prepareData(res.data.roleAccessPermissions)
                setPermissions(_.cloneDeep(res.data.roleAccessPermissions))
            }
        }
        setLoader(false)
    }

    const handleSave = async (params) => {
        let exist = permissions.find(x => {
            if (x.actions) {
                return x.actions.find(act => act.isSelect)
            }
        })
        if (!exist) {
            Toast.error('Please select role permissions')
            return
        }
        setSaveLoader(true)
        let groups = []
        permissions.forEach((mod, i) => {
            if (mod.actions) {
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
                // 'sequence': i + 1,
                'isSelect': mod.isSelect || false,
                'isActive': true,
                "subModules": []
            }
            if (edit) {
                obj['_id'] = mod['_id']
                obj.isActive = mod.isActive
                obj.subscriptionId = mod.subscriptionId
            }
            if (mod.subModules && mod.subModules.length) {
                mod.subModules.forEach(sub => {
                    if (sub.actions) {
                        sub.actions.forEach((x) => {
                            x.name = x.label
                            x.isSelect = x.isSelect || false
                            delete x.label
                            return x
                        })
                    }
                    let subObj = {
                        "subModule": sub.subModule,
                        "subModuleName": sub.subModuleName,
                        'isSelect': sub.isSelect || false,
                        'actions': sub.actions || [],
                    }
                    if (edit) {
                        subObj.isActive = sub.isActive
                    }
                    obj.subModules.push(subObj)
                })
            }
            groups.push(obj)
        })
        let { method, url, baseURL } = edit ? update : insert
        const data = {
            ...params,
            isActive: true,
            roleAccessPermissions: groups,
            homeId: authUser.type === USER_TYPE.HOME.ADMIN ? authUser.homeId?._id : undefined,
            pharmacyId: authUser.type === USER_TYPE.PHARMACY.ADMIN ? authUser.pharmacyId?._id : undefined,
        }

        if (edit) {
            url = url + detail._id
        }
        try {
            let res = await axios({ baseURL, method, url, data })
            if (res && res.code === 'OK') {
                Toast.success(res.message)
                setPermissions(res.data.roleAccessPermissions)
                onAdd(res.data.subscriptionRoleGroup)
            }
            setSaveLoader(false)
        } catch{
            setSaveLoader(false)
        }
    }

    const setSelection = (count, length) => {
        if (count === 0)
            return false
        else return true
        // else if (count === length)
        //     return true
    }

    const handlePermission = opt => {
        let newPermissions = [...permissions]
        newPermissions.forEach(x => {
            if (x.module === opt.data.module) {
                if (x.actions) {
                    let selectedActionCount = 0
                    x.actions.forEach(act => {
                        if (act.code === opt.code) {
                            act.isSelect = !act.isSelect
                        }
                        if (act.isSelect)
                            selectedActionCount++
                    })
                    x.isSelect = setSelection(selectedActionCount, x.actions.length)
                }
            } else if (x.module === opt.module) {
                //submodule
                if (x.subModules && x.subModules.length) {
                    x.subModules.forEach(y => {
                        if (y.subModule === opt.data.subModule) {
                            if (y.actions) {
                                let selectedActionCount = 0
                                y.actions.forEach(act => {
                                    if (act.code === opt.code) {
                                        act.isSelect = !act.isSelect
                                    }
                                    if (act.isSelect)
                                        selectedActionCount++
                                })
                                y.isSelect = setSelection(selectedActionCount, y.actions.length)
                            }
                        }
                    })
                }
            }
        })
        setPermissions(newPermissions)
    }
    const handleSelection = opt => {
        let newPermissions = [...permissions]
        newPermissions.forEach(x => {
            if (x.module === opt.module) {
                if (x.subModules && x.subModules.length) {
                    //submodule
                    x.subModules.forEach(y => {
                        if (y.subModule === opt.data.subModule) {
                            y.isSelect = !y.isSelect
                            if (y.actions) {
                                y.actions.forEach(act => {
                                    act.isSelect = y.isSelect ? true : false
                                    return act
                                })
                            }
                        }
                    })
                }
            }
            else if (x.module === opt.data.module) {
                x.isSelect = !x.isSelect
                if (x.actions) {
                    x.actions.forEach(act => {
                        act.isSelect = x.isSelect ? true : false
                        return act
                    })
                }
            }
        })
        setPermissions(newPermissions)
    }

    const handleCancel = () => {
        setPermissions(response.permissions)
        onCancel()
    }

    const handleSelectAll = (e) => {
        //handle select/de-select all permisisons
        let checked = e.target.checked
        setIsAll(checked)
        let newPermissions = [...permissions]
        newPermissions.forEach(x => {
            x.isSelect = checked
            if (x.actions) {
                x.actions.forEach(act => {
                    act.isSelect = checked
                    return act
                })
            }
            if (x.subModules && x.subModules.length) {
                //submodule
                x.subModules.forEach(y => {
                    y.isSelect = checked
                    if (y.actions) {
                        y.actions.forEach(act => {
                            act.isSelect = checked
                            return act
                        })
                    }
                })
            }
        })
        setPermissions(newPermissions)
    }

    const handleSortEnd = (mod) => {
        let newGroupPermissions = [...permissions]
        newGroupPermissions.map(x => {
            if (x.module === mod.module)
                return mod
            else return x
        })
        setPermissions(newGroupPermissions)
    }

    return (<>
        {
            loader ? <div className='permission_part_nodata'><Spin spinning={loader} str='center' /></div>
                :
                <div className='permission_part'>
                    {visibleAdd ?
                        <AddSubscription isRole={true}
                            onSave={handleSave} onCancel={handleCancel}
                            loading={saveLoader} edit={edit} detail={detail} />
                        : <div className='permission_label'>
                            <h4>{
                                permissions && permissions.length > 0 ?
                                    ((detail && detail.name) || 'Permission') : ''
                            }</h4>
                        </div>
                    }
                    <div className='permission_tab_wrap'>
                        {
                            permissions && permissions.length > 0 ?
                                <PermissionList listData={permissions}
                                    saveLoader={saveLoader}
                                    onSetPermission={handlePermission}
                                    onSelection={handleSelection}
                                    detail={detail}
                                    visibleAdd={visibleAdd}
                                    onSelectAll={handleSelectAll}
                                    onSortEnd={handleSortEnd}
                                />
                                : <div className="permissions_list_wrap text-center">
                                    <strong> No role permissions found. Please Add Role Permission.</strong>
                                </div>
                        }
                    </div>
                </div>

        }
    </>);
}
export default Container;