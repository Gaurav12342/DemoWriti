import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = (props) => {
  const { name, value, children, onChange, defaultChecked, disabled, className } = props;
  console.log("RadioButton -> childern", children)
  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={className}
      />
      {children}
    </>
  );
};

RadioButton.defaultProps = { className: 'checkbox' };

RadioButton.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  childern: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};
export default RadioButton;
