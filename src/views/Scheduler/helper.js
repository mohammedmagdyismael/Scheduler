/* eslint-disable no-restricted-globals */
import React from 'react';
import Icon from 'app/components/icon/Icon';
import IconsStore from 'app/components/icon/IconsStore';
import Icons from 'app/components/Icons';
import {
  SlotTitleContainer,
  SlotDescContainer,
  SlotContentContainer,
  SlotDesc,
  SlotTitle,
  IconContainer,
  ExtendedToolTip,
} from './Schedular.style';
import { isRTLLanguage } from 'app/helper';

export const NUM_SHIFTS_TO_SHOW = 3;

export const NUMBER_MONTHS = 12;

export const SCHEDULAR_VIEWS = {
  DAY: 0,
  WEEK: 1,
};

export const VIEWS = {
  YEAR: 0,
  MONTH: 1,
  WEEK: 2,
  DAY: 3,
};

export const toIndiaDigits = number => {
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.replace(/[0-9]/g, w => id[+w]);
};

const hoursSlotsList = [
  '12:00 am',
  '01:00 am',
  '02:00 am',
  '03:00 am',
  '04:00 am',
  '05:00 am',
  '06:00 am',
  '07:00 am',
  '08:00 am',
  '09:00 am',
  '10:00 am',
  '11:00 am',
  '12:00 pm',
  '01:00 pm',
  '02:00 pm',
  '03:00 pm',
  '04:00 pm',
  '05:00 pm',
  '06:00 pm',
  '07:00 pm',
  '08:00 pm',
  '09:00 pm',
  '10:00 pm',
  '11:00 pm',
];

const hoursSlotsListLocal = localization => [
  `12:00 ${localization.am}`,
  `01:00 ${localization.am}`,
  `02:00 ${localization.am}`,
  `03:00 ${localization.am}`,
  `04:00 ${localization.am}`,
  `05:00 ${localization.am}`,
  `06:00 ${localization.am}`,
  `07:00 ${localization.am}`,
  `08:00 ${localization.am}`,
  `09:00 ${localization.am}`,
  `10:00 ${localization.am}`,
  `11:00 ${localization.am}`,
  `12:00 ${localization.pm}`,
  `01:00 ${localization.pm}`,
  `02:00 ${localization.pm}`,
  `03:00 ${localization.pm}`,
  `04:00 ${localization.pm}`,
  `05:00 ${localization.pm}`,
  `06:00 ${localization.pm}`,
  `07:00 ${localization.pm}`,
  `08:00 ${localization.pm}`,
  `09:00 ${localization.pm}`,
  `10:00 ${localization.pm}`,
  `11:00 ${localization.pm}`,
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

export const renderDataSlotMiniWeek = (columnSlot, extendSlotTitle, extendSlotDesc) => {
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
  
export const getHoursSlots = (localization, language) => {
  if (localization) {
    const localizedTimeSlots = hoursSlotsListLocal(localization);
    if (isRTLLanguage(language)) {
      return localizedTimeSlots.map(slot => toIndiaDigits(String(slot)));
    }
    return hoursSlotsListLocal(localization);
  } 
  return hoursSlotsList;
};

export const FixIsoFormat = dateTimeString => {
  const isValidISOFormat = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/.test(dateTimeString);
  if (!isValidISOFormat) {
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

export const getSlotPositionInColumnGrid = from => {
  const dayInPixels = 58 * hoursSlotsList.length;
  const DAY_IN_SECONDS = 60 * 60 * 24;
  const hour = new Date(from).getHours();
  const minutes = new Date(from).getMinutes();
  const currentTimeIndexInMinutes = (60 * hour + minutes) * 60;
  return Math.floor((currentTimeIndexInMinutes * dayInPixels) / DAY_IN_SECONDS);
};

export const getScrollPositionForDayStartTime = from => {
  const dayInPixels = 58 * hoursSlotsList.length;
  const DAY_IN_SECONDS = 60 * 60 * 24;
  const hour = Number(`${from.split(':')[0]}`);
  const minutes = Number(`${from.split(':')[1]}`);
  const currentTimeIndexInMinutes = (60 * hour + minutes) * 60;
  return Math.floor((currentTimeIndexInMinutes * dayInPixels) / DAY_IN_SECONDS);
};

export const getSlotLengthInPixels = (from, to) => {
  const fixesFromDateISOFormat = FixIsoFormat(from);
  const fixesToDateISOFormat = FixIsoFormat(to);
  const dayInPixels = 58 * hoursSlotsList.length;
  const DAY_IN_MINUTES = 60 * 24;
  const durationInMinutes =
    (new Date(fixesToDateISOFormat) - new Date(fixesFromDateISOFormat)) / 60 / 1000;
  return Math.floor((durationInMinutes * dayInPixels) / DAY_IN_MINUTES);
};

export const roundUpNearest10 = num => Math.ceil(num / 10) * 10;

const daysListSat = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const daysListMon = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysListSun = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const daysListSatLocal = localization => [localization.saturday, localization.sunday, localization.monday, localization.tuesday, localization.wednesday, localization.thursday, localization.friday];
const daysListSunLocal = localization => [localization.sunday, localization.monday, localization.tuesday, localization.wednesday, localization.thursday, localization.friday, localization.saturday];
const daysListMonLocal = localization => [localization.monday, localization.tuesday, localization.wednesday, localization.thursday, localization.friday, localization.saturday, localization.sunday];

export const WEEK_START_DAY = {
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
};

export const getDaysSlots = (weekStartDay) => {
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
};

export const getLocalizedDaysSlots = (localization, weekStartDay) => {
  if (localization) {
      switch (weekStartDay) {
        case WEEK_START_DAY.MONDAY:
          return daysListMonLocal(localization);
        case WEEK_START_DAY.SATURDAY:
          return daysListSatLocal(localization);
        case WEEK_START_DAY.SUNDAY:
          return daysListSunLocal(localization);
        default:
          break;
      }
  }
};