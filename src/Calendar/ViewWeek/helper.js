/* eslint-disable no-restricted-globals */
import React from 'react';
import Icon from '../UIComponents/icon/Icon';
import IconsStore from '../UIComponents/icon/IconsStore';
import Icons from '../UIComponents/Icons';
import {
  SlotDesc,
  SlotTitle,
  IconContainer,
  ExtendedToolTip,
  SlotTitleContainer,
  SlotDescContainer,
  SlotContentContainer,
} from '../Schedular.style';

export const daysNamesAbbrev = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fri', 'Sa'];
export const daysNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const monthsNames = [
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

export const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i += 1) {
    if (i < 12) {
      const hours24 = i > 9 ? i : `0${i}`;
      slots.push(`${hours24}:00:00`);
      slots.push(`${hours24}:30:00`);
    } else {
      const hours24 = i > 9 ? i : `0${i}`;
      slots.push(`${hours24}:00:00`);
      slots.push(`${hours24}:30:00`);
    }
  }
  return slots;
};

export const renderDataSlot = (columnSlot, extendSlotTitle, extendSlotDesc) => {
  const message = (
    <div>
      <div style={{ display: 'flex', marginBottom: '2px' }}>
        {columnSlot.titleIcon && (
          <IconContainer>
            <Icon
              className="icon"
              icon={new IconsStore(Icons).getIcon(columnSlot.titleIcon)}
              width={10}
              color="#484848"
            />
          </IconContainer>
        )}
        {columnSlot.title && (
          <SlotTitle style={{ color: '#ffff' }} extendSlotTitle={extendSlotTitle}>
            {columnSlot.title}
          </SlotTitle>
        )}
      </div>
      <div>
        <div style={{ display: 'flex', marginBottom: '2px' }}>
          {columnSlot.descAIcon && (
            <IconContainer>
              <Icon
                className="icon"
                icon={new IconsStore(Icons).getIcon(columnSlot.descAIcon)}
                width={10}
                color="#ffff"
              />
            </IconContainer>
          )}
          {columnSlot.descA && (
            <SlotDesc style={{ color: '#ffff' }} extendSlotDesc={extendSlotDesc}>
              {columnSlot.descA}
            </SlotDesc>
          )}
        </div>
        <div style={{ display: 'flex', marginBottom: '2px' }}>
          {columnSlot.descBIcon && (
            <IconContainer>
              <Icon
                className="icon"
                icon={new IconsStore(Icons).getIcon(columnSlot.descBIcon)}
                width={10}
                color="#ffff"
              />
            </IconContainer>
          )}
          {columnSlot.descB && (
            <SlotDesc style={{ color: '#ffff' }} extendSlotDesc={extendSlotDesc}>
              {columnSlot.descB}
            </SlotDesc>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <ExtendedToolTip message={message} showOnHover position="bottom" arrowPosition="bottom">
      <div>
        <div style={{ display: 'flex', marginBottom: '2px' }}>
          {columnSlot.titleIcon && (
            <IconContainer>
              <Icon
                className="icon"
                icon={new IconsStore(Icons).getIcon(columnSlot.titleIcon)}
                width={10}
                color="#484848"
              />
            </IconContainer>
          )}
          {columnSlot.title && (
            <SlotTitle extendSlotTitle={extendSlotTitle}>{columnSlot.title}</SlotTitle>
          )}
        </div>
        <div>
          <div style={{ display: 'flex', marginBottom: '2px' }}>
            {columnSlot.descAIcon && (
              <IconContainer>
                <Icon
                  className="icon"
                  icon={new IconsStore(Icons).getIcon(columnSlot.descAIcon)}
                  width={10}
                  color="#484848"
                />
              </IconContainer>
            )}
            {columnSlot.descA && (
              <SlotDesc extendSlotDesc={extendSlotDesc}>{columnSlot.descA}</SlotDesc>
            )}
          </div>
          <div style={{ display: 'flex', marginBottom: '2px' }}>
            {columnSlot.descBIcon && (
              <IconContainer>
                <Icon
                  className="icon"
                  icon={new IconsStore(Icons).getIcon(columnSlot.descBIcon)}
                  width={10}
                  color="#484848"
                />
              </IconContainer>
            )}
            {columnSlot.descB && (
              <SlotDesc extendSlotDesc={extendSlotDesc}>{columnSlot.descB}</SlotDesc>
            )}
          </div>
        </div>
      </div>
    </ExtendedToolTip>
  );
};

export const renderDataSlotMini = (columnSlot, extendSlotTitle, extendSlotDesc) => {
  const message = (
    <div>
      <div style={{ display: 'flex', marginBottom: '2px' }}>
        {columnSlot.titleIcon && (
          <IconContainer>
            <Icon
              className="icon"
              icon={new IconsStore(Icons).getIcon(columnSlot.titleIcon)}
              width={10}
              color="#484848"
            />
          </IconContainer>
        )}
        {columnSlot.title && (
          <SlotTitle style={{ color: '#ffff' }} extendSlotTitle={extendSlotTitle}>
            {columnSlot.title}
          </SlotTitle>
        )}
      </div>
      <div>
        <div style={{ display: 'flex', marginBottom: '2px' }}>
          {columnSlot.descAIcon && (
            <IconContainer>
              <Icon
                className="icon"
                icon={new IconsStore(Icons).getIcon(columnSlot.descAIcon)}
                width={10}
                color="#ffff"
              />
            </IconContainer>
          )}
          {columnSlot.descA && (
            <SlotDesc style={{ color: '#ffff' }} extendSlotDesc={extendSlotDesc}>
              {columnSlot.descA}
            </SlotDesc>
          )}
        </div>
        <div style={{ display: 'flex', marginBottom: '2px' }}>
          {columnSlot.descBIcon && (
            <IconContainer>
              <Icon
                className="icon"
                icon={new IconsStore(Icons).getIcon(columnSlot.descBIcon)}
                width={10}
                color="#ffff"
              />
            </IconContainer>
          )}
          {columnSlot.descB && (
            <SlotDesc style={{ color: '#ffff' }} extendSlotDesc={extendSlotDesc}>
              {columnSlot.descB}
            </SlotDesc>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <ExtendedToolTip message={message} showOnHover position="bottom" arrowPosition="bottom">
      <SlotContentContainer>
        <SlotTitleContainer>
          {columnSlot.title && (
            <SlotTitle extendSlotTitle={extendSlotTitle}>{columnSlot.title}</SlotTitle>
          )}
        </SlotTitleContainer>
        <SlotDescContainer>
          <SlotDesc style={{ lineHeight: '18px' }} extendSlotDesc={extendSlotDesc}>
            {`${columnSlot.descA}, ${columnSlot.descB}`}
          </SlotDesc>
        </SlotDescContainer>
      </SlotContentContainer>
    </ExtendedToolTip>
  );
};

const daysListSat = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const daysListSatAr = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه'];

const daysListSun = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysListSunAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه', 'السبت'];

const daysListMon = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysListMonAr = ['الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه', 'السبت', 'الأحد'];

export const WEEK_START_DAY = {
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
};

export const getLocalizedDaysSlots = (language, weekStartDay) => {
  if (language) {
    if (language === 'en') {
      switch (weekStartDay) {
        case WEEK_START_DAY.MONDAY:
          return daysListMon;
        case WEEK_START_DAY.SATURDAY:
          return daysListSat;
        case WEEK_START_DAY.SUNDAY:
          return daysListSun;
        default:
          break;
      }
    }
    switch (weekStartDay) {
      case WEEK_START_DAY.MONDAY:
        return daysListMonAr;
      case WEEK_START_DAY.SATURDAY:
        return daysListSatAr;
      case WEEK_START_DAY.SUNDAY:
        return daysListSunAr;
      default:
        break;
    }
  }
};

export const NUMBER_MONTHS = 12;

export const VIEWS = {
  YEAR: 0,
  MONTH: 1,
  WEEK: 2,
  DAY: 3,
};

export const data = {
  2021: {
    1: {
      1: [
        {
          id: 123,
          appointment: 'Test',
          from: '2021-01-01T03:00:00',
          to: '2021-01-01T04:30:00',
        },
      ],
    },
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {
      21: [
        {
          id: 987,
          appointment: 'Test',
        },
      ],
    },
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
  },
};

export const FixIsoFormat = dateTimeString => {
  if (dateTimeString && isNaN(new Date(dateTimeString))) {
    const date = dateTimeString.split('T')[0];
    const year = date.split('-')[0];
    let month = date.split('-')[1];
    let day = date.split('-')[2];

    if (day && String(day).length < 2) {
      day = `0${day}`;
    }
    if (month && String(month).length < 2) {
      month = `0${month}`;
    }
    return `${year}-${month}-${day}T${dateTimeString.split('T')[1]}`;
  }
  return dateTimeString;
};

export const roundUpNearest10 = num => Math.ceil(num / 10) * 10;
