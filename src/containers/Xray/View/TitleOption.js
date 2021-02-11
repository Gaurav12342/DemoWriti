import React from 'react'
import { Correct } from '../../../assets/images/resident-detail/index'
function TitleOption({ label }) {
    return <label className="listing-wrapper">
        <input type="radio" name="chest-xray" id="chest" checked />
        <span>
            {label}
            <Correct />
        </span>
    </label>
}
export default TitleOption