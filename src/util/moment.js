import moment from 'moment';

export const dateTimeFormat = 'MM/DD/YYYY, HH:mm',
  dateFormat = 'MM/DD/YYYY',
  dateTimeFormat_AM_PM = 'MM/DD/YYYY, h:mm a',
  currentDate = (format) => moment().format(format),
  displayDateTime = (date) => {
    return date ? moment(date).format('MM/DD/YYYY, HH:mm:ss') : '-';
  },
  // displayDateAndTime = (date) => {
  //   return date ? moment(date).format(dateTimeFormat) : '-';
  // },
  // displayDateTime_AM_PM = (date) => {
  //   return date ? moment(date).format('MM/DD/YYYY, h:mm A') : '-';
  // },
  // displayCustomDateFormat = (date) => {
  //   return date ? moment(date).format('Do MMMM, YYYY | HH:mm a') : '-';
  // },
  displayDate = (date, format) => {
    return date ? moment(date, format).format('MM/DD/YYYY') : '-';
  },
  displayDateByFormat = (date, format) => {
    return date ? moment(date).format(format) : '-';
  },
  displayTime = (date, format) => {
    return date ? moment(date, format).format('HH:mm') : '-';
  },
  displyFromNow = (date) => {
    return date ? moment(date).fromNow() : '-';
  },
  getDays = (date) => {
    return date ? moment().diff(date, 'days') + ' days ago' : null;
  },
  displayDOB = (date) => {
    if (!date) return '-';
    const age = moment().diff(moment(date), 'years');
    return `${moment(date).format('MM/DD/YYYY')} (${age} Years)`;
  },
  DobValidationForAdult = (current) => {
    return current && current > moment().subtract(18, 'years');
  },
  displayDateBySubtractDays = (date, days) => {
    if (!date || typeof days === 'undefined') return '-';
    return moment(date).subtract(days, 'days').format('MM/DD/YYYY');
  },
  getAgeByDOB = (date, format) => {
    return moment().diff(date, 'years');
  },
  disabledDateAfterToday = (current) => {
    return current && current > moment().endOf('day');
  },
  setTimeToZero = (date) => {
    return moment(date)
      .utcOffset(0)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toISOString();
  },
  getTimeDuration = (endDate, startDate) => {
    let diff = moment(endDate).diff(moment(startDate));
    let duration = moment.duration(diff); //return obj
    let hour = duration.get('hours');
    let min = duration.get('minutes');
    let sec = duration.get('seconds');
    let str = min + ' min ' + sec + ' sec';
    if (hour) str = hour + ' hr ' + str;
    return str;
  },
  getMomentDifference = (endDate, startDate, diffBy) => {
    return moment(endDate).diff(moment(startDate), diffBy);
  },
  disabledHours = (selectedDate) => {
    let hours = [],
      disabledHrs = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    if (moment(selectedDate).format(dateFormat) === moment().format(dateFormat))
      disabledHrs = hours.filter((x) => x < moment().hour());
    return disabledHrs;
  },
  disabledMinutes = (selectedDate) => {
    let minutes = [],
      disabledMin = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(i);
    }
    if (
      moment(selectedDate).format(dateFormat) === moment().format(dateFormat) &&
      moment(selectedDate).hour() === moment().hour()
    )
      disabledMin = minutes.filter((x) => x <= moment().minute());
    return disabledMin;
  },
  setMomentObj = (date) => {
    return moment(date)
  }
