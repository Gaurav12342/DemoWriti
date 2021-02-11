import React, { useEffect, useState } from 'react';
import { getAllReminder, deleteReminder, upsertReminder } from '../../services/api/routes/reminder'
import axios from '../../services/api/config'
import Reminder from './View'
import Dialog from '../common/Popup';
import { Button } from '../common';
import AddReminder from './Upsert'

const List = props => {
    const { visible, filterOptions, xRayNumber } = props
    const [reminderData, setReminderData] = useState([])
    const [visibleAdd, setVisibleAdd] = useState(false)

    useEffect(() => {
        !!visible && fetch();
    }, [])

    const fetch = async () => {

        axios({ ...getAllReminder, data: filterOptions }).then(({ data }) => {
            console.log("TCL: fetch -> data", data);
            let reminders = [];
            if (data.code === "OK") {
                console.log(data.data.list)
                if (data.data && data.data.list && data.data.list.length > 0) {
                    reminders = data.data.list;
                }
            }
            console.log('reminders => ', reminders)
            setReminderData(reminders)
        })

    }

    const handleDelete = reminderObj => {
        axios({ ...deleteReminder, url: `admin/reminder/destroy/${reminderObj._id}` }).then(({ data }) => {
            console.log("TCL: fetch -> data", data);
            if (data.code === "OK") {
                fetch()
            }
        })
    }

    const handleUpdate = data => {
        axios({ ...upsertReminder, data })
            .then(({ data }) => {
                if (data.code === "OK") {
                    fetch()
                }
            })
    }

    const handleAdd = data => {
        axios({ ...upsertReminder, data: { ...data, ...props.addData } })
            .then(({ data }) => {
                console.log("handleUpdate -> data", data);
                if (data.code === "OK") {
                    setVisibleAdd(false)
                    fetch()
                }
            })
    }

    return (
        <Dialog
            {...props}
            customChildren={true}
            footer={false}
            onCancel={() => props.onCancel(reminderData.length, props.addData.subCategory)}
            className="logout_popup add_notes_warp view_notes_wrap"
        >
            <div className="popup-content-log" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 className="name_head">
                    {props.modalTitle || 'View Reminders'}
                    <Button
                        style={{ marginLeft: '10px' }}
                        onClick={() => setVisibleAdd(true)}
                    >
                        Add
                    </Button>
                </h3>
                <div className="bb"></div>
                {
                    reminderData && !!reminderData.length &&
                    reminderData.map(reminderObj =>
                        <Reminder
                            xRayNumber={xRayNumber}
                            detail={reminderObj}
                            handleDelete={() => handleDelete(reminderObj)}
                            onUpdate={fetch}
                            handleUpdate={handleUpdate}
                        />
                    )
                }
            </div>
            {
                !!visibleAdd &&
                <AddReminder
                    visible={visibleAdd}
                    isEdit={false}
                    onCancel={() => setVisibleAdd(false)}
                    xRayNumber={xRayNumber}
                    handleAdd={handleAdd}
                />
            }

        </Dialog>
    )
}
export default List