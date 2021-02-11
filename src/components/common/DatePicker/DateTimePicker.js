import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import { TimePicker } from '../DatePicker/index';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import {
  dateTimeFormat,
  dateFormat,
  displayDate,
  displayDateByFormat
} from './../../../util/moment';

const DateTimePicker = (props) => {
  const getFormat = () => {
    return props && props.timePicker ? dateTimeFormat : dateFormat;
  };

  const timePickerElement = (
    <TimePicker
      {...props}
      // {...props.timePickerProps}
      value={
        props && props.value != null ? moment(props.value).format('HH:MM') : ''
      }
    />
  );

  const disabledDate = (current) => {
    if (!current) {
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf(); // can not select days before today
  };

  const calendar = (
    <Calendar
      locale={props && props.locale}
      className='my-react-component'
      timePicker={props && props.timePicker ? timePickerElement : null}
      defaultValue={[moment(), moment().clone().add(1, 'months')]}
      showOk={true}
      disabledDate={props && props.disabledDate ? props.disabledDate : ''}
      format={getFormat()}
    // showDateInput={false}
    />
  );

  return (
    <>
      <div>
        <DatePicker calendar={calendar} {...props}>
          {({ value,format }) => {
            return (
              (
                <div className='form_wrap'>
                  <Input
                    placeholder={(props && props.placeholder) || 'Select Date'}
                    style={{ width: 250 }}
                    disabled={props && props.disabled}
                    value={value ? displayDateByFormat(value,getFormat()) : ''}
                  />
                </div>
              )
            );
          }}
        </DatePicker>
      </div>
    </>
  );
};

DateTimePicker.defaultProps = {
  format: dateTimeFormat,
  locale: enUS,
  className: 'my-react-component',
};

DateTimePicker.propTypes = {
  defaultValue: PropTypes.string,
  defaultCalendarValue: PropTypes.object,
  onChange: PropTypes.func,
  disabledDate: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  timePicker: PropTypes.bool,
  format: PropTypes.string,
  className: PropTypes.string,
  locale: PropTypes.object,
};
export default DateTimePicker;
