/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Picker from 'rc-calendar/lib/Picker';
import enUS from 'rc-calendar/lib/locale/en_US';

const Calendar = (props) => {
  const { children } = props;
  return (
    <>
      <Picker {...props}>{children}</Picker>
    </>
  );
};

Calendar.defaultProps = { className: 'my-react-component', locale: { enUS } };
Calendar.propTypes = {
  timePicker: PropTypes.bool,
  calendar: PropTypes.node,
  format : PropTypes.string,
  disabledTime: PropTypes.string,
  placement: PropTypes.string,
  animation: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  dropdownClassName: PropTypes.string,
  className: PropTypes.string,
  locale: PropTypes.object,
  disabledDate: PropTypes.bool || PropTypes.func,
  showToday: PropTypes.bool,
  showOk: PropTypes.bool,
  showClear: PropTypes.bool,
  onSelect: PropTypes.func,
  onClear: PropTypes.func,
  onOk: PropTypes.func,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.array,
  hoverValue: PropTypes.string,
  onHoverChange: PropTypes.func,
  showWeekNumber: PropTypes.bool,
};
export default Calendar;
