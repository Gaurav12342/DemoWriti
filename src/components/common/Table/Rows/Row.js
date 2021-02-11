import React from 'react'
function Row(props) {
    const { col, children, setStylesToColumn } = props
    return (<td>
        <div className="patient_order_d" style={setStylesToColumn && col.style ? col.style : null}>
            <>{children}</>
        </div>
    </td>)
}
export default Row