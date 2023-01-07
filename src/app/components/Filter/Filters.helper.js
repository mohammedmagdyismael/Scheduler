import React from 'react';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import ClassNames from 'classnames';
import Icons from '../Icons';
import { IconContainer } from './Filters.styles';

export const VIEWS = {
  SCHEDULE_LIST: 0,
  SCHEDULAR: 1,
};

export const ICON_MODE = {
  CHECKED: 0,
  NOTCHECKED: 1,
  CHECKED_B: 2,
  DISABLED: 3,
};

export const DATE_PICKER_MODE = {
  SINGLE_PICK: 0,
  WEEK_PICK: 1,
};

export const getAppointmentActionBtn = (
  isClickable,
  iconName,
  iconColor,
  iconSize,
  iconMode,
  expandWidth,
  componentName,
) => {
  const iconSettings = {
    isClickable,
    iconColor: undefined,
    iconBackgroundColor: undefined,
    iconBorderColor: undefined,
  };

  if (iconMode === ICON_MODE.NOTCHECKED) {
    // Gray
    // iconSettings.isClickable = true;
    iconSettings.iconColor = '#484848';
    iconSettings.iconBackgroundColor = 'unset';
    iconSettings.iconBorderColor = '#E3E6EA';
  }
  if (iconMode === ICON_MODE.CHECKED_B) {
    // Red
    // iconSettings.isClickable = true;
    iconSettings.iconColor = '#DB3226';
    iconSettings.iconBackgroundColor = '#FFEAE9';
    iconSettings.iconBorderColor = '#DB3226';
  }
  if (iconMode === ICON_MODE.CHECKED) {
    // Blue
    // iconSettings.isClickable = true;
    iconSettings.iconColor = '#0070CD';
    iconSettings.iconBackgroundColor = '#E5F1FF';
    iconSettings.iconBorderColor = '#0070CD';
  }
  if (iconMode === ICON_MODE.DISABLED) {
    // Light gray
    // iconSettings.isClickable = false;
    iconSettings.iconColor = '#808184';
    iconSettings.iconBackgroundColor = 'unset';
    iconSettings.iconBorderColor = '#E3E6EA';
  }

  return (
    <div>
      <IconContainer
        backgroundColor={iconSettings.iconBackgroundColor}
        borderColor={iconSettings.iconBorderColor}
        isClickable={iconSettings.isClickable}
        expandWidth={expandWidth}
        id={componentName}
      >
        <Icon
          className={ClassNames('icon', {
            pointer: iconSettings.isClickable,
          })}
          icon={new IconsStore(Icons).getIcon(iconName)}
          width={iconSize}
          color={iconSettings.iconColor}
        />
      </IconContainer>
    </div>
  );
};

export const getBranchesForDropDown = branches => {
  if (branches && branches.length > 0) {
    const branchesList = branches.map(branch => ({
      fieldValue: branch.BranchName,
      value: branch.BranchKey,
      description: branch.Area && `${branch.Area.CityName}, ${branch.Area.AreaName}`,
      key: branch.BranchKey,
      isEnabled: true,
      extras: {
        bookingTypeId: branch.BookingTypeId,
        entityName: branch.EntityName,
        areaName: branch.Area && branch.Area.AreaName,
        cityName: branch.Area && branch.Area.CityName,
      },
    }));
    return branchesList;
  }
  return [];
};

export const getDropDownList = list => {
  if (list && list.length > 0) {
    const dropdownList = [];
    list.forEach(item => {
      dropdownList.push({
        fieldValue: item.name,
        value: item.key,
        key: item.key,
        isEnabled: true,
        extras: {
          ...item,
        },
      });
    });
    return dropdownList;
  }
  return [];
};

export const datePickerOptions = localization => [
  {
    name: localization.day,
    key: 0,
  },
  {
    name: localization.week,
    key: 1,
  },
];

export const getDatePickerDropDownList = localization => {
  const dropdownList = [];
  datePickerOptions(localization).forEach(item => {
    dropdownList.push({
      fieldValue: item.name,
      value: item.key,
      key: item.key,
      isEnabled: true,
      extras: {
        ...item,
      },
    });
  });
  return dropdownList;
};

export const languages = [
  {
    name: 'English',
    key: 'en',
  },
  {
    name: 'عربي',
    key: 'ar',
  },
  {
    name: 'Española',
    key: 'es',
  },
];

export const getLanguagesList = () => {
  const dropdownList = [];
  languages.forEach(item => {
    dropdownList.push({
      fieldValue: item.name,
      value: item.key,
      key: item.key,
      isEnabled: true,
      extras: {
        ...item,
      },
    });
  });
  return dropdownList;
};

export const getDoctorsDropDownList = list => {
  if (list && list.length > 0) {
    list.sort((a, b) => {
      const textA = a.DoctorName.toUpperCase();
      const textB = b.DoctorName.toUpperCase();
      // eslint-disable-next-line no-nested-ternary
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    const dropdownList = [];
    list.forEach(item => {
      dropdownList.push({
        fieldValue: item.DoctorName,
        value: item.AccountKey,
        key: item.AccountKey,
        isEnabled: true,
        extras: {
          ...item,
        },
      });
    });
    return dropdownList;
  }
  return [];
};

export const getBranchDoctorsForDropDown = (branches, branchKey) => {
  const rooms = branches.filter(branch => branch.BranchKey === branchKey)[0].Rooms;
  const doctorsList = [];

  if (rooms && rooms.length) {
    const doctors = [];
    rooms.forEach(room => {
      if (room.Doctors && room.Doctors.length) {
        room.Doctors.forEach(doctor => {
          doctors.push({ ...doctor, roomKey: room.RoomKey });
        });
      }
    });
    if (doctors && doctors.length) {
      doctors.forEach(doctor => {
        doctorsList.push({
          fieldValue: doctor.DoctorName,
          value: doctor.AccountKey,
          description: doctor.MainSpecialty && doctor.MainSpecialty.SpecialityName,
          key: doctor.AccountKey,
          isEnabled: true,
          extras: {
            ...doctor.MainSpecialty,
            statusId: doctor.StatusId,
            roomKey: doctor.roomKey,
          },
        });
      });
    }
  }

  return doctorsList;
};

export const getRoomsDropDownList = list => {
  if (list && list.length > 0) {
    const dropdownList = [];
    list.forEach(item => {
      dropdownList.push({
        fieldValue: item.Name,
        value: item.PhysicalRoomKey,
        key: item.PhysicalRoomKey,
        isEnabled: true,
        extras: {
          ...item,
        },
      });
    });
    return dropdownList;
  }
  return [];
};
