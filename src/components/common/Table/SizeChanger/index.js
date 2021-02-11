import React from 'react'
import Select from '../../Select'
function SizeChanger(props) {
    const { onSizeChange, currentLimit } = props
    const options = [
        { id: 10, key: 10, label: "10 / page" },
        { id: 20, key: 20, label: "20 / page" },
        { id: 30, key: 30, label: "30 / page" },
        { id: 40, key: 40, label: "40 / page" },
    ]
    return (
        <Select
            options={options}
            onChange={(e) => onSizeChange(e)}
            placeholder='Select Size'
            defaultid={10}
            value={currentLimit || 10}
            style={{ width: '150px' }}
        />)
}
export default SizeChanger