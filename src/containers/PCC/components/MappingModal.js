import React, { useState, memo, useEffect } from 'react';
import { Dialog, Button, Select, Option, ErrorMsg, Toast, Input } from '../../../components/common';
import HomeAreaFilter from '../../../components/HomeAreaFilter'
import { createForm } from 'rc-form';
import {
    getPccList,
    mapPcc
} from '../../../services/api/routes/pcc';
import { getAllHomeArea } from '../../../services/api/routes/customer';
import axios from '../../../services/api/services/common';
const _ = require('lodash')

const ADD_TYEPS = {
    NEW: 1,
    ADD_IN_EXISTING: 2
}

const MappingModal = props => {
    const { visible, detail, onCancel, form, authUser, onOk } = props
    const {
        getFieldError, getFieldDecorator, getFieldValue, validateFields
    } = form;
    const [addAs, setAddAs] = useState()
    const [homeLoader, setHomeLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [okLoader, setOkLoader] = useState(false)
    const [floors, setFloors] = useState([])
    const [homeAreas, setHomeAreas] = useState([])
    const { homeList } = authUser
    const [homeareaSelectedFilter, setHomeareaSelectedFilter] = useState({})
    let errors

    useEffect(() => {
        fetchFloor()
    }, [])

    const handleChangeAddAs = (e) => {
        setAddAs(parseInt(e.target.value))
    }

    const handleChangeHome = (val) => {
        if(val){
            const homeDetails = _.find(homeList, { _id: val })
            fetchHomeArea(val, { homeId: val, homeIdentifier: homeDetails.homeIdentifier, isCustom: true })
        }
    }

    const fetchFloor = async () => {
        let filter = {
            fields: [],
            find: { facId: detail.facId }
        }
        setLoader(true)
        try {
            let res = await axios({ ...getPccList, data: { query: filter } })
            if (res) {
                if (res.code === 'OK') {
                    res.data.data = res.data.data.filter(obj => obj.floorId)
                    setFloors(res.data.data)
                } else {
                    Toast.error(res.message)
                }
            }
            setLoader(false)
        } catch {
            setLoader(false)
        }
    }

    const handleChangeInSelectHomearea = (val1, val2, index) => {
        if (val1) {
            setHomeAreas(oldState => {
                const temp = _.filter(oldState, d => d._id !== val1)
                console.log("🚀 ~ file: MappingModal.js ~ line 72 ~ handleChangeInSelectHomearea ~ temp", temp)
                return temp
            })
        }
        console.log("🚀 ~ file: MappingModal.js ~ line 80 ~ handleChangeInSelectHomearea ~ homeareaSelectedFilter", homeareaSelectedFilter)
        if (getFieldValue("homeArea" + index)) {
            const temp = _.filter(homeareaSelectedFilter, d => d._id === getFieldValue("homeArea" + index))
            console.log("🚀 ~ file: MappingModal.js ~ line 78 ~ handleChangeInSelectHomearea ~ temp IN DELECT", temp)
            setHomeAreas(oldState => {
                console.log("🚀 ~ file: MappingModal.js ~ line 81 ~ handleChangeInSelectHomearea ~ oldState", oldState)
                const temp2 = _.concat(oldState, temp)
                console.log("🚀 ~ file: MappingModal.js ~ line 82 ~ handleChangeInSelectHomearea ~ temp2", temp2)
                return temp2
            })
        }
        // console.log("🚀 ~ file: MappingModal.js ~ line 68 ~ handleChangeInSelectHomearea ~ val", index, val1, val2)
        // console.log("🚀 ~ file: MappingModal.js ~ line 72 ~ handleChangeInSelectHomearea ~ ", getFieldValue("homeArea" + index))
    }

    const fetchHomeArea = async (val, headers) => {
        console.log("🚀 ~ file: MappingModal.js ~ line 92 ~ fetchHomeArea ~ headers", headers)
        setLoader(true)
        const request = {
            fields: ['isActive', 'name'],
            find: { isActive: true }
        }
        try {
            let res = await axios({ ...getAllHomeArea, headers, data: { query: request } })
            if (res && res.code === 'OK') {
                setHomeAreas(res.data.data)
                setHomeareaSelectedFilter(res.data.data)
            }
            setLoader(false)
        } catch {
            setLoader(false)
        }
    }

    const handleOk = () => {
        validateFields(async (err, values) => {
            if (err) {
                return
            }
            if (!addAs)
                return Toast.error('Please select any facility for mapping')

            let request = {}
            if (addAs === ADD_TYEPS['NEW']) {
                detail.assignedSubscriptionGroupId = authUser.homeId.assignedSubscriptionGroupId._id
                delete detail._id
                request = {
                    home: detail,
                    homeareas: floors
                }
            } else {
                let newHAData = []
                floors.map(k => {
                    if (values[`homeArea${k.floorId}`]) {
                        delete k._id
                        newHAData.push({
                            homeAreaId: values[`homeArea${k.floorId}`],
                            ...k
                        })
                    }
                })
                request = {
                    homeId: values.homeId,
                    home: _.omit(detail, '_id'),
                    homeareas: newHAData
                }
            }
            setOkLoader(true);
            try {
                let res = await axios({ ...mapPcc, data: request })
                if (res) {
                    if (res.code === 'OK') {
                        Toast.success(res.message)
                        onOk()
                    } else
                        Toast.error(res.message)
                }
                setOkLoader(false);
            } catch {
                setOkLoader(false);
            }
        })
    }

    return <>
        <Dialog
            visible={visible}
            title={detail.facilityName}
            onCancel={onCancel}
            onOk={handleOk}
            okButtonProps={{
                loading: okLoader
            }}
            width={650}
        >
            <div className="form_row">
                <div className="col-12">
                    <div className="title">
                        <label className="filter_check">
                            <input type="checkbox" name="type"
                                value={ADD_TYEPS.NEW}
                                checked={addAs === ADD_TYEPS.NEW}
                                onChange={handleChangeAddAs}
                            />
                            <span className="checkbox radio"></span>
                            <span className="lbl">Add as New facility in Writi</span>
                        </label>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="title">
                        <label className="filter_check">
                            <input type="checkbox" name="type"
                                value={ADD_TYEPS.ADD_IN_EXISTING}
                                checked={addAs === ADD_TYEPS.ADD_IN_EXISTING}
                                onChange={handleChangeAddAs}
                            />
                            <span className="checkbox radio"></span>
                            <span className="lbl">Map with Existing facility in Writi</span>
                        </label>
                    </div>
                </div>
                {
                    addAs === ADD_TYEPS['ADD_IN_EXISTING'] ? <>
                        <div className='form_group col-12 required'>
                            <label>Writi Home<span>*</span></label>
                            {getFieldDecorator('homeId', {
                                rules: [{ required: true }],
                            })(
                                <Select placeholder="Select Home"
                                    loading={homeLoader}
                                    showSearch
                                    onChange={handleChangeHome}
                                    allowClear
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                                    {homeList.map((curObj) => {
                                        return (
                                            <Option key={curObj._id} value={curObj._id}>
                                                {curObj.name}
                                            </Option>
                                        );
                                    })
                                    }
                                </Select>
                            )}
                            {(errors = getFieldError('homeId')) ? (
                                <ErrorMsg errors={errors} />
                            ) : null}
                        </div>
                        {
                            floors.map((floor, index) => {
                                return (
                                    <>
                                        <div className='form_group col-6 required'>
                                            <label>PointClickCare Floor<span>*</span></label>
                                            <label>{floor.floorDesc}</label>
                                        </div>
                                        <div className='form_group col-6 required'>
                                            <label>Writi Home Area<span>*</span></label>
                                            {getFieldDecorator('homeArea' + floor.floorId, {
                                                rules: [{ required: true }]
                                            })(
                                                <Select
                                                    loading={loader}
                                                    placeholder={"Select Home Area"}
                                                    showSearch
                                                    allowClear
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                // onChange={(val1, val2) => handleChangeInSelectHomearea(val1, val2, floor.floorId)}
                                                // onDeselect={handleChangeInSelectHomearea}

                                                >
                                                    {homeAreas.length > 0
                                                        ? homeAreas.map((curObj) => {
                                                            return (
                                                                <Option key={curObj._id} value={curObj._id}>
                                                                    {curObj.name}
                                                                </Option>
                                                            );
                                                        })
                                                        : null}
                                                </Select>
                                            )}
                                            {(errors = getFieldError('homeArea')) ? (
                                                <ErrorMsg errors={errors} />
                                            ) : null}
                                        </div>
                                    </>
                                );
                            })
                        }

                    </>
                        : null
                }
            </div>
        </Dialog>

    </>
}

export default memo(createForm()(MappingModal))