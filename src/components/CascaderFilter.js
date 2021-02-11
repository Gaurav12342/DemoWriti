import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Cascader from './common/Cascader'
import { USER_TYPE } from "../constants/User";
import CommonService from '../services/api/services/common'
import { getCascader } from '../services/api/routes/common'
const _ = require("lodash");

const CascaderFilter = ({ placeholder, allowClear, activeTab, isUserMgmt,
    isHomeFilter, loginUser, ...props }) => {
    const [value, setValue] = useState(props.value)
    const [data, setData] = useState()
    const pharmacyUsers = _.map(USER_TYPE.PHARMACY, function (x) {
        return USER_TYPE.PHARMACY[x]
    })

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        fetch();
    }, [activeTab, isUserMgmt, isHomeFilter, props.value])

    const fetch = async () => {
        if (!loginUser)
            return
        const { method, url } = getCascader
        let obj = {};

        let ids = [loginUser.parentClientele[0].id];
        if (loginUser.prAccessPermission && loginUser.prAccessPermission.length) {
            ids = _.uniq(ids.concat(loginUser.prAccessPermission));
        }

        if (pharmacyUsers.indexOf(loginUser.type) > -1 && loginUser.parentClientele) {
            // if other branch permission exists get it's dependent sub data list
            obj.pharmacyId = ids;
        } else if (loginUser.type === USER_TYPE.HOME.ADMIN) {
            obj.homeId = ids;
        }
        else if (loginUser.type === USER_TYPE.HOME.NURSE.NURSE
            || loginUser.type === USER_TYPE.HOME.PHYSICIAN) {
            obj.homeAreaId = ids
        }
        if (activeTab === USER_TYPE.HOME.ADMIN && !isHomeFilter) {
            obj.isHome = false;
        } else if (activeTab === USER_TYPE.HOME.ADMIN && isHomeFilter) {
            obj.isHomeArea = false;
        } 
        // else if (activeTab === USER_TYPE.HOME.ADMIN && !isHomeFilter) {
        //     obj.isHomeArea = false;
        // }
        let getAPIObj = getAPI(obj)
        if (getAPIObj.isCallAPI) {
            //make API call if request is not same
            let res = await CommonService({ method, url, data: obj })
            // console.log("TCL: fetch -> res", res)
            // console.log("TCL: fetch -> loginUser", loginUser)
            if (res && res.code === 'OK') {
                const { data } = res
                let cascader = {
                    userId: loginUser.id,
                    request: obj, response: data
                }
                localStorage.setItem('cascader-filter', JSON.stringify(cascader))
                let cascaderData = pushAllKeyToCascader(data, obj)
                prepareList(cascaderData)
            }
        } else {
            let cascaderData = pushAllKeyToCascader(getAPIObj.response, data)
            prepareList(cascaderData)
        }
    }

    const getAPI = (request) => {
        //to check whether request is same as localstorage or not 
        let obj = {
            isCallAPI: true,
            response: null
        }
        let cascader = JSON.parse(localStorage.getItem('cascader-filter'))
        if (cascader && loginUser.id === cascader.userId) {
            if (_.isEqual(request, cascader.request)) {
                obj = {
                    isCallAPI: false,
                    response: cascader.response
                }
            }
        }
        return obj
    }

    const prepareList = (cascaderData) => {
        // console.log("TCL: prepareList -> cascaderData", cascaderData)
        if (props.selectFirstOption && cascaderData && cascaderData[0]) {
            let dv = []
            if (cascaderData[0].children) {
                dv = [cascaderData[0].id, cascaderData[0].children[0].id]
                props.onSetHome({
                    id: cascaderData[0].children[0].id,
                    name: cascaderData[0].children[0].name
                })
            }
            else {
                dv = [cascaderData[0].id]
                props.onSetHome({
                    id: cascaderData[0].id,
                    name: cascaderData[0].name
                })
            }
            setValue(dv)
        }
        //set default Selection if setDefaultValue props is passed you can pass Phramacy id,homeID
        // if (props.setDefaultValue && cascaderData) {
        //     setDefaultSelection(cascaderData)
        // }
        setData(cascaderData)
    }

    const pushAllKeyToCascader = (data) => {
        if (props.isNotPushAllKey) {
            //do not push All Key 

            //remove home or pharmacy from cascader list if hometoexclude props is passed
            let hometoexclude = props.hometoexclude
            if (hometoexclude) {
                let result = []
                data.forEach((pharmacy, index) => {
                    if (pharmacy.children) {
                        let tempPharmacy = { ...pharmacy }
                        tempPharmacy.children = pharmacy.children.filter(home => {
                            return home.id != hometoexclude
                        })
                        result[index] = tempPharmacy
                    }
                    else if (pharmacy.id != hometoexclude) {
                        result.push(pharmacy)
                    }
                })
                return result
            }
        }
        else {
            if (loginUser.type === USER_TYPE.HOME.ADMIN) {
                //If Home Admin is login
                _.each(data, function (home, i) {
                    if (home.children)
                        home.children = _.compact(home.children);
                    if (home.children && _.size(home.children)) {
                        data[i].children = [{
                            id: "all",
                            name: "All",
                        }].concat(data[i].children);
                    }
                });
            } else if (Math.floor((loginUser.type / Math.pow(10, 1)) % 10) ===
                USER_TYPE.HOME.ADMIN) {
                //If Home Area user is login 
                data = [{
                    id: "all",
                    name: "All",
                }].concat(data)
            }
            else {
                _.each(data, function (pharmacy, i) {
                    if (pharmacy.children)
                        pharmacy.children = _.compact(pharmacy.children);
                    if (pharmacy.children && _.size(pharmacy.children)) {
                        _.each(pharmacy.children, function (home, j) {
                            if (home.children)
                                home.children = _.compact(home.children);
                            if (home.children && _.size(home.children)) {
                                data[i].children[j].children = [{
                                    id: "all",
                                    name: "All",
                                }].concat(data[i].children[j].children);
                            }
                        });
                    }
                });
            }
        }
        return data;
    }

    const displayEndSelection = (labels, selectedoptions) => {
        // return last selected option if showEndSelection is set to true
        if (props.showEndSelection && selectedoptions.length > 0 && labels.length > 0) {
            let index = labels.length - 1
            return labels[index]
        }
        else {
            return labels
        }
    }

    const handleChange = (val, selectedOption) => {
        setValue(val)
        if (!val)
            return
        //return selected home or pharmacy name if isHomeName set to true
        if (props.isHomeName) {
            selectedOption.some(option => {
                if (option.id == val[val.length - 1]) {
                    props.getHomeName(option.name)
                }
            })
        }
        let self = this;
        let n = val.length - 1
        let tempVal = _.cloneDeep(val)
        if (val[n] === 'all') {
            if ((Math.floor((loginUser.type / Math.pow(10, 1)) % 10) === USER_TYPE.HOME.ADMIN) && tempVal.length === 1) {
                //Push All key for HA User
                tempVal = _.map(data, "id");
            }
            else {
                tempVal = tempVal.splice(n, 1)
                tempVal = (function () {
                    let result = [];
                    _.each(data, function (pharmacy, i) {
                        if (pharmacy.id === val[0]) {
                            if (loginUser.type === USER_TYPE.HOME.ADMIN) {
                                // if Home admin is loggedin
                                result = _.map(pharmacy.children, "id");
                            } else {
                                _.each(pharmacy.children, function (home, j) {
                                    if (home.id === val[1]) {
                                        home.children.forEach(homeObj => {
                                            if (homeObj.isActive) {
                                                result.push(homeObj.id)
                                            }
                                        })
                                        // result = _.map(home.children, "id");
                                    }
                                });
                            }
                        }
                    });
                    return result;
                })();
            }
            tempVal = tempVal.filter(x => x !== 'all') //remove "all" from request
        } else {
            tempVal = val[val.length - 1]
        }
        if (props.setSelectedVal) {
            props.setSelectedValue(val)
        }
        props.onChange(tempVal);
    }
    // console.log('cascader data', data)
    //mujhe yahape options rakhane he
    return <Cascader {...props}
        placeholder={placeholder || 'Select Filter'}
        fieldNames={{ label: 'name', value: 'id' }}
        allowClear={allowClear}
        options={data}
        value={value || []}
        displayRender={displayEndSelection}
        onChange={handleChange} />
}
export default CascaderFilter
CascaderFilter.defaultProps = {
    allowClear: true,
    isHomeName: false,
    selectFirstOption: false,
    hometoexclude: ''
}
CascaderFilter.propTypes = {
    allowClear: PropTypes.bool,
    isHomeName: PropTypes.bool, // to show home/pharmacy name (requireHomeName)
    selectFirstOption: PropTypes.bool, // to show default selected first option (showdefault)
    onSetHome: PropTypes.func, //return home obj
    hometoexclude: PropTypes.string,// home id to be excluded from data
}