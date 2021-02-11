import React, { useState, useEffect } from 'react';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import PropTypes from 'prop-types';
import Input from '../Input';
import { ChevronDown, Clear } from "../../../assets/images/index";
import "rc-calendar/assets/index.css";
import "rc-time-picker/assets/index.css";
import { Calendar, TimePicker, RangePicker } from '../DatePicker/index';

const DateRangePicker = (props) => {
  const { allowClear, onClear, onChange, placeholder, disabled } = props;
  const formatStr = props.format;


  const format = (v) => {
    return v ? moment(v).format(formatStr) : '';
  };

  const isValidRange = (v) => {
    return v && v[0] && v[1];
  };

  const calendar = (
    <RangePicker
      className='my-react-component'
      dateInputPlaceholder={['start', 'end']}
      // defaultValue={[moment(), moment().clone().add(1, 'months')]}
      locale={props.locale}
      timePicker={props.timePicker ? <TimePicker /> : null}
      showOk={false}
      format={formatStr}
    />
  );
  return (
    <>
      <Calendar {...props}
        onChange={onChange}
        calendar={calendar}>
        {({ value }) => {
          return (
            <div>
              <Input
                placeholder={placeholder}
                style={{ width: 300 }}
                disabled={disabled}
                readOnly
                allowClear={allowClear}
                clearClassName={allowClear && 'clearDateRangeIcon'}
                // className= 'inputForm'
                value={!!value && !!value.length ?
                  (isValidRange(value) &&
                    `${format(value[0])} - ${format(value[1])}`) ||
                  '' : ''
                }
                onChange={onChange}
                onClear={onClear}
              // clearClassName={props.clearClassName}
              // value={value || undefined}
              />

            </div>
          );
        }}
      </Calendar>
    </>
  );
};
DateRangePicker.defaultProps = {
  timePicker: false,
  format: 'MM/DD/YYYY',
  locale: enUS,
  className: 'my-react-component',
  allowClear: true,
};
DateRangePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  timePicker: PropTypes.bool,
  format: PropTypes.string,
  className: PropTypes.string,
  locale: PropTypes.object,
  defaultValue: PropTypes.string,
  allowClear: PropTypes.bool
};

export default DateRangePicker;
