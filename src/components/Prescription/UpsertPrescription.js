import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { createForm } from 'rc-form';
import { Input, ErrorMsg, Select, Option, Button, TextArea, Toast, Confirm } from '../common'
import Table from '../common/Table/index'
import RadioButtonGroup from '../common/RadioButtonGroup'
import SearchMedication from '../SearchMedication/SearchMedicationCopy'
import ReminderForm from '../common/Reminder'
import DoctorFilter from '../DoctorFilter'
import IndicationJson from '../../assets/files/JSON/indications.json'
import { Edit } from "../../assets/images/resident-detail";
import { Reminder, Notes } from "../../assets/images/pmr";
import { Cancel, Correct, PlusBtn } from "../../assets/images/resident-detail"
import { ORDER_TYPE, RX_TYPE, STATUS, TYPE } from '../../constants/prescription'
import { isDrOrNp, getUserNameWithDesignation } from '../../util/common'
import SavePrescriptionPopup from "../../components/common/Popup/savePrescription-popup";
import NotesModal from '../../components/NotesPopup/List';
import MedFavourite from './MedFavourite'
import { addFavouriteMeds, upsert } from '../../services/api/routes/prescription';
import axios, { getSubMasters } from '../../services/api/services/common';
import uuid from 'uuid'
import _ from 'lodash'
import {
    TODO_CATEGORY,
    SUB_CATEGORY
} from '../../constants/todo';

