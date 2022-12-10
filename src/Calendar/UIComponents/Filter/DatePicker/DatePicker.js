/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewButton from '../../Button'
import Icon from '../../icon/Icon';
import IconsStore from '../../icon/IconsStore';

import Icons from '../../Icons';
import Calendar from '../../calendar/Calendar';
import './dropdowns.css';
import {
  extendTodayButton,
  DatePickerWrapper,
  PickerBtns,
  DateContainer,
  DateText,
  extendDateNavButton,
  ShowDesktop,
  ShowDevice,
} from './DatePicker.style';
import { convertIsoTOMMDDYYYY, WEEK_START_DAY } from './DatePicker.helper';

const DATE_PICKER_MODE = {
  SINGLE_PICK: 0,
  WEEK_PICK: 1,
};

const toIndiaDigits = number => {
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.replace(/[0-9]/g, w => id[+w]);
};

const DatePicker = ({ ...props }) => {
  const [isCalendarShown, toggleCalendarShown] = useState(false);
  const { onChange, startDate, endDate, language, datePickerMode, weekStartDay } = props;

  const setChangeForWeekStartAndLastDays = date => {
    let first;
    let last;
    switch (weekStartDay) {
      case WEEK_START_DAY.MONDAY:
        first = new Date(date.setDate(date.getDate() - date.getDay() + 1));
        last = new Date(date.setDate(date.getDate() - date.getDay() + 7));
        break;
      case WEEK_START_DAY.SATURDAY:
        first = new Date(date.setDate(date.getDate() - date.getDay() - 1));
        last = new Date(date.setDate(date.getDate() - date.getDay() + 12));
        break;
      case WEEK_START_DAY.SUNDAY:
        first = new Date(date.setDate(date.getDate() - date.getDay()));
        last = new Date(date.setDate(date.getDate() - date.getDay() + 6));
        break;
      default:
        break;
    }
    onChange({ startDate: convertIsoTOMMDDYYYY(first), endDate: convertIsoTOMMDDYYYY(last) });
  };

  const setToday = () => {
    if (onChange) {
      const today = new Date();
      if (datePickerMode === DATE_PICKER_MODE.SINGLE_PICK) {
        onChange({ startDate: convertIsoTOMMDDYYYY(today), endDate: convertIsoTOMMDDYYYY(today) });
      } else {
        setChangeForWeekStartAndLastDays(today);
      }
    }
  };

  useEffect(() => {
    setToday();
  }, [datePickerMode]);

  const setNextday = () => {
    if (datePickerMode === DATE_PICKER_MODE.SINGLE_PICK) {
      const nextDay = new Date(startDate);
      nextDay.setDate(new Date(startDate).getDate() + 1);
      onChange({
        startDate: convertIsoTOMMDDYYYY(nextDay),
        endDate: convertIsoTOMMDDYYYY(nextDay),
      });
    } else {
      const nextDay = new Date(startDate);
      nextDay.setDate(new Date(startDate).getDate() + 7);
      const first = new Date(nextDay.setDate(nextDay.getDate() - nextDay.getDay()));
      const last = new Date(nextDay.setDate(nextDay.getDate() - nextDay.getDay() + 6));
      onChange({ startDate: convertIsoTOMMDDYYYY(first), endDate: convertIsoTOMMDDYYYY(last) });
    }
  };
  const setPrevday = () => {
    if (datePickerMode === DATE_PICKER_MODE.SINGLE_PICK) {
      const prevDay = new Date(startDate);
      prevDay.setDate(new Date(startDate).getDate() - 1);
      onChange({
        startDate: convertIsoTOMMDDYYYY(prevDay),
        endDate: convertIsoTOMMDDYYYY(prevDay),
      });
    } else {
      const nextDay = new Date(startDate);
      nextDay.setDate(new Date(startDate).getDate() - 7);
      const first = new Date(nextDay.setDate(nextDay.getDate() - nextDay.getDay()));
      const last = new Date(nextDay.setDate(nextDay.getDate() - nextDay.getDay() + 6));
      onChange({ startDate: convertIsoTOMMDDYYYY(first), endDate: convertIsoTOMMDDYYYY(last) });
    }
  };

  const onDatePickerSelect = dateObj => {
    if (dateObj) {
      // ex: date format  m/d/yyyy
      // const date = String(dateObj.date).split('/');
      if (datePickerMode === DATE_PICKER_MODE.SINGLE_PICK) {
        onChange({ startDate: dateObj.date, endDate: dateObj.date });
      } else {
        onChange({ startDate: dateObj.startDate, endDate: dateObj.endDate });
      }
      toggleCalendarShown(false);
    }
  };

  const PickerDateFormatter = date => {
    if (date) {
      const datelist = String(date).split('/');
      return `${datelist[2]}-${datelist[0]}-${datelist[1]}`;
    }
    return '--';
  };

  const pickerHandler = event => {
    const myElementToCheckIfClicksAreInsideOf = document.querySelector('#date-picker-calendar');
    if (
      myElementToCheckIfClicksAreInsideOf &&
      !myElementToCheckIfClicksAreInsideOf.contains(event.target)
    ) {
      toggleCalendarShown(false);
    }
  };

  const addListener = () => {
    document.body.addEventListener('click', pickerHandler, true);
  };

  const removeListener = () => {
    document.body.removeEventListener('click', pickerHandler, true);
  };

  useEffect(() => {
    addListener();
    setToday();
    return () => {
      removeListener();
    };
  }, []);

  const dateString = () => {
    if (startDate && endDate) {
      if (startDate === endDate) {
        // selectedDate : m / d / y
        return new Date(startDate).toLocaleDateString(`${language}`, {
          weekday: 'long',
          month: 'short',
          day: '2-digit',
        });
      }
      return `${new Date(startDate).toLocaleDateString(`${language}`, {
        month: 'short',
        day: '2-digit',
      })} - ${new Date(endDate).toLocaleDateString(`${language}`, {
        month: 'short',
        day: '2-digit',
      })}`;
    }
    return '--';
  };

  let currentTimeBtn = '';
  if (datePickerMode === DATE_PICKER_MODE.SINGLE_PICK) {
    currentTimeBtn = language === 'en' ? 'Today' : 'اليوم';
  } else {
    currentTimeBtn = language === 'en' ? 'This week' : 'الأسبوع الحالى';
  }

  return (
    <div style={{ padding: '13px' }}>
      <DatePickerWrapper>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NewButton
            btnText={currentTimeBtn}
            onClick={() => {
              setToday();
            }}
            extendButtonStyle={extendTodayButton}
          />
          <PickerBtns>
            <NewButton
              btnText="<"
              onClick={() => {
                setPrevday();
              }}
              extendButtonStyle={extendDateNavButton}
            />
            <NewButton
              btnText=">"
              onClick={() => {
                setNextday();
              }}
              extendButtonStyle={extendDateNavButton}
            />
          </PickerBtns>
        </div>
        <div id="date-picker-calendar">
          <DateContainer
            onClick={() => toggleCalendarShown(!isCalendarShown)}
            isCalendarShown={isCalendarShown}
          >
            <DateText>{language === 'en' ? dateString() : toIndiaDigits(dateString())}</DateText>
            <Icon icon={new IconsStore(Icons).getIcon('downcarret')} width={11} />
          </DateContainer>
          <ShowDesktop>
          <div
            className={isCalendarShown ? 'calendar-dropDown-opened' : 'calendar-dropDown-close'}
            style={{ zIndex: '30', position: 'absolute' }}
            id="searchContainer-DateBtn-calendar"
          >
            <div style={{ top: '30%', position: 'relative' }} />
            <Calendar
              type={datePickerMode === DATE_PICKER_MODE.SINGLE_PICK ? 'single' : 'week'}
              date={PickerDateFormatter(startDate)}
              startDate={PickerDateFormatter(startDate)}
              endDate={PickerDateFormatter(endDate)}
              isArabic={language !== 'en'}
              onChange={onDatePickerSelect}
              weekStartDay={weekStartDay}
            />
          </div>
          </ShowDesktop>
          <ShowDevice>
          <div
            className={isCalendarShown ? 'calendar-dropDown-opened' : 'calendar-dropDown-close'}
            style={{ zIndex: '30' }}
            id="searchContainer-DateBtn-calendar"
          >
            <Calendar
              type={datePickerMode === DATE_PICKER_MODE.SINGLE_PICK ? 'single' : 'week'}
              date={PickerDateFormatter(startDate)}
              startDate={PickerDateFormatter(startDate)}
              endDate={PickerDateFormatter(endDate)}
              isArabic={language !== 'en'}
              onChange={onDatePickerSelect}
              weekStartDay={weekStartDay}
            />
          </div>
          </ShowDevice>
        </div>
      </DatePickerWrapper>
    </div>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func,
  selectedDate: PropTypes.string,
  language: PropTypes.string,
};

export default DatePicker;
