import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import Dialog from '../common/Popup/index';
import { Plus, Info } from '../../../src/assets/images/popup/index'
import Button from '../common/Button'
import Select from '../common/Select'
import TextArea from '../common/TextArea';
import Reminder from '../common/Reminder'
import { displayDateTime } from '../../util/moment';
import { getUserNameWithDesignation } from '../../util/common';
import { priority as masterPriority } from '../../constants/notes';
import { X_RAY_TODO_TYPES, TODO_CATEGORY } from './../../constants/todo'
import { Toast } from '../common/index';

const Upsert = (props) => {
    const { isEdit, form, onCancel, noteTypes, detail = {}, xRayNumber, addButtonLoading } = props;

    const noteTypeOptions = noteTypes.map(n => ({
        ...n, key: n._id, label: n.name, id: n._id, value: n._id
    }))
    //console.log("🚀 ~ file: Upsert.js ~ line 21 ~ Upsert ~ noteTypeOptions", noteTypeOptions)
    const [reminder, setReminder] = useState(false)
    const [note, setNote] = useState(detail.note);
    const [priority, setPriority] = useState(detail.priority)
    const [isAlert, setIsAlert] = useState(detail.isAlert || false)
    const { getFieldDecorator, getFieldValue } = form;

    useEffect(() => {
        form.setFieldsValue({
            noteType: detail.noteType?._id
        });
        setPriority(detail.priority || 1)
        setNote(detail.note)
    }, [detail.noteType, detail.note, detail.priority])

    const handleOk = async () => {
        const noteType = getFieldValue('noteType');
        if (!note) {
            Toast.error('Please enter notes')
            return
        }

        if (isEdit) {
            props.handleUpdate(detail._id, {
                noteType,
                // priority,
                note, isAlert
            })
        } else {
            props.handleAdd({
                noteType,
                // priority,
                note,
                tags: [],
                isPublic: true,
                isAlert
            })
        }
    }

    const handleReminder = (visible) => {
        setReminder(visible)
    }
    return <Dialog {...props} footer={false} customChildren={true}
        className="logout_popup add_notes_warp"
    >
        <div className="popup-content-log">
            <h3 className="name_head">{isEdit ? 'Edit' : 'Add'} Note</h3>
            <div className="bb"></div>
            {
                !!isEdit &&
                <div className="ptrik-notes">
                    <span>Created By : {detail.addedBy && getUserNameWithDesignation(detail.addedBy)}</span>
                    <span>Created At : {detail.createdAt && displayDateTime(detail.createdAt)}</span>
                </div>
            }

            <div className="d-flex j-space-between">
                <form action="">
                    <div className="form_wrap mb-10">
                        <div className="components">
                            {getFieldDecorator('noteType', {
                                rules: [{ required: true, message: "Please select type" }]
                            })(
                                <Select
                                    placeholder="Select Note Type"
                                    options={noteTypeOptions}
                                />
                            )}

                        </div>
                    </div>
                </form>
                <div className="alert-box">
                    <span>Alert</span>
                    {/* <div className="filter_value d-flex">

                        <label htmlFor="yes" className="filter_check mr-0">
                            <input
                                type="checkbox"
                                name="alert"
                                id="yes"
                                value={true}
                                checked={isAlert === 'yes'}
                                onChange={e => setIsAlert(e.target.value)}
                            />
                            <span className="checkbox"></span>
                            <span className="lbl">Yes</span>
                        </label>
                        <label htmlFor="no" className="filter_check mr-0">
                            <input type="checkbox" name="alert" id="no"
                                value={false}
                                checked={isAlert === 'no'}
                                onChange={e => setIsAlert(e.target.value)} />
                            <span className="checkbox"></span>
                            <span className="lbl">No</span>
                        </label>
                    </div> */}

                    <div className="filter_value d-flex">

                        <label htmlFor="yes" className="filter_check mr-0">
                            <input
                                type="checkbox"
                                name="alert"
                                id="yes"
                                value={true}
                                checked={isAlert === true}
                                onChange={e => setIsAlert(true)}
                            />
                            <span className="checkbox"></span>
                            <span className="lbl">Yes</span>
                        </label>
                        <label htmlFor="no" className="filter_check mr-0">
                            <input type="checkbox" name="alert" id="no"
                                value={false}
                                checked={isAlert === false}
                                onChange={e => setIsAlert(false)} />
                            <span className="checkbox"></span>
                            <span className="lbl">No</span>
                        </label>
                    </div>
                </div>

                {/* <div className="alert-box">
                    <span>Priority</span>
                    <div className="filter_value d-flex">

                        <label htmlFor="low" className="filter_check">
                            <input
                                type="checkbox"
                                name="priority"
                                id="low"
                                value={masterPriority.LOW}
                                checked={priority === masterPriority.LOW}
                                onChange={e => setPriority(masterPriority.LOW)}
                            />
                            <span className="checkbox"></span>
                            <span className="lbl">Low</span>
                        </label>
                        <label htmlFor="medium" className="filter_check">
                            <input type="checkbox" name="priority" id="medium"
                                value={masterPriority.MEDIUM}
                                checked={priority === masterPriority.MEDIUM}
                                onChange={e => setPriority(masterPriority.MEDIUM)} />
                            <span className="checkbox"></span>
                            <span className="lbl">Medium</span>
                        </label>
                        <label htmlFor="high" className="filter_check">
                            <input type="checkbox" name="priority" id="high"
                                value={masterPriority.HIGH}
                                checked={priority === masterPriority.HIGH}
                                onChange={e => setPriority(masterPriority.HIGH)} />
                            <span className="checkbox"></span>
                            <span className="lbl">High</span>
                        </label>
                    </div>
                </div> */}

            </div>


            <div className="additional-textarea">
                <TextArea value={note} onChange={e => setNote(e.target.value)} placeholder="Add Note"></TextArea>
            </div>

            <div className="d-flex bottom-doc">
                <Info />
                <span className="">Associated with Document </span>
                <span className="color-green">{xRayNumber}</span>
                {/* <MathPlus onClick={handleDoc} /> */}
            </div>

            <div className="d-flex reminder-part j-space-between">
                <div className="d-flex j-space-between">
                    {/* <div className="plus-icon">
                        <div className="d-flex mr-20">
                            <p className="green-bg-plus" onClick={() => handleReminder(true)}>
                                <Plus />
                            </p>
                            <span className="green-text">Set Reminder</span>
                        </div>
                    </div> */}
                </div>
                <div className="d-flex-end f-end">
                    <Button
                        className="prev-screen-btn gray-btn sh-btn"
                        onClick={onCancel}
                    >
                        CANCEL
                    </Button>
                    <Button type="primary" size="sm" loading={addButtonLoading} onClick={handleOk}>
                        {isEdit ? 'UPDATE' : 'ADD'}
                    </Button>
                </div>
            </div>
        </div>

        {reminder ?
            <Reminder
                visible={reminder}
                onOk={() => handleReminder(false)}
                onCancel={() => handleReminder(false)}
            />
            : null
        }

    </Dialog >
}

export default createForm()(Upsert)