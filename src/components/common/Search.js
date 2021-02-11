import React, { useState, useEffect } from 'react';
import Input from './Input'
import PropTypes from 'prop-types';
import { ChevronDown, Clear } from "../../assets/images/index";
const Search = ({ className, onClear, ...props }) => {
    const [clear, setClear] = useState(props.allowClear && props.value)
    const [value, setValue] = useState(props.value || undefined)

    const handleClear = (e) => {
        setClear(false)
        handleChange(e)
        if (props.onClear)
            props.onClear(e)
    }

    const handleChange = (e) => {
        let val = e.target.value
        setValue(val || '')
        if (props.onChange)
            props.onChange(e)
    }

    useEffect(() => {
        if (value && props.allowClear && !clear) {
            setClear(true)
        } else if (!value && props.allowClear && clear)
            setClear(false)
    }, [value])
    //  useEffect(() => {
    //     if (props.value && props.allowClear && !clear) {
    //         setClear(true)
    //     } else if (!props.value && props.allowClear && clear)
    //         setClear(false)
    // }, [props.value])

    return <div className={`components search ${clear ? 'allow_clear' : ''}`}>
        <Input
            {...props}
            isSearch={true}
            onClear={handleClear}
            onChange={handleChange}
            value={value}
        />
        {props.allowClear && value && !props.disabled ? (
            <Clear onClick={handleClear} />
        ) : null}
    </div>

};

export default Search;

Search.defaultProps = {
    // className: 'search-box'
}
Search.propTypes = {
    className: PropTypes.string,
}