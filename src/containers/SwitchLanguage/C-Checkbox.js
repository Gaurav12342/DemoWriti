import React from 'react'
const Checkbox = (props) => {
    const { locale, onChange, name, selected } = props
    console.log('name', name, 'selected', selected)
    return <label className="filter_switch" >
        <input type="radio" name="doc" id={locale} value={locale} checked={selected === locale ? true : false} />
        <span onClick={onChange}>{name}</span>
    </label>
}
export default Checkbox