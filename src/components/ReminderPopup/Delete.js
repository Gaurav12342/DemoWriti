import React from 'react';
import ConfirmPopup from '../common/Popup/ConfirmPopup';


const DeleteReminderPopup = (props) => {

    const { footerDescription, ...otherProps } = props

    return <ConfirmPopup
        {...otherProps}
        title={`Delete Reminder`}
        footerDescription="This action cannot be undone"
        onOK={props.handleDelete}
    > <p>Are you sure you want to delete this reminder?</p></ConfirmPopup >
}
export default DeleteReminderPopup;