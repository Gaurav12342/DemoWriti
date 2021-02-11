import React from 'react'
import Select, { Option } from '../../../components/common/AutoComplete'

function SwitchHome({ options, onHomeChange, value }) {
    return (<>
        <Select
            placeholder="Select Home"
            value={value}
            style={{ width: '200px' }}
            onChange={(val) => onHomeChange(val)}
            showSearch
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                options.map(opt => {
                    return <Option value={opt.id} key={opt.key}>{opt.label}</Option>
                })
            }
        </Select>
    </>)
}
export default SwitchHome

