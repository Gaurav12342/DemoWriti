import React from 'react';
import ConfirmPopup from '../common/Popup/ConfirmPopup';

const DeleteNotesPopup = (props) => {

    const { footerDescription,...otherProps } = props

    return <ConfirmPopup
        {...otherProps}
        title={`Delete Note`}
        footerDescription="This action cannot be undone"
        onOK={props.handleDelete}
    > <p>Are you sure you want to delete this note?</p></ConfirmPopup >
}
export default DeleteNotesPopup;