import React from 'react';
import PropTypes from 'prop-types';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

const TimePicker = (props) => {
  return (
    <>
      <TimePickerPanel {...props} />
    </>
  );
};
TimePicker.defaultProps = { format:'' , use12Hours: true };
TimePicker.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  showHour: PropTypes.bool,
  showMinute: PropTypes.bool,
  showSecond: PropTypes.bool,
  allowEmpty: PropTypes.bool,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  use12Hours: PropTypes.bool,
  placement: PropTypes.string,
  onClose: PropTypes.func,
  clearIcon: PropTypes.node,
  disabled: PropTypes.bool,
};

export default TimePicker;
