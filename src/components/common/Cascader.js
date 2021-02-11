import React, { useState, useEffect } from 'react';
import Cascader from 'rc-cascader';
import Input from './Input'
import { ChevronDown, Clear } from '../../assets/images/index'
const $ = require('jquery')


$('body').on('click', '.clear', function (e) {

    setTimeout(function () {
        $('.rc-cascader-menus').addClass('rc-cascader-menus rc-cascader-menus-placement-bottomLeft rc-cascader-menus-hidden');
    }, 200);

})

const Custom = props => {
    const { onChange, allowClear, onClear, placeholder, ...otherProps } = props
    const [value, setValue] = useState('')
    const [className, setClassName] = useState('')


    useEffect(() => {
        if (props.value && props.value.length) {
            let v = props.value.map(o => o).join('/ ')
            setValue(v);
        }
    }, [props.value])

    const handleChange = (value, selectedOptions) => {
        let v = selectedOptions.map(o => o.label).join('/ ')
        setValue(v);
        onChange(value)
    };
    const handleClear = (e) => {
        // e.preventDefault()
        if (!allowClear)
            return
        setValue('');
        onChange(undefined)
    };

    return <Cascader className={className}
        onChange={handleChange} {...otherProps} readonly={true} transitionName="slide-up">
        <div className="cascader_wrap">
            <Input allowClear={allowClear}
                onClear={handleClear}
                placeholder={placeholder || 'Select Filter'} value={value} readOnly={true}
                componentClass='cascader'
                inputIcon={<ChevronDown />}
                disabled={props.disabled}
            />
        </div>
    </Cascader>
}
export default Custom