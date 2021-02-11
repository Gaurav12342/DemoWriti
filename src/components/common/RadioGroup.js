import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const { className, name, options, onChange, checked, disabled } = props;
  return (
    <>
      {options.map((option) => (
        <><label htmlFor={`${name}-${option.value}`}> 
            <input
              className={className}
              type='radio'
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              onChange={onChange}
              checked={option.checked}
              disabled={disabled}
            />
            {/* <label htmlFor={`${name}-${option.value}`}></label> */}
            <span>{option.label}</span></label>
        </>
      ))}
    </>
  );
};

RadioGroup.defaultProps = { className: '' };
RadioGroup.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.any
};

export default RadioGroup;
