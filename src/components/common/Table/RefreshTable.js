import React from 'react'
import { Refresh } from '../../assets/images/pmr'
function RefreshTable(props) {
    const { onTableReafresh } = props
    return (< div className="p_head refresh">
        <div className="p_head_container">
            <div className="refresh">
                <a>
                    <Refresh onClick={onTableReafresh} />
                </a>
            </div>
        </div>
    </div>)
}
export default RefreshTable
