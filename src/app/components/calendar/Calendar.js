import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { 
  Container,
  MonthsWrapper,
  YearNameContainer,
  YearNameWrapper,
} from './Calendar.style';

import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import Icons from '../Icons';
import Text from '../text/Text';
import withDisplayName from '../WithDisplayName';
import {
  getMonthArabicNames,
  getMonthNames,
  findDaysInMonth,
  checkMMDDYYYY,
  checkYYYYMMDD,
  setDateFormat,
  compareDate,
  toIndiaDigits,
  transformMMDDYYYYtoYYYYMMDD,
  getIconColor,
  CELL_NUMS,
  ARROW_WIDTH,
  createDayStyles,
  transformYYYYMMDDtoMMDDYYYY,
  transformDate,
  convertIsoTOMMDDYYYY,
  WEEK_START_DAY,
} from './Calendar.helper';
import './Calendar.css';

/** Note
 * type='single'
 * onChange output format => {date: 'mm/dd/yyyy'}
 * date input format "yyyy-mm-dd"
 *
 * type='week'
 * onChange output format => {startDate: 'mm/dd/yyyy', endDate: 'mm/dd/yyyy'}
 * startDate / endDate input format "yyyy-mm-dd"
 *
 * range selection: if "type" not specified
 * onChange output format => {startDate: 'mm/dd/yyyy', endDate: 'mm/dd/yyyy'}
 * startDate / endDate input format "yyyy-mm-dd"
 *
 * Doesn't support week selection
 */

