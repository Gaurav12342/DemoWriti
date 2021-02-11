import React from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import PropTypes from 'prop-types';

const RangePicker = (props) => {
  return (
    <>
      <RangeCalendar {...props} />
    </>
  );
};

RangePicker.defaultProps = {
  locale: { enUS },
  className: 'my-react-component'
};
RangePicker.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  selectedValue: PropTypes.string,
  format: PropTypes.string,
  locale: PropTypes.object,
  disabledDate: PropTypes.bool || PropTypes.func,
  showToday: PropTypes.bool,
  showOk: PropTypes.bool,
  showClear: PropTypes.bool,
  timePicker: PropTypes.element,
  onSelect: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.array,
  hoverValue: PropTypes.string,
  onHoverChange: PropTypes.func,
  showWeekNumber: PropTypes.bool,
};
export default RangePicker;
 