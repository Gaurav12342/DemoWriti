import React from 'react';
import '../../../../node_modules/rc-datepicker/lib/style.css';
import { DatePickerInput } from 'rc-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

const DatePicker = (props) => {
  return (
    <>
      <DatePickerInput  {...props}>{props.children}</DatePickerInput>
    </>
  );
};

DatePicker.defaultProps = {
  className: 'my-react-component',
  locale: 'de',
  displayFormat: moment().format('DD-MM-YYYY'),
  returnFormat: moment().format('DD-MM-YYYY'),
  format: moment().format('DD-MM-YYYY'),
  autoClose: true,
  position: 'bottom',
};

DatePicker.propTypes = {
  displayFormat: PropTypes.string,
  format: PropTypes.string,
  returnFormat: PropTypes.string,
  className: PropTypes.string,
  // defaultValue: PropTypes.string | PropTypes.Date |  PropTypes.MomentDate | PropTypes.number,
  showOnInputClick: PropTypes.bool,
  showInputButton: PropTypes.bool,
  placeholder: PropTypes.string,
  locale: PropTypes.string,
  iconClassName: PropTypes.string,
  // value: PropTypes.string | PropTypes.Date | PropTypes.MomentDate,
  onChange: PropTypes.func,
  autoClose: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.string,
};

export default DatePicker;
