import React from 'react'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { Children } from 'react';
function ToolTip({text,placement}) {
    return <Tooltip text={text || ''} placement={placement || 'top'} >{Children}</Tooltip>
}
export default ToolTip