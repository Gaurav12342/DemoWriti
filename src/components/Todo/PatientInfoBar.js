import React from 'react';
// import { displayDOB } from '../../util/moment'

const PatientInfoBar = ({ patient, orderNumber }) => {
    const { mergeLFName, room, image, dob } = patient
    return <div className="main-title">
        <h4>{mergeLFName} - {orderNumber} (Room No {room || '-'}) {dob}</h4>
    </div>
}
export default PatientInfoBar