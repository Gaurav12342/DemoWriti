import React, { Children } from 'react'
import Tooltip from "../../../../node_modules/rc-tooltip";
function ToolTip({ data ,children}) {
    return (<Tooltip
        placement="right"
        trigger={["hover"]}
        overlayClassName="pelvis-tooltip"
        overlay={
            <div>
                <p>
                    {data}
                </p>
            </div>
        }>{children}</Tooltip>
    )
}
export default ToolTip