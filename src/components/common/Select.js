import React, { useEffect, useState, Component } from 'react'
import { Select, Option } from '../common'
// import AsyncSelect from 'react-select/async'

function SelectComp({ options, value, placeholder, onChange, defaultValue, ...rest }) {
    return <Select
        className="common inputForm select"
        value={value}
        placeholder={placeholder || ''}
        defaultValue={defaultValue}
        {...rest}
        onChange={onChange}>
        {
            options.map(opt => {
                return (<Option value={opt.key} id={opt.key}>{opt.label}</Option>)
            })
        }
    </Select>
}

export default SelectComp
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//     { value: 'vavccc', label: 'Vavccc' },
// ]

// const handleSearch = e => {
//     console.log("e", e)

// }
// const filterColors = (inputValue) => {
//     let filter = options.filter(i =>
//         i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
//     console.log("filterColors -> filter", filter)
//     return filter
// };
// const loadOptions = (inputValue, callback) => {
//     setTimeout(() => {
//         callback(filterColors(inputValue));
//     }, 1000);
// };
// const handleInputChange = (newValue) => {
//     const inputValue = newValue.replace(/\W/g, '');
//     // this.setState({ inputValue });
//     return inputValue;
// };
// const filterOption = (option, inputValue) => {
//     const { label, value } = option;
//     const otherKey = options.filter(
//         opt => opt.label === label && opt.value.includes(inputValue)
//     );
//     return value.includes(inputValue) || otherKey.length > 0;
// };
// const MyComponent = () => {
//     const [value, setValue] = useState('')
//     return (<>
//         {/* <Select className="custom-rc-select" filterOption={filterOption} options={options} isSearchable={true}></Select> */}
//         <AsyncSelect
//             // cacheOptions
//             loadOptions={loadOptions}
//             options={options}
//             // defaultOptions
//             filterOption={filterOption} options={options}
//             // isMulti={true} 
//             className="custom-rc-select" isSearchable={true}
//             onInputChange={handleInputChange}
//         // onSearch={handleSearch}
//         />
//     </>
//     )
// }
// export default MyComponent