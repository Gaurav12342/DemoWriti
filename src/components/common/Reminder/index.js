import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import Upsert from './Upsert'
import { upsertReminder } from '../../../services/api/routes/common'
import CommonService from '../../../services/api/services/common'
import { Toast } from './../Toast'
import moment from 'moment'

const Reminder = (props) => {
    const { form, visible, onOk, onCancel, record, authUser } = props
    const [loader, setLoader] = useState(false)

    const handleOk = value => {
        form.validateFields((error, value) => {
            console.log(error, value);
            if (error)
                return
            setLoader(true)
            const { method, url } = upsertReminder
            value.subCategory = record.subCategory || undefined;
            value.category = record.category;
            value.admissionReadmissionId = record.admissionReadmissionId || undefined;
            value.admissionRxOrderId = record.admissionRxOrderId || undefined;
            // obj.remindMeOn = AR_REMINDER.ONE_TIME;
            value.timeZone = moment.tz.guess(true);
            value.dateTime = moment(value.dateTime)
                .seconds(0)
                .tz(value.timeZone)
                .milliseconds(0)
                .toISOString();
            value.remindsTo = [authUser._id];
            // value.reminderGroup = AR_REMINDER_GROUP["SELF"];
            let res = CommonService({ method, url, data: value })
            if (res) {
                const { data } = res
                if (data.code === "OK") {
                    Toast.success({ message: `${data.message}` });
                    form.resetFields();
                    onOk(data.data);
                } else {
                    Toast.error({ message: `${data.message}` });
                }
                setLoader(false)
            }
            setLoader(false)
        });
    }

    return <Upsert {...props} loader={loader}
        onOk={handleOk} onCancel={onCancel} />
}

Reminder.defaultProps = {};
Reminder.propTypes = {
    options: PropTypes.object,
    onCancel: PropTypes.func,
};
export default createForm()(Reminder)