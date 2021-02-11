import React from 'react'
import { getUserNameWithDesignation } from "../../util/common";
function ShowUserName(props) {
    return <span>{props.authUser ? getUserNameWithDesignation(props.authUser) : ''}</span>
}

export default ShowUserName