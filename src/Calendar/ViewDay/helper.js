/* eslint-disable no-restricted-globals */
import React from 'react';
import Icon from '../UIComponents/icon/Icon';
import IconsStore from '../UIComponents/icon/IconsStore';
import Icons from '../UIComponents/Icons';
import { SlotDesc, SlotTitle, IconContainer, ExtendedToolTip } from './ViewDay.style';


export const toIndiaDigits = number => {
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.replace(/[0-9]/g, w => id[+w]);
};

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
      <div style={{ display: 'flex' }}>
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
        <div style={{ display: 'flex', overflow: 'hidden', margin: '0px 4px' }}>
          <div style={{ display: 'flex' }}>
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
              <SlotDesc style={{ lineHeight: '18px' }} extendSlotDesc={extendSlotDesc}>
                {columnSlot.descA}
              </SlotDesc>
            )}
          </div>
          <div style={{ display: 'flex' }}>
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
              <SlotDesc style={{ lineHeight: '18px' }} extendSlotDesc={extendSlotDesc}>
                {columnSlot.descB}
              </SlotDesc>
            )}
          </div>
        </div>
      </div>
    </ExtendedToolTip>
  );
};

export const getLocalizedHoursSlots = language => {
  if (language) {
    if (language === 'en') {
      return hoursSlotsList;
    }
    return hoursSlotsList.map(slot =>
      toIndiaDigits(
        String(slot)
          .replace('am', 'ص')
          .replace('pm', 'م'),
      ),
    );
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

export const getSlotPositionInColumnGrid = from => {
  const dayInPixels = 58 * hoursSlotsList.length;
  const DAY_IN_SECONDS = 60 * 60 * 24;
  const hour = new Date(from).getHours();
  const minutes = new Date(from).getMinutes();
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
