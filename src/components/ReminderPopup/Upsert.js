import React, { useState, useEffect } from 'react';
import Dialog from '../common/Popup/index';
import Button from '../common/Button'
import TextArea from '../common/TextArea';
import { displayDateTime } from '../../util/moment';
import { getUserNameWithDesignation } from '../../util/common';
import { DURATION_TYPE } from './../../constants/reminder'
import ErrorMsg from './../common/ErrorMsg';
import moment from 'moment'
import { DateTimePicker } from './../common'

const Upsert = (props) => {
    const { isEdit, onCancel, detail = {}, xRayNumber } = props;

    const [message, setMessage] = useState(detail.message);
    const [reminderDate, setReminderDate] = useState(detail.reminderDate);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setReminderDate(detail.reminderDate ? moment(detail.reminderDate) : null)
        setMessage(detail.message)
    }, [detail.message, detail.reminderDate])

    const handleOk = async () => {
        let errors = {}
        if (!message || !message.trim) {
            errors['message'] = ['Please enter reminder note.']
        }
        if (!reminderDate) {
            errors['reminderDate'] = ['Please enter reminder date.']
        };
        if (errors['message'] || errors['reminderDate']) {
            return setErrors(errors)
        }
        if (isEdit) {
            props.handleUpdate({ reminderDate, message, id: detail._id })
        } else {
            props.handleAdd({
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                durationType: DURATION_TYPE.SINGLE_DAY,
                isActive: true,
                reminderDate,
                message
            })
        }
    }
    

    return <Dialog {...props} footer={false} customChildren={true}
        className="logout_popup add_notes_warp"
    >
        <div className="popup-content-log">
            <h3 className="name_head">{isEdit ? 'Edit' : 'Add'} Reminder</h3>
            <div className="bb"></div>
            {
                !!isEdit &&
                <div className="ptrik-notes">
                    <span>Created By : {detail.addedBy && getUserNameWithDesignation(detail.addedBy)}</span>
                    <span>Created At : {detail.createdAt && displayDateTime(detail.createdAt)}</span>
                </div>
            }
            <div className="form">
                <form>
                    <div className="form_row verticle">
                        <div className='form_group'>
                            <TextArea
                                style={{ height: 'auto' }}
                                rows='6'
                                Placeholder="Reminder Notes"
                                onChange={e => setMessage(e.target.value)}
                                value={message}
                            />
                            <ErrorMsg errors={errors['message'] || []} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="d-flex reminder-part j-space-between">
                <div className='form_group'>
                    <DateTimePicker
                        placeholder="Select Date & Time*"
                        value={reminderDate}
                        onChange={setReminderDate}
                        timePicker={true}
                        disabled={false}
                        showOk={true}
                        timePickerProps={{
                            format: "HH:mm",
                            minuteStep: 5,
                            showSecond: false,
                            use12Hours: false,
                        }}
                        disabledDate={current => current.isBefore(moment().subtract(1,'days'))}
                    />
                    <ErrorMsg errors={errors['reminderDate'] || []} />
                </div>
                <div className="d-flex-center f-center">
                    <Button
                        className="prev-screen-btn gray-btn sh-btn"
                        onClick={onCancel}
                    >
                        CANCEL
                    </Button>
                    <Button className="prev-screen-btn sh-btn" onClick={handleOk}>
                        {isEdit ? 'UPDATE' : 'ADD'}
                    </Button>
                </div>
            </div>
        </div>
    </Dialog >
}

export default Upsert