const PrescriptionForm = props => {
    const { edit, form, authUser, residentDetail, onOk } = props
    const { getFieldError, getFieldDecorator, validateFields, setFieldsValue, getFieldsValue, resetFields } = form;
    let errors
    const [visibleReminder, setVisibleReminder] = useState(false)
    const [visibleNotes, setVisibleNotes] = useState(false)
    const [reminderObj, setReminderObj] = useState(null)
    const [loader, setLoader] = useState(false)
    const [saveLoader, setSaveLoader] = useState(false)
    const [orderType, setOrderType] = useState(ORDER_TYPE['ROUTINE'])
    const [orderTypes, setOrderTypes] = useState([])
    const [tableData, setTableData] = useState([])
    const [notesData, setNotesData] = useState([])
    const [rowId, setRowId] = useState()
    const [selectedDrug, setSelectedDrug] = useState(null)
    const [visibleSave, setVisibleSave] = useState(false)
    const [requestObj, setRequestObj] = useState({ medStrip: false })
    const [fav, setFav] = useState(false)
    const [isUrgent, setIsUrgent] = useState('no')
    const [editId, setEditId] = useState('')
    const [indiacationData, setIndicationData] = useState(null);
    const [notesModal, setNotesModal] = useState(false);
    const [notesFilterOptions, setNotesFilterOptions] = useState({});
    const currentModalData = React.useRef();
    const currentResidentId = useSelector(state => state.resident.currentResidentId)

    const initObj = {
        // physicianId: undefined,
        medication: '',
        direction: '',
        indication: '',
        progressNote: '',
        pharmacyNote: '',
    }

    useEffect(() => {
        // setSubMasterLoader(true)
        getSubMasters('RXTYPE').then(res => {
            // setSubMasterLoader(false)
            setOrderTypes(res)
        }).catch(err => {
            // setSubMasterLoader(false)
        })
    }, [])

    useEffect(() => {
        if (edit) {
            const { prescriptionMedication, physicianId, medStrip, orderType } = edit

            // set medications in table
            if (prescriptionMedication?.length > 0) {
                let medicineData = _.cloneDeep(prescriptionMedication)
                medicineData = medicineData.map((x, index) => {
                    x.key = index
                    x.medicineFullName = x.medicineFullName || x.name || x.medication
                    return x
                })
                setTableData(medicineData)
                // set physician
                setFieldsValue({ physicianId: physicianId?._id })
                //set medstrip
                setRequestObj({
                    ...requestObj,
                    medStrip: medStrip,
                    physicianId: physicianId?._id
                })
            }
            setIsUrgent(edit.isUrgent ? 'yes' : 'no')
        }
    }, [edit])

    const selectMedication = (value, option) => {
        if (option.hasOwnProperty('prescrible_name'))
            setSelectedDrug(option)
    }

    const handlePhyChange = (val) => {
        let tempReqObj = { ...requestObj }
        tempReqObj.physicianId = val
        setRequestObj(tempReqObj)

    }

    const handleSave = (params) => {
        validateFields((error, values) => {
            if (error)
                return
            if (!params)
                setSaveLoader(true)

            let medObj = {
                ...values,
                orderType: orderType
            }
            // if (selectedDrug && Object.keys(selectedDrug).length > 0) {
            //     medObj.drugId = selectedDrug.drugId;
            //     medObj.name = selectedDrug.name
            //     medObj.strength = selectedDrug.strengthUnit;
            //     medObj.dosage = selectedDrug.dosageForm;
            //     medObj.medicineFullName = selectedDrug.medicineFullName;
            // }
            // else {
            medObj = {
                ...medObj,
                "name": values.medication,
                "strength": selectedDrug?.strength_number,
                "dosage": selectedDrug?.dosage_form,
                "medicineFullName": values.medication,

            }
            // medObj.name = values.medication
            // }
            delete medObj.medication

            if (params === 'fav') {
                addToFav(medObj)
                return
            }

            if (rowId >= 0 && rowId < tableData.length) {
                let newData = [...tableData]
                newData[rowId] = {
                    ...medObj,
                    key: rowId,
                    _id: editId
                }
                setTableData(newData)
            }
            else {
                if (tableData.length < 3) {
                    let newData = [...tableData]
                    newData.push({
                        ...medObj,
                        key: newData.length,
                    })
                    setTableData(newData)
                    // resetFields()
                }
                else {
                    Toast.error('only 3 Medications are allowed')
                }
            }
            // resetFields()
            handleCancelForm()
            setSaveLoader(false)
        })

    }

    const handleCancelForm = () => {
        setFieldsValue(initObj)
        setRowId()
        setFav(false)
        setEditId('')
        setSelectedDrug(null)
        setOrderType(ORDER_TYPE['ROUTINE'])
    }

    const cancelPresc = (str) => {
        handleCancelForm()
        setTableData([])
        setOrderType(ORDER_TYPE['ROUTINE'])
        setRequestObj({ medStrip: false, physicianId: undefined })
        setFieldsValue({ physicianId: undefined })
        if (str !== 'ok')
            props.onCancel()
    }

    const setReminder = (visible, data) => {
        if (visible) {
            setReminderObj({})
        } else {
            setReminderObj(null)
            if (data) {
                let newData = [...tableData]
                let index = newData.findIndex(obj => obj.key === reminderObj.key)
                if (index >= 0) {
                    newData[index] = {
                        ...newData[index],
                        notes: data
                    }
                }
                setTableData(newData)
            }
        }
        setVisibleReminder(visible)
    }

    const addToFav = async (params) => {
        let req = {
            "name": params.name,
            "strength": params.strength,
            "dosage": params.dosage,
            "medicineFullName": params.medicineFullName || params.name,
            "indication": params.indication,
            "direction": params.direction,
            "isActive": true
        }
        let res = await axios({ ...addFavouriteMeds, data: req })
        if (res) {
            if (res.code === 'OK') {
                setFav(true)
                // resetFields()
                Toast.success(res.message)
            } else
                Toast.error(res.message)
        }
    }

    const onCancelRx = (record) => {
        Confirm.confirm({
            title: 'Are you sure, You want to cancel this Rx?',
            onOk() {
                let newData = [...tableData]
                let indexToDel = record.key
                if (edit) {
                    newData[indexToDel].isDelete = true
                } else {
                    newData.splice(indexToDel, 1)
                    if (newData.length) {
                        newData = newData.map((x, i) => {
                            x.key = i
                            return x
                        })
                    }
                }
                setTableData(newData)
                setEditId()
                setRowId()
            },
            onCancel() { }
        })
    }

    const onEditRx = (record) => {
        setEditId(record._id)
        setRowId(record.key)
        let obj = {
            // physicianId: record.physicianId,
            medication: record.medicineFullName,
            direction: record.direction,
            indication: record.indication,
            progressNote: record.progressNote,
            pharmacyNote: record.pharmacyNote,
        }
        setOrderType(record.orderType)
        setFieldsValue(obj)

    }

    const getColumns = [
        {
            title: 'Sr.No',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'Medication',
            dataIndex: 'medicineFullName',
            render: (text, record) => (<span>{text || record.name || record.medication}</span>),
            // `${text} ${record.medStrength ? `, ${record.medStrength}` : ''} ${record.medDosageType ? `, ${record.medDosageType}` : ''} `}</span>),
        },
        {
            title: 'Directions',
            dataIndex: 'direction',
            render: (text) => (<span>{text}</span>),
        },
        {
            title: 'Indication',
            dataIndex: 'indication',
            render: (text) => (<span>{text}</span>),
        },
        {
            title: 'Actions',
            width: '300px',
            // render: (record, row) => <div className='patient_order_d ac' style={{ textAlign: 'center' }}>
            render: (row, record) => <div className='patient_order_d ac' style={{ textAlign: 'center' }}>
                <div className="actions">
                    <a onClick={() => visibleNotesModal(true, record)}>
                        <div className="action_ico">
                            <Notes />
                            {record.notes?.length > 0 ?
                                <span className="todo tot read">{record.notes.length}</span>
                                : null}
                        </div>
                        <p>Notes</p>

                    </a>
                    {/* <a onClick={() => setReminder(true, record)}>
                        <div className="action_ico">
                            <Reminder />
                            <span className="rem tot read">05</span>
                        </div>
                        <p>Reminders</p>

                    </a> */}
                    {
                        // edit ?
                        <a onClick={() => onEditRx(record)}>
                            <Edit />
                            <p>Edit Rx</p>
                        </a>
                        // : null
                    }
                    <a onClick={() => onCancelRx(record)}>
                        <Cancel />
                        <p>Cancel Rx</p>
                    </a>
                </div>
            </div>
        }
    ]

    const handleVisibleSave = (visible, str) => {
        if (filteredTable.length === 0) {
            Toast.error('Please Add Medications')
            return
        }
        if (!isDrOrNp(authUser) && !form.getFieldValue('physicianId')) {
            Toast.error('Please Select Physician')
            return
        }
        if (str)
            savePresc(str)
        setVisibleSave(visible)
    }

    const createRequest = (str) => {

        let newTableData = [...tableData]
        newTableData = _.map(newTableData, function (obj) {
            return _.omit(obj, ['key', 'physicianId']);
        })
        let request = {
            "medStrip": requestObj.medStrip,
            // "isCancel": true, while cancel
            "physicianId": isDrOrNp(authUser) ? authUser._id : requestObj.physicianId,
            "residentId": residentDetail._id,
            "type": TYPE.COE,
            "rxType": RX_TYPE.PRESCRIPTION,
            "status": STATUS.SUBMITTED,
            "deviceId": uuid(),
            "isVerbalOrder": isDrOrNp(authUser) ? false : true,
            "homeAreaId": residentDetail.homeAreaId?._id,
            "attachments": [],
            "prescriptionMedication": newTableData,
            "isUrgent": isUrgent === 'yes'
        }
        if (edit) {
            request = {
                ...request,
                "status": edit.status === STATUS.DRAFT ? STATUS.SUBMITTED : STATUS.EDITED,
                "_id": edit._id,
                "uniqueId": edit.uniqueId
            }
            // add or remove _id for medications added in db or not
            let existingMedicationIds = _.map(edit.prescriptionMedication, '_id')
            request.prescriptionMedication = request.prescriptionMedication.map(x => {
                if (x._id) {
                    let existing = existingMedicationIds.includes(x._id)
                    if (!existing)
                        delete x._id
                }
                return x
            })
        } else {
            request.prescriptionMedication = _.map(request.prescriptionMedication, (d) => _.omit(d, "_id"))
        }
        if (str === 'draft')
            request.status = STATUS.DRAFT
        return request
    }

    const savePresc = async (str) => {
        if (tableData.length === 0) {
            Toast.error('Please Add Medications')
            return
        }
        let req = createRequest(str)
        if (!req.physicianId) {
            Toast.error('Please Select Physician')
            return
        }
        try {
            setLoader(true)
            let res = await axios({ ...upsert, data: req })
            if (res) {
                if (res.code === 'OK') {
                    Toast.success(res.message)
                    cancelPresc('ok')
                    onOk()
                } else
                    Toast.error(res.message)
            }
            setLoader(false)
        } catch{
            setLoader(false)
        }
    }

    const setRowStyle = (record, index) => {
        return rowId === index ? 'custom-row-style' : ''
    }

    useEffect(() => {

    }, [rowId])

    const handleSaveFav = (favMeds) => {
        let newTableData = [...tableData]
        newTableData = newTableData.concat(favMeds)
        newTableData = newTableData.map((x, i) => {
            if (!x.key)
                x.key = i
            return x
        })
        setTableData(newTableData)
    }

    const handleChaneUrgent = e => {
        setIsUrgent(e.target.value)
    }

    const visibleNotesModal = (visible, record, noteCount, resOptions) => {
        console.log("visibleNotesModal -> visible, record, noteCount, resOptions", visible, record, noteCount, resOptions)
        // setNotesData(newData)
        setNotesModal(visible);
        setNotesFilterOptions({});
        if (noteCount) {
            let newData = [...tableData]
            let index = newData.findIndex(obj => obj.key === currentModalData.current.key)
            if (index >= 0) {
                newData[index] = {
                    ...newData[index],
                    notes: resOptions.notesData
                }
            }
            setTableData(newData)
            console.log("visibleNotesModal -> newData", newData)
        }
        currentModalData.current = visible ? { ...record } : null;
    };


    const filteredTable = tableData.filter(x => !x.isDelete)

    return <>
        <div class="add_resident">
            <div className="prep_right_wrap">
                <div className="box-inner-border">
                    <div className="sub-box-border">
                        <div className="d-flex-box">
                            <h2>
                                {
                                    `${edit ? 'Update' : 'Add'} Rx Order for - ${residentDetail.mergeLFName} 
                                    ${!isDrOrNp(authUser) ? `(VO/TO By ${getUserNameWithDesignation(authUser)}
                                         ${edit && edit.physicianId && edit.physicianId._id ? `for ${getUserNameWithDesignation(edit.physicianId)}` : ''} 
                                       )`: ''}`
                                }
                            </h2>
                            <h2>{edit?.orderNumber}</h2>
                        </div>
                        <div className="form_row d-flex">
                            <div className="left-create-box">
                                <div className="text-left">
                                    <span className="sub-text ">Type</span>
                                    <div className="rx-btns drug-bts">
                                        <div className="flex-block">
                                            {
                                                orderTypes?.map(x => {
                                                    return <a>
                                                        <Button className={orderType === x._id ? 'rout-btn' : ''}
                                                            onClick={() => setOrderType(x._id)}>
                                                            {x.name}
                                                        </Button>
                                                    </a>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="checkbox-control">
                                    <label className="filter_check">
                                        <input type="checkbox"
                                            checked={requestObj.medStrip}
                                            onChange={() => setRequestObj({
                                                ...requestObj,
                                                medStrip: !requestObj.medStrip
                                            })} />
                                        <span className="checkbox"></span>
                                        <span className="lbl">Start with next med strips</span>
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <div className="left-select">
                                        {
                                            !isDrOrNp(authUser) ?
                                                <div className="m-b-10">
                                                    {getFieldDecorator('physicianId', {
                                                        rules: [
                                                            { required: false, message: 'Please Select Physician' }
                                                        ]
                                                    })(
                                                        <DoctorFilter onChange={handlePhyChange} />
                                                    )}
                                                    {(errors = getFieldError('physicianId')) ? <ErrorMsg errors={errors} /> : null}
                                                </div>
                                                : null
                                        }
                                        <div className="m-b-10">
                                            {getFieldDecorator('medication', {
                                                rules: [{
                                                    required: true, message: `Please enter medication`,
                                                    // whitespace: true,
                                                }]
                                            })(
                                                <SearchMedication onSelectMedication={selectMedication} />
                                            )}
                                            {(errors = getFieldError('medication')) ? <ErrorMsg errors={errors} /> : null}
                                        </div>
                                        <div className="form_group textInput">
                                            {getFieldDecorator('direction', {
                                                rules: [{
                                                    required: false, message: `Please enter directions`,
                                                    whitespace: true,
                                                }]
                                            })(
                                                <TextArea placeholder='Directions' style={{ height: '81px' }} class="inputForm" />
                                            )}
                                            {(errors = getFieldError('direction')) ? <ErrorMsg errors={errors} /> : null}

                                        </div>
                                    </div>
                                    <div className="right-textarea">
                                        <div className="">
                                            {getFieldDecorator('indication', {
                                                rules: [{
                                                    required: false, message: `Please enter indication`,
                                                    whitespace: true,
                                                }]
                                            })(
                                                <Select
                                                    combobox={true}
                                                    showSearch allowClear
                                                    placeholder="Select Indication"
                                                    // optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {
                                                        IndicationJson.map((data) => {
                                                            return <Option value={data.name} key={data.id}>{data.name}</Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                            {(errors = getFieldError('indication')) ? <ErrorMsg errors={errors} /> : null}

                                            {getFieldDecorator('progressNote')(
                                                <TextArea
                                                    placeholder="Progress Notes &#10;(will push to PCC/MED e-care)"
                                                    class="inputForm"
                                                ></TextArea>
                                            )}
                                        </div>
                                    </div>
                                    <div class="right-textarea primary-notes">
                                        {getFieldDecorator('pharmacyNote')(
                                            <TextArea
                                                placeholder="Notes to Pharmacy"
                                                class="inputForm"
                                            ></TextArea>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex j-space-between">
                                    <div className="plus-icon">
                                        {/* <div className="d-flex mr-20" onClick={() => setReminder(true)}>
                                            <p className="green-bg-plus">
                                                <PlusBtn />
                                            </p>
                                            <span className="green-text">Set Reminder</span>
                                        </div> */}
                                        <div className="d-flex mr-20" style={{ cursor: 'pointer' }}>
                                            {
                                                fav ? <><p className="green-bg-plus">
                                                    <Correct />
                                                </p>
                                                    <span className="green-text">Added</span>
                                                </> :
                                                    <>
                                                        <p className="green-bg-plus">
                                                            <PlusBtn />
                                                        </p>
                                                        <span className="green-text" onClick={() => handleSave('fav')}>Add to Favourites</span>

                                                    </>
                                            }
                                        </div>
                                        <div className="d-flex" style={{ cursor: 'pointer' }}>
                                            <span className="d-flex green-text mr-10"
                                                style={{ alignItems: 'center', 'font-weight': 'bold' }}>  Urgent Order</span>
                                            <label className='filter_check radio'>
                                                <input
                                                    type='checkbox'
                                                    name='medium'
                                                    value='yes'
                                                    checked={isUrgent === 'yes'}
                                                    onChange={handleChaneUrgent}
                                                />
                                                <span className='checkbox radio'></span>
                                                <span className='lbl'>Yes</span>
                                            </label>
                                            <label className='filter_check radio'>
                                                <input
                                                    type='checkbox'
                                                    name='medium'
                                                    value='no'
                                                    checked={isUrgent === 'no'}
                                                    onChange={handleChaneUrgent}
                                                />
                                                <span className='checkbox radio'></span>
                                                <span className='lbl'>No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="d-flex sm_btn">
                                        <Button size='lg' type='secondary'
                                            class="prev-screen-btn gray-btn"
                                            onClick={handleCancelForm}>
                                            CANCEL
                                        </Button>
                                        <Button size='lg' class="btn add-btn"
                                            disabled={rowId >= 0 ? false : tableData.length >= 3}
                                            loading={saveLoader}
                                            onClick={handleSave}>
                                            {rowId >= 0 ? 'UPDATE' : 'ADD'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <MedFavourite tableLength={filteredTable.length} tableData={filteredTable}
                                onSaveFav={handleSaveFav}
                                isFavAdded={fav} />
                        </div>
                    </div>

                    {
                        tableData && tableData.length ?
                            <div className="mt-20">
                                <Table pagination={false}
                                    columns={getColumns}
                                    datasource={filteredTable}
                                    noLRPad={true}
                                    rowId={rowId}
                                    rowClassName={'custom-row-style'}
                                    style={{ minHeight: 'auto' }}
                                />
                            </div> : null
                    }
                </div>
                <div className="d-flex-end">
                    {
                        edit?.status !== STATUS.SUBMITTED ?
                            <div className="save-graft" onClick={() => savePresc('draft')}>
                                <span>Save as Draft</span>
                                <Correct />
                            </div>
                            : null
                    }
                    <Button size='lg' type='secondary' className="prev-screen-btn gray-btn" onClick={cancelPresc}>CANCEL</Button>
                    <Button size='lg' type='primary'
                        loading={loader}
                        onClick={() => handleVisibleSave(true)} >
                        SAVE
                    </Button>

                    {visibleSave && (
                        <SavePrescriptionPopup
                            visible={visibleSave}
                            residentDetail={residentDetail}
                            edit={edit}
                            onOk={() => handleVisibleSave(false, 'ok')}
                            onDraft={() => handleVisibleSave(false, 'draft')}
                            onCancel={() => handleVisibleSave(false)}
                        />
                    )}
                </div>
            </div>

        </div>
        {
            visibleReminder ? <ReminderForm visible={visibleReminder} options={reminderObj}
                onOk={(data) => setReminder(false, data)}
                onCancel={() => setReminder(false)} />
                : null
        }
        {notesModal && (
            <NotesModal
                isNotApiCall={true}
                defaultNotes={currentModalData.current.notes}
                visible={notesModal}
                filterOptions={notesFilterOptions}
                onCancel={(data, options) => visibleNotesModal(false, null, data, options)}
                isUpsertList={true}
                // modalTitle={`View Notes - ${currentModalData.current?.orderNumber || ''}`}
                xRayNumber={currentModalData.current.medicineFullName ||
                    currentModalData.current.medication}
                addData={edit ? {
                    residentId: currentResidentId,
                    prescriptionMedicationId: currentModalData.current._id,
                    category: TODO_CATEGORY.PRESCRIPTION,
                    subCategory: SUB_CATEGORY.NOTES.GENERAL,
                } : {}}
            />
        )}
    </>
}
export default createForm()(PrescriptionForm)