export const CELL_NUMS = 42;
export const ARROW_WIDTH = 9;

export const getMonthNames = () => [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonthArabicNames = () => [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'اغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const findDaysInMonth = (month, year) => {
  if (
    month === 'January' ||
    month === 'March' ||
    month === 'May' ||
    month === 'July' ||
    month === 'August' ||
    month === 'October' ||
    month === 'December'
  ) {
    return 31;
  }
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    return 31;
  } else if (
    month === 'April' ||
    month === 'June' ||
    month === 'September' ||
    month === 'November'
  ) {
    return 30;
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  } else if ((year - 2016) % 4 !== 0) {
    return 28;
  }
  return 29;
};

export const checkYYYYMMDD = val => {
  const arr = val.split('-');
  if (arr.length === 3) {
    if (!Number.isNaN(+arr[0])) {
      if (+arr[1] >= 1 && +arr[1] <= 12) {
        const daysInMonth = findDaysInMonth(+arr[1], +arr[0]);
        if (+arr[2] >= 1 && +arr[2] <= daysInMonth) return true;
      }
    }
  }
  return false;
};

export const checkMMDDYYYY = val => {
  const arr = val.split('/');
  if (arr.length === 3) {
    if (!Number.isNaN(+arr[2])) {
      if (+arr[0] >= 1 && +arr[0] <= 12) {
        const daysInMonth = findDaysInMonth(+arr[0], +arr[2]);
        if (+arr[1] >= 1 && +arr[1] <= daysInMonth) return true;
      }
    }
  }
  return false;
};

export const setDateFormat = dateArr => {
  const dateArrLen = dateArr.length;
  let dateFormat = 'mm/dd/yyyy';
  let sumYYYYMMDD = 0;
  for (let i = 0; i < dateArrLen; i += 1) {
    if (dateArr[i] === '' || checkYYYYMMDD(dateArr[i])) sumYYYYMMDD += 1;
  }
  if (sumYYYYMMDD === dateArrLen) {
    dateFormat = 'yyyy-mm-dd';
  }
  return dateFormat;
};

export const toIndiaDigits = number => {
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.replace(/[0-9]/g, w => id[+w]);
};

export const compareDate = (startDate, endDate) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const startYear = startDateObj.getFullYear();
  const startMonth = startDateObj.getMonth();
  const startDateNum = startDateObj.getDate();
  const startTime = startYear * 365 + startMonth * 30 + startDateNum;
  const endYear = endDateObj.getFullYear();
  const endMonth = endDateObj.getMonth();
  const endDateNum = endDateObj.getDate();
  const endTime = endYear * 365 + endMonth * 30 + endDateNum;
  if (startTime > endTime) return false;
  return true;
};

export const transformMMDDYYYYtoYYYYMMDD = mmddyyyy => {
  const arr = mmddyyyy.split('/');
  return arr[2] + '-' + arr[0] + '-' + arr[1]; // eslint-disable-line
};

export const getIconColor = isDisabled => {
  if (isDisabled) {
    return '#e0e0e0';
  }
  return '#484848';
};

export const WEEK_START_DAY = {
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
};

export const createDayStyles = obj => {
  const { val, now, type, date, startDate, endDate, isRTL } = obj;
  const arr = val.split('-');
  const startDateObj = startDate !== '' ? new Date(startDate) : '';
  const endDateObj = startDate !== '' ? new Date(endDate) : '';
  let classDiv = '';
  if (type === 'single') {
    if (val === date) {
      classDiv += ' calendar-one-date-v2 ';
    }
  } else if (startDate !== '') {
    const valDate = new Date(val);
    if (val === startDate && val === endDate) {
      classDiv += ' calendar-one-date-v2 ';
    } else if (val === startDate) {
      classDiv += isRTL ? ' calendar-start-date-arabic-v2 ' : ' calendar-start-date-v2 ';
    } else if (endDate !== '') {
      if (valDate > startDateObj && valDate < endDateObj) {
        classDiv += ' calendar-diapason-date-v2 ';
      } else if (val === endDate) {
        classDiv += isRTL ? ' calendar-end-date-arabic-v2 ' : ' calendar-end-date-v2 ';
      }
    }
  }
  const todayClass =
    +arr[0] === +now.getFullYear() && +arr[1] === now.getMonth() + 1 && +arr[2] === +now.getDate()
      ? 'calendar-today-v2'
      : '';
  classDiv += todayClass;
  // if(isRTL&&todayClass==='') classDiv+='calendar-today-v2'
  return classDiv;
};

export const transformYYYYMMDDtoMMDDYYYY = (yyyymmdd, isRTL) => {
  const arr = yyyymmdd.split('-');
  if(!isRTL || isRTL===undefined) return arr[1] + '/' + arr[2] + '/' + arr[0]; // eslint-disable-line
  return `${toIndiaDigits(arr[2])} - ${toIndiaDigits(arr[1])} - ${toIndiaDigits(arr[0])}`;
};

export const transformDate = (date, dateFormat) => {
  switch (dateFormat) {
    case 'mm/dd/yyyy':
      if (checkMMDDYYYY(date)) return date;
      if (checkYYYYMMDD(date)) return transformYYYYMMDDtoMMDDYYYY(date);
      break;
    case 'yyyy-mm-dd':
      if (checkYYYYMMDD(date)) return date;
      if (checkMMDDYYYY(date)) return transformMMDDYYYYtoYYYYMMDD(date);
      break;
    default:
      return false;
  }
};

export const convertIsoTOMMDDYYYY = date => {
  if (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  return '';
};
