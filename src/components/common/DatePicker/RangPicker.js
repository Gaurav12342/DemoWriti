import React, { useState } from 'react';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import PropTypes from 'prop-types';

const RangPicker = (props) => {
  const [hoverValue, setHoverValue] = useState('');

  const formatStr = props.format;
  const now = moment();

  const timePickerElement = (
    <TimePickerPanel
      defaultValue={[
        moment('00:00:00', 'HH:mm:ss'),
        moment('23:59:59', 'HH:mm:ss'),
      ]}
    />
  );

  const newArray = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledTime = (time, type) => {
    if (type === 'start') {
      return {
        disabledHours() {
          const hours = newArray(0, 60);
          hours.splice(20, 4);
          return hours;
        },
        disabledMinutes(h) {
          if (h === 20) {
            return newArray(0, 31);
          } else if (h === 23) {
            return newArray(30, 60);
          }
          return [];
        },
        disabledSeconds() {
          return [55, 56];
        },
      };
    }
    return {
      disabledHours() {
        const hours = newArray(0, 60);
        hours.splice(2, 6);
        return hours;
      },
      disabledMinutes(h) {
        if (h === 20) {
          return newArray(0, 31);
        } else if (h === 23) {
          return newArray(30, 60);
        }
        return [];
      },
      disabledSeconds() {
        return [55, 56];
      },
    };
  };

  const format = (v) => {
    return v ? v.format(formatStr) : '';
  };

  const isValidRange = (v) => {
    return v && v[0] && v[1];
  };

  const onHoverChange = (hoverValue) => {
    setHoverValue(hoverValue);
  };
  const calendar = (
    <RangeCalendar
      className="my-react-component"
      hoverValue={hoverValue}
      onHoverChange={onHoverChange}
      showWeekNumber={false}
      showClear={true}
      dateInputPlaceholder={['start', 'end']}
      defaultValue={[now, now.clone().add(1, 'months')]}
      locale={props.locale}
      disabledTime={disabledTime}
      timePicker={props.timePicker ? timePickerElement : null}
    />
  );
  return (
    <>
      <Picker {...props} calendar={calendar}>
        {({ value }) => {
          return (
            <div>
              <input
                placeholder={props.placeholder}
                style={{ width: 350 }}
                disabled={props.disabled}
                readOnly
                className="my-react-component"
                value={
                  (isValidRange(value) &&
                    `${format(value[0])} - ${format(value[1])}`) ||
                  ''
                }
              />
            </div>
          );
        }}
      </Picker>
    </>
  );
};

RangPicker.defaultProps = { timePicker: false, format: 'DD-MM-YYYY',locale:{enUS} };
RangPicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  timePicker: PropTypes.bool,
  format: PropTypes.string,
  className : PropTypes.string,
  locale: PropTypes.string,
  defaultValue: PropTypes.string
};
export default RangPicker;
