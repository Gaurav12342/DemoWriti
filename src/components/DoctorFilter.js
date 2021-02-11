import React, { Component, useEffect, useState } from "react";
import { connect } from 'react-redux'
import Select, { Option } from './common/AutoComplete';
import axios from '../services/api/services/common';
import { userPaginate } from '../services/api/routes/user'
import { getUserNameWithDesignation } from '../util/common'
import { USER_TYPE, SUB_NURSE_TYPE } from "../constants/User";
const _ = require("lodash");

const DoctorFilter = (props) => {
    const { requirePrescriberName, getPrescriberName, authUser } = props
    const [doctorList, setDoctorList] = useState([])
    const [value, setValue] = useState(props.value)
    const [loading, setLoading] = useState(false)
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         doctorList: [],
    //         value: this.props.value
    //     }
    // }

    useEffect(() => {
        getDoctorsNP()
    }, [props.homeId])

    const getAPI = (request) => {
        let obj = {
            isCallAPI: true,
            response: null
        }
        let physician = JSON.parse(localStorage.getItem('physician-filter'))
        if (physician && authUser?._id === physician.userId) {
            if (_.isEqual(request, physician.request)) {
                obj = {
                    isCallAPI: false,
                    response: physician.response
                }
            }
        }
        return obj
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    useEffect(() => {
        let prescriber = doctorList.find(obj => obj._id === value)
        if (prescriber && getPrescriberName) {
            getPrescriberName(prescriber.name)
        }
    }, [value, requirePrescriberName])

    const getDoctorsNP = () => {
        // get prescriber - Doctors and Nurse Practioner
        let obj = {
            // filter: {
            // select: ['isActive', 'id', 'name', 'designation'],
            sort: { createdAt: "DESC" },
            find: {
                type: USER_TYPE.HOME.PHYSICIAN,
                homeId: props.homeId,
                isActive: true
            },
            // populate :{},

            // filter: {
            //     or: [
            //         { type: USER_TYPE.HOME.PHYSICIAN },
            //         { type: USER_TYPE.HOME.NURSE, designation: SUB_NURSE_TYPE.NURSE_PRACTITIONER }
            //     ]
            // }
            // }
        };
        let getAPIObj = getAPI(obj)
        if (getAPIObj.isCallAPI) {
            axios({ ...userPaginate, data: { query: obj, withActiveHomeRolePermissions: true } }).then((data) => {

                if (data.code === "OK") {
                    let physician = {
                        userId: props.authUser._id,
                        request: obj, response: data.data
                    }
                    localStorage.setItem('physician-filter', JSON.stringify(physician))
                    setDoctorList(data.data.list)
                    setLoading(false)
                    // this.setState({ doctorList: data.data.list, loading: false })
                } else {
                    setDoctorList([])
                    setLoading(false)
                    // this.setState({ doctorList: [], loading: false })
                }
            }).catch((error) => {
                setDoctorList([])
                setLoading(false)
                // this.setState({ doctorList: [], loading: false })
                // `console`.log("Error:", error.message);
            });
        }
        else {
            let data = getAPIObj.response
            setDoctorList(data.list)
            setLoading(false)
            // this.setState({ doctorList: data.list, loading: false })
        }

    }


    // const { value } = props
    const { size, placeholder, allowClear, hint, disabled, onChange } = props

    return (
        <React.Fragment>
            {
                doctorList ?
                    <Select
                        showSearch
                        allowClear={allowClear}
                        mode={'single'}
                        placeholder={placeholder || "Select Physician"}
                        value={value || undefined}
                        style={{ width: size || '-webkit-fill-available' }}
                        onChange={onChange}
                        hint={hint}
                        disabled={disabled}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            doctorList.map(user => {
                                return <Option key={user._id}
                                    value={user._id}
                                >
                                    {getUserNameWithDesignation(user)}
                                </Option>
                            })
                        }
                    </Select> : null
            }
        </React.Fragment>
    )

}

const mapStateToProps = ({ auth }) => {
    const { authUser, homeId } = auth
    return {
        authUser,
        homeId
    }
}
export default connect(mapStateToProps)(DoctorFilter)