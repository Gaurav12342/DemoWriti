import React, { useState } from 'react';
import Modal from './../Popup/index'
import TextArea from './../TextArea'
import ErrorMsg from './../ErrorMsg'
import Input from './../Input'
import { DateTimePicker } from './../DatePicker/index'
import { dateTimeFormat, disabledHours, disabledMinutes, currentDate } from './../../../util/moment'

let selectedDate = currentDate
const Upsert = (props) => {
    const { form, visible, loader, onOk, onCancel } = props
    let errors
    const { getFieldError, getFieldDecorator } = form;
    const [value, setValue] = useState()

    const showTime = {
        format: "HH:mm",
        minuteStep: 5,
        showSecond: false,
        use12Hours: false,
        disabledHours: () => disabledHours(selectedDate),
        disabledMinutes: () => disabledMinutes(selectedDate)
    }
    const onChange = (date) => {
        if (date)
            selectedDate = date
    };

    return <Modal visible={visible} title="Add Reminder"
        onOk={onOk}
        onCancel={onCancel}
        onClose={onCancel}
        okButtonProps={{ loading: loader }}
    >
        <div className="form">
            <form>
                <div className="form_row verticle">
                    <div className='form_group'>
                        {getFieldDecorator('dateTime', {
                            rules: [{ required: true, message: "Please select Date and Time" }]
                        })(

                            <DateTimePicker
                                placeholder="Select Date & Time*"
                                value={value}
                                onChange={onChange}
                                timePicker={true}
                                disabled={false}
                                showOk={true}
                                timePickerProps={showTime}

                            />

                        )}
                    </div>
                    {(errors = getFieldError('dateTime')) ? <ErrorMsg errors={errors} /> : null}
                    <div className='form_group' style={{ marginTop: '10px' }}>
                        {getFieldDecorator('notes')(
                            <TextArea Placeholder="Reminder Notes" />
                        )}
                    </div>
                </div>
            </form>
        </div>
    </Modal>
}

export default (Upsert)