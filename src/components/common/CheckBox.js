import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = (props) => {
  const {
    checked,
    name,
    value,
    defaultChecked,
    onChange,
    children,
    disabled,
    onClick,
    className,
    style,
    label
  } = props;

  return (
    <>
      <label className="filter_check">
        <input type="checkbox" {...props} />
        <span className="checkbox"></span>
        {
          label &&
          <span className="lbl">{label}</span>
        }
      </label>

      {/* <input
        type='checkbox'
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        name={name}
        value={value}
        className={className}
        style={style}
      />
      {children} */}
    </>
  );
};

// CheckBox.defaultProps = { className: 'checkbox' };
CheckBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.string
};
export default CheckBox;