const CALENDAR_VIEWS = {
  YEARS: 0,
  MONTHS: 1,
  DAYS: 2,
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getStartState(this.props),
      viewIndex: CALENDAR_VIEWS.DAYS,

    };
  }

  /**
   * Change state, if props change
   * @param {string} this.props.minDate
   * @param {string} nextProps.minDate
   * @param {string} this.props.maxDate
   * @param {string} nextProps.maxDate
   * @param {string} this.props.type
   * @param {string} this.props.date
   * @param {string} this.props.startDate
   * @param {string} nextProps.startDate
   * @param {string} this.props.endDate
   * @param {string} nextProps.endDate
   */
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const arr = [];
    if (this.props.minDate !== nextProps.minDate)
      arr.push({ key: 'minDate', val: nextProps.minDate });
    if (this.props.maxDate !== nextProps.maxDate)
      arr.push({ key: 'maxDate', val: nextProps.maxDate });
    if (this.props.type === 'single') {
      if (this.props.date !== nextProps.date) arr.push({ key: 'date', val: nextProps.date });
    } else {
      if (this.props.startDate !== nextProps.startDate)
        arr.push({ key: 'startDate', val: nextProps.startDate });
      if (this.props.endDate !== nextProps.endDate)
        arr.push({ key: 'endDate', val: nextProps.endDate });
    }
    const arrLength = arr.length;
    if (arrLength > 0) {
      const stateObj = {};
      for (let i = 0; i < arrLength; i += 1) {
        const { key } = arr[i];
        let { val } = arr[i];
        if (checkMMDDYYYY(val)) {
          val = transformMMDDYYYYtoYYYYMMDD(val);
        }
        if (checkYYYYMMDD(val) || val === '') {
          stateObj[key] = val;
        }
      }
      this.setState(stateObj);
    }
  }

  /**
   * event onClick Right Arrow
   */
  onClickRightArrowCalendar = () => {
    const { currentMonthNum } = this.state;
    let year = +this.state.currentYear;
    const maxYear = new Date(this.props.maxDate).getFullYear();
    let month = +currentMonthNum + 1;

    if (currentMonthNum === 12) {
      month = 1;
      year += 1;
    }

    this.setState({
      currentMonthNum: +month,
      currentMonthName: this.props.isRTL
        ? getMonthArabicNames()[month - 1]
        : getMonthNames()[month - 1],
      currentYear: +year,
      disableNextMonthButton: year === maxYear && month === 12,
      disablePreviousMonthButton: false,
    });
  };

  /**
   * event onClick Left Arrow
   */
  onClickLeftArrowCalendar = () => {
    const { currentMonthNum } = this.state;
    let year = +this.state.currentYear;
    const minYear = new Date(this.props.minDate).getFullYear();
    let month = +currentMonthNum - 1;
    if (currentMonthNum === 1) {
      month = 12;
      year -= 1;
    }
    this.setState({
      currentMonthNum: +month,
      currentMonthName: this.props.isRTL
        ? getMonthArabicNames()[month - 1]
        : getMonthNames()[month - 1],
      currentYear: +year,
      disableNextMonthButton: false,
      disablePreviousMonthButton: year === minYear && month === 1,
    });
  };

  /**
   * event onClick Calendar Body, check id cell
   * @param {event} e
   */
  onClickCalendar = e => {
    const fullId = e.target.id;
    const id = fullId.substr(this.props.id.length); // date YYYY-MM-DD
    if (checkYYYYMMDD(id)) {
      const { dateFormat, err, minDate, maxDate } = this.state;
      if (this.props.type === 'single') {
        if (compareDate(minDate, id) && compareDate(id, maxDate)) {
          const date = id;
          this.setState({
            date,
          });
          const dateOut = date === '' ? '' : transformDate(date, dateFormat);
          if (this.props.onChange) {
            this.props.onChange({ date: dateOut, err });
          }
        } else if (!compareDate(minDate, id)) {
          this.switchErrorPopUp(
            this.props.isRTL
              ? this.state.errMessageLessThanMinDateArabic.concat(
                transformYYYYMMDDtoMMDDYYYY(this.state.minDate, this.props.isRTL), // eslint-disable-line
              ) // eslint-disable-line
              : this.state.errMassageLessThenMinDate.concat(
                transformYYYYMMDDtoMMDDYYYY(this.state.minDate), // eslint-disable-line
              ), // eslint-disable-line
          );
        } else if (!compareDate(id, maxDate)) {
          this.switchErrorPopUp(
            this.props.isRTL
              ? this.state.errMessageMorethanMaxDateArabic.concat(
                  transformYYYYMMDDtoMMDDYYYY(this.state.maxDate, this.props.isRTL), // eslint-disable-line
                ) // eslint-disable-line
              : this.state.errMassageMoreThenMxaDate.concat(
                  transformYYYYMMDDtoMMDDYYYY(this.state.maxDate), // eslint-disable-line
                ), // eslint-disable-line
          );
        }
      } else if (this.props.type === 'week') {
        if (compareDate(minDate, id) && compareDate(id, maxDate)) {
          const date = id;
          this.setState({
            date,
          });
          const dateOut = date === '' ? '' : transformDate(date, dateFormat); // ex: dateOut 2022-11-15
          const curr = new Date(dateOut); // get current date
          let first;
          let last;
          if (this.props.weekStartDay === WEEK_START_DAY.MONDAY) {
            first = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
            last = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
          } else if (this.props.weekStartDay === WEEK_START_DAY.SUNDAY) {
            first = new Date(curr.setDate(curr.getDate() - curr.getDay()));
            last = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
          } else {
            first = new Date(curr.setDate(curr.getDate() - curr.getDay() - 1));
            last = new Date(curr.setDate(curr.getDate() - curr.getDay() + 12));
          }
          const firstday = convertIsoTOMMDDYYYY(first);
          const lastday = convertIsoTOMMDDYYYY(last);

          if (this.props.onChange) {
            this.props.onChange({ startDate: firstday, endDate: lastday, err });
          }
        } else if (!compareDate(minDate, id)) {
          this.switchErrorPopUp(this.state.errMassageLessThenMinDate.concat(this.state.minDate));
        } else if (!compareDate(id, maxDate)) {
          this.switchErrorPopUp(this.state.errMassageMoreThenMxaDate.concat(this.state.maxDate));
        }
      } else {
        let { startDate, endDate } = this.state;
        if (endDate === '') {
          if (startDate === '') {
            if (compareDate(minDate, id) && compareDate(id, maxDate)) {
              startDate = id;
              this.setState({
                startDate,
              });
              const dateOut = !startDate ? '' : transformDate(startDate, dateFormat);
              if (this.props.onChange) {
                this.props.onChange({ startDate: dateOut, err });
              }
            }
          } else if (compareDate(startDate, id) && compareDate(id, maxDate)) {
            endDate = id;
            this.setState({
              endDate,
            });
            const startDateOut = startDate === '' ? '' : transformDate(startDate, dateFormat);
            const endDateOut = endDate === '' ? '' : transformDate(endDate, dateFormat);
            if (this.props.onChange) {
              this.props.onChange({ startDate: startDateOut, endDate: endDateOut, err });
            }
          } else if (compareDate(minDate, id) && compareDate(id, startDate)) {
            endDate = startDate;
            startDate = id;
            this.setState({
              startDate,
              endDate,
            });
            const startDateOut = startDate === '' ? '' : transformDate(startDate, dateFormat);
            const endDateOut = endDate === '' ? '' : transformDate(endDate, dateFormat);
            if (this.props.onChange) {
              this.props.onChange({ startDate: startDateOut, endDate: endDateOut, err });
            }
          } else if (!compareDate(minDate, id)) {
            this.switchErrorPopUp(this.state.errMassageLessThenMinDate.concat(this.state.minDate));
          } else if (!compareDate(id, maxDate)) {
            this.switchErrorPopUp(this.state.errMassageMoreThenMxaDate.concat(this.state.maxDate));
          }
        } else if (startDate !== '') {
          startDate = '';
          endDate = '';
          this.setState({
            startDate,
            endDate,
          });
          if (this.props.onChange) {
            this.props.onChange({ startDate: '', endDate: '', err });
          }
        }
      }
    }
  };

  /**
   * event onClick ErrorPopUp - for close
   */
  onClickErrorPopUp = () => {
    this.setState({
      showErrorPopUp: false,
      errPopUp: '',
    });
  };

  /**
   * Change Year
   * @param {event} e
   */
  onChangeTitleYear = year => {
    const currentYear = year;
    const minYear = new Date(this.state.minDate).getFullYear();
    const maxYear = new Date(this.state.maxDate).getFullYear();
    const checkTitleYear = +currentYear >= +minYear && +currentYear <= +maxYear;

    this.setState({
      currentYear: +currentYear,
      checkTitleYear,
      disableNextMonthButton: currentYear === maxYear && this.state.currentMonthNum === 12,
      disablePreviousMonthButton: currentYear === minYear && this.state.currentMonthNum === 1,
    });
  };

  /**
   * get Start State
   * @return {object} state
   */
  getStartState = () => {
    const minDateDefault = '01/01/1900';
    const maxDateDefault = '12/31/2099';
    const now = new Date();
    const err = [];
    const monthNames = this.props.isRTL ? getMonthArabicNames() : getMonthNames();
    const monthNum = now.getMonth();
    const monthName = monthNames[now.getMonth()];
    const year = now.getFullYear();
    let minDate = this.props.minDate ? this.props.minDate : minDateDefault;
    let maxDate = this.props.maxDate ? this.props.maxDate : maxDateDefault;
    let { dateFormat, date, startDate, endDate } = this.props;
    const dateArr = [minDate, maxDate];
    if (this.props.type === 'single') {
      dateArr.push(date);
    } else {
      dateArr.push(startDate);
      dateArr.push(endDate);
    }
    if (dateFormat === '') {
      dateFormat = setDateFormat(dateArr);
    }
    if (minDate !== '' && !checkYYYYMMDD(minDate)) {
      if (checkMMDDYYYY(minDate)) {
        minDate = transformMMDDYYYYtoYYYYMMDD(minDate);
      } else {
        err.push('minDate format != yyyy-mm-dd or mm/dd/yyyy');
        minDate = minDateDefault;
      }
    }
    if (maxDate !== '' && !checkYYYYMMDD(maxDate)) {
      if (checkMMDDYYYY(maxDate)) {
        maxDate = transformMMDDYYYYtoYYYYMMDD(maxDate);
      } else {
        err.push('maxDate format != yyyy-mm-dd or mm/dd/yyyy');
        maxDate = maxDateDefault;
      }
    }
    if (minDate !== '' && maxDate !== '' && !compareDate(minDate, maxDate)) {
      maxDate = maxDateDefault >= minDate ? minDateDefault : minDate;
    }
    if (this.props.type === 'single') {
      if (date !== '' && !checkYYYYMMDD(date)) {
        if (checkMMDDYYYY(date)) {
          date = transformMMDDYYYYtoYYYYMMDD(date);
        } else {
          err.push('date format != yyyy-mm-dd or mm/dd/yyyy');
          startDate = '';
        }
      }
    } else {
      if (startDate !== '' && !checkYYYYMMDD(startDate)) {
        if (checkMMDDYYYY(startDate)) {
          startDate = transformMMDDYYYYtoYYYYMMDD(startDate);
        } else {
          err.push('startDate format != yyyy-mm-dd or mm/dd/yyyy');
          startDate = '';
        }
      }
      if (startDate === '') endDate = '';
      if (endDate !== '' && !checkYYYYMMDD(endDate)) {
        if (checkMMDDYYYY(endDate)) {
          endDate = transformMMDDYYYYtoYYYYMMDD(endDate);
        } else {
          err.push('endDate format != yyyy-mm-dd or mm/dd/yyyy');
          endDate = '';
        }
      }
      if (startDate !== '' && endDate !== '' && !compareDate(startDate, endDate)) {
        startDate = '';
        endDate = '';
      }
    }

    return {
      now,
      currentMonthNum: monthNum + 1,
      currentMonthName: monthName,
      currentYear: year,
      minDate,
      maxDate,
      date,
      startDate,
      endDate,
      dateFormat,
      err,
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekDaysArabic: ['سبت', 'جمعة', 'خميس', 'أربعاء', 'ثلاثاء', 'إثنين', 'أحد'],
      showErrorPopUp: false,
      errPopUp: '',
      errMassageLessThenMinDate: 'Please select a date starting from ',
      errMessageLessThanMinDateArabic: '  الرجاء اختيار يوم بداية من ',
      errMassageMoreThenMxaDate: 'Please select a date before ',
      errMessageMorethanMaxDateArabic: ' الرجاء اختيار يوم قبل ',
      checkTitleYear: true,
      disableNextMonthButton: false,
      disablePreviousMonthButton: false,
    };
  };

  /**
   * switch on and switch off Error PopUp
   * @param {string} err
   */
  switchErrorPopUp = err => {
    this.setState({
      showErrorPopUp: true,
      errPopUp: err,
    });
    setTimeout(() => {
      this.setState({
        showErrorPopUp: false,
        errPopUp: '',
      });
    }, 6000);
  };

  /**
   * Generate a list of years descending from current year to 1900
   * @returns {array} yearsOptions
   */
  generateYears = () => {
    const startYear = new Date(this.props.minDate).getFullYear();
    const currentYear = new Date(this.props.maxDate).getFullYear();
    const yearsOptions = [];

    for (let counter = currentYear; counter >= startYear; counter -= 1) {
      const year = {
        data: {
          placeholder: this.props.isRTL ? toIndiaDigits(`${counter}`) : `${counter}`,
          value: counter,
        },
        component: <Text>{this.props.isRTL ? toIndiaDigits(`${counter}`) : `${counter}`}</Text>,
      };
      yearsOptions.push(year);
    }
    return yearsOptions;
  };

  renderYears = () => {
    const years = [];
    for(let i = new Date().getFullYear() - 5; i < new Date().getFullYear() + 7; i++) {
        years.push(
            <YearNameContainer isSelected={this.state.currentYear === i} onClick={() => this.onYearInYearsViewClick(i)}>
                    <YearNameWrapper>
                        <p style={{ margin: '0px' }}>{this.props.isRTL ? toIndiaDigits(`${i}`) : i}</p>
                    </YearNameWrapper>
            </YearNameContainer>
        )
      }

    return(
    <Container>
        <MonthsWrapper>
            {years}
        </MonthsWrapper>
    </Container>
    )
  }

  onYearInYearsViewClick = year => {
    this.onChangeTitleYear(year);
    this.setState({ viewIndex: CALENDAR_VIEWS.DAYS });
  }

  render() {
    const {
      now,
      date,
      startDate,
      endDate,
      currentMonthNum,
      currentMonthName,
      currentYear,
      weekDays,
      errPopUp,
      showErrorPopUp,
      checkTitleYear,
      weekDaysArabic,
      viewIndex,
    } = this.state;
    const { type, isRTL } = this.props;
    const prevMonthAr = [];
    const thisMonthAr = [];
    const nextMonthAr = [];
    const monthDays = findDaysInMonth(currentMonthNum, currentYear);
    const thisMonthDate = new Date(`${currentYear}-${currentMonthNum}`);
    const thisMonth1Day = thisMonthDate.getDay();
    for (let i = 1; i <= monthDays; i += 1) {
      thisMonthAr.push(`${currentYear}-${currentMonthNum}-${i}`);
    }
    let prevMonthNum = currentMonthNum - 1;
    let prevYear = currentYear;
    if (currentMonthNum === 1) {
      prevYear = currentYear - 1;
      prevMonthNum = 12;
    }
    const prevMonthDays = findDaysInMonth(prevMonthNum, prevYear);
    const prevMonthShowDays = thisMonth1Day;
    for (let i = prevMonthDays - prevMonthShowDays + 1; i <= prevMonthDays; i += 1) {
      prevMonthAr.push(`${prevYear}-${prevMonthNum}-${i}`);
    }
    const nextMonthNum = (currentMonthNum % 12) + 1;
    const nextYear = currentMonthNum === 12 ? currentYear + 1 : currentYear;
    const nextMonthShowDays = CELL_NUMS - prevMonthShowDays - monthDays;
    for (let i = 1; i <= nextMonthShowDays; i += 1) {
      nextMonthAr.push(`${nextYear}-${nextMonthNum}-${i}`);
    }
    let titleYearClass = 'calendar-header-title-year-input-v2 ';
    if (!checkTitleYear) {
      titleYearClass += ' year-v2--dange';
    }
    return (
      <div>
        {CALENDAR_VIEWS.DAYS === viewIndex && (
        <div className="calendar-wrapper-v2">
          <div className="calendar-header-v2">
            <div
              className={ClassNames('calendar-arrow-v2', {
                'calendar-arrow-v2--disable': this.state.disablePreviousMonthButton,
                'calendar-arrow-v2--rotated': isRTL,
              })}
              onClick={this.onClickLeftArrowCalendar}
              onKeyDown={() => {}}
            >
              <Icon
                icon={new IconsStore(Icons).getIcon('arrow_left')}
                width={ARROW_WIDTH}
                color={getIconColor(this.state.disablePreviousMonthButton)}
              />
            </div>
            <div className="calendar-header-title-v2">
              <div className="calendar-header-title-month-v2">{currentMonthName}</div>
              <div className="calendar-header-title-year-v2" onClick={() => this.setState({ viewIndex: CALENDAR_VIEWS.YEARS })}>{this.props.isRTL ? toIndiaDigits(`${currentYear}`) : currentYear}</div>
            </div>
            <div
              className={ClassNames('calendar-arrow-v2', {
                'calendar-arrow-v2--disable': this.state.disableNextMonthButton,
                'calendar-arrow-v2--rotated': isRTL,
              })}
              onClick={this.onClickRightArrowCalendar}
              onKeyDown={() => {}}
            >
              <Icon
                icon={new IconsStore(Icons).getIcon('arrow_right')}
                width={ARROW_WIDTH}
                color={getIconColor(this.state.disableNextMonthButton)}
              />
            </div>
          </div>
          <div className="calendar-body-v2" onClick={this.onClickCalendar} onKeyDown={() => {}}>
            <div
              className={
                showErrorPopUp ? 'calendar-error-popup-show-v2' : 'calendar-error-popup-hide-v2'
              }
              onClick={this.onClickErrorPopUp}
              onKeyDown={() => {}}
            >
              {errPopUp}
            </div>
            <div className="calendar-week-days-v2">
              {isRTL ? (
                <div className="week-names-v2">
                  {weekDaysArabic.map(day => (
                    <div key={day} className="calendar-weekday-v2 calendar-weekday-arabic-v2">
                      {day}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="week-names-v2">
                  {weekDays.map(day => (
                    <div key={day} className="calendar-weekday-v2">
                      {day}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {isRTL ? (
              <div className="calendar-days-arabic-v2">
                {prevMonthAr.map(val => {
                  const arr = val.split('-');
                  let classDiv = 'calendar-day-arabic-v2 calendar-opacity-50-v2 ';
                  classDiv += createDayStyles({
                    val,
                    now,
                    type,
                    date,
                    startDate,
                    endDate,
                    isRTL,
                  });
                  return (
                    <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                      {toIndiaDigits(arr[2])}
                    </div>
                  );
                })}
                {thisMonthAr.map(val => {
                  const arr = val.split('-');
                  let classDiv = 'calendar-day-arabic-v2 ';
                  classDiv += createDayStyles({
                    val,
                    now,
                    type,
                    date,
                    startDate,
                    endDate,
                    isRTL,
                  });
                  return (
                    <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                      {toIndiaDigits(arr[2])}
                    </div>
                  );
                })}
                {nextMonthAr.map(val => {
                  const arr = val.split('-');
                  let classDiv = 'calendar-day-arabic-v2 calendar-opacity-50-v2 ';
                  classDiv += createDayStyles({
                    val,
                    now,
                    type,
                    date,
                    startDate,
                    endDate,
                    isRTL,
                  });
                  return (
                    <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                      {toIndiaDigits(arr[2])}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="calendar-days-v2">
                {prevMonthAr.map(val => {
                  const arr = val.split('-');
                  let classDiv = 'calendar-day-v2 calendar-opacity-50-v2 ';
                  classDiv += createDayStyles({
                    val,
                    now,
                    type,
                    date,
                    startDate,
                    endDate,
                  });
                  return (
                    <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                      {arr[2]}
                    </div>
                  );
                })}
                {thisMonthAr.map(val => {
                  const arr = val.split('-');
                  let classDiv = 'calendar-day-v2 ';
                  classDiv += createDayStyles({
                    val,
                    now,
                    type,
                    date,
                    startDate,
                    endDate,
                  });
                  return (
                    <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                      {arr[2]}
                    </div>
                  );
                })}
                {nextMonthAr.map(val => {
                  const arr = val.split('-');
                  let classDiv = 'calendar-day-v2 calendar-opacity-50-v2 ';
                  classDiv += createDayStyles({
                    val,
                    now,
                    type,
                    date,
                    startDate,
                    endDate,
                  });
                  return (
                    <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                      {arr[2]}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        )}
        {CALENDAR_VIEWS.YEARS === viewIndex && this.renderYears()}
      </div>
    );
  }
}

Calendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  date: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  dateFormat: PropTypes.oneOf(['yyyy-mm-dd', 'mm/dd/yyyy', '']),
  type: PropTypes.oneOf(['range', 'single']),
  id: PropTypes.string,
  isRTL: PropTypes.bool,
};

Calendar.defaultProps = {
  minDate: '2015-01-01',
  maxDate: `${new Date().getFullYear() + 5}-12-31`,
  startDate: '', // for type: range
  endDate: '', // for type: range
  date: '', // for type: single
  dateFormat: '',
  type: 'range',
  id: '', // add string id to calendar-cell-id
  isRTL: false,
};

export default withDisplayName(Calendar, 'Calendar');
