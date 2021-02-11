import React from "react";
import PropTypes from "prop-types";

const RadioButtonGroup = (props) => {
  const { className, name, options, onChange, checked, disabled } = props;
  return (
    <>
      {options.map((option) => (
        <>
          <button
            type="radio"
            {...props}
            name={name}
            value={option.value}
            onChange={onChange}
            checked={checked}
            disabled={disabled}
          >
            <label htmlFor={`${name}-${option.value}`}></label>
            <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
          </button>
          {/* <input
            type='radio'
            {...props}
            name={name}
            value={option.value}
            onChange={onChange}
            checked={checked}
            disabled={disabled}
          /> */}
          {/* <label htmlFor={`${name}-${option.value}`}></label>
          <label htmlFor={`${name}-${option.value}`}>{option.label}</label> */}
        </>
      ))}
    </>
  );
};

RadioButtonGroup.defaultProps = { className: "" };
RadioButtonGroup.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.any,
  onClick : PropTypes.func
};

export default RadioButtonGroup;
